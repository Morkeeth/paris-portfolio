'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function WayPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const isMobile = window.innerWidth < 768;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles: any[] = [];
    const particleCount = isMobile ? 300 : 600;
    let time = 0;
    let animationFrameId: number;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const radius = Math.pow(t, 0.5);
      const angle = t * Math.PI * 40;
      
      particles.push({
        baseRadius: radius,
        baseAngle: angle,
        height: Math.sin(t * Math.PI) * 0.8,
        size: (1.0 - Math.abs(Math.sin(t * Math.PI) * 0.5)) * (isMobile ? 1 : 1.5) + 0.5,
        opacity: 0.12 + Math.random() * 0.08,
        speed: 0.8 + Math.random() * 0.4
      });
    }
    
    function drawParticles() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = '#F0EEE6';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scale = Math.min(canvas.width, canvas.height) * 0.25;
      
      particles.forEach(p => {
        const vessel = (1 - Math.abs(p.height)) * (1 - Math.abs(p.baseRadius - 0.6) * 2);
        if (vessel <= 0) return;
        
        const angle = p.baseAngle + time * 0.02 * p.speed;
        const space = Math.sin(time * 0.1 + p.baseRadius * 3.0) * 0.03;
        const radius = (p.baseRadius + space) * vessel;
        
        const x = centerX + Math.cos(angle) * radius * scale;
        const y = centerY + p.height * vessel * scale;
        
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(51, 51, 51, ${p.opacity * vessel})`;
        ctx.fill();
      });
      
      time += 0.3;
      animationFrameId = requestAnimationFrame(drawParticles);
    }
    
    drawParticles();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-[#F0EEE6] text-[#333] font-serif">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full opacity-15 z-0" />
      
      <div className="relative z-10">
        {/* Back button */}
        <div className="fixed top-4 left-4 z-50">
          <Link
            href="/"
            className="text-sm text-[#666] hover:text-[#333] transition-colors"
          >
            ← back
          </Link>
        </div>
        
        {/* Preface */}
        <section className="min-h-screen flex items-center justify-center px-8 py-24">
          <div className="max-w-2xl mx-auto text-center">
            <pre className="text-[#999] opacity-25 text-xs mb-8">
{`        ◇
       ╱ ╲
      ╱   ╲
     ╱  ✦  ╲
    ╱       ╲
   ◇─────────◇`}
            </pre>
            <h1 className="text-sm tracking-widest uppercase text-[#333] mb-4">
              THE WAY OF PRODUCT
            </h1>
            <h2 className="text-3xl italic text-[#333] mb-12">
              The Timeless Art of Building
            </h2>
            <div className="text-lg leading-relaxed text-[#666] space-y-4 mb-8">
              <p>
                the way of product is a short book of 14 verses on shipping with wisdom over force.
              </p>
              <p>
                it's how i keep teams calm, codebases flexible, and outcomes compounding.
              </p>
              <p className="italic">
                eight-minute read. bring tea.
              </p>
            </div>
          </div>
        </section>

        {/* Verses */}
        {[
          {
            num: 1,
            verses: [
              "The roadmap that can be followed is not the eternal roadmap.\nThe feature that can be named is not the limitless feature.",
              "From nothing, the user's need arises.\nFrom need, ten thousand solutions emerge.",
              "Free from attachment to metrics,\nyou see the essence.\nCaught in vanity metrics,\nyou see only the surface.",
              "These two spring from the same source.\nThis mystery—the gateway to all understanding."
            ]
          },
          {
            num: 2,
            verses: [
              "When we call a feature brilliant,\nother features become dull.\nWhen we praise speed,\nthe notion of deliberation is born.",
              "Simplicity and complexity define each other.\nUser and builder create each other.\nProblem and solution follow each other.",
              "Therefore the product manager acts\nwithout forcing,\nteaches without preaching.\nFeatures arise and she observes them.\nFeatures fade and she lets them go.",
              "She builds without claiming ownership.\nShips without seeking credit.\nThe work completes itself."
            ]
          },
          {
            num: 7,
            verses: [
              "Great products endure.\nEternal, they transcend trends and hype.\nThey last because\nthey do not serve the ego of their makers.",
              "The product manager stays behind,\nthat is why she's ahead.\nShe is detached from the outcome,\nthus at one with the user.",
              "Through selfless action,\nshe is perfectly fulfilled."
            ]
          },
          {
            num: 11,
            verses: [
              "Thirty features spoke together at the hub,\nbut it is the core use case\nthat makes the product useful.",
              "We shape screens and flows,\nbut it is the white space between\nthat holds attention.",
              "We work with code and pixels,\nbut the non-doing makes it work.",
              "Therefore profit comes from what is present,\nbut usefulness comes from what is absent."
            ]
          },
          {
            num: 17,
            verses: [
              "The best product manager is barely known.\nNext comes one whom users love and praise.\nNext, one whom they fear.\nWorst, one whom they despise.",
              "When you lack trust,\nmistrust will follow.",
              "The wise PM speaks little.\nWhen the work is done,\nthe product shipped,\nthe team will say:\n\"We built this ourselves.\""
            ]
          },
          {
            num: 63,
            verses: [
              "Act without doing.\nWork without effort.\nThink without complexity.",
              "Face difficult features while they are easy.\nSolve great problems while they are small.",
              "The journey of ten thousand sprints\nbegins beneath your feet.",
              "Because the product manager has no goal in mind,\neverything is accomplished."
            ]
          },
          {
            num: 81,
            verses: [
              "True words are not eloquent.\nEloquent words are not true.\nGood products are not complex.\nComplex products are not good.",
              "The master knows without studying.\nThe master has without accumulating.",
              "The more she does for users,\nthe more she has.\nThe more she gives to the team,\nthe greater her abundance.",
              "The way of product is to build without harming.\nThe way of the product manager is to act\nwithout contending."
            ]
          }
        ].map((item) => (
          <section key={item.num} className="min-h-screen flex items-center justify-center px-8 py-24">
            <div className="max-w-2xl mx-auto">
              <div className="text-5xl font-normal text-[#333] opacity-30 text-center mb-12">
                {item.num}
              </div>
              <div className="space-y-8">
                {item.verses.map((verse, i) => (
                  <p
                    key={i}
                    className="text-xl leading-relaxed text-[#333] whitespace-pre-line hover:text-[#000] transition-colors duration-300"
                  >
                    {verse}
                  </p>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Closing */}
        <section className="min-h-screen flex items-center justify-center px-8 py-24">
          <div className="max-w-2xl mx-auto text-center">
            <pre className="text-[#999] opacity-25 text-xs mb-8">
{`    ════════════════════════════════════════`}
            </pre>
            <div className="text-xl italic text-[#666] leading-relaxed space-y-6 mb-12">
              <p>
                The product that can be shipped<br />
                is already outdated.<br />
                The vision that can be articulated<br />
                is already limited.
              </p>
              <p>
                Build in the space between knowing and not-knowing.<br />
                Ship from the place of humble uncertainty.<br />
                Lead without needing to be seen.
              </p>
              <p className="text-[#333]">This is the way.</p>
            </div>
            <pre className="text-[#999] opacity-20 text-xs mb-8">
{`        ⋮
        ∴
       ◇─◇
        ∴
        ⋮`}
            </pre>
            <p className="text-[#999] text-sm mb-2">Paris, France • 2025</p>
            <p className="text-[#aaa] text-xs mb-8">Staff Product Manager @ Ledger</p>
            <pre className="text-[#999] opacity-20 text-xs">
{`        ╭───────────────────────────────╮
        │                               │
        │   built with intention        │
        │   deployed with purpose       │
        │   maintained with humility    │
        │                               │
        ╰───────────────────────────────╯`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}

