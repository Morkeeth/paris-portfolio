'use client';

import { motion } from 'framer-motion';
import Terminal from '@/components/terminal/Terminal';

export default function AboutPage() {
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
          <h1 className="text-2xl text-[var(--foreground)] mb-2">$ about</h1>
          <div className="h-px bg-[var(--glass-border)] my-4" />
        </motion.div>
        
        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-8 text-sm"
        >
          {/* Bio */}
          <section>
            <h2 className="text-[var(--accent)] mb-3">WHO</h2>
            <div className="text-[var(--foreground)] space-y-2 leading-relaxed">
              <p>Paris. Staff Product Manager at Ledger.</p>
              <p>Based in the city that shares my name.</p>
              <p>I own the tier-one roadmap and transform ambitious visions into shipped realities.</p>
            </div>
          </section>
          
          {/* Philosophy */}
          <section>
            <h2 className="text-[var(--accent)] mb-3">PHILOSOPHY</h2>
            <div className="text-[var(--foreground-dim)] space-y-2">
              <p>→ Every decision starts with the user</p>
              <p>→ Vision without execution is hallucination</p>
              <p>→ Best products are built by teams, not individuals</p>
              <p>→ Continuous learning is non-negotiable</p>
            </div>
          </section>
          
          {/* Skills */}
          <section>
            <h2 className="text-[var(--accent)] mb-3">SKILLS</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-[var(--foreground-dim)]">
              <div>Product Strategy</div>
              <div>Roadmap Planning</div>
              <div>Cross-functional Teams</div>
              <div>User Research</div>
              <div>Agile/Scrum</div>
              <div>Data Analysis</div>
              <div>API Design</div>
              <div>Technical Specs</div>
            </div>
          </section>
          
          {/* Values */}
          <section>
            <h2 className="text-[var(--accent)] mb-3">VALUES</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[var(--foreground-dim)]">
              <div>
                <div className="text-[var(--foreground)]">Focus</div>
                <div className="text-xs">Ship what matters</div>
              </div>
              <div>
                <div className="text-[var(--foreground)]">Speed</div>
                <div className="text-xs">Move fast</div>
              </div>
              <div>
                <div className="text-[var(--foreground)]">Innovation</div>
                <div className="text-xs">Push boundaries</div>
              </div>
              <div>
                <div className="text-[var(--foreground)]">Collaboration</div>
                <div className="text-xs">Win together</div>
              </div>
            </div>
          </section>
          
          {/* Quote */}
          <section className="border-l-2 border-[var(--glass-border)] pl-4 italic text-[var(--foreground-dimmer)]">
            "Build products that don't just work—they resonate."
          </section>
        </motion.div>
        
        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16"
        >
          <div className="text-[var(--foreground-dim)] text-xs mb-4">
            // Interactive terminal - try 'help', 'skills', 'surprise'
          </div>
          <Terminal />
        </motion.div>
      </div>
    </div>
  );
}
