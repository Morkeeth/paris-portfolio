'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { EVAL_MODELS, MODEL_CONTROL, EVAL_FRAME, numWord, type MODEL_META } from '../shared/data';

type Model = (typeof MODEL_META)[number];

// One row of the method block: a mono label, then the claim in plain prose.
// Deliberately dry — the frame earns nothing by being decorated.
function MethodRow({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div style={{ display: 'flex', gap: 18, alignItems: 'baseline', padding: '10px 0', borderTop: '1px solid var(--fg-faint)' }}>
      <span style={{
        fontFamily: 'var(--font-jetbrains-mono)', fontSize: 10, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: accent ?? 'var(--fg-dim)', opacity: accent ? 0.9 : 0.5,
        flex: '0 0 104px',
      }}>
        {label}
      </span>
      <span style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--fg-dim)', fontWeight: 300 }}>{value}</span>
    </div>
  );
}

// One card. Same furniture for an arm and for the control — the control is not a
// lesser card, it's a different condition, so it earns the same frame.
function ModelCard({ model, hoveredId, setHoveredId }: {
  model: Model; hoveredId: string | null; setHoveredId: (v: string | null) => void;
}) {
  const hot = hoveredId === model.id;
  return (
    <Link
      href={model.external ?? `/${model.id}`}
      target={model.external ? '_blank' : undefined}
      rel={model.external ? 'noopener' : undefined}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <motion.div
        onMouseEnter={() => setHoveredId(model.id)}
        onMouseLeave={() => setHoveredId(null)}
        style={{
          padding: 28,
          border: `1px solid ${hot ? model.color + '60' : 'var(--fg-faint)'}`,
          borderRadius: 12,
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(.22,1,.36,1)',
          background: hot ? model.color + '08' : 'transparent',
          transform: hot ? 'translateY(-4px)' : 'none',
          boxShadow: hot ? `0 12px 40px ${model.color}15` : 'none',
          minHeight: 220,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <span style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: model.color,
            opacity: 0.8,
            padding: '3px 8px',
            border: `1px solid ${model.color}40`,
            borderRadius: 100,
          }}>
            {model.badge}
          </span>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: model.color }} />
        </div>

        <h2 style={{
          fontFamily: 'var(--font-dm-serif)',
          fontSize: 22,
          fontWeight: 400,
          marginBottom: 12,
          color: hot ? model.color : 'inherit',
          transition: 'color 0.3s',
        }}>
          {model.name}
        </h2>

        <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--fg-dim)', fontWeight: 300, flex: 1 }}>
          {model.desc}
        </p>

        <div style={{
          fontFamily: 'var(--font-jetbrains-mono)',
          fontSize: 11,
          opacity: hot ? 0.8 : 0.3,
          letterSpacing: '0.08em',
          marginTop: 16,
          transition: 'opacity 0.3s',
        }}>
          open &rarr;
        </div>
      </motion.div>
    </Link>
  );
}

export default function Compare() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '64px 24px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', marginBottom: 44, maxWidth: 600 }}
      >
        <h1 style={{
          fontFamily: 'var(--font-dm-serif)',
          fontSize: 'clamp(1.8rem, 5vw, 3rem)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          marginBottom: 20,
        }}>
          {/* the word, not the numeral: this is display serif and Oscar's copy spells
              counts out. still derived, so a fifth model rewrites it. */}
          same brief, {numWord(EVAL_MODELS.length)} models
        </h1>
        <p style={{
          fontSize: 15,
          color: 'var(--fg-dim)',
          lineHeight: 1.7,
          fontWeight: 300,
        }}>
          i gave each claude model the same creative brief: build my portfolio.
          same data, same constraints, same person. the model is the only thing i changed.
        </p>
      </motion.div>

      {/* The method block. Without it a reader sees four skins and files this as a
          gimmick; with it, the page is the eval it actually is. */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', maxWidth: 620, marginBottom: 64 }}
      >
        <div style={{
          fontFamily: 'var(--font-jetbrains-mono)', fontSize: 10, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'var(--fg-dim)', opacity: 0.4, marginBottom: 10,
        }}>
          {EVAL_FRAME.kicker}
        </div>
        <MethodRow label={EVAL_FRAME.constant.label} value={EVAL_FRAME.constant.value} />
        <MethodRow label={EVAL_FRAME.variable.label} value={EVAL_FRAME.variable.value} accent="var(--fg)" />
        <MethodRow label={EVAL_FRAME.control.label} value={EVAL_FRAME.control.value} />
        <MethodRow label={EVAL_FRAME.confound.label} value={EVAL_FRAME.confound.value} />
      </motion.div>

      {/* The arms: one card per model, identical furniture. */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(240px, 1fr))`,
        gap: 20,
        maxWidth: 1100,
        width: '100%',
      }}>
        {EVAL_MODELS.map((model, i) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <ModelCard model={model} hoveredId={hoveredId} setHoveredId={setHoveredId} />
          </motion.div>
        ))}
      </div>

      {/* The control, below the arms and labelled as such. It used to sit in the same
          grid as a fifth card, which both contradicted the "four models" headline and
          orphaned it onto its own row. It isn't a fifth model — it's the baseline. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', maxWidth: 1100, marginTop: 40 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <span style={{
            fontFamily: 'var(--font-jetbrains-mono)', fontSize: 10, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--fg-dim)', opacity: 0.5, whiteSpace: 'nowrap',
          }}>
            {EVAL_FRAME.control.label}
          </span>
          <div style={{ height: 1, background: 'var(--fg-faint)', flex: 1 }} />
        </div>
        <div style={{ maxWidth: 340 }}>
          <ModelCard model={MODEL_CONTROL} hoveredId={hoveredId} setHoveredId={setHoveredId} />
        </div>
      </motion.div>

      {/* The brief / confound line that used to live down here is now the method block
          above — stating it once, at readable contrast, instead of twice at 0.4 opacity. */}
      <div style={{
        fontFamily: 'var(--font-jetbrains-mono)',
        fontSize: 10,
        opacity: 0.15,
        marginTop: 64,
        letterSpacing: '0.1em',
      }}>
        oscar morke, paris 2026
      </div>
    </div>
  );
}
