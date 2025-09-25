# 🚀 Quick Testnet Deployment Guide

## One-Command Deployment

Deploy FairLaunch to testnet with a single command:

```bash
npm run deploy:testnet
```

## Manual Deployment Steps

### 1. Setup Environment
```bash
# Copy testnet environment
cp .env.testnet .env.local

# Install dependencies
npm ci
```

### 2. Setup Database
```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed with test data
npm run db:seed
```

### 3. Build & Deploy
```bash
# Build for testnet
npm run testnet:build

# Deploy to Vercel (if you have Vercel CLI)
vercel --prod

# Or deploy to Netlify
netlify deploy --prod --dir=out
```

## Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel --prod
```

### Option 2: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login and deploy
netlify login
netlify deploy --prod --dir=out
```

### Option 3: Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway up
```

## Environment Variables

The testnet environment includes:
- ✅ Testnet database configuration
- ✅ World ID testnet settings
- ✅ Testnet RPC endpoints
- ✅ Debug mode enabled
- ✅ Mock data enabled

## Testing Your Deployment

1. **Check Health**: Visit `/api/health`
2. **Test Features**: Try token creation and trading
3. **Mobile Test**: Test on mobile devices
4. **World ID**: Test World ID verification
5. **Wallet Connect**: Test wallet connections

## Troubleshooting

### Common Issues:
- **Build fails**: Check Node.js version (18+ required)
- **Database errors**: Run `npm run db:generate` and `npm run db:migrate`
- **Environment issues**: Verify `.env.testnet` exists and is properly configured

### Quick Fixes:
```bash
# Reset database
npm run db:reset

# Clean build
rm -rf .next && npm run build

# Check environment
cat .env.testnet
```

## Next Steps

After successful deployment:
1. ✅ Test all features
2. ✅ Share testnet URL
3. ✅ Collect user feedback
4. ✅ Monitor for issues
5. ✅ Prepare for mainnet

---

**Ready to deploy? Run `npm run deploy:testnet` and your testnet will be live! 🚀**
