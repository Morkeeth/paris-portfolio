# Paris Portfolio

**Owner:** Oscar Alexander Mörke
**Live:** https://paris-portfolio-sigma.vercel.app
**Repo:** github.com/Morkeeth/paris-portfolio

## Stack

- Next.js 16, TypeScript, Tailwind CSS 4
- Vercel (region: cdg1 / Paris)
- Static site — no database, no auth

## Architecture

Single-page scrolling portfolio + one standalone page (/way).

```
app/
  page.tsx              → Single-page portfolio (hero → story → terminal → connect)
  way/page.tsx          → "The Way of Product" (7 verses, standalone)
  opengraph-image.tsx   → Dynamic OG image (edge runtime)
  icon.svg              → Favicon (lowercase "o")
  layout.tsx            → Root layout, fonts, meta
  globals.css           → Base styles, terminal animations

components/
  navigation/Navigation.tsx  → Back nav (only shows on /way)
  terminal/Terminal.tsx      → Interactive CLI embedded in main page

lib/
  use-particles.ts     → Canvas particle animation hook (drift + vessel modes)
  use-reveal.ts        → Scroll-triggered fade-in hook
  terminal-commands.ts → Terminal command definitions
```

## Design

- Single page, text-first, no images
- Cream (#F0EEE6) background, dark (#333) text
- JetBrains Mono (mono/UI) + Crimson Text (serif/body)
- ASCII box-drawing art as section headers
- Canvas particle animation (vessel on home/way, drift elsewhere)
- Scroll-reveal fade-in per section
- Respects prefers-reduced-motion

## Sections (main page)

1. Hero — ASCII name, title, tagline
2. Intro — personal origin story
3. Sweden 2017-2019 — Etablera, Shiba Creative, hackathons
4. Silicon Valley 2019-2020 — Nordic Innovation House
5. Web3 2020-2021 — Contrib, MetaCartel, ETH NYC
6. anotherblock 2021-2023 — founding product, music rights
7. Ledger 2023-now — staff PM, impact metrics
8. The Way of Product — teaser + link to /way
9. Terminal — interactive CLI
10. Connect — @morkeeth on X
