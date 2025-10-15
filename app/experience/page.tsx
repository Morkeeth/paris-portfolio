'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Staff Product Manager',
    company: 'Ledger',
    period: '2023 - Present',
    achievements: [
      'Own and execute tier-one product roadmap',
      'Lead cross-functional teams of 15+ members',
      'Shipped 5 major features with 40% engagement increase',
      'Improved NPS score by 25 points',
    ],
  },
  {
    title: 'Senior Product Manager',
    company: 'Ledger',
    period: '2022 - 2023',
    achievements: [
      'Unified cross-platform user experience',
      'Reduced support tickets by 45%',
      'Launched community feedback pipeline',
      'Increased cross-platform usage by 60%',
    ],
  },
  {
    title: 'Product Manager',
    company: 'Tech Startup',
    period: '2020 - 2022',
    achievements: [
      'Launched 3 products from 0 to 1',
      'Grew user base from 0 to 100K+',
      'Established product development processes',
      'Mentored junior product managers',
    ],
  },
  {
    title: 'Associate Product Manager',
    company: 'Digital Agency',
    period: '2018 - 2020',
    achievements: [
      'Conducted 50+ user interviews',
      'Created competitive analysis reports',
      'Assisted in roadmap planning',
      'Learned fundamentals of product management',
    ],
  },
];

export default function ExperiencePage() {
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
          <h1 className="text-2xl text-[var(--foreground)] mb-2">$ experience</h1>
          <div className="h-px bg-[var(--glass-border)] my-4" />
        </motion.div>
        
        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-8"
        >
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-6 border-l border-[var(--glass-border)]">
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[var(--foreground)] rounded-full" />
              
              {/* Content */}
              <div className="pb-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                  <div>
                    <h2 className="text-[var(--foreground)] font-medium">{exp.title}</h2>
                    <div className="text-[var(--accent)] text-sm">{exp.company}</div>
                  </div>
                  <div className="text-[var(--foreground-dimmer)] text-xs">{exp.period}</div>
                </div>
                
                {/* Achievements */}
                <div className="mt-3 space-y-1 text-sm text-[var(--foreground-dim)]">
                  {exp.achievements.map((achievement, i) => (
                    <div key={i}>→ {achievement}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-[var(--glass-border)]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Years', value: '7+' },
              { label: 'Products', value: '15+' },
              { label: 'Teams Led', value: '20+' },
              { label: 'Users', value: '1M+' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl text-[var(--foreground)] mb-1">{stat.value}</div>
                <div className="text-xs text-[var(--foreground-dim)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
