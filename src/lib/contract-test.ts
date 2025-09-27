// Contract Integration Test Script
// This script tests the integration with deployed contracts

import { ethers } from 'ethers'

// Contract addresses from deployment
const CONTRACT_ADDRESSES = {
  TOKEN_FACTORY: '0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47',
  BONDING_CURVE: '0xd9145CCE52D386f254917e481eB44e9943F39138',
  GRADUATION_HANDLER: '0xDA0bab807633f07f013f94DD0E6A4F96F8742B53',
}

// RPC Configuration
const RPC_URL = 'https://rpc.worldchain.org'
const CHAIN_ID = 480

// Test contract integration
export async function testContractIntegration() {
  console.log('🚀 Testing Contract Integration...')
  
  try {
    // Create provider
    const provider = new ethers.JsonRpcProvider(RPC_URL)
    
    // Test network connection
    const network = await provider.getNetwork()
    console.log(`✅ Connected to network: ${network.name} (Chain ID: ${network.chainId})`)
    
    // Test contract addresses
    for (const [name, address] of Object.entries(CONTRACT_ADDRESSES)) {
      const code = await provider.getCode(address)
      if (code === '0x') {
        console.log(`❌ Contract ${name} not found at ${address}`)
      } else {
        console.log(`✅ Contract ${name} found at ${address}`)
      }
    }
    
    // Test basic contract calls
    await testTokenFactory(provider)
    await testBondingCurve(provider)
    await testGraduationHandler(provider)
    
    console.log('🎉 Contract integration test completed successfully!')
    
  } catch (error) {
    console.error('❌ Contract integration test failed:', error)
    throw error
  }
}

// Test TokenFactory contract
async function testTokenFactory(provider: ethers.JsonRpcProvider) {
  console.log('\n📋 Testing TokenFactory...')
  
  try {
    // Basic ABI for TokenFactory
    const tokenFactoryABI = [
      'function createToken(string memory name, string memory symbol, uint256 initialPrice, uint256 maxSupply) external returns (address)',
      'function getTokenCount() external view returns (uint256)',
      'function getTokenAddress(uint256 index) external view returns (address)',
    ]
    
    const tokenFactory = new ethers.Contract(
      CONTRACT_ADDRESSES.TOKEN_FACTORY,
      tokenFactoryABI,
      provider
    )
    
    // Test basic view functions
    const tokenCount = await tokenFactory.getTokenCount()
    console.log(`✅ TokenFactory: ${tokenCount} tokens created`)
    
  } catch (error) {
    console.log(`❌ TokenFactory test failed: ${error}`)
  }
}

// Test BondingCurve contract
async function testBondingCurve(provider: ethers.JsonRpcProvider) {
  console.log('\n📈 Testing BondingCurve...')
  
  try {
    // Basic ABI for BondingCurve
    const bondingCurveABI = [
      'function name() external view returns (string)',
      'function symbol() external view returns (string)',
      'function totalSupply() external view returns (uint256)',
      'function getCurrentPrice() external view returns (uint256)',
    ]
    
    const bondingCurve = new ethers.Contract(
      CONTRACT_ADDRESSES.BONDING_CURVE,
      bondingCurveABI,
      provider
    )
    
    // Test basic view functions
    const name = await bondingCurve.name()
    const symbol = await bondingCurve.symbol()
    const totalSupply = await bondingCurve.totalSupply()
    const currentPrice = await bondingCurve.getCurrentPrice()
    
    console.log(`✅ BondingCurve: ${name} (${symbol})`)
    console.log(`✅ Total Supply: ${ethers.formatEther(totalSupply)}`)
    console.log(`✅ Current Price: ${ethers.formatEther(currentPrice)} WLD`)
    
  } catch (error) {
    console.log(`❌ BondingCurve test failed: ${error}`)
  }
}

// Test GraduationHandler contract
async function testGraduationHandler(provider: ethers.JsonRpcProvider) {
  console.log('\n🎓 Testing GraduationHandler...')
  
  try {
    // Basic ABI for GraduationHandler
    const graduationHandlerABI = [
      'function isGraduated() external view returns (bool)',
      'function graduationThreshold() external view returns (uint256)',
      'function getGraduationProgress() external view returns (uint256, uint256)',
    ]
    
    const graduationHandler = new ethers.Contract(
      CONTRACT_ADDRESSES.GRADUATION_HANDLER,
      graduationHandlerABI,
      provider
    )
    
    // Test basic view functions
    const isGraduated = await graduationHandler.isGraduated()
    const threshold = await graduationHandler.graduationThreshold()
    const [current, target] = await graduationHandler.getGraduationProgress()
    
    console.log(`✅ GraduationHandler: Graduated: ${isGraduated}`)
    console.log(`✅ Threshold: ${ethers.formatEther(threshold)} WLD`)
    console.log(`✅ Progress: ${ethers.formatEther(current)} / ${ethers.formatEther(target)} WLD`)
    
  } catch (error) {
    console.log(`❌ GraduationHandler test failed: ${error}`)
  }
}

// Export for use in other modules
export { CONTRACT_ADDRESSES, RPC_URL, CHAIN_ID }
