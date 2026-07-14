'use client';

import { motion, useInView, useMotionValue, useSpring, useScroll, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, Fragment } from 'react';
import { OSCAR, LINKS, STATS, PROJECTS as RAW_PROJECTS, TRACKS, THOUGHTS, JOURNEY, AGENTIC_STACK, STACK_INTRO, RECORD_POINTS, COLORS } from '../shared/data';

// ─────────────────────────────────────────────────────────────
//  palette — ink on paper, editorial cool
// ─────────────────────────────────────────────────────────────
const C = {
  bg: '#0e0e0e', fg: '#f0ede8', subtle: '#8a877f', rule: '#242320', accent: '#c8b89a',
  red: '#c94e3a', blue: '#3a6ecf', green: '#3a8a5c', violet: '#7a5caf', gold: '#c8963a', pink: '#c45a7a',
};
const ACCENT_COLORS = [C.red, C.blue, C.green, C.violet, C.gold, C.pink];
const pad = (n: number) => String(n).padStart(2, '0');

// ─────────────────────────────────────────────────────────────
//  map shared project data to the display shape
// ─────────────────────────────────────────────────────────────
const colorMap: Record<string, string> = {
  [COLORS.orange]: C.gold,
  [COLORS.blue]:   C.blue,
  [COLORS.red]:    C.red,
  [COLORS.green]:  C.green,
  [COLORS.purple]: C.violet,
  [COLORS.pink]:   C.pink,
  [COLORS.teal]:   C.green,
  [COLORS.ledger]: C.blue,
};

const PROJECTS = RAW_PROJECTS.filter((p) => p.featured).map((p) => ({
  name:    p.name.toLowerCase(),
  desc:    p.oneLiner,
  tag:     p.result,
  time:    p.buildTime,
  color:   colorMap[p.color] ?? C.gold,
  year:    p.year,
  track:   p.track,
  details: p.details,
  story:   p.story,
  links:   p.links,
}));

// ledger section stats derived from shared data
const LEDGER_WORK = [
  { kpi: STATS.prevented,        label: 'prevented losses',       sub: 'blockaid integration'   },
  { kpi: '2h',                   label: 'chain assessments',      sub: 'was two weeks'          },
  { kpi: STATS.users,            label: 'users at anotherblock',  sub: '0 to peak'              },
];

const EGGS: Record<string, string> = {
  hej:   'hej själv! kul att du hittade hit.',
  fika:  'fika approved. everything ships better after coffee.',
  lagom: 'exactly the right amount. you get it.',
  sudo:  'nice try. permission granted anyway.',
};

// table of contents anchors
const TOC = [
  { label: '§1 intro',    href: '#intro'    },
  { label: '§2 numbers',  href: '#numbers'  },
  { label: '§3 ledger',   href: '#work'     },
  { label: '§4 projects', href: '#projects' },
  { label: '§5 journey',  href: '#journey'  },
  { label: '§6 notes',    href: '#notes'    },
  { label: '§7 contact',  href: '#contact'  },
];

