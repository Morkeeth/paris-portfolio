'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'work', path: '#work', scroll: true },
  { name: 'about', path: '/about' },
  { name: 'way', path: '/way' },
  { name: 'contact', path: 'mailto:oscar@example.com', external: true },
];

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 font-mono text-sm bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-white font-medium">
          oscar mörke
        </Link>
        <div className="flex gap-6">
          {navItems.map((item) => {
            if (item.external) {
              return (
                <a
                  key={item.path}
                  href={item.path}
                  className="text-[var(--foreground-dim)] hover:text-white transition-colors lowercase"
                >
                  {item.name}
                </a>
              );
            }
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`transition-colors lowercase ${
                  pathname === item.path
                    ? 'text-white'
                    : 'text-[var(--foreground-dim)] hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
