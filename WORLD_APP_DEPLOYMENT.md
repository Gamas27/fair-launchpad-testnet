# Fair Launchpad - World App Deployment

## Overview
This is a simplified version of the Fair Launchpad designed specifically for World App deployment, featuring only the core journey module.

## Core Journey Module
- **Version**: v1.0.0-world-app
- **Features**: World ID verification → Secure wallet creation → Token launch readiness
- **Optimized for**: World App mini app environment

## Deployment Steps

### 1. Environment Setup
```bash
# Copy the World App package.json
cp package-world-app.json package.json

# Copy the World App next.config
cp next.config.world-app.ts next.config.ts

# Install dependencies
npm install
```

### 2. Environment Variables
Create `.env.local`:
```bash
# World App specific
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here
AUTH_SECRET=your-auth-secret-here

# Core Journey Module
JOURNEY_VERSION=v1
```

### 3. Development
```bash
npm run dev
```

### 4. World App Integration
- The app redirects to `/world-app` which contains the core journey module
- Simplified UI optimized for World App
- No external dependencies on Privy or complex wallet integrations
- Mock World ID verification for testing

## Features

### Core Journey Flow
1. **World ID Verification** - Simulated verification process
2. **Wallet Creation** - Mock secure wallet creation
3. **Journey Complete** - Ready for token operations

### World App Optimizations
- ✅ Simplified UI components
- ✅ No external wallet dependencies
- ✅ Mock authentication flows
- ✅ Optimized for mobile World App
- ✅ Fast loading and minimal bundle size

## Testing

### Local Testing
1. Run `npm run dev`
2. Visit `http://localhost:3000`
3. Should redirect to `/world-app`
4. Test the core journey flow

### World App Testing
1. Deploy to your hosting platform
2. Add domain to World App developer portal
3. Test in World App environment

## File Structure
```
src/
├── modules/
│   └── core-journey/
│       ├── world-app.tsx          # World App optimized version
│       ├── v1.tsx                 # Full version
│       └── index.ts               # Version switcher
├── app/
│   ├── world-app/
│   │   └── page.tsx               # World App main page
│   └── page.tsx                   # Redirects to world-app
```

## Version Management
- **world-app.tsx**: Simplified for World App deployment
- **v1.tsx**: Full featured version for development
- **v2.tsx**: Future iterations

Switch versions by changing `JOURNEY_VERSION` in environment variables.

## Next Steps
1. Test locally with `npm run dev`
2. Deploy to hosting platform
3. Configure World App integration
4. Test in World App environment
5. Iterate based on feedback

## Troubleshooting
- If redirect doesn't work, check the router implementation
- If components don't load, verify the module imports
- If styling is broken, check Tailwind CSS configuration

