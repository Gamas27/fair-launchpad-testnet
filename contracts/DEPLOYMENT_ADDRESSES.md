# 🚀 Contract Deployment Addresses Guide

## **Required Addresses for Deployment**

### **🌍 World Chain Addresses**

#### **World ID Contract**
- **Address**: `0x515f06B36E6D3b707eAecBdeD13d15765fcc10a0`
- **Purpose**: World ID verification for anti-manipulation
- **Network**: World Chain (Chain ID: 480)

#### **WLD Token**
- **Address**: `0x515f06B36E6D3b707eAecBdeD13d15765fcc10a0`
- **Purpose**: Native WLD token for bonding curve purchases
- **Network**: World Chain (Chain ID: 480)

### **🔗 Uniswap V3 Addresses (World Chain)**

#### **Uniswap V3 Factory**
- **Address**: `0x1F98431c8aD98523631AE4a59f267346ea31F984`
- **Purpose**: Create Uniswap V3 pools
- **Network**: World Chain (Chain ID: 480)

#### **Uniswap V3 Position Manager**
- **Address**: `0xC36442b4a4522E871399CD717aBDD847Ab11FE88`
- **Purpose**: Manage Uniswap V3 positions and NFTs
- **Network**: World Chain (Chain ID: 480)

### **📋 Deployment Parameters**

#### **For BondingCurveBasic.sol**
```solidity
Constructor Parameters:
- name: "Your Token Name"
- symbol: "SYMBOL"
- _wldToken: "0x515f06B36E6D3b707eAecBdeD13d15765fcc10a0"
- _initialPrice: 1000000000000000000 (1 WLD)
- _maxSupply: 1000000000000000000000000 (1M tokens)
```

#### **For BondingCurveMinimal.sol**
```solidity
Constructor Parameters:
- name: "Your Token Name"
- symbol: "SYMBOL"
- _wldToken: "0x515f06B36E6D3b707eAecBdeD13d15765fcc10a0"
- _worldId: "0x515f06B36E6D3b707eAecBdeD13d15765fcc10a0"
- _initialPrice: 1000000000000000000 (1 WLD)
- _maxSupply: 1000000000000000000000000 (1M tokens)
- _worldIdRoot: [Get from World ID app]
- _worldIdExternalNullifier: [Get from World ID app]
```

#### **For TokenFactory.sol**
```solidity
Constructor Parameters:
- _wldToken: "0x515f06B36E6D3b707eAecBdeD13d15765fcc10a0"
- _worldId: "0x515f06B36E6D3b707eAecBdeD13d15765fcc10a0"
```

#### **For GraduationHandlerOptimized.sol**
```solidity
Constructor Parameters:
- _bondingCurve: [Address of deployed bonding curve]
- _wldToken: "0x515f06B36E6D3b707eAecBdeD13d15765fcc10a0"
- _uniswapFactory: "0x1F98431c8aD98523631AE4a59f267346ea31F984"
- _positionManager: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88"
- _platformFeeRecipient: [Your platform fee address]
- _creatorVestingRecipient: [Your creator vesting address]
```

## **🚀 Recommended Deployment Order**

### **Option 1: Basic Deployment (Recommended First)**
1. **Deploy BondingCurveBasic.sol**
   - No external dependencies
   - Test basic functionality
   - Parameters: name, symbol, wldToken, initialPrice, maxSupply

2. **Deploy TokenFactoryBasic.sol**
   - Uses BondingCurveBasic
   - Parameters: wldToken

### **Option 2: Full Deployment**
1. **Deploy BondingCurveMinimal.sol**
   - With World ID verification
   - Parameters: name, symbol, wldToken, worldId, initialPrice, maxSupply, worldIdRoot, worldIdExternalNullifier

2. **Deploy TokenFactory.sol**
   - Uses BondingCurveMinimal
   - Parameters: wldToken, worldId

3. **Deploy GraduationHandlerOptimized.sol** (Optional)
   - For graduation functionality
   - Parameters: bondingCurve, wldToken, uniswapFactory, positionManager, platformFeeRecipient, creatorVestingRecipient

4. **Deploy BondingCurveWithGraduation.sol** (Optional)
   - Full functionality with graduation
   - Parameters: All parameters from BondingCurveMinimal + graduation handler

## **🔧 World ID Setup**

### **Get World ID Parameters**
1. **Go to**: [World ID Developer Portal](https://developer.worldcoin.org/)
2. **Create App**: Create a new World ID app
3. **Get Parameters**:
   - `worldIdRoot`: From your app settings
   - `worldIdExternalNullifier`: Generate a unique nullifier
   - `worldIdGroupId`: Usually `1` for mainnet

### **Example World ID Parameters**
```solidity
worldIdRoot: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
worldIdExternalNullifier: 0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba
worldIdGroupId: 1
```

## **💰 Fee Recipients**

### **Platform Fee Recipient**
- **Address**: [Your platform wallet address]
- **Purpose**: Receive platform fees from token creation
- **Example**: `0xYourPlatformWalletAddress`

### **Creator Vesting Recipient**
- **Address**: [Your creator vesting wallet address]
- **Purpose**: Receive creator vesting fees
- **Example**: `0xYourCreatorVestingAddress`

## **📝 Deployment Checklist**

### **Before Deployment**
- [ ] Verify World Chain network is selected
- [ ] Have WLD tokens for gas fees
- [ ] Get World ID parameters from developer portal
- [ ] Prepare fee recipient addresses
- [ ] Choose token name and symbol

### **After Deployment**
- [ ] Verify contract deployment
- [ ] Test basic functionality
- [ ] Update frontend with contract addresses
- [ ] Test token creation (if using factory)
- [ ] Test World ID verification (if applicable)

## **🌐 Network Information**

### **World Chain Details**
- **Chain ID**: 480
- **RPC URL**: `https://worldchain.worldcoin.org`
- **Explorer**: `https://worldscan.org`
- **Native Token**: WLD

### **Gas Estimation**
- **BondingCurveBasic**: ~500,000 gas
- **BondingCurveMinimal**: ~600,000 gas
- **TokenFactory**: ~400,000 gas
- **GraduationHandlerOptimized**: ~800,000 gas

---

**Ready to deploy! 🚀**
