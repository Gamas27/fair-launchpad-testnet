# G8 Platform Deployment Guide 🚀

**Complete guide to deploying the G8 platform**

## 🎯 Overview

This guide will walk you through deploying the G8 platform to production. G8 is a next-generation token launchpad with World ID integration, real-time chat, and advanced community features.

## 📋 Prerequisites

### Required Tools
- **Node.js 18+** - JavaScript runtime
- **npm 8+** - Package manager
- **Vercel CLI** - Deployment platform
- **Git** - Version control

### Required Accounts
- **Vercel Account** - For hosting
- **World ID Developer Account** - For identity verification
- **Privy Account** - For wallet management
- **Database Provider** - PostgreSQL or SQLite

## 🔧 Environment Setup

### 1. Clone Repository
```bash
git clone https://github.com/Gamas27/g8-platform.git
cd g8-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
```bash
# Copy environment template
cp .env.example .env.local

# Edit with your configuration
nano .env.local
```

### 4. Required Environment Variables
```bash
# World ID Configuration
NEXT_PUBLIC_WORLD_ID_APP_ID=your_world_id_app_id
NEXT_PUBLIC_WORLD_ID_ACTION_ID=your_world_id_action_id
NEXT_PUBLIC_WORLD_ID_API_KEY=your_world_id_api_key

# Privy Configuration
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
NEXT_PUBLIC_PRIVY_APP_SECRET=your_privy_secret

# Database
DATABASE_URL=your_database_connection_string

# Security
NEXTAUTH_SECRET=your_nextauth_secret_key

# G8 Specific
NEXT_PUBLIC_G8_MODE=true
NEXT_PUBLIC_APP_NAME=G8
NEXT_PUBLIC_APP_VERSION=2.0.0
```

## 🗄️ Database Setup

### 1. Database Migration
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with initial data
npm run db:seed
```

### 2. Database Schema
The G8 platform uses the following main tables:
- **Users** - User profiles and World ID data
- **Tokens** - Token information and metadata
- **Trades** - Trading history and transactions
- **ChatRooms** - Chat room management
- **ChatMessages** - Real-time messaging
- **ReputationHistory** - User reputation tracking

## 🚀 Deployment Options

### Option 1: Automated Deployment (Recommended)

Use the provided deployment script:

```bash
# Make script executable
chmod +x scripts/deploy-g8.sh

# Run deployment
./scripts/deploy-g8.sh
```

### Option 2: Manual Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy with G8 configuration
vercel --prod --config vercel.g8.json
```

### Option 3: Vercel Dashboard Deployment

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your G8 repository

2. **Configure Project**
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build:g8`
   - **Output Directory**: `.next`

3. **Environment Variables**
   - Add all required environment variables
   - Set `NEXT_PUBLIC_G8_MODE=true`
   - Configure World ID and Privy credentials

## 🌐 Domain Configuration

### 1. Custom Domain (Optional)
```bash
# Add custom domain in Vercel dashboard
# Or use Vercel CLI
vercel domains add your-domain.com
```

### 2. SSL Certificate
- Automatically handled by Vercel
- HTTPS enabled by default
- Security headers configured

## 🔒 Security Configuration

### 1. Security Headers
The G8 platform includes comprehensive security headers:
- **X-Frame-Options**: DENY
- **X-Content-Type-Options**: nosniff
- **Referrer-Policy**: strict-origin-when-cross-origin
- **X-XSS-Protection**: 1; mode=block

### 2. Rate Limiting
- API endpoints protected with rate limiting
- User actions throttled appropriately
- DDoS protection enabled

### 3. Input Validation
- All user inputs sanitized
- SQL injection protection
- XSS prevention

## 📊 Performance Optimization

### 1. Bundle Optimization
- Code splitting for G8 components
- Lazy loading for non-critical features
- Tree shaking for unused code

### 2. Caching Strategy
- Static assets cached
- API responses cached appropriately
- CDN distribution via Vercel

### 3. Image Optimization
- WebP format support
- Responsive images
- Lazy loading

## 🧪 Testing Deployment

