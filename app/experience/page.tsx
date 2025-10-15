'use client';

const experiences = [
  {
    title: 'staff product manager',
    company: 'ledger',
    location: 'paris, france',
    period: '2023 – present',
    description: 'leading tier-one product initiatives for the world\'s leading hardware wallet company.',
    achievements: [
      'own and execute strategic roadmap for core platform serving millions of users',
      'lead cross-functional teams of 15+ across engineering, design, and marketing',
      'shipped 5 major features resulting in 40% increase in user engagement',
      'established product innovation lab for rapid prototyping',
      'improved nps score by 25 points through user-centric improvements',
    ],
  },
  {
    title: 'senior product manager',
    company: 'ledger',
    location: 'paris, france',
    period: '2022 – 2023',
    description: 'drove product development for key platform features and cross-platform initiatives.',
    achievements: [
      'unified user experience across web, mobile (ios/android), and desktop',
      'reduced support tickets by 45% through improved ux and documentation',
      'launched community feedback pipeline connecting users to product team',
      'increased cross-platform user adoption by 60%',
      'built data-driven feature prioritization framework',
    ],
  },
  {
    title: 'product manager',
    company: 'tech startup (stealth)',
    location: 'paris, france',
    period: '2020 – 2022',
    description: 'led product initiatives from 0 to 1, building consumer-facing applications.',
    achievements: [
      'launched 3 products from concept to market',
      'grew user base from 0 to 100k+ in 18 months',
      'established product development processes and culture',
      'managed product lifecycle from discovery through growth',
      'mentored 2 junior product managers',
    ],
  },
  {
    title: 'associate product manager',
    company: 'digital agency',
    location: 'paris, france',
    period: '2018 – 2020',
    description: 'supported product development for client projects across fintech and e-commerce.',
    achievements: [
      'conducted 50+ user interviews and usability studies',
      'created competitive analysis and market research reports',
      'assisted in roadmap planning and sprint coordination',
      'learned fundamentals of product management craft',
    ],
  },
];

export default function ExperiencePage() {
  return (
    <div className="min-h-screen px-8 py-32 font-mono">
      <div className="max-w-2xl mx-auto">
        {/* ASCII Art */}
        <pre className="text-white text-xs mb-8 opacity-30">
{`    ▸ experience.md`}
        </pre>
        
        {/* Header */}
        <h1 className="text-3xl text-white mb-8">experience</h1>
        <p className="text-[var(--foreground-dim)] mb-12 leading-relaxed">
          7+ years building products. from associate to staff. from startups to 
          scale-ups. always learning, always shipping.
        </p>
        
        {/* Timeline */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="border-b border-white/10 pb-12 last:border-b-0">
              {/* Header */}
              <div className="mb-3">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-white text-lg">{exp.title}</h2>
                  <span className="text-[var(--foreground-dimmer)] text-sm whitespace-nowrap ml-4">
                    {exp.period}
                  </span>
                </div>
                <div className="text-[var(--foreground-dim)] text-sm">
                  {exp.company} • {exp.location}
                </div>
              </div>
              
              {/* Description */}
              <p className="text-[var(--foreground-dim)] text-sm mb-4 leading-relaxed">
                {exp.description}
              </p>
              
              {/* Achievements */}
              <div className="space-y-1 text-sm text-[var(--foreground-dim)]">
                {exp.achievements.map((achievement, i) => (
                  <p key={i}><span className="text-white">▸</span> {achievement}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* ASCII Divider */}
        <pre className="text-white text-xs my-16 opacity-20">
{`~∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿~`}
        </pre>
        
        {/* Stats */}
        <div className="border border-white/10 p-8">
          <p className="text-white mb-6 text-sm">by the numbers</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'years in pm', value: '7+' },
              { label: 'products shipped', value: '15+' },
              { label: 'teams led', value: '20+' },
              { label: 'users impacted', value: '1m+' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl text-white mb-1 font-mono">{stat.value}</div>
                <div className="text-xs text-[var(--foreground-dim)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
