'use client';

import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen px-8 py-32 font-mono">
      <div className="max-w-4xl mx-auto">
        
        {/* ASCII Art Header */}
        <pre className="text-white text-xs mb-12 leading-tight">
{`
    ╔════════════════════════════════════════════════════════╗
    ║                                                        ║
    ║         V I S I O N S   M A D E   R E A L             ║
    ║                                                        ║
    ║     where strategy meets execution, dreams ship       ║
    ║                                                        ║
    ╚════════════════════════════════════════════════════════╝
`}
        </pre>
        
        <p className="text-[var(--foreground-dim)] mb-16 leading-relaxed italic">
          each project is a chapter in a larger story. each feature a verse in an ongoing poem.
          these are the products that bear my fingerprints—not in code, but in vision.
        </p>
        
        {/* Project 1 */}
        <div className="mb-20">
          <pre className="text-white text-xs mb-6 opacity-50">
{`  ┌──────────────────────────────────┐
  │  ledger tier-1 roadmap           │
  │  2023 - present                  │
  └──────────────────────────────────┘`}
          </pre>
          
          <pre className="text-white text-[10px] mb-6 opacity-30 leading-tight">
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
          
          <p className="text-white mb-4">the magnum opus. the crown jewel.</p>
          
          <p className="text-[var(--foreground-dim)] mb-6 leading-relaxed">
            imagine: millions of people trusting you with their financial future. one wrong decision
            and fortunes vanish. one right decision and doors open to economic freedom. this is 
            not just product management—this is responsibility incarnate.
          </p>
          
          <div className="space-y-2 text-[var(--foreground-dim)] text-sm mb-6">
            <p><span className="text-white">▸</span> led cross-functional team of 15+ brilliant minds</p>
            <p><span className="text-white">▸</span> shipped 5 major features that users actually wanted</p>
            <p><span className="text-white">▸</span> 40% increase in engagement (but who's counting?)</p>
            <p><span className="text-white">▸</span> nps improved by 25 points (they're happier, we sleep better)</p>
          </div>
          
          <blockquote className="border-l-2 border-white/20 pl-4 text-[var(--foreground-dim)] italic text-sm">
            "before paris, we had features. after paris, we had a narrative."
            <span className="block text-xs mt-2 not-italic opacity-50">— engineering lead, ledger</span>
          </blockquote>
        </div>
        
        <pre className="text-white text-xs mb-20 opacity-20">
{`    ═══════════════════════════════════════════════════════════`}
        </pre>
        
        {/* Project 2 */}
        <div className="mb-20">
          <pre className="text-white text-xs mb-6 opacity-50">
{`  ┌──────────────────────────────────┐
  │  product innovation lab          │
  │  2023                            │
  └──────────────────────────────────┘`}
          </pre>
          
          <pre className="text-white text-[10px] mb-6 opacity-30 leading-tight">
{`          ╔════════╗
          ║  LAB   ║
          ╚════════╝
         ┌──┴──┴──┐
         │ ◯  ◯  ◯│  experiments
         │  ◯  ◯  │  prototypes
         └────────┘  magic`}
          </pre>
          
          <p className="text-white mb-4">permission to dream. permission to fail. permission to innovate.</p>
          
          <p className="text-[var(--foreground-dim)] mb-6 leading-relaxed">
            established an internal laboratory where wild ideas could breathe. no judgment,
            no politics, just rapid prototyping and user validation. because the best products
            often start as someone's "crazy idea" at 2am.
          </p>
          
          <div className="space-y-2 text-[var(--foreground-dim)] text-sm mb-6">
            <p><span className="text-white">▸</span> validated 10+ concepts through real user testing</p>
            <p><span className="text-white">▸</span> 3 concepts graduated to full production</p>
            <p><span className="text-white">▸</span> reduced time-to-market by 30%</p>
            <p><span className="text-white">▸</span> created culture where innovation is celebrated, not feared</p>
          </div>
        </div>
        
        <pre className="text-white text-xs mb-20 opacity-20">
{`    ═══════════════════════════════════════════════════════════`}
        </pre>
        
        {/* Project 3 */}
        <div className="mb-20">
          <pre className="text-white text-xs mb-6 opacity-50">
{`  ┌──────────────────────────────────┐
  │  cross-platform harmony          │
  │  2022                            │
  └──────────────────────────────────┘`}
          </pre>
          
          <pre className="text-white text-[10px] mb-6 opacity-30 leading-tight">
{`      ╔═══╗  ╔═══╗  ╔═══╗
      ║web║  ║mob║  ║des║
      ╚═╤═╝  ╚═╤═╝  ╚═╤═╝
        └──────┴──────┘
           harmony`}
          </pre>
          
          <p className="text-white mb-4">three platforms. one vision. unified experience.</p>
          
          <p className="text-[var(--foreground-dim)] mb-6 leading-relaxed">
            users don't care about your technical debt or platform silos. they care about
            their experience. so we tore down walls, unified design systems, and made
            the experience seamless whether you're on chrome, ios, or windows.
          </p>
          
          <div className="space-y-2 text-[var(--foreground-dim)] text-sm">
            <p><span className="text-white">▸</span> unified 3 disparate platforms into coherent whole</p>
            <p><span className="text-white">▸</span> support tickets dropped 45% (users confused less)</p>
            <p><span className="text-white">▸</span> cross-platform usage up 60% (seamless transitions)</p>
            <p><span className="text-white">▸</span> dev velocity improved 35% (shared components)</p>
          </div>
        </div>
        
        {/* ASCII Footer */}
        <pre className="text-white text-xs my-16 opacity-30">
{`
              ╔═══════════════════════════════════╗
              ║                                   ║
              ║  "the best products tell stories. ║
              ║   the best stories change lives." ║
              ║                                   ║
              ║        — a product builder        ║
              ║                                   ║
              ╚═══════════════════════════════════╝
`}
        </pre>
        
        <div className="text-[var(--foreground-dim)] text-center">
          <p className="mb-4">want to build the next chapter together?</p>
          <Link href="/contact" className="text-white hover:underline">
            let's create something meaningful →
          </Link>
        </div>
        
        <pre className="text-white text-xs mt-20 opacity-20">
{`
         *
        /|\\
       / | \\      more stories waiting to be written...
      /  |  \\
     /   |   \\
    /____|____\\
`}
        </pre>
      </div>
    </div>
  );
}