### 1. Health Check
```bash
# Test main endpoint
curl https://your-g8-domain.vercel.app/g8

# Test API endpoints
curl https://your-g8-domain.vercel.app/api/health
```

### 2. World ID Integration
1. Navigate to `/g8`
2. Test World ID verification flow
3. Verify wallet creation
4. Test token creation

### 3. Chat System
1. Create a test token
2. Join the token chat room
3. Send test messages
4. Verify moderation tools

## 🔧 Post-Deployment Configuration

### 1. World ID Setup
1. **Developer Portal**: Configure your World ID app
2. **Action ID**: Set up verification actions
3. **App ID**: Configure application settings
4. **Testing**: Test verification flow

### 2. Privy Configuration
1. **App Settings**: Configure Privy application
2. **Wallet Types**: Enable supported wallet types
3. **Security**: Configure security settings
4. **Testing**: Test wallet creation

### 3. Database Monitoring
1. **Connection Pooling**: Monitor database connections
2. **Query Performance**: Track slow queries
3. **Backup Strategy**: Set up automated backups
4. **Scaling**: Plan for database scaling

## 📈 Monitoring & Analytics

### 1. Vercel Analytics
- **Performance Metrics**: Core Web Vitals
- **User Analytics**: Usage patterns
- **Error Tracking**: Error monitoring
- **Real-time Monitoring**: Live performance data

### 2. Custom Monitoring
```bash
# Add monitoring endpoints
/api/health          # Health check
/api/metrics         # Performance metrics
/api/status          # System status
```

### 3. Logging
- **Application Logs**: Vercel function logs
- **Error Logs**: Error tracking and reporting
- **Performance Logs**: Performance monitoring
- **Security Logs**: Security event tracking

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Check build logs
vercel logs

# Local build test
npm run build:g8
```

#### 2. Environment Variables
```bash
# Verify environment variables
vercel env ls

# Update environment variables
vercel env add VARIABLE_NAME
```

#### 3. Database Connection
```bash
# Test database connection
npm run db:studio

# Check database status
npm run db:push
```

#### 4. World ID Issues
- Verify World ID app configuration
- Check action ID and app ID
- Test verification flow
- Review World ID logs

### Debug Commands
```bash
# Local development
npm run dev:g8

# Type checking
npm run type-check:g8

# Linting
npm run lint:g8

# Testing
npm run test:g8
```

## 📚 Additional Resources

### Documentation
- [G8 Platform Docs](https://docs.g8-platform.com)
- [World ID Documentation](https://docs.worldcoin.org)
- [Privy Documentation](https://docs.privy.io)
- [Vercel Documentation](https://vercel.com/docs)

### Support
- **GitHub Issues**: [Report Issues](https://github.com/Gamas27/g8-platform/issues)
- **Discord Community**: [Join G8 Discord](https://discord.gg/g8-platform)
- **Email Support**: support@g8-platform.com

### Community
- **Twitter**: [@G8Platform](https://twitter.com/g8platform)
- **GitHub**: [G8 Platform](https://github.com/Gamas27/g8-platform)
- **Discord**: [G8 Community](https://discord.gg/g8-platform)

## 🎉 Success Checklist

- [ ] Repository cloned and dependencies installed
- [ ] Environment variables configured
- [ ] Database set up and migrated
- [ ] World ID integration configured
- [ ] Privy wallet integration configured
- [ ] G8 platform deployed to Vercel
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Health checks passing
- [ ] World ID verification working
- [ ] Chat system functional
- [ ] Token creation working
- [ ] Monitoring configured
- [ ] Documentation updated

## 🚀 Next Steps

After successful deployment:

1. **User Testing**: Invite beta users to test the platform
2. **Feedback Collection**: Gather user feedback and iterate
3. **Feature Development**: Implement additional G8 features
4. **Scaling**: Plan for increased user load
5. **Marketing**: Launch marketing campaigns
6. **Community Building**: Grow the G8 community

---

**🎉 Congratulations! Your G8 platform is now live and ready for the world!**

*For additional support, visit our [GitHub repository](https://github.com/Gamas27/g8-platform) or join our [Discord community](https://discord.gg/g8-platform).*

