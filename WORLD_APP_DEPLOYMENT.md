# World App Mini App Deployment Guide

## 🎯 Hackathon Deployment Checklist

This guide will help you deploy your Fair Launchpad as a World App Mini App for your hackathon submission.

## 📋 Prerequisites

1. **World ID Account**: Sign up at [developer.world.org](https://developer.world.org)
2. **Deployment Platform**: Choose one:
   - Vercel (recommended for Next.js)
   - Netlify
   - AWS S3 + CloudFront
   - Your own server

## 🚀 Quick Deployment (5 minutes)

### Step 1: Environment Setup

Create a `.env.local` file with your World ID credentials:

```bash
# World ID Configuration
NEXT_PUBLIC_WORLD_ID_APP_ID=your_app_id_from_world_org
NEXT_PUBLIC_WORLD_ID_ACTION=verify-human
NEXT_PUBLIC_WORLD_ID_SIGNAL=anti-bot-launchpad

# Deployment
WORLD_APP_DOMAIN=your-domain.com
```

### Step 2: Get World ID App ID

1. Go to [developer.world.org](https://developer.world.org)
2. Create a new app
3. Copy your App ID
4. Add it to your `.env.local`

### Step 3: Deploy

#### Option A: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Option B: Using the deployment script

```bash
# Set your domain
export WORLD_APP_DOMAIN=your-domain.com
export WORLD_ID_APP_ID=your_app_id

# Run deployment
./scripts/deploy-world-app.sh
```

## 🔧 Advanced Configuration

### World App Mini App Features

Your app already includes:

✅ **World ID Integration** - Proof of personhood verification  
✅ **Wallet Integration** - Seamless wallet connection  
✅ **Anti-Manipulation** - Bot detection and prevention  
✅ **Reputation System** - User scoring and achievements  
✅ **Token Launch** - Fair token deployment  
✅ **Trading Interface** - Secure trading functionality  

### Mini App Manifest

The app includes a `manifest.json` with:
- PWA capabilities
- World App specific permissions
- Optimized for mobile experience

### World App Detection

The app automatically detects when running in World App and:
- Shows enhanced UI elements
- Enables World App specific features
- Optimizes for mobile experience

## 🧪 Testing Your Mini App

### Local Testing

```bash
# Start development server
npm run dev

# Test World App features
# Visit http://localhost:3000
```

### Production Testing

1. Deploy your app
2. Test World ID verification
3. Test wallet integration
4. Test token launch flow
5. Test trading functionality

## 📱 World App Submission

### Required Information

1. **App Name**: Fair Launchpad
2. **Description**: Anti-bot meme coin launchpad with World ID verification
3. **Category**: Finance/DeFi
4. **Features**: 
   - World ID verification
   - Wallet integration
   - Token launching
   - Anti-manipulation
   - Reputation system

### Submission Checklist

- [ ] App deployed and accessible
- [ ] World ID integration working
- [ ] Wallet connection functional
- [ ] Token launch flow complete
- [ ] Trading interface operational
- [ ] Mobile-optimized UI
- [ ] Manifest.json configured
- [ ] HTTPS enabled
- [ ] Performance optimized

## 🎨 Hackathon Presentation Tips

### Key Features to Highlight

1. **Anti-Bot Protection**: World ID prevents bot manipulation
2. **Fair Launch**: Equal opportunity for all users
3. **Reputation System**: Rewards good actors
4. **Seamless UX**: Native World App integration
5. **Security**: Multiple layers of protection

### Demo Flow

1. **Connect Wallet** - Show seamless connection
2. **Verify Identity** - Demonstrate World ID flow
3. **Launch Token** - Create a new token
4. **Trade Tokens** - Show trading interface
5. **Reputation** - Display user reputation

## 🚨 Common Issues & Solutions

### World ID Not Working

```bash
# Check your App ID
echo $NEXT_PUBLIC_WORLD_ID_APP_ID

# Verify environment variables
npm run dev
```

### Deployment Issues

```bash
# Check build
npm run build

# Test locally
npm run start
```

### Mobile Issues

- Ensure responsive design
- Test touch interactions
- Verify PWA features

## 📞 Support

- **World App Docs**: [docs.world.org](https://docs.world.org)
- **World ID Docs**: [docs.worldcoin.org](https://docs.worldcoin.org)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

## 🏆 Hackathon Success Tips

1. **Focus on UX**: Make it intuitive and fast
2. **Show Innovation**: Highlight unique anti-bot features
3. **Demo Smoothly**: Practice your demo flow
4. **Explain Value**: Why this solves a real problem
5. **Be Ready**: Have backup plans for technical issues

## 🎯 Final Checklist

- [ ] App deployed and working
- [ ] World ID integration tested
- [ ] Demo flow practiced
- [ ] Presentation ready
- [ ] Backup plan in place

Good luck with your hackathon! 🚀
