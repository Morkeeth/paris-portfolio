'use client';

import Terminal from '@/components/terminal/Terminal';

export default function AboutPage() {
  return (
    <div className="min-h-screen px-8 py-32 font-mono">
      <div className="max-w-2xl mx-auto">
        {/* ASCII Art */}
        <pre className="text-white text-xs mb-8 opacity-30">
{`    ▸ about.md`}
        </pre>
        
        {/* Header */}
        <h1 className="text-3xl text-white mb-12">about</h1>
        
        {/* Content */}
        <div className="space-y-12 text-base">
          {/* Bio */}
          <section>
            <p className="text-white mb-4">
              paris. staff product manager at ledger. based in the city that shares my name.
            </p>
            <p className="text-[var(--foreground-dim)] leading-relaxed mb-4">
              i own the tier-one roadmap and transform ambitious visions into shipped realities. 
              my approach to product management is both strategic and poetic—every feature is a verse, 
              every sprint is a stanza, every release is a complete story.
            </p>
            <p className="text-[var(--foreground-dim)] leading-relaxed">
              before ledger, i spent years building 0-to-1 products at startups, learning that the 
              best products emerge from deep user empathy combined with ruthless prioritization.
            </p>
          </section>
          
          <div className="text-xs text-white opacity-20">{'─'.repeat(60)}</div>
          
          {/* Philosophy */}
          <section>
            <p className="text-white mb-4">philosophy</p>
            <div className="text-[var(--foreground-dim)] space-y-2 leading-relaxed">
              <p><span className="text-white">▸</span> every decision starts with the user—their pain is my compass</p>
              <p><span className="text-white">▸</span> vision without execution is hallucination—i ship</p>
              <p><span className="text-white">▸</span> best products are built by teams, not heroes—i orchestrate</p>
              <p><span className="text-white">▸</span> continuous learning isn't optional—the landscape evolves daily</p>
              <p><span className="text-white">▸</span> data informs, intuition guides, users validate</p>
            </div>
          </section>
          
          <div className="text-xs text-white opacity-20">{'─'.repeat(60)}</div>
          
          {/* Skills */}
          <section>
            <p className="text-white mb-4">expertise</p>
            <div className="text-[var(--foreground-dim)] space-y-3">
              <div>
                <p className="text-white text-sm mb-1">product</p>
                <p className="text-xs">strategy • roadmap • vision • discovery • prioritization • metrics</p>
              </div>
              <div>
                <p className="text-white text-sm mb-1">leadership</p>
                <p className="text-xs">cross-functional • stakeholders • agile • scrum • mentorship • culture</p>
              </div>
              <div>
                <p className="text-white text-sm mb-1">technical</p>
                <p className="text-xs">api design • data analysis • a/b testing • specs • web3 • crypto</p>
              </div>
              <div>
                <p className="text-white text-sm mb-1">research</p>
                <p className="text-xs">user interviews • surveys • usability • competitive analysis • market fit</p>
              </div>
            </div>
          </section>
          
          <div className="text-xs text-white opacity-20">{'─'.repeat(60)}</div>
          
          {/* Quote */}
          <section>
            <blockquote className="border-l-2 border-white/20 pl-4 text-[var(--foreground-dim)] italic">
              "the best products don't just solve problems—they create moments of delight 
              that users remember long after they've closed the app."
            </blockquote>
            <p className="text-[var(--foreground-dimmer)] text-xs mt-2 text-right">— philosophy, 2024</p>
          </section>
        </div>
        
        {/* ASCII Divider */}
        <pre className="text-white text-xs my-16 opacity-20">
{`~∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿~`}
        </pre>
        
        {/* Terminal */}
        <div className="mt-20">
          <p className="text-[var(--foreground-dim)] text-sm mb-4">
            interactive terminal • type 'help' for commands
          </p>
          <Terminal />
        </div>
      </div>
    </div>
  );
}
