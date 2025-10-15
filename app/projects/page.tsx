'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    title: 'Ledger Tier-1 Roadmap',
    year: '2023-Present',
    role: 'Staff Product Manager',
    description: 'Leading strategic product vision for Ledger\'s core platform.',
    impact: ['40% increase in engagement', '15+ team members', '5 major features in 2024'],
    tech: ['Product Strategy', 'User Research', 'Agile', 'Crypto/Web3'],
  },
  {
    id: 2,
    title: 'Product Innovation Lab',
    year: '2023',
    role: 'Innovation Lead',
    description: 'Internal lab for emerging tech and next-gen features.',
    impact: ['10+ concepts validated', '3 moved to production', '30% faster time-to-market'],
    tech: ['Design Thinking', 'Prototyping', 'MVP Development'],
  },
  {
    id: 3,
    title: 'Cross-Platform Harmony',
    year: '2022',
    role: 'Product Lead',
    description: 'Unified experience across web, mobile, and desktop.',
    impact: ['3 platforms unified', '45% fewer support tickets', '60% cross-platform usage'],
    tech: ['Platform Strategy', 'API Design', 'Design Systems'],
  },
  {
    id: 4,
    title: 'Community-Driven Features',
    year: '2022',
    role: 'Product Manager',
    description: 'Feedback loop between product team and users.',
    impact: ['8 community features launched', '50% satisfaction increase'],
    tech: ['Community Management', 'Analytics', 'Feature Prioritization'],
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen px-8 py-24 font-mono">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-2xl text-[var(--foreground)] mb-2">$ projects</h1>
          <div className="h-px bg-[var(--glass-border)] my-4" />
          <p className="text-[var(--foreground-dim)] text-sm">
            Transforming vision into reality, one product at a time
          </p>
        </motion.div>
        
        {/* Projects List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-12"
        >
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="border border-[var(--glass-border)] p-6 hover:border-[var(--foreground-dim)] transition-colors"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-[var(--foreground)] font-medium">
                  {project.title}
                </h2>
                <span className="text-[var(--foreground-dimmer)] text-xs">
                  {project.year}
                </span>
              </div>
              
              {/* Role */}
              <div className="text-[var(--accent)] text-sm mb-3">
                {project.role}
              </div>
              
              {/* Description */}
              <p className="text-[var(--foreground-dim)] text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              
              {/* Impact */}
              <div className="mb-4">
                <div className="text-[var(--foreground-dimmer)] text-xs mb-2">IMPACT:</div>
                <div className="space-y-1 text-sm text-[var(--foreground-dim)]">
                  {project.impact.map((item, i) => (
                    <div key={i}>• {item}</div>
                  ))}
                </div>
              </div>
              
              {/* Tech */}
              <div>
                <div className="text-[var(--foreground-dimmer)] text-xs mb-2">TECH:</div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-[var(--foreground-dim)] border border-[var(--glass-border)] px-2 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-[var(--glass-border)] text-sm"
        >
          <div className="text-[var(--foreground-dim)]">
            Want to collaborate?{' '}
            <Link href="/contact" className="text-[var(--accent)] hover:underline">
              Get in touch →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
