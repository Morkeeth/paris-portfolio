'use client';

import { useEffect, useState } from 'react';

export function useReveal() {
  const [visible, setVisible] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisible((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -100px 0px' },
    );

    document.querySelectorAll('[data-index]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const sectionClass = (index: number, extra = '') =>
    `transition-all duration-1000 ease-out ${visible.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${extra}`.trim();

  return { visible, sectionClass };
}
