'use client';

import Link from 'next/link';
import Terminal from '@/components/terminal/Terminal';
import { useParticles } from '@/lib/use-particles';
import { useReveal } from '@/lib/use-reveal';

export default function Home() {
  const canvasRef = useParticles({ style: 'vessel' });
  const { sectionClass } = useReveal();

  return (
    <div className="min-h-screen bg-[#F0EEE6] text-[#333]">
      <canvas ref={canvasRef} aria-hidden="true" className="fixed top-0 left-0 w-full h-full opacity-[0.12] z-0" />

      <div className="relative z-10 max-w-2xl mx-auto px-8">

        {/* ═══════════════════ HERO ═══════════════════ */}
        <section data-index="0" className={sectionClass(0, 'min-h-screen flex flex-col justify-center py-24')}>
          <pre aria-hidden="true" className="hidden md:block text-[#999] text-xs mb-10 leading-tight opacity-50">{`   ██████╗ ███████╗ ██████╗ █████╗ ██████╗
  ██╔═══██╗██╔════╝██╔════╝██╔══██╗██╔══██╗
  ██║   ██║███████╗██║     ███████║██████╔╝
  ██║   ██║╚════██║██║     ██╔══██║██╔══██╗
  ╚██████╔╝███████║╚██████╗██║  ██║██║  ██║
   ╚═════╝ ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝`}</pre>

          <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-crimson)] text-[#333] mb-4">
            Oscar Alexander Mörke
          </h1>

          <p className="text-[#666] text-lg font-mono mb-1">
            staff product manager @ ledger
          </p>
          <p className="text-[#999] text-sm font-mono mb-10">
            paris, france
          </p>

          <p className="text-[#555] text-xl leading-relaxed font-[family-name:var(--font-crimson)]">
            i build calm products for wild markets.
          </p>

          <p className="text-[#999] text-sm font-mono mt-16">↓ scroll</p>
        </section>

        {/* ═══════════════════ INTRO ═══════════════════ */}
        <section data-index="1" className={sectionClass(1, 'py-32')}>
          <div className="space-y-8 text-lg leading-relaxed font-[family-name:var(--font-crimson)]">
            <p className="text-[#333]">
              i studied industrial engineering in sweden. was supposed to
              optimize factories. got obsessed with startups instead.
            </p>
            <p className="text-[#555]">
              spent my twenties building things — hackathons, agencies,
              communities, products. some worked. most didn&apos;t. all of
              them taught me something.
            </p>
            <p className="text-[#888]">
              now i&apos;m in paris, running product at ledger,
              playing tennis three times a week, and DJing on weekends.
            </p>
          </div>
        </section>

        {/* ═══════════════════ ETABLERA ═══════════════════ */}
        <section data-index="2" className={sectionClass(2, 'py-32')}>
          <pre aria-hidden="true" className="text-[#bbb] text-xs mb-10 opacity-50 overflow-x-auto">{`┌─────────────────────────────────────┐
│  sweden, 2017—2019                  │
└─────────────────────────────────────┘`}</pre>

          <div className="space-y-8 text-lg leading-relaxed font-[family-name:var(--font-crimson)]">
            <p className="text-[#333]">
              co-founded <strong>Etablera</strong> — sweden&apos;s largest student
              innovation consultancy. 30+ projects, 4 government contracts.
              scaled the national hackathon from 200 to 8,000 participants.
            </p>
            <p className="text-[#555]">
              around the same time, ran <strong>Shiba Creative Collective</strong>.
              12 hackathons. 120 short ads. 60,000 followers.
              240 million impressions.
            </p>
          </div>

          <div className="mt-10 text-sm text-[#aaa] font-mono leading-relaxed">
            Hack for Sweden · Dream for Sweden · SAS Hackathon ·
            Hack the Crisis · OpenHack · Sana Labs · JIP
          </div>
        </section>

        {/* ═══════════════════ SILICON VALLEY ═══════════════════ */}
        <section data-index="3" className={sectionClass(3, 'py-32')}>
          <pre aria-hidden="true" className="text-[#bbb] text-xs mb-10 opacity-50 overflow-x-auto">{`┌─────────────────────────────────────┐
│  silicon valley, 2019—2020          │
└─────────────────────────────────────┘`}</pre>

          <div className="space-y-8 text-lg leading-relaxed font-[family-name:var(--font-crimson)]">
            <p className="text-[#333]">
              moved to san francisco as a fellow at <strong>Nordic Innovation
              House</strong>. product lead for 180 companies. then covid hit
              and everything went online.
            </p>
            <p className="text-[#555]">
              events went from 30 to 300+ average attendance.
              stanford AI hackathon. 4 startup–investor matches.
            </p>
          </div>

          <div className="mt-10 text-sm text-[#aaa] font-mono leading-relaxed">
            VEX · Insure X · Style Seek · Dark Kitchen · Blind Date · Clubhouse
          </div>
        </section>

        {/* ═══════════════════ WEB3 ═══════════════════ */}
        <section data-index="4" className={sectionClass(4, 'py-32')}>
          <pre aria-hidden="true" className="text-[#bbb] text-xs mb-10 opacity-50 overflow-x-auto">{`┌─────────────────────────────────────┐
│  web3, 2020—2021                    │
└─────────────────────────────────────┘`}</pre>

          <div className="space-y-8 text-lg leading-relaxed font-[family-name:var(--font-crimson)]">
            <p className="text-[#333]">
              went down the rabbit hole. built <strong>Contrib</strong> — web3
              contribution tracking. shipped the MVP in 3 days.
              won ETH Lisbon. grew to 800 builders.
            </p>
            <p className="text-[#555]">
              got a $95k acquisition offer. turned it down.
              learned what creating vs founding actually meant.
              wasn&apos;t ready to be a founder yet.
            </p>
          </div>

          <div className="mt-10 text-sm text-[#aaa] font-mono leading-relaxed">
            MetaCartel · ShineDAO · ORK+Mate · Gates.wtf ·
            FWB x Matos · Cryptobar · NFT Safe Launch @ ETH NYC ·
            Dat Punk · Antler
          </div>
        </section>

        {/* ═══════════════════ ANOTHERBLOCK ═══════════════════ */}
        <section data-index="5" className={sectionClass(5, 'py-32')}>
          <pre aria-hidden="true" className="text-[#bbb] text-xs mb-10 opacity-50 overflow-x-auto">{`┌─────────────────────────────────────┐
│  stockholm → remote, 2021—2023      │
└─────────────────────────────────────┘`}</pre>

          <div className="space-y-8 text-lg leading-relaxed font-[family-name:var(--font-crimson)]">
            <p className="text-[#333]">
              joined <strong>anotherblock</strong> as founding product.
              fractional music ownership — Rihanna, The Weeknd,
              Michael Jackson on-chain.
            </p>
            <p className="text-[#333]">
              0 → 40,000 users. $2.1M volume.
            </p>
            <p className="text-[#555]">
              coinbase partnership. &ldquo;Digital Vinyl&rdquo; line.
              68% credit card adoption. $320k+ in grants.
              sales doubled after we made it easy to pay.
            </p>
          </div>
        </section>

        {/* ═══════════════════ LEDGER ═══════════════════ */}
        <section data-index="6" className={sectionClass(6, 'py-32')}>
          <pre aria-hidden="true" className="text-[#bbb] text-xs mb-10 opacity-50 overflow-x-auto">{`┌─────────────────────────────────────┐
│  paris, 2023—now                    │
└─────────────────────────────────────┘`}</pre>

          <div className="space-y-8 text-lg leading-relaxed font-[family-name:var(--font-crimson)]">
            <p className="text-[#333]">
              staff product manager at <strong>Ledger</strong>.
              own the tier-one roadmap — btc, eth, sol wallet
              for millions of users.
            </p>
            <p className="text-[#555]">
              15+ engineers, 4 designers, one roadmap.
              cut startup time in half. recovered $1M from a
              single bug. the kind of work where details compound.
            </p>
          </div>

          <pre aria-hidden="true" className="text-[#bbb] text-xs mt-12 mb-8 opacity-40">{`═══════════════════════════════════════`}</pre>

          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-[family-name:var(--font-crimson)] text-[#333]">6s → 3s</p>
              <p className="text-[#aaa] text-xs font-mono mt-1">startup time</p>
            </div>
            <div>
              <p className="text-3xl font-[family-name:var(--font-crimson)] text-[#333]">$1M</p>
              <p className="text-[#aaa] text-xs font-mono mt-1">recovered</p>
            </div>
            <div>
              <p className="text-3xl font-[family-name:var(--font-crimson)] text-[#333]">3M+</p>
              <p className="text-[#aaa] text-xs font-mono mt-1">users</p>
            </div>
          </div>
        </section>

        {/* ═══════════════════ THE WAY ═══════════════════ */}
        <section data-index="7" className={sectionClass(7, 'py-32 text-center')}>
          <pre aria-hidden="true" className="text-[#bbb] text-xs mb-10 opacity-40">{`        ◇
       ╱ ╲
      ╱   ╲
     ╱  ✦  ╲
    ╱       ╲
   ◇─────────◇`}</pre>

          <p className="text-xl font-[family-name:var(--font-crimson)] italic text-[#555] leading-relaxed mb-6">
            &ldquo;The roadmap that can be followed<br />
            is not the eternal roadmap.&rdquo;
          </p>

          <p className="text-[#888] text-base font-[family-name:var(--font-crimson)] mb-8">
            a short book on shipping with wisdom over force.
          </p>

          <Link
            href="/way"
            className="text-[#999] hover:text-[#333] font-mono text-sm transition-colors border-b border-[#ccc] hover:border-[#333] pb-1"
          >
            read the way of product →
          </Link>
        </section>

        {/* ═══════════════════ TERMINAL ═══════════════════ */}
        <section data-index="8" className={sectionClass(8, 'py-32')}>
          <p className="text-[#aaa] text-xs font-mono mb-6">
            terminal · type &apos;help&apos;
          </p>
          <Terminal />
        </section>

        {/* ═══════════════════ CONNECT ═══════════════════ */}
        <section data-index="9" className={sectionClass(9, 'py-32')}>
          <pre className="text-[#bbb] text-xs mb-10 opacity-40">{`┌─────────────────────────────────────┐
│  connect                            │
└─────────────────────────────────────┘`}</pre>

          <p className="text-lg font-[family-name:var(--font-crimson)] text-[#555] mb-8">
            open to conversations about product, music, tennis, and life.
          </p>

          <a
            href="https://x.com/morkeeth"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#333] hover:text-[#666] transition-colors font-mono text-sm"
          >
            → x.com/morkeeth
          </a>

          <div className="mt-12 text-sm text-[#aaa] font-mono space-y-1">
            <p>product roles · advisory · speaking · coffee</p>
          </div>
        </section>

        {/* ═══════════════════ FOOTER ═══════════════════ */}
        <footer className="py-24 text-center">
          <pre aria-hidden="true" className="text-[#bbb] text-xs opacity-30">{`┌─────────────────────────────────────┐
│                                     │
│   built with intention              │
│   deployed with purpose             │
│   maintained with humility          │
│                                     │
└─────────────────────────────────────┘`}</pre>
        </footer>
      </div>
    </div>
  );
}
