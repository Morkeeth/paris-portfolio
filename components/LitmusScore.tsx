'use client';

/*
 * LitmusScore — the scan. Oscar: "Litmus scoring we need a small place holder for."
 *
 * SMALL AND HONEST. The real Litmus screen is 8,432 scouted contacts in a grid; it greys
 * the field, then two rows light green as the model finds them. That gesture is the whole
 * product: a firehose, de-noised, and the two that matter.
 *
 * This is a PLACEHOLDER and it says so on the face. It does not render 8,432 fake names,
 * because a wall of invented people is the fabricated-prop tell and Litmus's own pitch is
 * "verify and de-noise". The count is the real one; the grid is abstract cells, not
 * fictional humans. When Litmus lands, this graduates to the real screen.
 */

import { useEffect, useState } from 'react';
import type { Tone } from './ProjectIndex';

const MONO = 'var(--font-jetbrains-mono), ui-monospace, monospace';

export default function LitmusScore({
  scouted, hits, tone, cells = 96,
}: {
  scouted: string;   // the real number, as a string, from the record
  hits: number;      // how many light up
  tone: Tone;
  cells?: number;
}) {
  const [scanning, setScanning] = useState(false);
  const [found, setFound] = useState<number[]>([]);
  const mono = tone.mono ?? MONO;

  // Deterministic positions. Math.random would put the hits somewhere new on every render,
  // which is the definition of a number that means nothing.
  const marks = Array.from({ length: hits }, (_, i) => Math.floor((cells / (hits + 1)) * (i + 1)) + i * 7);

  useEffect(() => {
    if (!scanning) return;
    setFound([]);
    const timers = marks.map((m, i) => setTimeout(() => setFound((f) => [...f, m]), 420 + i * 520));
    const done = setTimeout(() => setScanning(false), 420 + marks.length * 520 + 700);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanning]);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.04em', fontFamily: mono }}>{scouted}</span>
        <span style={{ fontFamily: mono, fontSize: 11, color: tone.dim }}>scouted</span>
        <button
          onClick={() => setScanning(true)}
          disabled={scanning}
          style={{
            marginLeft: 'auto', fontFamily: mono, fontSize: 10, letterSpacing: '0.08em',
            padding: '6px 12px', cursor: scanning ? 'default' : 'pointer',
            border: `1px solid ${tone.rule}`,
            background: scanning ? 'transparent' : tone.fg,
            color: scanning ? tone.dim : tone.bg,
          }}
        >
          {scanning ? 'SCORING…' : 'RUN THE SCAN →'}
        </button>
      </div>

      <div className="ls-grid" style={{ marginTop: 14 }}>
        {Array.from({ length: cells }, (_, i) => {
          const hit = found.includes(i);
          return (
            <span
              key={i}
              style={{
                height: 20,
                border: `1px solid ${hit ? '#2f8f4e' : tone.rule}`,
                background: hit ? 'color-mix(in srgb, #2f8f4e 16%, transparent)' : 'transparent',
                opacity: scanning && !hit ? 0.3 : 1,
                transition: 'opacity 280ms, background 280ms, border-color 280ms',
              }}
            />
          );
        })}
      </div>

      <p style={{ fontFamily: mono, fontSize: 10, color: tone.dim, marginTop: 12, lineHeight: 1.6 }}>
        placeholder. the real screen scores {scouted} against what you sell and surfaces the {hits}
        {' '}worth a reply. abstract cells on purpose: a grid of invented names would be the
        opposite of the point.
      </p>

      <style>{`
        .ls-grid { display: grid; grid-template-columns: repeat(16, 1fr); gap: 3px; min-width: 0; }
        @media (max-width: 620px) { .ls-grid { grid-template-columns: repeat(10, 1fr); } }
      `}</style>
    </div>
  );
}
