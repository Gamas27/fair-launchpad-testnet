# ⚡ Quick Deployment Reference

## **Essential Addresses**

### **World Chain Addresses**
```
WLD Token: 0x515f06B36E6D3b707eAecBdeD13d15765fcc10a0
World ID: 0x515f06B36E6D3b707eAecBdeD13d15765fcc10a0
Uniswap V3 Factory: 0x1F98431c8aD98523631AE4a59f267346ea31F984
Uniswap V3 Position Manager: 0xC36442b4a4522E871399CD717aBDD847Ab11FE88
```

## **🚀 Quick Deployment**

### **1. BondingCurveBasic.sol** (Recommended First)
```solidity
Constructor:
- name: "MyToken"
- symbol: "MTK"
- _wldToken: "0x515f06B36E6D3b707eAecBdeD13d15765fcc10a0"
- _initialPrice: 1000000000000000000 (1 WLD)
- _maxSupply: 1000000000000000000000000 (1M tokens)
```

### **2. TokenFactoryBasic.sol**
```solidity
Constructor:
- _wldToken: "0x515f06B36E6D3b707eAecBdeD13d15765fcc10a0"
```

### **3. BondingCurveMinimal.sol** (With World ID)
```solidity
Constructor:
- name: "MyToken"
- symbol: "MTK"
- _wldToken: "0x515f06B36E6D3b707eAecBdeD13d15765fcc10a0"
- _worldId: "0x515f06B36E6D3b707eAecBdeD13d15765fcc10a0"
- _initialPrice: 1000000000000000000 (1 WLD)
- _maxSupply: 1000000000000000000000000 (1M tokens)
- _worldIdRoot: [Get from World ID app]
- _worldIdExternalNullifier: [Get from World ID app]
```

## **🔧 World ID Setup**
1. Go to [World ID Developer Portal](https://developer.worldcoin.org/)
2. Create a new app
3. Get `worldIdRoot` and `worldIdExternalNullifier`
4. Use `worldIdGroupId: 1` for mainnet

## **📋 Deployment Order**
1. **BondingCurveBasic.sol** (test basic functionality)
2. **TokenFactoryBasic.sol** (test factory pattern)
3. **BondingCurveMinimal.sol** (test with World ID)
4. **TokenFactory.sol** (full factory with World ID)

## **💰 Example Parameters**
```
Token Name: "FairLaunch Token"
Token Symbol: "FLT"
Initial Price: 1000000000000000000 (1 WLD)
Max Supply: 1000000000000000000000000 (1M tokens)
Platform Fee: 0.1 WLD
```

**Ready to deploy! 🚀**
