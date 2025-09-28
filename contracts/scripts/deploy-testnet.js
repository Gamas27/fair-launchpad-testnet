const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying Fair Launchpad Smart Contracts to Testnet");
  console.log("=====================================================");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());
  
  // Contract addresses (you'll need to update these with actual World Chain addresses)
  const WLD_TOKEN_ADDRESS = process.env.WLD_TOKEN_ADDRESS || "0x0000000000000000000000000000000000000000";
  const WORLD_ID_ADDRESS = process.env.WORLD_ID_ADDRESS || "0x0000000000000000000000000000000000000000";
  const UNISWAP_FACTORY_ADDRESS = process.env.UNISWAP_FACTORY_ADDRESS || "0x0000000000000000000000000000000000000000";
  const POSITION_MANAGER_ADDRESS = process.env.POSITION_MANAGER_ADDRESS || "0x0000000000000000000000000000000000000000";
  
  // World ID Configuration
  const WORLD_ID_ROOT = process.env.WORLD_ID_ROOT || "0x0000000000000000000000000000000000000000000000000000000000000000";
  const WORLD_ID_GROUP_ID = process.env.WORLD_ID_GROUP_ID || "1";
  const WORLD_ID_EXTERNAL_NULLIFIER = process.env.WORLD_ID_EXTERNAL_NULLIFIER || "0x0000000000000000000000000000000000000000000000000000000000000000";
  
  // Fee Recipients
  const PLATFORM_FEE_RECIPIENT = deployer.address;
  const CREATOR_VESTING_RECIPIENT = deployer.address;
  
  // Creation Fee (in WLD)
  const CREATION_FEE = ethers.utils.parseEther("1"); // 1 WLD
  
  console.log("\n📋 Deployment Configuration:");
  console.log("WLD Token:", WLD_TOKEN_ADDRESS);
  console.log("World ID:", WORLD_ID_ADDRESS);
  console.log("Uniswap Factory:", UNISWAP_FACTORY_ADDRESS);
  console.log("Position Manager:", POSITION_MANAGER_ADDRESS);
  console.log("Platform Fee Recipient:", PLATFORM_FEE_RECIPIENT);
  console.log("Creator Vesting Recipient:", CREATOR_VESTING_RECIPIENT);
  console.log("Creation Fee:", ethers.utils.formatEther(CREATION_FEE), "WLD");
  
  try {
    // Step 1: Deploy GraduationHandler
    console.log("\n🔧 Step 1: Deploying GraduationHandler...");
    const GraduationHandler = await ethers.getContractFactory("GraduationHandler");
    const graduationHandler = await GraduationHandler.deploy(
      UNISWAP_FACTORY_ADDRESS,
      POSITION_MANAGER_ADDRESS
    );
    await graduationHandler.deployed();
    console.log("✅ GraduationHandler deployed to:", graduationHandler.address);
    
    // Step 2: Deploy TokenFactory
    console.log("\n🔧 Step 2: Deploying TokenFactory...");
    const TokenFactory = await ethers.getContractFactory("TokenFactory");
    const tokenFactory = await TokenFactory.deploy(
      WLD_TOKEN_ADDRESS,
      WORLD_ID_ADDRESS,
      UNISWAP_FACTORY_ADDRESS,
      POSITION_MANAGER_ADDRESS,
      graduationHandler.address,
      PLATFORM_FEE_RECIPIENT,
      CREATOR_VESTING_RECIPIENT,
      WORLD_ID_ROOT,
      WORLD_ID_GROUP_ID,
      WORLD_ID_EXTERNAL_NULLIFIER,
      CREATION_FEE
    );
    await tokenFactory.deployed();
    console.log("✅ TokenFactory deployed to:", tokenFactory.address);
    
    // Step 3: Create a sample token
    console.log("\n🔧 Step 3: Creating sample token...");
    const sampleTokenTx = await tokenFactory.createToken(
      "FairLaunch Test Token",
      "FLTT",
      ethers.utils.parseEther("1000000"), // 1M tokens
      ethers.utils.parseEther("0.0001")  // 0.0001 WLD per token
    );
    const receipt = await sampleTokenTx.wait();
    
    // Get the token address from the event
    const tokenCreatedEvent = receipt.events?.find(e => e.event === 'TokenCreated');
    const sampleTokenAddress = tokenCreatedEvent?.args?.token;
    
    if (sampleTokenAddress) {
      console.log("✅ Sample token created at:", sampleTokenAddress);
    } else {
      console.log("⚠️  Sample token created but address not found in events");
    }
    
    // Step 4: Verify deployments
    console.log("\n🔍 Step 4: Verifying deployments...");
    
    // Check GraduationHandler
    const graduationHandlerOwner = await graduationHandler.owner();
    console.log("GraduationHandler owner:", graduationHandlerOwner);
    
    // Check TokenFactory
    const tokenFactoryOwner = await tokenFactory.owner();
    const tokenCount = await tokenFactory.getTokenCount();
    console.log("TokenFactory owner:", tokenFactoryOwner);
    console.log("Total tokens created:", tokenCount.toString());
    
    // Summary
    console.log("\n🎉 Deployment Summary:");
    console.log("=====================");
    console.log("GraduationHandler:", graduationHandler.address);
    console.log("TokenFactory:", tokenFactory.address);
    console.log("Sample Token:", sampleTokenAddress || "Not found");
    console.log("Deployer:", deployer.address);
    
    // Save addresses to file
    const addresses = {
      network: "testnet",
      deployer: deployer.address,
      contracts: {
        graduationHandler: graduationHandler.address,
        tokenFactory: tokenFactory.address,
        sampleToken: sampleTokenAddress || "Not created"
      },
      external: {
        wldToken: WLD_TOKEN_ADDRESS,
        worldId: WORLD_ID_ADDRESS,
        uniswapFactory: UNISWAP_FACTORY_ADDRESS,
        positionManager: POSITION_MANAGER_ADDRESS
      },
      timestamp: new Date().toISOString()
    };
    
    const fs = require('fs');
    fs.writeFileSync('deployment-addresses.json', JSON.stringify(addresses, null, 2));
    console.log("\n💾 Deployment addresses saved to deployment-addresses.json");
    
    console.log("\n📝 Next Steps:");
    console.log("1. Update frontend environment variables with contract addresses");
    console.log("2. Test contract functionality");
    console.log("3. Verify contracts on block explorer");
    console.log("4. Test complete user flow");
    
  } catch (error) {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



