'use client';

/*
 * /work/<slug> — the case study.
 *
 * Oscar, Jul 17: "one image and description might be tricky" -> the depth lives here, not
 * on a card. The index is the scan; this is the read.
 *
 * PLACEHOLDER IS A REAL STATE, NOT A GAP. Oscar: "We fix helicon and overtun once their
 * done!". A project in the record with no story yet renders as an honest stub that says so.
 * It does NOT get a fabricated narrative, and it does NOT get hidden: the record is the
 * source, so if it exists it is listed, and the page states plainly what is still missing.
 */

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROJECT_INDEX, PROJECTS } from '../../shared/data';

const C = { bg: '#0a0a0a', fg: '#f0ede8', dim: '#706e68', rule: '#242320', accent: '#ffd34d' };
const MONO = 'var(--font-jetbrains-mono), monospace';

export default function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const fact = (PROJECT_INDEX as any[]).find((p) => p.slug === slug);
  if (!fact) notFound();

  // Prose is per-site and optional. Its absence is the placeholder signal: no story yet.
  const prose = (PROJECTS as any[]).find((p) => p.slug === slug);
  const written = Boolean(prose?.story);

  return (
    <main style={{ background: C.bg, color: C.fg, minHeight: '100vh' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 22px 100px' }}>
        <Link href="/work" style={{ fontFamily: MONO, fontSize: 11, color: C.dim, textDecoration: 'none' }}>
          ← work
        </Link>

        <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', color: C.dim, marginTop: 30 }}>
          {fact.year} · {(fact.track ?? '').toUpperCase()}
          {fact.buildTime ? ` · ${fact.buildTime.toUpperCase()}` : ''}
          {fact.id ? ` · MRK-${fact.id}` : ''}
        </div>

        <h1 style={{ fontSize: 'clamp(38px, 7vw, 68px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.92, margin: '10px 0 0' }}>
          {fact.name}
        </h1>

        {(prose?.oneLiner ?? fact.oneLiner) && (
          <p style={{ fontSize: 17, lineHeight: 1.55, color: C.dim, marginTop: 16, maxWidth: 560 }}>
            {prose?.oneLiner ?? fact.oneLiner}
          </p>
        )}

        {written ? (
          <>
            <p style={{ fontSize: 16, lineHeight: 1.75, marginTop: 30, maxWidth: 620 }}>{prose.story}</p>
            {prose.details?.length > 0 && (
              <ul style={{ marginTop: 26, paddingLeft: 0, listStyle: 'none' }}>
                {prose.details.map((d: string) => (
                  <li key={d} style={{ borderTop: `1px solid ${C.rule}`, padding: '11px 0', fontSize: 14.5, lineHeight: 1.6, color: C.dim }}>
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          /* The honest stub. Says what is true and what is missing, and never invents the
             middle. A fabricated case study on a page whose whole argument is method would
             cost more than an empty one. */
          <div style={{ border: `1px solid ${C.rule}`, borderLeft: `2px solid ${C.accent}`, padding: '18px 20px', marginTop: 30 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', color: C.accent }}>IN FLIGHT</div>
            <p style={{ fontSize: 14.5, lineHeight: 1.65, color: C.dim, marginTop: 9 }}>
              It is in the record, so it is listed. The case study lands when the thing does.
              {fact.oneLinerSource ? ' The line above is the repo description, not the written version.' : ''}
            </p>
          </div>
        )}

        {fact.links && (
          <div style={{ display: 'flex', gap: 18, marginTop: 34, flexWrap: 'wrap' }}>
            {Object.entries(fact.links as Record<string, string>).map(([k, v]) => (
              <a key={k} href={v} target="_blank" rel="noreferrer"
                 style={{ fontFamily: MONO, fontSize: 12, color: C.fg, borderBottom: `1px solid ${C.accent}`, textDecoration: 'none', paddingBottom: 2 }}>
                {k} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
