# Paris Portfolio

**Owner:** Oscar Morkeeth
**Live:** https://morkeeth.vercel.app (project domain, tracks production) · legacy alias: https://paris-portfolio-sigma.vercel.app
**Repo:** github.com/Morkeeth/paris-portfolio
**Legacy site (separate, do not touch):** https://morkeeth-portfolio.vercel.app — the 2024 typewriter site, kept as an artifact

## Stack

- Next.js 16, TypeScript, Tailwind CSS 4
- Vercel (region: cdg1 / Paris)
- Static site — no database, no auth

## Architecture (V4 — multi-model on shared data)

Four design variants render the same content from one data layer. Root redirects to `/fable` (the hero variant); `/compare` is the hub.

```
app/
  page.tsx              → redirect to /fable
  fable/                → HERO variant: dark (#060606), full-bleed hero images, matisse accents
  opus/ sonnet/ haiku/  → alternate design variants (same data)
  compare/              → variant comparison hub
  shared/data.ts        → SINGLE SOURCE OF TRUTH: bio, stats, projects, timeline, journey
  opengraph-image.tsx   → OG/link-preview card (fable aesthetic)
  layout.tsx            → fonts (JetBrains Mono, DM Sans, DM Serif Display), meta
  icon.svg              → favicon
```

## Content rules

- All copy lives in `app/shared/data.ts` — edit there, every variant updates
- Tracks: Work (paid, real scope) / Agents (2026 nights) / Hackathons (competitive record)
- 8 featured cards with real screenshots; full record in HACKATHON_TIMELINE
- Prize framing: $188K+ = ~42 ETH team prizes (hero counter + journey agree)
- Oscar's voice: lowercase, specific numbers, dinner-party test, no hype
