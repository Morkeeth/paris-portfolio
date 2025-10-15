'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Contact', path: '/contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      {/* Desktop Navigation - Floating Glass Orb */}
      <motion.nav
        className="fixed top-8 right-8 z-50 hidden lg:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass-card px-6 py-4">
          <ul className="flex gap-6 items-center">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`font-mono text-sm transition-all duration-300 hover:text-[var(--neon-cyan)] relative group ${
                    pathname === item.path ? 'text-[var(--neon-cyan)]' : 'text-foreground'
                  }`}
                >
                  {item.name}
                  {pathname === item.path && (
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--neon-cyan)] glow-cyan"
                      layoutId="activeNav"
                    />
                  )}
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--neon-cyan)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>
      
      {/* Mobile Navigation */}
      <motion.div
        className="fixed top-6 right-6 z-50 lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="glass-card p-4 hover:glow-cyan transition-all duration-300"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <motion.span
              className="w-full h-0.5 bg-[var(--neon-cyan)] block"
              animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="w-full h-0.5 bg-[var(--neon-cyan)] block"
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="w-full h-0.5 bg-[var(--neon-cyan)] block"
              animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
            />
          </div>
        </button>
      </motion.div>
      
      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 z-40 lg:hidden"
        initial={{ opacity: 0, pointerEvents: 'none' }}
        animate={
          isOpen
            ? { opacity: 1, pointerEvents: 'auto' }
            : { opacity: 0, pointerEvents: 'none' }
        }
        transition={{ duration: 0.3 }}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        <motion.div
          className="absolute top-24 right-6 glass-card p-8"
          initial={{ x: 100, opacity: 0 }}
          animate={isOpen ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="flex flex-col gap-6">
            {navItems.map((item, index) => (
              <motion.li
                key={item.path}
                initial={{ x: 50, opacity: 0 }}
                animate={isOpen ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-mono text-lg transition-all duration-300 hover:text-[var(--neon-cyan)] block ${
                    pathname === item.path ? 'text-[var(--neon-cyan)]' : 'text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </>
  );
}

