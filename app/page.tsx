'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = '> paris_portfolio.sh';
  
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
    
    const cursorBlink = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => {
      clearInterval(typing);
      clearInterval(cursorBlink);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full font-mono">
        {/* Terminal Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-[var(--foreground)]">
            {text}
            {showCursor && <span className="inline-block w-2 h-4 bg-[var(--foreground)] ml-1" />}
          </div>
        </motion.div>
        
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl text-[var(--foreground)] mb-2">
              PARIS
            </h1>
            <p className="text-[var(--foreground-dim)]">
              Staff Product Manager @ Ledger
            </p>
            <p className="text-[var(--foreground-dimmer)] text-sm mt-1">
              Charging the tier-one roadmap
            </p>
          </div>
          
          {/* Navigation Links */}
          <div className="space-y-2 mb-12">
            <NavLink href="/about" command="about" />
            <NavLink href="/projects" command="projects" />
            <NavLink href="/experience" command="experience" />
            <NavLink href="/contact" command="contact" />
          </div>
          
          {/* Quick Info */}
          <div className="border-t border-[var(--glass-border)] pt-6 space-y-3 text-sm">
            <InfoLine label="location" value="Paris, France" />
            <InfoLine label="role" value="Poetic Mover / Vision Maker" />
            <InfoLine label="focus" value="Product Strategy / Roadmap / Innovation" />
            <InfoLine label="status" value="open to opportunities" />
          </div>
          
          {/* Footer */}
          <div className="mt-12 text-xs text-[var(--foreground-dimmer)]">
            <p>type 'help' in terminal for commands</p>
            <p className="mt-1">© 2025 Paris • Built with Next.js</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function NavLink({ href, command }: { href: string; command: string }) {
  return (
    <Link
      href={href}
      className="block group hover:text-[var(--accent)] transition-colors"
    >
      <span className="text-[var(--foreground-dim)]">$ </span>
      <span className="text-[var(--foreground)]">{command}</span>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
        →
      </span>
    </Link>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex">
      <span className="text-[var(--foreground-dim)] w-24">{label}:</span>
      <span className="text-[var(--foreground)]">{value}</span>
    </div>
  );
}
