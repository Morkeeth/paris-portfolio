# Customization Guide

This guide will help you personalize the portfolio with your own information, projects, and style.

## 📝 Personal Information

### 1. Site Metadata (`app/layout.tsx`)

Update the metadata with your information:

```typescript
export const metadata: Metadata = {
  title: "Your Name // Your Title",
  description: "Your personal description here",
  keywords: ["Your", "Keywords", "Here"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Your Name // Your Title",
    description: "Your description",
    type: "website",
  },
};
```

### 2. Home Page (`app/page.tsx`)

Update the hero section:

```typescript
// Line ~37: Update typewriter text
<TypewriterText text="Your Name // Your Title" speed={80} />

// Lines ~46-52: Update intro text
<motion.p>Your tagline or description</motion.p>

// Lines ~70-80: Update the "What I Do" section
```

### 3. About Page (`app/about/page.tsx`)

Customize your bio and philosophy:

```typescript
// Lines ~36-54: Update "Who I Am" section
// Lines ~71-105: Update "My Philosophy" section
// Lines ~120-140: Update skills categories
```

## 🎨 Styling & Design

### Colors

Edit `app/globals.css` to change the color scheme:

```css
:root {
  --neon-cyan: #00fff9;      /* Change to your primary color */
  --neon-purple: #bf00ff;    /* Change to your secondary color */
  --neon-pink: #ff006e;      /* Change to your accent color */
}
```

### Fonts

Update fonts in `app/layout.tsx`:

```typescript
import { Your_Font } from "next/font/google";

const yourFont = Your_Font({
  variable: "--font-your-font",
  subsets: ["latin"],
});
```

Then update `app/globals.css` to use your font.

## 📁 Projects

### Add/Edit Projects (`app/projects/page.tsx`)

Modify the `projects` array (starting at line ~15):

```typescript
const projects: Project[] = [
  {
    id: 1,
    title: 'Your Project Title',
    description: 'Detailed description of your project',
    role: 'Your Role',
    impact: [
      'Impact point 1',
      'Impact point 2',
      'Impact point 3',
    ],
    tech: ['Tech 1', 'Tech 2', 'Tech 3'],
    year: '2024',
    color: 'cyan', // or 'purple' or 'pink'
  },
  // Add more projects...
];
```

## 💼 Experience

### Update Experience Timeline (`app/experience/page.tsx`)

Modify the `experiences` array (starting at line ~14):

```typescript
const experiences: Experience[] = [
  {
    title: 'Your Job Title',
    company: 'Company Name',
    period: '2023 - Present',
    description: 'Job description',
    achievements: [
      'Achievement 1',
      'Achievement 2',
    ],
    skills: ['Skill 1', 'Skill 2'],
  },
  // Add more experiences...
];
```

### Update Career Stats (line ~157)

```typescript
{[
  { label: 'Years Experience', value: '5+' },
  { label: 'Products Shipped', value: '10+' },
  { label: 'Teams Led', value: '15+' },
  { label: 'Users Impacted', value: '500K+' },
]}
```

## 📧 Contact Information

### Update Contact Links (`app/contact/page.tsx`)

Lines ~90-150: Update all contact links:

```typescript
// Email (line ~95)
<motion.a href="mailto:your@email.com">

// LinkedIn (line ~110)
<motion.a href="https://linkedin.com/in/yourprofile">

// GitHub (line ~125)
<motion.a href="https://github.com/yourusername">

// Twitter (line ~140)
<motion.a href="https://twitter.com/yourhandle">
```

### Update "Open To" Section (line ~165)

```typescript
{[
  'Your opportunity type 1',
  'Your opportunity type 2',
  'Your opportunity type 3',
]}
```

## 🖥️ Terminal Commands

### Customize Terminal Responses (`lib/terminal-commands.ts`)

Each command has an `execute` function that returns output:

```typescript
about: {
  name: 'about',
  description: 'Learn about you',
  execute: () => ({
    output: `
Your custom about text here.
Can include ASCII art, formatting, etc.
    `,
    type: 'success',
  }),
},
```

### Add New Commands

```typescript
export const commands: Record<string, Command> = {
  // ... existing commands
  
  newcommand: {
    name: 'newcommand',
    description: 'Description of your command',
    execute: () => ({
      output: 'Command output here',
      type: 'success',
    }),
  },
};
```

## 🎭 ASCII Art

### Add Custom ASCII Art (`lib/ascii-generator.ts`)

```typescript
export const asciiArt = {
  // ... existing art
  
  yourArt: `
    Your ASCII
    Art Here
    ┌─────┐
    │ Art │
    └─────┘
  `,
};
```

Use it in components:

```typescript
<AsciiAnimation type="yourArt" className="text-[var(--neon-cyan)]" />
```

## 🌟 Advanced Customization

### Add New Pages

1. Create folder in `app/`: `app/your-page/`
2. Add `page.tsx` in that folder
3. Add navigation link in `components/navigation/Navigation.tsx`

### Modify Animations

Edit Framer Motion properties in components:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
```

### Change Glass Effect Intensity

In `app/globals.css`:

```css
.glass {
  background: rgba(255, 255, 255, 0.05); /* Increase for lighter */
  backdrop-filter: blur(16px); /* Increase for more blur */
}
```

### Disable Cursor Trail

Remove or comment out in `app/layout.tsx`:

```typescript
// <CursorTrail />
```

### Disable Particle Background

Remove from individual pages:

```typescript
// <ParticleField />
```

## 📱 Mobile Optimization

Most components are already responsive, but you can adjust breakpoints in components using Tailwind's responsive prefixes:

```typescript
className="text-sm md:text-base lg:text-lg"
```

## 🎯 SEO Optimization

### Add Sitemap (`app/sitemap.ts`)

```typescript
export default function sitemap() {
  return [
    {
      url: 'https://yoursite.com',
      lastModified: new Date(),
    },
    {
      url: 'https://yoursite.com/about',
      lastModified: new Date(),
    },
    // ... more pages
  ];
}
```

### Add Robots.txt (`app/robots.ts`)

```typescript
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://yoursite.com/sitemap.xml',
  };
}
```

## 🖼️ Adding Images

Place images in `public/` folder and use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src="/your-image.jpg"
  alt="Description"
  width={500}
  height={300}
  className="rounded-lg"
/>
```

## 💡 Tips

1. **Test locally** after each change: `npm run dev`
2. **Check build** before deploying: `npm run build`
3. **Use TypeScript** for type safety
4. **Keep ASCII art** indented consistently
5. **Maintain glass effect** consistency across components
6. **Test on mobile** devices regularly

## 🐛 Common Issues

### Text not showing up
- Check that you're using proper quotes in strings
- Verify no syntax errors in TypeScript

### Animations not working
- Ensure Framer Motion is imported
- Check that component is client component (`'use client'`)

### Styles not applying
- Verify Tailwind classes are correct
- Check that globals.css is imported
- Clear browser cache

---

Need help? Check the main [README.md](./README.md) or [Next.js documentation](https://nextjs.org/docs).

