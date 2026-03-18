import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'morkeeth — Staff PM @ Ledger';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          fontFamily: 'monospace',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 300,
            color: '#e0e0e0',
            marginBottom: 24,
            letterSpacing: '-0.02em',
          }}
        >
          morkeeth
        </div>
        <div
          style={{
            fontSize: 20,
            color: '#888',
            marginBottom: 8,
          }}
        >
          staff product manager @ ledger
        </div>
        <div
          style={{
            fontSize: 16,
            color: '#555',
          }}
        >
          paris · 2026
        </div>
      </div>
    ),
    { ...size },
  );
}
