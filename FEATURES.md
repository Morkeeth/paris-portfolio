# Portfolio Features Overview

## 🎨 Visual Design

### Glassmorphism UI
```
┌─────────────────────────────────────┐
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░ Transparent glass with blur  ░  │
│  ░ Subtle borders and shadows   ░  │
│  ░ Layered depth effects        ░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
└─────────────────────────────────────┘
```

### Neon Color Palette
```
Cyan:   ████ #00fff9  (Primary actions, highlights)
Purple: ████ #bf00ff  (Secondary elements, accents)
Pink:   ████ #ff006e  (Tertiary accents, special items)
Black:  ████ #0a0a0f  (Background)
White:  ████ #e0e0e0  (Text)
```

### ASCII Art Gallery
```
Logo:
    ██████╗  █████╗ ██████╗ ██╗███████╗
    ██╔══██╗██╔══██╗██╔══██╗██║██╔════╝
    ██████╔╝███████║██████╔╝██║███████╗
    ██╔═══╝ ██╔══██║██╔══██╗██║╚════██║
    ██║     ██║  ██║██║  ██║██║███████║
    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝

Rocket:          Terminal:
    /\           ┌──────────────┐
   /  \          │ paris@$ █   │
  |    |         │             │
  | PM |         │ > shipping  │
 /|    |\        └──────────────┘
```

## 🎭 Interactive Elements

### 1. Particle Field
- 50 floating particles
- Dynamic connections
- Mouse-reactive
- Color-coded (cyan/purple/pink)

### 2. Cursor Trail
- Neon particle trail
- Fades over 500ms
- Throttled for performance
- Mix-blend-mode: screen

### 3. Terminal Emulator
```
$ help
Available commands:
  about      - Learn about Paris
  projects   - View projects
  experience - See experience
  contact    - Get in touch
  surprise   - Special easter egg
  
$ surprise
    🚀 Achievement Unlocked!
```

### 4. Navigation
- Desktop: Floating glass orb
- Mobile: Hamburger menu
- Active link indicators
- Smooth transitions

## 📄 Page Breakdown

### Home (/)
```
Section 1: Hero
├── ASCII Logo (animated)
├── Typewriter text
├── Gradient headline
└── CTA buttons

Section 2: About Preview
├── ASCII rocket
├── Philosophy snippet
└── Learn more link

Section 3: Stats
├── 4 metric cards
├── Animated numbers
└── Glass styling

Section 4: CTA
├── Terminal ASCII
├── Call to action
└── Navigation links
```

### About (/about)
```
├── Header with brain ASCII
├── Bio card (left)
│   ├── Personal story
│   ├── Philosophy
│   └── Quote
├── Values card (right)
│   ├── User-centric
│   ├── Strategic
│   ├── Collaborative
│   └── Learning
├── Skills grid (3 columns)
│   ├── Product Strategy
│   ├── Leadership
│   └── Technical
├── Core values (4 icons)
└── Interactive Terminal
```

### Projects (/projects)
```
├── Header with rocket ASCII
├── Project grid (2 columns)
│   ├── Project card 1
│   ├── Project card 2
│   ├── Project card 3
│   └── Project card 4
├── Modal system
│   ├── Detailed view
│   ├── Impact metrics
│   └── Tech stack
└── Collaboration CTA
```

### Experience (/experience)
```
├── Header with laptop ASCII
├── Timeline (vertical)
│   ├── Staff PM (current)
│   ├── Senior PM
│   ├── PM
│   └── Associate PM
├── Glass nodes on timeline
├── Achievement bullets
├── Skills tags
├── Career stats (4 metrics)
└── Contact CTA
```

### Contact (/contact)
```
├── Header
├── Form (left)
│   ├── Name input
│   ├── Email input
│   ├── Subject input
│   ├── Message textarea
│   └── Submit button
├── Links (right)
│   ├── Email
│   ├── LinkedIn
│   ├── GitHub
│   └── Twitter
├── "Open To" list
└── Quote card
```

## 🎬 Animations

### Page Transitions
- Fade in: 0.8s
- Slide up: 0.6s
- Stagger: 0.1s delay per item

### Hover Effects
```css
Glass Card:
  transform: translateY(-4px) scale(1.02)
  background: rgba(255,255,255,0.08)
  shadow: enhanced glow
  
Button:
  scale: 1.05
  glow: activated
  
Link:
  underline: animated
  color: shift to neon
```

### Scroll Animations
- Reveal on scroll (Framer Motion)
- Parallax effects
- Timeline node animations
- Typewriter effects

## 🖥️ Terminal Commands

### Available Commands
```
help       → Command list
about      → Personal bio with ASCII art
projects   → Project overview with stats
experience → Career timeline
skills     → Skill bars with percentages
contact    → Contact info + social links
surprise   → Easter egg with rocket 🚀
clear      → Clear screen
```

### Terminal Features
- Command history (↑/↓ arrows)
- Auto-complete (Tab key)
- Colored output
- ASCII art responses
- Error handling

## 🎯 Technical Features

### Performance
- Next.js 15 optimizations
- Automatic code splitting
- Image optimization ready
- Font display: swap
- Lazy loading components

### SEO Ready
- Metadata configured
- Semantic HTML
- Accessible navigation
- Fast load times
- Mobile responsive

### Developer Experience
- TypeScript throughout
- Component library
- Utility functions
- Easy customization
- Clear documentation

## 📱 Responsive Design

### Breakpoints
```
Mobile:     < 768px
Tablet:     768px - 1024px
Desktop:    > 1024px
```

### Mobile Adaptations
- Hamburger menu
- Stacked layouts
- Touch-friendly buttons
- Optimized font sizes
- Simplified animations

## 🎨 Customization Points

### Easy to Change
- Colors (globals.css)
- Fonts (layout.tsx)
- ASCII art (ascii-generator.ts)
- Terminal commands (terminal-commands.ts)
- Project data (projects/page.tsx)
- Experience timeline (experience/page.tsx)

### Component Library
```
UI Components:
├── GlassCard     - Reusable glass container
├── Button        - 3 variants (primary/secondary/ghost)
├── Input         - Styled form input
└── TextArea      - Styled text area

ASCII Components:
├── AsciiLogo     - Main logo
├── AsciiAnimation - Dynamic ASCII
└── TypewriterText - Animated typing

Effects:
├── CursorTrail   - Mouse trail
├── ParticleField - Background particles
└── Terminal      - Interactive CLI
```

## 🌟 Unique Selling Points

1. **Not Another Bootstrap Portfolio**
   - Custom design system
   - Unique interactions
   - Memorable aesthetics

2. **Technical Showcase**
   - Modern stack
   - Custom animations
   - Interactive terminal

3. **Personality-Driven**
   - Poetic descriptions
   - ASCII art
   - Easter eggs

4. **Professional + Artistic**
   - Serious content
   - Playful design
   - Balanced approach

## 🎊 Easter Eggs

1. Type `surprise` in terminal
2. Hover over glass cards for 3D tilt
3. Watch particles connect
4. Scroll indicator animation
5. Gradient text on hover

---

**Built with cutting-edge tech and brain-rot vibes for Paris, Staff PM @ Ledger** 🚀

