const { ethers } = require("hardhat");

async function main() {
  console.log("🔍 Verifying World Chain Contract Addresses");
  console.log("==========================================");
  
  // Contract addresses to verify
  const contracts = {
    // World ID
    worldId: "0x469449f251692e0779667583026b5a1e99512157",
    
    // Uniswap V3
    uniswapFactory: "0x7a5028BDa40e7B173C278C5342087826455ea25a",
    positionManager: "0xec12a9F9a09f50550686363766Cc153D03c27b5e",
    swapRouter: "0x091AD9e2e6e5eD44c1c66dB50e49A601F9f36cF6",
    
    // WLD Token (NEEDS VERIFICATION)
    wldToken: "0x0000000000000000000000000000000000000000" // Placeholder
  };
  
  console.log("\n📋 Contract Verification Results:");
  console.log("=================================");
  
  for (const [name, address] of Object.entries(contracts)) {
    try {
      if (address === "0x0000000000000000000000000000000000000000") {
        console.log(`❌ ${name}: ${address} (PLACEHOLDER - NEEDS VERIFICATION)`);
        continue;
      }
      
      const code = await ethers.provider.getCode(address);
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
    const network = await ethers.provider.getNetwork();
    console.log(`Chain ID: ${network.chainId}`);
    console.log(`Network Name: ${network.name}`);
    
    const blockNumber = await ethers.provider.getBlockNumber();
    console.log(`Current Block: ${blockNumber}`);
    
    const gasPrice = await ethers.provider.getGasPrice();
    console.log(`Gas Price: ${ethers.utils.formatUnits(gasPrice, "gwei")} gwei`);
    
  } catch (error) {
    console.log(`❌ Network Error: ${error.message}`);
  }
  
  console.log("\n📝 Next Steps:");
  console.log("==============");
  console.log("1. Verify WLD token address on World Chain");
  console.log("2. Test contract interactions");
  console.log("3. Deploy smart contracts");
  console.log("4. Verify deployment success");
  
  console.log("\n⚠️  Important Notes:");
  console.log("===================");
  console.log("- WLD token address needs verification");
  console.log("- Test all contracts before deployment");
  console.log("- Use testnet for initial testing");
  console.log("- Verify all addresses from official sources");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });





