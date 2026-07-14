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
import { OSCAR, LINKS, STATS, FEATURED, TRACKS, THOUGHTS, JOURNEY, HACKATHON_TIMELINE, RECORD_POINTS, AGENTIC_STACK, STACK_INTRO, COLORS, type Project } from '../shared/data';

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

// ticking numbers — the hero stats count up when they enter view (crescendo).
function Count({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0; const start = performance.now(); const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{n}{suffix}</span>;
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

const frame: React.CSSProperties = { minHeight: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '84px 32px', position: 'relative', overflow: 'hidden' };

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
            {project.links && (
              <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
                {project.links.live && <a href={project.links.live} target="_blank" rel="noopener" style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: project.color, textDecoration: 'none', opacity: 0.9 }}>live ↗</a>}
                {project.links.repo && <a href={project.links.repo} target="_blank" rel="noopener" style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase' as const, opacity: 0.4, textDecoration: 'none' }}>code ↗</a>}
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// the record, plotted — an engraved plate. prize $ per event, 2018 → now.
// hollow ticks are the zero-prize events (first hackathon, judge year, the building years).
function OpusPlot({ max }: { max: boolean }) {
  const accent = max ? COLORS.orange : C.gold;
  const pts = RECORD_POINTS;
  const maxUsd = Math.max(...pts.map((p) => p.usd));
  const W = 640, H = 150, pad = 10;
  const bw = (W - pad * 2) / pts.length;
  return (
    <Reveal>
      <div style={{ marginBottom: 30, overflowX: 'auto' }}>
        <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: accent, opacity: 0.8, marginBottom: 12 }}>
          plate i — prize won per event
        </div>
        <svg viewBox={`0 0 ${W} ${H + 30}`} style={{ width: '100%', minWidth: 500, display: 'block' }}>
          <line x1={pad} y1={H} x2={W - pad} y2={H} stroke={C.faint} strokeWidth="1" />
          {pts.map((p, i) => {
            const bh = p.usd ? (p.usd / maxUsd) * (H - 18) : 0;
            const x = pad + i * bw + bw * 0.26;
            const w = bw * 0.48;
            return (
              <g key={p.date}>
                {p.usd > 0 ? (
                  <motion.rect
                    x={x} width={w} rx={1.5} fill={accent} opacity={0.85}
                    initial={{ height: 0, y: H }} whileInView={{ height: bh, y: H - bh }} viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : (
                  <circle cx={x + w / 2} cy={H} r={2.5} fill="none" stroke={C.dim} strokeWidth="1" />
                )}
                <text x={x + w / 2} y={H + 13} fontSize="7" fill={C.dim} textAnchor="middle" fontFamily="var(--font-jetbrains-mono)">
                  &apos;{p.year.slice(2)}
                </text>
              </g>
            );
          })}
        </svg>
        <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 10, opacity: 0.4, marginTop: 8, lineHeight: 1.6 }}>
          bars = prize at award time · ○ = ran but no purse (2018 first-ever · 2019 judged · 2026 the building years)
        </div>
      </div>
    </Reveal>
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
          <p style={{ fontSize: 13, opacity: 0.45, fontWeight: 300, marginBottom: 34, lineHeight: 1.7 }}>
            the other pages show the highlights. this is the longer record — from the first hackathon in 2018 to now.
          </p>
        </Reveal>
        <OpusPlot max={max} />
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

// the crescendo — the living system, rendered as an ensemble on a staff.
function TheStack({ max }: { max: boolean }) {
  const accent = max ? COLORS.orange : C.gold;
  const voiceColors = [COLORS.teal, COLORS.pink, C.gold, COLORS.green];
  return (
    <section style={{ ...frame, minHeight: '100vh', alignItems: 'flex-start', paddingTop: '14vh' }}>
      <div style={{ maxWidth: 640, width: '100%' }}>
        <Reveal>
          <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: accent, marginBottom: 10 }}>
            crescendo — {STACK_INTRO.kicker}
          </div>
          <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(2rem, 6vw, 3.4rem)', fontWeight: 400, marginBottom: 8 }}>{STACK_INTRO.title}</h2>
          <p style={{ fontSize: 14, opacity: 0.5, fontWeight: 300, marginBottom: 44, lineHeight: 1.7, maxWidth: 460 }}>{STACK_INTRO.line}</p>
        </Reveal>
        {/* the staff: a brace down the left, one voice per line */}
        <div style={{ borderLeft: `1px solid ${max ? accent : C.faint}`, paddingLeft: 26 }}>
          {AGENTIC_STACK.map((s, i) => {
            const vc = max ? voiceColors[i % voiceColors.length] : C.gold;
            return (
              <Reveal key={s.key} delay={Math.min(i * 0.12, 0.5)}>
                <div style={{ position: 'relative', paddingBottom: 30, marginBottom: 2 }}>
                  <span style={{ position: 'absolute', left: -30, top: 9, width: 7, height: 7, borderRadius: '50%', background: vc, boxShadow: max ? `0 0 0 4px ${vc}22` : 'none', transition: 'all 0.8s' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.3rem, 3.4vw, 1.9rem)', color: max ? vc : 'inherit', transition: 'color 0.8s' }}>{s.layer}</span>
                    <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: vc, opacity: 0.9 }}>{s.verb}</span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 10, opacity: 0.4, letterSpacing: '0.08em', marginTop: 3 }}>{s.sub}</div>
                  <p style={{ fontSize: 13.5, opacity: 0.55, fontWeight: 300, marginTop: 8, lineHeight: 1.7 }}>{s.line}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
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
      <section style={{ ...frame, minHeight: '90vh' }}>
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
          <motion.p style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.15rem, 3vw, 1.55rem)', marginTop: 22, lineHeight: 1.42, fontWeight: 400, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto', opacity: 0.9 }}
            initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ delay: 2.1, duration: 1 }}>
            {OSCAR.selfDescription}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.4, duration: 1 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 26 }}>
            {['Staff PM · Ledger', `${STATS.hackathonWins}× hackathon winner`, '5-agent OS · ships by morning', 'FAVOUR · live'].map((c) => (
              <span key={c} style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, letterSpacing: '0.04em', padding: '6px 13px', borderRadius: 999, border: `1px solid ${max ? C.maxFg : C.gold}44`, color: max ? C.maxFg : C.gold, opacity: 0.9 }}>{c}</span>
            ))}
          </motion.div>
          <motion.p style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 12, letterSpacing: '0.15em', marginTop: 40, opacity: 0.35, textTransform: 'uppercase' as const }}
            initial={{ opacity: 0 }} animate={{ opacity: 0.35 }} transition={{ delay: 2.6, duration: 1 }}>scroll</motion.p>
        </div>
      </section>

      {/* crescendo: the living system — lead with the machine you built */}
      <TheStack max={max} />

      {/* three movements — the work, up front */}
      {movements.map((m, mi) => (
        <Fragment key={m.track.id}>
          <section style={{ ...frame, minHeight: 'auto', paddingBottom: 24 }}>
            <Reveal>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(2.6rem, 9vw, 5rem)', lineHeight: 1, color: max ? C.maxFg : C.gold, opacity: max ? 0.15 : 0.35 }}>
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
            {([
              { to: STATS.hackathonWins, prefix: '', suffix: '', l: 'wins' },
              { to: 188, prefix: '$', suffix: 'K', l: 'in prizes' },
              { to: 40, prefix: '', suffix: 'K', l: 'users' },
              { to: 51, prefix: '$', suffix: 'M', l: 'protected' },
            ]).map((s, i) => (
              <Reveal key={s.l} delay={i * 0.15}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(2.2rem, 7vw, 4rem)', lineHeight: 1 }}>
                    <Count to={s.to} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, opacity: 0.4, marginTop: 10, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* the path */}
      <section style={{ ...frame, minHeight: 'auto' }}>
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

      {/* projects + the agent-OS stack now lead, relocated to right after the hero */}

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
          <div style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 'clamp(1.8rem, 6vw, 3rem)', fontWeight: 400, marginBottom: 10 }}>{OSCAR.mantra}</div>
          <div style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, opacity: 0.4, letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 24 }}>open to the right team · let&apos;s talk</div>
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
