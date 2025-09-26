# 🎨 Frontend Configuration Guide

## **🔧 Environment Variables Setup**

### **1. Create .env.local File**
```bash
# Copy the example file
cp .env.local.example .env.local
```

### **2. Update Contract Addresses**
```bash
# Replace with your actual deployed addresses
NEXT_PUBLIC_TOKEN_FACTORY_ADDRESS=[YOUR_TOKENFACTORY_ADDRESS]
NEXT_PUBLIC_BONDING_CURVE_ADDRESS=[YOUR_BONDINGCURVE_ADDRESS]
NEXT_PUBLIC_GRADUATION_HANDLER_ADDRESS=[YOUR_GRADUATIONHANDLER_ADDRESS]
```

### **3. Complete Environment Configuration**
```bash
# World Chain Configuration
NEXT_PUBLIC_CHAIN_ID=480
NEXT_PUBLIC_RPC_URL=https://worldchain.worldcoin.org

# Token Addresses (using zero addresses for testing)
NEXT_PUBLIC_WLD_TOKEN_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_WORLD_ID_ADDRESS=0x0000000000000000000000000000000000000000

# Uniswap V3 Addresses (using zero addresses for testing)
NEXT_PUBLIC_UNISWAP_FACTORY_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_UNISWAP_POSITION_MANAGER_ADDRESS=0x0000000000000000000000000000000000000000

# World ID Parameters (for testing)
NEXT_PUBLIC_WORLD_ID_ROOT=0xfe84c495df377d350ac75d4b7981ef4e79248da5b8c9e8858629daf5606c57fb
NEXT_PUBLIC_WORLD_ID_GROUP_ID=1
NEXT_PUBLIC_WORLD_ID_EXTERNAL_NULLIFIER=0xb48c4cd1d468325c72a85fb338783e00a56ed07c8cbcfaa5e5618487a16e3548

# Application Configuration
NEXT_PUBLIC_DEFAULT_INITIAL_PRICE=1000000000000000000
NEXT_PUBLIC_DEFAULT_MAX_SUPPLY=1000000000000000000000000
NEXT_PUBLIC_DEFAULT_GRADUATION_THRESHOLD=1000000000000000000000

# Fee Configuration
NEXT_PUBLIC_CREATION_FEE=100000000000000000
NEXT_PUBLIC_PLATFORM_FEE_PERCENT=10
NEXT_PUBLIC_CREATOR_FEE_PERCENT=7

# Development Configuration
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_LOG_LEVEL=debug
NEXT_PUBLIC_TEST_MODE=true
```

## **📁 Contract ABI Files**

### **1. Create ABI Directory**
```bash
mkdir -p src/lib/abis
```

### **2. Add Contract ABIs**
```bash
# Copy ABI files from Remix or compile
# TokenFactory ABI
# BondingCurveMinimal ABI  
# GraduationHandlerOptimized ABI
```

### **3. Update Contract Configuration**
```typescript
// src/lib/contracts.ts
export const CONTRACTS = {
  TOKEN_FACTORY: {
    address: process.env.NEXT_PUBLIC_TOKEN_FACTORY_ADDRESS!,
    abi: TokenFactoryABI,
  },
  BONDING_CURVE: {
    address: process.env.NEXT_PUBLIC_BONDING_CURVE_ADDRESS!,
    abi: BondingCurveMinimalABI,
  },
  GRADUATION_HANDLER: {
    address: process.env.NEXT_PUBLIC_GRADUATION_HANDLER_ADDRESS!,
    abi: GraduationHandlerOptimizedABI,
  },
};
```

## **🔗 Frontend Integration Steps**

### **1. Update Contract Hooks**
```typescript
// src/hooks/useSmartContracts.ts
export const useTokenFactory = () => {
  const { data: contract } = useContract({
    address: CONTRACTS.TOKEN_FACTORY.address,
    abi: CONTRACTS.TOKEN_FACTORY.abi,
  });
  return contract;
};

export const useBondingCurve = (address: string) => {
  const { data: contract } = useContract({
    address,
    abi: CONTRACTS.BONDING_CURVE.abi,
  });
  return contract;
};
```

### **2. Update Token Creation**
```typescript
// src/components/TokenCreationForm.tsx
const createToken = async (tokenData: TokenData) => {
  const tokenFactory = useTokenFactory();
  
  const tx = await tokenFactory?.createToken(
    tokenData.name,
    tokenData.symbol,
    tokenData.initialPrice,
    tokenData.maxSupply,
    tokenData.worldIdRoot,
    tokenData.worldIdExternalNullifier,
    { value: ethers.utils.parseEther("0.1") }
  );
  
  await tx.wait();
};
```

### **3. Update Token Purchase**
```typescript
// src/components/TokenPurchase.tsx
const purchaseTokens = async (amount: string, proof: any) => {
  const bondingCurve = useBondingCurve(tokenAddress);
  
  const tx = await bondingCurve?.buy(
    ethers.utils.parseEther(amount),
    proof.nullifierHash,
    proof.proof
  );
  
  await tx.wait();
};
```

## **🧪 Testing Frontend Integration**

### **1. Test Token Creation**
- [ ] Open token creation form
- [ ] Fill in token details
- [ ] Submit transaction
- [ ] Verify token creation
- [ ] Check event logs

### **2. Test Token Purchase**
- [ ] Navigate to token page
- [ ] Enter purchase amount
- [ ] Submit World ID proof
- [ ] Verify token purchase
- [ ] Check balance update

### **3. Test Graduation**
- [ ] Monitor graduation progress
- [ ] Verify graduation threshold
- [ ] Check graduation events
- [ ] Verify fee distribution

## **📊 Monitoring & Analytics**

### **1. Event Monitoring**
```typescript
// Monitor contract events
const tokenFactory = useTokenFactory();
tokenFactory?.on("TokenCreated", (tokenId, token, creator, name, symbol) => {
  console.log("New token created:", { tokenId, token, creator, name, symbol });
});
```

### **2. State Management**
```typescript
// Update application state
const [tokens, setTokens] = useState([]);
const [userTokens, setUserTokens] = useState([]);

// Fetch user's tokens
const fetchUserTokens = async () => {
  const tokenCount = await tokenFactory?.getTokenCount();
  // Fetch tokens created by user
};
```

### **3. Error Handling**
```typescript
// Handle contract errors
try {
  const tx = await contract?.function();
  await tx.wait();
} catch (error) {
  console.error("Contract error:", error);
  // Show user-friendly error message
}
```

## **✅ Frontend Checklist**

### **Configuration**
- [ ] Environment variables set
- [ ] Contract addresses updated
- [ ] ABI files added
- [ ] Contract configuration updated

### **Integration**
- [ ] Contract hooks updated
- [ ] Token creation integrated
- [ ] Token purchase integrated
- [ ] Graduation monitoring integrated

### **Testing**
- [ ] Token creation tested
- [ ] Token purchase tested
- [ ] Graduation flow tested
- [ ] Error handling tested

### **User Experience**
- [ ] Loading states added
- [ ] Error messages displayed
- [ ] Success notifications shown
- [ ] Transaction status tracked

---

**Frontend integration ready! 🎨🚀**
