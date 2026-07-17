'use client';

/*
 * AgentCrew — the bagel/hermes chat cards + the terminal wall, ported from the Tuscany
 * site (Oscar: "the agents bagel and hermes component is GREAT", "one person team run by
 * agents is great").
 *
 * WHAT CHANGED IN THE PORT
 *
 * 1. Tone, not colours. The Tuscany original hardcoded its palette because it had exactly
 *    one skin. Here the same furniture has to survive four languages plus the light
 *    library, so every value arrives through `tone`. The original was already halfway
 *    there: it used currentColor + color-mix, which is why it ports at all.
 *
 * 2. Roles lead, names follow. Oscar's rule, already applied site-wide: "no one knows what
 *    bagel is, cater it to the audience." A stranger meets "the machine", and `bagel` is
 *    the detail line. The Tuscany version could say `bagel` cold because Rick had context;
 *    a portfolio visitor has none.
 *
 * 3. The chat needs REAL words. The Tuscany cards land because Oscar actually asked his
 *    agents and pasted what they said. Inventing agent dialogue for a portfolio would be
 *    fabricating a quote from a system that exists and can be asked. So `AgentChat` takes
 *    the exchange as data and renders nothing without it.
 */

import type { Tone } from './ProjectIndex';

const MONO = 'var(--font-jetbrains-mono), ui-monospace, monospace';

/* ── the crew, as chat ───────────────────────────────────────────────────────── */

export type AgentExchange = {
  role: string;      // what it IS. leads.
  name: string;      // what it's CALLED. demoted.
  detail: string;    // where it lives
  accent: string;
  q: string;
  a: string;
};

