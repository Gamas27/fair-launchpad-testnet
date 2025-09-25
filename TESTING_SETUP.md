# 🧪 Mini App Testing Setup

## Your App ID: `app_de53f401390cd1733bf1375a66ab2b7a`

## Quick Testing Options

### Option 1: Use Your Local Network (Easiest)

Your app is running on `http://192.168.1.125:3000` (from the terminal output).

**Steps:**
1. Make sure your phone is on the same WiFi network
2. Open World App on your phone
3. Go to the testing page
4. Enter your App ID: `app_de53f401390cd1733bf1375a66ab2b7a`
5. For the URL, use: `http://192.168.1.125:3000`
6. Scan the QR code

### Option 2: Deploy to Vercel (Recommended)

```bash
# Login to Vercel
npx vercel login

# Deploy your app
npx vercel --prod

# Copy the URL (e.g., https://your-app.vercel.app)
```

### Option 3: Use Netlify

```bash
# Build your app first
npm run build

# Deploy to Netlify
npx netlify deploy --prod --dir=out

# Copy the URL
```

### Option 4: Use GitHub Pages

```bash
# Build your app
npm run build

# Push to GitHub
git add .
git commit -m "Deploy for testing"
git push

# Enable GitHub Pages in your repo settings
```

## 🎯 Testing Checklist

### Before Testing:
- [ ] App is running on `http://localhost:3000`
- [ ] App ID is set: `app_de53f401390cd1733bf1375a66ab2b7a`
- [ ] Environment variables are configured

### Test Steps:
1. **Open World App** on your phone
2. **Go to testing page**
3. **Enter App ID**: `app_de53f401390cd1733bf1375a66ab2b7a`
4. **Enter URL**: Your deployed URL or `http://192.168.1.125:3000`
5. **Scan QR code**
6. **Test features**:
   - World ID verification
   - Wallet connection
   - Token launch
   - Trading interface

## 🚨 Troubleshooting

### If local network doesn't work:
1. Check firewall settings
2. Try different port
3. Use deployment option

### If World ID doesn't work:
1. Verify App ID is correct
2. Check if you're using staging vs production
3. Ensure app is accessible

### If QR code doesn't work:
1. Make sure URL is accessible
2. Check HTTPS requirement
3. Try different browser

## 🎉 Success!

Once you get the QR code working:
1. **Scan with World App**
2. **Test World ID verification**
3. **Test wallet connection**
4. **Launch a test token**
5. **Try the trading interface**

Your app is ready for the hackathon! 🚀
