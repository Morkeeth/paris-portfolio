'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    const text = 'paris';
    let i = 0;
    
    const typing = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
      } else {
        clearInterval(typing);
        setTimeout(() => setShowContent(true), 500);
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
        {/* ASCII Art Header */}
        <pre className="text-white text-xs mb-8 opacity-50 hidden md:block">
{`    ___  ___ ___ ___ ___ 
   | _ \\/ __| _ \\_ _/ __|
   |  _/ (_ |   /| |\\__ \\
   |_|  \\___|_|_\\___|___/`}
        </pre>
        
        {/* Name with cursor */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl text-white mb-4">
            {displayText}
            {showCursor && <span className="inline-block w-3 h-12 bg-white ml-2 align-middle" />}
          </h1>
          <p className="text-[var(--foreground-dim)] text-lg">
            staff product manager @ ledger
          </p>
          <p className="text-[var(--foreground-dimmer)] text-sm mt-2">
            charging the tier-one roadmap
          </p>
        </div>
        
        {/* Links with fade in */}
        {showContent && (
          <div className="space-y-3 text-lg animate-fade-in">
            <div>
              <Link
                href="/about"
                className="text-[var(--foreground-dim)] hover:text-white transition-colors inline-block group"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">▸ </span>
                about
              </Link>
            </div>
            <div>
              <Link
                href="/projects"
                className="text-[var(--foreground-dim)] hover:text-white transition-colors inline-block group"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">▸ </span>
                projects
              </Link>
            </div>
            <div>
              <Link
                href="/experience"
                className="text-[var(--foreground-dim)] hover:text-white transition-colors inline-block group"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">▸ </span>
                experience
              </Link>
            </div>
            <div>
              <Link
                href="/contact"
                className="text-[var(--foreground-dim)] hover:text-white transition-colors inline-block group"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">▸ </span>
                contact
              </Link>
            </div>
          </div>
        )}
        
        {/* Footer with ASCII divider */}
        {showContent && (
          <div className="mt-16 text-[var(--foreground-dimmer)] text-sm animate-fade-in">
            <p className="text-xs opacity-30 mb-4">{'─'.repeat(40)}</p>
            <p>paris, france • 2025</p>
            <p className="mt-1">poetic mover. vision maker. roadmap owner.</p>
            <p className="mt-4 text-xs">
              building products at the intersection of{' '}
              <span className="text-white">crypto</span>,{' '}
              <span className="text-white">security</span>, and{' '}
              <span className="text-white">user experience</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