export function AgentChat({ crew, tone }: { crew: AgentExchange[]; tone: Tone }) {
  const mono = tone.mono ?? MONO;
  if (!crew.length) return null;

  return (
    <div style={{ display: 'grid', gap: 18, maxWidth: 620 }}>
      {crew.map((v) => (
        <div
          key={v.name}
          style={{
            border: `1px solid color-mix(in srgb, ${v.accent} 38%, transparent)`,
            background: `color-mix(in srgb, ${v.accent} 6%, transparent)`,
            padding: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.02em' }}>{v.role}</span>
            <span style={{ fontFamily: mono, fontSize: 11, color: v.accent }}>{v.name}</span>
            <span style={{ fontFamily: mono, fontSize: 9, color: tone.dim, marginLeft: 'auto', letterSpacing: '0.1em' }}>
              {v.detail.toUpperCase()}
            </span>
          </div>

          {/* his question, right-aligned, quieter */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
            <p
              style={{
                fontSize: 13, lineHeight: 1.55, maxWidth: '85%', padding: '9px 13px',
                background: `color-mix(in srgb, ${tone.fg} 7%, transparent)`,
                borderRadius: '12px 12px 3px 12px', color: tone.dim,
              }}
            >
              {v.q}
            </p>
          </div>

          {/* the agent's actual reply, carrying its own colour */}
          <div style={{ display: 'flex' }}>
            <p
              style={{
                fontSize: 13.5, lineHeight: 1.6, maxWidth: '90%', padding: '10px 14px',
                background: `color-mix(in srgb, ${v.accent} 13%, transparent)`,
                border: `1px solid color-mix(in srgb, ${v.accent} 28%, transparent)`,
                borderRadius: '12px 12px 12px 3px', color: tone.fg,
              }}
            >
              {v.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── the terminal wall ───────────────────────────────────────────────────────── */

export type TerminalPane = { cwd: string; prompt: string; effort?: string };

/*
 * The tiled wall behind "a one-person team, run by agents". This is the thing Oscar's own
 * screenshot shows literally: N Claude Code windows stacked over each other at 3am.
 *
 * The pane count is NOT typed anywhere — it is panes.length, same rule as the agent count
 * and the ETH total. That exact number ("5 terminals") already drifted across three
 * surfaces once.
 */
export function TerminalWall({
  panes, tone, caption,
}: { panes: TerminalPane[]; tone: Tone; caption?: string }) {
  const mono = tone.mono ?? MONO;
  if (!panes.length) return null;

  return (
    <div>
      <div className="tw-grid">
        {panes.map((t, i) => (
          <div
            key={t.cwd}
            className="tw-pane"
            style={{
              border: `1px solid ${tone.rule}`,
              background: `color-mix(in srgb, ${tone.fg} 3%, transparent)`,
              // A real wall overlaps. Nudging alternate panes reads as depth without a
              // single shadow, and it is what the screenshot actually looks like.
              transform: i % 2 ? 'translateY(6px)' : 'none',
            }}
          >
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '7px 10px',
                borderBottom: `1px solid ${tone.rule}`,
              }}
            >
              {[0, 1, 2].map((d) => (
                <span key={d} aria-hidden style={{ width: 7, height: 7, borderRadius: '50%', background: tone.rule }} />
              ))}
              <span style={{ fontFamily: mono, fontSize: 10, color: tone.dim, marginLeft: 4 }}>{t.cwd}</span>
            </div>
            <div style={{ padding: '11px 10px 13px' }}>
              <p style={{ fontFamily: mono, fontSize: 11.5, lineHeight: 1.5, color: tone.fg }}>
                <span style={{ color: tone.accent }}>❯ </span>{t.prompt}
              </p>
              {t.effort && (
                <p style={{ fontFamily: mono, fontSize: 9, color: tone.dim, marginTop: 7, letterSpacing: '0.08em' }}>
                  {t.effort.toUpperCase()} · EFFORT
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {caption && (
        <p style={{ fontFamily: mono, fontSize: 10, color: tone.dim, marginTop: 14, letterSpacing: '0.06em' }}>
          {caption}
        </p>
      )}

      <style>{`
        .tw-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 10px; min-width: 0; }
        .tw-grid > * { min-width: 0; }
        @media (max-width: 560px) {
          .tw-grid { grid-template-columns: 1fr; }
          .tw-pane { transform: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ── the roster ──────────────────────────────────────────────────────────────── */

/*
 * CrewRoster — the crew as what they ARE, from AGENTIC_STACK.
 *
 * This exists because AgentChat is empty and honestly should be. The chat needs words the
 * agents actually said; Bagel's CLI would not answer today (gateway healthy, `agent` never
 * returns), so the question is queued and the bubbles wait.
 *
 * The roster is not a substitute pretending to be the chat. It renders lines Oscar already
 * wrote about his own system: real, sourced, and not a quote attributed to a machine that
 * never said it. Roles lead, names follow.
 */
export function CrewRoster({
  layers, tone,
}: {
  layers: { key: string; layer: string; sub: string; verb: string; line: string }[];
  tone: Tone;
}) {
  const mono = tone.mono ?? MONO;
  return (
    <div style={{ display: 'grid', gap: 0 }}>
      {layers.map((l) => (
        <div
          key={l.key}
          style={{
            display: 'grid', gridTemplateColumns: '132px 1fr', gap: 16,
            borderTop: `1px solid ${tone.rule}`, padding: '14px 0', alignItems: 'baseline',
          }}
          className="cr-row"
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.02em' }}>{l.layer}</div>
            <div style={{ fontFamily: mono, fontSize: 9.5, color: tone.dim, marginTop: 3 }}>{l.sub}</div>
          </div>
          <div>
            <span style={{ fontFamily: mono, fontSize: 9, color: tone.accent, letterSpacing: '0.1em' }}>
              {l.verb.toUpperCase()}
            </span>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: tone.dim, marginTop: 5 }}>{l.line}</p>
          </div>
        </div>
      ))}
      <style>{`@media (max-width: 560px) { .cr-row { grid-template-columns: 1fr !important; gap: 6px !important; } }`}</style>
    </div>
  );
}
