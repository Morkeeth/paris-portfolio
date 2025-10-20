'use client';

export default function ExperiencePage() {
  return (
    <div className="min-h-screen px-8 py-32 font-mono">
      <div className="max-w-4xl mx-auto">
        
        {/* ASCII Art Header */}
        <pre className="text-[var(--foreground)] text-xs mb-12 leading-tight opacity-70">
{`
    ╔════════════════════════════════════════════════════════╗
    ║                                                        ║
    ║      E X P E R I E N C E  &  A D V E N T U R E S      ║
    ║                                                        ║
    ║         the journey from junior to staff pm           ║
    ║                                                        ║
    ╚════════════════════════════════════════════════════════╝
`}
        </pre>
        
        {/* Timeline */}
        <div className="space-y-12 mb-20">
          {/* Current Role */}
          <div className="border-l-2 border-[var(--glass-border)] pl-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-[var(--foreground)] text-xl font-medium">staff product manager</h3>
                <p className="text-[var(--foreground-dim)]">ledger</p>
              </div>
              <span className="text-[var(--foreground-dimmer)] text-sm">2023 - present</span>
            </div>
            <p className="text-[var(--foreground-dim)] text-sm mt-3">
              leading tier-one roadmap. shipping features. herding cats (engineers, designers, stakeholders). 
              occasionally playing tennis during lunch breaks.
            </p>
          </div>
          
          {/* Previous Role */}
          <div className="border-l-2 border-[var(--glass-border)] pl-6 opacity-80">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-[var(--foreground)] text-xl font-medium">senior product manager</h3>
                <p className="text-[var(--foreground-dim)]">ledger</p>
              </div>
              <span className="text-[var(--foreground-dimmer)] text-sm">2022 - 2023</span>
            </div>
            <p className="text-[var(--foreground-dim)] text-sm mt-3">
              the year i learned that "senior" just means you get invited to more meetings. 
              also shipped some cool stuff.
            </p>
          </div>
          
          {/* Earlier Role */}
          <div className="border-l-2 border-[var(--glass-border)] pl-6 opacity-60">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-[var(--foreground)] text-xl font-medium">product manager</h3>
                <p className="text-[var(--foreground-dim)]">tech startup</p>
              </div>
              <span className="text-[var(--foreground-dimmer)] text-sm">2020 - 2022</span>
            </div>
            <p className="text-[var(--foreground-dim)] text-sm mt-3">
              where i learned to ship fast, break things, and apologize later. 
              also where my hair started falling out (correlation? causation?).
            </p>
          </div>
          
          {/* Early Days */}
          <div className="border-l-2 border-[var(--glass-border)] pl-6 opacity-40">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-[var(--foreground)] text-xl font-medium">associate product manager</h3>
                <p className="text-[var(--foreground-dim)]">digital agency</p>
              </div>
              <span className="text-[var(--foreground-dimmer)] text-sm">2018 - 2020</span>
            </div>
            <p className="text-[var(--foreground-dim)] text-sm mt-3">
              fresh out of university. full head of hair. zero idea what i was doing. 
              learned everything the hard way.
            </p>
          </div>
        </div>
        
        <pre className="text-[var(--foreground-dim)] text-xs mb-12 opacity-20">
{`    ═══════════════════════════════════════════════════════════`}
        </pre>
        
        {/* Stats Grid */}
        <div>
          <h3 className="text-[var(--foreground)] text-xl mb-8">// by the numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="border border-[var(--glass-border)] p-4">
              <p className="text-[var(--foreground)] text-3xl font-bold mb-2">15+</p>
              <p className="text-[var(--foreground-dim)] text-sm">products shipped</p>
            </div>
            <div className="border border-[var(--glass-border)] p-4">
              <p className="text-[var(--foreground)] text-3xl font-bold mb-2">3M+</p>
              <p className="text-[var(--foreground-dim)] text-sm">users impacted</p>
            </div>
            <div className="border border-[var(--glass-border)] p-4">
              <p className="text-[var(--foreground)] text-3xl font-bold mb-2">50+</p>
              <p className="text-[var(--foreground-dim)] text-sm">cross-functional team size</p>
            </div>
            <div className="border border-[var(--glass-border)] p-4">
              <p className="text-[var(--foreground)] text-3xl font-bold mb-2">1000+</p>
              <p className="text-[var(--foreground-dim)] text-sm">user interviews</p>
            </div>
            <div className="border border-[var(--glass-border)] p-4">
              <p className="text-[var(--foreground)] text-3xl font-bold mb-2">0</p>
              <p className="text-[var(--foreground-dim)] text-sm">hairs on head</p>
            </div>
            <div className="border border-[var(--glass-border)] p-4">
              <p className="text-[var(--foreground)] text-3xl font-bold mb-2">∞</p>
              <p className="text-[var(--foreground-dim)] text-sm">coffee cups consumed</p>
            </div>
          </div>
        </div>
        
        {/* Skills */}
        <div className="mt-20">
          <h3 className="text-[var(--foreground)] text-xl mb-6">// skills & tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-[var(--foreground)] text-sm mb-3">product management</p>
              <div className="text-[var(--foreground-dim)] text-sm space-y-1">
                <p>• roadmap planning & strategy</p>
                <p>• user research & validation</p>
                <p>• agile/scrum/kanban</p>
                <p>• stakeholder management</p>
                <p>• data-driven decision making</p>
              </div>
            </div>
            <div>
              <p className="text-[var(--foreground)] text-sm mb-3">technical</p>
              <div className="text-[var(--foreground-dim)] text-sm space-y-1">
                <p>• sql, python, javascript</p>
                <p>• figma, miro, notion</p>
                <p>• analytics (amplitude, mixpanel)</p>
                <p>• api design & architecture</p>
                <p>• blockchain & web3</p>
              </div>
            </div>
            <div>
              <p className="text-[var(--foreground)] text-sm mb-3">tennis</p>
              <div className="text-[var(--foreground-dim)] text-sm space-y-1">
                <p>• forehand: deadly</p>
                <p>• backhand: improving</p>
                <p>• serve: work in progress</p>
                <p>• trash talk: expert level</p>
              </div>
            </div>
            <div>
              <p className="text-[var(--foreground)] text-sm mb-3">djing</p>
              <div className="text-[var(--foreground-dim)] text-sm space-y-1">
                <p>• house, techno, deep house</p>
                <p>• beat matching: flawless</p>
                <p>• reading the crowd: essential</p>
                <p>• headphone hair: non-issue</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <pre className="text-[var(--foreground)] text-xs mt-20 opacity-30">
{`
              ╔═══════════════════════════════════╗
              ║                                   ║
              ║  "experience is just a fancy      ║
              ║   word for mistakes you learned   ║
              ║   from."                          ║
              ║                                   ║
              ╚═══════════════════════════════════╝
`}
        </pre>
      </div>
    </div>
  );
}
