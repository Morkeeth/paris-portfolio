'use client';

import Terminal from '@/components/terminal/Terminal';

export default function AboutPage() {
  return (
    <div className="min-h-screen px-8 py-32 font-mono">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl text-white mb-12">about</h1>
        
        {/* Content */}
        <div className="space-y-12 text-base">
          {/* Bio */}
          <section>
            <p className="text-white mb-4">
              paris. staff product manager at ledger.
            </p>
            <p className="text-[var(--foreground-dim)] leading-relaxed">
              i own the tier-one roadmap and transform ambitious visions into shipped realities. 
              based in the city that shares my name. every feature is a verse, every sprint is a stanza.
            </p>
          </section>
          
          {/* Philosophy */}
          <section>
            <p className="text-white mb-3">philosophy</p>
            <div className="text-[var(--foreground-dim)] space-y-2 leading-relaxed">
              <p>every decision starts with the user</p>
              <p>vision without execution is hallucination</p>
              <p>best products are built by teams</p>
              <p>continuous learning is essential</p>
            </div>
          </section>
          
          {/* Skills */}
          <section>
            <p className="text-white mb-3">skills</p>
            <div className="text-[var(--foreground-dim)] space-y-1">
              <p>product strategy • roadmap planning</p>
              <p>cross-functional leadership • user research</p>
              <p>agile/scrum • data analysis</p>
              <p>api design • technical specifications</p>
            </div>
          </section>
        </div>
        
        {/* Terminal */}
        <div className="mt-20">
          <Terminal />
        </div>
      </div>
    </div>
  );
}
