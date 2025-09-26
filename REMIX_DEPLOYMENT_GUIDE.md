# 🚀 Remix IDE Deployment Guide

## **Step-by-Step Smart Contract Deployment**

### **Phase 1: Setup Remix IDE**

#### **Step 1: Open Remix IDE**
1. Go to [remix.ethereum.org](https://remix.ethereum.org)
2. Click **"Create New Workspace"**
3. Name it: `Fair Launchpad`
4. Select **"Default"** template
5. Click **"OK"**

#### **Step 2: Create File Structure**
Create these folders in Remix:
- `contracts/` (main contracts)
- `contracts/interfaces/` (interface files)
- `contracts/mocks/` (mock contracts for testing)

### **Phase 2: Upload Contract Files**

#### **Step 3: Upload Core Contracts**
Upload these files to `contracts/` folder:

1. **BondingCurve.sol**
2. **GraduationHandler.sol** 
3. **TokenFactory.sol**

#### **Step 4: Upload Interface Files**
Upload these files to `contracts/interfaces/` folder:

1. **IWorldID.sol**
2. **IUniswapV3Factory.sol**
3. **IUniswapV3Pool.sol**
4. **INonfungiblePositionManager.sol**

#### **Step 5: Upload Mock Contracts**
Upload these files to `contracts/mocks/` folder:

1. **MockERC20.sol**
2. **MockWorldID.sol**
3. **MockUniswapFactory.sol**
4. **MockPositionManager.sol**

### **Phase 3: Compile Contracts**

#### **Step 6: Configure Compiler**
1. Go to **"Solidity Compiler"** tab (left sidebar)
2. Select **Compiler Version**: `0.8.19`
3. Enable **"Auto compile"**
4. Enable **"Optimization"** with **200 runs**

#### **Step 7: Compile All Contracts**
1. Click **"Compile BondingCurve.sol"**
2. Click **"Compile GraduationHandler.sol"**
3. Click **"Compile TokenFactory.sol"**
4. Ensure no compilation errors

### **Phase 4: Setup MetaMask**

#### **Step 8: Install MetaMask**
1. Install MetaMask browser extension
2. Create or import a wallet
3. Switch to testnet mode

#### **Step 9: Add World Chain Testnet**
1. Click MetaMask network dropdown
2. Click **"Add Network"**
3. Enter these details:
   - **Network Name**: World Chain Testnet
   - **RPC URL**: `https://rpc.testnet.worldchain.org`
   - **Chain ID**: `480`
   - **Currency Symbol**: WLD
   - **Block Explorer**: `https://explorer.worldchain.org`

#### **Step 10: Get Testnet WLD**
1. Get testnet WLD tokens from World Chain faucet
2. Ensure you have at least 1-2 WLD for deployment gas fees

### **Phase 5: Deploy Contracts**

#### **Step 11: Connect to World Chain**
1. Go to **"Deploy & Run Transactions"** tab
2. Select **"Injected Provider - MetaMask"**
3. Connect your MetaMask wallet
4. Ensure you're on World Chain Testnet

#### **Step 12: Deploy Mock Contracts First**

**Deploy MockERC20:**
1. Select **"MockERC20"** from contract dropdown
2. Enter constructor parameters:
   - `name`: "World ID Token"
   - `symbol`: "WLD"
   - `initialSupply`: "1000000000000000000000000" (1M tokens)
3. Click **"Deploy"**
4. **Record the address**: `0x...`

**Deploy MockWorldID:**
1. Select **"MockWorldID"** from contract dropdown
2. No constructor parameters needed
3. Click **"Deploy"**
4. **Record the address**: `0x...`

**Deploy MockUniswapFactory:**
1. Select **"MockUniswapFactory"** from contract dropdown
2. No constructor parameters needed
3. Click **"Deploy"**
4. **Record the address**: `0x...`

**Deploy MockPositionManager:**
1. Select **"MockPositionManager"** from contract dropdown
2. No constructor parameters needed
3. Click **"Deploy"**
4. **Record the address**: `0x...`

#### **Step 13: Deploy Core Contracts**

**Deploy GraduationHandler:**
1. Select **"GraduationHandler"** from contract dropdown
2. Enter constructor parameters:
   - `_uniswapFactory`: MockUniswapFactory address
   - `_positionManager`: MockPositionManager address
3. Click **"Deploy"**
4. **Record the address**: `0x...`

**Deploy TokenFactory:**
1. Select **"TokenFactory"** from contract dropdown
2. Enter constructor parameters:
   - `_wldToken`: MockERC20 address
   - `_worldId`: MockWorldID address
   - `_uniswapFactory`: MockUniswapFactory address
   - `_positionManager`: MockPositionManager address
   - `_graduationHandler`: GraduationHandler address
   - `_platformFeeRecipient`: Your wallet address
   - `_creatorVestingRecipient`: Your wallet address
   - `_worldIdRoot`: `0x0000000000000000000000000000000000000000000000000000000000000000`
   - `_worldIdGroupId`: `1`
   - `_worldIdExternalNullifier`: `0x0000000000000000000000000000000000000000000000000000000000000000`
   - `_creationFee`: `1000000000000000000` (1 WLD)
3. Click **"Deploy"**
4. **Record the address**: `0x...`

#### **Step 14: Create Sample Token**
1. Use the deployed **TokenFactory** contract
2. Call **"createToken"** function with parameters:
   - `name`: "FairLaunch Test Token"
   - `symbol`: "FLTT"
   - `maxSupply`: "1000000000000000000000000" (1M tokens)
   - `initialPrice`: "100000000000000" (0.0001 WLD per token)
3. Send transaction with 1 WLD as value
4. **Record the token address**: `0x...`

### **Phase 6: Update Frontend**

#### **Step 15: Record All Addresses**
Create a file with all deployed addresses:

```env
# Mock Contracts
NEXT_PUBLIC_WLD_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_WORLD_ID_ADDRESS=0x...
NEXT_PUBLIC_UNISWAP_FACTORY_ADDRESS=0x...
NEXT_PUBLIC_POSITION_MANAGER_ADDRESS=0x...

# Our Contracts
NEXT_PUBLIC_GRADUATION_HANDLER_ADDRESS=0x...
NEXT_PUBLIC_TOKEN_FACTORY_ADDRESS=0x...
NEXT_PUBLIC_SAMPLE_TOKEN_ADDRESS=0x...
```

#### **Step 16: Update Frontend Environment**
1. Copy the addresses to `.env.local`
2. Restart the frontend application
3. Test the connection to deployed contracts

### **Phase 7: Test Deployment**

#### **Step 17: Verify Contracts**
1. Check contracts on World Chain explorer
2. Verify all functions are accessible
3. Test basic contract interactions

#### **Step 18: Test Complete Flow**
1. Test token creation
2. Test token purchasing
3. Test graduation mechanism
4. Test Uniswap integration

## **📋 Deployment Checklist**

### **Pre-Deployment**
- [ ] Remix IDE workspace created
- [ ] All contract files uploaded
- [ ] Contracts compiled successfully
- [ ] MetaMask connected to World Chain
- [ ] Testnet WLD tokens obtained

### **Deployment**
- [ ] Mock contracts deployed
- [ ] GraduationHandler deployed
- [ ] TokenFactory deployed
- [ ] Sample token created
- [ ] All addresses recorded

### **Post-Deployment**
- [ ] Frontend environment updated
- [ ] Contract functionality tested
- [ ] Complete user flow tested
- [ ] Deployment documented

## **🔧 Troubleshooting**

### **Common Issues:**
1. **Compilation Errors**: Check Solidity version and imports
2. **Deployment Fails**: Check gas limits and network connection
3. **MetaMask Issues**: Ensure correct network and sufficient balance
4. **Contract Interaction**: Verify function parameters

### **Solutions:**
1. **Check Imports**: Ensure all interface files are uploaded
2. **Increase Gas**: Set higher gas limit for deployment
3. **Check Network**: Verify World Chain testnet connection
4. **Verify Parameters**: Double-check constructor parameters

## **🎯 Success Criteria**

### **Technical Milestones:**
- ✅ All contracts deployed successfully
- ✅ Frontend connected to deployed contracts
- ✅ World ID integration working
- ✅ Graduation mechanism functional
- ✅ Uniswap integration working

### **Business Milestones:**
- ✅ Users can create tokens
- ✅ Users can buy tokens with World ID
- ✅ Tokens can graduate to Uniswap
- ✅ Liquidity is properly locked
- ✅ Platform fees are collected

---

**Ready to deploy! Follow this guide step-by-step for successful deployment! 🚀**
