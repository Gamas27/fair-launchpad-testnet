// Testnet configuration for hackathon judges
export const TESTNET_CONFIG = {
  // Testnet contract addresses (these would be your testnet deployments)
  CONTRACTS: {
    TOKEN_FACTORY: '0x1234567890123456789012345678901234567890', // Testnet TokenFactory
    BONDING_CURVE: '0x2345678901234567890123456789012345678901', // Testnet BondingCurve
    GRADUATION_HANDLER: '0x3456789012345678901234567890123456789012', // Testnet GraduationHandler
    WLD_TOKEN: '0x4567890123456789012345678901234567890123', // Testnet WLD
    WORLD_ID: '0x5678901234567890123456789012345678901234', // Testnet World ID
    UNISWAP_FACTORY: '0x6789012345678901234567890123456789012345', // Testnet Uniswap Factory
    UNISWAP_POSITION_MANAGER: '0x7890123456789012345678901234567890123456', // Testnet Position Manager
  },
  
  // Testnet RPC endpoints
  RPC: {
    WORLD_CHAIN: 'https://world-testnet.example.com', // Replace with actual testnet RPC
    ETHEREUM: 'https://sepolia.infura.io/v3/YOUR_KEY', // Sepolia testnet
  },
  
  // Testnet API endpoints
  APIS: {
    WORLD_ID: 'https://testnet.worldcoin.org/api/v1', // Testnet World ID API
    UNISWAP: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3-sepolia', // Testnet Uniswap
  },
  
  // Test environment flags
  ENVIRONMENT: {
    IS_TESTNET: true,
    SIMULATE_CONTRACTS: true, // Simulate contract calls for demo
    SIMULATE_GRADUATION: true, // Simulate graduation to Uniswap
    MOCK_WORLD_ID: true, // Use mock World ID verification
    MOCK_WALLET: true, // Use mock wallet integration
  }
}

// Testnet simulation data
export const TESTNET_SIMULATION = {
  // Mock token data for testing
  MOCK_TOKENS: [
    {
      id: 'test_token_1',
      name: 'TestToken Alpha',
      symbol: 'TTA',
      price: 0.001,
      marketCap: 100000,
      volume24h: 50000,
      change24h: 0.05,
      isLive: true,
      graduationThreshold: 1000000, // 1M market cap for graduation
      currentMarketCap: 100000,
      graduationProgress: 0.1, // 10% towards graduation
    },
    {
      id: 'test_token_2', 
      name: 'TestToken Beta',
      symbol: 'TTB',
      price: 0.002,
      marketCap: 500000,
      volume24h: 25000,
      change24h: -0.02,
      isLive: true,
      graduationThreshold: 1000000,
      currentMarketCap: 500000,
      graduationProgress: 0.5, // 50% towards graduation
    },
    {
      id: 'test_token_3',
      name: 'TestToken Gamma',
      symbol: 'TTG', 
      price: 0.01,
      marketCap: 1200000,
      volume24h: 100000,
      change24h: 0.15,
      isLive: true,
      graduationThreshold: 1000000,
      currentMarketCap: 1200000,
      graduationProgress: 1.0, // Ready for graduation!
      isReadyForGraduation: true,
    }
  ],
  
  // Mock graduation simulation
  GRADUATION_SIMULATION: {
    // Simulate graduation process
    async simulateGraduation(tokenId: string) {
      console.log(`🎓 Simulating graduation for token ${tokenId}`)
      
      // Simulate steps:
      // 1. Check if token meets graduation criteria
      // 2. Create Uniswap V3 pool
      // 3. Add initial liquidity
      // 4. Update token status
      // 5. Notify users
      
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate processing time
      
      return {
        success: true,
        uniswapPoolAddress: `0x${Math.random().toString(16).substring(2, 42)}`,
        liquidityAdded: '1000000',
        graduationFee: '0.01',
        timestamp: Date.now(),
      }
    },
    
    // Simulate Uniswap V3 pool creation
    async createUniswapPool(tokenAddress: string, wldAddress: string) {
      console.log(`🏊 Creating Uniswap V3 pool for ${tokenAddress}`)
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      return {
        poolAddress: `0x${Math.random().toString(16).substring(2, 42)}`,
        fee: 3000, // 0.3% fee tier
        tickSpacing: 60,
        sqrtPriceX96: '79228162514264337593543950336', // Initial price
      }
    }
  }
}

// Testnet utilities
export class TestnetUtils {
  static isTestnet(): boolean {
    return TESTNET_CONFIG.ENVIRONMENT.IS_TESTNET
  }
  
  static shouldSimulate(): boolean {
    return TESTNET_CONFIG.ENVIRONMENT.SIMULATE_CONTRACTS
  }
  
  static getContractAddress(contract: keyof typeof TESTNET_CONFIG.CONTRACTS): string {
    return TESTNET_CONFIG.CONTRACTS[contract]
  }
  
  static async simulateContractCall(contract: string, method: string, params: any[]) {
    if (!this.shouldSimulate()) {
      throw new Error('Contract simulation disabled')
    }
    
    console.log(`📞 Simulating ${contract}.${method}(${params.join(', ')})`)
    
    // Simulate contract call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Return mock results based on method
    switch (method) {
      case 'createToken':
        return {
          success: true,
          tokenAddress: `0x${Math.random().toString(16).substring(2, 42)}`,
          transactionHash: `0x${Math.random().toString(16).substring(2, 66)}`,
        }
      case 'buyTokens':
        return {
          success: true,
          tokensReceived: params[1] * 1000, // Mock calculation
          newPrice: 0.001 + Math.random() * 0.0001,
        }
      case 'sellTokens':
        return {
          success: true,
          wldReceived: params[1] * 0.001, // Mock calculation
          newPrice: 0.001 - Math.random() * 0.0001,
        }
      case 'graduateToken':
        return {
          success: true,
          uniswapPoolAddress: `0x${Math.random().toString(16).substring(2, 42)}`,
          liquidityAdded: '1000000',
        }
      default:
        return { success: true }
    }
  }
}

