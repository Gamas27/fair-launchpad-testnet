// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/BondingCurveMinimal.sol";
import "../src/TokenFactory.sol";
import "../src/GraduationHandlerOptimized.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerPrivateKey);
        
        console.log("Deploying contracts with account:", deployer);
        console.log("Account balance:", deployer.balance);
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy BondingCurveMinimal
        BondingCurveMinimal bondingCurve = new BondingCurveMinimal(
            "FairLaunch Test Token",
            "FLTT",
            address(0), // wldToken (zero address for testing)
            address(0), // worldId (zero address for testing)
            0.001 ether, // initialPrice: 0.001 WLD per token
            1000000 ether, // maxSupply: 1M tokens
            0x0000000000000000000000000000000000000000000000000000000000000000, // worldIdRoot
            0x0000000000000000000000000000000000000000000000000000000000000000  // worldIdExternalNullifier
        );
        
        console.log("BondingCurveMinimal deployed at:", address(bondingCurve));
        
        // Deploy TokenFactory
        TokenFactory tokenFactory = new TokenFactory(
            address(0), // wldToken (zero address for testing)
            address(0)  // worldId (zero address for testing)
        );
        
        console.log("TokenFactory deployed at:", address(tokenFactory));
        
        // Deploy GraduationHandlerOptimized
        GraduationHandlerOptimized graduationHandler = new GraduationHandlerOptimized(
            address(bondingCurve), // token
            address(0), // wldToken (zero address for testing)
            address(0), // uniswapFactory (zero address for testing)
            address(0), // positionManager (zero address for testing)
            deployer, // platformFeeRecipient
            deployer  // creatorVestingRecipient
        );
        
        console.log("GraduationHandlerOptimized deployed at:", address(graduationHandler));
        
        vm.stopBroadcast();
        
        console.log("\n=== Deployment Summary ===");
        console.log("BondingCurveMinimal:", address(bondingCurve));
        console.log("TokenFactory:", address(tokenFactory));
        console.log("GraduationHandlerOptimized:", address(graduationHandler));
        console.log("Deployer:", deployer);
        
        // Test the contracts
        console.log("\n=== Testing Contracts ===");
        console.log("BondingCurveMinimal - Current Price:", bondingCurve.getCurrentPriceInWLD());
        console.log("BondingCurveMinimal - Graduation Progress:", bondingCurve.getGraduationProgress());
        console.log("TokenFactory - Token Count:", tokenFactory.getTokenCount());
        console.log("GraduationHandlerOptimized - Is Graduated:", graduationHandler.isGraduated());
    }
}

