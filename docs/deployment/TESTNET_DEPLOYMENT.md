# FairLaunch Testnet Deployment Guide

## 🚀 Deploying to Testnet

This guide covers deploying the FairLaunch application to testnet environments for testing and validation.

## 📋 Prerequisites

- Node.js 18+ installed
- Git configured
- Testnet RPC endpoints
- Environment variables configured
- Domain/hosting service ready

## 🔧 Environment Configuration

### 1. Testnet Environment Variables

Create `.env.testnet` file:

```bash
# Database
DATABASE_URL="file:./prisma/testnet.db"
JWT_SECRET="your-testnet-jwt-secret-key"

# World ID (Testnet)
NEXT_PUBLIC_WORLD_ID_APP_ID="app_testnet_your_app_id"
NEXT_PUBLIC_WORLD_ID_ACTION="verify-human-testnet"
NEXT_PUBLIC_WORLD_ID_SIGNAL="anti-bot-launchpad-testnet"
NEXT_PUBLIC_WORLD_APP_MODE="testnet"

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="your_walletconnect_project_id"

# Testnet RPC Endpoints
NEXT_PUBLIC_ETHEREUM_RPC_URL="https://sepolia.infura.io/v3/your_api_key"
NEXT_PUBLIC_POLYGON_RPC_URL="https://polygon-mumbai.infura.io/v3/your_api_key"
NEXT_PUBLIC_ARBITRUM_RPC_URL="https://arbitrum-sepolia.infura.io/v3/your_api_key"

# Testnet Contract Addresses
NEXT_PUBLIC_FAIR_LAUNCH_CONTRACT="0x..."
NEXT_PUBLIC_TOKEN_FACTORY_CONTRACT="0x..."

# Deployment
NEXT_PUBLIC_APP_URL="https://your-testnet-domain.com"
NEXT_PUBLIC_ENVIRONMENT="testnet"
```

### 2. Testnet Database Setup

```bash
# Create testnet database
npm run db:generate
npm run db:migrate

# Seed with testnet data
npm run db:seed
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy to Vercel:**
```bash
# Set environment variables
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add NEXT_PUBLIC_WORLD_ID_APP_ID
# ... add all other variables

# Deploy
vercel --prod
```

### Option 2: Netlify

1. **Install Netlify CLI:**
```bash
npm i -g netlify-cli
```

2. **Login and Deploy:**
```bash
netlify login
netlify deploy --prod --dir=out
```

### Option 3: Railway

1. **Connect to Railway:**
```bash
npm i -g @railway/cli
railway login
railway link
```

2. **Deploy:**
```bash
railway up
```

### Option 4: Docker Deployment

1. **Build Docker Image:**
```bash
docker build -t fair-launchpad-testnet .
```

2. **Run Container:**
```bash
docker run -p 3000:3000 \
  -e DATABASE_URL="file:./prisma/testnet.db" \
  -e JWT_SECRET="your-secret" \
  fair-launchpad-testnet
```

## 🔗 Testnet Integration

### 1. Smart Contract Deployment

Deploy contracts to testnet:

```solidity
// Example deployment script
// contracts/deploy/DeployTestnet.sol
pragma solidity ^0.8.19;

import "../FairLaunch.sol";
import "../TokenFactory.sol";

