'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { MODEL_META as MODELS } from '../shared/data';

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
        style={{ textAlign: 'center', marginBottom: 64, maxWidth: 560 }}
      >
        <h1 style={{
          fontFamily: 'var(--font-dm-serif)',
          fontSize: 'clamp(1.8rem, 5vw, 3rem)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
          marginBottom: 20,
        }}>
          same brief, four models
        </h1>
        <p style={{
          fontSize: 15,
          color: 'var(--fg-dim)',
          lineHeight: 1.7,
          fontWeight: 300,
        }}>
          i gave each claude model the same creative brief: build my portfolio.
          same data, same constraints, same person. four completely different interpretations.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 20,
        maxWidth: 1100,
        width: '100%',
      }}>
        {MODELS.map((model, i) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
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
                  border: `1px solid ${hoveredId === model.id ? model.color + '60' : 'var(--fg-faint)'}`,
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(.22,1,.36,1)',
                  background: hoveredId === model.id ? model.color + '08' : 'transparent',
                  transform: hoveredId === model.id ? 'translateY(-4px)' : 'none',
                  boxShadow: hoveredId === model.id ? `0 12px 40px ${model.color}15` : 'none',
                  minHeight: 220,
                  display: 'flex',
                  flexDirection: 'column',
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
                  color: hoveredId === model.id ? model.color : 'inherit',
                  transition: 'color 0.3s',
                }}>
                  {model.name}
                </h2>

                <p style={{
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: 'var(--fg-dim)',
                  fontWeight: 300,
                  flex: 1,
                }}>
                  {model.desc}
                </p>

                <div style={{
                  fontFamily: 'var(--font-jetbrains-mono)',
                  fontSize: 11,
                  opacity: hoveredId === model.id ? 0.8 : 0.3,
                  letterSpacing: '0.08em',
                  marginTop: 16,
                  transition: 'opacity 0.3s',
                }}>
                  open &rarr;
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ marginTop: 64, textAlign: 'center' }}
      >
        <p style={{
          fontFamily: 'var(--font-jetbrains-mono)',
          fontSize: 11,
          color: 'var(--fg-dim)',
          opacity: 0.4,
          letterSpacing: '0.08em',
          lineHeight: 1.8,
        }}>
          all four started from the same 30-line brief, one model each.
          <br />
          fable and opus have since been worked on like any living site. sonnet and haiku stand as generated.
        </p>
      </motion.div>

      <div style={{
        fontFamily: 'var(--font-jetbrains-mono)',
        fontSize: 10,
        opacity: 0.15,
        marginTop: 48,
        letterSpacing: '0.1em',
      }}>
        oscar morke, paris 2026
      </div>
    </div>
  );
}
