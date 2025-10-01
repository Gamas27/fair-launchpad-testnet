// Testnet Environment Configuration for Hackathon Judges
export const TESTNET_ENV = {
  // Testnet Mode Flags
  IS_TESTNET: true,
  SIMULATE_CONTRACTS: true,
  SIMULATE_GRADUATION: true,
  MOCK_WORLD_ID: true,
  MOCK_WALLET: true,
  
  // Testnet Contract Addresses (Mock addresses for demo)
  CONTRACTS: {
    TOKEN_FACTORY: '0x1234567890123456789012345678901234567890',
    BONDING_CURVE: '0x2345678901234567890123456789012345678901', 
    GRADUATION_HANDLER: '0x3456789012345678901234567890123456789012',
    WLD_TOKEN: '0x4567890123456789012345678901234567890123',
    WORLD_ID: '0x5678901234567890123456789012345678901234',
    UNISWAP_FACTORY: '0x6789012345678901234567890123456789012345',
    UNISWAP_POSITION_MANAGER: '0x7890123456789012345678901234567890123456',
  },
  
  // Testnet URLs
  URLS: {
    UNISWAP_TESTNET: 'https://app.uniswap.org/#/pool/1',
    TESTNET_EXPLORER: 'https://sepolia.etherscan.io',
    WORLD_ID_TESTNET: 'https://testnet.worldcoin.org',
  },
  
  // Testnet API Keys (Mock keys for demo)
  API_KEYS: {
    WORLD_ID: 'testnet_world_id_api_key',
    PRIVY: 'testnet_privy_app_id',
  },
  
  // Testnet Configuration
  CONFIG: {
    GRADUATION_THRESHOLD: '1000000',
    GRADUATION_FEE: '0.01',
    POOL_FEE: '0.3%',
    TICK_SPACING: 60,
  }
}

// Environment detection
export const isTestnetMode = (): boolean => {
  return process.env.NODE_ENV === 'development' || 
         process.env.NEXT_PUBLIC_TESTNET_MODE === 'true' ||
         TESTNET_ENV.IS_TESTNET
}

// Get contract address for testnet
export const getTestnetContractAddress = (contract: keyof typeof TESTNET_ENV.CONTRACTS): string => {
  return TESTNET_ENV.CONTRACTS[contract]
}

// Get testnet URL
export const getTestnetUrl = (service: keyof typeof TESTNET_ENV.URLS): string => {
  return TESTNET_ENV.URLS[service]
}

