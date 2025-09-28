// Privy wallet service integration
export interface PrivyWallet {
  address: string
  chainId: number
  isConnected: boolean
  createdAt: string
}

export interface PrivyUser {
  id: string
  wallet: PrivyWallet
  email?: string
  phone?: string
  createdAt: string
}

export class PrivyService {
  private static instance: PrivyService
  private appId: string
  private appSecret: string

  constructor(appId: string, appSecret: string) {
    this.appId = appId
    this.appSecret = appSecret
  }

  static getInstance(appId?: string, appSecret?: string): PrivyService {
    if (!PrivyService.instance) {
      if (!appId || !appSecret) {
        throw new Error('Privy app ID and secret are required')
      }
      PrivyService.instance = new PrivyService(appId, appSecret)
    }
    return PrivyService.instance
  }

  async createWallet(userId: string, worldIdHash: string): Promise<PrivyWallet> {
    try {
      const response = await fetch('https://auth.privy.io/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.appSecret}`,
        },
        body: JSON.stringify({
          userId,
          worldIdHash,
          createWallet: true,
        }),
      })

      if (!response.ok) {
        throw new Error(`Privy wallet creation failed: ${response.statusText}`)
      }

      const data = await response.json()
      
      return {
        address: data.wallet.address,
        chainId: data.wallet.chainId,
        isConnected: true,
        createdAt: new Date().toISOString(),
      }
    } catch (error) {
      console.error('Privy wallet creation error:', error)
      throw new Error('Failed to create Privy wallet')
    }
  }

  async getUserWallets(userId: string): Promise<PrivyWallet[]> {
    try {
      const response = await fetch(`https://auth.privy.io/api/v1/users/${userId}/wallets`, {
        headers: {
          'Authorization': `Bearer ${this.appSecret}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch user wallets: ${response.statusText}`)
      }

      const data = await response.json()
      return data.wallets || []
    } catch (error) {
      console.error('Privy wallet fetch error:', error)
      return []
    }
  }

  async getWalletBalance(address: string, chainId: number): Promise<number> {
    try {
      const response = await fetch(`https://auth.privy.io/api/v1/wallets/${address}/balance`, {
        headers: {
          'Authorization': `Bearer ${this.appSecret}`,
        },
        body: JSON.stringify({ chainId }),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch wallet balance: ${response.statusText}`)
      }

      const data = await response.json()
      return data.balance || 0
    } catch (error) {
      console.error('Privy balance fetch error:', error)
      return 0
    }
  }
}
