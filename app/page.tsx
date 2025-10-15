'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    const text = 'paris';
    let i = 0;
    
    const typing = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 150);
    
    const cursorBlink = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => {
      clearInterval(typing);
      clearInterval(cursorBlink);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl w-full font-mono">
        {/* Name with cursor */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl text-white mb-4">
            {displayText}
            {showCursor && <span className="inline-block w-3 h-12 bg-white ml-2 align-middle" />}
          </h1>
          <p className="text-[var(--foreground-dim)] text-lg">
            staff product manager @ ledger
          </p>
        </div>
        
        {/* Links */}
        <div className="space-y-3 text-lg">
          <div>
            <Link
              href="/about"
              className="text-[var(--foreground-dim)] hover:text-white transition-colors inline-block"
            >
              about
            </Link>
          </div>
          <div>
            <Link
              href="/projects"
              className="text-[var(--foreground-dim)] hover:text-white transition-colors inline-block"
            >
              projects
            </Link>
          </div>
          <div>
            <Link
              href="/experience"
              className="text-[var(--foreground-dim)] hover:text-white transition-colors inline-block"
            >
              experience
            </Link>
          </div>
          <div>
            <Link
              href="/contact"
              className="text-[var(--foreground-dim)] hover:text-white transition-colors inline-block"
            >
              contact
            </Link>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-16 text-[var(--foreground-dimmer)] text-sm">
          <p>paris, france</p>
          <p className="mt-1">poetic mover / vision maker</p>
        </div>
      </div>
    </div>
  );
}
