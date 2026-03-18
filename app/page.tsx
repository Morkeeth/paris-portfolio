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

      <div className="relative z-10 max-w-2xl mx-auto px-8 text-center">

        {/* ═══════════════════ HERO ═══════════════════ */}
        <section data-index="0" className={sectionClass(0, 'min-h-screen flex flex-col items-center justify-center py-24')}>
          <pre aria-hidden="true" className="hidden md:block text-[#999] text-xs mb-10 leading-tight opacity-50">{`   ██████╗ ███████╗ ██████╗ █████╗ ██████╗
  ██╔═══██╗██╔════╝██╔════╝██╔══██╗██╔══██╗
  ██║   ██║███████╗██║     ███████║██████╔╝
  ██║   ██║╚════██║██║     ██╔══██║██╔══██╗
  ╚██████╔╝███████║╚██████╗██║  ██║██║  ██║
   ╚═════╝ ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝`}</pre>

          <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-crimson)] text-[#333] mb-6">
            oscar morkeeth
          </h1>

          <p className="text-[#666] text-lg font-mono mb-1">
            staff product manager @ ledger
          </p>
          <p className="text-[#999] text-sm font-mono mb-12">
            paris, france
          </p>

          <p className="text-[#555] text-xl leading-relaxed font-[family-name:var(--font-crimson)] italic">
            build calm products<br />
            for wild markets.
          </p>

          <p className="text-[#bbb] text-sm font-mono mt-20">↓</p>
        </section>

        {/* ═══════════════════ INTRO ═══════════════════ */}
        <section data-index="1" className={sectionClass(1, 'min-h-screen flex flex-col items-center justify-center py-24')}>
          <pre aria-hidden="true" className="text-[#bbb] text-xs mb-12 opacity-30">{`        ∘
       ∘ ∘
      ∘   ∘
       ∘ ∘
        ∘`}</pre>

          <div className="space-y-8 text-xl leading-relaxed font-[family-name:var(--font-crimson)]">
            <p className="text-[#333]">
              studied industrial engineering in sweden.<br />
              was supposed to optimize factories.
            </p>
            <p className="text-[#555]">
              got obsessed with startups instead.
            </p>
            <p className="text-[#888]">
              spent the next decade building things —<br />
              hackathons, agencies, communities, products.<br />
              some worked. most didn&apos;t.<br />
              all of them taught me something.
            </p>
          </div>
        </section>

        {/* ═══════════════════ ETABLERA ═══════════════════ */}
        <section data-index="2" className={sectionClass(2, 'min-h-screen flex flex-col items-center justify-center py-24')}>
          <p className="text-[#bbb] text-xs font-mono mb-12 tracking-widest">
            SWEDEN · 2017—2019
          </p>

          <div className="space-y-8 text-xl leading-relaxed font-[family-name:var(--font-crimson)]">
            <p className="text-[#333]">
              co-founded <em>Etablera</em> —<br />
              sweden&apos;s largest student innovation consultancy.
            </p>
            <p className="text-[#555]">
              30+ projects. 4 government contracts.<br />
              scaled the national hackathon<br />
              from 200 to 8,000 participants.
            </p>
          </div>

          <pre aria-hidden="true" className="text-[#bbb] text-xs mt-12 mb-12 opacity-30">{`────────────`}</pre>

          <p className="text-[#333] text-lg font-[family-name:var(--font-crimson)] mb-6">
            Shiba Creative Collective
          </p>

          <div className="text-[#888] font-mono text-sm space-y-1">
            <p>12 hackathons</p>
            <p>120 short ads</p>
            <p>60,000 followers</p>
            <p>240,000,000 impressions</p>
          </div>

          <pre aria-hidden="true" className="text-[#bbb] text-xs mt-12 opacity-30">{`────────────`}</pre>

          <p className="text-[#aaa] text-xs font-mono mt-8 leading-relaxed">
            Hack for Sweden · Dream for Sweden<br />
            SAS Hackathon · Hack the Crisis<br />
            OpenHack · Sana Labs · JIP
          </p>
        </section>

        {/* ═══════════════════ SILICON VALLEY ═══════════════════ */}
        <section data-index="3" className={sectionClass(3, 'min-h-screen flex flex-col items-center justify-center py-24')}>
          <p className="text-[#bbb] text-xs font-mono mb-12 tracking-widest">
            SILICON VALLEY · 2019—2020
          </p>

          <div className="space-y-8 text-xl leading-relaxed font-[family-name:var(--font-crimson)]">
            <p className="text-[#333]">
              moved to san francisco.<br />
              fellow at <em>Nordic Innovation House</em>.
            </p>
            <p className="text-[#555]">
              product lead for 180 companies.<br />
              then covid hit and everything went online.
            </p>
            <p className="text-[#888]">
              events went from 30 to 300+.<br />
              stanford AI hackathon.<br />
              4 startup–investor matches.
            </p>
          </div>

          <p className="text-[#aaa] text-xs font-mono mt-12 leading-relaxed">
            VEX · Insure X · Style Seek<br />
            Dark Kitchen · Blind Date · Clubhouse
          </p>
        </section>

        {/* ═══════════════════ WEB3 ═══════════════════ */}
        <section data-index="4" className={sectionClass(4, 'min-h-screen flex flex-col items-center justify-center py-24')}>
          <p className="text-[#bbb] text-xs font-mono mb-12 tracking-widest">
            WEB3 · 2020—2021
          </p>

          <div className="space-y-8 text-xl leading-relaxed font-[family-name:var(--font-crimson)]">
            <p className="text-[#333]">
              went down the rabbit hole.
            </p>
            <p className="text-[#555]">
              built <em>Contrib</em> — web3 contribution tracking.<br />
              shipped the MVP in 3 days.<br />
              won ETH Lisbon. grew to 800 builders.
            </p>
            <p className="text-[#888]">
              got a $95k acquisition offer.<br />
              turned it down.
            </p>
            <p className="text-[#888] italic">
              learned what creating vs founding<br />
              actually meant.
            </p>
          </div>

          <p className="text-[#aaa] text-xs font-mono mt-12 leading-relaxed">
            MetaCartel · ShineDAO · ORK+Mate<br />
            Gates.wtf · FWB x Matos · Cryptobar<br />
            NFT Safe Launch @ ETH NYC · Dat Punk · Antler
          </p>
        </section>

        {/* ═══════════════════ ANOTHERBLOCK ═══════════════════ */}
        <section data-index="5" className={sectionClass(5, 'min-h-screen flex flex-col items-center justify-center py-24')}>
          <p className="text-[#bbb] text-xs font-mono mb-12 tracking-widest">
            STOCKHOLM → REMOTE · 2021—2023
          </p>

          <div className="space-y-8 text-xl leading-relaxed font-[family-name:var(--font-crimson)]">
            <p className="text-[#333]">
              joined <em>anotherblock</em> as founding product.<br />
              fractional music ownership on-chain.
            </p>
            <p className="text-[#333]">
              Rihanna. The Weeknd. Michael Jackson.
            </p>
            <p className="text-[#555]">
              0 → 40,000 users.<br />
              $2.1M volume.
            </p>
            <p className="text-[#888]">
              coinbase partnership. &ldquo;Digital Vinyl&rdquo; line.<br />
              68% credit card adoption. $320k+ in grants.<br />
              sales doubled after we made it easy to pay.
            </p>
          </div>
        </section>

        {/* ═══════════════════ LEDGER ═══════════════════ */}
        <section data-index="6" className={sectionClass(6, 'min-h-screen flex flex-col items-center justify-center py-24')}>
          <p className="text-[#bbb] text-xs font-mono mb-12 tracking-widest">
            PARIS · 2023—NOW
          </p>

          <div className="space-y-8 text-xl leading-relaxed font-[family-name:var(--font-crimson)]">
            <p className="text-[#333]">
              staff product manager at <em>Ledger</em>.
            </p>
            <p className="text-[#555]">
              own the tier-one roadmap.<br />
              btc, eth, sol wallet<br />
              for millions of users.
            </p>
            <p className="text-[#888]">
              15+ engineers, 4 designers, one roadmap.<br />
              cut startup time in half.<br />
              recovered $1M from a single bug.<br />
              the kind of work where details compound.
            </p>
          </div>

          <pre aria-hidden="true" className="text-[#bbb] text-xs mt-16 mb-10 opacity-30">{`═══════════════════════════`}</pre>

          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="text-2xl md:text-3xl font-[family-name:var(--font-crimson)] text-[#333]">6s → 3s</p>
              <p className="text-[#aaa] text-xs font-mono mt-2">startup time</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-[family-name:var(--font-crimson)] text-[#333]">$1M</p>
              <p className="text-[#aaa] text-xs font-mono mt-2">recovered</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-[family-name:var(--font-crimson)] text-[#333]">3M+</p>
              <p className="text-[#aaa] text-xs font-mono mt-2">users</p>
            </div>
          </div>
        </section>

        {/* ═══════════════════ NOW ═══════════════════ */}
        <section data-index="7" className={sectionClass(7, 'min-h-screen flex flex-col items-center justify-center py-24')}>
          <pre aria-hidden="true" className="text-[#bbb] text-xs mb-12 opacity-30">{`        ∘
       ∘ ∘
      ∘   ∘
       ∘ ∘
        ∘`}</pre>

          <div className="space-y-8 text-xl leading-relaxed font-[family-name:var(--font-crimson)]">
            <p className="text-[#333]">
              now i&apos;m in paris.
            </p>
            <p className="text-[#555]">
              running product at ledger.<br />
              playing tennis three times a week.<br />
              DJing on weekends.
            </p>
            <p className="text-[#888] italic">
              house, techno, deep house —<br />
              whatever makes people move.
            </p>
          </div>
        </section>

        {/* ═══════════════════ THE WAY ═══════════════════ */}
        <section data-index="8" className={sectionClass(8, 'min-h-screen flex flex-col items-center justify-center py-24')}>
          <pre aria-hidden="true" className="text-[#bbb] text-xs mb-12 opacity-40">{`        ◇
       ╱ ╲
      ╱   ╲
     ╱  ✦  ╲
    ╱       ╲
   ◇─────────◇`}</pre>

          <p className="text-xl font-[family-name:var(--font-crimson)] italic text-[#555] leading-relaxed mb-8">
            &ldquo;The roadmap that can be followed<br />
            is not the eternal roadmap.&rdquo;
          </p>

          <p className="text-[#888] text-base font-[family-name:var(--font-crimson)] mb-10">
            a short book on shipping<br />
            with wisdom over force.
          </p>

          <Link
            href="/way"
            className="text-[#999] hover:text-[#333] font-mono text-sm transition-colors border-b border-[#ccc] hover:border-[#333] pb-1"
          >
            read the way of product →
          </Link>
        </section>

        {/* ═══════════════════ TERMINAL ═══════════════════ */}
        <section data-index="9" className={sectionClass(9, 'py-32 text-left')}>
          <p className="text-[#aaa] text-xs font-mono mb-6 text-center">
            terminal · type &apos;help&apos;
          </p>
          <Terminal />
        </section>

        {/* ═══════════════════ CONNECT ═══════════════════ */}
        <section data-index="10" className={sectionClass(10, 'min-h-[60vh] flex flex-col items-center justify-center py-24')}>
          <p className="text-lg font-[family-name:var(--font-crimson)] text-[#555] mb-10">
            open to conversations about<br />
            product, music, tennis, and life.
          </p>

          <a
            href="https://x.com/morkeeth"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#333] hover:text-[#666] transition-colors font-mono text-sm"
          >
            → x.com/morkeeth
          </a>
        </section>

        {/* ═══════════════════ FOOTER ═══════════════════ */}
        <footer className="py-24">
          <pre aria-hidden="true" className="text-[#ccc] text-xs opacity-40">{`        ∘
       ∘ ∘
      ∘   ∘
       ∘ ∘
        ∘`}</pre>
          <p className="text-[#bbb] text-xs font-mono mt-8">
            built with intention · deployed with purpose
          </p>
        </footer>
      </div>
    </div>
  );
}
