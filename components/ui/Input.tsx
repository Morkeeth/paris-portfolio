'use client';

import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-mono text-sm text-[var(--neon-cyan)]">
          {label}
        </label>
      )}
      <input
        className={`glass-card px-4 py-3 bg-transparent text-foreground font-mono text-sm focus:outline-none focus:border-[var(--neon-cyan)] focus:glow-cyan transition-all duration-300 ${className}`}
        {...props}
      />
    </div>
  );
}

