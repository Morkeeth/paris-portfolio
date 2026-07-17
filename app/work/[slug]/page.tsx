'use client';

/*
 * /work/<slug> — the case study. Light, because Oscar prefers light.
 *
 * Oscar, Jul 17: "one image and description might be tricky" -> depth lives here, not on a
 * card. The index is the scan; this is the read.
 *
 * PLACEHOLDER IS A STATE, NOT A GAP ("We fix helicon and overtun once their done!"). A
 * project in the record with no story renders an honest IN FLIGHT stub. It is listed
 * because it exists; it is not narrated because it isn't finished. No fabricated study
 * ships on a page whose whole argument is method.
 */

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AgentChat, TerminalWall, CrewRoster } from '@/components/AgentCrew';
import StackedDeck from '@/components/StackedDeck';
import LitmusScore from '@/components/LitmusScore';
import type { Tone } from '@/components/ProjectIndex';
import {
  PROJECT_INDEX, PROJECTS, HACKATHON_TIMELINE, TERMINAL_WALL, ETH_CURVE, STATS, AGENT_CREW,
  AGENTIC_STACK, ANOTHERBLOCK_DROPS, LITMUS,
} from '../../shared/data';

const T: Tone = {
  bg: '#f6f5f3', fg: '#131313', dim: '#8b8b87', rule: '#dbdad6',
  hover: '#eeede9', accent: '#131313', display: 'var(--font-dm-sans), sans-serif',
};
const MONO = 'var(--font-jetbrains-mono), monospace';

