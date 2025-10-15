'use client';

import Link from 'next/link';

const projects = [
  {
    title: 'ledger tier-1 roadmap',
    year: '2023-present',
    role: 'staff product manager',
    description: 'leading strategic product vision for ledger\'s core platform',
  },
  {
    title: 'product innovation lab',
    year: '2023',
    role: 'innovation lead',
    description: 'internal lab for emerging tech and next-gen features',
  },
  {
    title: 'cross-platform harmony',
    year: '2022',
    role: 'product lead',
    description: 'unified experience across web, mobile, and desktop',
  },
  {
    title: 'community-driven features',
    year: '2022',
    role: 'product manager',
    description: 'feedback loop between product team and users',
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen px-8 py-32 font-mono">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl text-white mb-12">projects</h1>
        
        {/* Projects List */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <div key={index} className="border-b border-white/10 pb-12 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-white text-lg">{project.title}</h2>
                <span className="text-[var(--foreground-dimmer)] text-sm">{project.year}</span>
              </div>
              <div className="text-[var(--foreground-dim)] text-sm mb-3">{project.role}</div>
              <p className="text-[var(--foreground-dim)] leading-relaxed">{project.description}</p>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="mt-16 text-[var(--foreground-dim)]">
          <Link href="/contact" className="hover:text-white transition-colors">
            want to collaborate? →
          </Link>
        </div>
      </div>
    </div>
  );
}
