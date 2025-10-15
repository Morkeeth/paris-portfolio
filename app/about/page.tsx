'use client';

import Terminal from '@/components/terminal/Terminal';

export default function AboutPage() {
  return (
    <div className="min-h-screen px-8 py-32 font-mono">
      <div className="max-w-4xl mx-auto">
        
        {/* ASCII Art Header */}
        <pre className="text-white text-xs mb-12 leading-tight">
{`
    ╔════════════════════════════════════════════════════════╗
    ║                                                        ║
    ║     T H E   S T O R Y   O F   A   B U I L D E R       ║
    ║                                                        ║
    ║        where poetry meets product management          ║
    ║                                                        ║
    ╚════════════════════════════════════════════════════════╝
`}
        </pre>
        
        {/* Poetic Story */}
        <div className="space-y-8 text-base leading-relaxed mb-16">
          <section>
            <pre className="text-white text-xs mb-4 opacity-50">
{`  ┌─ chapter i: origins ─┐`}
            </pre>
            <p className="text-white mb-4">
              born in the shadow of the eiffel tower, where art and engineering dance eternal—
            </p>
            <p className="text-[var(--foreground-dim)] mb-4">
              paris learned early that the most beautiful things are both functional and profound.
              a bridge must carry weight, yes, but why not also inspire? a product must solve 
              problems, true, but why not also delight?
            </p>
            <p className="text-[var(--foreground-dim)]">
              in university, while others memorized frameworks, paris wrote poetry in the margins 
              of business textbooks. "user stories," they whispered, "are just stories about users. 
              and every story deserves to be told well."
            </p>
          </section>
          
          <pre className="text-white text-xs opacity-20">
{`    ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲`}
          </pre>
          
          <section>
            <pre className="text-white text-xs mb-4 opacity-50">
{`  ┌─ chapter ii: the awakening ─┐`}
            </pre>
            <p className="text-[var(--foreground-dim)] mb-4">
              first job: associate product manager at a digital agency. they gave paris a desk,
              a laptop, and a stack of user requirements that read like tax code. soul-crushing.
            </p>
            <p className="text-white mb-4">
              but paris saw something others didn't—
            </p>
            <p className="text-[var(--foreground-dim)] mb-4">
              buried in those requirements were human beings. real people with real problems.
              a parent trying to pay bills online at 2am because that's the only quiet hour.
              a student searching for answers, desperate, hopeful.
            </p>
            <p className="text-[var(--foreground-dim)] italic">
              "if we're going to build for them," paris said at a meeting, "we should know their names.
              their stories. their midnight fears."
            </p>
            <p className="text-[var(--foreground-dim)] text-sm mt-4">
              the room went quiet. then someone said, "that's... different."
            </p>
          </section>
          
          <pre className="text-white text-xs opacity-20">
{`    ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲`}
          </pre>
          
          <section>
            <pre className="text-white text-xs mb-4 opacity-50">
{`  ┌─ chapter iii: the climb ─┐`}
            </pre>
            <p className="text-[var(--foreground-dim)] mb-4">
              years passed. paris moved through startups like a river through stone—
              shaping, learning, growing. each failure a lesson. each success a milestone.
            </p>
            <p className="text-white mb-4">
              at a tiny startup with seven people and infinite dreams, paris learned to ship.
              fast. messy. real. "perfect is the enemy of good," became the mantra.
              but paris added a line: "and good is the enemy of meaningful."
            </p>
            <p className="text-[var(--foreground-dim)] mb-4">
              three products from zero to one. 100,000 users who had never heard of them.
              nights spent poring over analytics, not for vanity metrics, but for understanding.
              where did users struggle? where did they smile?
            </p>
            <p className="text-[var(--foreground-dim)] italic">
              metrics tell you what. users tell you why. poetry tells you how.
            </p>
          </section>
          
          <pre className="text-white text-xs opacity-20">
{`    ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲`}
          </pre>
          
          <section>
            <pre className="text-white text-xs mb-4 opacity-50">
{`  ┌─ chapter iv: ledger ─┐`}
            </pre>
            <p className="text-white mb-4">
              then came ledger.
            </p>
            <p className="text-[var(--foreground-dim)] mb-4">
              crypto. security. the bleeding edge where technology meets trust.
              millions of users storing their digital lives in hardware wallets.
              one wrong move and fortunes disappear. one right move and financial freedom.
            </p>
            <p className="text-white mb-4">
              they gave paris the tier-one roadmap.
            </p>
            <p className="text-[var(--foreground-dim)] mb-4">
              "this," said the ceo, "is the future of the company."<br/>
              paris looked at the empty document and smiled.
            </p>
            <p className="text-[var(--foreground-dim)] italic">
              an empty page is not a burden. it's an invitation.
            </p>
            <p className="text-[var(--foreground-dim)] mt-4">
              fifteen engineers. four designers. three marketers. one vision.
              paris didn't manage them—paris conducted them. like a symphony.
              each voice essential. each note deliberate.
            </p>
          </section>
          
          <pre className="text-white text-xs opacity-20">
{`    ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲`}
          </pre>
          
          <section>
            <pre className="text-white text-xs mb-4 opacity-50">
{`  ┌─ chapter v: the philosophy ─┐`}
            </pre>
            <div className="space-y-4 text-[var(--foreground-dim)]">
              <p>
                <span className="text-white">▸</span> every feature is a promise to a user
              </p>
              <p>
                <span className="text-white">▸</span> every bug is a broken trust
              </p>
              <p>
                <span className="text-white">▸</span> every pixel is an opportunity to care
              </p>
              <p>
                <span className="text-white">▸</span> every sprint is a story in progress
              </p>
              <p>
                <span className="text-white">▸</span> every user is a human being with hopes
              </p>
            </div>
            <p className="text-white mt-6 italic">
              this is not product management. this is stewardship of dreams.
            </p>
          </section>
          
          <pre className="text-white text-xs opacity-20">
{`    ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲`}
          </pre>
          
          <section>
            <pre className="text-white text-xs mb-4 opacity-50">
{`  ┌─ chapter vi: today ─┐`}
            </pre>
            <p className="text-[var(--foreground-dim)] mb-4">
              paris sits in a café in the marais. laptop open. coffee cold.
              a slack message pings: "users love the new feature."
            </p>
            <p className="text-white mb-4">
              paris doesn't see metrics. paris sees faces.
            </p>
            <p className="text-[var(--foreground-dim)] mb-4">
              the single parent who can now sleep at night knowing their crypto is safe.
              the student who finally understands blockchain. the grandmother who sent
              bitcoin to her grandson across the world.
            </p>
            <p className="text-[var(--foreground-dim)] italic">
              this is why we build. not for vanity metrics or board presentations.
              we build because somewhere, someone's life gets a little bit better.
            </p>
          </section>
        </div>
        
        {/* ASCII Art Divider */}
        <pre className="text-white text-xs my-16 opacity-30">
{`
              ╔═══════════════════════════════════╗
              ║  "ship with purpose.              ║
              ║   build with empathy.             ║
              ║   lead with poetry."              ║
              ║                                   ║
              ║          — paris, 2025            ║
              ╚═══════════════════════════════════╝
`}
        </pre>
        
        {/* Terminal */}
        <div className="mt-20">
          <pre className="text-[var(--foreground-dim)] text-xs mb-6">
{`  ┌────────────────────────────────────────┐
  │  interactive terminal • type 'help'    │
  └────────────────────────────────────────┘`}
          </pre>
          <Terminal />
        </div>
        
        {/* Footer ASCII */}
        <pre className="text-white text-xs mt-20 opacity-20">
{`
         *
        /|\\
       / | \\      end of chapter vi
      /  |  \\     (but the story continues...)
     /   |   \\
    /____|____\\
         |
`}
        </pre>
      </div>
    </div>
  );
}
