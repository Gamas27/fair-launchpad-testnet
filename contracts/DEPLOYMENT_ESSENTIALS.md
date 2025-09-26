# 🚀 Essential Contracts for Deployment

## **Core Contracts (Required)**

### 1. **BondingCurve.sol** ⭐
- **Purpose**: Basic bonding curve contract (no graduation handler)
- **Features**: World ID verification, token minting, basic graduation
- **Status**: ✅ Ready for deployment
- **Stack Depth**: ✅ Should compile without issues

### 2. **BondingCurveWithGraduation.sol** ⭐
- **Purpose**: Full bonding curve contract with graduation handler
- **Features**: World ID verification, graduation, fee distribution
- **Status**: ✅ Ready for deployment
- **Stack Depth**: ✅ Inlined functions to avoid stack depth

### 3. **BondingCurveAdvanced.sol** ⭐
- **Purpose**: Advanced bonding curve with function breakdown
- **Features**: World ID verification, graduation, fee distribution
- **Status**: ✅ Ready for deployment
- **Stack Depth**: ✅ Resolved with function breakdown

### 4. **GraduationHandlerOptimized.sol** ⭐
- **Purpose**: Handles graduation to Uniswap V3
- **Features**: LP creation, fee distribution, NFT burning
- **Status**: ✅ Ready for deployment

### 5. **TokenFactory.sol** ⭐
- **Purpose**: Factory for creating new tokens
- **Features**: Token creation, fee management, admin functions
- **Status**: ✅ Ready for deployment

## **Interface Contracts (Required)**

### 4. **interfaces/IWorldID.sol**
- **Purpose**: World ID verification interface
- **Status**: ✅ Complete

### 5. **interfaces/IUniswapV3Factory.sol**
- **Purpose**: Uniswap V3 factory interface
- **Status**: ✅ Complete

### 6. **interfaces/IUniswapV3Pool.sol**
- **Purpose**: Uniswap V3 pool interface
- **Status**: ✅ Complete

### 7. **interfaces/INonfungiblePositionManager.sol**
- **Purpose**: Uniswap V3 position manager interface
- **Status**: ✅ Complete

## **Deployment Order**

### **Option 1: Basic Deployment**
1. **Deploy Interfaces** (if not already deployed)
2. **Deploy BondingCurve.sol** (basic functionality)

### **Option 2: Full Deployment**
1. **Deploy Interfaces** (if not already deployed)
2. **Deploy GraduationHandlerOptimized**
3. **Deploy BondingCurveWithGraduation.sol** (with GraduationHandler address)
4. **Deploy TokenFactory** (optional, for factory pattern)

### **Option 3: Advanced Deployment**
1. **Deploy Interfaces** (if not already deployed)
2. **Deploy GraduationHandlerOptimized**
3. **Deploy BondingCurveAdvanced.sol** (with GraduationHandler address)
4. **Deploy TokenFactory** (optional, for factory pattern)

## **Removed Contracts**

- ❌ `BondingCurveOptimized.sol` - Had stack depth issues
- ❌ `BondingCurveSimple.sol` - Had stack depth issues
- ❌ `GraduationHandler.sol` - Original version
- ❌ `MockERC20.sol` - Test contract
- ❌ `MockPositionManager.sol` - Test contract
- ❌ `MockUniswapFactory.sol` - Test contract
- ❌ `MockWorldID.sol` - Test contract

## **Deployment Strategy**

### **Option 1: Individual Token Deployment**
Deploy `BondingCurve.sol` directly for each token.

### **Option 2: Factory Deployment**
Deploy `TokenFactory.sol` to create tokens programmatically.

## **Next Steps**

1. **Deploy BondingCurve.sol first** (basic functionality)
2. **Test basic functionality**
3. **Deploy GraduationHandlerOptimized** (if needed)
4. **Deploy BondingCurveWithGraduation.sol** (full functionality)
5. **Test the deployment**
6. **Update frontend with contract addresses**

---

**Total Contracts**: 7 (3 core + 4 interfaces)
**Status**: ✅ Ready for deployment
