'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  href?: string;
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '',
  href 
}: ButtonProps) {
  const baseClasses = 'px-6 py-3 font-mono text-sm rounded-lg transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-[var(--neon-cyan)] text-[var(--background)] hover:glow-cyan hover:scale-105',
    secondary: 'glass-card hover:glow-purple text-foreground',
    ghost: 'border border-[var(--glass-border)] hover:border-[var(--neon-cyan)] hover:text-[var(--neon-cyan)]',
  };
  
  const Component = motion.button;
  
  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseClasses} ${variantClasses[variant]} ${className} inline-block`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.a>
    );
  }
  
  return (
    <Component
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </Component>
  );
}

