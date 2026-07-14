'use client';

import { motion, useInView, useMotionValue, useSpring, useScroll, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { OSCAR, LINKS, STATS, FEATURED, THOUGHTS, JOURNEY, ARC, AGENTIC_STACK, STACK_INTRO, RECORD_POINTS, COLORS, type Track } from '../shared/data';

// ════════════════════════════════════════════════════════════
//  data — single source of truth lives in ../shared/data
//  this file only adds the paint, the wine, and the confetti
// ════════════════════════════════════════════════════════════

const PALETTE = Object.values(COLORS);

// journey indexed by chapter so each section can pull its own line
const J = Object.fromEntries(JOURNEY.map(j => [j.chapter, j])) as Record<string, (typeof JOURNEY)[number]>;

// numbers section, derived from shared stats
const STAT_ITEMS = [
  { to: STATS.hackathonWins, prefix: '', suffix: '', label: 'hackathon wins' },
  { to: parseInt(STATS.prizes.replace(/\D/g, ''), 10), prefix: '$', suffix: 'k', label: 'in prizes' },
  { to: parseInt(STATS.users.replace(/\D/g, ''), 10), prefix: '', suffix: 'k', label: 'users shipped to' },
  { to: parseInt(STATS.prevented.replace(/\D/g, ''), 10), prefix: '$', suffix: 'm', label: 'losses prevented' },
];

// keep the philosophy for the prompt section, don't repeat it in notes
const NOTES = THOUGHTS.filter(t => t !== OSCAR.philosophy);

// interstitial labels when the project shelf changes era
const CATEGORY_INTRO: Record<Track, string> = {
  work: 'the work / paid, owned, real scope',
  agents: 'the agent era / nights and weekends',
  hackathons: 'the hackathon circuit',
};

const EGGS: Record<string, string> = {
  hej: 'hej själv! kul att du hittade hit.',
  fika: 'fika approved. everything ships better after coffee.',
  lagom: 'exactly the right amount. you get it.',
  sudo: 'nice try. permission granted anyway.',
  oui: 'exactement.',
  bagel: 'bagel says hi from a server in germany. it never sleeps either.',
  snus: 'the fifth terminal runs on it.',
  wine: 'santé. the glass near the eiffel tower is clickable, by the way.',
  paris: 'you are already here.',
};

// deterministic pseudo-random (no hydration mismatch)
function rnd(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}
const pad = (n: number) => String(n).padStart(2, '0');

// ════════════════════════════════════════════════════════════
//  primitives
// ════════════════════════════════════════════════════════════

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function ChapterLabel({ text }: { text: string }) {
  return <div className="mono chapter-label">{text}</div>;
}

function SketchUnderline({ width = 180, delay = 0.4 }: { width?: number; delay?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <svg ref={ref} viewBox={`0 0 ${width} 12`} fill="none" style={{ width, height: 12, display: 'block', marginTop: 6 }}>
      {inView && (
        <motion.path
          d={`M2 8 C${width * 0.2} 3 ${width * 0.4} 11 ${width * 0.6} 6 C${width * 0.8} 2 ${width * 0.95} 9 ${width - 2} 5`}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.4 }}
          transition={{ duration: 1.4, ease: 'easeOut', delay }}
        />
      )}
    </svg>
  );
}

function TypedText({
  text, delay = 0, speed = 30, keepCursor = false, className = 'mono', style,
}: {
  text: string; delay?: number; speed?: number; keepCursor?: boolean; className?: string; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setN(i);
        if (i >= text.length && interval) clearInterval(interval);
      }, speed);
    }, delay * 1000);
    return () => { clearTimeout(timeout); if (interval) clearInterval(interval); };
  }, [inView, text, delay, speed]);

  const done = n >= text.length;
  return (
    <span ref={ref} className={className} style={style}>
      {text.slice(0, n)}
      {(!done || keepCursor) && <span className="blink">▌</span>}
    </span>
  );
}

function Counter({ to, prefix = '', suffix = '', duration = 1.4 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

// tilt-on-mouse card
function TiltCard({ children }: { children: React.ReactNode }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });

  return (
    <motion.div
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 7);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 7);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
    >
      {children}
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════
//  paris sketches (hand-drawn line work, matisse fill in max)
// ════════════════════════════════════════════════════════════

function useDrawn() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });
  return { ref, inView };
}

const drawProps = (inView: boolean, delay = 0) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: inView ? { pathLength: 1, opacity: 1 } : {},
  transition: { duration: 1.6, ease: 'easeInOut' as const, delay },
});

function EiffelTower() {
  const { ref, inView } = useDrawn();
  const [hover, setHover] = useState(false);

  const sparkles = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => {
      const y = 20 + rnd(i * 3 + 1) * 124;
      const half = 3 + (y - 14) * 0.24;
      return { x: 50 + (rnd(i * 7 + 2) * 2 - 1) * half, y, d: rnd(i + 5) * 1.2 };
    }), []);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
    >
      <svg ref={ref} viewBox="0 0 100 160" fill="none" className="sketch" style={{ width: 'clamp(70px, 10vw, 110px)', cursor: 'pointer' }}>
        <path className="msf" d="M50 6 L55 42 L62 74 L74 112 L88 150 L60 150 Q50 124 40 150 L12 150 L26 112 L38 74 L45 42 Z" fill={COLORS.blue} />
        <motion.path d="M12 150 C30 102 42 56 50 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...drawProps(inView)} />
        <motion.path d="M88 150 C70 102 58 56 50 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" {...drawProps(inView, 0.15)} />
        <motion.path d="M40 150 C44 114 47 74 50 42" stroke="currentColor" strokeWidth="1" strokeLinecap="round" {...drawProps(inView, 0.3)} />
        <motion.path d="M60 150 C56 114 53 74 50 42" stroke="currentColor" strokeWidth="1" strokeLinecap="round" {...drawProps(inView, 0.3)} />
        <motion.path d="M26 112 L74 112" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" {...drawProps(inView, 0.5)} />
        <motion.path d="M38 74 L62 74" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" {...drawProps(inView, 0.6)} />
        <motion.path d="M45 42 L55 42" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" {...drawProps(inView, 0.7)} />
        <motion.path d="M40 150 Q50 122 60 150" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" {...drawProps(inView, 0.8)} />
        <motion.path d="M26 112 L62 150 M74 112 L38 150" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity={0.6} {...drawProps(inView, 0.9)} />
        <motion.path d="M50 10 L50 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" {...drawProps(inView, 1.1)} />
        {hover && sparkles.map((s, i) => (
          <motion.circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={1.5}
            fill="#ffd34d"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: s.d }}
          />
        ))}
      </svg>
      <span className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', opacity: hover ? 0.6 : 0.25, textTransform: 'uppercase', transition: 'opacity 0.3s' }}>
        {hover ? 'it sparkles on the hour' : 'hover me'}
      </span>
    </div>
  );
}

