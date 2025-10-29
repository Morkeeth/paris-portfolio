'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import SelectedWork from '@/components/SelectedWork';
import { hero, proofStrip, about, footer } from '@/content/content';

export default function Home() {
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div className="min-h-screen pt-20 overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Hero */}
      <section ref={heroRef} className="relative py-24 px-8">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Spotlight effect following mouse */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
            }}
          />
          
          <h1 className="text-4xl md:text-5xl font-medium mb-6 leading-tight relative">
            <span className="inline-block animate-slide-up opacity-0 animation-delay-100">
              {hero.title.split(' ').map((word, i) => (
                <span
                  key={i}
                  className="inline-block mr-3 hover:text-white/80 hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {word}
                </span>
              ))}
            </span>
          </h1>
          
          <p className="text-[var(--foreground-dim)] text-lg md:text-xl mb-8 leading-relaxed max-w-3xl animate-fade-in opacity-0 animation-delay-800">
            {hero.subtitle}
          </p>
          
          <div className="flex gap-4 flex-wrap animate-fade-in opacity-0 animation-delay-1200">
            <a
              href={hero.primaryCta.href}
              className="group relative px-6 py-3 bg-white text-black font-medium rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
            >
              <span className="relative z-10">{hero.primaryCta.label}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </a>
            <Link
              href={hero.secondaryCta.href}
              className="group relative px-6 py-3 border border-white/20 font-medium rounded-lg overflow-hidden hover:border-white/40 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">{hero.secondaryCta.label}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Proof Strip */}
      <section className="relative py-12 px-8 border-y border-white/10 bg-white/5 overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-pink-500/5 animate-shimmer" />
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-wrap gap-4 md:gap-8 text-sm text-[var(--foreground-dim)]">
            {proofStrip.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 hover:text-white transition-all duration-300 hover:scale-105 animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 100 + 1500}ms` }}
              >
                {index > 0 && <span className="text-white/20">•</span>}
                <span className="relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/40 group-hover:w-full transition-all duration-300" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <SelectedWork />

      {/* About */}
      <section className="py-24 px-8 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-medium mb-8 lowercase">about</h2>
          <p className="text-[var(--foreground-dim)] text-lg leading-relaxed mb-6">
            {showFullAbout ? about.long : about.short}
          </p>
          <button
            onClick={() => setShowFullAbout(!showFullAbout)}
            className="text-[var(--foreground-dim)] hover:text-white transition-colors text-sm underline"
          >
            {showFullAbout ? 'Show less' : 'Read more'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[var(--foreground-dimmer)] text-sm lowercase">
            {footer}
          </p>
        </div>
      </footer>
    </div>
  );
}
