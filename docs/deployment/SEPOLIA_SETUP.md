# 🔧 Sepolia Testnet Setup Instructions

## **Quick Fix for MetaMask Not Using Sepolia Testnet**

### **Step 1: Set Environment Variables**

Create a `.env.local` file in your project root with:

```bash
# RPC Configuration - Sepolia Testnet
NEXT_PUBLIC_RPC_URL=https://rpc.sepolia.org
NEXT_PUBLIC_CHAIN_ID=11155111

# Privy Configuration
NEXT_PUBLIC_PRIVY_APP_ID=cmg1jgvhy00j6l50cpsv0yt3e

# Environment
NEXT_PUBLIC_ENVIRONMENT=testnet
```

### **Step 2: Restart the Application**

```bash
# Stop the current server (Ctrl+C)
# Then restart with:
npm run dev
```

### **Step 3: Configure MetaMask for Sepolia**

1. **Open MetaMask**
2. **Click on the network dropdown** (top of extension)
3. **Click "Add network"**
4. **Click "Add a network manually"**
5. **Enter these details:**
   - **Network Name**: `Sepolia Testnet`
   - **RPC URL**: `https://rpc.sepolia.org`
   - **Chain ID**: `11155111`
   - **Currency Symbol**: `ETH`
   - **Block Explorer**: `https://sepolia.etherscan.io`
6. **Click "Save"**

### **Step 4: Get Testnet ETH**

Visit these faucets to get free Sepolia ETH:
- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [Chainlink Sepolia Faucet](https://faucets.chain.link/sepolia)

### **Step 5: Test Token Creation**

1. **Navigate to** `http://localhost:3000`
2. **Click "Launch" tab**
3. **Connect MetaMask** (should now be on Sepolia)
4. **Verify with World ID**
5. **Fill out token creation form**
6. **Click "Launch Token"**

### **Step 6: Verify Network**

The application now includes a **Network Switcher** component that will:
- ✅ Show your current network
- ✅ Warn if you're on mainnet
- ✅ Provide a button to switch to Sepolia
- ✅ Show network details

### **Troubleshooting**

**If MetaMask still doesn't use Sepolia:**

1. **Check the Network Switcher** on the Launch page
2. **Click "Switch to Sepolia Testnet"** button
3. **Confirm the network switch** in MetaMask
4. **Refresh the page** if needed

**If you get "Insufficient funds":**
- Get more testnet ETH from the faucets above
- Make sure you're on Sepolia testnet (not mainnet)

**If transactions still fail:**
- Check that you have enough testnet ETH (at least 0.01 ETH)
- Verify you're on Sepolia testnet (Chain ID: 11155111)
- Try increasing gas limit in MetaMask

### **Network Details**

- **Sepolia Testnet**: Chain ID 11155111
- **RPC URL**: https://rpc.sepolia.org
- **Explorer**: https://sepolia.etherscan.io
- **Currency**: ETH (testnet)

## **✅ Ready to Test!**

Your application is now configured to use Sepolia testnet by default. The Network Switcher will help ensure you're on the correct network for testing token creation.
