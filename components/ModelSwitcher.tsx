'use client';

/*
 * ModelSwitcher — the neutral "eval frame" around the four model designs.
 * Deliberately NOT a fifth design: dark consistent chrome, mono labels (eval-label
 * voice), one gold accent for the active model. It frames the taste eval; the four
 * designs are the stars. Left rail on desktop, top strip on mobile.
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MODELS = [
  { slug: 'fable', label: 'fable' },
  { slug: 'opus', label: 'opus' },
  { slug: 'sonnet', label: 'sonnet' },
  { slug: 'haiku', label: 'haiku' },
];

export default function ModelSwitcher() {
  const pathname = usePathname();
  const isActive = (slug: string) => pathname === `/${slug}`;

  return (
    <nav
      aria-label="design model switcher"
      style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
      className="fixed z-50 flex bg-[#0a0a0a] text-[#f0ede8] border-[#ffffff14]
                 top-0 left-0 right-0 h-[52px] flex-row items-center gap-1 px-3 border-b overflow-x-auto
                 md:top-0 md:left-0 md:right-auto md:h-screen md:w-[196px] md:flex-col md:items-stretch md:gap-0 md:px-0 md:py-7 md:border-b-0 md:border-r md:overflow-visible"
    >
      {/* concept header — desktop only */}
      <div className="hidden md:block px-6 pb-7">
        <div className="text-[13px] lowercase tracking-tight">oscar morke</div>
        <div className="mt-2 text-[11px] leading-relaxed text-[#706e68] lowercase">
          same brief.<br />four models.<br />one live eval of taste.
        </div>
      </div>

      <span className="shrink-0 pr-1 text-[11px] text-[#706e68] lowercase md:hidden">models:</span>

      {MODELS.map((m) => (
        <Link
          key={m.slug}
          href={`/${m.slug}`}
          aria-current={isActive(m.slug) ? 'page' : undefined}
          className={[
            'shrink-0 text-[13px] lowercase transition-colors duration-150 outline-none',
            'px-2.5 py-1.5 border-b-2',
            'md:px-6 md:py-2.5 md:border-b-0 md:border-l-2',
            isActive(m.slug)
              ? 'text-[#f0ede8] border-[#ffd34d]'
              : 'text-[#706e68] border-transparent hover:text-[#f0ede8]',
          ].join(' ')}
        >
          {m.label}
        </Link>
      ))}

      <Link
        href="/compare"
        aria-current={pathname === '/compare' ? 'page' : undefined}
        className={[
          'shrink-0 text-[11px] lowercase transition-colors duration-150',
          'ml-auto md:ml-0 md:mt-auto md:px-6 md:pt-7',
          pathname === '/compare' ? 'text-[#f0ede8]' : 'text-[#706e68] hover:text-[#f0ede8]',
        ].join(' ')}
      >
        compare all →
      </Link>
    </nav>
  );
}
