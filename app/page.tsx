'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setShowContent(true), 1000);
  }, []);
  
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full font-mono">
        {/* Large ASCII Art */}
        <pre className="text-white text-[10px] leading-tight mb-8 overflow-x-auto">
{`
 ██████╗  █████╗ ██████╗ ██╗███████╗
 ██╔══██╗██╔══██╗██╔══██╗██║██╔════╝
 ██████╔╝███████║██████╔╝██║███████╗
 ██╔═══╝ ██╔══██║██╔══██╗██║╚════██║
 ██║     ██║  ██║██║  ██║██║███████║
 ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝
                                      
    ┌─────────────────────────────┐
    │  staff pm @ ledger          │
    │  poetic mover • visionary   │
    │  paris, france • 2025       │
    └─────────────────────────────┘
`}
        </pre>
        
        {showContent && (
          <>
            {/* Poetic Intro */}
            <div className="mb-12 text-[var(--foreground-dim)] leading-relaxed animate-fade-in">
              <p className="mb-4">
                in the city of lights, a builder of products dwells—<br/>
                weaving code and vision into stories users tell.
              </p>
              <p className="text-white">
                not just a manager, but a poet of the craft,<br/>
                each roadmap a sonnet, each feature carefully graphed.
              </p>
            </div>
            
            {/* ASCII Divider */}
            <pre className="text-white text-xs mb-12 opacity-20">
{`╔═══════════════════════════════════════════════════════════╗
║                    e n t e r   t h e   v i s i o n        ║
╚═══════════════════════════════════════════════════════════╝`}
            </pre>
            
            {/* Navigation with ASCII */}
            <div className="space-y-6 text-lg mb-12">
              <Link href="/about" className="block group">
                <pre className="text-[var(--foreground-dim)] group-hover:text-white transition-colors text-xs leading-tight">
{`  ╭──────────╮
  │  about   │  ← the story of a product poet
  ╰──────────╯`}
                </pre>
              </Link>
              
              <Link href="/projects" className="block group">
                <pre className="text-[var(--foreground-dim)] group-hover:text-white transition-colors text-xs leading-tight">
{`  ╭──────────╮
  │ projects │  ← visions made real
  ╰──────────╯`}
                </pre>
              </Link>
              
              <Link href="/experience" className="block group">
                <pre className="text-[var(--foreground-dim)] group-hover:text-white transition-colors text-xs leading-tight">
{`  ╭────────────╮
  │ experience │  ← the journey through code
  ╰────────────╯`}
                </pre>
              </Link>
              
              <Link href="/contact" className="block group">
                <pre className="text-[var(--foreground-dim)] group-hover:text-white transition-colors text-xs leading-tight">
{`  ╭─────────╮
  │ contact │  ← let's build together
  ╰─────────╯`}
                </pre>
              </Link>
            </div>
            
            {/* Footer ASCII Art */}
            <pre className="text-white text-xs opacity-30 mt-16">
{`
       *
      /|\\           "vision without action is a daydream.
     / | \\           action without vision is a nightmare."
    /  |  \\
   /   |   \\              — japanese proverb
  /____|____\\              adapted by a product builder
       |
       |
    ───┴───
`}
            </pre>
          </>
        )}
      </div>
    </div>
  );
}
