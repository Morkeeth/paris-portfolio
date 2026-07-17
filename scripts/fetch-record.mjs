// Fetch THE record before every build. One source, fetched the same way.
//
// NOT a submodule and NOT a committed copy: both pin a SHA someone must remember to bump,
// and a forgotten bump is the silent fork this replaces.
//
// NOT a plain fetch of raw/main either. raw.githubusercontent serves a ~5-minute-stale
// copy, so "publish then deploy" quietly shipped the PREVIOUS record. Caught that by
// watching sourceHash refuse to change across a rebuild. So: resolve main's commit via the
// API (fresh), then fetch the record at that immutable SHA (a SHA url is safe to cache
// because its content can never change). Deterministic, never stale, and the build prints
// the exact commit + sourceHash it built from.
//
// If any of this fails the build fails, loudly. A stale record is worse than no deploy.
import { writeFileSync } from 'node:fs';

const REPO = process.env.RECORD_REPO ?? 'Morkeeth/oscar-record';
const OUT  = new URL('../app/shared/record.json', import.meta.url);
const gh   = { 'user-agent': 'oscar-record-fetch', 'cache-control': 'no-cache' };

let url, provenance;
if (process.env.RECORD_URL) {
  url = process.env.RECORD_URL;               // escape hatch: local file / fork / test
  provenance = url;
} else {
  // Cache-buster is load-bearing: the API sends `cache-control: max-age=60`, so a build
  // that runs within 60s of a push resolves the PREVIOUS commit and silently ships the
  // previous record. Found by watching sourceHash refuse to move across a rebuild.
  const bust = `?_=${Date.now()}`;
  const r = await fetch(`https://api.github.com/repos/${REPO}/commits/main${bust}`, { headers: gh });
  if (!r.ok) throw new Error(`cannot resolve record commit: ${r.status}`);
  const sha = (await r.json()).sha;
  url = `https://raw.githubusercontent.com/${REPO}/${sha}/record.json`;
  provenance = `${REPO}@${sha.slice(0, 8)}`;
}

const res = await fetch(url, { headers: gh });
if (!res.ok) throw new Error(`record fetch failed: ${res.status} ${url}`);
const rec = await res.json();
for (const k of ['stats', 'timeline', 'projects']) {
  if (!rec[k]) throw new Error(`record is malformed: missing "${k}"`);
}

writeFileSync(OUT, JSON.stringify(rec, null, 2) + '\n');
console.log(`record: ${rec.projects.length} projects · ${rec.timeline.length} timeline`);
console.log(`  from ${provenance} · sourceHash ${rec._meta?.sourceHash}`);
