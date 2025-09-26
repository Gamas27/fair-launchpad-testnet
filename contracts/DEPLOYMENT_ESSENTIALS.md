# 🚀 Essential Contracts for Deployment

## **Core Contracts (Required)**

### 1. **BondingCurveMinimal.sol** ⭐
- **Purpose**: Main bonding curve contract
- **Features**: World ID verification, graduation, fee distribution
- **Status**: ✅ Ready for deployment
- **Stack Depth**: ✅ Resolved with function breakdown

### 2. **GraduationHandlerOptimized.sol** ⭐
- **Purpose**: Handles graduation to Uniswap V3
- **Features**: LP creation, fee distribution, NFT burning
- **Status**: ✅ Ready for deployment

### 3. **TokenFactory.sol** ⭐
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

1. **Deploy Interfaces** (if not already deployed)
2. **Deploy GraduationHandlerOptimized**
3. **Deploy BondingCurveMinimal** (with GraduationHandler address)
4. **Deploy TokenFactory** (optional, for factory pattern)

## **Removed Contracts**

- ❌ `BondingCurve.sol` - Original version
- ❌ `BondingCurveOptimized.sol` - Had stack depth issues
- ❌ `BondingCurveSimple.sol` - Had stack depth issues
- ❌ `GraduationHandler.sol` - Original version
- ❌ `MockERC20.sol` - Test contract
- ❌ `MockPositionManager.sol` - Test contract
- ❌ `MockUniswapFactory.sol` - Test contract
- ❌ `MockWorldID.sol` - Test contract

## **Deployment Strategy**

### **Option 1: Individual Token Deployment**
Deploy `BondingCurveMinimal.sol` directly for each token.

### **Option 2: Factory Deployment**
Deploy `TokenFactory.sol` to create tokens programmatically.

## **Next Steps**

1. **Deploy GraduationHandlerOptimized first**
2. **Deploy BondingCurveMinimal with GraduationHandler address**
3. **Test the deployment**
4. **Update frontend with contract addresses**

---

**Total Contracts**: 7 (3 core + 4 interfaces)
**Status**: ✅ Ready for deployment
