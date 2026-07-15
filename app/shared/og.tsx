import { ImageResponse } from 'next/og';
import { OSCAR, STATS, modelBySlug } from './data';

// One card, four skins. The furniture (accent row, name, blurb, stats) is identical
// on every model; only the accent and the blurb change. Same idea as the site itself.
// Note: next/og runs on satori, which needs an explicit display on any multi-child div.
export const ogSize = { width: 1200, height: 630 };

export function modelOgImage(slug: string) {
  const m = modelBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#060606',
          color: '#f0ede8',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          borderTop: `12px solid ${m.color}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: m.color }} />
          <div style={{ fontSize: 26, color: m.color, letterSpacing: 1 }}>{m.name}</div>
          <div style={{ fontSize: 26, color: '#4a4842' }}>·</div>
          <div style={{ fontSize: 26, color: '#74726c' }}>{m.badge}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3 }}>
            {OSCAR.name.toLowerCase()}
          </div>
          <div style={{ fontSize: 30, color: '#74726c', lineHeight: 1.4 }}>{m.desc}</div>
        </div>

        <div style={{ display: 'flex', gap: 56, fontSize: 26, color: '#74726c' }}>
          <span style={{ color: '#f0ede8' }}>{STATS.hackathonWins} hackathon wins</span>
          <span style={{ color: '#f0ede8' }}>{STATS.prizes} in prizes</span>
          <span style={{ color: '#f0ede8' }}>{STATS.terminals} terminals at 3am</span>
        </div>
      </div>
    ),
    ogSize
  );
}
