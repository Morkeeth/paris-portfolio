import type { Metadata } from 'next';
import { COMPARE_META } from '../shared/data';

// Title/description read from COMPARE_META so this page and its OG card cannot
// drift apart — the same rule MODEL_META already enforces for the four skins.
const { title, description } = COMPARE_META;

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: 'website' },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
