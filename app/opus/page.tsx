'use client';

/*
 * OPUS — the magnum opus variant.
 * A composer's catalog: overture, three movements, every work an Op. number,
 * and the one place the COMPLETE hackathon record renders (the appendix).
 * Keeps the soul: minimal -> maximalism bloom. Starts restrained, floods with
 * color when asked. "minimalism is where i'm from. maximalism is where i live."
 */

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, Fragment } from 'react';
import { OSCAR, LINKS, STATS, FEATURED, TRACKS, THOUGHTS, JOURNEY, HACKATHON_TIMELINE, COLORS, type Project } from '../shared/data';

const C = {
  bg: '#050505', fg: '#f0ede8', dim: '#706e68', faint: '#2a2a28',
  gold: '#c8963a',
  maxBg: '#faf8f5', maxFg: '#1a1a1a',
};

const ROMAN = ['I', 'II', 'III', 'IV', 'V'];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });
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

// One work in the catalog. `op` is its opus number.
function WorkPlate({ project, op, max }: { project: Project; op: number; max: boolean }) {
  const accent = max ? project.color : C.gold;
  return (
    <section style={{ ...frame, minHeight: '90vh' }}>
      <Reveal>
        <div style={{ maxWidth: 560, width: '100%' }}>
          <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, letterSpacing: '0.2em', color: accent, opacity: 0.9, marginBottom: 14 }}>
            Op. {op}
          </div>
          <div style={{
            padding: 32, border: `1px solid ${max ? project.color : C.faint}`, borderRadius: max ? 16 : 4,
            background: max ? project.color + '08' : 'transparent',
            boxShadow: max ? `6px 6px 0 ${project.color}28` : 'none',
            transition: 'all 0.8s cubic-bezier(.22,1,.36,1)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12, gap: 16, flexWrap: 'wrap' }}>
              <h3 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 400, color: max ? project.color : 'inherit', transition: 'color 0.8s' }}>
                {project.name}
              </h3>
              <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, letterSpacing: '0.08em', color: accent, transition: 'color 0.8s' }}>
                {project.result}
              </span>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.65, fontWeight: 300 }}>{project.oneLiner}</p>
            {project.image && (
              <motion.img
                src={project.image} alt={project.name}
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                style={{ width: '100%', marginTop: 18, borderRadius: max ? 10 : 4, border: `1px solid ${max ? project.color + '33' : C.faint}`, display: 'block', filter: max ? 'none' : 'grayscale(0.9) contrast(1.05)', transition: 'filter 0.8s' }}
              />
            )}
            <p style={{ fontSize: 14, lineHeight: 1.75, marginTop: 14, fontWeight: 300, opacity: 0.55, fontStyle: 'italic' }}>
              {project.story}
            </p>
            {max && project.details && (
              <motion.ul
                initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ fontSize: 12, lineHeight: 1.9, marginTop: 12, paddingLeft: 0, fontFamily: 'var(--font-jetbrains-mono)', listStyle: 'none' }}
              >
                {project.details.map((d, i) => <li key={i} style={{ marginBottom: 2 }}>+ {d}</li>)}
              </motion.ul>
            )}
            <SketchLine width={160} delay={0.3} />
            <div style={{ display: 'flex', gap: 14, marginTop: 12 }}>
              <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 9, opacity: 0.4, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{project.buildTime}</span>
              <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 9, opacity: 0.4, letterSpacing: '0.1em' }}>{project.year}</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// The appendix: the complete record, rendered ONLY here.
