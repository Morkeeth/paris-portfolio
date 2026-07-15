import type { Metadata } from 'next';
import { modelBySlug } from '../shared/data';

const m = modelBySlug('sonnet');

export const metadata: Metadata = {
  title: `oscar morke · ${m.name}`,
  description: m.desc,
  openGraph: { title: `oscar morke · ${m.name}`, description: m.desc, type: 'website' },
};

export default function SonnetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
