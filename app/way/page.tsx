'use client';

import { useParticles } from '@/lib/use-particles';
import { useReveal } from '@/lib/use-reveal';

const verses = [
  {
    num: 1,
    lines: [
      "The roadmap that can be followed is not the eternal roadmap.\nThe feature that can be named is not the limitless feature.",
      "From nothing, the user's need arises.\nFrom need, ten thousand solutions emerge.",
      "Free from attachment to metrics,\nyou see the essence.\nCaught in vanity metrics,\nyou see only the surface.",
      "These two spring from the same source.\nThis mystery — the gateway to all understanding.",
    ],
  },
  {
    num: 2,
    lines: [
      "When we call a feature brilliant,\nother features become dull.\nWhen we praise speed,\nthe notion of deliberation is born.",
      "Simplicity and complexity define each other.\nUser and builder create each other.\nProblem and solution follow each other.",
      "Therefore the product manager acts\nwithout forcing,\nteaches without preaching.",
      "She builds without claiming ownership.\nShips without seeking credit.\nThe work completes itself.",
    ],
  },
  {
    num: 7,
    lines: [
      "Great products endure.\nEternal, they transcend trends and hype.\nThey last because\nthey do not serve the ego of their makers.",
      "The product manager stays behind,\nthat is why she's ahead.\nShe is detached from the outcome,\nthus at one with the user.",
      "Through selfless action,\nshe is perfectly fulfilled.",
    ],
  },
  {
    num: 11,
    lines: [
      "Thirty features spoke together at the hub,\nbut it is the core use case\nthat makes the product useful.",
      "We shape screens and flows,\nbut it is the white space between\nthat holds attention.",
      "Therefore profit comes from what is present,\nbut usefulness comes from what is absent.",
    ],
  },
  {
    num: 17,
    lines: [
      "The best product manager is barely known.\nNext comes one whom users love and praise.\nNext, one whom they fear.\nWorst, one whom they despise.",
      'The wise PM speaks little.\nWhen the work is done,\nthe product shipped,\nthe team will say:\n"We built this ourselves."',
    ],
  },
  {
    num: 63,
    lines: [
      "Act without doing.\nWork without effort.\nThink without complexity.",
      "Face difficult features while they are easy.\nSolve great problems while they are small.",
      "The journey of ten thousand sprints\nbegins beneath your feet.",
      "Because the product manager has no goal in mind,\neverything is accomplished.",
    ],
  },
  {
    num: 81,
    lines: [
      "True words are not eloquent.\nEloquent words are not true.\nGood products are not complex.\nComplex products are not good.",
      "The more she does for users,\nthe more she has.\nThe more she gives to the team,\nthe greater her abundance.",
      "The way of product is to build without harming.\nThe way of the product manager is to act\nwithout contending.",
    ],
  },
];

export default function WayPage() {
  const canvasRef = useParticles({ style: 'vessel' });
  const { sectionClass } = useReveal();

  return (
    <div className="min-h-screen bg-[#F0EEE6] text-[#333]">
      <canvas ref={canvasRef} aria-hidden="true" className="fixed top-0 left-0 w-full h-full opacity-[0.15] z-0" />

      <div className="relative z-10 pt-14">
        {/* Preface */}
        <section data-index="0" className={sectionClass(0, 'min-h-screen flex items-center justify-center px-8 py-24')}>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm tracking-[0.3em] uppercase text-[#666] mb-4 font-mono">
              THE WAY OF PRODUCT
            </p>
            <h1 className="text-3xl md:text-4xl italic text-[#333] mb-4 font-[family-name:var(--font-crimson)]">
              The Timeless Art of Building
            </h1>
            <p className="text-[#999] text-sm font-mono mb-12">
              Oscar Morkeeth
            </p>

            <div className="text-lg leading-relaxed text-[#666] space-y-4 font-[family-name:var(--font-crimson)]">
              <p>
                a short book of 7 verses<br />
                on shipping with wisdom over force.
              </p>
              <p className="italic text-[#999]">
                eight-minute read. bring tea.
              </p>
            </div>
          </div>
        </section>

        {/* Verses */}
        {verses.map((verse, idx) => (
          <section
            key={verse.num}
            data-index={idx + 1}
            className={sectionClass(idx + 1, 'min-h-screen flex items-center justify-center px-8 py-24')}
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-5xl md:text-6xl font-[family-name:var(--font-crimson)] text-[#333] opacity-30 text-center mb-12">
                {verse.num}
              </div>
              <div className="space-y-8">
                {verse.lines.map((line, i) => (
                  <p
                    key={i}
                    className="text-xl md:text-2xl leading-relaxed text-[#333] whitespace-pre-line font-[family-name:var(--font-crimson)] verse-text"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Closing */}
        <section
          data-index={verses.length + 1}
          className={sectionClass(verses.length + 1, 'min-h-screen flex items-center justify-center px-8 py-24')}
        >
          <div className="max-w-2xl mx-auto text-center">
            <pre className="text-[#999] opacity-15 text-xs mb-12 font-mono">
{`    ════════════════════════════════════════`}
            </pre>

            <div className="text-xl italic text-[#666] leading-relaxed space-y-6 mb-12 font-[family-name:var(--font-crimson)]">
              <p>
                The product that can be shipped<br />
                is already outdated.<br />
                The vision that can be articulated<br />
                is already limited.
              </p>
              <p>
                Build in the space between knowing and not-knowing.<br />
                Ship from the place of humble uncertainty.<br />
                Lead without needing to be seen.
              </p>
              <p className="text-[#333]">This is the way.</p>
            </div>

            <p className="text-[#999] text-sm mb-2 font-mono">Oscar Morkeeth · Paris · 2025</p>
            <p className="text-[#aaa] text-xs font-mono">Staff Product Manager @ Ledger</p>
          </div>
        </section>
      </div>
    </div>
  );
}
