const { ethers } = require("ethers");

async function main() {
  console.log("🚀 Simple Deployment to World Chain");
  console.log("===================================");
  
  // World Chain testnet configuration
  const RPC_URL = "https://rpc.testnet.worldchain.org";
  const CHAIN_ID = 480;
  
  // Contract addresses (VERIFIED)
  const WLD_TOKEN_ADDRESS = "0x5b6ec6566f8270e2dc56525566b8341d29a17093";
  const WORLD_ID_ADDRESS = "0x469449f251692e0779667583026b5a1e99512157";
  const UNISWAP_FACTORY_ADDRESS = "0x7a5028BDa40e7B173C278C5342087826455ea25a";
  const POSITION_MANAGER_ADDRESS = "0xec12a9F9a09f50550686363766Cc153D03c27b5e";
  
  console.log("\n📋 Contract Addresses:");
  console.log("WLD Token:", WLD_TOKEN_ADDRESS);
  console.log("World ID:", WORLD_ID_ADDRESS);
  console.log("Uniswap Factory:", UNISWAP_FACTORY_ADDRESS);
  console.log("Position Manager:", POSITION_MANAGER_ADDRESS);
  
  try {
    // Create provider
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    
    // Check network connection
    const network = await provider.getNetwork();
    console.log(`\n🔗 Connected to: ${network.name} (Chain ID: ${network.chainId})`);
    
    // Check if we have a private key
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      console.log("\n⚠️  No private key found. Please set PRIVATE_KEY environment variable.");
      console.log("Example: export PRIVATE_KEY=your_private_key_here");
      console.log("\n📝 For testing, you can use a test wallet with testnet WLD tokens.");
      return;
    }
    
    // Create wallet
    const wallet = new ethers.Wallet(privateKey, provider);
    console.log(`\n👤 Deploying with account: ${wallet.address}`);
    
    // Check balance
    const balance = await provider.getBalance(wallet.address);
    console.log(`💰 Account balance: ${ethers.formatEther(balance)} ETH`);
    
    if (balance === 0n) {
      console.log("\n⚠️  Account has no balance. Please fund the account with testnet WLD tokens.");
      console.log("You can get testnet WLD from World Chain faucet or bridge.");
      return;
    }
    
    console.log("\n✅ Ready to deploy smart contracts!");
    console.log("\n📝 Next Steps:");
    console.log("1. Deploy contracts using Remix IDE (recommended)");
    console.log("2. Or use the deployment scripts with proper Hardhat setup");
    console.log("3. Update frontend environment variables");
    
    console.log("\n🔗 Remix IDE Deployment:");
    console.log("1. Go to https://remix.ethereum.org");
    console.log("2. Upload contract files");
    console.log("3. Connect to World Chain testnet");
    console.log("4. Deploy contracts with verified addresses");
    
    console.log("\n📋 Contract Addresses for Frontend:");
    console.log(`NEXT_PUBLIC_WLD_TOKEN_ADDRESS=${WLD_TOKEN_ADDRESS}`);
    console.log(`NEXT_PUBLIC_WORLD_ID_ADDRESS=${WORLD_ID_ADDRESS}`);
    console.log(`NEXT_PUBLIC_UNISWAP_FACTORY_ADDRESS=${UNISWAP_FACTORY_ADDRESS}`);
    console.log(`NEXT_PUBLIC_POSITION_MANAGER_ADDRESS=${POSITION_MANAGER_ADDRESS}`);
    
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });






