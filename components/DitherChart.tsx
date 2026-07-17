'use client';

/*
 * DitherChart — Bayer-dithered area chart on a raw <canvas>. No chart library.
 *
 * Reference: tripwire.sh/dither-kit ("gorgeous dithered charts, no dependencies, built on
 * top of a tiny <canvas> engine"). This is that idea rebuilt against Oscar's record rather
 * than vendored: ~90 lines, zero deps, and it takes its colour through `tone` like every
 * other piece of furniture here.
 *
 * WHY DITHER AND NOT A GRADIENT: a gradient is decoration. A dither is a gradient made of
 * countable dots — the texture IS the value, at the pixel level. It also reads as craft on
 * a page arguing for craft, and it costs nothing.
 *
 * The data is real (HACKATHON_TIMELINE's eth column, summing to the ruled 41.7). Nothing
 * here is a synthetic curve, which is the entire difference between this and the AI-slop
 * "sparkline that means nothing".
 */

import { useEffect, useRef } from 'react';

// Ordered 4x4 Bayer matrix. The classic. Thresholds normalise to 0..1 and decide, per
// pixel, whether the ink lands — which is what makes the fade countable instead of smooth.
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

export type DitherPoint = { label: string; value: number };

export default function DitherChart({
  points,
  color,
  ink,
  height = 150,
  cumulative = false,
}: {
  points: DitherPoint[];
  color: string;   // the dots
  ink: string;     // the baseline + the curve edge
  height?: number;
  cumulative?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv || points.length === 0) return;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = cv.clientWidth;
      const h = height;
      cv.width = w * dpr;
      cv.height = h * dpr;
      const ctx = cv.getContext('2d');
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Build the series. Cumulative tells a different, truer story for prizes: it's the
      // pile growing, not eight disconnected spikes.
      let acc = 0;
      const series = points.map((p) => (cumulative ? (acc += p.value) : p.value));
      const max = Math.max(...series, 1);

      // Linear interpolation between event points, sampled per pixel column.
      const valueAt = (x: number) => {
        const t = (x / Math.max(w - 1, 1)) * (series.length - 1);
        const i = Math.floor(t);
        const f = t - i;
        const a = series[i] ?? 0;
        const b = series[Math.min(i + 1, series.length - 1)] ?? a;
        return a + (b - a) * f;
      };

      ctx.fillStyle = color;
      for (let x = 0; x < w; x++) {
        const v = valueAt(x) / max;           // 0..1
        const top = h - v * (h - 2);
        for (let y = Math.floor(top); y < h; y++) {
          // Density ramps from sparse at the curve edge to solid at the baseline, so the
          // shape reads even where the ink thins out.
          const d = (y - top) / Math.max(h - top, 1);
          const threshold = BAYER[y % 4][x % 4] / 16;
          if (d > threshold) ctx.fillRect(x, y, 1, 1);
        }
      }

      // Baseline. One hairline, because the zero has to be visible or the area is a vibe.
      ctx.fillStyle = ink;
      ctx.globalAlpha = 0.28;
      ctx.fillRect(0, h - 1, w, 1);
      ctx.globalAlpha = 1;
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(cv);
    return () => ro.disconnect();
  }, [points, color, ink, height, cumulative]);

  return <canvas ref={ref} style={{ width: '100%', height, display: 'block' }} aria-hidden />;
}
