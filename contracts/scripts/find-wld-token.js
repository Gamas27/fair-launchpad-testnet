const { ethers } = require("hardhat");

async function main() {
  console.log("🔍 Finding WLD Token Address on World Chain");
  console.log("===========================================");
  
  try {
    // Get network information
    const network = await ethers.provider.getNetwork();
    console.log(`Network: ${network.name} (Chain ID: ${network.chainId})`);
    
    // Common WLD token addresses to check
    const possibleWLDAddresses = [
      // These are common patterns, but may not be correct for World Chain
      "0x0000000000000000000000000000000000000000", // Placeholder
      "0x0000000000000000000000000000000000000001", // Common test token
      "0x0000000000000000000000000000000000000002", // Another common test token
    ];
    
    console.log("\n🔍 Checking possible WLD token addresses:");
    console.log("=========================================");
    
    for (const address of possibleWLDAddresses) {
      try {
        const code = await ethers.provider.getCode(address);
        if (code !== "0x") {
          console.log(`✅ Found contract at: ${address}`);
          
          // Try to get token info
          try {
            const tokenContract = new ethers.Contract(address, [
              "function name() view returns (string)",
              "function symbol() view returns (string)",
              "function decimals() view returns (uint8)",
              "function totalSupply() view returns (uint256)"
            ], ethers.provider);
            
            const name = await tokenContract.name();
            const symbol = await tokenContract.symbol();
            const decimals = await tokenContract.decimals();
            const totalSupply = await tokenContract.totalSupply();
            
            console.log(`   Name: ${name}`);
            console.log(`   Symbol: ${symbol}`);
            console.log(`   Decimals: ${decimals}`);
            console.log(`   Total Supply: ${ethers.utils.formatEther(totalSupply)}`);
            
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
    
    console.log("\n📋 Manual Steps to Find WLD Token:");
    console.log("==================================");
    console.log("1. Check World Chain block explorer");
    console.log("2. Look for 'WLD' or 'World' token contracts");
    console.log("3. Check World Chain documentation");
    console.log("4. Contact World Chain support");
    console.log("5. Use alternative token for testing");
    
    console.log("\n🔗 Useful Resources:");
    console.log("===================");
    console.log("- World Chain Explorer: https://explorer.worldchain.org");
    console.log("- World Chain Documentation: https://docs.world.org");
    console.log("- World Chain Support: Contact via official channels");
    
    console.log("\n⚠️  Alternative Approach:");
    console.log("=========================");
    console.log("If WLD token is not available, you can:");
    console.log("1. Deploy a test ERC20 token");
    console.log("2. Use an existing test token");
    console.log("3. Mock the WLD token for testing");
    
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











