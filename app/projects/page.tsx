'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import AsciiAnimation from '@/components/ascii-art/AsciiAnimation';

interface Project {
  id: number;
  title: string;
  description: string;
  role: string;
  impact: string[];
  tech: string[];
  year: string;
  color: 'cyan' | 'purple' | 'pink';
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Ledger Tier-1 Roadmap',
    description: 'Leading the strategic product vision for Ledger\'s core platform. Orchestrating cross-functional teams to deliver market-leading crypto solutions that serve millions of users worldwide.',
    role: 'Staff Product Manager',
    impact: [
      'Drove 40% increase in user engagement',
      'Led team of 15+ across engineering, design, and marketing',
      'Shipped 5 major features in 2024',
      'Improved NPS score by 25 points',
    ],
    tech: ['Product Strategy', 'User Research', 'Agile/Scrum', 'Data Analytics', 'Crypto/Web3'],
    year: '2023 - Present',
    color: 'cyan',
  },
  {
    id: 2,
    title: 'Product Innovation Lab',
    description: 'Established internal innovation lab to explore emerging technologies and prototype next-generation features. Focus on user-centric design and rapid experimentation.',
    role: 'Innovation Lead',
    impact: [
      'Created framework for rapid prototyping',
      '10+ concepts validated through user testing',
      '3 concepts moved to production',
      'Reduced time-to-market by 30%',
    ],
    tech: ['Design Thinking', 'Prototyping', 'User Testing', 'MVP Development'],
    year: '2023',
    color: 'purple',
  },
  {
    id: 3,
    title: 'Cross-Platform Harmony',
    description: 'Unified product experience across web, mobile, and desktop platforms. Streamlined user journeys and created consistent design language.',
    role: 'Product Lead',
    impact: [
      'Unified 3 disparate platforms',
      'Reduced support tickets by 45%',
      'Increased cross-platform usage by 60%',
      'Improved development velocity by 35%',
    ],
    tech: ['Platform Strategy', 'API Design', 'Design Systems', 'Cross-functional Leadership'],
    year: '2022',
    color: 'pink',
  },
  {
    id: 4,
    title: 'Community-Driven Features',
    description: 'Built feedback loop between product team and user community. Implemented data-driven prioritization framework based on user needs and market demands.',
    role: 'Product Manager',
    impact: [
      'Established community feedback pipeline',
      'Launched 8 community-requested features',
      'Increased community satisfaction by 50%',
      'Created transparency in roadmap planning',
    ],
    tech: ['Community Management', 'Feature Prioritization', 'Analytics', 'Roadmap Planning'],
    year: '2022',
    color: 'cyan',
  },
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  return (
    <div className="min-h-screen px-4 py-24 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <AsciiAnimation 
            type="rocket" 
            className="text-[var(--neon-cyan)] text-xs mb-6"
          />
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            Featured Projects
          </h1>
          <p className="text-xl text-foreground/60 font-mono">
            Transforming vision into reality, one product at a time
          </p>
        </motion.div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <GlassCard 
              key={project.id} 
              delay={0.2 + index * 0.1}
              className="cursor-pointer"
            >
              <div onClick={() => setSelectedProject(project)}>
                {/* Project Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-2xl font-bold neon-${project.color}`}>
                    {project.title}
                  </h3>
                  <span className="text-xs font-mono text-foreground/40">
                    {project.year}
                  </span>
                </div>
                
                {/* Role */}
                <div className="mb-4">
                  <span className="text-sm font-mono text-[var(--neon-cyan)]">
                    {project.role}
                  </span>
                </div>
                
                {/* Description */}
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="glass text-xs font-mono px-3 py-1 text-foreground/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* View Details Button */}
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedProject(project)}
                >
                  View Details →
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
        
        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <GlassCard>
            <h2 className="text-3xl font-bold neon-purple mb-4">
              Want to collaborate?
            </h2>
            <p className="text-foreground/70 mb-6">
              I'm always open to discussing new projects, creative ideas, or opportunities.
            </p>
            <Button variant="primary" href="/contact">
              Get In Touch
            </Button>
          </GlassCard>
        </motion.div>
      </div>
      
      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedProject(null)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          <motion.div
            className="glass-card max-w-3xl w-full max-h-[80vh] overflow-y-auto relative z-10"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-foreground/60 hover:text-[var(--neon-cyan)] transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            
            {/* Modal Content */}
            <div className="mb-6">
              <h2 className={`text-3xl font-bold neon-${selectedProject.color} mb-2`}>
                {selectedProject.title}
              </h2>
              <span className="text-sm font-mono text-foreground/60">
                {selectedProject.role} • {selectedProject.year}
              </span>
            </div>
            
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              {selectedProject.description}
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold neon-cyan mb-4">Impact & Results</h3>
              <ul className="space-y-3">
                {selectedProject.impact.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-foreground/80"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-[var(--neon-cyan)] mt-1">▸</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold neon-purple mb-4">Technologies & Skills</h3>
              <div className="flex flex-wrap gap-3">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="glass-card px-4 py-2 text-sm font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

