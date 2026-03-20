'use client';

import { useEffect, useRef } from 'react';

interface ParticleConfig {
  count?: number;
  style?: 'drift' | 'vessel';
}

interface DriftParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  offset: number;
}

interface VesselParticle {
  baseRadius: number;
  baseAngle: number;
  height: number;
  size: number;
  opacity: number;
  speed: number;
}

const BG = '#FAFAF8';
const FG = 'rgba(34, 34, 34,';

export function useParticles(config: ParticleConfig = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const isMobile = window.innerWidth < 768;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;
    let time = 0;
    const style = config.style ?? 'drift';

    if (style === 'vessel') {
      const count = config.count ?? (isMobile ? 300 : 600);
      const particles: VesselParticle[] = [];

      for (let i = 0; i < count; i++) {
        const t = i / count;
        particles.push({
          baseRadius: Math.pow(t, 0.5),
          baseAngle: t * Math.PI * 40,
          height: Math.sin(t * Math.PI) * 0.8,
          size: (1.0 - Math.abs(Math.sin(t * Math.PI) * 0.5)) * (isMobile ? 1 : 1.5) + 0.5,
          opacity: 0.12 + Math.random() * 0.08,
          speed: 0.8 + Math.random() * 0.4,
        });
      }

      function draw() {
        if (!ctx || !canvas) return;
        ctx.fillStyle = BG;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const scale = Math.min(canvas.width, canvas.height) * 0.25;

        for (const p of particles) {
          const vessel = (1 - Math.abs(p.height)) * (1 - Math.abs(p.baseRadius - 0.6) * 2);
          if (vessel <= 0) continue;

          const angle = p.baseAngle + time * 0.02 * p.speed;
          const space = Math.sin(time * 0.1 + p.baseRadius * 3.0) * 0.03;
          const radius = (p.baseRadius + space) * vessel;

          ctx.beginPath();
          ctx.arc(cx + Math.cos(angle) * radius * scale, cy + p.height * vessel * scale, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${FG} ${p.opacity * vessel})`;
          ctx.fill();
        }

        time += 0.3;
        animationId = requestAnimationFrame(draw);
      }

      draw();
    } else {
      const count = config.count ?? (isMobile ? 100 : 150);
      const particles: DriftParticle[] = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: 0.04 + Math.random() * 0.06,
          speed: 0.1 + Math.random() * 0.15,
          offset: Math.random() * Math.PI * 2,
        });
      }

      function draw() {
        if (!ctx || !canvas) return;
        ctx.fillStyle = BG;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const p of particles) {
          ctx.beginPath();
          ctx.arc(
            p.x + Math.sin(time * 0.0003 * p.speed + p.offset) * 25,
            p.y + Math.cos(time * 0.0003 * p.speed + p.offset) * 18,
            p.size,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = `${FG} ${p.opacity})`;
          ctx.fill();
        }

        time += 16;
        animationId = requestAnimationFrame(draw);
      }

      draw();
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [config.count, config.style]);

  return canvasRef;
}
