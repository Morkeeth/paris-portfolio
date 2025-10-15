'use client';

import { motion } from 'framer-motion';
import { asciiArt } from '@/lib/ascii-generator';

export default function AsciiLogo() {
  return (
    <motion.pre
      className="ascii-text text-[var(--neon-cyan)] text-xs md:text-sm leading-tight"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {asciiArt.logo}
    </motion.pre>
  );
}

