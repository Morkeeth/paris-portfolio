# Portfolio — Review handoff (2026-07-14)

Non-voice hygiene pass done on `nightrun/portfolio-hygiene-2026-07-13`. **Pushed** to
`origin/nightrun/portfolio-hygiene-2026-07-13` (0 unpushed commits). Build green.
Not deployed: awaiting deploy + the voice items below.
Everything below the line **needs your voice** — nothing here was fabricated or guessed.

---

## ✅ Done this pass (non-voice, applied)

| # | Change | File | Verified |
|---|---|---|---|
| 1 | Swapped low-res `relay.png` (showed dead name **RELAY**, "Continue", "TASKS·POLLS·CAMPAIGNS") for a clean current shot of the live app (**FAVOUR**, "Get started", "FAVOURS·POLLS·USDC") | `public/projects/relay.png` | real screenshot of world-relay.vercel.app, 1440×900 |
| 2 | Hermes copy tightened + em dash removed | `data.ts` (Hermes.story) | see decision D1 |
| 3 | ~~Hero count-up **$188K+ → $176K**~~ **SUPERSEDED** — commit `972c8cb` moved STATS back to `$188K` / `42 ETH` (compass canonical, mindmap §13). $176K/39.05 are dead values. | `opus/page.tsx` | see 2026-07-15 pass |
| 4 | ~~Key-metric **$188k → $176k**~~ **SUPERSEDED**, same reason | `sonnet/page.tsx` | see 2026-07-15 pass |
| 5 | Dead name in 2026 "building now" list: **relay → favour** | `data.ts:403` (JOURNEY) | ✅ |

> **CORRECTION 2026-07-15:** rows 3-4 above described a `188 → 176` edit that a later commit
> reversed. Worse, the "fix" only ever swapped one hardcoded literal for another — it never
> made those count-ups read `STATS`, so the drift bug it claimed to close stayed open and
> `972c8cb` had to hand-edit both pages again. Fixed properly this pass (see below).
> `40.77 / $115K / $176K / 39.05` are genuinely absent from source **and** build (re-grepped).

---

## ✅ Done — verification pass (2026-07-15, terminal-only)

Re-verified the claims above against source, build output and a live browser. Applied:

| # | Fix | File | Proof |
|---|---|---|---|
| 1 | **Sonnet's CSS reset was breaking the shared switcher.** Its `<style>` tag carried a bare `*{padding:0}`. A `<style>` tag is *unlayered*, and unlayered CSS outranks anything in a `@layer` — so it beat Tailwind's `md:py-7` and stripped the padding off `ModelSwitcher` on `/sonnet` only. Deleted; `globals.css` already resets inside `@layer base`. | `sonnet/page.tsx:74` | switcher rail renders identically on all 4 routes |
| 2 | **Count-ups now read STATS** via a new `statNum()` helper (`'$188K' → 188`). Kills the whole drift class instead of the two known instances. No rendered value changed. | `data.ts`, `opus`, `sonnet`, `fable` | `grep '{ to: 188'` → 0 hits |
| 3 | **Self-contradiction on `/sonnet`:** it rendered *"security layer for 6m hardware wallets"* directly above *"protecting 8M+ devices"*. `8M+` is the ruled canonical (GOLDEN_RULES, Jul 13); `6m` matched nothing. Now `STATS.devices`. | `sonnet/page.tsx:957` | `6m` gone from build |
| 4 | **Fixed chrome was colliding with the switcher rail.** `position:fixed` escapes `<main>`'s `md:pl-[196px]`, so sonnet's top bar covered the rail's "oscar morke" brand line and fable's status bar sat on top of "compare all →". Both offset past the rail at `md`. | `sonnet/page.tsx`, `fable/fable.css` | 0 rail intrusions on all 4 routes |

Build green, 10/10 prerender, `tsc --noEmit` clean.

---

## 🔴 NEEDS YOU — blockers found this pass (cannot fix from a terminal)

1. **`oscarmorke.com` is not registered.** `whois` → *"No match for domain OSCARMORKE.COM"*; NXDOMAIN on 1.1.1.1 and 8.8.8.8. It is also `metadataBase` (`layout.tsx:27`), so every OG URL points at a host that does not exist and no link preview can unfurl. Register/point DNS before deploy.
2. **Yieldbound's "live ↗" lands on a Vercel login wall.** Anonymous `curl` → `302 → vercel.com/login`, title `Login – Vercel`. The earlier "liveness verified" check passed because it ran in an authenticated browser. Fix: Vercel → Settings → Deployment Protection → off. The other 4 live links and all 5 repos are genuinely public (verified anonymously).
3. **The ETH table disproves the ETH headline, and it is one row.** `HACKATHON_TIMELINE` sums to **39.05 ETH**; `STATS.totalEthWon` says **42 ETH**, rendered adjacent on `/opus`. The gap is exactly **2.65** = the ETH NYC row: site says `8.71`, your sheet (mindmap §13) says `11.36`. Every other row matches. I did not touch it — numbers come from your sheet, not from me. Correct the row and the table reconciles to the canonical ~41.7/42.
4. **4 agents or 5?** `STATS.terminals: 5` + "5-agent OS" chip on all four pages, but `AGENTIC_STACK` has **4** entries and `STACK_INTRO` says *"four agents, one system"*. `/haiku` renders "4 agents, one system" a few lines under its own "5-agent OS" chip. Pick one.
5. **16 hackathons, 14 rows.** `STATS.hackathonCount: 16` vs `HACKATHON_TIMELINE`'s 14 entries — on the page billed as "the longer record". Two events missing, or the count is the wrong frame.
6. **`$51M` vs `$52M+`.** Site says `$51M` prevented; mindmap §13 (canonical) says `$52M+`. One is stale.
7. **Every "2026 = no purse" caption is wrong.** All four pages say the bars stop before 2026 (haiku: *"the bars stop in 2023"*; fable: *"in 2026 i stopped counting purses"*), but 2026 has two prize rows that render as bars ($1,000 Synthesis, $2,500 World Build 3). All four also omit 2025-11 Tech Europe, which *is* a real no-purse tick. Copy, so yours.
8. **Zero per-route metadata.** All 9 routes inherit one title/description, so `/opus` and `/haiku` produce byte-identical link previews — on the site whose entire premise is four rival interpretations. Blocked structurally: every page is `'use client'`, which forbids a `metadata` export, so each needs a `layout.tsx` wrapper. The copy is yours; say the word and I'll wire the plumbing.

