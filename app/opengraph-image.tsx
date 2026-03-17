import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Oscar Morkeeth — Staff PM @ Ledger';
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
          backgroundColor: '#F0EEE6',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 400,
            color: '#333333',
            marginBottom: 24,
            letterSpacing: '-0.02em',
          }}
        >
          oscar
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#666666',
            fontFamily: 'monospace',
            marginBottom: 12,
          }}
        >
          staff product manager @ ledger
        </div>
        <div
          style={{
            fontSize: 18,
            color: '#999999',
            fontFamily: 'monospace',
          }}
        >
          paris, france
        </div>
      </div>
    ),
    { ...size },
  );
}