export default function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const fact = (PROJECT_INDEX as any[]).find((p) => p.slug === slug);
  if (!fact) notFound();

  const prose = (PROJECTS as any[]).find((p) => p.slug === slug);
  const written = Boolean(prose?.story);

  // A hackathon project earns the record curve; the OS earns the wall; the agents earn the
  // chat. Furniture appears where it MEANS something, never as page filler.
  const rows = HACKATHON_TIMELINE.filter((r: any) => r.project === prose?.name || r.name === fact.name);
  // Furniture appears where it MEANS something. A deck on the Ledger page would be
  // decoration; on Anotherblock it IS the catalogue. Gate per slug, never render for filler.
  const isDeck = slug === 'anotherblock';
  const isLitmus = slug === 'litmus';
  const isOS = slug === 'the-os';
  // NOTE: the per-slug furniture below renders OUTSIDE the `written` gate. Litmus has no
  // story, so nesting its placeholder inside "has a story" made it dead code behind a green
  // build — the same shape as the `slug === 'os'` miss. A placeholder that only appears once
  // the case study exists is worthless, since the placeholder IS the missing case study. // NOT 'os': the record's slug is 'the-os', and the wrong
                                  // guess silently rendered nothing at all. Dead feature, green build.

  const meta = [fact.year, (fact.track ?? '').toUpperCase(), fact.buildTime?.toUpperCase(), fact.id && `MRK-${fact.id}`]
    .filter(Boolean).join(' · ');

  return (
    <main style={{ background: T.bg, color: T.fg, minHeight: '100vh' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 22px 110px' }}>
        <Link href="/work" style={{ fontFamily: MONO, fontSize: 11, color: T.dim, textDecoration: 'none' }}>← work</Link>

        <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', color: T.dim, marginTop: 30 }}>{meta}</div>
        <h1 style={{ fontFamily: T.display, fontSize: 'clamp(38px,7vw,68px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.92, margin: '10px 0 0' }}>
          {fact.name}
        </h1>

        {(prose?.oneLiner ?? fact.oneLiner) && (
          <p style={{ fontSize: 17, lineHeight: 1.55, color: T.dim, marginTop: 16, maxWidth: 560 }}>
            {prose?.oneLiner ?? fact.oneLiner}
          </p>
        )}

        {written ? (
          <>
            <p style={{ fontSize: 16, lineHeight: 1.75, marginTop: 30, maxWidth: 620 }}>{prose.story}</p>

            {prose.result && (
              <p style={{ fontFamily: MONO, fontSize: 13, marginTop: 22, borderLeft: `2px solid ${T.accent}`, paddingLeft: 12 }}>
                {prose.result}
              </p>
            )}

            {prose.details?.length > 0 && (
              <ul style={{ marginTop: 30, padding: 0, listStyle: 'none' }}>
                {prose.details.map((d: string) => (
                  <li key={d} style={{ borderTop: `1px solid ${T.rule}`, padding: '11px 0', fontSize: 14.5, lineHeight: 1.6, color: '#4a4a47' }}>{d}</li>
                ))}
              </ul>
            )}

            {/* the prize record, dithered — only where a purse actually exists */}
            {rows.length > 0 && rows.some((r: any) => r.eth || r.prize) && (
              <section style={{ marginTop: 44 }}>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', color: T.dim, borderBottom: `1px solid ${T.rule}`, paddingBottom: 7 }}>
                  / THE PURSE
                </div>
                {rows.map((r: any) => (
                  <div key={r.date + r.name} style={{ display: 'flex', gap: 14, fontFamily: MONO, fontSize: 12, padding: '9px 0', borderBottom: `1px solid ${T.rule}` }}>
                    <span style={{ color: T.dim, width: 74 }}>{r.date}</span>
                    <span style={{ flex: 1 }}>{r.name}</span>
                    <span>{r.prize || (r.eth ? `${r.eth} ETH` : r.bounties)}</span>
                  </div>
                ))}
              </section>
            )}



            {/* the wall belongs to the OS and nowhere else */}
            {isOS && (
              <section style={{ marginTop: 44 }}>
                <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', color: T.dim, borderBottom: `1px solid ${T.rule}`, paddingBottom: 7, marginBottom: 16 }}>
                  / A ONE-PERSON TEAM, RUN BY AGENTS
                </div>
                <TerminalWall panes={TERMINAL_WALL} tone={T} caption={`${TERMINAL_WALL.length} terminals · one brief · ship by morning`} />
                <div style={{ marginTop: 34 }}>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', color: T.dim, marginBottom: 4 }}>
                    / THE CREW · {AGENTIC_STACK.length} LAYERS
                  </div>
                  <CrewRoster layers={AGENTIC_STACK} tone={T} />
                </div>

                {/* Renders only when the agents have actually said something. Empty today,
                    and that is the honest state, not a gap to paper over. */}
                {AGENT_CREW.length > 0 && (
                  <div style={{ marginTop: 30 }}>
                    <AgentChat crew={AGENT_CREW} tone={T} />
                  </div>
                )}
              </section>
            )}
          </>
        ) : (
          <div style={{ border: `1px solid ${T.rule}`, borderLeft: `2px solid ${T.accent}`, padding: '18px 20px', marginTop: 30 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em' }}>IN FLIGHT</div>
            <p style={{ fontSize: 14.5, lineHeight: 1.65, color: T.dim, marginTop: 9 }}>
              It is in the record, so it is listed. The case study lands when the thing does.
              {fact.oneLinerSource ? ' The line above is the repo description, not the written version.' : ''}
            </p>
          </div>
        )}


        {/* the catalogue, riffled. NEWYORKOVER's gesture, Oscar's records. */}
        {isDeck && (
          <section style={{ marginTop: 44 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', color: T.dim, borderBottom: `1px solid ${T.rule}`, paddingBottom: 7, marginBottom: 16 }}>
              / THE CATALOGUE · {ANOTHERBLOCK_DROPS.length} DROPS
            </div>
            <StackedDeck
              drops={ANOTHERBLOCK_DROPS}
              tone={T}
              caption={`fans bought shares of the songs. ${STATS.users} users, ${STATS.anotherblockVolume} in volume. no album art here: it was never ours to ship.`}
            />
          </section>
        )}

        {isLitmus && (
          <section style={{ marginTop: 44 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', color: T.dim, borderBottom: `1px solid ${T.rule}`, paddingBottom: 7, marginBottom: 16 }}>
              / THE SCAN
            </div>
            <LitmusScore scouted={LITMUS.scouted} hits={LITMUS.hits} tone={T} />
          </section>
        )}

        {fact.links && (
          <div style={{ display: 'flex', gap: 18, marginTop: 36, flexWrap: 'wrap' }}>
            {Object.entries(fact.links as Record<string, string>).map(([k, v]) => (
              <a key={k} href={v} target="_blank" rel="noreferrer"
                 style={{ fontFamily: MONO, fontSize: 12, color: T.fg, borderBottom: `1px solid ${T.accent}`, textDecoration: 'none', paddingBottom: 2 }}>
                {k} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
