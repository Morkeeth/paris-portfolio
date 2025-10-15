'use client';

const experiences = [
  {
    title: 'staff product manager',
    company: 'ledger',
    period: '2023 - present',
  },
  {
    title: 'senior product manager',
    company: 'ledger',
    period: '2022 - 2023',
  },
  {
    title: 'product manager',
    company: 'tech startup',
    period: '2020 - 2022',
  },
  {
    title: 'associate product manager',
    company: 'digital agency',
    period: '2018 - 2020',
  },
];

export default function ExperiencePage() {
  return (
    <div className="min-h-screen px-8 py-32 font-mono">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl text-white mb-12">experience</h1>
        
        {/* Timeline */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="border-b border-white/10 pb-8 last:border-b-0">
              <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                <div>
                  <h2 className="text-white">{exp.title}</h2>
                  <div className="text-[var(--foreground-dim)] text-sm">{exp.company}</div>
                </div>
                <div className="text-[var(--foreground-dimmer)] text-sm">{exp.period}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'years', value: '7+' },
            { label: 'products', value: '15+' },
            { label: 'teams', value: '20+' },
            { label: 'users', value: '1m+' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-2xl text-white mb-1">{stat.value}</div>
              <div className="text-sm text-[var(--foreground-dim)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
