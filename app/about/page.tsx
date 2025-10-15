'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import AsciiAnimation from '@/components/ascii-art/AsciiAnimation';
import Terminal from '@/components/terminal/Terminal';

export default function AboutPage() {
  return (
    <div className="min-h-screen px-4 py-24 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            About Me
          </h1>
          <p className="text-xl text-foreground/60 font-mono">
            Poetic Mover // Vision Maker // Product Strategist
          </p>
        </motion.div>
        
        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Left Column - Bio */}
          <GlassCard delay={0.2}>
            <div className="mb-6">
              <AsciiAnimation 
                type="brain" 
                className="text-[var(--neon-purple)] text-xs mb-6"
              />
            </div>
            
            <h2 className="text-2xl font-bold neon-cyan mb-4">
              Who I Am
            </h2>
            
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                I'm Paris—a Staff Product Manager at Ledger, where I own the 
                tier-one roadmap and transform ambitious visions into shipped 
                realities.
              </p>
              
              <p>
                Based in the city that shares my name, I bring a poetic approach 
                to product management. Every feature is a verse, every sprint is 
                a stanza, and every product is a story waiting to be told.
              </p>
              
              <p>
                My background spans strategic planning, user research, technical 
                architecture, and team leadership. But more than that, I believe 
                in creating products that don't just work—they resonate.
              </p>
              
              <p className="neon-pink font-mono text-sm">
                "Build products that make people feel something."
              </p>
            </div>
          </GlassCard>
          
          {/* Right Column - Philosophy */}
          <GlassCard delay={0.4}>
            <div className="mb-6">
              <AsciiAnimation 
                type="code" 
                className="text-[var(--neon-cyan)] text-xs mb-6"
              />
            </div>
            
            <h2 className="text-2xl font-bold neon-purple mb-4">
              My Philosophy
            </h2>
            
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <div>
                <h3 className="font-mono text-[var(--neon-cyan)] mb-2">
                  → User-Centric Vision
                </h3>
                <p className="text-sm">
                  Every decision starts with the user. Their pain points are my 
                  north star, their joy is my KPI.
                </p>
              </div>
              
              <div>
                <h3 className="font-mono text-[var(--neon-cyan)] mb-2">
                  → Strategic Execution
                </h3>
                <p className="text-sm">
                  Vision without execution is hallucination. I bridge the gap 
                  between what could be and what is.
                </p>
              </div>
              
              <div>
                <h3 className="font-mono text-[var(--neon-cyan)] mb-2">
                  → Collaborative Innovation
                </h3>
                <p className="text-sm">
                  The best products are built by teams, not individuals. I 
                  orchestrate, facilitate, and empower.
                </p>
              </div>
              
              <div>
                <h3 className="font-mono text-[var(--neon-cyan)] mb-2">
                  → Continuous Learning
                </h3>
                <p className="text-sm">
                  The landscape evolves. I evolve with it. Every failure is a 
                  lesson, every success is a stepping stone.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
        
        {/* Skills Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold neon-cyan mb-8 text-center">
            Skills & Expertise
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Product Strategy',
                skills: ['Roadmap Planning', 'Market Analysis', 'Competitive Research', 'Vision Setting'],
                color: 'cyan',
              },
              {
                title: 'Leadership',
                skills: ['Cross-functional Teams', 'Stakeholder Management', 'Agile/Scrum', 'Mentorship'],
                color: 'purple',
              },
              {
                title: 'Technical',
                skills: ['API Design', 'Data Analysis', 'A/B Testing', 'Technical Specs'],
                color: 'pink',
              },
            ].map((category, index) => (
              <GlassCard key={category.title} delay={0.2 + index * 0.1}>
                <h3 className={`text-xl font-bold neon-${category.color} mb-4`}>
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="text-sm text-foreground/70 font-mono">
                      <span className={`text-[var(--neon-${category.color})]`}>▸</span> {skill}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </motion.div>
        
        {/* Values */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <GlassCard>
            <h2 className="text-3xl font-bold neon-purple mb-8 text-center">
              Core Values
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              {[
                { emoji: '🎯', value: 'Focus', desc: 'Ship what matters' },
                { emoji: '🚀', value: 'Speed', desc: 'Move fast, learn faster' },
                { emoji: '💡', value: 'Innovation', desc: 'Push boundaries' },
                { emoji: '🤝', value: 'Collaboration', desc: 'Win together' },
              ].map((item, index) => (
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-3">{item.emoji}</div>
                  <h3 className="text-xl font-bold neon-cyan mb-2">{item.value}</h3>
                  <p className="text-sm text-foreground/60">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
        
        {/* Interactive Terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold neon-cyan mb-8 text-center">
            Interactive Terminal
          </h2>
          <p className="text-center text-foreground/60 mb-8 font-mono">
            Type "help" to explore • Try commands like "about", "skills", "surprise"
          </p>
          <Terminal />
        </motion.div>
      </div>
    </div>
  );
}

