export const asciiArt = {
  logo: `
    ██████╗  █████╗ ██████╗ ██╗███████╗
    ██╔══██╗██╔══██╗██╔══██╗██║██╔════╝
    ██████╔╝███████║██████╔╝██║███████╗
    ██╔═══╝ ██╔══██║██╔══██╗██║╚════██║
    ██║     ██║  ██║██║  ██║██║███████║
    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝
  `,
  
  wave: `
    ~∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿~
  `,
  
  laptop: `
      _______________
     |  _________  |
     | |         | |
     | |  >_     | |
     | |_________| |
     |_____________|
    /_______________\\
  `,
  
  rocket: `
          /\\
         /  \\
        |    |
        | PM |
       /|    |\\
      / |    | \\
     |  ------  |
     |   ||||   |
     |   ||||   |
     |   ||||   |
      \\  ||||  /
       \\ |||| /
        \\||||/
         \\||/
          \\/
  `,
  
  brain: `
      .-""""""-.
    .'          '.
   /   O      O   \\
  :                :
  |                |
  :    .------.    :
   \\  '        '  /
    '.          .'
      '-......-'
  `,
  
  code: `
    </>  { code }  </>
    ╔═══════════════╗
    ║  if (cool) {  ║
    ║    ship();    ║
    ║  }            ║
    ╚═══════════════╝
  `,
  
  terminal: `
    ┌─────────────────────────────┐
    │ paris@ledger:~$ █          │
    │                             │
    │ > Building the future...    │
    │ > One product at a time.    │
    │                             │
    └─────────────────────────────┘
  `,
  
  arrow: `
    ────▶
  `,
  
  star: `
       *
      ***
     *****
    *******
     *****
      ***
       *
  `,
  
  spinner: [
    '⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'
  ],
  
  glitch: (text: string) => {
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    return text
      .split('')
      .map((char) => 
        Math.random() > 0.9 
          ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
          : char
      )
      .join('');
  },
  
  matrix: () => {
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01';
    return Array.from({ length: 20 }, () => 
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
  },
};

export function animateAscii(frames: string[], fps: number = 10): () => void {
  let frameIndex = 0;
  const interval = setInterval(() => {
    frameIndex = (frameIndex + 1) % frames.length;
  }, 1000 / fps);
  
  return () => clearInterval(interval);
}

export function createAsciiGradient(width: number, height: number): string {
  const chars = ' .:-=+*#%@';
  let result = '';
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const intensity = Math.floor((x / width) * chars.length);
      result += chars[intensity];
    }
    result += '\n';
  }
  
  return result;
}

export function typewriterEffect(
  text: string, 
  callback: (char: string, index: number) => void, 
  speed: number = 50
): () => void {
  let index = 0;
  const interval = setInterval(() => {
    if (index < text.length) {
      callback(text[index], index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, speed);
  
  return () => clearInterval(interval);
}

