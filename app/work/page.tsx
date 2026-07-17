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
import { PROJECT_INDEX } from '../shared/data';

// The library's own tone: the neutral chrome the switcher already established (near-black,
// bone, one gold), NOT a new palette. Adding a look here would be adding a fifth language.
const LIBRARY: Tone = {
  bg: '#0a0a0a',
  fg: '#f0ede8',
  dim: '#706e68',
  rule: '#242320',
  hover: '#131313',
  accent: '#ffd34d',
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
      </div>
    </main>
  );
}