function TheRecord({ max }: { max: boolean }) {
  const accent = max ? COLORS.orange : C.gold;
  const paid = HACKATHON_TIMELINE.filter(r => r.prize);
  const totalUsd = paid.reduce((s, r) => s + (parseInt(r.prize.replace(/[^0-9]/g, ''), 10) || 0), 0);
  return (
    <section style={{ ...frame, minHeight: '100vh', alignItems: 'flex-start', paddingTop: '14vh' }}>
      <div style={{ maxWidth: 680, width: '100%' }}>
        <Reveal>
          <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: accent, marginBottom: 10 }}>
            appendix
          </div>
          <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(2rem, 6vw, 3.2rem)', fontWeight: 400, marginBottom: 8 }}>the record</h2>
          <p style={{ fontSize: 13, opacity: 0.45, fontWeight: 300, marginBottom: 40, lineHeight: 1.7 }}>
            the other pages show the highlights. this is the longer ledger — from the first hackathon in 2018 to now.
          </p>
        </Reveal>
        {HACKATHON_TIMELINE.map((r, i) => (
          <Reveal key={`${r.date}-${r.name}`} delay={Math.min(i * 0.05, 0.5)}>
            <div style={{ display: 'flex', gap: 18, padding: '14px 0', borderBottom: `1px solid ${C.faint}`, alignItems: 'baseline', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, opacity: 0.35, width: 58, flexShrink: 0 }}>{r.date.slice(0, 4)}</span>
              <div style={{ flex: 1, minWidth: 200 }}>
                <span style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 16 }}>{r.name}</span>
                <span style={{ fontSize: 12.5, opacity: 0.45, fontWeight: 300 }}> · {r.project}</span>
                {r.bounties && <div style={{ fontSize: 11, opacity: 0.35, fontWeight: 300, marginTop: 3, lineHeight: 1.5 }}>{r.bounties}</div>}
              </div>
              {(r.prize || r.eth) && (
                <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, color: accent, opacity: 0.9, flexShrink: 0 }}>
                  {r.prize}{r.eth ? ` · ${r.eth} eth` : ''}
                </span>
              )}
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.3}>
          <div style={{ marginTop: 28, fontFamily: 'var(--font-jetbrains-mono)', fontSize: 12, lineHeight: 2, color: accent }}>
            ${Math.round(totalUsd / 1000)}K at award time · {STATS.totalEthWon} won · {STATS.prizes} at today&apos;s prices
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function OpusPage() {
  const [max, setMax] = useState(false);
  const bg = max ? C.maxBg : C.bg;
  const fg = max ? C.maxFg : C.fg;

  // group featured works into movements by track, preserving order
  const movements = TRACKS.map(t => ({ track: t, works: FEATURED.filter(p => p.track === t.id) }));
  let opCounter = 0;

  return (
    <div style={{ background: bg, color: fg, transition: 'all 1.2s ease', position: 'relative' }}>
      <Particles active={max} />

      {/* sticky conductor's switch — always in reach */}
      <button onClick={() => setMax(m => !m)} style={{
        position: 'fixed', top: 18, right: 18, zIndex: 1000,
        fontFamily: 'var(--font-jetbrains-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' as const,
        padding: '9px 16px', border: `1px solid ${max ? C.maxFg : C.gold}66`,
        background: max ? C.maxBg : 'rgba(5,5,5,0.7)', backdropFilter: 'blur(8px)',
        color: max ? C.maxFg : C.gold, cursor: 'pointer', borderRadius: 100, transition: 'all 0.4s',
      }}>
        {max ? 'minimal' : 'maximal'}
      </button>

      {max && <>
        <MatisseShape shape="leaf" color={COLORS.orange} style={{ top: '15%', right: '8%', opacity: 1, transform: 'rotate(-15deg)' }} />
        <MatisseShape shape="circle" color={COLORS.blue} style={{ top: '35%', left: '5%', opacity: 1 }} />
        <MatisseShape shape="wave" color={COLORS.red} style={{ top: '55%', right: '12%', opacity: 1 }} />
        <MatisseShape shape="star" color={COLORS.pink} style={{ top: '72%', left: '8%', opacity: 1, transform: 'rotate(12deg)' }} />
        <MatisseShape shape="leaf" color={COLORS.green} style={{ top: '45%', left: '85%', opacity: 1, transform: 'rotate(25deg) scale(0.7)' }} />
      </>}

      {/* overture */}
      <section style={frame}>
        <div style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.1 }}
            style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: max ? C.maxFg : C.gold, opacity: 0.8, marginBottom: 28 }}>
            an opus in three movements
          </motion.div>
          <motion.h1 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(3rem, 11vw, 7.5rem)', letterSpacing: '-0.03em', lineHeight: 0.98, fontWeight: 400 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.4 }}>
            {OSCAR.name}
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
            <SketchLine width={280} delay={1.5} />
          </motion.div>
          <motion.p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', marginTop: 28, opacity: 0.5, fontWeight: 300 }}
            initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.8, duration: 1 }}>
            {OSCAR.title}. {OSCAR.location}. <span style={{ opacity: 0.7 }}>{OSCAR.tagline}</span>
          </motion.p>
          <motion.p style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 12, letterSpacing: '0.15em', marginTop: 40, opacity: 0.35, textTransform: 'uppercase' as const }}
            initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} transition={{ delay: 2.6, duration: 1 }}>scroll</motion.p>
        </div>
      </section>

      {/* the theme */}
      <section style={frame}>
        <Reveal>
          <div style={{ maxWidth: 520 }}>
            <Typed text="> tell me about yourself" delay={0.3} />
            <motion.p style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', lineHeight: 1.45, marginTop: 24, fontWeight: 400 }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.8, duration: 1 }}>
              {OSCAR.philosophy}
            </motion.p>
            <motion.p style={{ fontSize: 14, lineHeight: 1.8, marginTop: 22, opacity: 0.5, fontWeight: 300 }}
              initial={{ opacity: 0 }} whileInView={{ opacity: 0.5 }} viewport={{ once: true }} transition={{ delay: 2.6, duration: 1 }}>
              {OSCAR.coding}
            </motion.p>
          </div>
        </Reveal>
      </section>

      {/* the numbers */}
      <section style={frame}>
        <Reveal>
          <div style={{ display: 'flex', gap: 'clamp(36px, 7vw, 72px)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[[String(STATS.hackathonWins), 'wins'], [STATS.prizes, 'in prizes'], [STATS.users, 'users'], [STATS.prevented, 'protected']].map(([n, l], i) => (
              <Reveal key={l} delay={i * 0.15}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(2.2rem, 7vw, 4rem)', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, opacity: 0.4, marginTop: 10, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* the path */}
      <section style={{ ...frame, minHeight: '85vh' }}>
        <Reveal>
          <div style={{ maxWidth: 460 }}>
            <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' as const, opacity: 0.3, marginBottom: 32 }}>the path</div>
            {JOURNEY.map((j, i) => (
              <Reveal key={j.year} delay={i * 0.08}>
                <div style={{ display: 'flex', gap: 20, marginBottom: 28, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, opacity: 0.3, flexShrink: 0, width: 60 }}>{j.year}</span>
                  <div>
                    <span style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 16, opacity: 0.75 }}>{j.place}</span>
                    <p style={{ fontSize: 13, opacity: 0.42, marginTop: 4, lineHeight: 1.65, fontWeight: 300 }}>{j.summary}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* three movements */}
      {movements.map((m, mi) => (
        <Fragment key={m.track.id}>
          <section style={{ ...frame, minHeight: '55vh' }}>
            <Reveal>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(3.5rem, 12vw, 7rem)', lineHeight: 1, color: max ? C.maxFg : C.gold, opacity: max ? 0.15 : 0.35 }}>
                  {ROMAN[mi]}
                </div>
                <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: 400, marginTop: -10 }}>{m.track.label.toLowerCase()}</h2>
                <p style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, opacity: 0.45, marginTop: 14, letterSpacing: '0.12em' }}>{m.track.blurb}</p>
              </div>
            </Reveal>
          </section>
          {m.works.map(p => { opCounter += 1; return <WorkPlate key={p.slug} project={p} op={opCounter} max={max} />; })}
        </Fragment>
      ))}

      {/* appendix: the complete record */}
      <TheRecord max={max} />

      {/* coda: thoughts */}
      <section style={{ ...frame, minHeight: '100vh' }}>
        <div style={{ maxWidth: 500 }}>
          <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' as const, opacity: 0.3, marginBottom: 40 }}>coda</div>
          {THOUGHTS.map((t, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <p style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.05rem, 2.6vw, 1.3rem)', lineHeight: 1.7, marginBottom: 44, fontWeight: 400, opacity: 0.72, fontStyle: 'italic' }}>{t}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* the bloom, offered in narrative too */}
      {!max && (
        <section style={{ ...frame, minHeight: '70vh' }}>
          <div style={{ textAlign: 'center' }}>
            <Reveal>
              <p style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 12, opacity: 0.4, letterSpacing: '0.12em', textTransform: 'uppercase' as const, marginBottom: 32 }}>
                want to see the full picture?
              </p>
              <button onClick={() => setMax(true)} style={{
                fontFamily: 'var(--font-jetbrains-mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase' as const,
                padding: '14px 28px', border: `1px solid ${C.gold}`, background: 'none',
                color: C.gold, cursor: 'pointer', borderRadius: 0, transition: 'all 0.4s',
              }}>
                maximalism
              </button>
            </Reveal>
          </div>
        </section>
      )}

      {/* footer */}
      <section style={{ padding: '80px 32px', textAlign: 'center' }}>
        <Reveal>
          <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, opacity: 0.4, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 24 }}>let&apos;s talk</div>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {Object.entries(LINKS).map(([label, url]) => (
              <a key={label} href={url} target={label === 'email' ? undefined : '_blank'} rel="noopener"
                style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' as const, opacity: 0.5, color: 'inherit', textDecoration: 'none' }}>
                {label}
              </a>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 10, opacity: 0.2, marginTop: 48 }}>Op. posth. — built by opus. paris, 2026.</div>
        </Reveal>
      </section>
    </div>
  );
}
