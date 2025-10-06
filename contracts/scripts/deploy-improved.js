const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying Improved Fair Launchpad Contracts");
  console.log("==============================================");
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());
  
  // Contract addresses (for World Chain Sepolia testnet)
  // Note: These addresses may need to be updated for World Chain Sepolia
  const WLD_TOKEN_ADDRESS = process.env.WLD_TOKEN_ADDRESS || "0x0000000000000000000000000000000000000000";
  const WORLD_ID_ADDRESS = process.env.WORLD_ID_ADDRESS || "0x0000000000000000000000000000000000000000";
  const UNISWAP_FACTORY_ADDRESS = process.env.UNISWAP_FACTORY_ADDRESS || "0x0000000000000000000000000000000000000000";
  const POSITION_MANAGER_ADDRESS = process.env.POSITION_MANAGER_ADDRESS || "0x0000000000000000000000000000000000000000";
  
  // World ID Configuration (you'll need to update these with real values)
  const WORLD_ID_ROOT = process.env.WORLD_ID_ROOT || "0x0000000000000000000000000000000000000000000000000000000000000000";
  const WORLD_ID_GROUP_ID = process.env.WORLD_ID_GROUP_ID || "1";
  const WORLD_ID_EXTERNAL_NULLIFIER = process.env.WORLD_ID_EXTERNAL_NULLIFIER || "0x0000000000000000000000000000000000000000000000000000000000000000";
  
  // Fee Recipients
  const PLATFORM_FEE_RECIPIENT = deployer.address;
  const CREATOR_VESTING_RECIPIENT = deployer.address;
  
  console.log("\n📋 Deployment Configuration:");
  console.log("WLD Token:", WLD_TOKEN_ADDRESS);
  console.log("World ID:", WORLD_ID_ADDRESS);
  console.log("Uniswap Factory:", UNISWAP_FACTORY_ADDRESS);
  console.log("Position Manager:", POSITION_MANAGER_ADDRESS);
  console.log("Platform Fee Recipient:", PLATFORM_FEE_RECIPIENT);
  console.log("Creator Vesting Recipient:", CREATOR_VESTING_RECIPIENT);
  
  try {
    // Step 1: Deploy BondingCurveMinimal (Improved Version)
    console.log("\n🔧 Step 1: Deploying BondingCurveMinimal (Improved)...");
    const BondingCurveMinimal = await ethers.getContractFactory("BondingCurveMinimal");
    const bondingCurveMinimal = await BondingCurveMinimal.deploy(
      "FairLaunch Test Token", // name
      "FLTT", // symbol
      WLD_TOKEN_ADDRESS,
      WORLD_ID_ADDRESS,
      ethers.parseEther("0.001"), // initialPrice: 0.001 WLD per token
      ethers.parseEther("1000000"), // maxSupply: 1M tokens
      WORLD_ID_ROOT,
      WORLD_ID_EXTERNAL_NULLIFIER
    );
    await bondingCurveMinimal.waitForDeployment();
    console.log("✅ BondingCurveMinimal deployed to:", await bondingCurveMinimal.getAddress());
    
    // Step 2: Deploy TokenFactory (Improved Version)
    console.log("\n🔧 Step 2: Deploying TokenFactory...");
    const TokenFactory = await ethers.getContractFactory("TokenFactory");
    const tokenFactory = await TokenFactory.deploy(
      WLD_TOKEN_ADDRESS,
      WORLD_ID_ADDRESS
    );
    await tokenFactory.waitForDeployment();
    console.log("✅ TokenFactory deployed to:", await tokenFactory.getAddress());
    
    // Step 3: Deploy GraduationHandlerOptimized
    console.log("\n🔧 Step 3: Deploying GraduationHandlerOptimized...");
    const GraduationHandlerOptimized = await ethers.getContractFactory("GraduationHandlerOptimized");
    const graduationHandler = await GraduationHandlerOptimized.deploy(
      await bondingCurveMinimal.getAddress(), // token
      WLD_TOKEN_ADDRESS,
      UNISWAP_FACTORY_ADDRESS,
      POSITION_MANAGER_ADDRESS,
      PLATFORM_FEE_RECIPIENT,
      CREATOR_VESTING_RECIPIENT
    );
    await graduationHandler.waitForDeployment();
    console.log("✅ GraduationHandlerOptimized deployed to:", await graduationHandler.getAddress());
    
    // Step 4: Test the contracts
    console.log("\n🧪 Step 4: Testing contract functionality...");
    
    // Test BondingCurveMinimal
    const currentPrice = await bondingCurveMinimal.getCurrentPriceInWLD();
    const graduationProgress = await bondingCurveMinimal.getGraduationProgress();
    console.log("BondingCurveMinimal - Current Price:", ethers.formatEther(currentPrice), "WLD");
    console.log("BondingCurveMinimal - Graduation Progress:", graduationProgress.toString(), "%");
    
    // Test TokenFactory
    const tokenCount = await tokenFactory.getTokenCount();
    console.log("TokenFactory - Token Count:", tokenCount.toString());
    
    // Test GraduationHandlerOptimized
    const isGraduated = await graduationHandler.isGraduated();
    console.log("GraduationHandlerOptimized - Is Graduated:", isGraduated);
    
    // Step 5: Create a sample token via factory
    console.log("\n🔧 Step 5: Creating sample token via factory...");
    const sampleTokenTx = await tokenFactory.createToken(
      "Sample FairLaunch Token",
      "SFLT",
      ethers.parseEther("0.0001"), // initialPrice: 0.0001 WLD per token
      ethers.parseEther("1000000"), // maxSupply: 1M tokens
      WORLD_ID_ROOT,
      WORLD_ID_EXTERNAL_NULLIFIER,
      { value: ethers.parseEther("0.1") } // creation fee
    );
    const receipt = await sampleTokenTx.wait();
    
    // Get the token address from the event
    const tokenCreatedEvent = receipt.logs?.find(log => {
      try {
        const parsed = tokenFactory.interface.parseLog(log);
        return parsed?.name === 'TokenCreated';
      } catch {
        return false;
      }
    });
    
    let sampleTokenAddress = null;
    if (tokenCreatedEvent) {
      const parsed = tokenFactory.interface.parseLog(tokenCreatedEvent);
      sampleTokenAddress = parsed?.args?.token;
      console.log("✅ Sample token created at:", sampleTokenAddress);
    } else {
      console.log("⚠️  Sample token created but address not found in events");
    }
    
    // Summary
    console.log("\n🎉 Deployment Summary:");
    console.log("=====================");
    console.log("BondingCurveMinimal:", await bondingCurveMinimal.getAddress());
    console.log("TokenFactory:", await tokenFactory.getAddress());
    console.log("GraduationHandlerOptimized:", await graduationHandler.getAddress());
    console.log("Sample Token:", sampleTokenAddress || "Not found");
    console.log("Deployer:", deployer.address);
    
    // Save addresses to file
    const addresses = {
      network: "testnet",
      deployer: deployer.address,
      contracts: {
        bondingCurveMinimal: await bondingCurveMinimal.getAddress(),
        tokenFactory: await tokenFactory.getAddress(),
        graduationHandler: await graduationHandler.getAddress(),
        sampleToken: sampleTokenAddress || "Not created"
      },
      external: {
        wldToken: WLD_TOKEN_ADDRESS,
        worldId: WORLD_ID_ADDRESS,
        uniswapFactory: UNISWAP_FACTORY_ADDRESS,
        positionManager: POSITION_MANAGER_ADDRESS
      },
      improvements: {
        worldIdSignal: "Fixed - uses address(this) instead of block.timestamp",
        priceCalculation: "Improved - 0.1% exponential increase with minimum 1 wei",
        graduationLogic: "Enhanced - better graduation handling",
        helperFunctions: "Added - getCurrentPriceInWLD, getTokensForWLD"
      },
      timestamp: new Date().toISOString()
    };
    
    const fs = require('fs');
    fs.writeFileSync('deployment-improved-addresses.json', JSON.stringify(addresses, null, 2));
    console.log("\n💾 Deployment addresses saved to deployment-improved-addresses.json");
    
    console.log("\n📝 Frontend Environment Variables:");
    console.log("===================================");
    console.log(`NEXT_PUBLIC_BONDING_CURVE_ADDRESS=${await bondingCurveMinimal.getAddress()}`);
    console.log(`NEXT_PUBLIC_TOKEN_FACTORY_ADDRESS=${await tokenFactory.getAddress()}`);
    console.log(`NEXT_PUBLIC_GRADUATION_HANDLER_ADDRESS=${await graduationHandler.getAddress()}`);
    console.log(`NEXT_PUBLIC_WLD_TOKEN_ADDRESS=${WLD_TOKEN_ADDRESS}`);
    console.log(`NEXT_PUBLIC_WORLD_ID_ADDRESS=${WORLD_ID_ADDRESS}`);
    console.log(`NEXT_PUBLIC_UNISWAP_FACTORY_ADDRESS=${UNISWAP_FACTORY_ADDRESS}`);
    console.log(`NEXT_PUBLIC_POSITION_MANAGER_ADDRESS=${POSITION_MANAGER_ADDRESS}`);
    
    console.log("\n📝 Next Steps:");
    console.log("1. Update frontend environment variables with new addresses");
    console.log("2. Test contract functionality with real World ID integration");
    console.log("3. Verify contracts on block explorer");
    console.log("4. Test complete user flow");
    console.log("5. Deploy to mainnet when ready");
    
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
