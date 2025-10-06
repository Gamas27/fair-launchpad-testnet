# System Architecture Overview

## 🏗️ High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   World App     │    │   Frontend      │    │   Smart         │
│   (Mobile)      │◄──►│   (Next.js)     │◄──►│   Contracts     │
│                 │    │                 │    │   (Solidity)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   World ID      │    │   Database      │    │   World Chain  │
│   (Verification)│    │   (Prisma)      │    │   (Blockchain)  │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 Core Components

### **1. Frontend (Next.js)**
- **Framework**: Next.js 15.2.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Bundle Size**: 115kB

### **2. Smart Contracts (Solidity)**
- **Language**: Solidity 0.8.28
- **Framework**: Foundry
- **Libraries**: OpenZeppelin v5
- **Network**: World Chain Sepolia
- **Gas Optimization**: via-IR enabled

### **3. World App Integration**
- **Platform**: World App Mini App
- **Authentication**: World ID
- **Wallets**: Privy embedded wallets
- **Mobile**: Optimized for mobile devices

### **4. Database (Prisma)**
- **ORM**: Prisma
- **Database**: SQLite (local), PostgreSQL (production)
- **Migrations**: Automated
- **Schema**: Type-safe

## 🔄 Data Flow

### **User Journey Flow**
```
1. World ID Verification
   ↓
2. Wallet Creation (Privy)
   ↓
3. Token Launch (Smart Contract)
   ↓
4. Bonding Curve Interaction
   ↓
5. Graduation to Uniswap
```

### **Smart Contract Flow**
```
1. Token Creation (TokenFactory)
   ↓
2. Bonding Curve Launch (BondingCurveMinimal)
   ↓
3. Price Discovery (Exponential Curve)
   ↓
4. Graduation Trigger (1000 WLD threshold)
   ↓
5. Uniswap Migration (GraduationHandlerOptimized)
```

## 🛡️ Security Architecture

### **Anti-Bot Protection**
- **World ID**: Human verification required
- **Nullifier Hash**: Prevents double-spending
- **Proof Verification**: Cryptographic proof validation
- **Rate Limiting**: Transaction limits

### **Smart Contract Security**
- **OpenZeppelin**: Battle-tested libraries
- **ReentrancyGuard**: Prevents reentrancy attacks
- **Ownable**: Access control
- **Pausable**: Emergency stops

### **Frontend Security**
- **HTTPS**: Encrypted connections
- **CSP**: Content Security Policy
- **Input Validation**: Client and server-side
- **Rate Limiting**: API protection

## 📊 Performance Architecture

### **Frontend Performance**
- **Code Splitting**: Dynamic imports
- **Tree Shaking**: Remove unused code
- **Image Optimization**: Next.js optimization
- **CDN**: Vercel edge network

### **Smart Contract Performance**
- **Gas Optimization**: Efficient operations
- **Batch Operations**: Multiple transactions
- **Event Logging**: Efficient data storage
- **Upgradeable**: Proxy patterns

### **Database Performance**
- **Indexing**: Optimized queries
- **Connection Pooling**: Efficient connections
- **Caching**: Redis integration
- **Migrations**: Zero-downtime updates

## 🔧 Development Architecture

### **Local Development**
- **Hot Reload**: Fast development
- **Type Safety**: TypeScript
- **Linting**: ESLint + Prettier
- **Testing**: Jest + Foundry

### **Deployment Pipeline**
- **Git**: Version control
- **Vercel**: Frontend deployment
- **Foundry**: Smart contract deployment
- **Monitoring**: Error tracking

### **Environment Management**
- **Development**: Local environment
- **Staging**: Testnet deployment
- **Production**: Mainnet deployment
- **Configuration**: Environment variables

## 📱 Mobile Architecture

### **World App Integration**
- **Mini App**: Native integration
- **Deep Linking**: Seamless navigation
- **Responsive**: Mobile-first design
- **Performance**: <3s load time

### **Touch Interactions**
- **Touch Targets**: 44px minimum
- **Gestures**: Swipe, tap, pinch
- **Accessibility**: Screen reader support
- **Offline**: Basic functionality

## 🎯 Scalability Architecture

### **Horizontal Scaling**
- **CDN**: Global edge network
- **Load Balancing**: Multiple instances
- **Database**: Read replicas
- **Caching**: Redis cluster

### **Vertical Scaling**
- **Memory**: Efficient memory usage
- **CPU**: Optimized algorithms
- **Storage**: Efficient data structures
- **Network**: Optimized requests

## 🔄 Integration Architecture

### **External Services**
- **World ID**: Human verification
- **Privy**: Embedded wallets
- **Uniswap**: DEX integration
- **World Chain**: Blockchain network

### **API Architecture**
- **REST**: Standard HTTP APIs
- **GraphQL**: Efficient queries
- **WebSockets**: Real-time updates
- **Rate Limiting**: API protection

---

**Architecture designed for scalability, security, and performance!** 🚀
