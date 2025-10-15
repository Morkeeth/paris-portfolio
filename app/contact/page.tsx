'use client';

const contacts = [
  { label: 'email', value: 'paris@ledger.com', href: 'mailto:paris@ledger.com' },
  { label: 'linkedin', value: 'linkedin.com/in/paris-portfolio', href: 'https://linkedin.com/in/paris-portfolio' },
  { label: 'github', value: 'github.com/paris-portfolio', href: 'https://github.com/paris-portfolio' },
  { label: 'twitter', value: 'twitter.com/paris_builds', href: 'https://twitter.com/paris_builds' },
];

const openTo = [
  'product management opportunities (staff+ level)',
  'strategic consulting for crypto/web3 products',
  'speaking engagements on product strategy',
  'mentorship and coaching for product managers',
  'collaboration on innovative product ideas',
];

export default function ContactPage() {
  return (
    <div className="min-h-screen px-8 py-32 font-mono">
      <div className="max-w-2xl mx-auto">
        {/* ASCII Art */}
        <pre className="text-white text-xs mb-8 opacity-30">
{`    ▸ contact.md`}
        </pre>
        
        {/* Header */}
        <h1 className="text-3xl text-white mb-8">contact</h1>
        <p className="text-[var(--foreground-dim)] mb-12 leading-relaxed">
          let's build something amazing together. whether you have an opportunity, 
          a question, or just want to chat about product—i'm here.
        </p>
        
        {/* Contact Links */}
        <div className="mb-16">
          <p className="text-white text-sm mb-4">reach out</p>
          <div className="space-y-3">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start group"
              >
                <span className="w-24 text-[var(--foreground-dim)] text-sm">{contact.label}</span>
                <span className="text-[var(--foreground-dim)] group-hover:text-white transition-colors">
                  {contact.value}
                </span>
              </a>
            ))}
          </div>
        </div>
        
        <div className="text-xs text-white opacity-20 mb-12">{'─'.repeat(60)}</div>
        
        {/* Open To */}
        <div className="mb-16">
          <p className="text-white text-sm mb-4">open to</p>
          <div className="space-y-2 text-sm text-[var(--foreground-dim)]">
            {openTo.map((item, i) => (
              <p key={i}><span className="text-white">▸</span> {item}</p>
            ))}
          </div>
        </div>
        
        <div className="text-xs text-white opacity-20 mb-12">{'─'.repeat(60)}</div>
        
        {/* Location & Availability */}
        <div className="mb-16">
          <p className="text-white text-sm mb-4">logistics</p>
          <div className="text-[var(--foreground-dim)] space-y-2">
            <p><span className="text-white">location:</span> paris, france (cet timezone)</p>
            <p><span className="text-white">availability:</span> open to remote opportunities worldwide</p>
            <p><span className="text-white">response time:</span> usually within 24 hours</p>
            <p><span className="text-white">languages:</span> english (fluent), french (native)</p>
          </div>
        </div>
        
        {/* ASCII Art */}
        <pre className="text-white text-xs my-16 opacity-20">
{`~∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿~`}
        </pre>
        
        {/* Quote */}
        <blockquote className="border-l-2 border-white/20 pl-4 text-[var(--foreground-dim)] italic">
          "the best time to plant a tree was 20 years ago. the second best time is now. 
          the best time to ship a product is yesterday."
        </blockquote>
        <p className="text-[var(--foreground-dimmer)] text-xs mt-4 text-right">— product philosophy</p>
      </div>
    </div>
  );
}
