# Deployment Guide

## 🚀 Quick Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd "/Users/morkeeth/CODE/Paris Portfolio/paris-portfolio"
   vercel
   ```

4. **For Production**
   ```bash
   vercel --prod
   ```

### Option 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will auto-detect Next.js
5. Click "Deploy"

## 🌐 Other Deployment Options

### Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Install command: `npm install`

### AWS Amplify

1. Connect your repository
2. Build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t paris-portfolio .
docker run -p 3000:3000 paris-portfolio
```

## 🔧 Environment Variables

Before deploying, make sure to set up environment variables:

1. Copy `.env.example` to `.env.local`
2. Update values for your production environment
3. Add environment variables to your deployment platform

### Vercel Environment Variables

```bash
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add NEXT_PUBLIC_SITE_NAME production
```

## ✅ Pre-Deployment Checklist

- [ ] Update personal information in all pages
- [ ] Replace placeholder images
- [ ] Update social media links in contact page
- [ ] Update terminal commands with your info
- [ ] Test all pages locally (`npm run dev`)
- [ ] Run build locally (`npm run build`)
- [ ] Check for TypeScript errors
- [ ] Update README with your information
- [ ] Set up custom domain (optional)

## 🎯 Post-Deployment

1. **Test all pages** on the deployed URL
2. **Check mobile responsiveness**
3. **Test all interactive elements**:
   - Terminal commands
   - Navigation menu
   - Contact form
   - Project modals
4. **Set up analytics** (Google Analytics, Plausible, etc.)
5. **Add custom domain** in Vercel/Netlify settings
6. **Set up SSL** (automatic on Vercel/Netlify)

## 🔄 Continuous Deployment

Once connected to Git:

1. Push to `main` branch
2. Automatic deployment triggered
3. Preview deployments for PRs
4. Production deployment on merge

## 🐛 Troubleshooting

### Build fails

- Check Node.js version (requires 18.18.0+)
- Clear cache: `rm -rf .next node_modules && npm install`
- Check for TypeScript errors: `npm run build`

### Pages not loading

- Check Next.js App Router structure
- Verify all page.tsx files exist
- Check for client/server component issues

### Styles not applying

- Verify Tailwind CSS configuration
- Check globals.css import in layout.tsx
- Clear browser cache

## 📊 Performance Optimization

Implemented optimizations:
- Next.js 15 automatic optimizations
- Image optimization (Next.js Image component ready)
- Font optimization (Google Fonts with display swap)
- CSS minification
- Automatic code splitting

## 🔐 Security

- No sensitive data in client code
- Environment variables properly configured
- HTTPS enforced (via Vercel/Netlify)
- CORS configured if needed

---

**Need help?** Check the [Next.js deployment documentation](https://nextjs.org/docs/deployment)

