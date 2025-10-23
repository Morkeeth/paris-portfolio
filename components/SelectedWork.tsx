import { work } from '@/content/content';

export default function SelectedWork() {
  return (
    <section id="work" className="py-24">
      <div className="max-w-4xl mx-auto px-8">
        <h2 className="text-3xl font-medium mb-12 lowercase">selected work</h2>
        <div className="space-y-8">
          {work.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-white/5"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-medium">{item.company}</h3>
                  <p className="text-[var(--foreground-dim)] text-sm">{item.role}</p>
                </div>
                {item.location && (
                  <span className="text-[var(--foreground-dimmer)] text-xs">{item.location}</span>
                )}
              </div>
              <p className="text-[var(--foreground-dim)] text-sm mb-4">{item.summary}</p>
              <ul className="space-y-2">
                {item.bullets.map((bullet, i) => (
                  <li key={i} className="text-[var(--foreground-dim)] text-sm flex gap-2">
                    <span className="text-[var(--foreground-dimmer)]">→</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

