# 📋 Interface Contracts Reference

## **Overview**

This directory contains all the interface contracts required for the Fair Launchpad smart contracts. These interfaces define the external contract interactions needed for World ID, Uniswap V3, and other integrations.

## **📁 Interface Contracts**

### **1. IWorldID.sol**
- **Purpose**: World ID integration for human verification
- **Key Functions**:
  - `verifyProof()` - Verifies World ID zero-knowledge proofs
- **Used By**: BondingCurve.sol, BondingCurveOptimized.sol

### **2. IUniswapV3Factory.sol**
- **Purpose**: Uniswap V3 factory contract interface
- **Key Functions**:
  - `createPool()` - Creates new Uniswap V3 pools
  - `getPool()` - Gets existing pool addresses
  - `owner()` - Factory owner management
- **Used By**: BondingCurve.sol, GraduationHandler.sol

### **3. IUniswapV3Pool.sol**
- **Purpose**: Uniswap V3 pool contract interface
- **Key Functions**:
  - `initialize()` - Initialize pool with price
  - `slot0()` - Get current pool state
  - `liquidity()` - Get current liquidity
  - `swap()` - Execute swaps
- **Used By**: GraduationHandler.sol, GraduationHandlerOptimized.sol

### **4. INonfungiblePositionManager.sol**
- **Purpose**: Uniswap V3 position manager for LP NFTs
- **Key Functions**:
  - `mint()` - Create new LP positions
  - `safeTransferFrom()` - Transfer LP NFTs
- **Used By**: GraduationHandler.sol, GraduationHandlerOptimized.sol

## **🔧 Usage in Smart Contracts**

### **BondingCurve Integration**
```solidity
import "./interfaces/IWorldID.sol";
import "./interfaces/IUniswapV3Factory.sol";

contract BondingCurve {
    IWorldID public immutable worldId;
    IUniswapV3Factory public immutable uniswapFactory;
    
    // World ID verification
    worldId.verifyProof(signal, root, nullifierHash, externalNullifier, proof);
    
    // Uniswap pool creation
    uniswapFactory.createPool(token0, token1, fee);
}
```

### **GraduationHandler Integration**
```solidity
import "./interfaces/IUniswapV3Factory.sol";
import "./interfaces/IUniswapV3Pool.sol";
import "./interfaces/INonfungiblePositionManager.sol";

contract GraduationHandler {
    IUniswapV3Factory public immutable uniswapFactory;
    INonfungiblePositionManager public immutable positionManager;
    
    // Create pool
    uniswapFactory.createPool(token0, token1, fee);
    
    // Initialize pool
    IUniswapV3Pool(pool).initialize(sqrtPriceX96);
    
    // Mint LP position
    positionManager.mint(params);
}
```

## **📋 Deployment Requirements**

### **World Chain Addresses Needed**
- **World ID Contract**: For human verification
- **Uniswap V3 Factory**: For pool creation
- **Uniswap V3 Position Manager**: For LP NFT management
- **WLD Token**: For token interactions

### **Interface Dependencies**
- All interfaces are self-contained
- No external dependencies
- Compatible with Solidity ^0.8.19

## **🧪 Testing**

### **Mock Contracts Available**
- `MockWorldID.sol` - For testing World ID integration
- `MockUniswapFactory.sol` - For testing Uniswap integration
- `MockPositionManager.sol` - For testing LP NFT functionality

### **Test Usage**
```solidity
// Use mock contracts for testing
import "./MockWorldID.sol";
import "./MockUniswapFactory.sol";

contract TestBondingCurve {
    MockWorldID mockWorldId;
    MockUniswapFactory mockFactory;
    
    function setUp() public {
        mockWorldId = new MockWorldID();
        mockFactory = new MockUniswapFactory();
    }
}
```

## **📚 Documentation**

### **Related Files**
- [Remix Deployment Guide](../docs/deployment/REMIX_DEPLOYMENT_GUIDE.md)
- [World Chain Addresses](../docs/deployment/WORLD_CHAIN_CONTRACT_ADDRESSES.md)
- [Security Review](../docs/security/SECURITY_REVIEW.md)

### **Quick Reference**
- **World ID**: Human verification and anti-manipulation
- **Uniswap V3**: Liquidity provision and trading
- **Position Manager**: LP NFT management
- **Factory**: Pool creation and management

---

**Last Updated**: September 26, 2024  
**Version**: 1.0.0  
**Maintainer**: Fair Launchpad Development Team
