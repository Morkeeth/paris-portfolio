# System Requirements

## Node.js Version

**Required:** Node.js 18.18.0 or higher (or Node.js 20+)

**Current System:** Node.js 18.17.1 (needs update)

### How to Update Node.js

#### Using nvm (Node Version Manager) - Recommended

```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install latest LTS version
nvm install --lts

# Use the LTS version
nvm use --lts

# Set as default
nvm alias default node
```

#### Using Homebrew (macOS)

```bash
# Update Homebrew
brew update

# Install Node.js
brew install node

# Or upgrade if already installed
brew upgrade node
```

#### Direct Download

Download from [nodejs.org](https://nodejs.org/) - Use the LTS version (20.x recommended)

## Verify Installation

After updating, verify your Node.js version:

```bash
node --version  # Should show v18.18.0 or higher
npm --version   # Should show compatible npm version
```

## Package Dependencies

All required dependencies are listed in `package.json`:

### Production Dependencies
- **next:** 15.5.5
- **react:** 19.1.0
- **react-dom:** 19.1.0
- **framer-motion:** 12.23.24
- **clsx:** 2.1.1

### Development Dependencies
- **typescript:** ^5
- **@types/node:** ^20
- **@types/react:** ^19
- **@types/react-dom:** ^19
- **tailwindcss:** ^4
- **@tailwindcss/postcss:** ^4

## Browser Requirements

### Minimum Browser Versions
- **Chrome:** 90+
- **Firefox:** 88+
- **Safari:** 14+
- **Edge:** 90+

### Required Browser Features
- ES2020 support
- CSS backdrop-filter
- CSS Grid
- Flexbox
- WebGL (for particle effects)

## Development Environment

### Recommended Setup
- **Editor:** VSCode with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

### Optional Tools
- **Git:** For version control
- **Vercel CLI:** For deployment (`npm i -g vercel`)

## Installation Steps

Once Node.js is updated:

```bash
# Navigate to project
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

## Troubleshooting

### Node Version Issues

If you see "Node.js version required" error:
1. Update Node.js using one of the methods above
2. Close and reopen your terminal
3. Verify version with `node --version`
4. Try again

### Package Installation Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Build Errors

```bash
# Clean Next.js cache
rm -rf .next
npm run build
```

## Performance Notes

- The app uses Framer Motion for animations
- Particle effects may impact performance on older devices
- Consider disabling effects for better performance if needed
- Next.js 15 uses Turbopack for faster builds (requires Node 18.18.0+)

## Deployment Requirements

- **Vercel:** Automatically handles Node.js version
- **Other platforms:** Ensure Node.js 18.18.0+ is available
- Build command: `npm run build`
- Start command: `npm start`
- Output directory: `.next`

---

**Note:** While the current system has Node.js 18.17.1, updating to 18.18.0+ or 20.x is required for building and running the production version of this portfolio.

