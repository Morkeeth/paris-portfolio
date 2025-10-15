export const asciiArt = {
  parisName: `
 ██████╗   █████╗ ██████╗ ██╗███████╗
 ██╔══██╗██╔══██╗██╔══██╗██║██╔════╝
 ██████╔╝███████║██████╔╝██║███████╗
 ██╔═══╝ ██╔══██║██╔══██╗██║╚════██║
 ██║     ██║  ██║██║  ██║██║███████║
 ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝`,

  smallLogo: `
 ___  ___ ___ ___ ___ 
| _ \\/ __| _ \\_ _/ __|
|  _/ (_ |   /| |\\__ \\
|_|  \\___|_|_\\___|___/`,

  arrow: `→`,
  
  box: `
┌─────────────────────────────────────┐
│                                     │
└─────────────────────────────────────┘`,

  rocket: `
    /\\
   /  \\
  |    |
  | PM |
 /|    |\\
/_|____|_\\
  | || |
  |_||_|
   \\  /
    \\/`,

  computer: `
  _______________________
 |  ___________________  |
 | |                   | |
 | |  $ paris@ledger  | |
 | |  > ship()        | |
 | |___________________| |
 |_______________________|
     _[_______]_
 ___[___________]___
|         [_____] []|__
|         [_____] []|  \\
L___________________J   \\
 ___________________    /
/###################\\  /
\\___________________\\/`,

  ledger: `
 ┌─────────────────────┐
 │  L E D G E R        │
 │  ═══════════════    │
 │  Secure • Simple    │
 └─────────────────────┘`,

  tree: `
      *
     /|\\
    / | \\
   /  |  \\
  /   |   \\
 /____|____\\
      |
      |`,

  wave: `
 ~∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿~`,

  separator: `
─────────────────────────────────────────`,

  bullet: `▸`,
  
  check: `✓`,
  
  star: `★`,
  
  // Animated frames for typing effect
  typingFrames: [
    '|',
    '/',
    '─',
    '\\',
  ],
  
  // Loading animation
  loadingFrames: [
    '⠋',
    '⠙',
    '⠹',
    '⠸',
    '⠼',
    '⠴',
    '⠦',
    '⠧',
    '⠇',
    '⠏',
  ],
  
  // Dots for loading
  dotsFrames: [
    '.',
    '..',
    '...',
    '',
  ],
};

export function getRandomAsciiArt(): string {
  const arts = [asciiArt.rocket, asciiArt.computer, asciiArt.tree];
  return arts[Math.floor(Math.random() * arts.length)];
}

export function animateText(text: string, speed: number = 50): Promise<string> {
  return new Promise((resolve) => {
    let result = '';
    let i = 0;
    
    const interval = setInterval(() => {
      if (i < text.length) {
        result += text[i];
        i++;
      } else {
        clearInterval(interval);
        resolve(result);
      }
    }, speed);
  });
}