function MetroSign() {
  const { ref, inView } = useDrawn();
  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 200 90"
      fill="none"
      className="sketch"
      style={{ width: 'clamp(110px, 14vw, 160px)' }}
      whileHover={{ scale: 1.06, rotate: -1.5 }}
      transition={{ type: 'spring', stiffness: 200, damping: 14 }}
    >
      <ellipse className="msf" cx="100" cy="45" rx="92" ry="38" fill={COLORS.green} />
      <motion.ellipse cx="100" cy="45" rx="92" ry="38" stroke="currentColor" strokeWidth="1.6" {...drawProps(inView)} />
      <motion.ellipse cx="100" cy="45" rx="83" ry="30" stroke="currentColor" strokeWidth="0.7" opacity={0.5} {...drawProps(inView, 0.3)} />
      <motion.text
        x="100" y="53" textAnchor="middle"
        fill="currentColor"
        style={{ fontFamily: 'var(--font-dm-serif), Georgia, serif', fontSize: 24, letterSpacing: 7 }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.8 } : {}}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        MÉTRO
      </motion.text>
    </motion.svg>
  );
}

function WineGlass() {
  const { ref, inView } = useDrawn();
  const [level, setLevel] = useState(0);
  const captions = ['pour one', 'un verre', 'deux, allez', 'santé'];

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <svg
        ref={ref}
        viewBox="0 0 60 100"
        fill="none"
        className="sketch"
        style={{ width: 'clamp(34px, 5vw, 48px)', cursor: 'pointer' }}
        onClick={() => setLevel(l => (l + 1) % 4)}
      >
        <defs>
          <clipPath id="wineclip">
            <path d="M10 8 C10 36 20 48 30 48 C40 48 50 36 50 8 Z" />
          </clipPath>
        </defs>
        <motion.rect
          className="wine-fill"
          x="8" width="44"
          clipPath="url(#wineclip)"
          animate={{ y: 48 - level * 13, height: level * 13 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        />
        <motion.path d="M10 8 C10 36 20 48 30 48 C40 48 50 36 50 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...drawProps(inView)} />
        <motion.path d="M10 8 C18 5 42 5 50 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity={0.5} {...drawProps(inView, 0.3)} />
        <motion.path d="M30 48 L30 86" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...drawProps(inView, 0.5)} />
        <motion.path d="M14 90 C22 86 38 86 46 90" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...drawProps(inView, 0.7)} />
      </svg>
      <span className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', opacity: 0.3, textTransform: 'uppercase' }}>
        {captions[level]}
      </span>
    </div>
  );
}

function Baguette() {
  const { ref, inView } = useDrawn();
  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 150 44"
      fill="none"
      className="sketch"
      style={{ width: 'clamp(80px, 11vw, 120px)' }}
      whileHover={{ rotate: 4, x: 4 }}
      transition={{ type: 'spring', stiffness: 220, damping: 12 }}
    >
      <path className="msf" d="M10 32 C24 10 120 2 140 14 C132 36 30 44 10 32 Z" fill={COLORS.orange} />
      <motion.path d="M10 32 C24 10 120 2 140 14 C132 36 30 44 10 32 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...drawProps(inView)} />
      <motion.path d="M44 16 L52 26 M70 12 L78 22 M96 9 L104 19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" {...drawProps(inView, 0.5)} />
    </motion.svg>
  );
}

function Seine({ maximalism }: { maximalism: boolean }) {
  const { ref, inView } = useDrawn();
  return (
    <div style={{ width: '100%', maxWidth: 620, position: 'relative' }}>
      <svg ref={ref} viewBox="0 0 600 80" fill="none" className="sketch" style={{ width: '100%' }}>
        <motion.path
          d="M0 40 C60 18 120 62 180 40 C240 18 300 62 360 40 C420 18 480 62 540 40 C570 28 590 46 600 40"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
          {...drawProps(inView)}
        />
        <motion.path
          d="M30 56 C90 38 150 70 210 54 C270 38 330 70 390 54 C450 38 510 70 570 54"
          stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity={0.4}
          {...drawProps(inView, 0.4)}
        />
        {/* little boat sails across in maximalism */}
        <motion.g
          className="boat"
          animate={maximalism ? { x: [-30, 630] } : { x: -30 }}
          transition={maximalism ? { duration: 18, repeat: Infinity, ease: 'linear' } : { duration: 0 }}
        >
          <path d="M-12 30 L12 30 L7 37 L-7 37 Z" fill={COLORS.red} />
          <path d="M0 14 L0 30 L10 26 Z" fill={COLORS.blue} />
        </motion.g>
      </svg>
      <span className="mono" style={{ position: 'absolute', right: 0, bottom: -14, fontSize: 9, letterSpacing: '0.18em', opacity: 0.3, textTransform: 'uppercase' }}>
        la seine
      </span>
    </div>
  );
}

// nordic sun over horizon — clean scandinavian geometry
function NordicSun() {
  const { ref, inView } = useDrawn();
  return (
    <svg ref={ref} viewBox="0 0 200 110" fill="none" className="sketch" style={{ width: 'clamp(120px, 16vw, 180px)' }}>
      <circle className="msf" cx="100" cy="58" r="34" fill="#f2c14e" />
      <motion.circle cx="100" cy="58" r="34" stroke="currentColor" strokeWidth="1.5" {...drawProps(inView)} />
      <motion.path d="M10 96 L190 96" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...drawProps(inView, 0.4)} />
      <motion.path d="M62 104 L84 104 M104 104 L150 104" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity={0.4} {...drawProps(inView, 0.8)} />
    </svg>
  );
}

