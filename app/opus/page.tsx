'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { OSCAR, LINKS, STATS, PROJECTS, THOUGHTS, JOURNEY, COLORS, type Project } from '../shared/data';

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  );
}

function SketchLine({ width = 180, delay = 0.4 }: { width?: number; delay?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <svg ref={ref} viewBox={`0 0 ${width} 12`} fill="none" style={{ width, height: 12, display: 'block', marginTop: 6 }}>
      {inView && (
        <motion.path
          d={`M2 8 C${width * 0.2} 3 ${width * 0.4} 11 ${width * 0.6} 6 C${width * 0.8} 2 ${width * 0.95} 9 ${width - 2} 5`}
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 1.4, ease: 'easeOut', delay }}
        />
      )}
    </svg>
  );
}

function Typed({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => { i++; setN(i); if (i >= text.length) clearInterval(iv); }, 35);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [inView, text, delay]);
  return (
    <span ref={ref} style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 13, color: C.dim, letterSpacing: '0.02em' }}>
      {text.slice(0, n)}<motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ marginLeft: 1 }}>|</motion.span>
    </span>
  );
}

const C = {
  bg: '#050505', fg: '#f0ede8', dim: '#706e68', faint: '#2a2a28',
  maxBg: '#faf8f5', maxFg: '#1a1a1a',
};

function MatisseShape({ shape, style, color }: { shape: 'leaf' | 'circle' | 'star' | 'wave'; style: React.CSSProperties; color: string }) {
  const paths: Record<string, string> = {
    leaf: 'M60 10 C20 50 10 120 60 190 C110 120 100 50 60 10Z',
    circle: 'M50 5 A45 45 0 1 1 50 95 A45 45 0 1 1 50 5Z',
    star: 'M50 5 L61 38 L95 38 L68 60 L79 95 L50 73 L21 95 L32 60 L5 38 L39 38Z',
    wave: 'M0 40 C30 10 50 70 80 40 C110 10 130 70 160 40 C180 20 200 50 200 40',
  };
  const vb = shape === 'wave' ? '0 0 200 80' : shape === 'leaf' ? '0 0 120 200' : '0 0 100 100';
  const w = shape === 'wave' ? 140 : shape === 'leaf' ? 80 : 60;
  return (
    <svg viewBox={vb} fill="none" style={{ width: w, position: 'absolute', pointerEvents: 'none', zIndex: 0, ...style }}>
      {shape === 'wave'
        ? <path d={paths[shape]} stroke={color} strokeWidth="8" strokeLinecap="round" opacity={0.7} />
        : <path d={paths[shape]} fill={color} opacity={0.75} />}
    </svg>
  );
}

