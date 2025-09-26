# 🚀 Deployed Contract Addresses

## **Contract Deployment Status**

### **✅ Successfully Deployed Contracts**

#### **1. TokenFactory.sol**
- **Address**: `[YOUR_TOKENFACTORY_ADDRESS]`
- **Purpose**: Factory for creating new bonding curve tokens
- **Features**: Token creation, fee management, admin functions
- **Constructor Parameters Used**:
  - `_wldToken`: `0x0000000000000000000000000000000000000000`
  - `_worldId`: `0x0000000000000000000000000000000000000000`

#### **2. BondingCurveMinimal.sol**
- **Address**: `[YOUR_BONDINGCURVE_ADDRESS]`
- **Purpose**: Individual bonding curve contract with World ID verification
- **Features**: World ID verification, token minting, graduation
- **Constructor Parameters Used**:
  - `name`: `[TOKEN_NAME]`
  - `symbol`: `[TOKEN_SYMBOL]`
  - `_wldToken`: `0x0000000000000000000000000000000000000000`
  - `_worldId`: `0x0000000000000000000000000000000000000000`
  - `_initialPrice`: `1000000000000000000` (1 WLD)
  - `_maxSupply`: `1000000000000000000000000` (1M tokens)
  - `_worldIdRoot`: `0xfe84c495df377d350ac75d4b7981ef4e79248da5b8c9e8858629daf5606c57fb`
  - `_worldIdExternalNullifier`: `0xb48c4cd1d468325c72a85fb338783e00a56ed07c8cbcfaa5e5618487a16e3548`

#### **3. GraduationHandlerOptimized.sol**
- **Address**: `[YOUR_GRADUATIONHANDLER_ADDRESS]`
- **Purpose**: Handles graduation from bonding curve to Uniswap V3
- **Features**: LP creation, fee distribution, NFT burning
- **Constructor Parameters Used**:
  - `_token`: `0x0000000000000000000000000000000000000000`
  - `_wldToken`: `0x0000000000000000000000000000000000000000`
  - `_uniswapFactory`: `0x0000000000000000000000000000000000000000`
  - `_positionManager`: `0x0000000000000000000000000000000000000000`
  - `_platformFeeRecipient`: `[YOUR_WALLET_ADDRESS]`
  - `_creatorVestingRecipient`: `[YOUR_WALLET_ADDRESS]`

## **🔧 Frontend Configuration**

### **Environment Variables**
```bash
# Add these to your .env.local file
NEXT_PUBLIC_TOKEN_FACTORY_ADDRESS=[YOUR_TOKENFACTORY_ADDRESS]
NEXT_PUBLIC_BONDING_CURVE_ADDRESS=[YOUR_BONDINGCURVE_ADDRESS]
NEXT_PUBLIC_GRADUATION_HANDLER_ADDRESS=[YOUR_GRADUATIONHANDLER_ADDRESS]
NEXT_PUBLIC_WLD_TOKEN_ADDRESS=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_WORLD_ID_ADDRESS=0x0000000000000000000000000000000000000000
```

### **Contract ABI Files**
- **TokenFactory ABI**: `src/lib/abis/TokenFactory.json`
- **BondingCurveMinimal ABI**: `src/lib/abis/BondingCurveMinimal.json`
- **GraduationHandlerOptimized ABI**: `src/lib/abis/GraduationHandlerOptimized.json`

## **🧪 Testing Checklist**

### **TokenFactory Testing**
- [ ] Test `createToken()` function
- [ ] Verify token deployment
- [ ] Check token registration
- [ ] Test fee collection
- [ ] Verify admin functions

### **BondingCurveMinimal Testing**
- [ ] Test `buy()` function with World ID
- [ ] Verify token minting
- [ ] Check price calculation
- [ ] Test graduation threshold
- [ ] Verify World ID verification

### **GraduationHandlerOptimized Testing**
- [ ] Test `handleGraduation()` function
- [ ] Verify Uniswap pool creation
- [ ] Check fee distribution
- [ ] Test LP NFT burning
- [ ] Verify graduation completion

## **📊 Contract Interaction Flow**

### **1. Token Creation Flow**
```
User → TokenFactory.createToken() → BondingCurveMinimal deployed
```

### **2. Token Purchase Flow**
```
User → BondingCurveMinimal.buy() → World ID verification → Token minting
```

### **3. Graduation Flow**
```
Threshold reached → BondingCurveMinimal._graduate() → GraduationHandlerOptimized.handleGraduation()
```

## **🔍 Monitoring & Analytics**

### **Key Events to Monitor**
- `TokenCreated` - New token created
- `TokensPurchased` - Token purchase events
- `WorldIDVerified` - World ID verification
- `Graduated` - Token graduation
- `UniswapPoolCreated` - Pool creation
- `FeesDistributed` - Fee distribution

### **Important Metrics**
- **Token creation rate**
- **Purchase volume**
- **Graduation rate**
- **Fee collection**
- **World ID verification success rate**

## **🚨 Security Notes**

### **Current Configuration**
- **Using zero addresses** for testing
- **No real World ID integration** yet
- **No real Uniswap integration** yet

### **Production Checklist**
- [ ] Replace zero addresses with real addresses
- [ ] Set up real World ID app
- [ ] Configure real Uniswap addresses
- [ ] Test with real tokens
- [ ] Security audit
- [ ] Gas optimization

---

**Deployment completed successfully! 🎉**
