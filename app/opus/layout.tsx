import type { Metadata } from 'next';
import { modelBySlug } from '../shared/data';

const m = modelBySlug('opus');

export const metadata: Metadata = {
  title: `oscar morke · ${m.name}`,
  description: m.desc,
  openGraph: { title: `oscar morke · ${m.name}`, description: m.desc, type: 'website' },
};

export default function OpusLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