// ─────────────────────────────────────────────────────────────
//  global styles (injected once)
// ─────────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{background:${C.bg};color:${C.fg}}
  ::selection{background:${C.accent}22}
  .s-scroll-bar{position:fixed;top:0;left:0;right:0;height:2px;z-index:100;background:${C.rule};transform-origin:left}
  .s-scroll-bar-fill{position:absolute;inset:0;background:${C.accent}}
  .s-rule{width:100%;height:1px;background:${C.rule}}
  .s-rule-light{width:100%;height:1px;background:${C.fg}18}
  @keyframes s-blink{0%,49%{opacity:1}50%,100%{opacity:0}}
  .s-cursor{animation:s-blink 1.1s step-end infinite}
  @keyframes s-spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }

  .s-footnote-link {
    color: ${C.subtle};
    text-decoration: none;
    transition: color 0.2s;
  }
  .s-footnote-link:hover { color: ${C.fg}; }

  .s-project-row{display:grid;grid-template-columns:3fr 5fr 2fr 1.5fr;gap:0 24px;align-items:baseline;padding:18px 0;border-bottom:1px solid ${C.rule};transition:background 0.2s;cursor:default}
  .s-project-row:first-of-type{border-top:1px solid ${C.rule}}
  .s-project-row:hover{background:${C.fg}04}
  @media(max-width:640px){.s-project-row{grid-template-columns:1fr 1fr;grid-template-rows:auto auto}.s-project-desc{grid-column:1/-1}.s-project-tag{text-align:right}}
  .s-stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:${C.rule};border:1px solid ${C.rule}}
  .s-stat-cell{padding:32px 28px;background:${C.bg}}
  @media(max-width:600px){.s-stat-grid{grid-template-columns:1fr}}
  .s-nav-link{font-family:var(--font-jetbrains-mono),monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:${C.subtle};text-decoration:none;transition:color .2s}
  .s-nav-link:hover{color:${C.fg}}
  .s-footnote-link{color:${C.subtle};text-decoration:none;transition:color .2s}
  .s-footnote-link:hover{color:${C.fg}}
  .s-egg-toast{position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:${C.fg};color:${C.bg};font-family:var(--font-jetbrains-mono),monospace;font-size:11px;letter-spacing:.06em;padding:10px 18px;border-radius:3px;z-index:200;white-space:nowrap}
  .s-footnote-num{font-family:var(--font-jetbrains-mono),monospace;font-size:8px;vertical-align:super;opacity:.4;margin-left:2px}

  .s-toc-link{font-family:var(--font-jetbrains-mono),monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:${C.subtle};text-decoration:none;display:block;padding:5px 0;border-bottom:1px solid ${C.rule};transition:color .2s}
  .s-toc-link:hover{color:${C.fg}}

  .s-journey-row{display:grid;grid-template-columns:80px 80px 1fr 2fr;gap:0 20px;align-items:baseline;padding:16px 0;border-bottom:1px solid ${C.rule}}
  .s-journey-row:first-of-type{border-top:1px solid ${C.rule}}
  @media(max-width:600px){.s-journey-row{grid-template-columns:60px 1fr;grid-template-rows:auto auto}.s-journey-place{display:none}.s-journey-chapter{display:none}}
