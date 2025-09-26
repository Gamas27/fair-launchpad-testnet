# ✅ Remix Deployment Checklist

## **🚀 Quick Deployment Checklist**

### **Phase 1: Setup (5 min)**
- [ ] Open [remix.ethereum.org](https://remix.ethereum.org)
- [ ] Create workspace: "Fair Launchpad"
- [ ] Create folders: `contracts/`, `contracts/interfaces/`, `contracts/mocks/`

### **Phase 2: Upload Files (5 min)**
- [ ] Upload `BondingCurve.sol` to `contracts/`
- [ ] Upload `GraduationHandler.sol` to `contracts/`
- [ ] Upload `TokenFactory.sol` to `contracts/`
- [ ] Upload `IWorldID.sol` to `contracts/interfaces/`
- [ ] Upload `IUniswapV3Factory.sol` to `contracts/interfaces/`
- [ ] Upload `IUniswapV3Pool.sol` to `contracts/interfaces/`
- [ ] Upload `INonfungiblePositionManager.sol` to `contracts/interfaces/`
- [ ] Upload `MockERC20.sol` to `contracts/mocks/`
- [ ] Upload `MockWorldID.sol` to `contracts/mocks/`
- [ ] Upload `MockUniswapFactory.sol` to `contracts/mocks/`
- [ ] Upload `MockPositionManager.sol` to `contracts/mocks/`

### **Phase 3: Compile (2 min)**
- [ ] Go to **Solidity Compiler** tab
- [ ] Select version: `0.8.19`
- [ ] Enable optimization: `200 runs`
- [ ] Compile `BondingCurve.sol`
- [ ] Compile `GraduationHandler.sol`
- [ ] Compile `TokenFactory.sol`
- [ ] Check for compilation errors

### **Phase 4: Setup MetaMask (5 min)**
- [ ] Install MetaMask extension
- [ ] Add World Chain Testnet:
  - [ ] Network Name: World Chain Testnet
  - [ ] RPC URL: `https://rpc.testnet.worldchain.org`
  - [ ] Chain ID: `480`
  - [ ] Currency: WLD
- [ ] Get testnet WLD tokens
- [ ] Ensure balance: 1-2 WLD

### **Phase 5: Deploy Contracts (15 min)**

#### **Deploy Mock Contracts:**
- [ ] **MockERC20**: name="World ID Token", symbol="WLD", initialSupply="1000000000000000000000000"
- [ ] **MockWorldID**: (no parameters)
- [ ] **MockUniswapFactory**: (no parameters)
- [ ] **MockPositionManager**: (no parameters)

#### **Deploy Core Contracts:**
- [ ] **GraduationHandler**: _uniswapFactory=MockUniswapFactory, _positionManager=MockPositionManager
- [ ] **TokenFactory**: _wldToken=MockERC20, _worldId=MockWorldID, _uniswapFactory=MockUniswapFactory, _positionManager=MockPositionManager, _graduationHandler=GraduationHandler, _platformFeeRecipient=your_address, _creatorVestingRecipient=your_address, _worldIdRoot=0x0000000000000000000000000000000000000000000000000000000000000000, _worldIdGroupId=1, _worldIdExternalNullifier=0x0000000000000000000000000000000000000000000000000000000000000000, _creationFee=1000000000000000000

#### **Create Sample Token:**
- [ ] Use **TokenFactory** contract
- [ ] Call **createToken**: name="FairLaunch Test Token", symbol="FLTT", maxSupply="1000000000000000000000000", initialPrice="100000000000000"
- [ ] Send 1 WLD as value

### **Phase 6: Record Addresses (2 min)**
- [ ] Record MockERC20 address
- [ ] Record MockWorldID address
- [ ] Record MockUniswapFactory address
- [ ] Record MockPositionManager address
- [ ] Record GraduationHandler address
- [ ] Record TokenFactory address
- [ ] Record Sample Token address

### **Phase 7: Update Frontend (5 min)**
- [ ] Copy addresses to `.env.local`
- [ ] Update environment variables
- [ ] Restart frontend application
- [ ] Test contract connections

### **Phase 8: Test Deployment (5 min)**
- [ ] Test token creation
- [ ] Test token purchasing
- [ ] Test graduation mechanism
- [ ] Test Uniswap integration
- [ ] Verify on block explorer

## **📋 Contract Addresses Template**

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

## **🎯 Success Criteria**

### **Technical Milestones:**
- [ ] All contracts deployed successfully
- [ ] Frontend connected to deployed contracts
- [ ] World ID integration working
- [ ] Graduation mechanism functional
- [ ] Uniswap integration working

### **Business Milestones:**
- [ ] Users can create tokens
- [ ] Users can buy tokens with World ID
- [ ] Tokens can graduate to Uniswap
- [ ] Liquidity is properly locked
- [ ] Platform fees are collected

## **⏱️ Time Estimate: 30-45 minutes**

---

**Follow this checklist step-by-step for successful deployment! 🚀**
