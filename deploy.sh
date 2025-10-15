#!/bin/bash

echo "🚀 Paris Portfolio - Deploy Script"
echo "=================================="
echo ""
echo "Step 1: Logging in to Vercel..."
echo "This will open your browser for authentication."
echo ""

vercel login

echo ""
echo "Step 2: Deploying to Vercel..."
echo ""

vercel

echo ""
echo "✅ Preview deployment complete!"
echo ""
echo "Step 3: Deploy to production"
echo "Run: vercel --prod"
echo ""
echo "Or push to GitHub and connect to Vercel for auto-deploys!"
