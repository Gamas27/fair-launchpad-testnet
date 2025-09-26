# 🧪 Comprehensive Testing Guide

## **🚀 Post-Deployment Testing**

### **1. TokenFactory Testing**

#### **Test Token Creation**
```solidity
// Call TokenFactory.createToken()
createToken(
    "TestToken",         // name
    "TEST",              // symbol
    1000000000000000000, // initialPrice (1 WLD)
    1000000000000000000000000, // maxSupply (1M tokens)
    0xfe84c495df377d350ac75d4b7981ef4e79248da5b8c9e8858629daf5606c57fb, // worldIdRoot
    0xb48c4cd1d468325c72a85fb338783e00a56ed07c8cbcfaa5e5618487a16e3548  // worldIdExternalNullifier
)
```

#### **Expected Results**
- [ ] Transaction succeeds
- [ ] TokenCreated event emitted
- [ ] Token count increases
- [ ] Token registered in factory
- [ ] Creator address recorded

#### **Verify Token Deployment**
```solidity
// Check if token was created
getToken(0) // Should return the deployed token address
getTokenCount() // Should return 1
isTokenCreated(tokenAddress) // Should return true
getTokenCreator(tokenAddress) // Should return your address
```

### **2. BondingCurveMinimal Testing**

#### **Test Token Purchase**
```solidity
// Call BondingCurveMinimal.buy()
buy(
    1000000000000000000, // wldAmount (1 WLD)
    0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef, // nullifierHash
    [0,0,0,0,0,0,0,0]   // proof (8 zeros for testing)
)
```

#### **Expected Results**
- [ ] Transaction succeeds (or fails gracefully with World ID)
- [ ] TokensPurchased event emitted
- [ ] Token balance increases
- [ ] Price updates
- [ ] World ID verification attempted

#### **Check Bonding Curve State**
```solidity
// Get current state
getBondingCurveState() // Returns (price, raised, supply, graduated)
hasAddressPurchased(yourAddress) // Should return true after purchase
getGraduationProgress() // Should show progress percentage
```

### **3. GraduationHandlerOptimized Testing**

#### **Test Graduation (Manual)**
```solidity
// This would be called by BondingCurveMinimal when threshold is reached
handleGraduation(
    1000000000000000000, // finalPrice (1 WLD)
    1000000000000000000000000  // totalSupply (1M tokens)
)
```

#### **Expected Results**
- [ ] UniswapPoolCreated event emitted
- [ ] LiquidityAdded event emitted
- [ ] FeesDistributed event emitted
- [ ] LPNFTBurned event emitted
- [ ] GraduationCompleted event emitted

#### **Check Graduation State**
```solidity
uniswapPool() // Should return pool address
isGraduated() // Should return true
getLiquidity() // Should return liquidity amount
getTokenId() // Should return NFT token ID
```

## **🔧 Frontend Integration Testing**

### **1. Update Environment Variables**
```bash
# Add to .env.local
NEXT_PUBLIC_TOKEN_FACTORY_ADDRESS=[YOUR_TOKENFACTORY_ADDRESS]
NEXT_PUBLIC_BONDING_CURVE_ADDRESS=[YOUR_BONDINGCURVE_ADDRESS]
NEXT_PUBLIC_GRADUATION_HANDLER_ADDRESS=[YOUR_GRADUATIONHANDLER_ADDRESS]
```

### **2. Test Frontend Functions**
- [ ] Token creation form
- [ ] Token purchase interface
- [ ] World ID integration
- [ ] Graduation display
- [ ] Fee distribution display

### **3. Test User Flows**
- [ ] Create new token
- [ ] Purchase tokens
- [ ] View bonding curve state
- [ ] Monitor graduation progress
- [ ] Check fee distribution

## **📊 End-to-End Testing Scenarios**

### **Scenario 1: Complete Token Lifecycle**
1. **Create Token** via TokenFactory
2. **Purchase Tokens** via BondingCurveMinimal
3. **Reach Graduation Threshold**
4. **Verify Graduation** via GraduationHandlerOptimized
5. **Check Fee Distribution**

### **Scenario 2: Multiple Token Creation**
1. **Create Multiple Tokens** via TokenFactory
2. **Verify Each Token** is properly registered
3. **Test Token Isolation** (tokens don't interfere)
4. **Check Factory State** (token count, registration)

### **Scenario 3: Error Handling**
1. **Test Invalid Parameters** (empty name, zero price)
2. **Test Insufficient Funds** (low creation fee)
3. **Test World ID Failures** (invalid proof)
4. **Test Graduation Edge Cases** (already graduated)

## **🔍 Monitoring & Debugging**

### **Key Events to Watch**
```solidity
// TokenFactory Events
TokenCreated(uint256 indexed tokenId, address indexed token, address indexed creator, string name, string symbol, uint256 initialPrice, uint256 maxSupply)

// BondingCurveMinimal Events
TokensPurchased(address indexed buyer, uint256 wldAmount, uint256 tokenAmount, uint256 newPrice)
WorldIDVerified(address indexed user, uint256 nullifierHash)
Graduated(address indexed uniswapPoolAddress, uint256 totalRaisedWLD, uint256 finalPrice)

// GraduationHandlerOptimized Events
UniswapPoolCreated(address indexed pool, address indexed token0, address indexed token1, uint24 fee)
LiquidityAdded(uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1)
LPNFTBurned(uint256 tokenId)
FeesDistributed(uint256 platformFee, uint256 creatorFee)
GraduationCompleted(address indexed token, address indexed pool, uint256 wldAmount, uint256 tokenAmount)
```

### **Common Issues & Solutions**

#### **Issue: "Invalid WLD token address"**
- **Solution**: Use zero addresses for testing
- **Check**: Constructor parameters

#### **Issue: "World ID verification failed"**
- **Solution**: Use test parameters or mock World ID
- **Check**: World ID parameters and proof format

#### **Issue: "Insufficient creation fee"**
- **Solution**: Send enough ETH/WLD with transaction
- **Check**: msg.value >= creationFee

#### **Issue: "Already graduated"**
- **Solution**: Create new token or reset state
- **Check**: Graduation status

## **✅ Testing Checklist**

### **Contract Testing**
- [ ] TokenFactory deployment and functions
- [ ] BondingCurveMinimal deployment and functions
- [ ] GraduationHandlerOptimized deployment and functions
- [ ] Event emission verification
- [ ] Error handling verification

### **Integration Testing**
- [ ] Token creation through factory
- [ ] Token purchase through bonding curve
- [ ] Graduation process
- [ ] Fee distribution
- [ ] World ID integration

### **Frontend Testing**
- [ ] Contract address configuration
- [ ] User interface functionality
- [ ] Transaction handling
- [ ] Error display
- [ ] State management

### **End-to-End Testing**
- [ ] Complete user journey
- [ ] Multiple token scenarios
- [ ] Error scenarios
- [ ] Performance testing
- [ ] Security testing

---

**Ready for comprehensive testing! 🧪🚀**
