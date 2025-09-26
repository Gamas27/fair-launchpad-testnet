# 🚀 Vercel Deployment Guide for FairLaunch

## **Option 1: Vercel Web Interface (Recommended)**

### **Step 1: Prepare for Deployment**
```bash
# Make sure you're in the project root
cd /Users/joaogameiro/Documents/miniapp/fair-launchpad-ui

# Ensure all files are ready
ls -la
```

### **Step 2: Deploy via Vercel Web Interface**
1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login** with GitHub, GitLab, or email
3. **Click "New Project"**
4. **Import Git Repository** or **Drag & Drop** the project folder
5. **Configure Environment Variables:**
   ```
   DATABASE_URL=file:./prisma/testnet.db
   JWT_SECRET=testnet-jwt-secret-key-for-fair-launchpad
   NEXT_PUBLIC_WORLD_ID_APP_ID=app_testnet_fair_launchpad_2024
   NEXT_PUBLIC_WORLD_ID_ACTION=verify-human-testnet
   NEXT_PUBLIC_WORLD_ID_SIGNAL=anti-bot-launchpad-testnet
   NEXT_PUBLIC_WORLD_APP_MODE=testnet
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=testnet_walletconnect_project_id
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   NEXT_PUBLIC_ENVIRONMENT=testnet
   ```
6. **Click "Deploy"**

### **Step 3: Get Your Live URL**
- Vercel will provide a URL like: `https://fair-launchpad-ui.vercel.app`
- Your app will be live in minutes!

---

## **Option 2: Vercel CLI (Alternative)**

### **Step 1: Login to Vercel**
```bash
npx vercel login
```

### **Step 2: Deploy**
```bash
npx vercel --prod --yes
```

### **Step 3: Set Environment Variables**
```bash
npx vercel env add DATABASE_URL
npx vercel env add JWT_SECRET
npx vercel env add NEXT_PUBLIC_WORLD_ID_APP_ID
# ... add all other variables
```

---

## **Option 3: GitHub Integration (Best for Continuous Deployment)**

### **Step 1: Push to GitHub**
```bash
git add .
git commit -m "Deploy FairLaunch testnet"
git push origin main
```

### **Step 2: Connect to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub
4. Select your repository
5. Configure environment variables
6. Deploy!

---

## **🎯 What Happens After Deployment:**

### **✅ Your FairLaunch Testnet Will Have:**
- **Live URL** - Accessible worldwide
- **All Features** - Profile, Launch, Trading, Navigation
- **Mobile Optimized** - Works on all devices
- **Testnet Configuration** - Ready for testing

### **🔗 Test Your Deployment:**
1. **Visit your Vercel URL**
2. **Test all features:**
   - Home page navigation
   - Launch tab (token creation)
   - Trading tab (token selection)
   - Profile tab (user data)
3. **Test on mobile devices**
4. **Share with testers**

### **📱 Mobile Testing:**
- Test on iPhone/Android
- Check responsive design
- Verify all buttons work
- Test navigation between tabs

---

## **🚀 Quick Start Commands:**

```bash
# Option 1: Web Interface (Easiest)
# Just go to vercel.com and drag your project folder

# Option 2: CLI
npx vercel login
npx vercel --prod --yes

# Option 3: GitHub
git add .
git commit -m "Deploy to testnet"
git push origin main
# Then connect to Vercel via web interface
```

---

**🎉 Your FairLaunch testnet will be live in minutes! All features are ready for testing.**
