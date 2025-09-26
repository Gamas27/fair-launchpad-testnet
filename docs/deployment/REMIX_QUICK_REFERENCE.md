# 🚀 Remix Deployment Quick Reference

## **⚡ Quick Start (5 Minutes)**

### **1. Open Remix IDE**
- Go to [remix.ethereum.org](https://remix.ethereum.org)
- Create workspace: `Fair Launchpad`

### **2. Upload Files**
Upload these files to `contracts/` folder:
- `BondingCurve.sol`
- `GraduationHandler.sol`
- `TokenFactory.sol`
- `interfaces/IWorldID.sol`
- `interfaces/IUniswapV3Factory.sol`
- `interfaces/IUniswapV3Pool.sol`
- `interfaces/INonfungiblePositionManager.sol`
- `MockERC20.sol`
- `MockWorldID.sol`
- `MockUniswapFactory.sol`
- `MockPositionManager.sol`

### **3. Compile Contracts**
- Go to **Solidity Compiler** tab
- Select version: `0.8.19`
- Enable optimization: `200 runs`
- Compile all contracts

### **4. Setup MetaMask**
- Install MetaMask extension
- Add World Chain Testnet:
  - **Network Name**: World Chain Testnet
  - **RPC URL**: `https://rpc.testnet.worldchain.org`
  - **Chain ID**: `480`
  - **Currency**: WLD
- Get testnet WLD tokens

### **5. Deploy Contracts**
- Go to **Deploy & Run Transactions** tab
- Select **Injected Provider - MetaMask**
- Deploy in this order:

#### **Mock Contracts:**
1. **MockERC20**: name="World ID Token", symbol="WLD", initialSupply="1000000000000000000000000"
2. **MockWorldID**: (no parameters)
3. **MockUniswapFactory**: (no parameters)
4. **MockPositionManager**: (no parameters)

#### **Core Contracts:**
1. **GraduationHandler**: _uniswapFactory=MockUniswapFactory, _positionManager=MockPositionManager
2. **TokenFactory**: _wldToken=MockERC20, _worldId=MockWorldID, _uniswapFactory=MockUniswapFactory, _positionManager=MockPositionManager, _graduationHandler=GraduationHandler, _platformFeeRecipient=your_address, _creatorVestingRecipient=your_address, _worldIdRoot=0x0000000000000000000000000000000000000000000000000000000000000000, _worldIdGroupId=1, _worldIdExternalNullifier=0x0000000000000000000000000000000000000000000000000000000000000000, _creationFee=1000000000000000000

#### **Create Sample Token:**
1. Use **TokenFactory** contract
2. Call **createToken**: name="FairLaunch Test Token", symbol="FLTT", maxSupply="1000000000000000000000000", initialPrice="100000000000000"
3. Send 1 WLD as value

## **📋 Contract Addresses Template**

After deployment, record all addresses:

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

## **🔧 Common Issues & Solutions**

### **Compilation Errors**
- **Issue**: Import errors
- **Solution**: Ensure all interface files are uploaded

### **Deployment Fails**
- **Issue**: Gas limit exceeded
- **Solution**: Increase gas limit in MetaMask

### **MetaMask Issues**
- **Issue**: Wrong network
- **Solution**: Switch to World Chain Testnet

### **Contract Interaction**
- **Issue**: Function calls fail
- **Solution**: Check function parameters and gas limits

## **✅ Success Checklist**

- [ ] All contracts compiled successfully
- [ ] MetaMask connected to World Chain
- [ ] Mock contracts deployed
- [ ] Core contracts deployed
- [ ] Sample token created
- [ ] All addresses recorded
- [ ] Frontend updated with addresses
- [ ] Contract functionality tested

## **🎯 Next Steps**

1. **Update Frontend**: Set contract addresses in `.env.local`
2. **Test Application**: Verify all functionality works
3. **Document Results**: Record deployment addresses
4. **Test Complete Flow**: End-to-end validation

---

**Ready to deploy! Follow this quick reference for fast deployment! 🚀**

