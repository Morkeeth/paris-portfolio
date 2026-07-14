# Portfolio — Review handoff (2026-07-14)

Non-voice hygiene pass done on `nightrun/portfolio-hygiene-2026-07-13` (unpushed). Build green.
Everything below the line **needs your voice** — nothing here was fabricated or guessed.

---

## ✅ Done this pass (non-voice, applied)

| # | Change | File | Verified |
|---|---|---|---|
| 1 | Swapped low-res `relay.png` (showed dead name **RELAY**, "Continue", "TASKS·POLLS·CAMPAIGNS") for a clean current shot of the live app (**FAVOUR**, "Get started", "FAVOURS·POLLS·USDC") | `public/projects/relay.png` | real screenshot of world-relay.vercel.app, 1440×900 |
| 2 | Hermes copy tightened + em dash removed | `data.ts` (Hermes.story) | see decision D1 |
| 3 | Hero count-up **$188K+ → $176K** (was hardcoded, not reading STATS) | `opus/page.tsx:394` | `188` gone from build, `176` present |
| 4 | Key-metric **$188k → $176k** (same hardcoded-drift bug) | `sonnet/page.tsx:659` | ✅ |
| 5 | Dead name in 2026 "building now" list: **relay → favour** | `data.ts:403` (JOURNEY) | ✅ |

**Copy pass result:** no typos found. Model labels current (Fable 5 · Opus 4.8 · Sonnet 5 · Haiku 4.5). Only stale numbers on the whole site were the two hardcoded `188`s above (fable/haiku/opengraph/opus-record all correctly read `STATS`). `40.77 ETH`, `$115K`, `$188K` fully purged.

Build: `npm run build` green, 10/10 routes prerender. `git diff --stat`: 4 files, unpushed.

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

---

*Gate reminder: nothing pushes/deploys until you clear S1–S3 + D1–D5.*
