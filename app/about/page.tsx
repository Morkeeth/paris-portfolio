'use client';

import Terminal from '@/components/terminal/Terminal';
import { asciiArt } from '@/lib/ascii-generator';

export default function AboutPage() {
  return (
    <div className="min-h-screen px-8 py-32 font-mono">
      <div className="max-w-4xl mx-auto">
        
        {/* ASCII Art Header */}
        <pre className="text-[var(--foreground)] text-xs mb-12 leading-tight opacity-70">
{`
    ╔════════════════════════════════════════════════════════╗
    ║                                                        ║
    ║          H I ,  I ' M  O S C A R                      ║
    ║                                                        ║
    ║      product manager • tennis player • dj             ║
    ║                                                        ║
    ╚════════════════════════════════════════════════════════╝
`}
        </pre>
        
        {/* The Story */}
        <div className="space-y-8 text-base leading-relaxed mb-16">
          <section>
            <pre className="text-[var(--foreground)] text-xs mb-4 opacity-50">
{`  ┌─ the origin story ─┐`}
            </pre>
            <p className="text-[var(--foreground)] mb-4">
              somewhere between perfecting my serve and finding the perfect drop beat, 
              i discovered my calling—
            </p>
            <p className="text-[var(--foreground-dim)] mb-4">
              building products that people actually want to use. not just tolerate. 
              not just click through. but actually get excited about.
            </p>
            <p className="text-[var(--foreground-dim)]">
              also, i'm bald. completely, unequivocally, magnificently bald. 
              it's aerodynamic on the tennis court and makes me look distinguished 
              behind the DJ decks. win-win.
            </p>
          </section>
          
          <pre className="text-[var(--foreground-dim)] text-xs opacity-20">
{`    ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲`}
          </pre>
          
          <section>
            <pre className="text-[var(--foreground)] text-xs mb-4 opacity-50">
{`  ┌─ the day job ─┐`}
            </pre>
            <p className="text-[var(--foreground-dim)] mb-4">
              by day, i'm a staff product manager at ledger, where we're building 
              the future of digital asset security. crypto, blockchain, self-custody—
              all the buzzwords, but actually meaningful.
            </p>
            <p className="text-[var(--foreground)] mb-4">
              i own the tier-one roadmap. which is a fancy way of saying: 
              "oscar, figure out what we should build next and don't mess it up."
            </p>
            <p className="text-[var(--foreground-dim)]">
              15+ engineers, 4 designers, countless stakeholders, one roadmap. 
              it's like conducting an orchestra, except everyone has opinions about 
              what song we should play.
            </p>
          </section>
          
          {/* Tennis Section */}
          <pre className="text-[var(--foreground-dim)] text-xs opacity-20">
{`    ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲`}
          </pre>
          
          <section>
            <pre className="text-[var(--foreground)] text-xs mb-4 opacity-50">
{`  ┌─ the tennis addiction ─┐`}
            </pre>
            <pre className="text-[var(--foreground-dim)] text-xs mb-6 leading-tight">
              {asciiArt.tennisPlayer}
            </pre>
            <p className="text-[var(--foreground-dim)] mb-4">
              three times a week, you'll find me on the court. forehand, backhand, 
              serve, volley—it's meditation in motion. also, i look great in shorts.
            </p>
            <p className="text-[var(--foreground)] mb-4">
              tennis taught me everything i know about product management:
            </p>
            <div className="text-[var(--foreground-dim)] space-y-2 ml-4">
              <p>▸ stay focused under pressure</p>
              <p>▸ adapt your strategy mid-game</p>
              <p>▸ every point matters, but don't dwell on losses</p>
              <p>▸ respect your opponents (competitors)</p>
              <p>▸ practice makes perfect, but perfect is impossible</p>
            </div>
          </section>
          
          {/* DJ Section */}
          <pre className="text-[var(--foreground-dim)] text-xs opacity-20">
{`    ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲`}
          </pre>
          
          <section>
            <pre className="text-[var(--foreground)] text-xs mb-4 opacity-50">
{`  ┌─ the weekend alter ego ─┐`}
            </pre>
            <pre className="text-[var(--foreground-dim)] text-xs mb-6 leading-tight">
              {asciiArt.djSetup}
            </pre>
            <p className="text-[var(--foreground-dim)] mb-4">
              friday nights, i trade my product roadmap for a DJ controller. 
              house, techno, deep house—whatever makes people move.
            </p>
            <p className="text-[var(--foreground)] mb-4">
              the bald head really works under the club lights. 
              it's like a disco ball, but attached to my neck.
            </p>
            <p className="text-[var(--foreground-dim)]">
              DJing is all about reading the room, building energy, and knowing 
              when to drop the bass. sound familiar? it's basically A/B testing, 
              but with better music.
            </p>
          </section>
          
          <pre className="text-[var(--foreground-dim)] text-xs opacity-20">
{`    ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲`}
          </pre>
          
          <section>
            <pre className="text-[var(--foreground)] text-xs mb-4 opacity-50">
{`  ┌─ the philosophy ─┐`}
            </pre>
            <div className="space-y-4 text-[var(--foreground-dim)]">
              <p>
                <span className="text-[var(--foreground)]">▸</span> build for humans, not personas
              </p>
              <p>
                <span className="text-[var(--foreground)]">▸</span> ship fast, iterate faster
              </p>
              <p>
                <span className="text-[var(--foreground)]">▸</span> data informs, intuition decides
              </p>
              <p>
                <span className="text-[var(--foreground)]">▸</span> every feature is a promise
              </p>
              <p>
                <span className="text-[var(--foreground)]">▸</span> be bald, be proud, be productive
              </p>
            </div>
          </section>
        </div>
        
        {/* ASCII Art Divider */}
        <pre className="text-[var(--foreground)] text-xs my-16 opacity-30">
{`
              ╔═══════════════════════════════════╗
              ║                                   ║
              ║  "serve aces, drop beats,         ║
              ║   ship products."                 ║
              ║                                   ║
              ║          — oscar, 2025            ║
              ║                                   ║
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
        <pre className="text-[var(--foreground)] text-xs mt-20 opacity-20">
{`
         *
        /|\\
       / | \\      end of bio
      /  |  \\     (now go check out my work)
     /   |   \\
    /____|____\\
`}
        </pre>
      </div>
    </div>
  );
}