// passport stamps for the crypto years — lisbon win, bogotá build,
// and the $95k that got a polite non merci
function PassportStamps() {
  const { ref, inView } = useDrawn();
  const mono = { fontFamily: 'var(--font-jetbrains-mono), monospace' } as const;
  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 290 150"
      fill="none"
      className="sketch"
      style={{ width: 'clamp(190px, 26vw, 270px)' }}
      whileHover={{ rotate: 1.5 }}
      transition={{ type: 'spring', stiffness: 180, damping: 14 }}
    >
      {/* lisbon — winner stamp */}
      <g transform="rotate(-7 76 56)">
        <motion.rect x="16" y="24" width="120" height="64" rx="9" stroke="currentColor" strokeWidth="1.5" {...drawProps(inView)} />
        <motion.rect x="22" y="30" width="108" height="52" rx="6" stroke="currentColor" strokeWidth="0.6" opacity={0.4} {...drawProps(inView, 0.3)} />
        <motion.text x="76" y="52" textAnchor="middle" fill="currentColor" style={{ ...mono, fontSize: 13, letterSpacing: 3 }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 0.85 } : {}} transition={{ delay: 0.8, duration: 0.6 }}>
          LISBOA
        </motion.text>
        <motion.text x="76" y="70" textAnchor="middle" fill="currentColor" style={{ ...mono, fontSize: 7.5, letterSpacing: 1.5 }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 0.5 } : {}} transition={{ delay: 1, duration: 0.6 }}>
          ETH · 2021 · WINNER
        </motion.text>
      </g>
      {/* bogotá — round stamp */}
      <g transform="rotate(6 218 64)">
        <motion.circle cx="218" cy="64" r="42" stroke="currentColor" strokeWidth="1.5" {...drawProps(inView, 0.4)} />
        <motion.circle cx="218" cy="64" r="35" stroke="currentColor" strokeWidth="0.6" opacity={0.4} {...drawProps(inView, 0.7)} />
        <motion.text x="218" y="60" textAnchor="middle" fill="currentColor" style={{ ...mono, fontSize: 11, letterSpacing: 2.5 }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 0.85 } : {}} transition={{ delay: 1.1, duration: 0.6 }}>
          BOGOTÁ
        </motion.text>
        <motion.text x="218" y="76" textAnchor="middle" fill="currentColor" style={{ ...mono, fontSize: 7, letterSpacing: 1.5 }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 0.5 } : {}} transition={{ delay: 1.3, duration: 0.6 }}>
          ETH · 2022
        </motion.text>
      </g>
      {/* the no — slammed at an angle, ink in red */}
      <g transform="rotate(-4 100 126)">
        <motion.rect x="34" y="112" width="132" height="26" rx="4" stroke={COLORS.red} strokeWidth="1.4" {...drawProps(inView, 1)} />
        <motion.text x="100" y="129" textAnchor="middle" fill={COLORS.red} style={{ ...mono, fontSize: 9, letterSpacing: 1.5 }}
          initial={{ opacity: 0, scale: 1.6 }} animate={inView ? { opacity: 0.8, scale: 1 } : {}} transition={{ delay: 1.6, duration: 0.35, ease: 'backOut' }}>
          $95K — NON MERCI
        </motion.text>
      </g>
    </motion.svg>
  );
}

// ════════════════════════════════════════════════════════════
//  music
// ════════════════════════════════════════════════════════════

