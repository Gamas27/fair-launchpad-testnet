# Fair Launchpad - World App Deployment Guide

## 🚀 Deployment to Vercel

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel
- Environment variables configured

### Step 1: Deploy to Vercel

1. **Connect Repository**
```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy from project directory
   vercel --prod
   ```

2. **Environment Variables**
   Set these in Vercel dashboard:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_ENVIRONMENT=production
   NEXT_PUBLIC_API_URL=https://your-app.vercel.app/api
   NEXT_PUBLIC_WORLD_APP_ID=your-world-app-id
   NEXT_PUBLIC_WORLD_APP_SECRET=your-world-app-secret
   ```

### Step 2: World App Integration

1. **World Developer Portal**
   - Go to [World Developer Portal](https://developer.worldcoin.org/)
   - Create new mini app
   - Set deployment URL: `https://your-app.vercel.app/integrated-app`
   - Configure authentication settings

2. **World ID Configuration**
   - Add World ID verification endpoints
   - Configure callback URLs
   - Set up environment variables

### Step 3: Testing

1. **Health Check**
```bash
   curl https://your-app.vercel.app/api/health
   ```

2. **World App Testing**
   - Test in World App sandbox
   - Verify authentication flow
   - Test all modules

### Step 4: Production Setup

1. **Database Integration**
   - Connect to production database
   - Run migrations
   - Configure connection strings

2. **External APIs**
   - Configure blockchain RPC endpoints
   - Set up price feeds
   - Configure external services

## 📱 App URLs

- **Main App**: `/integrated-app`
- **World App**: `/world-app`
- **Health Check**: `/api/health`

## 🔧 Configuration

### Vercel Settings
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Environment Variables
```bash
# Required
NODE_ENV=production
NEXT_PUBLIC_ENVIRONMENT=production

# World App
NEXT_PUBLIC_WORLD_APP_ID=your-id
NEXT_PUBLIC_WORLD_APP_SECRET=your-secret

# Database (future)
DATABASE_URL=your-database-url

# Blockchain
NEXT_PUBLIC_RPC_URL=https://api.mainnet-beta.solana.com
```

## 🚀 Deployment Commands

```bash
# Build and test locally
npm run build
npm run start

# Deploy to Vercel
vercel --prod

# Check deployment status
vercel ls
```

## 📊 Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Health Endpoint**: `/api/health` for status checks
- **Error Tracking**: Vercel error logs

## 🔄 Updates

To update the deployment:
```bash
git add .
git commit -m "Update deployment"
git push origin main
# Vercel will auto-deploy
```

## 🎯 World App Specific

The app is optimized for World App with:
- Dark theme matching World App design
- Core Journey flow
- Bottom tab navigation
- Mobile-first responsive design
- World ID integration ready