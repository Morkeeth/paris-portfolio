# Portfolio — Pre-Deploy Review Phase (2026-07-13)

The gate before `oscarmorke.com`. Review each item on **localhost:3001** (toggle fable · opus · sonnet · haiku).
Mark each line: ✅ good · ✏️ change (say what) · ❌ cut. Nothing deploys until §0 is all ✅.

Goal reminder: **same context, same stories — the model is the differentiator.** Content is the constant; design voice is the variable.

---

## 0. Deploy gates (all must be ✅)
- [ ] Images reviewed + gaps filled/accepted
- [ ] Copy reviewed
- [ ] Stories in your voice (§3)
- [ ] Useful graph added + reviewed (§4)
- [ ] Micro-animation pass (§5)
- [ ] Open facts + renames resolved (§6)
- [ ] Cohesion pass — name-the-model-from-any-screenshot (§7)
- [ ] Branch pushed → merged
- [ ] Live on oscarmorke.com (your gate)

---

## 1. Images  (8 on disk · 11 missing)

| Project | Track | Image | Note / action |
|---|---|---|---|
| Ledger | work | ✅ ledger.jpg | ok |
| Anotherblock | work | ✅ anotherblock.jpg | ok |
| Etablera | work | ✅ etablera.jpg | ⚠️ 770KB — compress |
| Wave Radio | work | ❌ none | add cover art? |
| RELAY | agents | ⚠️ relay.png | 22KB, low-res — **replace** (+ RELAY→FAVOUR, §6) |
| Yieldbound | agents | ✅ yieldbound.png | ok |
| RECEIPT | agents | ✅ receipt.png | ok |
| Loop | agents | ✅ loop.png | ok |
| The OS | agents | ❌ none | terminal screenshot? (it's the hero of "the stack") |
| Bagel / Hermes / People Radar / BriefMCP | agents | ❌ none | text-only by design in "the stack" — accept? |
| Gates | hack | ✅ gates.jpg | ok |
| ArbiGates / NFT Safe / AAtomato / Swosh / Contrib | hack | ❌ none | timeline-only (no card) — accept? |

**Decisions:** (a) replace `relay.png`; (b) add an image for The OS? (c) accept text-only for the rest?

---

## 2. Copy

Strong already — the voice is there: *"wine and cheese between deploys"*, *"smultronställe"*, *"what if it works out?"*, *"the system remembers so i can think."*
Review for: anything that reads generic, any claim you want softened/sharpened.
- Hero taglines per model — ✅/✏️?
- `THOUGHTS` (the coda/notes lines) — ✅/✏️?
- Track blurbs (full-time / agentic / hackathons) — ✅/✏️?

---

## 3. Stories — the human voice  (the original objective)

Project `story` fields are mostly **factual**, and decent. But the three you picked to *humanize* aren't captured yet:

| Category | Anchor | Status | Needs |
|---|---|---|---|
| Full-time | **the arc** (Etablera → rocky road → PM: Matos, Antler, grants, DeFi) | ❌ not written | 3-Q interview |
| Agentic | **The OS / 5 terminals** | factual only | the *feel* of a 3am night |
| Hackathons | **Gates / Bogotá** | factual only | the scene + why it grabs you |

**Decision:** do the 3-question interview per category now (I capture, draft in your voice, you approve) — or ship factual?

---

## 4. Useful graph  ✅ BUILT — 4 ways (review on localhost)

**"The record over time" — prize $ per event, 2018 → 2026**, from real `HACKATHON_TIMELINE`. Rendered 4 ways (same data, four voices):
- **Haiku** — `$ ./record --plot`, ascii block bars, `$14,169 ← peak`
- **Opus** — "PLATE I", engraved gold bars, hollow ticks for no-purse years, above the record list
- **Sonnet** — "Fig. 1", thin ruled bars, editorial caption
- **Fable** — hand-drawn line + colored dots sized by prize, draws in on scroll

Story it tells: prize-hunting years (2021–23, Bogotá peak) → 2026 the bars flatten *on purpose* (stopped counting purses, started shipping). Draw-in animation on all four.
**Your call:** keep 4-ways (recommended, on-theme) or also add a shared one on `/compare`?

### Fixed this pass (number hygiene)
- `$$51M` → `$51M` (sonnet ledger KPI, double-dollar bug)
- prizes KPI `$115k` → `$188k` (sonnet had the pre-hygiene number hardcoded)
- swept all 4 pages: no other stale numbers / double-dollars

---

## 5. Micro-animations  🟡 in progress (within taste rules: no bounce/spring/parallax/twinkle)

Done this pass:
- ✅ Graph **draw-in** on all 4 charts (bars grow / line draws on scroll)
- ✅ Opus hero numbers **count up** (9 · $188K+ · 40K · $51M) — the crescendo reveal
- ✅ Haiku terminal **cursor** blink (signature)
- ✅ Stack reveals staggered (all 4)

Still available if you want them:
- Count-ups on sonnet/fable already exist; haiku left static (correct for terminal)
- Hover: project accent **underline draw** (unify the language) — needs your taste call

---

## 6. Open facts + renames  (Helicon flags dead names in live claims)

### ✅ Decided + applied (Jul 13)
- **RELAY → FAVOUR** — card now titled "RELAY → FAVOUR"; story reads "won as RELAY … ships today as FAVOUR". Timeline keeps the win credited as RELAY.
- **NVIDIA** — kept "nvidia-sponsored ai hackathon" (sponsor context, no role claim). ✅ correct as-is.
- **Model labels /compare** — now Opus 4.8 · Sonnet 5 · Haiku 4.5 · Fable 5.

### ⛔ Still open
- **Hermes** — you said "tweak it" but we didn't capture WHAT. Current copy: *"grok-powered agent on the vps, sibling to bagel. takes what the system writes and gets it out the door."* → tell me the fix tomorrow (model? role? the "ships" framing?).


- **Hermes** wording — confirm: *"grok-powered agent on the vps, sibling to bagel — ships what the system writes."*
- **NVIDIA** — *"nvidia-sponsored ai hackathon"* (2019). Your role: running / competing / attending?
- **RELAY → FAVOUR** — live product is FAVOUR; the World Build win *was* as RELAY. Keep RELAY (historical) / rename to FAVOUR / show "RELAY → FAVOUR"?
- **Model version labels on `/compare`** — currently "Opus 4 · Sonnet 4 · Haiku 4 · Fable 5". Stale: current families are **Opus 4.8 · Sonnet 5 · Haiku 4.5 · Fable 5**. Which version built each page? (I won't guess — tell me and I'll set them.)

---

## 7. Cohesion pass  (last, after content locks)

Each page commits fully to its archetype so a stranger names the model from *any* screenshot:
- **Haiku** — all-terminal, kill stray serif
- **Opus** — lean harder into the score/movement metaphor
- **Sonnet** — full editorial grid discipline
- **Fable** — the paint/story world all the way through

---

### How do you want to run it?
Top-down together, or I start on the highest-leverage build (**the graph, 4 ways**) while you review images + copy on localhost?
