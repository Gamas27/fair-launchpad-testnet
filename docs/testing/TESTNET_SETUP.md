# 🧪 Testnet Setup Guide

## **MetaMask Testnet Configuration**

### **1. Sepolia Testnet (Recommended)**

**Network Configuration:**
- **Network Name**: `Sepolia Testnet`
- **RPC URL**: `https://sepolia.infura.io/v3/YOUR_INFURA_KEY` or `https://rpc.sepolia.org`
- **Chain ID**: `11155111`
- **Currency Symbol**: `ETH`
- **Block Explorer**: `https://sepolia.etherscan.io`

**Steps to Add:**
1. Open MetaMask
2. Click on network dropdown (top of extension)
3. Click "Add network"
4. Click "Add a network manually"
5. Enter the configuration above
6. Click "Save"

### **2. Goerli Testnet (Alternative)**

**Network Configuration:**
- **Network Name**: `Goerli Testnet`
- **RPC URL**: `https://goerli.infura.io/v3/YOUR_INFURA_KEY`
- **Chain ID**: `5`
- **Currency Symbol**: `ETH`
- **Block Explorer**: `https://goerli.etherscan.io`

### **3. Get Testnet ETH**

**Sepolia Faucets:**
- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [Chainlink Sepolia Faucet](https://faucets.chain.link/sepolia)

**Goerli Faucets:**
- [Goerli Faucet](https://goerli-faucet.pk910.de/)
- [Alchemy Goerli Faucet](https://goerlifaucet.com/)

**Requirements:**
- Twitter account (for most faucets)
- GitHub account (for some faucets)
- Discord account (for some faucets)

### **4. Testing Token Creation**

**Prerequisites:**
1. ✅ MetaMask connected to testnet
2. ✅ Testnet ETH in wallet (at least 0.01 ETH)
3. ✅ World ID verification completed
4. ✅ Application running on localhost:3000

**Test Steps:**
1. Navigate to `http://localhost:3000`
2. Click "Launch" tab
3. Connect MetaMask wallet
4. Verify with World ID
5. Fill out token creation form:
   - **Token Name**: `Test Token`
   - **Token Symbol**: `TEST`
   - **Description**: `A test token for development`
   - **Initial Price**: `0.001` (in ETH)
   - **Max Supply**: `1000000`
6. Click "Launch Token"
7. Confirm transaction in MetaMask
8. Wait for transaction confirmation
9. Check token address in success message

### **5. Troubleshooting**

**Common Issues:**

**❌ "Insufficient funds"**
- **Solution**: Get more testnet ETH from faucets

**❌ "Transaction failed"**
- **Solution**: Check gas settings, try increasing gas limit

**❌ "Network not supported"**
- **Solution**: Ensure MetaMask is on the correct testnet

**❌ "Contract not found"**
- **Solution**: Verify contract addresses are correct for testnet

### **6. Environment Variables for Testnet**

**Update `.env.local`:**
```bash
# Testnet Configuration
NEXT_PUBLIC_ENVIRONMENT=testnet
NEXT_PUBLIC_CHAIN_ID=11155111  # Sepolia
NEXT_PUBLIC_RPC_URL=https://rpc.sepolia.org

# Testnet Contract Addresses (Update these after deployment)
NEXT_PUBLIC_TOKEN_FACTORY_ADDRESS=0x...
NEXT_PUBLIC_BONDING_CURVE_ADDRESS=0x...
NEXT_PUBLIC_GRADUATION_HANDLER_ADDRESS=0x...
```

### **7. Contract Deployment on Testnet**

**Deploy to Sepolia:**
1. Use Remix IDE or Hardhat
2. Connect MetaMask to Sepolia
3. Deploy contracts with testnet parameters
4. Update contract addresses in environment variables
5. Test token creation functionality

### **8. Monitoring Transactions**

**Block Explorers:**
- **Sepolia**: https://sepolia.etherscan.io
- **Goerli**: https://goerli.etherscan.io

**Check Transaction Status:**
1. Copy transaction hash from success message
2. Paste into block explorer
3. Verify transaction details
4. Check contract interactions

### **9. Testing Checklist**

- [ ] MetaMask connected to testnet
- [ ] Testnet ETH available (≥0.01 ETH)
- [ ] World ID verification completed
- [ ] Token creation form filled out
- [ ] Transaction confirmed in MetaMask
- [ ] Token address received
- [ ] Transaction visible on block explorer
- [ ] Contract interaction successful

### **10. Next Steps After Testing**

1. **Deploy to Mainnet**: Once testnet testing is complete
2. **Update Contract Addresses**: Use mainnet addresses
3. **Configure Production**: Update environment variables
4. **Launch Production**: Deploy to production environment

## **🚀 Ready to Test!**

Follow these steps to test your token creation functionality on Ethereum testnets with MetaMask integration!
