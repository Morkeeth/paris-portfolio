'use client';

/*
 * StackedDeck — records receding into perspective. Oscar's call, Jul 17: the NEWYORKOVER
 * stacked view "can be this anotherblock component".
 *
 * It is the right mapping and that is why it works. NEWYORKOVER stacks a century of New
 * Yorker COVERS; Anotherblock sold shares in RECORDS. Same gesture, and here the stack is
 * the argument: five drops, receding, the catalogue as a physical object you can riffle.
 *
 * NO FAKE ARTWORK. Real album art is neither ours nor in this repo, and inventing sleeves
 * for Rihanna and Michael Jackson would be exactly the fabricated-prop tell. So the sleeves
 * are typographic: the artist, the position in the stack, nothing pretending to be a scan.
 * Every name comes from Oscar's own line ("drops: ..."), never from my memory of his career.
 *
 * The count is never typed. It is drops.length, like every other count on this site.
 */

import { useState } from 'react';
import type { Tone } from './ProjectIndex';

const MONO = 'var(--font-jetbrains-mono), ui-monospace, monospace';

export default function StackedDeck({
  drops, tone, caption,
}: { drops: string[]; tone: Tone; caption?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const [flat, setFlat] = useState(false);
  const mono = tone.mono ?? MONO;
  if (!drops.length) return null;

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[['stacked', false], ['flat', true]].map(([label, v]) => (
          <button
            key={String(label)}
            onClick={() => setFlat(v as boolean)}
            aria-pressed={flat === v}
            style={{
              fontFamily: mono, fontSize: 10, letterSpacing: '0.08em', padding: '5px 11px',
              cursor: 'pointer', border: `1px solid ${tone.rule}`,
              background: flat === v ? tone.fg : 'transparent',
              color: flat === v ? tone.bg : tone.dim,
            }}
          >
            {String(label).toUpperCase()}
          </button>
        ))}
      </div>

      <div
        className="sd-stage"
        style={{
          // The perspective IS the component. Flat is the honest fallback for anyone who
          // cannot deal with a 3D transform, and it is a real view, not a degraded one.
          perspective: flat ? 'none' : '1100px',
          height: flat ? 'auto' : 250,
        }}
        onMouseLeave={() => setActive(null)}
      >
        {drops.map((d, i) => {
          const isOn = active === i;
          // A CRATE, not a fan of cards. First pass overlapped the sleeves at 58px and
          // clipped every name to "ackson" / "d" / "tro": only the front record was
          // legible, which defeats the point of showing the catalogue. Records in a crate
          // are read by their SPINE, so the name runs vertically down the visible strip and
          // the hovered one pulls forward to show its face. The metaphor fixed the bug.
          return (
            <button
              key={d}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="sd-card"
              aria-label={d}
              style={{
                // Records are DARK. White sleeves on white paper had no presence at all:
                // the first pass read as a stack of blank index cards and only the front
                // spine was legible. Inverting the sleeve against the ground is what a real
                // crate looks like, and it is the only thing that gives an artless sleeve
                // any weight. The ink deepens as the record sits further back.
                background: `color-mix(in srgb, ${tone.fg} ${92 - i * 9}%, ${tone.bg})`,
                border: `1px solid ${isOn ? tone.accent : tone.fg}`,
                color: tone.bg,
                cursor: 'pointer',
                textAlign: 'left',
                ...(flat
                  ? {}
                  : {
                      position: 'absolute',
                      left: `${i * 52}px`,
                      transform: `rotateY(-32deg) translateZ(${isOn ? 46 : 0}px)`,
                      zIndex: isOn ? drops.length + 1 : drops.length - i,
                      transition: 'transform 240ms ease-out, border-color 160ms',
                      boxShadow: `8px 0 22px color-mix(in srgb, ${tone.fg} ${isOn ? 16 : 8}%, transparent)`,
                    }),
              }}
            >
              {/* the spine: always visible, never covered by the next record */}
              <span className="sd-spine" style={{ fontFamily: mono, fontSize: 10, color: tone.bg, opacity: isOn ? 1 : 0.78, letterSpacing: '0.04em' }}>
                {d}
              </span>
              {/* the face: only the pulled record shows it */}
              <span className="sd-face" style={{ opacity: isOn || flat ? 1 : 0, transition: 'opacity 200ms' }}>
                <span style={{ fontFamily: mono, fontSize: 9, color: tone.bg, opacity: 0.6, letterSpacing: '0.1em' }}>
                  {String(i + 1).padStart(2, '0')} / {drops.length}
                </span>
                <span style={{ display: 'block', marginTop: 'auto', fontSize: 15, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                  {d}
                </span>
                <span style={{ fontFamily: mono, fontSize: 9, color: tone.bg, opacity: 0.6, marginTop: 4, display: 'block' }}>
                  fan-owned
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {caption && (
        <p style={{ fontFamily: mono, fontSize: 10, color: tone.dim, marginTop: 16, letterSpacing: '0.05em' }}>
          {caption}
        </p>
      )}

      <style>{`
        .sd-stage { position: relative; transform-style: preserve-3d; min-width: 0; }
        .sd-card { width: 176px; height: 176px; padding: 12px; display: block; }
        /* The spine sits on the RIGHT edge, because that is the only strip that stays
           visible. Card 0 is on top (z = length - i), so each record behind it is covered
           from its left edge to +124px and only its rightmost ~52px shows. The first pass
           put the spine on the left, which is precisely the part that gets buried: four of
           five names were invisible and the stack read as blank slabs. */
        .sd-spine {
          position: absolute; right: 13px; top: 12px; transform-origin: right top;
          transform: rotate(90deg) translate(100%, 0); white-space: nowrap;
          max-width: 150px; overflow: hidden; text-overflow: ellipsis;
        }
        .sd-face { position: absolute; inset: 12px; display: flex; flex-direction: column; }
        /* Flat is a grid, not a broken stack. */
        /* Flat is a real view: faces up, spines off. */
        .sd-stage:not([style*="1100px"]) {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px;
        }
        .sd-stage:not([style*="1100px"]) .sd-card { width: auto; height: 150px; position: relative; }
        .sd-stage:not([style*="1100px"]) .sd-spine { display: none; }
        @media (max-width: 620px) {
          /* A 3D stack on a 390px phone is a pile of clipped edges. Oscar reviews on a
             phone, so narrow viewports get the grid and keep every name readable. */
          .sd-stage { perspective: none !important; height: auto !important;
                      display: grid; grid-template-columns: repeat(auto-fill, minmax(132px, 1fr)); gap: 9px; }
          .sd-card { position: relative !important; transform: none !important;
                     box-shadow: none !important; width: auto !important; height: 138px; }
          .sd-spine { display: none; }
          .sd-face { opacity: 1 !important; }
        }
      `}</style>
    </div>
  );
}
