'use client';

import { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function TextArea({ label, className = '', ...props }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-mono text-sm text-[var(--neon-cyan)]">
          {label}
        </label>
      )}
      <textarea
        className={`glass-card px-4 py-3 bg-transparent text-foreground font-mono text-sm focus:outline-none focus:border-[var(--neon-cyan)] focus:glow-cyan transition-all duration-300 resize-vertical min-h-[120px] ${className}`}
        {...props}
      />
    </div>
  );
}

