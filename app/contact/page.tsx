'use client';

export default function ContactPage() {
  return (
    <div className="min-h-screen px-8 py-32 font-mono">
      <div className="max-w-3xl mx-auto">
        
        {/* ASCII Art Header */}
        <pre className="text-[var(--foreground)] text-xs mb-12 leading-tight opacity-70">
{`
    ╔════════════════════════════════════════════════════════╗
    ║                                                        ║
    ║            L E T ' S  C O N N E C T                   ║
    ║                                                        ║
    ║     coffee • tennis • product chat • dj gigs          ║
    ║                                                        ║
    ╚════════════════════════════════════════════════════════╝
`}
        </pre>
        
        <p className="text-[var(--foreground-dim)] mb-12 leading-relaxed">
          always up for a good conversation. whether it's product strategy, 
          trading tennis tips, or debating the perfect opening track for a set—
          let's talk.
        </p>
        
        {/* Contact Info */}
        <div className="space-y-6 mb-16">
          <div className="border-l-2 border-[var(--glass-border)] pl-4">
            <p className="text-[var(--foreground-dimmer)] text-sm mb-1">email</p>
            <a 
              href="mailto:oscar@example.com" 
              className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
            >
              oscar@example.com
            </a>
          </div>
          
          <div className="border-l-2 border-[var(--glass-border)] pl-4">
            <p className="text-[var(--foreground-dimmer)] text-sm mb-1">linkedin</p>
            <a 
              href="https://linkedin.com/in/oscar" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
            >
              linkedin.com/in/oscar
            </a>
          </div>
          
          <div className="border-l-2 border-[var(--glass-border)] pl-4">
            <p className="text-[var(--foreground-dimmer)] text-sm mb-1">github</p>
            <a 
              href="https://github.com/oscar" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
            >
              github.com/oscar
            </a>
          </div>
          
          <div className="border-l-2 border-[var(--glass-border)] pl-4">
            <p className="text-[var(--foreground-dimmer)] text-sm mb-1">twitter / x</p>
            <a 
              href="https://twitter.com/oscar" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
            >
              @oscar
            </a>
          </div>
        </div>
        
        {/* Info Box */}
        <div className="border border-[var(--glass-border)] p-6 mb-12">
          <p className="text-[var(--foreground)] text-sm mb-4">// current status</p>
          <div className="text-[var(--foreground-dim)] text-sm space-y-2">
            <p>📍 location: [your city]</p>
            <p>💼 status: happily employed, but always curious</p>
            <p>☕ best time to reach: mornings (before tennis)</p>
            <p>⏱️ response time: usually within 24-48 hours</p>
            <p>🎾 tennis skill: intermediate (getting better)</p>
            <p>🎧 dj availability: weekends</p>
          </div>
        </div>
        
        {/* What I'm Looking For */}
        <div className="mb-16">
          <h3 className="text-[var(--foreground)] text-xl mb-6">// open to...</h3>
          <div className="space-y-3 text-[var(--foreground-dim)]">
            <p>✓ product management opportunities (interesting problems only)</p>
            <p>✓ advisory roles for early-stage startups</p>
            <p>✓ coffee chats about product, tech, crypto</p>
            <p>✓ tennis matches (i'll bring the balls)</p>
            <p>✓ dj bookings for private events</p>
            <p>✓ collaborations on cool projects</p>
            <p>✗ timeshares, mlm schemes, or questionable nfts</p>
          </div>
        </div>
        
        {/* Fun Contact Methods */}
        <div className="mb-16">
          <h3 className="text-[var(--foreground)] text-xl mb-6">// alternative contact methods</h3>
          <div className="space-y-2 text-[var(--foreground-dim)] text-sm">
            <p>• send me a linkedin message (i actually read them)</p>
            <p>• dm me on twitter (but be cool about it)</p>
            <p>• catch me at a tech meetup (i'm the bald one)</p>
            <p>• challenge me to tennis (best way to network)</p>
            <p>• attend one of my dj sets (i'm approachable between tracks)</p>
            <p>• telepathy (still working on this one)</p>
          </div>
        </div>
        
        {/* ASCII Footer */}
        <pre className="text-[var(--foreground)] text-xs opacity-30">
{`
              ╔═══════════════════════════════════╗
              ║                                   ║
              ║  "the best products are built    ║
              ║   through conversations, not      ║
              ║   powerpoint decks."              ║
              ║                                   ║
              ║     let's have that conversation. ║
              ║                                   ║
              ╚═══════════════════════════════════╝
`}
        </pre>
        
        <div className="text-center text-[var(--foreground-dimmer)] text-sm mt-12">
          <p>portfolio built with next.js, typescript, and claude vibes ☕</p>
          <p className="mt-2">© 2025 oscar. bald since [year]. coding since [year].</p>
        </div>
      </div>
    </div>
  );
}
