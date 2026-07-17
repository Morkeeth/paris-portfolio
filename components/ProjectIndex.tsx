'use client';

/*
 * ProjectIndex — the folder-structure index. Oscar's pick (Direction A, Jul 17).
 *
 * WHY IT EXISTS: "all our projects are a bit too noicy". 22 projects as a card wall is a
 * wall. As rows it is a directory listing you scan in two seconds. Type IS the interface.
 *
 * SKIN-ADAPTIVE BY CONSTRUCTION. The four model pages are four visual LANGUAGES rendering
 * one record; a component with a fixed look would quietly become a fifth language and break
 * the eval, because the arms would stop being pure model differences. So every colour and
 * face arrives through `tone`. Same furniture, distinct skins. There is no default look
 * here on purpose.
 *
 * THE `buildTime` COLUMN IS LOAD-BEARING, not decoration. Sorted by year, the first screen
 * was twelve identical "2026 / AGENTS" rows: a wall that flattened Oscar's whole range.
 * "built in 48h" sitting next to "4 years" and "6 months of nights" is the range, stated
 * without a single adjective. It was the one thing the runner-up direction did better and
 * it got grafted in.
 */

import { useMemo, useState } from 'react';

export type Tone = {
  bg: string;        // page ground
  fg: string;        // primary ink
  dim: string;       // meta ink (year, counts, labels)
  rule: string;      // hairlines between rows
  hover: string;     // row hover ground
  accent: string;    // the one sharp colour: active filter, the marker
  display?: string;  // face for the big heading + names
  mono?: string;     // face for meta only, never the whole voice
};

// Only what a row renders. `links` is deliberately absent: the index does not link out,
// it opens a case study, and typing a field the component never reads just imports the
// record's shape churn (live-vs-repo-only) into this file for nothing.
export type IndexProject = {
  slug: string;
  name: string;
  year: string;
  track?: string;
  buildTime?: string;
};

const MONO = 'var(--font-jetbrains-mono), ui-monospace, monospace';

