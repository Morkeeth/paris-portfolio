# Paris Portfolio - 2025 Edition

A cutting-edge personal portfolio featuring ASCII code animations, liquid glass UI, and terminal aesthetics. Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

### Design & Aesthetics
- **Liquid Glass UI** - Glassmorphism with backdrop blur effects
- **ASCII Art Animations** - Dynamic terminal-style animations
- **Neon Glow Effects** - Cyberpunk-inspired color palette (cyan, purple, pink)
- **Particle Field Background** - Interactive animated particles
- **Cursor Trail Effects** - Neon particle trail following cursor
- **Smooth Page Transitions** - Framer Motion animations
- **Custom Scrollbar** - Gradient neon scrollbar
- **Grain Texture Overlay** - Subtle film grain for depth

### Interactive Components
- **Terminal Component** - Interactive CLI with commands (type `help`)
- **Glass Navigation** - Floating glass orb navigation
- **Typewriter Effects** - Animated text reveals
- **Hover Animations** - 3D card tilts and transforms
- **Modal System** - Project detail modals

### Pages
1. **Home** - Hero section with ASCII logo and typewriter intro
2. **About** - Bio, philosophy, skills, interactive terminal
3. **Projects** - Featured projects with modal details
4. **Experience** - Timeline with glass nodes and achievements
5. **Contact** - Contact form and social links

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (CSS-first configuration)
- **Animations:** Framer Motion
- **Fonts:** Geist Sans, JetBrains Mono, Space Mono

## 📦 Installation

```bash
# Clone the repository
cd "/Users/morkeeth/CODE/Paris Portfolio/paris-portfolio"

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Design System

### Color Palette
- **Background:** `#0a0a0f` (Deep space black)
- **Foreground:** `#e0e0e0` (Soft white)
- **Neon Cyan:** `#00fff9`
- **Neon Purple:** `#bf00ff`
- **Neon Pink:** `#ff006e`

### Typography
- **Headers:** JetBrains Mono (terminal vibes)
- **Body:** Geist Sans (clean, modern)
- **Accent:** Space Mono (ASCII elements)

### Glass Morphism
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

## 🎯 Interactive Terminal

The portfolio includes an interactive terminal component. Available commands:

- `help` - List all available commands
- `about` - Learn about Paris
- `projects` - View featured projects
- `experience` - See work experience
- `skills` - Display technical skills
- `contact` - Get contact information
- `surprise` - Easter egg 🥚
- `clear` - Clear terminal

## 📁 Project Structure

```
paris-portfolio/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   └── page.tsx
│   ├── experience/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── GlassCard.tsx
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── TextArea.tsx
│   ├── ascii-art/
│   │   ├── AsciiLogo.tsx
│   │   ├── AsciiAnimation.tsx
│   │   └── TypewriterText.tsx
│   ├── terminal/
│   │   └── Terminal.tsx
│   ├── navigation/
│   │   └── Navigation.tsx
│   └── effects/
│       ├── CursorTrail.tsx
│       └── ParticleField.tsx
├── lib/
│   ├── utils.ts
│   ├── ascii-generator.ts
│   └── terminal-commands.ts
└── public/
```

## 🎭 Customization

### Update Personal Information

1. **Layout** (`app/layout.tsx`)
   - Update metadata (title, description)

2. **Terminal Commands** (`lib/terminal-commands.ts`)
   - Customize command outputs
   - Add new commands

3. **Projects** (`app/projects/page.tsx`)
   - Update project data array
   - Add/remove projects

4. **Experience** (`app/experience/page.tsx`)
   - Update experience timeline
   - Modify achievements

5. **Contact Links** (`app/contact/page.tsx`)
   - Update social media links
   - Change email address

### Custom ASCII Art

Add custom ASCII art in `lib/ascii-generator.ts`:

```typescript
export const asciiArt = {
  // Your custom ASCII art here
  myArt: `
    Custom ASCII
    Art Here
  `,
};
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Deployment

```bash
# Build the application
npm run build

# The output will be in the .next folder
# Deploy the .next folder to your hosting provider
```

## 🎨 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 📝 License

MIT License - Feel free to use this as a template for your own portfolio!

## 🙏 Credits

- **Design Inspiration:** The Way of Code, Modern glassmorphism trends
- **Fonts:** Google Fonts (Geist, JetBrains Mono, Space Mono)
- **Animations:** Framer Motion
- **Framework:** Next.js

## 🌟 Features to Add (Future)

- [ ] Blog section with MDX support
- [ ] Dark/Light mode toggle (currently dark only)
- [ ] More ASCII art animations
- [ ] 3D background with Three.js
- [ ] Sound effects for interactions
- [ ] Analytics integration
- [ ] CMS integration for content management

---

Built with 💜 by Paris - Staff PM @ Ledger

**Poetic Mover. Vision Maker. Roadmap Owner.**