contract DeployTestnet {
    function deploy() public {
        // Deploy FairLaunch contract
        FairLaunch fairLaunch = new FairLaunch();
        
        // Deploy TokenFactory
        TokenFactory tokenFactory = new TokenFactory();
        
        // Set factory in FairLaunch
        fairLaunch.setTokenFactory(address(tokenFactory));
        
        // Emit deployment events
        emit ContractDeployed("FairLaunch", address(fairLaunch));
        emit ContractDeployed("TokenFactory", address(tokenFactory));
    }
}
```

### 2. Update Contract Addresses

Update your environment variables with deployed contract addresses:

```bash
NEXT_PUBLIC_FAIR_LAUNCH_CONTRACT="0x1234..."
NEXT_PUBLIC_TOKEN_FACTORY_CONTRACT="0x5678..."
```

### 3. Testnet RPC Configuration

Configure multiple testnet RPC endpoints for reliability:

```typescript
// src/lib/testnet.ts
export const testnetConfig = {
  ethereum: {
    chainId: 11155111, // Sepolia
    rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL,
    name: 'Ethereum Sepolia'
  },
  polygon: {
    chainId: 80001, // Mumbai
    rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC_URL,
    name: 'Polygon Mumbai'
  },
  arbitrum: {
    chainId: 421614, // Arbitrum Sepolia
    rpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL,
    name: 'Arbitrum Sepolia'
  }
}
```

## 🧪 Testing Checklist

### Pre-Deployment Testing

- [ ] All components render correctly
- [ ] World ID integration works
- [ ] Wallet connection functions
- [ ] Token creation flow works
- [ ] Trading interface functional
- [ ] Database operations successful
- [ ] API endpoints responding
- [ ] Mobile responsiveness verified

### Post-Deployment Testing

- [ ] Domain accessible
- [ ] SSL certificate valid
- [ ] All features working
- [ ] Database persistent
- [ ] External integrations working
- [ ] Performance acceptable
- [ ] Error handling working

## 📊 Monitoring & Analytics

### 1. Error Tracking

Add error tracking service:

```typescript
// src/lib/errorTracking.ts
import { init, captureException } from '@sentry/nextjs'

init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: 'testnet'
})

export const trackError = (error: Error, context?: any) => {
  captureException(error, { extra: context })
}
```

### 2. Analytics

Add analytics tracking:

```typescript
// src/lib/analytics.ts
export const trackEvent = (event: string, properties?: any) => {
  if (typeof window !== 'undefined') {
    // Google Analytics, Mixpanel, etc.
    gtag('event', event, properties)
  }
}
```

## 🔒 Security Considerations

### 1. Environment Security

- Use strong JWT secrets
- Rotate API keys regularly
- Use environment-specific configurations
- Never commit secrets to git

### 2. Database Security

- Use connection pooling
- Implement rate limiting
- Add input validation
- Use prepared statements

### 3. API Security

- Implement CORS properly
- Add rate limiting
- Validate all inputs
- Use HTTPS only

## 🚀 Deployment Commands

### Quick Deploy Script

```bash
#!/bin/bash
# deploy-testnet.sh

echo "🚀 Deploying FairLaunch to Testnet..."

# Build the application
echo "📦 Building application..."
npm run build

# Run tests
echo "🧪 Running tests..."
npm run test

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🔗 Testnet URL: https://your-app.vercel.app"
```

### Database Migration Script

```bash
#!/bin/bash
# migrate-testnet.sh

echo "🗄️ Setting up testnet database..."

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed with test data
npm run db:seed

echo "✅ Database setup complete!"
```

## 📱 Mobile Testing

### 1. PWA Configuration

Ensure PWA works on mobile:

```json
// public/manifest.json
{
  "name": "FairLaunch Testnet",
  "short_name": "FairLaunch",
  "description": "Anti-bot meme coin launchpad - Testnet",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a1a1a",
  "theme_color": "#6366f1"
}
```

### 2. Mobile Optimization

- Test on various devices
- Verify touch interactions
- Check viewport scaling
- Test offline functionality

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy-testnet.yml
name: Deploy to Testnet

on:
  push:
    branches: [testnet]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📞 Support & Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version
   - Verify all dependencies installed
   - Check TypeScript errors

2. **Database Issues**
   - Verify DATABASE_URL format
   - Check Prisma client generation
   - Ensure migrations run successfully

3. **Environment Variables**
   - Verify all required variables set
   - Check variable names match exactly
   - Ensure no typos in values

### Getting Help

- Check deployment logs
- Review error messages
- Test locally first
- Verify environment setup

## 🎯 Next Steps

After successful testnet deployment:

1. **User Testing** - Invite testers to try the platform
2. **Feedback Collection** - Gather user feedback
3. **Bug Fixes** - Address any issues found
4. **Performance Optimization** - Improve speed and reliability
5. **Mainnet Preparation** - Prepare for mainnet deployment

---

**Ready to deploy? Run the deployment script and your FairLaunch testnet will be live! 🚀**
