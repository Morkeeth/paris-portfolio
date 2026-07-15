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

## ✅ Resolved from Oscar's sheet (2026-07-15)

You pasted the sheet, so the record is now reconciled against it and **guarded** (see below).

- **ETH NYC was the one wrong row.** `8.71 → 11.36`. The table now sums to **exactly 41.7**,
  which is your ruled team total. `STATS.totalEthWon: '42 ETH' → '41.7 ETH'`, so `/opus` reads
  *"$66K at award time · 41.7 ETH won · $188K at today's prices"* — consistent for the first time.
  Independent corroboration: 41.7 × $4,500/ETH = $187,650 ≈ the $188K headline, so **$188K was
  always derived from 41.7**. The 39.05 was the typo, not the headline.
- **The 16 was right; the table was short by 3.** Your sheet lists exactly 16 competed events
  (Gotham 2019 = judge, excluded; the 3 in-flight July 2026 hacks not yet counted). Added the
  missing rows: **Vinnova Innovation (2018, VEX)**, **Chainlink Hackathon (2022-11)**,
  **ETH Lisbon (2023-05, Nouns ML)**. Gotham is now marked `competed: false` so it renders
  without counting.
- **`$51M → $52M+`** across STATS + both prose restatements, matching mindmap §13.

**Two invariants now fail the build rather than drift silently** (`data.ts`) — the exact bug
class that shipped last time, where both numbers were individually "valid" so nothing caught it:

| Guard | Fires when |
|---|---|
| ETH total | `HACKATHON_TIMELINE`'s eth column doesn't sum to `STATS.totalEthWon` |
| Event count | competed rows ≠ `STATS.hackathonCount` |

Verified by reintroducing the old `8.71`: build failed with
*"ETH drift: HACKATHON_TIMELINE sums to 39.05 but STATS.totalEthWon says 41.7 ETH"*.

---

## ✅ Mobile pass (2026-07-15) — was never tested before this

Everything prior to this was verified at 1440×900 only, on a site whose review device
is a phone. At 390×844:

| Fix | Was |
|---|---|
| **`/sonnet` had no model switcher at all.** Its fixed header sat at `top:0` and buried the strip, so the page was a dead end with no way back to the other three. Same bug class as the desktop rail collision, but my earlier fix only guarded `md+`. Header now starts below the 52px strip on mobile. | switcher 100% covered |
| **`compare all →` was clipped on all four routes** (nav content 424px in a 390px viewport). The strip is `overflow-x-auto` so it was *technically* reachable by swiping, with no affordance. Dropped the mobile-only "models:" label (54px) — strip now fits at 370 with room to spare. | link invisible |

Verified: switcher visible, `compare all →` fully in frame, zero nav overflow, body never
scrolls horizontally, and desktop unregressed (topbar at left=196, zero rail intrusions).

Not a bug, for the record: the record chart's SVG extends past 390px, but its parent is
`overflow-x: auto` with `minWidth: 500` on the SVG — wide content scrolling in its own
container is the correct pattern, and the body does not scroll.

---

## 🔴 NEEDS YOU — still open

1. **`oscarmorke.com` is not registered.** `whois` → *"No match for domain OSCARMORKE.COM"*. You said you don't want your full name in the domain, so `metadataBase` no longer hardcodes it: it now reads `NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → localhost. **Pick a domain, set `NEXT_PUBLIC_SITE_URL`, done** — no code change needed.
   > **CORRECTION 2026-07-15:** an earlier note here said this "already works on paris-portfolio.vercel.app (live, 200)". Wrong. That subdomain belongs to **someone else's app** (`<title>Vite + React</title>`) — a name collision, and the 200 was a false positive. The real production alias is **`morkeeth.vercel.app`**.