export default function ProjectIndex({
  projects,
  tone,
  title = 'Work',
  onOpen,
}: {
  projects: IndexProject[];
  tone: Tone;
  title?: string;
  onOpen?: (slug: string) => void;
}) {
  const [tracks, setTracks] = useState<Set<string>>(new Set());
  const [eras, setEras] = useState<Set<string>>(new Set());

  const mono = tone.mono ?? MONO;
  const display = tone.display ?? 'inherit';

  // Facets derive from the data. A hardcoded filter list is a filter list that lies the
  // day a project lands in a new track: the record already knows, so ask it.
  const TRACKS = useMemo(
    () => [...new Set(projects.map((p) => p.track).filter(Boolean))] as string[],
    [projects],
  );
  const ERAS = useMemo(
    () => [...new Set(projects.map((p) => String(p.year).slice(0, 4)))].sort().reverse(),
    [projects],
  );

  const rows = useMemo(
    () =>
      projects
        .filter((p) => (!tracks.size || (p.track && tracks.has(p.track))))
        .filter((p) => (!eras.size || eras.has(String(p.year).slice(0, 4))))
        .sort((a, b) => String(b.year).localeCompare(String(a.year))),
    [projects, tracks, eras],
  );

  const toggle = (set: Set<string>, v: string, fn: (s: Set<string>) => void) => {
    const next = new Set(set);
    next.has(v) ? next.delete(v) : next.add(v);
    fn(next);
  };

  const Facet = ({
    items, active, onPick, count,
  }: {
    items: string[]; active: Set<string>; onPick: (v: string) => void; count: (v: string) => number;
  }) => (
    <>
      {items.map((v) => {
        const on = active.has(v);
        return (
          <button
            key={v}
            onClick={() => onPick(v)}
            aria-pressed={on}
            className="pi-facet"
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', width: '100%',
              background: 'none', border: 0, cursor: 'pointer', textAlign: 'left',
              font: 'inherit', fontSize: 13,
              color: on ? tone.fg : tone.dim,
              fontWeight: on ? 600 : 400,
              // @ts-expect-error custom props are how the mobile chip reads the tone
              '--on-bg': on ? tone.accent : 'transparent',
              '--on-fg': on ? tone.bg : tone.dim,
              '--rule': tone.rule,
            }}
          >
            <span
              aria-hidden
              className="pi-box"
              style={{
                width: 11, height: 11, flex: 'none', border: `1px solid ${on ? tone.accent : tone.rule}`,
                background: on ? tone.accent : 'transparent',
              }}
            />
            {v} <span style={{ fontFamily: mono, fontSize: 10, opacity: 0.55 }}>({count(v)})</span>
          </button>
        );
      })}
    </>
  );

  const label = (t: string, right?: React.ReactNode) => (
    <div
      style={{
        display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 10,
        letterSpacing: '0.09em', color: tone.dim, borderBottom: `1px solid ${tone.rule}`,
        paddingBottom: 7, marginBottom: 12,
      }}
    >
      <span>/ {t.toUpperCase()}</span>
      {right}
    </div>
  );

  const cols = '86px 1fr auto 78px';

  return (
    <div style={{ color: tone.fg }}>
      <h2
        style={{
          fontFamily: display, fontSize: 'clamp(46px, 8vw, 96px)', fontWeight: 800,
          letterSpacing: '-0.05em', lineHeight: 0.85, margin: 0,
        }}
      >
        {title}
        <sup style={{ fontFamily: mono, fontSize: 14, fontWeight: 400, color: tone.dim, letterSpacing: 0, marginLeft: 4 }}>
          ({rows.length})
        </sup>
      </h2>

      <div className="pi-cols" style={{ marginTop: 40 }}>
        <div>
          <div style={{ marginBottom: 26 }}>
            {label(
              'track',
              (tracks.size || eras.size) ? (
                <button
                  onClick={() => { setTracks(new Set()); setEras(new Set()); }}
                  style={{ background: 'none', border: 0, cursor: 'pointer', font: 'inherit', color: tone.dim }}
                >
                  CLEAR
                </button>
              ) : null,
            )}
            <div className="pi-facets"><Facet
              items={TRACKS}
              active={tracks}
              onPick={(v) => toggle(tracks, v, setTracks)}
              count={(v) => projects.filter((p) => p.track === v).length}
            /></div>
          </div>
          <div>
            {label('era')}
            <div className="pi-facets"><Facet
              items={ERAS}
              active={eras}
              onPick={(v) => toggle(eras, v, setEras)}
              count={(v) => projects.filter((p) => String(p.year).startsWith(v)).length}
            /></div>
          </div>
        </div>

        <div>
          <div
            className="pi-hd"
            style={{
              display: 'grid', gridTemplateColumns: cols, gap: 14, fontFamily: mono, fontSize: 10,
              letterSpacing: '0.09em', color: tone.dim, borderBottom: `1px solid ${tone.rule}`, paddingBottom: 7,
            }}
          >
            <span>/ YEAR</span>
            <span>/ NAME</span>
            <span className="pi-bt">/ BUILT</span>
            <span style={{ justifySelf: 'end' }}>/ TRACK</span>
          </div>

          {rows.map((p) => (
            <button
              key={p.slug}
              onClick={() => onOpen?.(p.slug)}
              className="pi-row"
              style={{
                display: 'grid', gridTemplateColumns: cols, gap: 14, alignItems: 'center', width: '100%',
                background: 'none', border: 0, borderBottom: `1px solid ${tone.rule}`, padding: '11px 0',
                cursor: onOpen ? 'pointer' : 'default', textAlign: 'left', font: 'inherit', color: tone.fg,
              }}
            >
              <span style={{ fontFamily: mono, fontSize: 11, color: tone.dim, display: 'flex', alignItems: 'center', gap: 7 }}>
                <span aria-hidden style={{ width: 5, height: 5, flex: 'none', background: tone.accent }} />
                {p.year}
              </span>
              <span style={{ fontFamily: display, fontSize: 'clamp(15px, 2vw, 23px)', letterSpacing: '-0.025em' }}>
                {p.name}
              </span>
              <span className="pi-bt" style={{ fontFamily: mono, fontSize: 10, color: tone.dim }}>
                {p.buildTime ?? ''}
              </span>
              <span
                style={{
                  fontFamily: mono, fontSize: 9, letterSpacing: '0.09em', color: tone.dim,
                  border: `1px solid ${tone.rule}`, padding: '2px 5px', justifySelf: 'end',
                }}
              >
                {(p.track ?? '').toUpperCase()}
              </span>
            </button>
          ))}

          {rows.length === 0 && (
            <p style={{ fontFamily: mono, fontSize: 12, color: tone.dim, padding: '22px 0' }}>
              nothing matches those filters.
            </p>
          )}
        </div>
      </div>

      {/* Scoped, because the four skins own their own globals and must not be reached into.
          The BUILT column is the first thing to go at narrow widths: it is the best column
          on desktop and the least survivable on a 390px phone, which is Oscar's review device. */}
      <style>{`
        /* min-width:0 is load-bearing on BOTH the grid and its children. A grid item
           defaults to min-width:auto, so it refuses to shrink below its content and
           overflow-x:auto on a descendant never constrains anything: the mobile chip rail
           pushed 242px of horizontal scroll onto the BODY. Caught by measuring, not by
           looking. Wide content scrolls in its own container; the body never scrolls. */
        .pi-cols { display: grid; grid-template-columns: 220px 1fr; gap: 44px; min-width: 0; }
        .pi-cols > * { min-width: 0; }
        .pi-row:hover { background: ${tone.hover}; }
        @media (max-width: 900px) {
          /* A stacked sidebar buries the work: at 390px the first screen was ten
             checkboxes and ZERO projects. Oscar reviews on a phone, so the facets
             collapse to one horizontal chip rail and the rows start above the fold. */
          .pi-cols { grid-template-columns: 1fr; gap: 18px; }
          .pi-facets { display: flex; gap: 7px; overflow-x: auto; padding-bottom: 4px; min-width: 0;
                       scrollbar-width: none; }
          .pi-facets::-webkit-scrollbar { display: none; }
          .pi-facet { width: auto !important; flex: none; padding: 5px 11px !important;
                      border: 1px solid var(--rule) !important;
                      background: var(--on-bg) !important; color: var(--on-fg) !important; }
          .pi-box { display: none; }
        }
        @media (max-width: 720px) {
          .pi-hd, .pi-row { grid-template-columns: 74px 1fr 70px !important; }
          .pi-hd > span:last-child, .pi-row > span:last-child { display: none; }
        }
        @media (max-width: 480px) {
          .pi-hd, .pi-row { grid-template-columns: 68px 1fr !important; }
          .pi-bt { display: none; }
        }
      `}</style>
    </div>
  );
}
