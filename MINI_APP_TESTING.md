# 🧪 Mini App Testing Guide

## Quick Start Testing

### Step 1: Get Your App ID

1. Go to [developer.world.org](https://developer.world.org)
2. Sign in with your World ID
3. Create a new app or use existing one
4. Copy your App ID (format: `app_xxxxxxxxxx`)

### Step 2: Configure Environment

Create a `.env.local` file in your project root:

```bash
# Copy the example file
cp .env.example .env.local

# Edit with your App ID
NEXT_PUBLIC_WORLD_ID_APP_ID=your_actual_app_id_here
```

### Step 3: Set Up Local Tunnel

Your app is running on `http://localhost:3000`, but World App needs a public URL.

#### Option A: Using ngrok (Recommended)

```bash
# Install ngrok (if not already installed)
npm install -g ngrok

# In a new terminal, create tunnel
ngrok http 3000

# Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
```

#### Option B: Using Vercel (Alternative)

```bash
# Deploy to Vercel for testing
npm install -g vercel
vercel --prod

# Use the Vercel URL
```

### Step 4: Test with QR Code

1. **Get your public URL** (from ngrok or Vercel)
2. **Go to World App testing page**
3. **Enter your App ID** in the text box
4. **Scan the QR code** with your phone
5. **Confirm in World App**

## 🔧 Testing Checklist

### Basic Functionality
- [ ] App loads in World App
- [ ] World ID verification works
- [ ] Wallet connection works
- [ ] UI is mobile-optimized
- [ ] Navigation works smoothly

### Core Features
- [ ] Token launch flow
- [ ] Trading interface
- [ ] Reputation system
- [ ] Anti-manipulation features
- [ ] User profile management

### World App Integration
- [ ] World ID button appears
- [ ] Verification flow completes
- [ ] Wallet integration works
- [ ] Mini App wrapper detects environment
- [ ] Enhanced features show

## 🐛 Troubleshooting

### Common Issues

#### 1. "App ID not found" Error
```bash
# Check your App ID format
echo $NEXT_PUBLIC_WORLD_ID_APP_ID
# Should be: app_xxxxxxxxxx
```

#### 2. "Connection failed" Error
```bash
# Check if your app is running
curl http://localhost:3000

# Check ngrok tunnel
curl https://your-ngrok-url.ngrok.io
```

#### 3. World ID Not Working
- Verify your App ID is correct
- Check if you're using staging vs production
- Ensure your app is deployed and accessible

#### 4. Mobile Issues
- Test on actual mobile device
- Check responsive design
- Verify touch interactions

### Debug Mode

Add this to your `.env.local` for debugging:

```bash
# Enable debug mode
NEXT_PUBLIC_DEBUG=true
NEXT_PUBLIC_WORLD_APP_MODE=true

# Check console logs
# Open browser dev tools
```

## 📱 Mobile Testing Tips

### Using Eruda for Mobile Debugging

```bash
# Add Eruda to your app for mobile debugging
npm install eruda

# Add to your layout.tsx
import eruda from 'eruda'
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  eruda.init()
}
```

### Mobile-Specific Testing

1. **Test on actual device** (not just browser dev tools)
2. **Check touch interactions**
3. **Verify World App integration**
4. **Test wallet connection**
5. **Check World ID flow**

## 🚀 Production Testing

### Before Submitting

1. **Deploy to production**
2. **Test with real World ID**
3. **Verify all features work**
4. **Check performance**
5. **Test on multiple devices**

### Performance Optimization

```bash
# Build for production
npm run build

# Test production build
npm run start

# Check bundle size
npm run build -- --analyze
```

## 📋 Testing Script

### Automated Testing

```bash
#!/bin/bash
# test-mini-app.sh

echo "🧪 Testing Mini App..."

# Check if app is running
if curl -f -s http://localhost:3000 > /dev/null; then
    echo "✅ App is running"
else
    echo "❌ App is not running. Start with: npm run dev"
    exit 1
fi

# Check environment variables
if [ -z "$NEXT_PUBLIC_WORLD_ID_APP_ID" ]; then
    echo "❌ WORLD_ID_APP_ID not set"
    exit 1
else
    echo "✅ App ID configured: $NEXT_PUBLIC_WORLD_ID_APP_ID"
fi

# Check ngrok tunnel
if curl -f -s https://your-ngrok-url.ngrok.io > /dev/null; then
    echo "✅ Tunnel is working"
else
    echo "❌ Tunnel not working. Start ngrok: ngrok http 3000"
    exit 1
fi

echo "🎉 Ready for testing!"
```

## 🎯 Hackathon Demo Flow

### Demo Script

1. **Open World App** on your phone
2. **Scan QR code** from testing page
3. **Show World ID verification**
4. **Demonstrate wallet connection**
5. **Launch a test token**
6. **Show trading interface**
7. **Display reputation system**
8. **Highlight anti-manipulation features**

### Key Points to Highlight

- **Anti-Bot Protection**: World ID prevents manipulation
- **Fair Launch**: Equal opportunity for all users
- **Seamless UX**: Native World App integration
- **Security**: Multiple protection layers
- **Innovation**: Unique approach to meme coin launches

## 📞 Support

- **World App Docs**: [docs.world.org](https://docs.world.org)
- **World ID Docs**: [docs.worldcoin.org](https://docs.worldcoin.org)
- **Testing Issues**: Check console logs and network tab

## 🏆 Success Tips

1. **Test early and often**
2. **Use real devices for testing**
3. **Have backup plans ready**
4. **Practice your demo flow**
5. **Be ready to explain the value**

Good luck with your hackathon! 🚀
