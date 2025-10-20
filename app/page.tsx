'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { asciiArt } from '@/lib/ascii-generator';

export default function Home() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    const text = 'oscar';
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
      <div className="max-w-3xl w-full font-mono">
        {/* ASCII Logo */}
        <pre className="text-[var(--foreground)] text-xs md:text-sm mb-8 leading-tight opacity-80">
          {asciiArt.logo}
        </pre>
        
        {/* Name with cursor */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl text-[var(--foreground)] mb-4">
            {displayText}
            {showCursor && <span className="inline-block w-3 h-12 bg-[var(--foreground)] ml-2 align-middle" />}
          </h1>
          <p className="text-[var(--foreground-dim)] text-lg mb-3">
            staff product manager @ ledger
          </p>
          <p className="text-[var(--foreground-dimmer)] text-sm">
            🎾 tennis enthusiast • 🎧 weekend dj • 🏀 bald & proud
          </p>
        </div>
        
        {/* ASCII Self Portrait */}
        <pre className="text-[var(--foreground-dim)] text-xs mb-8 leading-tight">
          {asciiArt.baldHead}
        </pre>
        
        {/* Links */}
        <div className="space-y-3 text-lg mb-12">
          <div>
            <Link
              href="/about"
              className="text-[var(--foreground-dim)] hover:text-[var(--foreground)] transition-colors inline-block"
            >
              → about
            </Link>
          </div>
          <div>
            <Link
              href="/projects"
              className="text-[var(--foreground-dim)] hover:text-[var(--foreground)] transition-colors inline-block"
            >
              → projects
            </Link>
          </div>
          <div>
            <Link
              href="/experience"
              className="text-[var(--foreground-dim)] hover:text-[var(--foreground)] transition-colors inline-block"
            >
              → experience
            </Link>
          </div>
          <div>
            <Link
              href="/contact"
              className="text-[var(--foreground-dim)] hover:text-[var(--foreground)] transition-colors inline-block"
            >
              → contact
            </Link>
          </div>
        </div>
        
        {/* Fun Stats */}
        <div className="border border-[var(--glass-border)] p-6 mb-8">
          <p className="text-[var(--foreground)] text-sm mb-3">// quick stats</p>
          <div className="text-[var(--foreground-dim)] text-sm space-y-1">
            <p>☕ coffee consumed: ∞</p>
            <p>🎾 tennis serve speed: classified</p>
            <p>🎧 playlists curated: 47+</p>
            <p>💡 products shipped: too many to count</p>
            <p>💈 hair on head: 0 (by choice... mostly)</p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-[var(--foreground-dimmer)] text-sm">
          <p>based in [location]</p>
          <p className="mt-1">building products • serving aces • dropping beats</p>
        </div>
      </div>
    </div>
  );
}
