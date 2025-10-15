'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import AsciiAnimation from '@/components/ascii-art/AsciiAnimation';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  skills: string[];
}

const experiences: Experience[] = [
  {
    title: 'Staff Product Manager',
    company: 'Ledger',
    period: '2023 - Present',
    description: 'Leading tier-one roadmap initiatives and driving product strategy for core platform features. Managing cross-functional teams and delivering market-leading crypto solutions.',
    achievements: [
      'Own and execute tier-one product roadmap',
      'Lead cross-functional teams of 15+ members',
      'Shipped 5 major features with 40% engagement increase',
      'Improved NPS score by 25 points',
      'Established innovation lab for rapid prototyping',
    ],
    skills: ['Product Strategy', 'Roadmap Planning', 'Team Leadership', 'Stakeholder Management', 'Crypto/Web3', 'Data Analytics'],
  },
  {
    title: 'Senior Product Manager',
    company: 'Ledger',
    period: '2022 - 2023',
    description: 'Drove product development for key platform features. Collaborated with engineering, design, and marketing teams to deliver user-centric solutions.',
    achievements: [
      'Unified cross-platform user experience',
      'Reduced support tickets by 45%',
      'Launched community feedback pipeline',
      'Increased cross-platform usage by 60%',
      'Built data-driven prioritization framework',
    ],
    skills: ['Product Development', 'Cross-Platform Strategy', 'User Research', 'Agile/Scrum', 'API Design'],
  },
  {
    title: 'Product Manager',
    company: 'Tech Startup',
    period: '2020 - 2022',
    description: 'Led product initiatives from conception to launch. Worked closely with users to understand needs and translate them into features.',
    achievements: [
      'Launched 3 successful products from 0 to 1',
      'Grew user base from 0 to 100K+ users',
      'Established product development processes',
      'Built strong relationships with key stakeholders',
      'Mentored junior product managers',
    ],
    skills: ['Product Launch', '0-to-1 Products', 'Growth Strategy', 'User Acquisition', 'Mentorship'],
  },
  {
    title: 'Associate Product Manager',
    company: 'Digital Agency',
    period: '2018 - 2020',
    description: 'Supported senior PMs in product development and strategy. Conducted user research and competitive analysis.',
    achievements: [
      'Conducted 50+ user interviews',
      'Created competitive analysis reports',
      'Assisted in roadmap planning',
      'Coordinated with engineering teams',
      'Learned fundamentals of product management',
    ],
    skills: ['User Research', 'Market Analysis', 'Documentation', 'Coordination', 'Learning'],
  },
];

export default function ExperiencePage() {
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
          <AsciiAnimation 
            type="laptop" 
            className="text-[var(--neon-purple)] text-xs mb-6"
          />
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Experience
          </h1>
          <p className="text-xl text-foreground/60 font-mono">
            A journey of building, shipping, and innovating
          </p>
        </motion.div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-pink)]" />
          
          {/* Experience Cards */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className={`relative ${
                  index % 2 === 0 ? 'md:pr-12 md:ml-auto md:w-1/2' : 'md:pl-12 md:w-1/2'
                } pl-12 md:pl-12`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Timeline Node */}
                <motion.div
                  className={`absolute ${
                    index % 2 === 0 ? 'md:left-auto md:right-0' : 'md:left-0'
                  } left-0 top-8 w-8 h-8 rounded-full bg-[var(--background)] border-2 flex items-center justify-center z-10`}
                  style={{
                    borderColor: index === 0 ? 'var(--neon-cyan)' : index === 1 ? 'var(--neon-purple)' : index === 2 ? 'var(--neon-pink)' : 'var(--neon-cyan)',
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: index === 0 ? 'var(--neon-cyan)' : index === 1 ? 'var(--neon-purple)' : index === 2 ? 'var(--neon-pink)' : 'var(--neon-cyan)',
                      boxShadow: `0 0 10px ${index === 0 ? 'var(--neon-cyan)' : index === 1 ? 'var(--neon-purple)' : index === 2 ? 'var(--neon-pink)' : 'var(--neon-cyan)'}`,
                    }}
                  />
                </motion.div>
                
                {/* Experience Card */}
                <GlassCard delay={index * 0.2}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold neon-cyan mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-lg font-mono text-[var(--neon-purple)]">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm font-mono text-foreground/40">
                      {exp.period}
                    </span>
                  </div>
                  
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    {exp.description}
                  </p>
                  
                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-sm font-mono text-[var(--neon-cyan)] mb-3">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-foreground/70"
                        >
                          <span className="text-[var(--neon-cyan)] mt-1">▸</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Skills */}
                  <div>
                    <h4 className="text-sm font-mono text-[var(--neon-purple)] mb-3">
                      Skills:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="glass text-xs font-mono px-3 py-1 text-foreground/70"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Stats Section */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <GlassCard>
            <h2 className="text-3xl font-bold neon-purple mb-8 text-center">
              Career Highlights
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Years Experience', value: '7+' },
                { label: 'Products Shipped', value: '15+' },
                { label: 'Teams Led', value: '20+' },
                { label: 'Users Impacted', value: '1M+' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold neon-cyan mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground/60 font-mono">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <GlassCard>
            <h2 className="text-2xl font-bold neon-cyan mb-4">
              Interested in working together?
            </h2>
            <p className="text-foreground/70 mb-6">
              I'm always open to new opportunities and collaborations.
            </p>
            <motion.a
              href="/contact"
              className="inline-block px-6 py-3 font-mono text-sm bg-[var(--neon-cyan)] text-[var(--background)] rounded-lg hover:glow-cyan transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch →
            </motion.a>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}

