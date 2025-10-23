'use client';

import { useState } from 'react';
import Link from 'next/link';
import SelectedWork from '@/components/SelectedWork';
import { hero, proofStrip, about, footer } from '@/content/content';

export default function Home() {
  const [showFullAbout, setShowFullAbout] = useState(false);
  
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-medium mb-6 leading-tight">
            {hero.title}
          </h1>
          <p className="text-[var(--foreground-dim)] text-lg md:text-xl mb-8 leading-relaxed max-w-3xl">
            {hero.subtitle}
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href={hero.primaryCta.href}
              className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
            >
              {hero.primaryCta.label}
            </a>
            <Link
              href={hero.secondaryCta.href}
              className="px-6 py-3 border border-white/20 font-medium rounded-lg hover:border-white/40 transition-colors"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      {/* Proof Strip */}
      <section className="py-12 px-8 border-y border-white/10 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 md:gap-8 text-sm text-[var(--foreground-dim)]">
            {proofStrip.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <span className="text-white/20">•</span>}
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <SelectedWork />

      {/* About */}
      <section className="py-24 px-8 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-medium mb-8 lowercase">about</h2>
          <p className="text-[var(--foreground-dim)] text-lg leading-relaxed mb-6">
            {showFullAbout ? about.long : about.short}
          </p>
          <button
            onClick={() => setShowFullAbout(!showFullAbout)}
            className="text-[var(--foreground-dim)] hover:text-white transition-colors text-sm underline"
          >
            {showFullAbout ? 'Show less' : 'Read more'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[var(--foreground-dimmer)] text-sm lowercase">
            {footer}
          </p>
        </div>
      </footer>
    </div>
  );
}
