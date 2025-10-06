# Smart Contract Deployment

## 🎯 Current Status

- **Foundry Setup**: ✅ Complete
- **Contract Compilation**: ✅ Success
- **Testnet Configuration**: ✅ World Chain Sepolia
- **Deployment Script**: ✅ Ready
- **Testnet Funding**: 🟡 Pending (need WLD tokens)

## 🚀 Deployment Steps

### **1. Get Testnet WLD Tokens**

Choose one of these faucets:

#### **Option A: ETHGlobal Faucet (Recommended)**
- **URL**: https://ethglobal.com/faucet/world-chain-sepolia-4801
- **Amount**: 0.05 ETH per day
- **Requirement**: Just log in

#### **Option B: L2 Faucet (Automata)**
- **URL**: https://www.l2faucet.com/world
- **Requirement**: Device attestation

#### **Option C: Chainlink Faucet**
- **URL**: https://faucets.chain.link/worldchain-testnet
- **Amount**: 25 LINK tokens

### **2. Set Deployer Wallet**

Choose your deployer wallet:

#### **Option A: Use Mainnet Wallet**
```bash
# Set your mainnet private key
export PRIVATE_KEY=your_mainnet_private_key
```

#### **Option B: Use Testnet Wallet**
```bash
# Use the generated testnet wallet
export PRIVATE_KEY=0xee28c08b3e909a4e6ffdab67c3124a3c666fe815a3fb89fd4c76811b053ca6dc
```

### **3. Deploy Contracts**

```bash
# Navigate to contracts directory
cd contracts

# Deploy to World Chain Sepolia
forge script script/Deploy.s.sol --rpc-url worldchain_sepolia --broadcast

# Verify contracts (optional)
forge script script/Deploy.s.sol --rpc-url worldchain_sepolia --verify
```

## 📋 Contract Addresses

After successful deployment, you'll get:

- **BondingCurveMinimal**: `0x...`
- **TokenFactory**: `0x...`
- **GraduationHandlerOptimized**: `0x...`

## 🔧 Environment Configuration

Update your frontend environment variables:

```bash
# Add to .env.local or Vercel environment variables
NEXT_PUBLIC_BONDING_CURVE_ADDRESS=0x...
NEXT_PUBLIC_TOKEN_FACTORY_ADDRESS=0x...
NEXT_PUBLIC_GRADUATION_HANDLER_ADDRESS=0x...
NEXT_PUBLIC_WLD_TOKEN_ADDRESS=0x5b6ec6566f8270e2dc56525566b8341d29a17093
NEXT_PUBLIC_WORLD_ID_ADDRESS=0x469449f251692e0779667583026b5a1e99512157
```

## 🧪 Testing Deployment

### **1. Verify Contract Deployment**
```bash
# Check contract on World Chain Sepolia explorer
# https://sepolia.worldscan.org/address/0x...
```

### **2. Test Contract Functions**
```bash
# Test basic functions
cast call <BONDING_CURVE_ADDRESS> "getCurrentPriceInWLD()" --rpc-url worldchain_sepolia
cast call <TOKEN_FACTORY_ADDRESS> "getTokenCount()" --rpc-url worldchain_sepolia
```

### **3. Frontend Integration**
- Update contract addresses in frontend
- Test World ID verification
- Test token creation flow
- Test graduation process

## 🚨 Troubleshooting

### **Common Issues**

#### **1. Insufficient Funds**
```
Error: insufficient funds for gas
```
**Solution**: Get more testnet WLD tokens from faucets

#### **2. Wrong Network**
```
Error: network mismatch
```
**Solution**: Ensure you're using World Chain Sepolia (Chain ID: 4801)

#### **3. Contract Verification Failed**
```
Error: verification failed
```
**Solution**: Check contract source code and try again

### **Debug Commands**
```bash
# Check account balance
cast balance <ADDRESS> --rpc-url worldchain_sepolia

# Check network
cast chain-id --rpc-url worldchain_sepolia

# Check gas price
cast gas-price --rpc-url worldchain_sepolia
```

## 📊 Deployment Metrics

- **Gas Used**: ~5,223,497 gas
- **Gas Price**: 0.000101116 gwei
- **Total Cost**: ~0.000000528179122652 WRLD
- **Deployment Time**: ~2-3 minutes

## 🎯 Next Steps

1. **Get testnet WLD tokens** from faucets
2. **Deploy contracts** to World Chain Sepolia
3. **Update frontend** with contract addresses
4. **Test integration** end-to-end
5. **Verify contracts** on explorer

---

**Ready to deploy!** Just need testnet WLD tokens 🚀
