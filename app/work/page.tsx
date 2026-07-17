'use client';

/*
 * /work — the library.
 *
 * The four model routes are the ART: four languages arguing over one record. This is the
 * LIBRARY: one language, dense, dry, made to be scanned and filtered. Same role /compare
 * already plays as neutral chrome, so it is not a fifth design competing in the eval.
 *
 * Every row comes from the record (vault -> oscar-record -> build). A new project appears
 * here the moment it lands in 00 Dashboard/record.md. Nothing to hand-type.
 */

import { useRouter } from 'next/navigation';
import ProjectIndex, { type Tone } from '@/components/ProjectIndex';
import DitherChart from '@/components/DitherChart';
import { PROJECT_INDEX, ETH_CURVE, STATS, CASH_AFTER } from '../shared/data';

// LIGHT, and that is the whole point of the tone prop: Oscar, Jul 17, "i do prefer light
// mode, dark mode is not my style really". All four skins are dark (#060606 / #050505 /
// #0e0e0e), so the library is where light lives. This was a one-object change, not a
// stylesheet rewrite, because ProjectIndex has no default look.
//
// NOT the warm-cream + serif + terracotta cluster (the named "AI pretending to have taste"
// tell): this is cool off-white paper, a grotesk display, and the accent is plain black
// ink. Direction A's actual palette, which is the one he picked.
const LIBRARY: Tone = {
  bg: '#f6f5f3',
  fg: '#131313',
  dim: '#8b8b87',
  rule: '#dbdad6',
  hover: '#eeede9',
  accent: '#131313',
  display: 'var(--font-dm-sans), sans-serif',
};

export default function Work() {
  const router = useRouter();
  return (
    <main style={{ background: LIBRARY.bg, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '40px 22px 100px' }}>
        <ProjectIndex
          projects={PROJECT_INDEX}
          tone={LIBRARY}
          onOpen={(slug) => router.push(`/work/${slug}`)}
        />

        {/* Cumulative ETH, dithered, ending at the ruled total. Under the index, because the
            index is the job and this is the footnote: a chart above the fold is decoration
            competing with the work.

            LABELLED "THE ETH ERA", NOT "THE RECORD". The curve stops at 2023-11 and that is
            not truncation, it is true: every ETH purse Oscar won ran 2021-10 to 2023-11, and
            the 2026 wins (Synthesis, World Build 3) paid CASH. Calling an ETH-only curve
            "the record" would quietly imply the record ended in 2023. The currency changed;
            the winning didn't. Same class of overclaim as "$188K at today's prices", caught
            the same way: by reading the data instead of the label. */}
        <section style={{ marginTop: 70 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                        fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 10,
                        letterSpacing: '0.09em', color: LIBRARY.dim,
                        borderBottom: `1px solid ${LIBRARY.rule}`, paddingBottom: 7 }}>
            <span>/ THE ETH ERA · {ETH_CURVE.length} EVENTS · {ETH_CURVE[0]?.label}—{ETH_CURVE[ETH_CURVE.length - 1]?.label}</span>
            <span style={{ color: LIBRARY.fg }}>{STATS.totalEthWon}</span>
          </div>
          <div style={{ marginTop: 12 }}>
            <DitherChart points={ETH_CURVE} color={LIBRARY.fg} ink={LIBRARY.fg} height={140} cumulative />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between',
                        fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 9,
                        color: LIBRARY.dim, marginTop: 6 }}>
            <span>{ETH_CURVE[0]?.label}</span>
            <span>{ETH_CURVE[ETH_CURVE.length - 1]?.label}</span>
          </div>
          {/* The line the curve can't draw. Without it a reader assumes the wins stopped. */}
          <p style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 10,
                      color: LIBRARY.dim, marginTop: 14, lineHeight: 1.6 }}>
            the eth purses stopped in 2023. {CASH_AFTER.length} events since have paid cash
            ({CASH_AFTER.map((r) => r.prize).join(' · ')}), which no eth curve can show.
          </p>
        </section>
      </div>
    </main>
  );
}
