# Portfolio — Review handoff (2026-07-15)

Non-voice hygiene pass on `nightrun/portfolio-hygiene-2026-07-13`. **Pushed** to
`origin/nightrun/portfolio-hygiene-2026-07-13` (re-verified 2026-07-15: 0 commits ahead
of origin, remote head `83dda86`). Build green, **14 static routes** prerendered,
`tsc --noEmit` clean (exit code read directly, not through a pipe).
Not deployed: your gate.
Everything below the line **needs your voice** — nothing here was fabricated or guessed.

> **WHAT THIS SITE IS (2026-07-15).** Earlier passes justified the deploy as unblocking
> the Eric→Cursor intro. That chain is dead: the Ashby API lists 113 live roles at Cursor,
> **zero** titled Product Manager, and no Product department on the org chart. There is no
> role to apply to, so this site is not an application to anyone — it's your record, and
> the four-model eval is its sharpest artifact. Nothing in this repo ever encoded the
> Cursor framing (grepped: no hits), so no in-repo copy needed correcting; what changes is
> the gate. Ship it because the record is worth having up, not to hit someone's inbox.

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

Build green, `tsc --noEmit` clean. (Route count was 10 at the time of this pass; it's
**14** now — the four model OG routes plus `/compare`'s. Any "10/10" reference below is
that stale count, not a regression.)

---

## ✅ Done — number hygiene end-to-end (2026-07-15, second pass)

Re-grepped the **build output**, not the table. The two count-ups the earlier pass claimed
(`opus:394`, `sonnet:659`) are genuinely clean, and `40.77 / $115K / $176K / 39.05` are
absent from source and build. But the pass answered "are the two known instances fixed?"
when the question was "what else is typed twice?" — and the answer was **24 restatements**.

| # | Fix | Why it's a drift bug | Proof |
|---|---|---|---|
| 1 | **Agent count derives from `AGENTIC_STACK.length`.** Was 4 assertions / 2 values, all four on `/haiku`. | `ARC` said "five-agent os" — a third surface no pass caught. The 5 leaked from `STATS.terminals`, a different axis. | added a 5th stack entry → all 4 routes flipped to five; removed → back to four |
| 2 | **24 prose restatements of STATS now interpolate it** (`OSCAR.bio`, `JOURNEY`, `ARC`, `TRACKS`, project stories). `JOURNEY`'s 2026 line alone restated four canonical numbers in one sentence. | `data.ts:2` calls STATS "single source of truth"; the pages obeyed and the data file didn't. | rendered text byte-identical vs baseline on all 5 routes except the intended count fix |
| 3 | **`numWord()` helper.** Spelled counts ("five terminals") are restatements too. | `STATS.terminals: 5` + prose "five" would drift silently. | `${numWord(STATS.terminals)} terminals` |
| 4 | **ONE definition of "the four models".** There were two — `!m.control` and `!m.external` — agreeing only because the legacy entry carries both flags. | Give any model an external URL, or add a second control, and the site disagrees with itself about how many models it compares. | `MODEL_ARMS` deleted; `EVAL_MODELS` is the only definition |
| 5 | **`COMPARE_META` derives its count + model names.** Its comment claimed "derived, never retyped" while the title hardcoded "four models" and the description hardcoded all four names. | A fifth model would leave a stale "four" in the page title and OG card. | `numWord(EVAL_MODELS.length)` + `nameList(...)` |
| 6 | **`/compare` had no OG image at all** — the hub, the most shareable page, unfurled as a bare link. Its layout declared `openGraph`, which replaces the root object wholesale, and no file put an image back. | Every other route had one; nobody checked the hub. | `curl /compare/opengraph-image` → 1200×630 PNG |

**Deliberately NOT coupled:** `STATS.bounties` and Etablera's client count both read `30+`.
That's a coincidence, not a relationship — binding them would make a bounty-count change
silently rewrite Etablera's history. Added `etableraClients` instead. (I nearly shipped
this one; caught it in review.)

**One rendered-copy change beyond the count, flag for veto:** The OS's story said "score
**1,200** contacts" while two other surfaces said "1,200+". All three now read
`STATS.contacts` → "1,200+". The `+` is load-bearing (it means "at least") and it's in
your captured S2 voice line, so if you want the bare 1,200 back, say so.

---

## ✅ Done — links, OG + dead names across all routes (2026-07-15)

All 12 local routes 200 with correct content-type. All 5 GitHub repos public, verified
anonymously. **Yieldbound is still behind the Vercel login wall** (blocker #2, re-confirmed
today: anonymous curl → `vercel.com/login`, title `Login – Vercel`).

**Dead names — clean in this repo.** `relay.png` → `favour.png` is already done. Every
surviving `RELAY` is *historical* ("won as RELAY… it ships today as FAVOUR", the 2026-04
timeline row), which is what GOLDEN_RULES asks for: dead name in a current claim is rot,
in history it's history. `world-relay.vercel.app` renders `<title>FAVOUR</title>`. ✅

