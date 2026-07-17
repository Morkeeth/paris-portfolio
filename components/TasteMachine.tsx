'use client';

/*
 * TasteMachine — the instrument panel. Oscar: "a taste machine component for sure!"
 *
 * THE MOCKUP'S STAGES ARE NOT THE MACHINE. The image Oscar shared reads
 * 01 OBSERVE / 02 FILTER / 03 REFINE / 04 EXPRESS. That is a generated design, not his
 * pipeline. The real thing (~/CODE/taste-machine, its own README) has SEVEN modules, a
 * relevance bar of 0.3, and a three-way verdict: KILL / SEND / EXCEPTIONAL. Shipping the
 * mockup's words would have been a panel describing software that does not exist, which is
 * the prop failure my own build plan warns about.
 *
 * WHAT IT COMPUTES: the dial is real. RELEVANCE_BAR = 0.3 is lifted from
 * lib/review-logic.ts, and moving it re-partitions the drafts live. The scores are the
 * component's own sample (labelled as such) because the real ones live in Supabase behind
 * auth and a portfolio cannot reach them. The BAR is real, the MECHANISM is real, the
 * numbers being sorted are declared sample. That distinction is the whole point: a machine
 * that fakes its inputs is a prop, one that shows its real rule honestly is a diagram.
 */

import { useMemo, useState } from 'react';
import type { Tone } from './ProjectIndex';

const MONO = 'var(--font-jetbrains-mono), ui-monospace, monospace';

export type TasteModule = { id: string; label: string; line: string };

export default function TasteMachine({
  modules, bar, tone, samples,
}: {
  modules: TasteModule[];
  bar: number;              // the REAL relevance bar
  tone: Tone;
  samples: number[];        // declared sample scores, never dressed as live
}) {
  const [dial, setDial] = useState(bar);
  const [active, setActive] = useState(0);
  const mono = tone.mono ?? MONO;

  // The verdict split. This is the machine's actual rule: below the bar is a kill.
  const verdict = useMemo(() => {
    const kill = samples.filter((s) => s < dial).length;
    const exceptional = samples.filter((s) => s >= 0.8).length;
    return { kill, send: samples.length - kill - exceptional, exceptional };
  }, [samples, dial]);

  const cell = (label: string, value: string | number, on = false) => (
    <div style={{
      border: `1px solid ${tone.fg}`, padding: '9px 11px', flex: 1,
      background: on ? '#e0532a' : 'transparent', color: on ? '#fff' : tone.fg,
    }}>
      <div style={{ fontFamily: mono, fontSize: 8.5, letterSpacing: '0.12em', opacity: 0.72 }}>{label}</div>
      <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 2 }}>{value}</div>
    </div>
  );

  return (
    <div style={{ border: `1.5px solid ${tone.fg}`, background: tone.bg, color: tone.fg }}>
      {/* head */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                    borderBottom: `1.5px solid ${tone.fg}`, padding: '14px 16px' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
            Taste Machine
          </div>
          <div style={{ fontFamily: mono, fontSize: 8.5, letterSpacing: '0.13em', color: tone.dim, marginTop: 3 }}>
            {modules.length} MODULES · RELEVANCE BAR {bar}
          </div>
        </div>
        <span aria-hidden style={{ width: 12, height: 12, borderRadius: '50%', background: tone.fg }} />
      </div>

      <div className="tm-grid">
        {/* the module rail: real modules, from the machine's own README */}
        <div className="tm-side">
          {modules.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setActive(i)}
              style={{
                display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer',
                border: 0, borderBottom: `1px solid ${tone.rule}`, padding: '9px 13px',
                background: active === i ? '#e0532a' : 'transparent',
                color: active === i ? '#fff' : tone.fg, font: 'inherit',
              }}
            >
              <div style={{ fontFamily: mono, fontSize: 8.5, letterSpacing: '0.11em', opacity: 0.7 }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em' }}>{m.label}</div>
            </button>
          ))}
        </div>

        {/* the readout */}
        <div style={{ padding: '14px 16px' }}>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: tone.dim, minHeight: 62 }}>
            {modules[active]?.line}
          </p>

          <div style={{ display: 'flex', gap: 7, marginTop: 14 }}>
            {cell('KILL', verdict.kill)}
            {cell('SEND', verdict.send)}
            {cell('EXCEPTIONAL', verdict.exceptional, verdict.exceptional > 0)}
          </div>

          {/* the dial. moving it re-partitions the verdict, live. */}
          <div style={{ marginTop: 16, borderTop: `1px solid ${tone.rule}`, paddingTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 9,
                          letterSpacing: '0.1em', color: tone.dim }}>
              <span>RELEVANCE BAR</span>
              <span style={{ color: tone.fg }}>
                {dial.toFixed(2)}{Math.abs(dial - bar) > 0.001 ? ` (ships at ${bar})` : ' · shipped value'}
              </span>
            </div>
            <input
              type="range" min={0} max={1} step={0.05} value={dial}
              onChange={(e) => setDial(parseFloat(e.target.value))}
              aria-label="relevance bar"
              style={{ width: '100%', marginTop: 8, accentColor: '#e0532a' }}
            />
            <p style={{ fontFamily: mono, fontSize: 9, color: tone.dim, marginTop: 8, lineHeight: 1.6 }}>
              the bar is real ({bar}, from lib/review-logic.ts). the {samples.length} scores it
              sorts are sample: the live ones sit in supabase behind auth, and a portfolio
              cannot reach them. the rule is honest, the inputs are labelled.
            </p>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1.5px solid ${tone.fg}`, display: 'flex', justifyContent: 'space-between',
                    padding: '8px 16px', fontFamily: mono, fontSize: 8.5, letterSpacing: '0.12em', color: tone.dim }}>
        <span>KILL / SEND / EXCEPTIONAL</span>
        <span>KEEP MAKING THINGS</span>
      </div>

      <style>{`
        .tm-grid { display: grid; grid-template-columns: 168px 1fr; min-width: 0; }
        .tm-grid > * { min-width: 0; }
        .tm-side { border-right: 1.5px solid currentColor; }
        @media (max-width: 620px) {
          .tm-grid { grid-template-columns: 1fr; }
          .tm-side { border-right: 0; border-bottom: 1.5px solid currentColor;
                     display: flex; overflow-x: auto; scrollbar-width: none; }
          .tm-side::-webkit-scrollbar { display: none; }
          .tm-side button { border-bottom: 0 !important; border-right: 1px solid currentColor;
                            white-space: nowrap; width: auto !important; flex: none; }
        }
      `}</style>
    </div>
  );
}
