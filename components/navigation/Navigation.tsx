'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'projects', path: '/projects' },
  { name: 'experience', path: '/experience' },
  { name: 'contact', path: '/contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 font-mono text-sm bg-black border-b border-white/10">
      <div className="max-w-4xl mx-auto px-8 py-4 flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`transition-colors ${
              pathname === item.path
                ? 'text-white'
                : 'text-[var(--foreground-dim)] hover:text-white'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
