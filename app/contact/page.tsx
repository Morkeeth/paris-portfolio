'use client';

import { motion } from 'framer-motion';

const contacts = [
  { label: 'email', value: 'paris@example.com', href: 'mailto:paris@example.com' },
  { label: 'linkedin', value: '/in/paris-portfolio', href: 'https://linkedin.com/in/paris' },
  { label: 'github', value: '@paris-portfolio', href: 'https://github.com/paris' },
  { label: 'twitter', value: '@paris_builds', href: 'https://twitter.com/paris' },
];

const openTo = [
  'Product Management Opportunities',
  'Strategic Consulting Projects',
  'Speaking Engagements',
  'Mentorship & Coaching',
  'Collaboration & Partnerships',
];

export default function ContactPage() {
  return (
    <div className="min-h-screen px-8 py-24 font-mono">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-2xl text-[var(--foreground)] mb-2">$ contact</h1>
          <div className="h-px bg-[var(--glass-border)] my-4" />
          <p className="text-[var(--foreground-dim)] text-sm">
            Let's build something amazing together
          </p>
        </motion.div>
        
        {/* Contact Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-[var(--accent)] text-sm mb-4">REACH OUT</h2>
          <div className="space-y-3">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center group hover:text-[var(--accent)] transition-colors"
              >
                <span className="w-24 text-[var(--foreground-dim)]">{contact.label}:</span>
                <span className="text-[var(--foreground)]">{contact.value}</span>
                <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </a>
            ))}
          </div>
        </motion.div>
        
        {/* Open To */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-[var(--accent)] text-sm mb-4">OPEN TO</h2>
          <div className="space-y-2 text-sm text-[var(--foreground-dim)]">
            {openTo.map((item, i) => (
              <div key={i}>→ {item}</div>
            ))}
          </div>
        </motion.div>
        
        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="border border-[var(--glass-border)] p-6"
        >
          <div className="text-sm text-[var(--foreground-dim)] leading-relaxed">
            <p className="mb-3">
              Currently based in Paris, France. Available for remote opportunities worldwide.
            </p>
            <p className="text-[var(--foreground-dimmer)]">
              Response time: Usually within 24 hours
            </p>
          </div>
        </motion.div>
        
        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 border-l-2 border-[var(--glass-border)] pl-4 italic text-[var(--foreground-dimmer)] text-sm"
        >
          "The best time to plant a tree was 20 years ago. The second best time is now.
          The best time to ship a product is yesterday."
        </motion.div>
      </div>
    </div>
  );
}
