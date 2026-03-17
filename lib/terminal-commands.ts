export interface CommandResponse {
  output: string;
  type: 'success' | 'error' | 'info' | 'ascii';
}

interface Command {
  name: string;
  description: string;
  execute: () => CommandResponse;
}

function formatSuggestions(input: string): string {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return '';

  const suggestions = Object.keys(commands)
    .filter((cmd) => cmd !== 'clear')
    .filter((cmd) => cmd.startsWith(normalized) || cmd.includes(normalized))
    .slice(0, 4);

  if (normalized.includes('conn') || normalized.includes('reach')) {
    if (!suggestions.includes('contact')) suggestions.unshift('contact');
  }

  if (suggestions.length === 0) return '';
  return `\nDid you mean: ${suggestions.map((s) => `'${s}'`).join(', ')}?`;
}

export const commands: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'List all available commands',
    execute: () => ({
      output: `Available commands:
  about      - About Oscar
  work       - Selected work
  skills     - Skills & expertise
  contact    - Get in touch
  surprise   - Something special
  clear      - Clear terminal
  help       - Show this message`,
      type: 'info',
    }),
  },

  about: {
    name: 'about',
    description: 'About Oscar',
    execute: () => ({
      output: `Oscar Alexander Mörke
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Role:     Staff Product Manager @ Ledger
Location: Paris, France
Focus:    BTC / ETH / SOL wallet experience

Building calm products for wild markets.
Systems that feel simple on the surface
and powerful underneath.

[type 'work' to see selected work]`,
      type: 'success',
    }),
  },

  work: {
    name: 'work',
    description: 'Selected work',
    execute: () => ({
      output: `Selected Work
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Ledger — Staff PM (2023–present)
   Startup time 6s → 3s
   ~$1M revenue recovered
   BTC/ETH/SOL wallet roadmap

2. anotherblock — Founding Product (2021–2023)
   0 → 40k users, $2.1M volume
   Coinbase partnership
   Digital Vinyl (Rihanna, The Weeknd)

3. Contrib — Founder (2020)
   ETH Lisbon winner
   0 → 800 builder community`,
      type: 'info',
    }),
  },

  skills: {
    name: 'skills',
    description: 'Skills & expertise',
    execute: () => ({
      output: `Skills
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Product Strategy     ████████████
Roadmap Ownership    ████████████
Cross-functional     ███████████░
User Research        ██████████░░
Data Analysis        █████████░░░

Domains: crypto, web3, fintech, music tech
Tools:   Linear, Amplitude, Figma, SQL`,
      type: 'info',
    }),
  },

  contact: {
    name: 'contact',
    description: 'Get in touch',
    execute: () => ({
      output: `Contact
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

X: x.com/morkeeth

Open to product roles, advisory,
speaking, and coffee chats.`,
      type: 'success',
    }),
  },

  connect: {
    name: 'connect',
    description: 'Alias for contact',
    execute: () => commands.contact.execute(),
  },

  surprise: {
    name: 'surprise',
    description: 'Something special',
    execute: () => ({
      output: `
    "Stay hungry. Stay foolish.
     Stay shipping."

     — Oscar, somewhere in Paris`,
      type: 'ascii',
    }),
  },

  clear: {
    name: 'clear',
    description: 'Clear terminal',
    execute: () => ({ output: '', type: 'success' }),
  },
};

export function executeCommand(input: string): CommandResponse {
  const cmd = input.trim().toLowerCase();
  if (!cmd) return { output: '', type: 'info' };

  if (commands[cmd]) return commands[cmd].execute();

  return {
    output: `Command not found: ${input}\nType 'help' for available commands.${formatSuggestions(input)}`,
    type: 'error',
  };
}

export function getCommandSuggestions(input: string): string[] {
  const lower = input.toLowerCase();
  return Object.keys(commands).filter((cmd) => cmd.startsWith(lower));
}
