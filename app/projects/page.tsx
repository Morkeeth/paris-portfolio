'use client';

import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen px-8 py-32 font-mono">
      <div className="max-w-4xl mx-auto">
        
        {/* ASCII Art Header */}
        <pre className="text-[var(--foreground)] text-xs mb-12 leading-tight opacity-70">
{`
    ╔════════════════════════════════════════════════════════╗
    ║                                                        ║
    ║         P R O J E C T S  &  S H I P M E N T S         ║
    ║                                                        ║
    ║          stuff i built that actually works            ║
    ║                                                        ║
    ╚════════════════════════════════════════════════════════╝
`}
        </pre>
        
        <p className="text-[var(--foreground-dim)] mb-16 leading-relaxed">
          these are the products i've shipped. each one taught me something. 
          each one made users' lives better. some even made me lose sleep. 
          all worth it.
        </p>
        
        {/* Project 1 */}
        <div className="mb-20">
          <pre className="text-[var(--foreground)] text-xs mb-6 opacity-50">
{`  ┌──────────────────────────────────┐
  │  ledger tier-1 roadmap           │
  │  2023 - present                  │
  └──────────────────────────────────┘`}
          </pre>
          
          <pre className="text-[var(--foreground-dim)] text-[10px] mb-6 opacity-40 leading-tight">
{`       ┌─────────────────┐
       │   L E D G E R   │
       │  ═══════════════ │
       │ secure • simple  │
       └─────────────────┘
            ║  ║  ║
         ═══╩══╩══╩═══
        protecting value
         empowering users`}
          </pre>
          
          <p className="text-[var(--foreground)] mb-4">the main gig. the big kahuna.</p>
          
          <p className="text-[var(--foreground-dim)] mb-6 leading-relaxed">
            leading product strategy for ledger's core platform. millions of users 
            trusting us with their crypto. no pressure, right? (there's pressure.)
          </p>
          
          <div className="space-y-2 text-[var(--foreground-dim)] text-sm mb-6">
            <p><span className="text-[var(--foreground)]">▸</span> led cross-functional team of 15+ brilliant humans</p>
            <p><span className="text-[var(--foreground)]">▸</span> shipped 5 major features users actually wanted</p>
            <p><span className="text-[var(--foreground)]">▸</span> 40% increase in engagement</p>
            <p><span className="text-[var(--foreground)]">▸</span> nps improved by 25 points (they like us!)</p>
          </div>
          
          <blockquote className="border-l-2 border-[var(--glass-border)] pl-4 text-[var(--foreground-dim)] italic text-sm">
            "oscar makes roadmapping look easy. it's not. he's just that good."
            <span className="block text-xs mt-2 not-italic opacity-50">— engineering lead, ledger</span>
          </blockquote>
        </div>
        
        <pre className="text-[var(--foreground-dim)] text-xs mb-20 opacity-20">
{`    ═══════════════════════════════════════════════════════════`}
        </pre>
        
        {/* Project 2 */}
        <div className="mb-20">
          <pre className="text-[var(--foreground)] text-xs mb-6 opacity-50">
{`  ┌──────────────────────────────────┐
  │  product innovation lab          │
  │  2023                            │
  └──────────────────────────────────┘`}
          </pre>
          
          <p className="text-[var(--foreground)] mb-4">permission to experiment. permission to fail fast.</p>
          
          <p className="text-[var(--foreground-dim)] mb-6 leading-relaxed">
            built an internal lab where wild ideas could breathe. rapid prototyping, 
            real user testing, no politics. just making cool stuff and seeing if it sticks.
          </p>
          
          <div className="space-y-2 text-[var(--foreground-dim)] text-sm">
            <p><span className="text-[var(--foreground)]">▸</span> validated 10+ concepts through user testing</p>
            <p><span className="text-[var(--foreground)]">▸</span> 3 concepts graduated to production</p>
            <p><span className="text-[var(--foreground)]">▸</span> 30% faster time-to-market</p>
            <p><span className="text-[var(--foreground)]">▸</span> created a culture of innovation (buzzword, but true)</p>
          </div>
        </div>
        
        <pre className="text-[var(--foreground-dim)] text-xs mb-20 opacity-20">
{`    ═══════════════════════════════════════════════════════════`}
        </pre>
        
        {/* Project 3 */}
        <div className="mb-20">
          <pre className="text-[var(--foreground)] text-xs mb-6 opacity-50">
{`  ┌──────────────────────────────────┐
  │  cross-platform harmony          │
  │  2022                            │
  └──────────────────────────────────┘`}
          </pre>
          
          <p className="text-[var(--foreground)] mb-4">one product, three platforms, zero excuses.</p>
          
          <p className="text-[var(--foreground-dim)] mb-6 leading-relaxed">
            unified web, mobile, and desktop into a coherent experience. 
            because users don't care about your technical debt. 
            they just want things to work.
          </p>
          
          <div className="space-y-2 text-[var(--foreground-dim)] text-sm">
            <p><span className="text-[var(--foreground)]">▸</span> unified 3 disparate platforms</p>
            <p><span className="text-[var(--foreground)]">▸</span> support tickets dropped 45%</p>
            <p><span className="text-[var(--foreground)]">▸</span> cross-platform usage up 60%</p>
            <p><span className="text-[var(--foreground)]">▸</span> dev velocity improved 35%</p>
          </div>
        </div>
        
        {/* ASCII Footer */}
        <pre className="text-[var(--foreground)] text-xs my-16 opacity-30">
{`
              ╔═══════════════════════════════════╗
              ║                                   ║
              ║  "ship products like you serve   ║
              ║   aces—fast, accurate, and with  ║
              ║   confidence."                    ║
              ║                                   ║
              ╚═══════════════════════════════════╝
`}
        </pre>
        
        <div className="text-[var(--foreground-dim)] text-center">
          <p className="mb-4">want to build something together?</p>
          <Link href="/contact" className="text-[var(--foreground)] hover:underline">
            let's talk →
          </Link>
        </div>
      </div>
    </div>
  );
}
