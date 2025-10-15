export interface Command {
  name: string;
  description: string;
  execute: () => CommandResponse;
}

export interface CommandResponse {
  output: string;
  type: 'success' | 'error' | 'info' | 'ascii';
}

export const commands: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'List all available commands',
    execute: () => ({
      output: `
Available commands:
  about      - Learn about Paris
  projects   - View featured projects
  experience - See work experience
  contact    - Get in touch
  skills     - Display technical skills
  surprise   - Something special
  clear      - Clear terminal
  help       - Show this message
      `,
      type: 'info',
    }),
  },
  
  about: {
    name: 'about',
    description: 'Learn about Paris',
    execute: () => ({
      output: `
╔════════════════════════════════════════════╗
║            PARIS // PROFILE.md            ║
╚════════════════════════════════════════════╝

> Role: Staff Product Manager @ Ledger
> Location: Paris, France 🇫🇷
> Vibe: Poetic mover, vision maker, roadmap owner
> Mission: Charging the tier one roadmap with
         innovation, strategy, and a touch of artistry

"Building products isn't just about features—
 it's about crafting experiences that resonate,
 products that move people, strategies that shift
 paradigms."

[Type 'experience' to learn more about my journey]
      `,
      type: 'success',
    }),
  },
  
  projects: {
    name: 'projects',
    description: 'View featured projects',
    execute: () => ({
      output: `
📦 Featured Projects
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Ledger Tier-1 Roadmap
   └─ Strategic product vision & execution
   └─ Cross-functional alignment
   └─ Market-leading crypto solutions

2. Product Innovation Lab
   └─ Research & prototype development
   └─ User-centric design thinking
   └─ Cutting-edge tech exploration

3. [Your Amazing Project Here]
   └─ Description coming soon...

[Visit the Projects page for detailed case studies]
      `,
      type: 'info',
    }),
  },
  
  experience: {
    name: 'experience',
    description: 'See work experience',
    execute: () => ({
      output: `
💼 Work Experience
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

▸ Staff Product Manager @ Ledger
  └─ Leading tier-one roadmap initiatives
  └─ Driving product strategy & vision
  └─ Managing cross-functional teams
  └─ Shipping impactful features

▸ Previous Roles
  └─ Product leadership positions
  └─ Strategic planning & execution
  └─ Innovation & growth initiatives

🎯 Impact: Transforming vision into reality,
          one product at a time.
      `,
      type: 'success',
    }),
  },
  
  skills: {
    name: 'skills',
    description: 'Display technical skills',
    execute: () => ({
      output: `
⚡ Skills & Expertise
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Product Management    ████████████ 100%
Strategic Planning    ████████████ 100%
Roadmap Development   ████████████ 100%
Cross-functional Lead ███████████░  95%
User Research         ██████████░░  90%
Agile/Scrum          ██████████░░  90%
Data Analysis        █████████░░░  85%
Technical Knowledge  ████████░░░░  80%

🧠 Specialties:
  • Crypto/Web3 Products
  • B2C & B2B Platforms
  • Growth & Innovation
  • Team Leadership
      `,
      type: 'info',
    }),
  },
  
  contact: {
    name: 'contact',
    description: 'Get in touch',
    execute: () => ({
      output: `
📬 Get In Touch
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Email:    paris@example.com
LinkedIn: /in/paris-portfolio
GitHub:   @paris-portfolio
Twitter:  @paris_builds

💡 Open to:
  ✓ Product opportunities
  ✓ Collaboration & partnerships
  ✓ Speaking engagements
  ✓ Consulting projects

[Visit the Contact page to send a message]
      `,
      type: 'success',
    }),
  },
  
  surprise: {
    name: 'surprise',
    description: 'Something special',
    execute: () => ({
      output: `
          /\\
         /  \\
        |    |
        | 🚀 |
       /|    |\\
      / |    | \\
     |  ------  |
     |   ||||   |
     |   ||||   |
      \\  ||||  /
       \\ |||| /
        \\||||/
         \\||/
          \\/

    "Stay hungry. Stay foolish.
     Stay shipping." - Paris

🎨 Brain rot mode: ACTIVATED
🌟 Vibes: IMMACULATE
🔥 Energy: INFINITE

[You found the easter egg! 🥚]
      `,
      type: 'ascii',
    }),
  },
  
  clear: {
    name: 'clear',
    description: 'Clear terminal',
    execute: () => ({
      output: '',
      type: 'success',
    }),
  },
};

export function executeCommand(input: string): CommandResponse {
  const trimmedInput = input.trim().toLowerCase();
  
  if (trimmedInput === '') {
    return { output: '', type: 'info' };
  }
  
  const command = commands[trimmedInput];
  
  if (command) {
    return command.execute();
  } else {
    return {
      output: `Command not found: ${input}\nType 'help' for available commands.`,
      type: 'error',
    };
  }
}

export function getCommandSuggestions(input: string): string[] {
  const lowercaseInput = input.toLowerCase();
  return Object.keys(commands).filter((cmd) =>
    cmd.startsWith(lowercaseInput)
  );
}

