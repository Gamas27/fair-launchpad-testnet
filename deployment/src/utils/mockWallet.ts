// Mock wallet utility for testing
// This allows us to simulate different wallet connections without requiring MetaMask

export const TEST_WALLETS = {
  GOLD_USER: '0x1234567890123456789012345678901234567890',
  SILVER_USER: '0x2345678901234567890123456789012345678901',
  BRONZE_USER: '0x3456789012345678901234567890123456789012',
  HIGH_RISK_USER: '0x4567890123456789012345678901234567890123',
  UNVERIFIED_USER: '0x5678901234567890123456789012345678901234',
} as const

export type TestWallet = keyof typeof TEST_WALLETS

// Mock wallet connection for testing
export function mockWalletConnection(wallet: TestWallet) {
  const address = TEST_WALLETS[wallet]
  
  // Mock the window.ethereum object
  if (typeof window !== 'undefined') {
    (window as any).ethereum = {
      isMetaMask: true,
      request: async (args: any) => {
        if (args.method === 'eth_requestAccounts') {
          return [address]
        }
        if (args.method === 'eth_accounts') {
          return [address]
        }
        if (args.method === 'eth_chainId') {
          return '0x1' // Mainnet
        }
        if (args.method === 'eth_getBalance') {
          return '0x56BC75E2D630E0000' // 100 ETH in hex
        }
        return null
      },
      on: () => {},
      removeListener: () => {},
    }
  }
  
  return address
}

// Get wallet info for display
export function getWalletInfo(wallet: TestWallet) {
  const info = {
    GOLD_USER: {
      name: 'Gold Trader',
      level: 'Gold',
      xp: 2500,
      trades: 45,
      volume: '$125,000',
      risk: 'Low (15)',
      verified: 'Orb',
    },
    SILVER_USER: {
      name: 'Silver Trader',
      level: 'Silver',
      xp: 800,
      trades: 12,
      volume: '$35,000',
      risk: 'Low (25)',
      verified: 'Document',
    },
    BRONZE_USER: {
      name: 'Bronze Trader',
      level: 'Bronze',
      xp: 150,
      trades: 3,
      volume: '$5,000',
      risk: 'Very Low (5)',
      verified: 'Device',
    },
    HIGH_RISK_USER: {
      name: 'High Risk Trader',
      level: 'Bronze',
      xp: 100,
      trades: 25,
      volume: '$15,000',
      risk: 'High (85)',
      verified: 'Orb',
    },
    UNVERIFIED_USER: {
      name: 'New User',
      level: 'Bronze',
      xp: 0,
      trades: 0,
      volume: '$0',
      risk: 'None (0)',
      verified: 'None',
    },
  }
  
  return info[wallet]
}



