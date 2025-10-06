const { ethers } = require("hardhat");

async function main() {
  console.log("🧪 Testing Deployment to World Chain Sepolia");
  console.log("===========================================");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());
  
  try {
    // Test with a simple contract first
    console.log("\n🔧 Testing with BondingCurveMinimal...");
    
    // Try to get the contract factory
    const BondingCurveMinimal = await ethers.getContractFactory("BondingCurveMinimal");
    console.log("✅ Contract factory created successfully");
    
    // Deploy the contract
    const bondingCurveMinimal = await BondingCurveMinimal.deploy(
      "FairLaunch Test Token", // name
      "FLTT", // symbol
      "0x0000000000000000000000000000000000000000", // wldToken (zero address for testing)
      "0x0000000000000000000000000000000000000000", // worldId (zero address for testing)
      ethers.parseEther("0.001"), // initialPrice: 0.001 WLD per token
      ethers.parseEther("1000000"), // maxSupply: 1M tokens
      "0x0000000000000000000000000000000000000000000000000000000000000000", // worldIdRoot
      "0x0000000000000000000000000000000000000000000000000000000000000000"  // worldIdExternalNullifier
    );
    
    await bondingCurveMinimal.waitForDeployment();
    console.log("✅ BondingCurveMinimal deployed to:", await bondingCurveMinimal.getAddress());
    
    // Test the contract
    const currentPrice = await bondingCurveMinimal.getCurrentPriceInWLD();
    const graduationProgress = await bondingCurveMinimal.getGraduationProgress();
    console.log("Current Price:", ethers.formatEther(currentPrice), "WLD");
    console.log("Graduation Progress:", graduationProgress.toString(), "%");
    
    console.log("\n🎉 Test deployment successful!");
    console.log("Contract Address:", await bondingCurveMinimal.getAddress());
    
  } catch (error) {
    console.error("❌ Test deployment failed:", error.message);
    console.error("Full error:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


