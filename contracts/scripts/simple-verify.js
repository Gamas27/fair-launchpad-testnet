const { ethers } = require("ethers");

async function main() {
  console.log("🔍 Simple Contract Address Verification");
  console.log("=====================================");
  
  // World Chain testnet RPC
  const RPC_URL = "https://rpc.testnet.worldchain.org";
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  
  // Contract addresses to verify
  const contracts = {
    // World ID
    worldId: "0x469449f251692e0779667583026b5a1e99512157",
    
    // Uniswap V3
    uniswapFactory: "0x7a5028BDa40e7B173C278C5342087826455ea25a",
    positionManager: "0xec12a9F9a09f50550686363766Cc153D03c27b5e",
    swapRouter: "0x091AD9e2e6e5eD44c1c66dB50e49A601F9f36cF6",
  };
  
  console.log("\n📋 Contract Verification Results:");
  console.log("=================================");
  
  for (const [name, address] of Object.entries(contracts)) {
    try {
      const code = await provider.getCode(address);
      if (code === "0x") {
        console.log(`❌ ${name}: ${address} (NO CODE FOUND)`);
      } else {
        console.log(`✅ ${name}: ${address} (VERIFIED)`);
      }
    } catch (error) {
      console.log(`❌ ${name}: ${address} (ERROR: ${error.message})`);
    }
  }
  
  console.log("\n🔧 Network Information:");
  console.log("======================");
  
  try {
    const network = await provider.getNetwork();
    console.log(`Chain ID: ${network.chainId}`);
    console.log(`Network Name: ${network.name}`);
    
    const blockNumber = await provider.getBlockNumber();
    console.log(`Current Block: ${blockNumber}`);
    
    const gasPrice = await provider.getGasPrice();
    console.log(`Gas Price: ${ethers.formatUnits(gasPrice, "gwei")} gwei`);
    
  } catch (error) {
    console.log(`❌ Network Error: ${error.message}`);
  }
  
  console.log("\n🔍 Searching for WLD Token...");
  console.log("============================");
  
  // Common patterns for WLD token
  const possibleWLDAddresses = [
    "0x0000000000000000000000000000000000000000", // Placeholder
    "0x0000000000000000000000000000000000000001", // Common test
    "0x0000000000000000000000000000000000000002", // Another test
  ];
  
  for (const address of possibleWLDAddresses) {
    try {
      const code = await provider.getCode(address);
      if (code !== "0x") {
        console.log(`✅ Found contract at: ${address}`);
        
        // Try to get token info
        try {
          const tokenContract = new ethers.Contract(address, [
            "function name() view returns (string)",
            "function symbol() view returns (string)",
            "function decimals() view returns (uint8)",
            "function totalSupply() view returns (uint256)"
          ], provider);
          
          const name = await tokenContract.name();
          const symbol = await tokenContract.symbol();
          const decimals = await tokenContract.decimals();
          const totalSupply = await tokenContract.totalSupply();
          
          console.log(`   Name: ${name}`);
          console.log(`   Symbol: ${symbol}`);
          console.log(`   Decimals: ${decimals}`);
          console.log(`   Total Supply: ${ethers.formatEther(totalSupply)}`);
          
          if (symbol === "WLD" || name.includes("World")) {
            console.log(`   🎯 This might be the WLD token!`);
          }
        } catch (error) {
          console.log(`   ❌ Error reading token info: ${error.message}`);
        }
      } else {
        console.log(`❌ No contract at: ${address}`);
      }
    } catch (error) {
      console.log(`❌ Error checking ${address}: ${error.message}`);
    }
  }
  
  console.log("\n📝 Next Steps:");
  console.log("==============");
  console.log("1. Check World Chain explorer for WLD token");
  console.log("2. Use alternative token for testing");
  console.log("3. Deploy test ERC20 token");
  console.log("4. Contact World Chain support");
  
  console.log("\n🔗 Useful Resources:");
  console.log("===================");
  console.log("- World Chain Explorer: https://explorer.worldchain.org");
  console.log("- World Chain Documentation: https://docs.world.org");
  console.log("- Uniswap V3 Deployments: https://docs.uniswap.org/contracts/v3/reference/deployments/WorldChain-deployments");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error.message);
    process.exit(1);
  });