`;

const GlobalStyles = () => <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />;

// ─────────────────────────────────────────────────────────────
//  primitives
// ─────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, once = true }: { children: React.ReactNode; delay?: number; once?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-8%' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

const Rule = () => <div className="s-rule" />;
const RuleLight = () => <div className="s-rule-light" />;

// animated counter
function Counter({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const dur = 1200;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

// typewriter
function Typed({ text, speed = 30, delay = 0, keepCursor = false }: {
  text: string; speed?: number; delay?: number; keepCursor?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    let iv: ReturnType<typeof setInterval>;
    const t = setTimeout(() => {
      iv = setInterval(() => {
        i++;
        setN(i);
        if (i >= text.length) clearInterval(iv);
      }, speed);
    }, delay * 1000);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [inView, text, delay, speed]);
  const done = n >= text.length;
  return (
    <span ref={ref} style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>
      {text.slice(0, n)}
      {(!done || keepCursor) && <span className="s-cursor">▌</span>}
    </span>
  );
}

// scroll progress bar
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <div className="s-scroll-bar">
      <motion.div className="s-scroll-bar-fill" style={{ scaleX, transformOrigin: 'left' }} />
    </div>
  );
}

// easter eggs
function useEggs() {
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

// uptime clock
function Uptime() {
  const [t, setT] = useState('00:00');
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const s = Math.floor((Date.now() - start) / 1000);
      setT(`${pad(Math.floor(s / 60))}:${pad(s % 60)}`);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <span style={{ fontVariantNumeric: 'tabular-nums' }}>{t}</span>;
}

// grid column label
function ColLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: 'var(--font-jetbrains-mono), monospace',
      fontSize: 8,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: C.subtle,
      paddingBottom: 10,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div style={{
      fontFamily: 'var(--font-jetbrains-mono), monospace',
      fontSize: 8,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: C.subtle,
      lineHeight: 2.2,
      paddingTop: 4,
    }}>
      {num}
      <br />
      {label}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  section wrapper
// ─────────────────────────────────────────────────────────────
const section: React.CSSProperties = {
  maxWidth: 880,
  margin: '0 auto',
  padding: '0 32px',
};

// ─────────────────────────────────────────────────────────────
//  components
// ─────────────────────────────────────────────────────────────

function ProjectRow({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  return (
    <motion.div
      ref={ref}
      className="s-project-row"
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 800 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        sry.set(((e.clientX - r.left) / r.width - 0.5) * 4);
        srx.set(-((e.clientY - r.top) / r.height - 0.5) * 4);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
    >
      {/* name */}
      <div style={{
        fontFamily: 'var(--font-dm-serif), Georgia, serif',
        fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
        letterSpacing: '-0.01em',
        color: p.color,
        paddingRight: 8,
      }}>
        {p.name}
      </div>
      {/* desc */}
      <div className="s-project-desc" style={{
        fontFamily: 'var(--font-dm-sans), sans-serif',
        fontSize: 13,
        color: C.subtle,
        lineHeight: 1.5,
      }}>
        {p.desc}
      </div>
      {/* tag */}
      <div className="s-project-tag" style={{
        fontFamily: 'var(--font-jetbrains-mono), monospace',
        fontSize: 10,
        color: C.subtle,
        letterSpacing: '0.06em',
        opacity: 0.6,
      }}>
        {p.tag}
      </div>
      {/* time */}
      <div style={{
        fontFamily: 'var(--font-jetbrains-mono), monospace',
        fontSize: 9,
        color: C.subtle,
        letterSpacing: '0.08em',
        opacity: 0.4,
        textAlign: 'right',
      }}>
        {p.time}
      </div>
      {p.links && (
        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 14, marginTop: 4, fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
          {p.links.live && <a href={p.links.live} target="_blank" rel="noopener" style={{ color: p.color, textDecoration: 'none', borderBottom: `1px solid ${p.color}55`, paddingBottom: 1 }}>live ↗</a>}
          {p.links.repo && <a href={p.links.repo} target="_blank" rel="noopener" style={{ color: C.subtle, opacity: 0.55, textDecoration: 'none', borderBottom: `1px solid ${C.rule}`, paddingBottom: 1 }}>code ↗</a>}
        </div>
      )}
    </motion.div>
  );
}

function GridAnnotation({ x, y, text, angle = 0 }: { x: string; y: string; text: string; angle?: number }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 8, letterSpacing: '0.14em', color: C.rule, textTransform: 'uppercase', transform: `rotate(${angle}deg)`, pointerEvents: 'none', userSelect: 'none' }}>
      {text}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  page
// ─────────────────────────────────────────────────────────────
export default function SonnetPage() {
  const eggMsg = useEggs();
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // tab title trick
  useEffect(() => {
    const orig = document.title;
    const onVis = () => { document.title = document.hidden ? 'come back to paris' : orig; };
    document.addEventListener('visibilitychange', onVis);
    return () => { document.removeEventListener('visibilitychange', onVis); document.title = orig; };
  }, []);

  const containerStyle: React.CSSProperties = {
    background: C.bg,
    color: C.fg,
    fontFamily: 'var(--font-dm-sans), sans-serif',
    minHeight: '100vh',
    overflowX: 'hidden',
  };

  return (
    <div style={containerStyle}>
      <GlobalStyles />
      <ScrollProgress />

      {/* ── top nav bar ── */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: '18px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: `${C.bg}e0`,
          backdropFilter: 'blur(8px)',
          borderBottom: `1px solid ${C.rule}`,
        }}
      >
        <span style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: 10,
          letterSpacing: '0.18em',
          color: C.subtle,
          textTransform: 'uppercase',
        }}>
          {OSCAR.name.toLowerCase()} / <Uptime />
        </span>
        <nav style={{ display: 'flex', gap: 24 }}>
          {[
            ['work', '#work'],
            ['projects', '#projects'],
            ['contact', '#contact'],
          ].map(([label, href]) => (
            <a key={label} href={href} className="s-nav-link">{label}</a>
          ))}
        </nav>
      </motion.header>

      {/* ── hero ── */}
      <section style={{ ...section, paddingTop: 'clamp(120px, 18vh, 180px)', paddingBottom: 'clamp(64px, 10vh, 120px)' }}>
        <div style={{ position: 'relative' }}>
          <GridAnnotation x="0" y="-20px" text="48.8566° N, 2.3522° E" />

          {/* issue / date line */}
          <Reveal>
            <div style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 9,
              letterSpacing: '0.22em',
              color: C.subtle,
              textTransform: 'uppercase',
              marginBottom: 32,
              display: 'flex',
              gap: 24,
              alignItems: 'center',
            }}>
              <span>portfolio</span>
              <span style={{ color: C.rule }}>—</span>
              <span>paris 2026</span>
              <span style={{ color: C.rule }}>—</span>
              <span>no. 1</span>
            </div>
          </Reveal>

          <Rule />

          {/* big name */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-dm-serif), Georgia, serif',
              fontSize: 'clamp(3.2rem, 10vw, 7.5rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              fontWeight: 400,
              margin: '40px 0 36px',
              color: C.fg,
            }}
          >
            oscar
            <br />
            <span style={{ color: C.accent }}>morke</span>
          </motion.h1>

          <Rule />

          {/* subtitle row */}
          <Reveal delay={0.5}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: 16,
              paddingTop: 20,
              paddingBottom: 20,
            }}>
              <p style={{
                fontFamily: 'var(--font-dm-sans), sans-serif',
                fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                fontWeight: 300,
                color: C.subtle,
                letterSpacing: '0.01em',
                lineHeight: 1.6,
                maxWidth: 480,
              }}>
                {OSCAR.title}. {OSCAR.location}.
                <br />
                i make things on nights and weekends. some of them win prizes.
              </p>
              <div style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 10,
                color: C.subtle,
                opacity: 0.6,
                textAlign: 'right',
                lineHeight: 2,
              }}>
                <div>{STATS.hackathonWins} hackathon wins</div>
                <div>{STATS.prizes} in prizes</div>
                <div>{STATS.terminals} terminals, 3am</div>
              </div>
            </div>
          </Reveal>

          <Rule />
        </div>
      </section>

      {/* ── table of contents ── */}
      <section style={{ ...section, padding: 'clamp(32px,5vh,56px) 32px' }}>
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 4fr', gap: '0 40px', alignItems: 'start' }}>
            <div style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 8,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: C.subtle,
              opacity: 0.5,
              paddingTop: 6,
            }}>
              contents
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 0 }}>
              {TOC.map((item) => (
                <a key={item.href} href={item.href} className="s-toc-link">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <div style={section}><RuleLight /></div>

      {/* ── intro quote ── */}
      <section id="intro" style={{ ...section, padding: 'clamp(64px,10vh,110px) 32px' }}>
        <FadeIn delay={0.1}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 4fr', gap: '0 40px', alignItems: 'start' }}>
            <div style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 8,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: C.subtle,
              opacity: 0.5,
              paddingTop: 6,
            }}>
              §1
              <br />
              intro
            </div>
            <div>
              <blockquote style={{
                fontFamily: 'var(--font-dm-serif), Georgia, serif',
                fontSize: 'clamp(1.35rem, 3.5vw, 2.1rem)',
                lineHeight: 1.45,
                fontWeight: 400,
                letterSpacing: '-0.01em',
                fontStyle: 'normal',
                borderLeft: `2px solid ${C.accent}`,
                paddingLeft: 28,
                marginBottom: 32,
              }}>
                {OSCAR.philosophy}
                <br />
                <span style={{ fontSize: '0.6em', color: C.subtle, fontFamily: 'var(--font-jetbrains-mono), monospace', letterSpacing: '0.08em' }}>— that&apos;s the brief.</span>
              </blockquote>

              {/* pull quote strip */}
              <div style={{
                borderTop: `1px solid ${C.rule}`,
                borderBottom: `1px solid ${C.rule}`,
                padding: '20px 0',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0 32px',
              }}>
                <div style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: 9,
                  color: C.subtle,
                  opacity: 0.5,
                  letterSpacing: '0.1em',
                  lineHeight: 1.8,
                }}>
                  {OSCAR.origin}
                </div>
                <div style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: 9,
                  color: C.subtle,
                  opacity: 0.5,
                  letterSpacing: '0.1em',
                  lineHeight: 1.8,
                }}>
                  {OSCAR.coding}
                </div>
              </div>

              {/* mantra */}
              <div style={{
                marginTop: 28,
                fontFamily: 'var(--font-dm-serif), Georgia, serif',
                fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
                color: C.accent,
                letterSpacing: '0.04em',
                fontStyle: 'italic',
              }}>
                &ldquo;{OSCAR.mantra}&rdquo;
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <div style={section}><RuleLight /></div>

      {/* ── numbers ── */}
      <section id="numbers" style={{ ...section, padding: 'clamp(48px,8vh,90px) 32px' }}>
        <Reveal>
          <div style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 8,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: C.subtle,
            marginBottom: 32,
          }}>
            §2 &nbsp;&nbsp; key metrics
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1px', background: C.rule, border: `1px solid ${C.rule}` }}>
          {[
            { n: STATS.hackathonWins, pre: '',   suf: '',  label: 'hackathon wins'   },
            { n: 176,                 pre: '$', suf: 'k', label: 'in prizes'         },
            { n: Number(STATS.users.replace('K','')) || 40, pre: '', suf: 'k', label: 'users shipped to' },
            { n: 51,                  pre: '$', suf: 'm', label: 'losses prevented'  },
          ].map((m, i) => (
            <Reveal key={m.label} delay={i * 0.1}>
              <div style={{ background: C.bg, padding: '28px 24px' }}>
                <div style={{
                  fontFamily: 'var(--font-dm-serif), Georgia, serif',
                  fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                  lineHeight: 1,
                  color: ACCENT_COLORS[i],
                  letterSpacing: '-0.02em',
                }}>
                  <Counter to={m.n} prefix={m.pre} suffix={m.suf} />
                </div>
                <div style={{
                  fontFamily: 'var(--font-jetbrains-mono), monospace',
                  fontSize: 9,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: C.subtle,
                  marginTop: 10,
                }}>
                  {m.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div style={section}><RuleLight /></div>

      {/* ── figure: the record over time ── */}
      <section style={{ ...section, padding: 'clamp(32px,5vh,64px) 32px' }}>
        <Reveal>
          <div style={{ borderTop: `1px solid ${C.rule}`, borderBottom: `1px solid ${C.rule}`, padding: '8px 0', marginBottom: 24, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.subtle }}>
            <span>fig. 1 — the record, 2018–2026</span>
            <span>prize $ / event</span>
          </div>
        </Reveal>
        <Reveal>
          <div style={{ overflowX: 'auto' }}>
            <svg viewBox="0 0 640 172" style={{ width: '100%', minWidth: 520, display: 'block' }}>
              {(() => {
                const pts = RECORD_POINTS;
                const maxUsd = Math.max(...pts.map((p) => p.usd));
                const W = 640, H = 140, padX = 8;
                const bw = (W - padX * 2) / pts.length;
                return (
                  <>
                    <line x1={padX} y1={H} x2={W - padX} y2={H} stroke={C.subtle} strokeWidth="0.75" opacity={0.5} />
                    {pts.map((p, i) => {
                      const bh = p.usd ? (p.usd / maxUsd) * (H - 20) : 0;
                      const x = padX + i * bw + bw * 0.34;
                      const w = bw * 0.32;
                      const cx = x + w / 2;
                      return (
                        <g key={p.date}>
                          {p.usd > 0 ? (
                            <motion.rect
                              x={x} width={w} fill={C.accent}
                              initial={{ height: 0, y: H }} whileInView={{ height: bh, y: H - bh }} viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                            />
                          ) : (
                            <line x1={cx} y1={H - 5} x2={cx} y2={H} stroke={C.subtle} strokeWidth="0.75" />
                          )}
                          <text x={cx} y={H + 13} fontSize="7.5" fill={C.subtle} textAnchor="middle" fontFamily="var(--font-jetbrains-mono), monospace" opacity={0.7}>
                            &apos;{p.year.slice(2)}
                          </text>
                        </g>
                      );
                    })}
                  </>
                );
              })()}
            </svg>
          </div>
        </Reveal>
        <Reveal>
          <p style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 12.5, color: C.subtle, opacity: 0.65, marginTop: 16, maxWidth: 540, lineHeight: 1.65 }}>
            the purse peaked at eth bogotá, 2022. the short ticks are events with no prize — the first hackathon, the judging year, and 2026, when the work turned from winning to shipping.
          </p>
        </Reveal>
      </section>

      <div style={section}><RuleLight /></div>

      {/* ── work at ledger ── */}
      <section id="work" style={{ ...section, padding: 'clamp(48px,8vh,90px) 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '0 48px' }}>
          <Reveal>
            <SectionLabel num="§3" label={`ledger\nparis\n2023—`} />
          </Reveal>
          <div>
            <Reveal>
              <h2 style={{
                fontFamily: 'var(--font-dm-serif), Georgia, serif',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.3,
                marginBottom: 24,
              }}>
                days building the security layer
                <br />
                for 6m hardware wallets.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="s-stat-grid" style={{ marginBottom: 28 }}>
                {LEDGER_WORK.map((w) => (
                  <div key={w.kpi} className="s-stat-cell">
                    <div style={{
                      fontFamily: 'var(--font-dm-serif), Georgia, serif',
                      fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                      color: C.accent,
                      letterSpacing: '-0.02em',
                    }}>{w.kpi}</div>
                    <div style={{
                      fontFamily: 'var(--font-dm-sans), sans-serif',
                      fontSize: 13,
                      color: C.fg,
                      marginTop: 6,
                    }}>{w.label}</div>
                    <div style={{
                      fontFamily: 'var(--font-jetbrains-mono), monospace',
                      fontSize: 9,
                      color: C.subtle,
                      marginTop: 4,
                      letterSpacing: '0.06em',
                    }}>{w.sub}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* ledger project details */}
            <Reveal delay={0.2}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                {['Ledger'].map((projName) => {
                  const proj = RAW_PROJECTS.find(p => p.name === projName);
                  if (!proj) return null;
                  return (
                    <div key={proj.slug} style={{
                      borderLeft: `1px solid ${C.rule}`,
                      paddingLeft: 16,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
                        <div style={{
                          fontFamily: 'var(--font-dm-serif), Georgia, serif',
                          fontSize: '0.95rem',
                          color: C.fg,
                          marginBottom: 4,
                        }}>
                          {proj.name}
                        </div>
                        <div style={{
                          fontFamily: 'var(--font-jetbrains-mono), monospace',
                          fontSize: 9,
                          color: C.subtle,
                          opacity: 0.5,
                          letterSpacing: '0.08em',
                          whiteSpace: 'nowrap',
                        }}>
                          {proj.result}
                        </div>
                      </div>
                      <p style={{ fontSize: 12, color: C.subtle, lineHeight: 1.6, maxWidth: 440 }}>
                        {proj.oneLiner}
                      </p>
                      {proj.details && (
                        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                          {proj.details.map((d, di) => (
                            <div key={di} style={{
                              fontFamily: 'var(--font-jetbrains-mono), monospace',
                              fontSize: 9,
                              color: C.subtle,
                              opacity: 0.4,
                              letterSpacing: '0.06em',
                            }}>
                              — {d}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <p style={{ fontSize: 14, color: C.subtle, lineHeight: 1.7, maxWidth: 480 }}>
                before paris there was stockholm. before ledger there was anotherblock — a music startup
                where fans invested in the songs they loved. zero to {STATS.users} users. distribution killed it.
                kept the lesson, kept the records.
                <span className="s-footnote-num">1</span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div style={section}><RuleLight /></div>

      {/* ── projects ── */}
      <section id="projects" style={{ ...section, padding: 'clamp(48px,8vh,90px) 32px' }}>
        <Reveal>
          <div style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 8,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: C.subtle,
            marginBottom: 20,
          }}>
            §4 &nbsp;&nbsp; projects
          </div>
        </Reveal>
        <Reveal>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '3fr 5fr 2fr 1.5fr',
            gap: '0 24px',
            marginBottom: 2,
          }}>
            <ColLabel>project</ColLabel>
            <ColLabel>about</ColLabel>
            <ColLabel>result</ColLabel>
            <ColLabel>built in</ColLabel>
          </div>
        </Reveal>
        {PROJECTS.map((p, i) => {
          const tr = (i === 0 || PROJECTS[i - 1].track !== p.track) ? TRACKS.find(t => t.id === p.track) : null;
          return (
          <Fragment key={p.name}>
            {tr && (
              <div style={{
                marginTop: 32, marginBottom: 10, paddingTop: 14,
                borderTop: `1px solid ${C.rule}`,
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.subtle,
              }}>
                {tr.label} &nbsp;·&nbsp; {tr.blurb}
              </div>
            )}
            <div
              onMouseEnter={() => setHoveredProject(i)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <ProjectRow p={p} i={i} />
            </div>
          </Fragment>
          );
        })}
        <Reveal delay={0.3}>
          <div style={{
            paddingTop: 18,
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 9,
            color: C.subtle,
            opacity: 0.45,
            letterSpacing: '0.1em',
          }}>
            <span className="s-footnote-num" style={{ fontSize: 8, verticalAlign: 'super', marginRight: 4 }}>1</span>
            all built on nights and weekends. the day job is at ledger.
          </div>
        </Reveal>

        {/* project color accent line - thin bar showing hovered project color */}
        <motion.div
          style={{
            height: 2,
            background: hoveredProject !== null ? PROJECTS[hoveredProject].color : 'transparent',
            marginTop: 8,
            borderRadius: 1,
            transition: 'background 0.3s',
          }}
        />
      </section>

      <div style={section}><RuleLight /></div>

      {/* ── the stack (feature) ── */}
      <section id="stack" style={{ ...section, padding: 'clamp(48px,8vh,90px) 32px' }}>
        <Reveal>
          <div style={{
            borderTop: `2px solid ${C.fg}`,
            borderBottom: `1px solid ${C.rule}`,
            paddingTop: 18, paddingBottom: 6, marginBottom: 28,
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12,
          }}>
            <span style={{ fontFamily: 'var(--font-dm-serif), Georgia, serif', fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', color: C.fg }}>
              {STACK_INTRO.title}
            </span>
            <span style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.subtle }}>
              feature — {STACK_INTRO.kicker}
            </span>
          </div>
        </Reveal>
        <Reveal>
          <p style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 14, color: C.subtle, lineHeight: 1.7, maxWidth: 520, marginBottom: 34 }}>
            {STACK_INTRO.line}
          </p>
        </Reveal>
        {AGENTIC_STACK.map((s, i) => (
          <Reveal key={s.key} delay={i * 0.06}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '0.5fr 3fr 5fr 1.5fr',
              gap: '0 24px',
              alignItems: 'baseline',
              padding: '16px 0',
              borderTop: `1px solid ${C.rule}`,
            }}>
              <div style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 10, color: C.subtle, opacity: 0.5 }}>
                {pad(i + 1)}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-dm-serif), Georgia, serif', fontSize: 'clamp(1rem, 2.2vw, 1.3rem)', color: C.accent, letterSpacing: '-0.01em' }}>
                  {s.layer}
                </div>
                <div style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 9, color: C.subtle, opacity: 0.55, letterSpacing: '0.08em', marginTop: 4 }}>
                  {s.sub}
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 13, color: C.subtle, lineHeight: 1.55 }}>
                {s.line}
              </div>
              <div style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 11, color: C.fg, letterSpacing: '0.1em', textAlign: 'right', textTransform: 'uppercase' }}>
                {s.verb}
              </div>
            </div>
          </Reveal>
        ))}
        <div style={{ borderTop: `1px solid ${C.rule}` }} />
      </section>

      {/* ── journey / timeline ── */}
      <section id="journey" style={{ ...section, padding: 'clamp(48px,8vh,90px) 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '0 48px', alignItems: 'start' }}>
          <Reveal>
            <SectionLabel num="§5" label="journey" />
          </Reveal>
          <div>
            <Reveal>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '80px 80px 1fr 2fr',
                gap: '0 20px',
                paddingBottom: 10,
              }}>
                <ColLabel>year</ColLabel>
                <ColLabel>place</ColLabel>
                <ColLabel>chapter</ColLabel>
                <ColLabel>what happened</ColLabel>
              </div>
            </Reveal>
            {JOURNEY.map((j, i) => (
              <FadeIn key={j.year} delay={i * 0.1}>
                <div className="s-journey-row">
                  <div style={{
                    fontFamily: 'var(--font-jetbrains-mono), monospace',
                    fontSize: 9,
                    color: C.subtle,
                    opacity: 0.5,
                    letterSpacing: '0.08em',
                  }}>
                    {j.year}
                  </div>
                  <div className="s-journey-place" style={{
                    fontFamily: 'var(--font-jetbrains-mono), monospace',
                    fontSize: 9,
                    color: C.subtle,
                    opacity: 0.4,
                    letterSpacing: '0.08em',
                  }}>
                    {j.place}
                  </div>
                  <div className="s-journey-chapter" style={{
                    fontFamily: 'var(--font-jetbrains-mono), monospace',
                    fontSize: 9,
                    color: ACCENT_COLORS[i % ACCENT_COLORS.length],
                    opacity: 0.7,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    {j.chapter}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: 13,
                    color: C.subtle,
                    lineHeight: 1.5,
                  }}>
                    {j.summary}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div style={section}><RuleLight /></div>

      {/* ── terminal block ── */}
      <section style={{ ...section, padding: 'clamp(48px,8vh,90px) 32px' }}>
        <Reveal>
          <div style={{
            background: '#0a0a0a',
            border: `1px solid ${C.rule}`,
            borderRadius: 3,
            padding: '28px 28px 32px',
            maxWidth: 540,
          }}>
            <div style={{
              display: 'flex',
              gap: 6,
              marginBottom: 20,
              alignItems: 'center',
            }}>
              {[C.red, C.gold, C.green].map((c, i) => (
                <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.7 }} />
              ))}
              <span style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 9,
                color: C.subtle,
                marginLeft: 8,
                opacity: 0.5,
                letterSpacing: '0.1em',
              }}>
                morkeeth@paris
              </span>
            </div>
            <div style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 12,
              lineHeight: 1.9,
              color: C.fg,
            }}>
              <div style={{ color: C.subtle, marginBottom: 4 }}>
                <Typed text="$ tell me about yourself" delay={0.4} />
              </div>
              <div style={{ paddingLeft: 0 }}>
                <Typed text="i could always code. i was just the pitch guy." delay={1.4} speed={22} />
              </div>
              <div>
                <Typed text="ai closed the gap." delay={3.6} speed={22} />
              </div>
              <div>
                <Typed text="now both things happen." delay={5.0} speed={22} keepCursor />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <div style={section}><RuleLight /></div>

      {/* ── notes ── */}
      <section id="notes" style={{ ...section, padding: 'clamp(48px,8vh,90px) 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '0 48px' }}>
          <Reveal>
            <SectionLabel num="§6" label="notes" />
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {THOUGHTS.map((thought, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: '0 16px', alignItems: 'start' }}>
                  <div style={{
                    fontFamily: 'var(--font-jetbrains-mono), monospace',
                    fontSize: 8,
                    color: C.subtle,
                    opacity: 0.3,
                    paddingTop: 4,
                    letterSpacing: '0.06em',
                  }}>
                    {pad(i + 1)}
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-dm-serif), Georgia, serif',
                    fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                    lineHeight: 1.6,
                    color: C.subtle,
                    fontStyle: 'italic',
                    paddingLeft: 16,
                    borderLeft: `1px solid ${C.rule}`,
                  }}>
                    {thought}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── footnotes ── */}
      <section style={{ ...section, padding: '0 32px clamp(32px,5vh,56px)' }}>
        <RuleLight />
        <div style={{
          paddingTop: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}>
          {[
            `1. anotherblock raised from j12, swedish house mafia, inventure, stride. ${STATS.users} users. distribution won.`,
          ].map((fn, i) => (
            <div key={i} style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 9,
              color: C.subtle,
              opacity: 0.35,
              letterSpacing: '0.08em',
              lineHeight: 1.7,
            }}>
              {fn}
            </div>
          ))}
        </div>
      </section>

      <div style={section}><Rule /></div>

      {/* ── footer / contact ── */}
      <section id="contact" style={{ ...section, padding: 'clamp(64px,10vh,110px) 32px clamp(80px,12vh,140px)' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 40,
        }}>
          <Reveal>
            <div>
              <div style={{
                fontFamily: 'var(--font-dm-serif), Georgia, serif',
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                letterSpacing: '-0.03em',
                lineHeight: 0.95,
                marginBottom: 24,
                color: C.fg,
              }}>
                let&apos;s talk.
              </div>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {[
                  ['email',    LINKS.email,    true  ],
                  ['github',   LINKS.github,   false ],
                  ['x',        LINKS.x,        false ],
                  ['linkedin', LINKS.linkedin, false ],
                ].map(([label, href, isEmail]) => (
                  <motion.a
                    key={label as string}
                    href={href as string}
                    target={isEmail ? undefined : '_blank'}
                    rel="noopener"
                    className="s-footnote-link"
                    style={{
                      fontFamily: 'var(--font-jetbrains-mono), monospace',
                      fontSize: 10,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                    }}
                    whileHover={{ y: -3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                  >
                    {label as string}
                  </motion.a>
                ))}
              </div>
            </div>
          </Reveal>
          <FadeIn delay={0.2}>
            <div style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 9,
              color: C.subtle,
              opacity: 0.35,
              lineHeight: 2,
              letterSpacing: '0.1em',
              textAlign: 'right',
            }}>
              paris 2026
              <br />
              open to interesting problems
              <br />
              hej då
            </div>
          </FadeIn>
        </div>
      </section>

      {/* easter egg toast */}
      <AnimatePresence>
        {eggMsg && (
          <motion.div
            className="s-egg-toast"
            initial={{ opacity: 0, y: 12, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 12, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            {eggMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