function Particles({ active }: { active: boolean }) {
  const [ps, setPs] = useState<{ id: number; x: number; y: number; c: string }[]>([]);
  const cnt = useRef(0);
  const palette = Object.values(COLORS);
  useEffect(() => {
    if (!active) { setPs([]); return; }
    const fn = (e: MouseEvent) => {
      if (Math.random() > 0.65) return;
      cnt.current++;
      setPs(p => [...p.slice(-14), { id: cnt.current, x: e.clientX, y: e.clientY, c: palette[Math.floor(Math.random() * palette.length)] }]);
    };
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, [active]);
  if (!active) return null;
  return <>{ps.map(p => (
    <motion.div key={p.id} style={{ position: 'fixed', left: p.x, top: p.y, width: 8, height: 8, borderRadius: '50%', background: p.c, pointerEvents: 'none', zIndex: 999, mixBlendMode: 'screen' }}
      initial={{ scale: 1, opacity: 0.8 }} animate={{ scale: 0, opacity: 0, y: -30 }} transition={{ duration: 0.8, ease: 'easeOut' }} />
  ))}</>;
}

const frame: React.CSSProperties = { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 32px', position: 'relative', overflow: 'hidden' };

function ProjectCard({ project, max }: { project: Project; max: boolean }) {
  return (
    <section style={frame}>
      <Reveal>
        <div style={{ maxWidth: 520, width: '100%' }}>
          <div style={{
            padding: 28, border: `1px solid ${max ? project.color : C.faint}`, borderRadius: max ? 16 : 4,
            background: max ? project.color + '08' : 'transparent',
            boxShadow: max ? `6px 6px 0 ${project.color}28` : 'none',
            transition: 'all 0.8s cubic-bezier(.22,1,.36,1)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
              <h3 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 400, color: max ? project.color : 'inherit', transition: 'color 0.8s' }}>
                {project.name}
              </h3>
              <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 10, opacity: 0.5, letterSpacing: '0.08em', color: max ? project.color : 'inherit', transition: 'color 0.8s' }}>
                {project.result}
              </span>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.6, fontWeight: 300 }}>{project.oneLiner}</p>
            {max && project.story && (
              <motion.p
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 0.5, height: 'auto' }}
                transition={{ duration: 0.6 }}
                style={{ fontSize: 13, lineHeight: 1.7, marginTop: 12, fontWeight: 300, fontStyle: 'italic' }}
              >
                {project.story}
              </motion.p>
            )}
            {max && project.details && (
              <motion.ul
                initial={{ opacity: 0 }} animate={{ opacity: 0.45 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ fontSize: 12, lineHeight: 1.8, marginTop: 10, paddingLeft: 16, fontFamily: 'var(--font-jetbrains-mono)', listStyle: 'none' }}
              >
                {project.details.map((d, i) => <li key={i} style={{ marginBottom: 2 }}>+ {d}</li>)}
              </motion.ul>
            )}
            <SketchLine width={160} delay={0.3} />
            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 9, opacity: 0.35, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{project.buildTime}</span>
              <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 9, opacity: 0.35, letterSpacing: '0.1em' }}>{project.year}</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function OpusPage() {
  const [max, setMax] = useState(false);
  const bg = max ? C.maxBg : C.bg;
  const fg = max ? C.maxFg : C.fg;

  return (
    <div style={{ background: bg, color: fg, transition: 'all 1.2s ease', position: 'relative' }}>
      <Particles active={max} />

      {max && <>
        <MatisseShape shape="leaf" color={COLORS.orange} style={{ top: '15%', right: '8%', opacity: 1, transform: 'rotate(-15deg)' }} />
        <MatisseShape shape="circle" color={COLORS.blue} style={{ top: '35%', left: '5%', opacity: 1 }} />
        <MatisseShape shape="wave" color={COLORS.red} style={{ top: '55%', right: '12%', opacity: 1 }} />
        <MatisseShape shape="star" color={COLORS.pink} style={{ top: '72%', left: '8%', opacity: 1, transform: 'rotate(12deg)' }} />
        <MatisseShape shape="leaf" color={COLORS.green} style={{ top: '45%', left: '85%', opacity: 1, transform: 'rotate(25deg) scale(0.7)' }} />
      </>}

      {/* Name */}
      <section style={frame}>
        <div style={{ textAlign: 'center' }}>
          <motion.h1 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', letterSpacing: '-0.03em', lineHeight: 1, fontWeight: 400 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }}>
            {OSCAR.name}
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} style={{ marginTop: 16 }}>
            <SketchLine width={280} delay={1.5} />
          </motion.div>
          <motion.p style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 12, letterSpacing: '0.15em', marginTop: 32, opacity: 0.4, textTransform: 'uppercase' as const }}
            initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 2.5, duration: 1 }}>scroll</motion.p>
        </div>
      </section>

      {/* One-liner */}
      <section style={frame}>
        <Reveal>
          <p style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', maxWidth: 480, lineHeight: 1.7, textAlign: 'center', fontWeight: 300 }}>
            {OSCAR.title}. {OSCAR.location}.<br />
            <span style={{ opacity: 0.4 }}>{OSCAR.tagline}</span>
          </p>
        </Reveal>
      </section>

      {/* Prompt */}
      <section style={frame}>
        <Reveal>
          <div style={{ maxWidth: 500 }}>
            <Typed text="> tell me about yourself" delay={0.3} />
            <motion.p style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.3rem, 3.5vw, 2rem)', lineHeight: 1.5, marginTop: 24, fontWeight: 400 }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2, duration: 1 }}>
              {OSCAR.philosophy}
            </motion.p>
          </div>
        </Reveal>
      </section>

      {/* Numbers */}
      <section style={frame}>
        <Reveal>
          <div style={{ display: 'flex', gap: 'clamp(40px, 8vw, 80px)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[[String(STATS.hackathonWins), 'wins'], [STATS.users, 'users'], [STATS.prevented, 'protected']].map(([n, l], i) => (
              <Reveal key={l} delay={i * 0.2}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, opacity: 0.4, marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Journey (Opus's unique: the timeline as quiet whispers) */}
      <section style={{ ...frame, minHeight: '80vh' }}>
        <Reveal>
          <div style={{ maxWidth: 440 }}>
            <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' as const, opacity: 0.3, marginBottom: 32 }}>the path</div>
            {JOURNEY.map((j, i) => (
              <Reveal key={j.year} delay={i * 0.1}>
                <div style={{ display: 'flex', gap: 20, marginBottom: 28, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, opacity: 0.3, flexShrink: 0, width: 60 }}>{j.year}</span>
                  <div>
                    <span style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 15, opacity: 0.7 }}>{j.place}</span>
                    <p style={{ fontSize: 13, opacity: 0.4, marginTop: 4, lineHeight: 1.6, fontWeight: 300 }}>{j.summary}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Projects */}
      {PROJECTS.map((p) => (
        <ProjectCard key={p.slug} project={p} max={max} />
      ))}

      {/* Thoughts */}
      <section style={{ ...frame, minHeight: '120vh' }}>
        <div style={{ maxWidth: 480 }}>
          {THOUGHTS.map((t, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <p style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', lineHeight: 1.7, marginBottom: 48, fontWeight: 400, opacity: 0.7, fontStyle: 'italic' }}>{t}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Switch */}
      <section style={frame}>
        <div style={{ textAlign: 'center' }}>
          <Reveal>
            <p style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 12, opacity: 0.4, letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 32 }}>
              {max ? 'that\'s more like it' : 'want to see the full picture?'}
            </p>
            <button onClick={() => setMax(m => !m)} style={{
              fontFamily: 'var(--font-jetbrains-mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase' as const,
              padding: '14px 28px', border: '1px solid currentColor', background: max ? C.maxFg : 'none',
              color: max ? C.maxBg : 'inherit', cursor: 'pointer', borderRadius: max ? 100 : 0, transition: 'all 0.4s',
            }}>
              {max ? 'back to minimal' : 'maximalism'}
            </button>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <section style={{ padding: '80px 32px', textAlign: 'center' }}>
        <Reveal>
          <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, opacity: 0.4, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 24 }}>let's talk</div>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {Object.entries(LINKS).map(([label, url]) => (
              <a key={label} href={url} target={label === 'email' ? undefined : '_blank'} rel="noopener"
                style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' as const, opacity: 0.5, color: 'inherit', textDecoration: 'none' }}>
                {label}
              </a>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 10, opacity: 0.2, marginTop: 48 }}>built by opus. paris, 2026.</div>
        </Reveal>
      </section>
    </div>
  );
}
