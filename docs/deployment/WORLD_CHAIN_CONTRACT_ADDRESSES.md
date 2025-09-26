# 🌍 World Chain Contract Addresses

## **Current Contract Addresses (2024)**

### **🔗 World ID Contracts**

#### **Mainnet**
- **World ID Router**: `id.worldcoin.eth` (ENS name)
- **Identity Manager**: `0xf7134CE138832c1456F2a91D64621eE90c2bddEa`

#### **Testnet (Ethereum Sepolia)**
- **World ID Router**: `0x469449f251692e0779667583026b5a1e99512157`
- **Identity Manager**: `0xb2ead588f14e69266d1b87936b75325181377076`

### **🦄 Uniswap V3 Contracts on World Chain**

#### **Core Contracts**
- **UniswapV3Factory**: `0x7a5028BDa40e7B173C278C5342087826455ea25a`
- **NonfungiblePositionManager**: `0xec12a9F9a09f50550686363766Cc153D03c27b5e`
- **SwapRouter02**: `0x091AD9e2e6e5eD44c1c66dB50e49A601F9f36cF6`

#### **Supporting Contracts**
- **Multicall2**: `0x0a22c04215c97E3F532F4eF30e0aD9458792dAB9`
- **ProxyAdmin**: `0x8B52DaCB7B5d9A959CDcD5419061c0eDD1296c29`
- **TickLens**: `0xE61df0CaC9d85876aCE5E3037005D80943570623`
- **NFTDescriptor**: `0x38c68A1D60C47973EcE5bc1725B65D8Bec438192`
- **NonfungibleTokenPositionDescriptor**: `0x70410a302c4a5c52C659b780941c947Abd437FeB`
- **TransparentUpgradeableProxy**: `0xe6FcB4952b2d3Fab6DA4BC165831f5575e093feC`
- **V3Migrator**: `0x9EBDdCBa71C9027E1eB45135672a30bcFEec9de3`
- **QuoterV2**: `0x10158D43e6cc414deE1Bd1eB0EfC6a5cBCfF244c`
- **Permit2**: `0x000000000022D473030F116dDEE9F6B43aC78BA3`
- **UniversalRouter**: `0x8ac7bee993bb44dab564ea4bc9ea67bf9eb5e743`

### **🐛 Wormhole Relayer**
- **Contract Address**: `0x1520cc9e779c56dab5866bebfb885c86840c33d3`

## **⚠️ Important Notes**

### **WLD Token Address**
**Status**: ⚠️ **NEEDS VERIFICATION**
- The WLD token address on World Chain is not publicly documented
- You may need to:
  1. Check World Chain block explorer
  2. Contact World Chain support
  3. Use a different token for testing

### **Network Configuration**
- **Chain ID**: 480
- **RPC URL**: `https://rpc.worldchain.org`
- **Testnet RPC**: `https://rpc.testnet.worldchain.org`

## **🔧 Configuration for Deployment**

### **Environment Variables**
```env
# World Chain Configuration
TESTNET_RPC_URL=https://rpc.testnet.worldchain.org
TESTNET_CHAIN_ID=480

# World ID Configuration
WORLD_ID_ADDRESS=0x469449f251692e0779667583026b5a1e99512157
WORLD_ID_ROOT=0x0000000000000000000000000000000000000000000000000000000000000000
WORLD_ID_GROUP_ID=1
WORLD_ID_EXTERNAL_NULLIFIER=0x0000000000000000000000000000000000000000000000000000000000000000

# Uniswap V3 Configuration
UNISWAP_FACTORY_ADDRESS=0x7a5028BDa40e7B173C278C5342087826455ea25a
POSITION_MANAGER_ADDRESS=0xec12a9F9a09f50550686363766Cc153D03c27b5e

# WLD Token (NEEDS VERIFICATION)
WLD_TOKEN_ADDRESS=0x0000000000000000000000000000000000000000
```

## **📋 Next Steps**

### **1. Verify WLD Token Address** 🔍
**Priority**: Critical
**Action**: 
- Check World Chain block explorer
- Contact World Chain support
- Use alternative token for testing

### **2. Test Contract Addresses** 🧪
**Priority**: High
**Action**:
- Verify Uniswap contracts are accessible
- Test World ID integration
- Confirm network connectivity

### **3. Deploy Smart Contracts** 🚀
**Priority**: High
**Action**:
- Use verified contract addresses
- Deploy to World Chain testnet
- Verify deployment success

## **🔗 Official Sources**

- **World Chain Documentation**: [docs.world.org](https://docs.world.org)
- **Uniswap V3 Deployments**: [docs.uniswap.org](https://docs.uniswap.org/contracts/v3/reference/deployments/WorldChain-deployments)
- **World Chain Explorer**: [explorer.worldchain.org](https://explorer.worldchain.org)

## **⚠️ Security Warning**

**Always verify contract addresses from official sources before deployment!**

- Double-check all addresses
- Use official documentation
- Test on testnet first
- Never use unverified addresses

