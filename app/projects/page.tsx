'use client';

import Link from 'next/link';

const projects = [
  {
    title: 'ledger tier-1 roadmap',
    year: '2023 – present',
    role: 'staff product manager',
    description: 'leading strategic product vision for ledger\'s core platform, serving millions of crypto users worldwide. driving cross-functional alignment across engineering, design, marketing, and executive teams.',
    impact: [
      '40% increase in user engagement metrics',
      'led team of 15+ across 4 departments',
      'shipped 5 major features in 12 months',
      'improved nps by 25 points',
    ],
    tech: ['product strategy', 'roadmap planning', 'crypto/web3', 'stakeholder management'],
  },
  {
    title: 'product innovation lab',
    year: '2023',
    role: 'innovation lead',
    description: 'established internal innovation lab to explore emerging technologies and rapid-prototype next-generation features. created framework for fast experimentation and validation.',
    impact: [
      'validated 10+ new concepts through user testing',
      'moved 3 concepts to production',
      'reduced time-to-market by 30%',
      'established innovation culture',
    ],
    tech: ['design thinking', 'rapid prototyping', 'user research', 'mvp development'],
  },
  {
    title: 'cross-platform harmony',
    year: '2022',
    role: 'product lead',
    description: 'unified user experience across web, mobile (ios/android), and desktop applications. created consistent design language and streamlined user journeys.',
    impact: [
      'unified 3 disparate platforms',
      'reduced support tickets by 45%',
      'increased cross-platform usage by 60%',
      'improved development velocity by 35%',
    ],
    tech: ['platform strategy', 'design systems', 'api design', 'cross-functional leadership'],
  },
  {
    title: 'community-driven features',
    year: '2022',
    role: 'product manager',
    description: 'built transparent feedback loop between product team and user community. implemented data-driven prioritization framework based on user needs and market demands.',
    impact: [
      'launched 8 community-requested features',
      'increased community satisfaction by 50%',
      'established transparent roadmap process',
      'grew active community by 200%',
    ],
    tech: ['community management', 'analytics', 'feature prioritization', 'roadmap planning'],
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen px-8 py-32 font-mono">
      <div className="max-w-2xl mx-auto">
        {/* ASCII Art */}
        <pre className="text-white text-xs mb-8 opacity-30">
{`    ▸ projects.md`}
        </pre>
        
        {/* Header */}
        <h1 className="text-3xl text-white mb-8">projects</h1>
        <p className="text-[var(--foreground-dim)] mb-12 leading-relaxed">
          a selection of products and initiatives i've led. each represents 
          hundreds of decisions, countless iterations, and the collective effort 
          of exceptional teams.
        </p>
        
        {/* Projects List */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div key={index} className="border-b border-white/10 pb-16 last:border-b-0">
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-white text-xl">{project.title}</h2>
                <span className="text-[var(--foreground-dimmer)] text-sm whitespace-nowrap ml-4">
                  {project.year}
                </span>
              </div>
              
              {/* Role */}
              <div className="text-[var(--foreground-dim)] text-sm mb-4">{project.role}</div>
              
              {/* Description */}
              <p className="text-[var(--foreground-dim)] leading-relaxed mb-6">
                {project.description}
              </p>
              
              {/* Impact */}
              <div className="mb-6">
                <p className="text-white text-sm mb-2">impact</p>
                <div className="space-y-1 text-sm text-[var(--foreground-dim)]">
                  {project.impact.map((item, i) => (
                    <p key={i}><span className="text-white">▸</span> {item}</p>
                  ))}
                </div>
              </div>
              
              {/* Tech */}
              <div>
                <p className="text-[var(--foreground-dimmer)] text-xs mb-2">stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-[var(--foreground-dim)] border border-white/10 px-2 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* ASCII Divider */}
        <pre className="text-white text-xs my-16 opacity-20">
{`~∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿~`}
        </pre>
        
        {/* Footer */}
        <div className="text-[var(--foreground-dim)]">
          <p className="mb-2">interested in collaborating?</p>
          <Link href="/contact" className="text-white hover:underline">
            get in touch →
          </Link>
        </div>
      </div>
    </div>
  );
}
