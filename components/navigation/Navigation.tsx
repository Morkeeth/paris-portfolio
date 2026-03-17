'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const pathname = usePathname();

  // No nav on the main page (single-page scroll) or /way (immersive)
  if (pathname === '/' || pathname === '/way') return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F0EEE6]/80 backdrop-blur-sm border-b border-[#333]/5">
      <div className="max-w-2xl mx-auto px-8">
        <div className="flex items-center h-14">
          <Link href="/" className="text-[#999] hover:text-[#333] transition-colors text-sm font-mono">
            ← back
          </Link>
        </div>
      </div>
    </nav>
  );
}
