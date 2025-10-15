'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { asciiArt } from '@/lib/ascii-generator';

interface AsciiAnimationProps {
  type: keyof typeof asciiArt;
  className?: string;
  animate?: boolean;
}

export default function AsciiAnimation({ 
  type, 
  className = '',
  animate = true 
}: AsciiAnimationProps) {
  const [content, setContent] = useState('');
  
  useEffect(() => {
    const art = asciiArt[type];
    if (typeof art === 'string') {
      setContent(art);
    } else if (Array.isArray(art)) {
      let index = 0;
      const interval = setInterval(() => {
        setContent(art[index]);
        index = (index + 1) % art.length;
      }, 100);
      return () => clearInterval(interval);
    }
  }, [type]);
  
  return (
    <motion.pre
      className={`ascii-text ${animate ? 'ascii-animate' : ''} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {content}
    </motion.pre>
  );
}

