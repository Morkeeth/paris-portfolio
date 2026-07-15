import type { Metadata } from 'next';

const title = 'oscar morke · four models, one brief';
const description =
  'the same brief handed to fable 5, opus 4.8, sonnet 5 and haiku 4.5. same context, same stories, the model is the only variable. a live eval of taste.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: 'website' },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
