# 🚀 GitHub + Vercel Deployment Guide

## **Step 1: Create GitHub Repository**

### **Option A: GitHub Web Interface (Recommended)**
1. **Go to [github.com](https://github.com)**
2. **Click "New Repository"**
3. **Repository Name:** `fair-launchpad-testnet`
4. **Description:** `FairLaunch - Anti-Bot Meme Coin Launchpad Testnet`
5. **Make it Public**
6. **Don't initialize with README** (we already have files)
7. **Click "Create Repository"**

### **Option B: GitHub CLI (if authenticated)**
```bash
gh auth login
gh repo create fair-launchpad-testnet --public --description "FairLaunch - Anti-Bot Meme Coin Launchpad Testnet"
```

---

## **Step 2: Push Code to GitHub**

### **Add Remote and Push:**
```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/fair-launchpad-testnet.git

# Push the code
git branch -M main
git push -u origin main
```

### **Example Commands:**
```bash
# If your GitHub username is "joaogameiro"
git remote add origin https://github.com/joaogameiro/fair-launchpad-testnet.git
git branch -M main
git push -u origin main
```

---

## **Step 3: Deploy to Vercel**

### **Option A: Vercel Web Interface (Easiest)**
1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Import Git Repository**
5. **Select your `fair-launchpad-testnet` repository**
6. **Configure Environment Variables:**
   ```
   DATABASE_URL=file:./prisma/testnet.db
   JWT_SECRET=testnet-jwt-secret-key-for-fair-launchpad
   NEXT_PUBLIC_WORLD_ID_APP_ID=app_testnet_fair_launchpad_2024
   NEXT_PUBLIC_WORLD_ID_ACTION=verify-human-testnet
   NEXT_PUBLIC_WORLD_ID_SIGNAL=anti-bot-launchpad-testnet
   NEXT_PUBLIC_WORLD_APP_MODE=testnet
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=testnet_walletconnect_project_id
   NEXT_PUBLIC_ENVIRONMENT=testnet
   ```
7. **Click "Deploy"**

### **Option B: Vercel CLI (if authenticated)**
```bash
npx vercel --prod --yes
```

---

## **Step 4: Get Your Live URL**

After deployment, you'll get a URL like:
- `https://fair-launchpad-testnet.vercel.app`
- `https://fair-launchpad-testnet-git-main-yourusername.vercel.app`

---

## **🎯 What You'll Have:**

### **✅ Live Testnet Application:**
- **Complete FairLaunch Platform** - All features working
- **Profile System** - User holdings, launched tokens, achievements
- **Token Launch** - Create and deploy tokens
- **Trading Interface** - Buy/sell tokens with charts
- **Mobile Optimized** - Works on all devices
- **World ID Integration** - Anti-bot protection

### **✅ Features Ready for Testing:**
- 🏠 **Home Page** - Landing with feature overview
- 🚀 **Launch Tab** - Token creation form
- 📊 **Trading Tab** - Token selection and trading
- 👤 **Profile Tab** - User data and achievements
- 🔗 **Token DEX Pages** - Individual token pages
- 📱 **Mobile Responsive** - Perfect on all devices

---

## **🚀 Quick Commands Summary:**

```bash
# 1. Create GitHub repo (via web interface)
# 2. Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/fair-launchpad-testnet.git
git branch -M main
git push -u origin main

# 3. Deploy to Vercel (via web interface)
# Go to vercel.com → Import Git Repository → Select your repo → Deploy
```

---

## **📱 Testing Your Deployment:**

1. **Visit your Vercel URL**
2. **Test all navigation tabs**
3. **Test token creation**
4. **Test trading interface**
5. **Test profile page**
6. **Test on mobile devices**
7. **Share with testers**

---

**🎉 Your FairLaunch testnet will be live and ready for testing!**
