'use client';

const contacts = [
  { label: 'email', value: 'paris@example.com', href: 'mailto:paris@example.com' },
  { label: 'linkedin', value: 'linkedin.com/in/paris', href: 'https://linkedin.com/in/paris' },
  { label: 'github', value: 'github.com/paris', href: 'https://github.com/paris' },
  { label: 'twitter', value: 'twitter.com/paris', href: 'https://twitter.com/paris' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen px-8 py-32 font-mono">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl text-white mb-12">contact</h1>
        
        {/* Contact Links */}
        <div className="space-y-3 mb-16">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start group"
            >
              <span className="w-24 text-[var(--foreground-dim)]">{contact.label}</span>
              <span className="text-[var(--foreground-dim)] group-hover:text-white transition-colors">
                {contact.value}
              </span>
            </a>
          ))}
        </div>
        
        {/* Info */}
        <div className="text-[var(--foreground-dim)] leading-relaxed">
          <p className="mb-3">currently based in paris, france</p>
          <p className="mb-3">open to product management opportunities</p>
          <p>response time: usually within 24 hours</p>
        </div>
      </div>
    </div>
  );
}
