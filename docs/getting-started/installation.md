# Installation Guide

## 📋 Prerequisites

- **Node.js**: v22.10.0+ or v24.0.0+
- **npm**: v10.0.0+
- **Git**: v2.30.0+
- **Vercel CLI**: v32.0.0+ (for deployment)

## 🚀 Installation Steps

### **1. Clone Repository**
```bash
git clone https://github.com/Gamas27/fair-launchpad-testnet.git
cd fair-launchpad-testnet
```

### **2. Install Dependencies**
```bash
# Install frontend dependencies
npm install

# Install smart contract dependencies
cd contracts
npm install
```

### **3. Environment Setup**
```bash
# Copy environment template
cp env.example .env.local

# Edit environment variables
nano .env.local
```

### **4. Database Setup**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push
```

### **5. Development Server**
```bash
# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

## 🔧 Smart Contract Development

### **Foundry Setup**
```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Install dependencies
forge install OpenZeppelin/openzeppelin-contracts
```

### **Compile Contracts**
```bash
cd contracts
forge build
```

### **Run Tests**
```bash
forge test
```

## 📱 Mobile Development

### **World App Testing**
1. **Install World App** on your device
2. **Configure testnet** settings
3. **Test mini app** integration

### **Mobile Optimization**
- **Touch targets**: Minimum 44px
- **Responsive design**: Mobile-first approach
- **Performance**: <3s load time
- **Bundle size**: <200kB

## 🚨 Troubleshooting

### **Common Issues**

#### **Node.js Version Conflicts**
```bash
# Check Node.js version
node --version

# Use Node Version Manager
nvm use 22
# or
fnm use 22
```

#### **Dependency Issues**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### **Database Connection**
```bash
# Check database connection
npx prisma db push
npx prisma studio
```

#### **Build Failures**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## ✅ Verification

### **Frontend**
- [ ] Development server starts
- [ ] All pages load correctly
- [ ] No console errors
- [ ] Mobile responsive

### **Smart Contracts**
- [ ] Contracts compile
- [ ] Tests pass
- [ ] Foundry setup complete
- [ ] Dependencies installed

### **Database**
- [ ] Prisma client generated
- [ ] Database connected
- [ ] Migrations applied
- [ ] Schema up to date

---

**Ready for development!** 🚀