Lower severity: `public/projects/relay.png` ships the dead name in the DOM (contents are correctly FAVOUR — verified by opening it); one `git mv` to `favour.png`. The `world-relay` GitHub repo *description* still presents RELAY as current, so "code ↗" lands on a page saying RELAY — fix in GitHub settings, not this repo. `app/shared/data/helicon.db` (192KB SQLite) is untracked but sitting in the app dir; worth deleting per the personal-data boundary.

**Structural note:** `data.ts:2` calls STATS "single source of truth". It isn't yet. `hackathonCount`, `bounties` and `anotherblockVolume` are declared but never read, and `data.ts` restates its own STATS values as prose ~24 times (`data.ts:409` hardcodes four of them in one sentence). The pages are now clean; the duplication has migrated into the data file, where it reads like copy instead of state. Worth a follow-up pass.

---

## ✅ Also done — outbound links (gap #1, the biggest one)

Every featured product card links out to real URLs. Re-verified anonymously 2026-07-15: 4 of 5
live links and **all 5 repos are genuinely public**; Yieldbound is behind a login wall (blocker #2).
Rendered per-aesthetic in all 4 variants:

| Project | live ↗ | code ↗ |
|---|---|---|
| FAVOUR | world-relay.vercel.app | MorkeethHQ/world-relay |
| RECEIPT | receipt-murex.vercel.app | MorkeethHQ/receipt |
| Yieldbound | yieldbound.vercel.app 🔴 **login wall, see blocker #2** | MorkeethHQ/delegated-agent-treasury |
| Loop | loop-labs.vercel.app | Morkeeth/Loop |
| BriefMCP | — | Morkeeth/BriefMCP (repo only) |

Notes: BriefMCP is **non-featured**, so its card (and link) does not render anywhere yet — it's in the data for when you feature it. Haiku shows links **on expand** (its cards are click-to-open), by design. **Intentionally skipped** (no verifiable public URL): Ledger, Anotherblock (site 404), Etablera, Wave Radio, Gates (gates.wtf down). See D6.

---

## 🗣 NEEDS YOUR VOICE — the 3 stories (do NOT ship factual)

These are the humanising stories. Still factual-only in the code. I did not write them — they need a real moment from you. 3-question interview each, I capture + draft in your voice, you approve.

| # | Category | Anchor | What's missing |
|---|---|---|---|
| S1 | Full-time | **the arc** — Etablera → the rocky road → Matos DAO, Antler $95K declined, grants, DeFi → Ledger PM | the throughline. why each turn. what the "no" to Antler cost / bought |
| S2 | Agentic | **The OS / 5 terminals** | the *feel* of a 3am night. not the spec — the scene |
| S3 | Hackathons | **Gates / Bogotá** | the scene + why proof-of-personhood grabbed you |

---

## 🗣 NEEDS YOUR VOICE — decisions

- **D1 — Hermes copy.** Applied your REVIEW draft wording, minus the em dash:
  *"grok-powered agent on the vps, sibling to bagel. ships what the system writes, with its own model, memory, and spend."*
  Veto / tweak the model/role/"ships" framing?
- **D2 — "complete record" vs "longer record".** `/compare` calls Opus "the only page with the complete record"; the Opus page itself says "the longer record". 14 rows shown vs 16 competed. Pick one word. (Prior commit deliberately moved away from completeness language → I'd align compare to "longer", but it's your call.)
- **D3 — Em dashes.** 47 across the site. They clash with your no-em-dash rule but read as intentional editorial typography here. I left them all (only dropped the one in the Hermes line I was already rewriting). Keep as design choice, or strip site-wide?
- **D4 — `$176k+` vs `$176K`.** Fable's count-up shows "$176k+"; opus/haiku show "$176K". Cosmetic. Unify or leave the per-model voice?
- **D5 — Missing card images.** Still none for Wave Radio, The OS, BriefMCP, Bagel, Hermes, People Radar. The OS is the hero of "the stack" and would benefit most. Accept text-only, or shoot/generate art?
- **D6 — Link set.** Live+repo links added for FAVOUR / RECEIPT / Yieldbound / Loop, repo-only for BriefMCP. Ledger, Anotherblock, Etablera, Wave Radio, Gates have no verifiable public URL so they got none. Give me URLs for any of those and I'll add them, or confirm linkless is right. Also: want a "see it live" on the Ledger card pointing to ledger.com, or leave employer cards linkless?

---

*Gate reminder: the branch is pushed, but nothing DEPLOYS until you clear S1–S3 + D1–D6 and
blockers #1–#2 (the domain doesn't exist yet, so a deploy has nowhere to land).*
