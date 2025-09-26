# 📚 User Guides & Documentation

## **👥 End-User Documentation**

### **1. Getting Started Guide**
```markdown
# How to Create Your First Token

## Step 1: Connect Your Wallet
- Install MetaMask or compatible wallet
- Connect to World Chain network
- Ensure you have WLD tokens for gas

## Step 2: Create a Token
- Click "Create Token" button
- Fill in token details:
  - Name: Your token name
  - Symbol: Token symbol (3-5 characters)
  - Initial Price: Starting price in WLD
  - Max Supply: Maximum token supply
- Pay creation fee (0.1 WLD)
- Confirm transaction

## Step 3: Monitor Your Token
- View bonding curve progress
- Track purchases and price changes
- Monitor graduation progress
- Check fee distribution
```

### **2. Token Purchase Guide**
```markdown
# How to Purchase Tokens

## Step 1: Find a Token
- Browse available tokens
- View token details and bonding curve
- Check current price and supply

## Step 2: Purchase Tokens
- Enter amount to spend
- Complete World ID verification
- Confirm transaction
- Receive tokens in your wallet

## Step 3: Track Your Investment
- Monitor token price changes
- View your token balance
- Track graduation progress
- Check potential returns
```

### **3. World ID Setup Guide**
```markdown
# World ID Verification Setup

## What is World ID?
World ID is a privacy-preserving identity system that ensures one person = one vote.

## How to Get World ID
1. Download World App
2. Complete identity verification
3. Get your World ID credential
4. Use for token purchases

## Why World ID?
- Prevents manipulation
- Ensures fair distribution
- One purchase per person
- Privacy-preserving
```

## **🔧 Developer Documentation**

### **1. API Documentation**
```typescript
// TokenFactory API
interface TokenFactoryAPI {
  createToken(params: TokenCreationParams): Promise<TransactionResult>;
  getToken(tokenId: number): Promise<string>;
  getTokenCount(): Promise<number>;
  isTokenCreated(address: string): Promise<boolean>;
}

// BondingCurve API
interface BondingCurveAPI {
  buy(amount: string, proof: WorldIDProof): Promise<TransactionResult>;
  getBondingCurveState(): Promise<BondingCurveState>;
  hasAddressPurchased(address: string): Promise<boolean>;
  getGraduationProgress(): Promise<number>;
}
```

### **2. Integration Examples**
```typescript
// Example: Create Token
const createToken = async (tokenData: TokenData) => {
  const tokenFactory = useTokenFactory();
  
  const tx = await tokenFactory.createToken(
    tokenData.name,
    tokenData.symbol,
    tokenData.initialPrice,
    tokenData.maxSupply,
    tokenData.worldIdRoot,
    tokenData.worldIdExternalNullifier,
    { value: ethers.utils.parseEther("0.1") }
  );
  
  return await tx.wait();
};

// Example: Purchase Tokens
const purchaseTokens = async (amount: string, proof: WorldIDProof) => {
  const bondingCurve = useBondingCurve(tokenAddress);
  
  const tx = await bondingCurve.buy(
    ethers.utils.parseEther(amount),
    proof.nullifierHash,
    proof.proof
  );
  
  return await tx.wait();
};
```

## **📊 Analytics & Monitoring**

### **1. Platform Analytics**
```typescript
// Track platform metrics
interface PlatformMetrics {
  totalTokens: number;
  totalVolume: number;
  graduationRate: number;
  averagePrice: number;
  userCount: number;
}

// Monitor token performance
interface TokenMetrics {
  currentPrice: number;
  totalRaised: number;
  graduationProgress: number;
  purchaseCount: number;
  uniqueBuyers: number;
}
```

### **2. Event Monitoring**
```typescript
// Monitor contract events
const monitorEvents = () => {
  // Token creation events
  tokenFactory.on('TokenCreated', (tokenId, token, creator, name, symbol) => {
    console.log('New token created:', { tokenId, token, creator, name, symbol });
  });
  
  // Purchase events
  bondingCurve.on('TokensPurchased', (buyer, wldAmount, tokenAmount, newPrice) => {
    console.log('Tokens purchased:', { buyer, wldAmount, tokenAmount, newPrice });
  });
  
  // Graduation events
  bondingCurve.on('Graduated', (uniswapPool, totalRaised, finalPrice) => {
    console.log('Token graduated:', { uniswapPool, totalRaised, finalPrice });
  });
};
```

## **🛠️ Troubleshooting Guide**

### **1. Common Issues**
```markdown
## Issue: "Insufficient funds"
Solution: Ensure you have enough WLD for gas and creation fees

## Issue: "World ID verification failed"
Solution: Check your World ID setup and try again

## Issue: "Transaction failed"
Solution: Check gas limits and try again

## Issue: "Token creation failed"
Solution: Verify all parameters and try again
```

### **2. Error Codes**
```typescript
// Common error codes
const ERROR_CODES = {
  INSUFFICIENT_FUNDS: 'Insufficient funds for transaction',
  WORLD_ID_FAILED: 'World ID verification failed',
  TRANSACTION_FAILED: 'Transaction failed',
  INVALID_PARAMETERS: 'Invalid parameters provided',
  ALREADY_PURCHASED: 'Address already purchased tokens',
  GRADUATION_FAILED: 'Graduation process failed'
};
```

## **📱 Mobile App Features**

### **1. Mobile-Specific Features**
```typescript
// Mobile optimizations
- Touch-friendly interfaces
- Swipe gestures for navigation
- Mobile-optimized charts
- Push notifications
- Offline functionality
```

### **2. Progressive Web App**
```typescript
// PWA features
- Install prompts
- Offline functionality
- Background sync
- Push notifications
- App-like experience
```

## **🎯 User Journey Optimization**

### **1. Onboarding Flow**
```markdown
1. Welcome screen
2. Wallet connection
3. World ID setup
4. First token creation
5. Success celebration
```

### **2. User Retention**
```markdown
- Email notifications
- Push notifications
- Social sharing
- Referral programs
- Community features
```

---

**Comprehensive user documentation ready! 📚🚀**
