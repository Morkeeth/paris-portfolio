'use client';

import Link from 'next/link';
import Terminal from '@/components/terminal/Terminal';
import Pane from '@/components/Pane';
import { useParticles } from '@/lib/use-particles';
import { useReveal } from '@/lib/use-reveal';

export default function Home() {
  const canvasRef = useParticles({ style: 'vessel' });
  const { sectionClass } = useReveal();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-full h-full opacity-[0.06] z-0"
      />

      <div className="relative z-10">

        {/* ═══════════ HERO ═══════════ */}
        <section
          data-index="0"
          className={sectionClass(0, 'min-h-screen flex flex-col items-center justify-center px-6')}
        >
          <h1 className="text-6xl md:text-8xl text-white font-light tracking-tight mb-6">
            morkeeth<span className="animate-pulse text-[#333]">_</span>
          </h1>
          <p className="text-[#666] text-sm mb-1">staff product manager @ ledger</p>
          <p className="text-[#444] text-xs mb-16">paris · 2026</p>
          <p className="text-[#333] text-xs">↓</p>
        </section>

        {/* ═══════════ README ═══════════ */}
        <section
          data-index="1"
          className={sectionClass(1, 'px-6 py-24')}
        >
          <div className="max-w-2xl mx-auto">
            <Pane path="~/morkeeth/README.md">
              <div className="space-y-4 text-sm leading-relaxed">
                <p className="text-[#999]">
                  this isn&apos;t a portfolio.<br />
                  it&apos;s a workspace.
                </p>
                <p className="text-[#666]">
                  3 claude code terminals. 3 cursor windows.<br />
                  agents in telegram. everything is an .md file.
                </p>
                <div className="border-t border-[#1a1a1a] my-6" />
                <p className="text-[#555]">
                  the process is the product.<br />
                  the context window is the new office.<br />
                  the agent is the new intern.
                </p>
              </div>
            </Pane>
          </div>
        </section>

        {/* ═══════════ NOW + SETUP ═══════════ */}
        <section
          data-index="2"
          className={sectionClass(2, 'px-6 py-16')}
        >
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            <Pane path="~/context/now.md">
              <p className="text-white text-base mb-6">
                <span className="text-[#333]">## </span>now
              </p>
              <div className="space-y-4 text-[#888] text-sm leading-relaxed">
                <p>
                  running product at ledger.<br />
                  btc, eth, sol wallet for 3M+ users.<br />
                  15 engineers. 4 designers. one roadmap.
                </p>
                <p>
                  playing tennis three times a week.<br />
                  DJing on weekends — house, techno, deep.
                </p>
                <p className="text-[#555]">
                  living in paris.<br />
                  building with agents after hours.
                </p>
              </div>
            </Pane>

            <Pane path="~/context/setup.md">
              <p className="text-white text-base mb-6">
                <span className="text-[#333]">## </span>setup
              </p>
              <div className="space-y-3 text-[#888] text-sm">
                <p>3 × claude code <span className="text-[#555]">(terminal)</span></p>
                <p>3 × cursor <span className="text-[#555]">(IDE)</span></p>
                <p>1 × telegram <span className="text-[#555]">(agents)</span></p>
                <p>∞ × .md files</p>
              </div>
              <div className="border-t border-[#1a1a1a] my-6" />
              <div className="text-[#555] text-sm leading-relaxed space-y-2">
                <p>shipping loop, genow, and whatever&apos;s next.</p>
                <p>the laptop is the office. the .md is the meeting.</p>
              </div>
            </Pane>
          </div>
        </section>

        {/* ═══════════ CHANGELOG ═══════════ */}
        <section
          data-index="3"
          className={sectionClass(3, 'px-6 py-24')}
        >
          <div className="max-w-3xl mx-auto">
            <Pane path="~/morkeeth/CHANGELOG.md">
              <h2 className="text-white text-xl mb-10 font-light">
                <span className="text-[#333]"># </span>changelog
              </h2>

              {/* Ledger */}
              <div className="mb-10">
                <p className="text-[#555] text-xs mb-3">2023—now</p>
                <p className="text-white text-base mb-4">Ledger · Paris</p>
                <div className="text-[#888] text-sm leading-relaxed space-y-2">
                  <p>staff product manager.</p>
                  <p>own the tier-one wallet roadmap. btc, eth, sol.</p>
                  <p>cut startup time in half. recovered $1M from a single bug.</p>
                  <p className="text-[#555]">the kind of work where details compound.</p>
                </div>
                <div className="flex gap-6 mt-4 text-[#444] text-xs">
                  <span>6s → 3s startup</span>
                  <span>$1M recovered</span>
                  <span>3M+ users</span>
                </div>
              </div>

              <div className="border-t border-[#1a1a1a] my-8" />

              {/* anotherblock */}
              <div className="mb-10">
                <p className="text-[#555] text-xs mb-3">2021—2023</p>
                <p className="text-white text-base mb-4">anotherblock · Stockholm</p>
                <div className="text-[#888] text-sm leading-relaxed space-y-2">
                  <p>founding product. fractional music ownership on-chain.</p>
                  <p>rihanna. the weeknd. michael jackson.</p>
                  <p>0 → 40k users. $2.1M volume. coinbase partnership.</p>
                  <p>digital vinyl line. 68% credit card adoption. $320k+ in grants.</p>
                </div>
              </div>

              <div className="border-t border-[#1a1a1a] my-8" />

              {/* Contrib */}
              <div className="mb-10">
                <p className="text-[#555] text-xs mb-3">2020—2021</p>
                <p className="text-white text-base mb-4">Contrib · Web3</p>
                <div className="text-[#888] text-sm leading-relaxed space-y-2">
                  <p>web3 contribution tracking. shipped MVP in 3 days.</p>
                  <p>won ETH Lisbon. grew to 800 builders.</p>
                  <p>$95k acquisition offer. turned it down.</p>
                  <p className="text-[#555] italic">learned what creating vs founding actually meant.</p>
                </div>
                <p className="text-[#333] text-xs mt-4">
                  MetaCartel · ShineDAO · Gates.wtf · FWB · ETH NYC · Antler
                </p>
              </div>

              <div className="border-t border-[#1a1a1a] my-8" />

              {/* NIH */}
              <div className="mb-10">
                <p className="text-[#555] text-xs mb-3">2019—2020</p>
                <p className="text-white text-base mb-4">Nordic Innovation House · San Francisco</p>
                <div className="text-[#888] text-sm leading-relaxed space-y-2">
                  <p>fellow. product lead for 180 companies.</p>
                  <p>covid hit. everything went online. events: 30 → 300+.</p>
                  <p>stanford AI hackathon. 4 startup–investor matches.</p>
                </div>
              </div>

              <div className="border-t border-[#1a1a1a] my-8" />

              {/* Etablera */}
              <div>
                <p className="text-[#555] text-xs mb-3">2017—2019</p>
                <p className="text-white text-base mb-4">Etablera · Sweden</p>
                <div className="text-[#888] text-sm leading-relaxed space-y-2">
                  <p>co-founded sweden&apos;s largest student innovation consultancy.</p>
                  <p>30+ projects. 4 government contracts.</p>
                  <p>scaled the national hackathon from 200 to 8,000 participants.</p>
                </div>
                <div className="border-t border-[#1a1a1a] my-6" />
                <p className="text-[#555] text-xs mb-2">also: shiba creative collective</p>
                <p className="text-[#444] text-xs">
                  12 hackathons · 120 short ads · 60k followers · 240M impressions
                </p>
                <p className="text-[#333] text-xs mt-3">
                  Hack for Sweden · Dream for Sweden · SAS Hackathon ·
                  Hack the Crisis · OpenHack · Sana Labs · JIP
                </p>
              </div>
            </Pane>
          </div>
        </section>

        {/* ═══════════ TAKES ═══════════ */}
        <section
          data-index="4"
          className={sectionClass(4, 'px-6 py-24')}
        >
          <div className="max-w-5xl mx-auto">
            <p className="text-[#333] text-xs mb-8 text-center">~/takes/</p>
            <div className="grid md:grid-cols-3 gap-4">
              <Pane path="agents.md">
                <div className="border-l-2 border-[#222] pl-4 text-[#999] text-sm leading-relaxed">
                  <p>every PM will manage</p>
                  <p>10 agents before they</p>
                  <p>manage 10 people.</p>
                </div>
              </Pane>

              <Pane path="md-files.md">
                <div className="border-l-2 border-[#222] pl-4 text-[#999] text-sm leading-relaxed">
                  <p>the .md file is the new</p>
                  <p>unit of thought.</p>
                  <p className="mt-3 text-[#555]">not the slide deck.</p>
                  <p className="text-[#555]">not the PRD.</p>
                </div>
              </Pane>

              <Pane path="web3.md">
                <div className="border-l-2 border-[#222] pl-4 text-[#999] text-sm leading-relaxed">
                  <p>web3&apos;s real legacy</p>
                  <p>isn&apos;t tokens. it&apos;s proving</p>
                  <p>strangers can build together</p>
                  <p>without asking permission.</p>
                </div>
              </Pane>

              <Pane path="calm.md">
                <div className="border-l-2 border-[#222] pl-4 text-[#999] text-sm leading-relaxed">
                  <p>calm products,</p>
                  <p>wild markets.</p>
                  <p className="mt-3 text-[#555]">if your team is panicking,</p>
                  <p className="text-[#555]">your product will too.</p>
                </div>
              </Pane>

              <Pane path="prompts.md">
                <div className="border-l-2 border-[#222] pl-4 text-[#999] text-sm leading-relaxed">
                  <p>the best PMs in 2026</p>
                  <p>don&apos;t write specs.</p>
                  <p>they write prompts.</p>
                </div>
              </Pane>

              <Pane path="context.md">
                <div className="border-l-2 border-[#222] pl-4 text-[#999] text-sm leading-relaxed">
                  <p>the context window</p>
                  <p>replaced the meeting room.</p>
                  <p className="mt-3 text-[#555]">the terminal replaced</p>
                  <p className="text-[#555]">the whiteboard.</p>
                </div>
              </Pane>
            </div>
          </div>
        </section>

        {/* ═══════════ THE WAY ═══════════ */}
        <section
          data-index="5"
          className={sectionClass(5, 'px-6 py-24')}
        >
          <div className="max-w-xl mx-auto">
            <Pane path="~/writing/the-way-of-product.md">
              <p className="text-white text-base mb-4">
                <span className="text-[#333]">## </span>the way of product
              </p>
              <p className="text-[#888] text-sm italic leading-relaxed mb-6">
                &ldquo;the roadmap that can be followed<br />
                is not the eternal roadmap.&rdquo;
              </p>
              <p className="text-[#555] text-xs mb-6">
                a short book on shipping with wisdom over force.<br />
                7 verses. 8 minutes. bring tea.
              </p>
              <Link
                href="/way"
                className="text-[#666] hover:text-white text-xs transition-colors border-b border-[#333] hover:border-white pb-0.5"
              >
                read →
              </Link>
            </Pane>
          </div>
        </section>

        {/* ═══════════ TERMINAL ═══════════ */}
        <section
          data-index="6"
          className={sectionClass(6, 'px-6 py-24')}
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-[#333] text-xs mb-4 text-center">type &apos;help&apos;</p>
            <Terminal />
          </div>
        </section>

        {/* ═══════════ CONNECT ═══════════ */}
        <section
          data-index="7"
          className={sectionClass(7, 'px-6 py-24')}
        >
          <div className="max-w-md mx-auto">
            <Pane path="~/contact.md">
              <p className="text-[#888] text-sm mb-6 leading-relaxed">
                open to conversations about<br />
                product, music, tennis, and building.
              </p>
              <a
                href="https://x.com/morkeeth"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#888] text-sm transition-colors"
              >
                → x.com/morkeeth
              </a>
            </Pane>
          </div>
        </section>

        {/* ═══════════ FOOTER ═══════════ */}
        <footer className="py-16 text-center">
          <p className="text-[#1a1a1a] text-xs">
            built with agents · deployed with purpose
          </p>
        </footer>

      </div>
    </div>
  );
}
