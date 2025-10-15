'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

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
    <motion.nav
      className="fixed top-8 left-8 z-50 font-mono text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`transition-colors ${
              pathname === item.path
                ? 'text-[var(--foreground)]'
                : 'text-[var(--foreground-dim)] hover:text-[var(--accent)]'
            }`}
          >
            {pathname === item.path && '> '}
            {item.name}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
