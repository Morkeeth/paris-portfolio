'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { executeCommand, getCommandSuggestions } from '@/lib/terminal-commands';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { 
      type: 'output', 
      content: 'Welcome to Paris Portfolio Terminal v1.0\nType "help" for available commands.\n' 
    },
  ]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add input to lines
    setLines(prev => [...prev, { type: 'input', content: `$ ${input}` }]);
    
    // Add to command history
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    
    // Execute command
    if (input.toLowerCase() === 'clear') {
      setLines([]);
    } else {
      const result = executeCommand(input);
      if (result.output) {
        setLines(prev => [
          ...prev,
          { type: result.type === 'error' ? 'error' : 'output', content: result.output },
        ]);
      }
    }
    
    setInput('');
    setSuggestions([]);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    if (value) {
      const suggestions = getCommandSuggestions(value);
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      setInput(suggestions[0]);
      setSuggestions([]);
    }
  };
  
  return (
    <motion.div
      className="glass-card w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="border-b border-white/10 px-4 py-3 flex items-center gap-2">
        <span className="font-mono text-sm text-white">
          terminal
        </span>
      </div>
      
      <div
        ref={terminalRef}
        className="p-4 font-mono text-xs h-96 overflow-y-auto custom-scrollbar"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, index) => (
          <div
            key={index}
            className={`mb-1 ${
              line.type === 'input'
                ? 'text-white'
                : line.type === 'error'
                ? 'text-[var(--foreground-dim)]'
                : 'text-[var(--foreground-dim)]'
            }`}
          >
            <pre className="whitespace-pre-wrap break-words font-mono leading-relaxed">
              {line.content}
            </pre>
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
          <span className="text-white">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white"
            autoFocus
            spellCheck={false}
          />
        </form>
        
        {suggestions.length > 0 && (
          <div className="mt-1 text-xs text-[var(--foreground-dimmer)]">
            tab: {suggestions.join(', ')}
          </div>
        )}
      </div>
    </motion.div>
  );
}