**The one live dead name is outside this repo** and I left it for you — it's an
outward-facing change to a public repo, not mine to make:
```
gh repo edit MorkeethHQ/world-relay \
  --description "FAVOUR — The first errand network where both sides are provably human. Built as RELAY at World Build 3."
```
Today it reads *"RELAY — The first errand network…"*, so "code ↗" lands on the dead name.

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

## 🎯 THE NEXT MOONSHOT — publish the brief

**The eval is missing its input, and that's the only thing standing between "a clever
portfolio" and a reproducible artifact.**

`/compare` now states the method: what's held constant, what varied, the control, the
confound. Four arms, one baseline, one honest disclosure. The one thing it does *not* have
is **the brief itself** — the actual input to the experiment. An eval that doesn't publish
its prompt can't be re-run by anyone, which means it's a demonstration, not an eval.

**Found while checking this (and it's the reason it's urgent):** the site claimed *"the same
**30-line** brief"*. That number is **unsourced** — the brief exists in **no commit** (never
tracked) and in **no vault doc** (`01 Projects/Portfolio/` has creative-direction,
inspiration, build-plan, stories-source; none contain it; the archive says only "Same brief,
4 Claude models" with no count). It was harmless as a dim footer aside. It stopped being
harmless when I promoted it into the row labelled **"held constant"**, which reads as a
stated experimental parameter. **I dropped the "30-line"** — the claim is true without it,
and a number nobody can check is the exact fake-precision tell this whole pass is about.
That was my error to make and to unmake.

**The moonshot, and it needs you because only you have the artifact:**

1. **Find the original brief** (a chat prompt from ~June, before `portfolio-creative-direction.md`
   on Jun 12 — the multi-model comparison already existed by then). If it's gone, say so on
   the page; "the brief is lost" is a more honest line than a reconstructed one.
2. **Publish it verbatim** on `/compare`, next to the arms. Then the page reads: *here is the
   exact input, here are four outputs, the model was the only variable, the control is the
   pre-model site, two arms kept evolving — run it yourself.* That is a research artifact.
   Nobody can argue with it because everything needed to check it is on the page.
3. **Then the "30-line" earns its way back**, because a reader can count the lines.

Why this over the other open items: it's the only one that changes what the site **is**. The
domain, the FAVOUR screenshot and the login wall are all things that make the site *work*.
This is the one that makes the four-model thing legible as the thing you actually did —
which, per your own framing, is the sharpest work on here and the part you keep filing as a
gimmick. It's also cheap: the brief is text, and the page already has a slot shaped like it.

**Second candidate, deliberately NOT recommended:** instrumenting the four routes to measure
which skin visitors prefer, so the "live eval of taste" reports a real number. I'd push back
on this. Your traffic won't produce an n that means anything, a vote counter reading 9 is
worse than no counter, and it needs a backend and a third party on a static site whose whole
ethic is local-and-no-cloud. The eval's judge is you. That's legitimate — but then the
outcome is your ranking and your reasons, which is voice work, and yours.

---

## 🔴 NEEDS YOU — still open

1. **`oscarmorke.com` is not registered.** `whois` → *"No match for domain OSCARMORKE.COM"*. You said you don't want your full name in the domain, so `metadataBase` no longer hardcodes it: it now reads `NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL` → localhost. **Pick a domain, set `NEXT_PUBLIC_SITE_URL`, done** — no code change needed.
   > **CORRECTION 2026-07-15:** an earlier note here said this "already works on paris-portfolio.vercel.app (live, 200)". Wrong. That subdomain belongs to **someone else's app** (`<title>Vite + React</title>`) — a name collision, and the 200 was a false positive. The real production alias is **`morkeeth.vercel.app`**.
2. **Yieldbound's "live ↗" lands on a Vercel login wall.** Anonymous `curl` → `302 → vercel.com/login`, title `Login – Vercel`. The earlier "liveness verified" check passed because it ran in an authenticated browser. Fix: Vercel → Settings → Deployment Protection → off. The other 4 live links and all 5 repos are genuinely public (verified anonymously).
3. ~~**4 agents or 5?**~~ **STRUCTURALLY RESOLVED 2026-07-15 — one call left for you.** It was worse than this row said: the site made **four** count assertions across **two** values, and `/haiku` rendered all four in one scroll (`5-agent OS` chip · `4 agents, one system` · `four agents, one system` · `a five-agent os`). `ARC.waves[2]` was the third surface and no prior pass caught it. The count now derives from `AGENTIC_STACK.length` everywhere (`AGENT_COUNT` / `AGENT_WORD`), so all six surfaces move together and **the 5 is unsayable**. Proved it: temporarily added a 5th stack entry → every route flipped to `5-agent`/`five-agent`; removed it → back to 4. **Your call:** it now renders **4** because the array has 4 layers. If the true answer is 5, don't retype a 5 — add the missing layer to `AGENTIC_STACK` and every surface follows. (`5 terminals at 3am` is untouched — different axis, as this row correctly said.)
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