2. **Yieldbound's "live ↗" lands on a Vercel login wall.** Anonymous `curl` → `302 → vercel.com/login`, title `Login – Vercel`. The earlier "liveness verified" check passed because it ran in an authenticated browser. Fix: Vercel → Settings → Deployment Protection → off. The other 4 live links and all 5 repos are genuinely public (verified anonymously).
3. **4 agents or 5?** (asked, not answered) `STATS.terminals: 5` + "5-agent OS" chip on all four pages, but `AGENTIC_STACK` has **4** entries and `STACK_INTRO` says *"four agents, one system"*. `/haiku` renders "4 agents, one system" a few lines under its own "5-agent OS" chip. The 5 looks like it leaked in from the terminal count, which is a different axis. My read: chip should say **4-agent OS**, leaving "5 terminals at 3am" alone. Say the word.
4. **The "no purse" captions are now further off.** Adding 3 rows means the no-purse events are 2018 SAS, 2018 Vinnova, 2019 Gotham, 2022-11 Chainlink, 2023-05 ETH Lisbon, 2025-11 Tech Europe, 2026-05 ETH Open Agents. Opus's caption still says *"(2018 first-ever · 2019 judged · 2026 the building years)"*; haiku still says *"the bars stop in 2023"*; fable still says *"in 2026 i stopped counting purses"* (2026 has two prize bars). Copy, so yours.
5. **Sheet vs mindmap disagree on Paris Innov'Hack.** Sheet says **200 euro**; mindmap §13 says **"50 teams, no prize"**. Site currently shows no prize. Left alone — it's €, and adding it moves the "$66K at award time" figure.
6. **"$3.5k regular cash of agent hack"** — I couldn't place this. Your sheet shows ETH Open Agents (Receipt) = **0**, and the only $3,500 on it is ETH Denver, which already has 2.24 ETH against it. Not applied. Which event?
7. **`ethPrice` is dead data.** Never rendered anywhere. NYC's `$1,193` no longer reconciles with 11.36 ETH ($10,392 ÷ 11.36 = $915), but since nothing reads the field I left it rather than assert an ETH price you didn't give me. Worth deleting the field entirely.

8. **The FAVOUR card image is a blank white rectangle.** This is the flagship project (live, World Build 3 win) and its card reads as an empty white box with an illegible smudge in the middle, blowing out a dark page. The screenshot is a **mobile app centered in a 1440×900 desktop frame** — ~64% blank margin. It passed the last review as "✅ real screenshot of world-relay.vercel.app, 1440×900", which was true and useless. Needs a re-shoot: either a tight crop of the phone frame, or a device-mockup composition. Same latent risk on `loop.png` / `receipt.png` / `yieldbound.png` (all 1440×900) — worth eyeballing.

Lower severity: the `world-relay` GitHub repo *description* still presents RELAY as current, so "code ↗" lands on a page saying RELAY — fix in GitHub settings, not this repo. `app/shared/data/helicon.db` (192KB SQLite) is untracked but sitting in the app dir; worth deleting per the personal-data boundary — I didn't touch it since I didn't create it.

**Structural note:** `data.ts:2` calls STATS "single source of truth". Closer now — but `bounties` and `anotherblockVolume` are still declared and never read, and `data.ts` still restates its own STATS values as prose (`JOURNEY`'s 2026 line hardcodes four of them in one sentence). The pages are clean; the duplication lives in the data file, where it reads like copy instead of state.

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
| ~~S2~~ | ~~Agentic~~ | **DONE 2026-07-15** — see below | ✅ |
| S3 | Hackathons | **Gates / Bogotá** | the scene + why proof-of-personhood grabbed you |

### ✅ S2 — captured from Oscar, applied 2026-07-15

The anchor turned out not to be a 3am night at all. It's **"i rekt my computer at 9 writing
scripts in the terminal"** — the failure beat is thirty years before the payoff, and "finally
having the software i always dreamed of" is the nine-year-old's dream landing. That's the
throughline the site was missing; it now opens The OS's story.

Also captured: at **Synthesis** (Pavillon Henri IV), two agents Oscar built were competing and
**one caught the other about to push a private key**. Demo key, and it never leaked *because*
the other caught it. Filed as a THOUGHT, phrased honestly: the first draft said "caught the
other leaking a private key", which asserts a leak that never happened. On a page whose author
does security at Ledger, that would have been a false claim.

**Oscar's rule, applied site-wide: "no one knows what bagel is, cater it to the audience."**
He'd already solved this once (`the second brain / obsidian` leads with the role) and not
applied it elsewhere. Now consistent, names demoted to the detail line:

| was | now |
|---|---|
| `open claws / bagel` · hetzner | `the machine` · open claws · hetzner |
| `hermes` · grok · vps | `the courier` · hermes · grok |

Also killed: THOUGHTS said *"briefmcp, receipt, helicon: agents that stop re-explaining, lying,
and forgetting."* Of those three, only RECEIPT has a visible card, BriefMCP isn't featured, and
**helicon appears nowhere else on the site** — a stranger meets three names and can look up one.
Now: *"three things i keep rebuilding: agents that stop re-explaining, stop lying, stop forgetting."*

Verified rendered: `bagel`, `helicon`, `odawg` appear **nowhere** in the rendered text of any
route. `hermes` / `open claws` survive only in the demoted sub-line, which is the intent.

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
