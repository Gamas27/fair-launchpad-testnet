# 🚀 Remix IDE Deployment Guide

## **Quick Start: Deploy Smart Contracts to Testnet**

Since local Hardhat is having issues, we'll use Remix IDE for deployment.

### **Step 1: Open Remix IDE**
1. Go to [remix.ethereum.org](https://remix.ethereum.org)
2. Create a new workspace called "FairLaunch"
3. Upload all contract files from the `contracts/` directory

### **Step 2: Get World Chain Contract Addresses**

You'll need these addresses from World Chain:

#### **Required Addresses:**
- **WLD Token**: World ID token address on World Chain
- **World ID**: World ID verification contract
- **Uniswap V3 Factory**: Uniswap V3 factory contract
- **Position Manager**: Uniswap V3 position manager

#### **How to Get Addresses:**
1. **World Chain Explorer**: Check [explorer.worldchain.org](https://explorer.worldchain.org)
2. **World ID Documentation**: [docs.worldcoin.org](https://docs.worldcoin.org)
3. **Uniswap Documentation**: [docs.uniswap.org](https://docs.uniswap.org)

### **Step 3: Deploy Contracts**

#### **3.1 Deploy GraduationHandler**
```solidity
// Constructor parameters:
uniswapFactory: 0x... // Uniswap V3 Factory address
positionManager: 0x... // Uniswap V3 Position Manager address
```

#### **3.2 Deploy TokenFactory**
```solidity
// Constructor parameters:
wldToken: 0x... // WLD token address
worldId: 0x... // World ID contract address
uniswapFactory: 0x... // Uniswap V3 Factory address
positionManager: 0x... // Uniswap V3 Position Manager address
graduationHandler: 0x... // GraduationHandler address (from step 3.1)
platformFeeRecipient: 0x... // Your wallet address
creatorVestingRecipient: 0x... // Your wallet address
worldIdRoot: 0x... // World ID root (get from World ID docs)
worldIdGroupId: 1 // World ID group ID
worldIdExternalNullifier: 0x... // World ID external nullifier
creationFee: 1000000000000000000 // 1 WLD in wei
```

#### **3.3 Create Sample Token**
```solidity
// Call TokenFactory.createToken():
name: "FairLaunch Test Token"
symbol: "FLTT"
maxSupply: 1000000000000000000000000 // 1M tokens in wei
initialPrice: 100000000000000 // 0.0001 WLD in wei
```

### **Step 4: Test Contract Functionality**

#### **4.1 Test Token Creation**
1. Call `TokenFactory.createToken()` with sample parameters
2. Verify token was created successfully
3. Get the token address from the event

#### **4.2 Test Bonding Curve**
1. Connect to the created token contract
2. Test `buy()` function with World ID proof
3. Verify tokens are minted correctly
4. Check price progression

#### **4.3 Test Graduation**
1. Buy enough tokens to trigger graduation (1000 WLD threshold)
2. Verify Uniswap pool is created
3. Check liquidity is added
4. Verify LP NFT is burned

### **Step 5: Update Frontend**

#### **5.1 Contract Addresses**
Update your frontend with the deployed contract addresses:

```typescript
// Add to your environment variables
NEXT_PUBLIC_GRADUATION_HANDLER_ADDRESS=0x...
NEXT_PUBLIC_TOKEN_FACTORY_ADDRESS=0x...
NEXT_PUBLIC_SAMPLE_TOKEN_ADDRESS=0x...
```

#### **5.2 Frontend Integration**
1. Update contract ABI imports
2. Connect to deployed contracts
3. Test frontend functionality
4. Verify real blockchain interactions

### **Step 6: Verification**

#### **6.1 Contract Verification**
1. Verify contracts on World Chain block explorer
2. Add contract source code
3. Verify constructor parameters

#### **6.2 Functionality Testing**
1. Test complete user flow
2. Verify World ID integration
3. Test graduation mechanism
4. Check fee distribution

## **🔧 Troubleshooting**

### **Common Issues:**
- **Contract deployment fails**: Check gas limits and network
- **Function calls fail**: Verify contract addresses and ABI
- **World ID verification fails**: Check World ID configuration
- **Uniswap integration fails**: Verify Uniswap contract addresses

### **Quick Fixes:**
- **Increase gas limit**: Set to 5,000,000 gas
- **Check network**: Ensure you're on World Chain testnet
- **Verify addresses**: Double-check all contract addresses
- **Test with small amounts**: Start with minimal values

## **📞 Support Resources**

- **World Chain Documentation**: [docs.worldchain.org](https://docs.worldchain.org)
- **World ID Documentation**: [docs.worldcoin.org](https://docs.worldcoin.org)
- **Uniswap V3 Documentation**: [docs.uniswap.org](https://docs.uniswap.org)
- **Remix IDE Documentation**: [remix-ide.readthedocs.io](https://remix-ide.readthedocs.io)

## **🎯 Success Criteria**

After deployment, you should have:
- ✅ GraduationHandler deployed and verified
- ✅ TokenFactory deployed and verified
- ✅ Sample bonding curve token created
- ✅ Frontend connected to contracts
- ✅ Real blockchain functionality working
- ✅ World ID integration functional
- ✅ Graduation mechanism working

---

**Next Step**: Once contracts are deployed, we'll connect the frontend to enable real blockchain functionality! 🚀
