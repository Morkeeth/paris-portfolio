'use client';

import { useState, useRef, useEffect } from 'react';
import { executeCommand, getCommandSuggestions } from '@/lib/terminal-commands';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: 'output',
      content: 'morkeeth terminal v2.0\ntype "help" for commands.\n'
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

    setLines(prev => [...prev, { type: 'input', content: `$ ${input}` }]);
    setCommandHistory(prev => [...prev, input]);
    setHistoryIndex(-1);

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
    setSuggestions(value ? getCommandSuggestions(value) : []);
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
    <div className="border border-[#ddd]">
      <div className="border-b border-[#ddd] px-4 py-2 bg-[#f5f5f0]">
        <span className="text-[#999] text-xs">terminal</span>
      </div>

      <div
        ref={terminalRef}
        className="p-4 bg-[#f5f5f0] text-xs h-72 overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, index) => (
          <div
            key={index}
            className={`mb-1 terminal-line ${
              line.type === 'input'
                ? 'text-[#222]'
                : line.type === 'error'
                ? 'text-[#999] terminal-line--error'
                : 'text-[#666]'
            }`}
          >
            <pre className="whitespace-pre-wrap break-words leading-relaxed">{line.content}</pre>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
          <span className="text-[#999]">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-[#222] caret-[#222]"
            autoFocus
            spellCheck={false}
          />
        </form>

        {suggestions.length > 0 && (
          <div className="mt-1 text-xs text-[#aaa]">
            tab: {suggestions.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
}
