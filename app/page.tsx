'use client';

import Link from 'next/link';
import Terminal from '@/components/terminal/Terminal';
import { useParticles } from '@/lib/use-particles';
import { useReveal } from '@/lib/use-reveal';

export default function Home() {
  const canvasRef = useParticles({ style: 'vessel' });
  const { sectionClass } = useReveal();

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-full opacity-[0.07] z-0"
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-16">

        {/* breadcrumb */}
        <div className="text-[#bbb] text-xs mb-20">
          morkeeth / README.md <span className="cursor-blink">█</span>
        </div>

        {/* ═══════════ HERO ═══════════ */}
        <section data-index="0" className={sectionClass(0, 'mb-16')}>
          <h1 className="text-3xl md:text-4xl text-[#111] font-normal mb-6">
            <span className="text-[#ccc] select-none syntax"># </span>morkeeth
          </h1>

          <div className="text-[#888] text-sm space-y-1 mb-6">
            <p><span className="text-[#ccc] select-none">&gt; </span>staff product manager @ ledger</p>
            <p><span className="text-[#ccc] select-none">&gt; </span>paris, 2026</p>
          </div>

          <p className="text-[#aaa] text-sm italic">
            building calm products for wild markets.
          </p>
        </section>

        <div className="text-[#ddd] text-sm my-12 select-none">---</div>

        {/* ═══════════ REPOSITORY ═══════════ */}
        <section data-index="1" className={sectionClass(1, 'mb-16')}>
          <h2 className="text-lg text-[#222] mb-6">
            <span className="text-[#ccc] select-none syntax">## </span>repository
          </h2>

          <pre className="text-[#888] text-xs leading-relaxed overflow-x-auto">{`morkeeth/
├── README.md
├── CHANGELOG.md
├── takes/
│   ├── agents.md
│   ├── calm.md
│   ├── prompts.md
│   ├── web3.md
│   ├── md-files.md
│   └── context.md
├── writing/
│   └── the-way-of-product.md
└── contact.md`}</pre>
        </section>

        <div className="text-[#ddd] text-sm my-12 select-none">---</div>

        {/* ═══════════ NOW ═══════════ */}
        <section data-index="2" className={sectionClass(2, 'mb-16')}>
          <h2 className="text-lg text-[#222] mb-6">
            <span className="text-[#ccc] select-none syntax">## </span>now
          </h2>

          <div className="text-[#555] text-sm space-y-4 leading-relaxed">
            <p>
              running product at ledger.<br />
              btc, eth, sol wallet for 3M+ users.<br />
              15 engineers. 4 designers. one roadmap.
            </p>
            <p>
              playing tennis three times a week.<br />
              DJing on weekends — house, techno, deep.
            </p>
            <p className="text-[#999]">
              3 claude code terminals. 3 cursor windows.<br />
              agents in telegram. everything is an .md file.
            </p>
          </div>
        </section>

        <div className="text-[#ddd] text-sm my-12 select-none">---</div>

        {/* ═══════════ CHANGELOG ═══════════ */}
        <section data-index="3" className={sectionClass(3, 'mb-16')}>
          <h2 className="text-lg text-[#222] mb-8">
            <span className="text-[#ccc] select-none syntax">## </span>changelog
          </h2>

          {/* Ledger */}
          <div className="mb-8">
            <h3 className="text-sm text-[#222] mb-3">
              <span className="text-[#ccc] select-none syntax">### </span>2023—now · Ledger · Paris
            </h3>
            <div className="text-[#666] text-sm space-y-1 pl-0">
              <p><span className="text-[#ccc] select-none">- </span>staff product manager</p>
              <p><span className="text-[#ccc] select-none">- </span>tier-one wallet roadmap: btc, eth, sol</p>
              <p><span className="text-[#ccc] select-none">- </span>cut startup time 6s → 3s</p>
              <p><span className="text-[#ccc] select-none">- </span>recovered $1M from a single bug</p>
              <p><span className="text-[#ccc] select-none">- </span>3M+ users</p>
            </div>
          </div>

          {/* anotherblock */}
          <div className="mb-8">
            <h3 className="text-sm text-[#222] mb-3">
              <span className="text-[#ccc] select-none syntax">### </span>2021—2023 · anotherblock · Stockholm
            </h3>
            <div className="text-[#666] text-sm space-y-1">
              <p><span className="text-[#ccc] select-none">- </span>founding product, fractional music rights on-chain</p>
              <p><span className="text-[#ccc] select-none">- </span>rihanna. the weeknd. michael jackson.</p>
              <p><span className="text-[#ccc] select-none">- </span>0 → 40k users, $2.1M volume</p>
              <p><span className="text-[#ccc] select-none">- </span>coinbase partnership, digital vinyl line</p>
              <p><span className="text-[#ccc] select-none">- </span>68% credit card adoption, $320k+ in grants</p>
            </div>
          </div>

          {/* Contrib */}
          <div className="mb-8">
            <h3 className="text-sm text-[#222] mb-3">
              <span className="text-[#ccc] select-none syntax">### </span>2020—2021 · Contrib · Web3
            </h3>
            <div className="text-[#666] text-sm space-y-1">
              <p><span className="text-[#ccc] select-none">- </span>web3 contribution tracking, shipped MVP in 3 days</p>
              <p><span className="text-[#ccc] select-none">- </span>won ETH Lisbon, grew to 800 builders</p>
              <p><span className="text-[#ccc] select-none">- </span>$95k acquisition offer — turned it down</p>
            </div>
            <p className="text-[#bbb] text-xs mt-2 pl-4">
              MetaCartel · ShineDAO · Gates.wtf · FWB · ETH NYC · Antler
            </p>
          </div>

          {/* NIH */}
          <div className="mb-8">
            <h3 className="text-sm text-[#222] mb-3">
              <span className="text-[#ccc] select-none syntax">### </span>2019—2020 · Nordic Innovation House · SF
            </h3>
            <div className="text-[#666] text-sm space-y-1">
              <p><span className="text-[#ccc] select-none">- </span>fellow, product lead for 180 companies</p>
              <p><span className="text-[#ccc] select-none">- </span>events: 30 → 300+, stanford AI hackathon</p>
              <p><span className="text-[#ccc] select-none">- </span>4 startup–investor matches</p>
            </div>
          </div>

          {/* Etablera */}
          <div className="mb-4">
            <h3 className="text-sm text-[#222] mb-3">
              <span className="text-[#ccc] select-none syntax">### </span>2017—2019 · Etablera · Sweden
            </h3>
            <div className="text-[#666] text-sm space-y-1">
              <p><span className="text-[#ccc] select-none">- </span>sweden&apos;s largest student innovation consultancy</p>
              <p><span className="text-[#ccc] select-none">- </span>30+ projects, 4 government contracts</p>
              <p><span className="text-[#ccc] select-none">- </span>hackathon: 200 → 8,000 participants</p>
            </div>
            <p className="text-[#bbb] text-xs mt-2 pl-4">
              shiba creative · 12 hackathons · 120 ads · 60k followers · 240M impressions
            </p>
            <p className="text-[#ccc] text-xs mt-1 pl-4">
              Hack for Sweden · Dream for Sweden · SAS · Hack the Crisis · OpenHack
            </p>
          </div>
        </section>

        <div className="text-[#ddd] text-sm my-12 select-none">---</div>

        {/* ═══════════ AGENT TAKES ═══════════ */}
        <section data-index="4" className={sectionClass(4, 'mb-16')}>
          <p className="text-[#222] text-sm mb-2">
            <span className="text-[#999]">$ </span>claude &quot;what are morkeeth&apos;s takes?&quot;
          </p>
          <p className="text-[#bbb] text-xs mb-8">
            <span className="text-[#ccc] select-none">&gt; </span>analyzing takes/ ... found 6 files
          </p>

          <div className="space-y-6">
            <div className="text-[#555] text-sm leading-relaxed">
              <p><span className="text-[#ccc] select-none">&gt; </span>every PM will manage 10 agents</p>
              <p><span className="text-[#ccc] select-none">&gt; </span>before they manage 10 people.</p>
              <p className="text-[#ccc] text-xs mt-1 pl-4">— agents.md</p>
            </div>

            <div className="text-[#555] text-sm leading-relaxed">
              <p><span className="text-[#ccc] select-none">&gt; </span>the .md file is the new unit of thought.</p>
              <p><span className="text-[#ccc] select-none">&gt; </span>not the slide deck. not the PRD.</p>
              <p className="text-[#ccc] text-xs mt-1 pl-4">— md-files.md</p>
            </div>

            <div className="text-[#555] text-sm leading-relaxed">
              <p><span className="text-[#ccc] select-none">&gt; </span>web3&apos;s real legacy isn&apos;t tokens.</p>
              <p><span className="text-[#ccc] select-none">&gt; </span>it&apos;s proving strangers can build together</p>
              <p><span className="text-[#ccc] select-none">&gt; </span>without asking permission.</p>
              <p className="text-[#ccc] text-xs mt-1 pl-4">— web3.md</p>
            </div>

            <div className="text-[#555] text-sm leading-relaxed">
              <p><span className="text-[#ccc] select-none">&gt; </span>calm products, wild markets.</p>
              <p><span className="text-[#ccc] select-none">&gt; </span>if your team is panicking,</p>
              <p><span className="text-[#ccc] select-none">&gt; </span>your product will too.</p>
              <p className="text-[#ccc] text-xs mt-1 pl-4">— calm.md</p>
            </div>

            <div className="text-[#555] text-sm leading-relaxed">
              <p><span className="text-[#ccc] select-none">&gt; </span>the best PMs in 2026 don&apos;t write specs.</p>
              <p><span className="text-[#ccc] select-none">&gt; </span>they write prompts.</p>
              <p className="text-[#ccc] text-xs mt-1 pl-4">— prompts.md</p>
            </div>

            <div className="text-[#555] text-sm leading-relaxed">
              <p><span className="text-[#ccc] select-none">&gt; </span>the context window replaced the meeting room.</p>
              <p><span className="text-[#ccc] select-none">&gt; </span>the terminal replaced the whiteboard.</p>
              <p className="text-[#ccc] text-xs mt-1 pl-4">— context.md</p>
            </div>
          </div>
        </section>

        <div className="text-[#ddd] text-sm my-12 select-none">---</div>

        {/* ═══════════ THE WAY ═══════════ */}
        <section data-index="5" className={sectionClass(5, 'mb-16')}>
          <h2 className="text-lg text-[#222] mb-6">
            <span className="text-[#ccc] select-none syntax">## </span>the way of product
          </h2>

          <p className="text-[#888] text-sm italic leading-relaxed mb-4">
            &ldquo;the roadmap that can be followed<br />
            is not the eternal roadmap.&rdquo;
          </p>

          <p className="text-[#aaa] text-xs mb-6">
            a short book on shipping with wisdom over force.<br />
            7 verses. 8 minutes. bring tea.
          </p>

          <Link
            href="/way"
            className="text-[#222] text-sm"
          >
            read →
          </Link>
        </section>

        <div className="text-[#ddd] text-sm my-12 select-none">---</div>

        {/* ═══════════ TERMINAL ═══════════ */}
        <section data-index="6" className={sectionClass(6, 'mb-16')}>
          <p className="text-[#bbb] text-xs mb-4">type &apos;help&apos;</p>
          <Terminal />
        </section>

        <div className="text-[#ddd] text-sm my-12 select-none">---</div>

        {/* ═══════════ CONNECT ═══════════ */}
        <section data-index="7" className={sectionClass(7, 'mb-16')}>
          <h2 className="text-lg text-[#222] mb-6">
            <span className="text-[#ccc] select-none syntax">## </span>connect
          </h2>

          <p className="text-[#666] text-sm mb-4">
            <span className="text-[#ccc] select-none">- </span>
            x:{' '}
            <a
              href="https://x.com/morkeeth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#222]"
            >
              @morkeeth
            </a>
          </p>

          <p className="text-[#aaa] text-xs">
            open to product, music, tennis, and building.
          </p>
        </section>

        <div className="text-[#ddd] text-sm my-12 select-none">---</div>

        {/* ═══════════ FOOTER ═══════════ */}
        <footer className="pb-16 text-[#ddd] text-xs">
          built with agents · deployed with purpose
        </footer>

      </div>
    </div>
  );
}
