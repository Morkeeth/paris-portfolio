'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AsciiLogo from '@/components/ascii-art/AsciiLogo';
import TypewriterText from '@/components/ascii-art/TypewriterText';
import AsciiAnimation from '@/components/ascii-art/AsciiAnimation';
import Button from '@/components/ui/Button';
import ParticleField from '@/components/effects/ParticleField';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <ParticleField />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <AsciiLogo />
          </motion.div>
          
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 gradient-text">
              <TypewriterText text="Paris // Staff PM @ Ledger" speed={80} />
            </h1>
          </motion.div>
          
          <motion.p
            className="text-xl md:text-2xl text-foreground/80 mb-4 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            Poetic Mover. Vision Maker. Roadmap Owner.
          </motion.p>
          
          <motion.p
            className="text-lg md:text-xl text-foreground/60 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            Charging the tier-one roadmap with innovation, strategy, and a touch of artistry.
          </motion.p>
          
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.8 }}
          >
            <Link href="/about">
              <Button variant="primary">Explore My Work</Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary">Get In Touch</Button>
            </Link>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              opacity: { delay: 4, duration: 1 },
              y: { repeat: Infinity, duration: 2 },
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono text-[var(--neon-cyan)]">scroll</span>
              <div className="w-px h-12 bg-gradient-to-b from-[var(--neon-cyan)] to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Quick About Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <AsciiAnimation 
                type="rocket" 
                className="text-[var(--neon-purple)] text-xs md:text-sm"
              />
            </div>
            
            <div>
              <motion.h2
                className="text-3xl md:text-5xl font-bold mb-6 neon-cyan"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                What I Do
              </motion.h2>
              
              <motion.p
                className="text-lg text-foreground/80 mb-6 leading-relaxed"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                As a Staff Product Manager at Ledger, I orchestrate the symphony of 
                product strategy, user experience, and technical innovation. My canvas 
                is the roadmap, my medium is collaboration, and my masterpiece is 
                products that resonate.
              </motion.p>
              
              <motion.p
                className="text-lg text-foreground/80 mb-8 leading-relaxed"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                I don't just build features—I craft experiences. I don't just manage 
                products—I tell stories. Every pixel, every interaction, every decision 
                is a brushstroke in the bigger picture.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <Link href="/about">
                  <Button variant="ghost">Learn More →</Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Highlight */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-12 neon-purple"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Tier-One Roadmap Excellence
          </motion.h2>
          
          <motion.div
            className="glass-card p-8 md:p-12 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Products Shipped', value: '15+' },
                { label: 'Users Impacted', value: '1M+' },
                { label: 'Team Synergy', value: '100%' },
                { label: 'Innovation', value: '∞' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
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
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/experience">
              <Button variant="primary">View Experience →</Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="min-h-[50vh] flex items-center justify-center px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AsciiAnimation 
              type="terminal" 
              className="text-[var(--neon-cyan)] text-xs mb-8"
            />
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
              Let's Build Something Amazing
            </h2>
            
            <p className="text-xl text-foreground/80 mb-8 font-mono">
              Open to collaboration, innovation, and new challenges.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/projects">
                <Button variant="secondary">View Projects</Button>
              </Link>
              <Link href="/contact">
                <Button variant="primary">Contact Me</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
