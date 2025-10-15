'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import AsciiAnimation from '@/components/ascii-art/AsciiAnimation';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
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
            Get In Touch
          </h1>
          <p className="text-xl text-foreground/60 font-mono">
            Let's build something amazing together
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard>
              <h2 className="text-2xl font-bold neon-cyan mb-6">
                Send a Message
              </h2>
              
              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="text-6xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold neon-cyan mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-foreground/60">
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                  
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                  
                  <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                  />
                  
                  <TextArea
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, idea, or just say hi..."
                    required
                  />
                  
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => {}}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="loading-spinner w-4 h-4" />
                        Sending...
                      </span>
                    ) : (
                      'Send Message →'
                    )}
                  </Button>
                </form>
              )}
            </GlassCard>
          </motion.div>
          
          {/* Contact Info */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard>
                <AsciiAnimation 
                  type="wave" 
                  className="text-[var(--neon-cyan)] text-xs mb-6"
                />
                
                <h2 className="text-2xl font-bold neon-purple mb-6">
                  Connect With Me
                </h2>
                
                <div className="space-y-6">
                  {/* Email */}
                  <motion.a
                    href="mailto:paris@example.com"
                    className="flex items-center gap-4 p-4 glass rounded-lg hover:glow-cyan transition-all duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="text-2xl">📧</div>
                    <div>
                      <div className="text-sm font-mono text-foreground/40">Email</div>
                      <div className="font-mono text-[var(--neon-cyan)] group-hover:underline">
                        paris@example.com
                      </div>
                    </div>
                  </motion.a>
                  
                  {/* LinkedIn */}
                  <motion.a
                    href="https://linkedin.com/in/paris"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 glass rounded-lg hover:glow-purple transition-all duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="text-2xl">💼</div>
                    <div>
                      <div className="text-sm font-mono text-foreground/40">LinkedIn</div>
                      <div className="font-mono text-[var(--neon-purple)] group-hover:underline">
                        /in/paris-portfolio
                      </div>
                    </div>
                  </motion.a>
                  
                  {/* GitHub */}
                  <motion.a
                    href="https://github.com/paris"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 glass rounded-lg hover:glow-pink transition-all duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="text-2xl">💻</div>
                    <div>
                      <div className="text-sm font-mono text-foreground/40">GitHub</div>
                      <div className="font-mono text-[var(--neon-pink)] group-hover:underline">
                        @paris-portfolio
                      </div>
                    </div>
                  </motion.a>
                  
                  {/* Twitter */}
                  <motion.a
                    href="https://twitter.com/paris"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 glass rounded-lg hover:glow-cyan transition-all duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <div className="text-2xl">🐦</div>
                    <div>
                      <div className="text-sm font-mono text-foreground/40">Twitter/X</div>
                      <div className="font-mono text-[var(--neon-cyan)] group-hover:underline">
                        @paris_builds
                      </div>
                    </div>
                  </motion.a>
                </div>
              </GlassCard>
            </motion.div>
            
            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <GlassCard>
                <h3 className="text-xl font-bold neon-cyan mb-4">
                  Open To
                </h3>
                
                <ul className="space-y-3">
                  {[
                    'Product Management Opportunities',
                    'Strategic Consulting Projects',
                    'Speaking Engagements',
                    'Mentorship & Coaching',
                    'Collaboration & Partnerships',
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-2 text-foreground/80"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <span className="text-[var(--neon-cyan)] mt-1">✓</span>
                      <span className="text-sm">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
            
            {/* Fun Fact */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <GlassCard>
                <AsciiAnimation 
                  type="star" 
                  className="text-[var(--neon-pink)] text-xs mb-4"
                />
                
                <p className="text-sm text-foreground/70 italic">
                  "The best time to plant a tree was 20 years ago. The second 
                  best time is now. The best time to ship a product is yesterday."
                </p>
                <p className="text-xs text-foreground/40 mt-4 font-mono">
                  - Paris, probably
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