function Equalizer() {
  const bars = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      d: 0.45 + rnd(i) * 0.75,
      h: 20 + rnd(i * 3 + 2) * 75,
      ad: -rnd(i * 5 + 4) * 1.5,
      c: PALETTE[Math.floor(rnd(i * 11 + 7) * PALETTE.length)],
    })), []);

  return (
    <div className="eq" title="turn it up">
      {bars.map((b, i) => (
        <span
          key={i}
          style={{
            '--d': `${b.d}s`,
            '--h': `${b.h}%`,
            '--ad': `${b.ad}s`,
            '--bar-c': b.c,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
//  matisse cut-outs (floating, maximalism only)
// ════════════════════════════════════════════════════════════

function ShapeGlyph({ shape, color, size = 14 }: { shape: number; color: string; size?: number }) {
  if (shape === 0) return <svg width={size} height={size} viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill={color} /></svg>;
  if (shape === 1) return <svg width={size} height={size * 1.6} viewBox="0 0 12 20"><path d="M6 1 C2 5 1 12 6 19 C11 12 10 5 6 1Z" fill={color} /></svg>;
  if (shape === 2) return <svg width={size} height={size} viewBox="0 0 20 20"><path d="M10 1 L12.2 7.6 L19 7.6 L13.6 12 L15.8 19 L10 14.6 L4.2 19 L6.4 12 L1 7.6 L7.8 7.6Z" fill={color} /></svg>;
  return <svg width={size} height={size} viewBox="0 0 20 20"><path d="M2 18 L2 2 L18 2 C18 11 11 18 2 18Z" fill={color} /></svg>;
}

const CUTOUTS: { shape: number; color: string; size: number; top: string; left?: string; right?: string; rot: number; beat?: boolean }[] = [
  { shape: 1, color: COLORS.orange, size: 64, top: '5%', right: '9%', rot: -14 },
  { shape: 0, color: COLORS.blue, size: 52, top: '11%', left: '6%', rot: 0 },
  { shape: 3, color: COLORS.pink, size: 44, top: '18%', right: '14%', rot: 24 },
  { shape: 2, color: COLORS.purple, size: 40, top: '25%', left: '10%', rot: 12 },
  { shape: 0, color: COLORS.red, size: 58, top: '32%', right: '7%', rot: 0, beat: true },
  { shape: 1, color: COLORS.green, size: 48, top: '39%', left: '5%', rot: 18 },
  { shape: 2, color: COLORS.orange, size: 36, top: '47%', right: '11%', rot: -20 },
  { shape: 3, color: COLORS.blue, size: 50, top: '54%', left: '8%', rot: -8 },
  { shape: 1, color: COLORS.pink, size: 56, top: '62%', right: '6%', rot: 10 },
  { shape: 0, color: COLORS.purple, size: 42, top: '70%', left: '11%', rot: 0 },
  { shape: 2, color: COLORS.green, size: 44, top: '78%', right: '13%', rot: 32 },
  { shape: 1, color: COLORS.red, size: 50, top: '86%', left: '7%', rot: -24 },
  { shape: 3, color: COLORS.orange, size: 38, top: '93%', right: '9%', rot: 14 },
];

function Cutouts({ maximalism }: { maximalism: boolean }) {
  return (
    <>
      {CUTOUTS.map((c, i) => (
        <div
          key={i}
          className={`cutout ${c.beat ? 'beat' : ''}`}
          style={{
            top: c.top,
            left: c.left,
            right: c.right,
            transform: `rotate(${c.rot}deg) scale(${maximalism ? 1 : 0.4})`,
            '--fd': `${7 + rnd(i) * 6}s`,
          } as React.CSSProperties}
        >
          <ShapeGlyph shape={c.shape} color={c.color} size={c.size} />
        </div>
      ))}
    </>
  );
}

// ════════════════════════════════════════════════════════════
//  particles, confetti, bursts
// ════════════════════════════════════════════════════════════

type Piece = { id: number; x: number; y: number; dx: number; dy: number; rot: number; color: string; shape: number; scale: number };

function useBurst() {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const counter = useRef(0);

  const burst = useCallback((x: number, y: number, count = 24, color?: string) => {
    const next: Piece[] = [];
    for (let i = 0; i < count; i++) {
      counter.current++;
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.7;
      const dist = 90 + Math.random() * 240;
      next.push({
        id: counter.current,
        x, y,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist * 0.8 - 70,
        rot: Math.random() * 540 - 270,
        color: color && Math.random() > 0.4 ? color : PALETTE[Math.floor(Math.random() * PALETTE.length)],
        shape: Math.floor(Math.random() * 4),
        scale: 0.6 + Math.random(),
      });
    }
    setPieces(p => [...p, ...next]);
    const ids = new Set(next.map(p => p.id));
    setTimeout(() => setPieces(p => p.filter(pc => !ids.has(pc.id))), 1800);
  }, []);

  return { pieces, burst };
}

function ConfettiLayer({ pieces }: { pieces: Piece[] }) {
  return (
    <>
      {pieces.map(p => (
        <motion.div
          key={p.id}
          className="confetti-piece"
          style={{ left: p.x, top: p.y }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: p.scale }}
          animate={{ x: p.dx, y: p.dy + 160, rotate: p.rot, opacity: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 0.6, 0.4, 1] }}
        >
          <ShapeGlyph shape={p.shape} color={p.color} size={13} />
        </motion.div>
      ))}
    </>
  );
}

function CursorTrail({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; shape: number }[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    if (!active) { setParticles([]); return; }
    const onMove = (e: MouseEvent) => {
      if (Math.random() > 0.35) return;
      counter.current++;
      setParticles(prev => [...prev.slice(-13), {
        id: counter.current,
        x: e.clientX,
        y: e.clientY,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        shape: Math.floor(Math.random() * 4),
      }]);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [active]);

  if (!active) return null;
  return (
    <>
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="cursor-particle"
          style={{ left: p.x - 5, top: p.y - 5 }}
          initial={{ scale: 1, opacity: 0.85, rotate: 0 }}
          animate={{ scale: 0, opacity: 0, y: -34, rotate: 120 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        >
          <ShapeGlyph shape={p.shape} color={p.color} size={11} />
        </motion.div>
      ))}
    </>
  );
}

// ════════════════════════════════════════════════════════════
//  chrome: progress, status bar, countdown, eggs, aurora
// ════════════════════════════════════════════════════════════

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

function StatusBar() {
  const [uptime, setUptime] = useState('00:00');
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const s = Math.floor((Date.now() - start) / 1000);
      setUptime(`${pad(Math.floor(s / 60))}:${pad(s % 60)}`);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="statusbar">
      <span className="dot" />
      <span>morkeeth@paris ~ {STATS.terminals} terminals · uptime {uptime}</span>
      <span className="blink">▌</span>
    </div>
  );
}

function Countdown48() {
  const [t, setT] = useState('48:00:00');
  useEffect(() => {
    const update = () => {
      const total = 48 * 3600;
      const r = total - (Math.floor(Date.now() / 1000) % total);
      setT(`${pad(Math.floor(r / 3600))}:${pad(Math.floor((r % 3600) / 60))}:${pad(r % 60)}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="mono" style={{ fontVariantNumeric: 'tabular-nums' }}>{t}</span>;
}

function useTypedEggs() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    let buf = '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key.length !== 1 || e.metaKey || e.ctrlKey) return;
      buf = (buf + e.key.toLowerCase()).slice(-10);
      for (const word of Object.keys(EGGS)) {
        if (buf.endsWith(word)) {
          setMsg(EGGS[word]);
          buf = '';
          setTimeout(() => setMsg(null), 4000);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return msg;
}

function Aurora() {
  return (
    <motion.div className="aurora" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>
      <i /><i /><i />
      <span className="aurora-caption">norrsken över paris</span>
    </motion.div>
  );
}

// hero name with scatter-on-hover letters
function ScatterName({ text }: { text: string }) {
  return (
    <h1 className="serif" style={{ fontSize: 'clamp(2.6rem, 9vw, 6rem)', letterSpacing: '-0.03em', lineHeight: 1, fontWeight: 400, whiteSpace: 'nowrap' }}>
      {text.split('').map((ch, i) => (
        ch === ' '
          ? <span key={i}>&nbsp;</span>
          : (
            <motion.span
              key={i}
              style={{ display: 'inline-block', cursor: 'default' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -12, rotate: rnd(i) * 16 - 8, transition: { type: 'spring', stiffness: 300, damping: 10 } }}
            >
              {ch}
            </motion.span>
          )
      ))}
    </h1>
  );
}

// ════════════════════════════════════════════════════════════
//  page
// ════════════════════════════════════════════════════════════

export default function Home() {
  const [maximalism, setMaximalism] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pieces, burst } = useBurst();
  const eggMsg = useTypedEggs();

  // tab title easter egg
  useEffect(() => {
    const original = document.title;
    const onVis = () => {
      document.title = document.hidden ? 'come back to paris' : original;
    };
    document.addEventListener('visibilitychange', onVis);
    return () => { document.removeEventListener('visibilitychange', onVis); document.title = original; };
  }, []);

  // console easter egg for the devtools crowd
  useEffect(() => {
    console.log(
      '%c      A\n     /|\\\n    / | \\\n   /__|__\\\n  /   |   \\\n /____|____\\',
      `color: ${COLORS.blue}; font-family: monospace;`
    );
    console.log(
      `%c${OSCAR.mantra}  →  ${LINKS.email.replace('mailto:', '')}`,
      `color: ${COLORS.orange}; font-size: 13px; font-family: monospace;`
    );
  }, []);

  // mini switch appears after first viewport
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggle = useCallback((x?: number, y?: number) => {
    setMaximalism(m => {
      if (!m && x !== undefined && y !== undefined) burst(x, y, 28);
      return !m;
    });
  }, [burst]);

  return (
    <div
      className={`page-wrapper ${maximalism ? 'maximalism' : ''}`}
      style={{
        background: maximalism ? 'var(--max-bg)' : 'var(--bg)',
        color: maximalism ? 'var(--max-fg)' : 'var(--fg)',
      }}
      onDoubleClick={(e) => { if (maximalism) burst(e.clientX, e.clientY, 12); }}
    >
      <ScrollProgress />
      <StatusBar />
      <CursorTrail active={maximalism} />
      <ConfettiLayer pieces={pieces} />
      <Cutouts maximalism={maximalism} />
      <AnimatePresence>{maximalism && <Aurora />}</AnimatePresence>

      {/* mini mode switch, top right, appears after scroll */}
      <AnimatePresence>
        {(scrolled || maximalism) && (
          <motion.button
            className="mini-switch"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            onClick={(e) => toggle(e.clientX, e.clientY)}
          >
            {maximalism ? '○ lagom' : '● max'}
          </motion.button>
        )}
      </AnimatePresence>

      {/* easter egg toast */}
      <AnimatePresence>
        {eggMsg && (
          <motion.div
            className="egg-toast"
            initial={{ opacity: 0, y: 16, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 16, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            {eggMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── hero ── */}
      <section className="frame">
        <div className="boot-lines" style={{ opacity: 0.3 }}>
          {['$ ssh oscar@paris', '$ ./portfolio --minimal', 'ready.'].map((line, i) => (
            <motion.div key={line} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.5, duration: 0.4 }}>
              {line}
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: 'center', maxWidth: 720 }}>
          <ScatterName text={OSCAR.name.toLowerCase()} />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }} style={{ marginTop: 14, display: 'flex', justifyContent: 'center' }}>
            <SketchUnderline width={280} delay={1.6} />
          </motion.div>
          <motion.p
            style={{ fontSize: 'clamp(1rem, 2.6vw, 1.32rem)', marginTop: 28, fontWeight: 300, opacity: 0.72 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.72 }}
            transition={{ delay: 1.6, duration: 1 }}
          >
            {OSCAR.title}. {OSCAR.location}. <span style={{ opacity: 0.6 }}>{OSCAR.tagline}</span>
          </motion.p>
          {/* strengths, said plainly */}
          <motion.p
            className="serif"
            style={{ fontSize: 'clamp(1.2rem, 3.3vw, 1.85rem)', lineHeight: 1.45, marginTop: 20, fontWeight: 400, maxWidth: 620, marginLeft: 'auto', marginRight: 'auto', opacity: 0.92 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.92 }}
            transition={{ delay: 1.9, duration: 1 }}
          >
            {OSCAR.selfDescription}
          </motion.p>
          {/* proof chips, hand-painted and warm */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 26 }}
          >
            {([
              { t: 'Staff PM · Ledger', c: COLORS.ledger },
              { t: `${STATS.hackathonWins}× hackathon winner`, c: COLORS.orange },
              { t: '5-agent OS · ships by morning', c: COLORS.teal },
              { t: 'FAVOUR · live', c: COLORS.green },
            ] as const).map((chip) => (
              <span
                key={chip.t}
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.04em',
                  padding: '7px 14px',
                  borderRadius: 999,
                  border: `1.5px solid color-mix(in srgb, ${chip.c} 55%, transparent)`,
                  background: `color-mix(in srgb, ${chip.c} 13%, transparent)`,
                  color: chip.c,
                }}
              >
                {chip.t}
              </span>
            ))}
          </motion.div>
          <motion.p
            className="mono"
            style={{ fontSize: 11, letterSpacing: '0.18em', marginTop: 38, textTransform: 'uppercase' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ delay: 2.6, duration: 1 }}
          >
            scroll
          </motion.p>
          <motion.div
            style={{ width: 1, height: 32, background: 'currentColor', margin: '12px auto 0', transformOrigin: 'top' }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: [0, 1, 0], opacity: 0.3 }}
            transition={{ delay: 3, duration: 1.8, repeat: Infinity, repeatDelay: 0.4 }}
          />
        </div>
      </section>

      {/* ── the stack: what i've become. lead with the machine you built ── */}
      <section className="frame">
        <div style={{ maxWidth: 560, width: '100%' }}>
          <Reveal>
            <ChapterLabel text={`the stack · present`} />
            <h2 className="serif chapter-title">{STACK_INTRO.title}.</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="body-text" style={{ marginTop: 22 }}>{STACK_INTRO.line}</p>
          </Reveal>
          <div style={{ marginTop: 38 }}>
            {AGENTIC_STACK.map((s, i) => {
              const accents = [COLORS.teal, COLORS.pink, COLORS.orange, COLORS.green];
              const c = accents[i % accents.length];
              return (
                <Reveal key={s.key} delay={0.3 + i * 0.12}>
                  <div style={{ display: 'flex', gap: 14, alignItems: 'baseline', padding: '15px 0', borderBottom: '1px solid color-mix(in srgb, currentColor 8%, transparent)', flexWrap: 'wrap' }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: c, flexShrink: 0, transform: 'translateY(-1px)' }} />
                    <span className="serif" style={{ fontSize: 'clamp(1.15rem, 3vw, 1.7rem)', color: c }}>{s.layer}</span>
                    <span className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', opacity: 0.55 }}>{s.verb}</span>
                    <span className="body-text" style={{ fontSize: 13.5, opacity: 0.62, flexBasis: '100%', marginLeft: 23 }}>{s.line}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── projects, up front. the strongest proof, one per frame ── */}
      {FEATURED.map((p, i) => {
        const newCategory = i === 0 || FEATURED[i - 1].track !== p.track;
        return (
          <section key={p.slug} className="frame frame-short" style={{ minHeight: 'auto', paddingTop: 40, paddingBottom: 40 }}>
            <div style={{ maxWidth: 520, width: '100%' }}>
              {newCategory && (
                <Reveal>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block', flexShrink: 0 }} />
                    <span className="mono" style={{ fontSize: 9, letterSpacing: '0.18em', opacity: 0.4, textTransform: 'uppercase' }}>
                      {CATEGORY_INTRO[p.track]}
                    </span>
                  </div>
                </Reveal>
              )}
              <Reveal delay={newCategory ? 0.15 : 0}>
                <TiltCard>
                  <div
                    className="project-tile"
                    style={{
                      '--pc': p.color,
                      '--tilt': `${(rnd(i * 13 + 3) * 3 - 1.5).toFixed(2)}deg`,
                      cursor: 'pointer',
                      overflow: 'hidden',
                    } as React.CSSProperties}
                    onClick={(e) => burst(e.clientX, e.clientY, 14, p.color)}
                    title="click for confetti. every project deserves some."
                  >
                    {p.image && (
                      <div style={{ margin: '-26px -26px 20px', position: 'relative' }}>
                        <motion.img
                          src={p.image}
                          alt={p.name}
                          initial={{ scale: 1.08, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true, margin: '-10%' }}
                          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                          style={{
                            width: '100%', display: 'block', aspectRatio: '16 / 10', objectFit: 'cover',
                            filter: maximalism ? 'saturate(1.06) contrast(1.02)' : 'grayscale(0.2) opacity(0.92)',
                            transition: 'filter 0.8s ease',
                          }}
                        />
                        <div style={{
                          position: 'absolute', left: 0, right: 0, bottom: 0, height: 3,
                          background: p.color, opacity: maximalism ? 1 : 0.5, transition: 'opacity 0.8s ease',
                        }} />
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, gap: 12 }}>
                      <h3 className="serif" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', fontWeight: 400, color: maximalism ? p.color : 'inherit', transition: 'color 0.8s' }}>
                        {p.name.toLowerCase()}
                      </h3>
                      <span className="badge">{p.buildTime}</span>
                    </div>
                    <p style={{ fontSize: 15, lineHeight: 1.65, fontWeight: 300, minHeight: '3.3em' }}>
                      <TypedText text={p.oneLiner} speed={16} delay={0.2} className="" style={{ opacity: 0.65 }} />
                    </p>
                    <p style={{ fontSize: 12.5, lineHeight: 1.7, fontWeight: 300, opacity: 0.42, marginTop: 10 }}>
                      {p.story}
                    </p>
                    {p.details && (
                      <ul style={{ listStyle: 'none', margin: '14px 0 0', padding: 0 }}>
                        {p.details.map(d => (
                          <li key={d} className="mono" style={{ fontSize: 10, opacity: 0.45, letterSpacing: '0.04em', lineHeight: 2, display: 'flex', gap: 8 }}>
                            <span style={{ color: p.color, opacity: maximalism ? 1 : 0.6 }}>·</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {p.links && (
                      <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
                        {p.links.live && <a href={p.links.live} target="_blank" rel="noopener" className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: maximalism ? p.color : 'inherit', opacity: maximalism ? 0.95 : 0.6, textDecoration: 'none', transition: 'color 0.8s' }}>live ↗</a>}
                        {p.links.repo && <a href={p.links.repo} target="_blank" rel="noopener" className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.45, textDecoration: 'none' }}>code ↗</a>}
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 12 }}>
                      <SketchUnderline width={140} delay={0.3} />
                      <span className="mono" style={{ fontSize: 10, opacity: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: maximalism ? p.color : 'inherit', transition: 'color 0.8s', textAlign: 'right' }}>
                        {p.result}
                        <span style={{ opacity: 0.55 }}> · {p.year}</span>
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* ── the prompt ── */}
      <section className="frame frame-short">
        <Reveal>
          <div style={{ maxWidth: 520 }}>
            <TypedText text="> tell me about yourself" delay={0.3} keepCursor style={{ fontSize: 13, opacity: 0.5, letterSpacing: '0.02em' }} />
            <motion.p
              className="serif"
              style={{ fontSize: 'clamp(1.3rem, 3.5vw, 2rem)', lineHeight: 1.5, marginTop: 26, fontWeight: 400 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.6, duration: 1 }}
            >
              {OSCAR.philosophy}
            </motion.p>
          </div>
        </Reveal>
      </section>

      {/* ── numbers ── */}
      <section className="frame frame-short">
        <div style={{ display: 'flex', gap: 'clamp(36px, 7vw, 72px)', flexWrap: 'wrap', justifyContent: 'center' }}>
          {STAT_ITEMS.map((n, i) => (
            <Reveal key={n.label} delay={i * 0.15}>
              <div style={{ textAlign: 'center' }}>
                <div className="serif" style={{ fontSize: 'clamp(2rem, 6vw, 3.4rem)', lineHeight: 1 }}>
                  <Counter to={n.to} prefix={n.prefix} suffix={n.suffix} />
                </div>
                <div className="mono" style={{ fontSize: 10, opacity: 0.4, marginTop: 10, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {n.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── chapter 01: stockholm ── */}
      <section className="frame frame-short">
        <div style={{ maxWidth: 560, width: '100%' }}>
          <Reveal>
            <ChapterLabel text={`chapter 01 / ${J.community.place} · ${J.community.year}`} />
            <h2 className="serif chapter-title">it started with other people{'’'}s hackathons.</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="body-text" style={{ marginTop: 22 }}>
              {J.community.summary} sweden{'’'}s largest, peaking at {STATS.etableraPeak} participants.
              the best products come out of rooms with deadlines and pizza.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div style={{ marginTop: 40, display: 'flex', alignItems: 'flex-end', gap: 28, flexWrap: 'wrap' }}>
              <NordicSun />
              <div className="mono" style={{ fontSize: 10, opacity: 0.35, letterSpacing: '0.12em', lineHeight: 2, textTransform: 'uppercase' }}>
                stockholm, 59°N
                <br />
                <span style={{ opacity: 0.7, textTransform: 'none', letterSpacing: '0.04em' }}>(swedish words are hidden here. try typing {'“'}hej{'”'})</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── interlude: california ── */}
      <section className="frame frame-short">
        <Reveal>
          <div style={{ maxWidth: 520, textAlign: 'center' }}>
            <ChapterLabel text={`interlude / ${J.wallenberg.place} · ${J.wallenberg.year}`} />
            <p className="serif" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.7rem)', lineHeight: 1.55, fontWeight: 400 }}>
              {J.wallenberg.summary}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── chapter 02: the crypto years ── */}
      <section className="frame frame-short">
        <div style={{ maxWidth: 560, width: '100%' }}>
          <Reveal>
            <ChapterLabel text={`chapter 02 / ${J.crypto.place} · ${J.crypto.year}`} />
            <h2 className="serif chapter-title">the passport got stamps. so did the github.</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="body-text" style={{ marginTop: 22 }}>
              {J.crypto.summary} sometimes knowing what you don{'’'}t want is the move.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div style={{ marginTop: 40 }}>
              <PassportStamps />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── chapter 03: the music years ── */}
      <section className="frame frame-short">
        <div style={{ maxWidth: 560, width: '100%' }}>
          <Reveal>
            <ChapterLabel text={`chapter 03 / ${J.music.place} · ${J.music.year}`} />
            <h2 className="serif chapter-title">head of product at a music startup.</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="body-text" style={{ marginTop: 22 }}>
              {J.music.summary} kept the lesson, kept the records.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div style={{ marginTop: 40 }}>
              <Equalizer />
              <div className="mono" style={{ fontSize: 9, opacity: 0.3, marginTop: 12, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                hover to turn it up
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── chapter 04: paris ── */}
      <section className="frame frame-short">
        <div style={{ maxWidth: 620, width: '100%' }}>
          <Reveal>
            <ChapterLabel text={`chapter 04 / ${J.security.place} · ${J.security.year}`} />
            <h2 className="serif chapter-title">moved alone at 30. learned the métro before the language.</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="body-text" style={{ marginTop: 22 }}>
              {OSCAR.origin}
            </p>
            <p className="body-text" style={{ marginTop: 14, opacity: 0.7 }}>
              {J.security.summary}
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <div style={{ marginTop: 52, display: 'flex', alignItems: 'flex-end', gap: 'clamp(24px, 5vw, 48px)', flexWrap: 'wrap' }}>
              <EiffelTower />
              <MetroSign />
              <WineGlass />
              <Baguette />
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <div style={{ marginTop: 56 }}>
              <Seine maximalism={maximalism} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── chapter 05: the agents ── */}
      <section className="frame frame-short">
        <div style={{ maxWidth: 560, width: '100%' }}>
          <Reveal>
            <ChapterLabel text={`chapter 05 / ${J.agents.place} · ${J.agents.year}`} />
            <h2 className="serif chapter-title">3am. five terminals. snus and wine.</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="body-text" style={{ marginTop: 22 }}>
              {OSCAR.coding} now the nights and weekends look like this:
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mono" style={{ marginTop: 40, fontSize: 11, opacity: 0.5, letterSpacing: '0.08em', display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.16em', fontSize: 9, opacity: 0.7 }}>next build window resets in</span>
              <Countdown48 />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── thoughts ── */}
      <section className="frame frame-tall">
        <div style={{ maxWidth: 480 }}>
          <Reveal>
            <ChapterLabel text="notes to self" />
          </Reveal>
          {NOTES.map((thought, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <p className="serif" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', lineHeight: 1.7, marginBottom: 44, fontWeight: 400, opacity: 0.7, fontStyle: 'italic' }}>
                {thought}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── the winnings, drawn roughly ── */}
      <section className="frame frame-short">
        <div style={{ maxWidth: 640, width: '100%' }}>
          <Reveal>
            <ChapterLabel text="the winnings / drawn roughly" />
            <h2 className="serif chapter-title">what the nights paid.</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <svg viewBox="0 0 640 210" style={{ width: '100%', marginTop: 30, overflow: 'visible' }}>
              {(() => {
                const pts = RECORD_POINTS;
                const maxUsd = Math.max(...pts.map((p) => p.usd));
                const W = 640, H = 165, pad = 16;
                const xy = pts.map((p, i) => ({
                  x: pad + (i * (W - pad * 2)) / (pts.length - 1),
                  y: p.usd ? H - (p.usd / maxUsd) * (H - 34) : H,
                  p,
                }));
                const d = xy.map((q, i) => `${i === 0 ? 'M' : 'L'}${q.x.toFixed(1)} ${q.y.toFixed(1)}`).join(' ');
                return (
                  <>
                    <line x1={pad} y1={H} x2={W - pad} y2={H} stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" strokeLinecap="round" />
                    <motion.path
                      d={d} fill="none" stroke="rgba(240,237,232,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                      transition={{ duration: 1.6, ease: 'easeInOut' }}
                    />
                    {xy.map((q, i) => {
                      const c = PALETTE[i % PALETTE.length];
                      const r = q.p.usd ? 3.5 + (q.p.usd / maxUsd) * 9 : 2.5;
                      return (
                        <motion.circle
                          key={q.p.date} cx={q.x} cy={q.y} r={r}
                          fill={q.p.usd ? c : 'none'} stroke={c} strokeWidth={q.p.usd ? 0 : 1.5}
                          initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.5 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                          style={{ transformOrigin: `${q.x}px ${q.y}px` }}
                        />
                      );
                    })}
                    {xy.map((q) => (
                      <text key={`t-${q.p.date}`} x={q.x} y={H + 16} fontSize="8" fill="rgba(240,237,232,0.35)" textAnchor="middle" fontFamily="var(--font-jetbrains-mono)">
                        &apos;{q.p.year.slice(2)}
                      </text>
                    ))}
                  </>
                );
              })()}
            </svg>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="body-text" style={{ marginTop: 26, fontSize: 14, opacity: 0.6 }}>
              the tall one is bogotá. the flat stretch after is on purpose — in 2026 i stopped counting purses and started shipping.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── the arc — one instinct, three waves ── */}
      <section className="frame">
        <div style={{ maxWidth: 620, width: '100%' }}>
          <Reveal>
            <ChapterLabel text={ARC.kicker} />
            <p className="serif" style={{ fontSize: 'clamp(1.35rem, 3.6vw, 2rem)', lineHeight: 1.4, marginTop: 14, fontWeight: 400 }}>
              {ARC.thesis}
            </p>
          </Reveal>
          <div style={{ marginTop: 48 }}>
            {ARC.waves.map((w, i) => (
              <Reveal key={w.tag} delay={0.1 + i * 0.12}>
                <motion.div
                  style={{
                    display: 'flex',
                    gap: 'clamp(16px, 3vw, 26px)',
                    alignItems: 'baseline',
                    padding: '20px 0',
                    borderBottom: '1px solid color-mix(in srgb, currentColor 10%, transparent)',
                  }}
                  whileHover={{ x: 8 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                  <span
                    style={{
                      width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                      background: PALETTE[i % PALETTE.length],
                      opacity: maximalism ? 1 : 0.6,
                      transition: 'opacity 0.8s',
                      alignSelf: 'flex-start',
                      marginTop: 8,
                    }}
                  />
                  <div style={{ minWidth: 74, flexShrink: 0 }}>
                    <div className="mono" style={{ fontSize: 11, opacity: 0.5, letterSpacing: '0.06em', fontVariantNumeric: 'tabular-nums' }}>{w.years}</div>
                    <div className="mono" style={{ fontSize: 9, letterSpacing: '0.16em', opacity: 0.4, textTransform: 'uppercase', marginTop: 4 }}>{w.tag}</div>
                  </div>
                  <div>
                    <h3 className="serif" style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 400, marginBottom: 7 }}>{w.title}</h3>
                    <p style={{ fontSize: 13.5, fontWeight: 300, lineHeight: 1.7, opacity: 0.6 }}>{w.line}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── the mantra ── */}
      <section className="frame frame-short">
        <Reveal>
          <div
            style={{ textAlign: 'center', cursor: 'pointer', userSelect: 'none' }}
            onClick={(e) => burst(e.clientX, e.clientY, 36)}
          >
            <p className="mono" style={{ fontSize: 10, opacity: 0.35, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 22 }}>
              the question that started all of it
            </p>
            <motion.h2
              className="serif"
              style={{ fontSize: 'clamp(1.8rem, 5.5vw, 3.2rem)', fontWeight: 400, lineHeight: 1.2 }}
              whileHover={{ scale: 1.04, rotate: -1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14 }}
            >
              {OSCAR.mantra}
            </motion.h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <SketchUnderline width={220} delay={0.5} />
            </div>
            <p className="mono" style={{ fontSize: 9, opacity: 0.25, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 20 }}>
              click it. go on.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── the switch ── */}
      <section className="frame">
        <div style={{ textAlign: 'center' }}>
          <Reveal>
            <p className="mono" style={{ fontSize: 12, opacity: 0.45, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
              {maximalism ? 'voilà.' : 'this was the lagom version.'}
            </p>
            <p className="mono" style={{ fontSize: 10, opacity: 0.3, letterSpacing: '0.1em', marginBottom: 34 }}>
              {maximalism ? 'double-click anywhere. you earned it.' : 'lagom (swedish): exactly enough. but you came this far.'}
            </p>
            <button className="mode-switch" onClick={(e) => toggle(e.clientX, e.clientY)}>
              {maximalism ? 'back to lagom' : 'maximalism'}
              {!maximalism && (
                <span className="peek">
                  <i style={{ background: COLORS.orange }} />
                  <i style={{ background: COLORS.blue }} />
                  <i style={{ background: COLORS.red }} />
                </span>
              )}
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── footer ── */}
      <section style={{ padding: '90px 32px 110px', textAlign: 'center', position: 'relative' }}>
        <Reveal>
          <div className="mono" style={{ fontSize: 11, opacity: 0.4, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 26 }}>
            let{'’'}s talk
          </div>
          <div style={{ display: 'flex', gap: 26, justifyContent: 'center', flexWrap: 'wrap' }}>
            {([
              ['email', LINKS.email],
              ['github', LINKS.github],
              ['x', LINKS.x],
              ['linkedin', LINKS.linkedin],
            ] as const).map(([label, url]) => (
              <motion.a
                key={label}
                href={url}
                target={label === 'email' ? undefined : '_blank'}
                rel="noopener"
                className="mono"
                style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.5 }}
                whileHover={{ opacity: 1, y: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                {label}
              </motion.a>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <a href="/compare" className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.4 }}>
              same brief, four models — compare →
            </a>
          </div>
          <div style={{ marginTop: 56 }}>
            <TypedText
              text="morkeeth@paris:~$ open to interesting problems"
              speed={34}
              keepCursor
              style={{ fontSize: 12, opacity: 0.45, letterSpacing: '0.02em' }}
            />
          </div>
          <div className="mono" style={{ fontSize: 10, opacity: 0.25, marginTop: 40, lineHeight: 2 }}>
            made at 3am with snus, wine and {STATS.terminals} terminals
            <br />
            paris, 2026 · hej då
          </div>
        </Reveal>
      </section>
    </div>
  );
}
