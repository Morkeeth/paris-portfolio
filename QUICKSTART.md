# Quick Start Guide

Get your portfolio up and running in 5 minutes!

## 🚀 Fast Track

### 1. Update Node.js (Required)

```bash
# Check current version
node --version

# If less than v18.18.0, update:
# Option A: Using nvm (recommended)
nvm install --lts && nvm use --lts

# Option B: Using Homebrew
brew upgrade node
```

### 2. Install & Run

```bash
# Navigate to project
cd "/Users/morkeeth/CODE/Paris Portfolio/paris-portfolio"

# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Open Browser

Visit: **http://localhost:3000**

## ✏️ Quick Customization

### Update Your Name & Title

**File:** `app/page.tsx` (Line 37)
```typescript
<TypewriterText text="Your Name // Your Title" />
```

### Update Projects

**File:** `app/projects/page.tsx` (Line 20+)
```typescript
const projects: Project[] = [
  {
    title: 'Your Project',
    description: 'Your description',
    // ... rest of project data
  },
];
```

### Update Contact Links

**File:** `app/contact/page.tsx` (Lines 90-150)
```typescript
// Update email, LinkedIn, GitHub, Twitter links
```

## 🚢 Deploy in 2 Minutes

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production
vercel --prod
```

## 📝 Interactive Terminal

Try these commands on your site:
- `help` - See all commands
- `about` - About you
- `surprise` - Easter egg 🥚

## 🎨 Color Customization

**File:** `app/globals.css`
```css
:root {
  --neon-cyan: #00fff9;    /* Change me */
  --neon-purple: #bf00ff;  /* Change me */
  --neon-pink: #ff006e;    /* Change me */
}
```

## 📚 Full Guides

- **CUSTOMIZATION.md** - Detailed personalization
- **DEPLOYMENT.md** - Complete deployment guide
- **REQUIREMENTS.md** - System requirements
- **PROJECT_SUMMARY.md** - Full project overview

## 🐛 Issues?

### Build Fails
```bash
# Clear and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### Port 3000 Busy
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

## ✅ Checklist

- [ ] Node.js 18.18.0+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Site loads at localhost:3000
- [ ] Updated personal info
- [ ] Tested on mobile
- [ ] Ready to deploy!

## 🎯 Priority Updates

1. **Must Do:**
   - Update name/title
   - Update contact links
   - Add real projects

2. **Should Do:**
   - Customize bio
   - Update experience
   - Test all pages

3. **Nice to Have:**
   - Change colors
   - Add custom ASCII art
   - Deploy to custom domain

## 🔥 Pro Tip

Start customizing from top to bottom:
1. Home page (`app/page.tsx`)
2. About page (`app/about/page.tsx`)
3. Projects page (`app/projects/page.tsx`)
4. Experience page (`app/experience/page.tsx`)
5. Contact page (`app/contact/page.tsx`)

---

**That's it!** You're ready to build your dope portfolio. 🚀

For detailed help, check the other documentation files.

