// Safe World ID Service for testing
export interface WorldIdVerification {
  isVerified: boolean
  verificationLevel: 'Device' | 'Phone' | 'Orb'
  worldId: string | null
  error?: string
}

export interface WorldIdConfig {
  appId: string
  action: string
  signal?: string
}

class SafeWorldIdService {
  private isInitialized = false
  private config: WorldIdConfig | null = null

  async initialize(config: WorldIdConfig): Promise<void> {
    try {
      console.log('Safe World ID service: Initializing in mock mode')
      this.config = config
      this.isInitialized = true
    } catch (error) {
      console.warn('Safe World ID service: Using mock mode due to error:', error)
      this.config = config
      this.isInitialized = true
    }
  }

  async connect(): Promise<WorldIdVerification> {
    try {
      // Mock verification for testing
      return {
        isVerified: true,
        verificationLevel: 'Device',
        worldId: 'mock_world_id_123',
        error: undefined
      }
    } catch (error) {
      return {
        isVerified: false,
        verificationLevel: 'Device',
        worldId: null,
        error: 'Mock verification failed'
      }
    }
  }

  async disconnect(): Promise<void> {
    console.log('Safe World ID service: Disconnected')
  }

  async getAccount(): Promise<{ address: string; balance: string }> {
    return {
      address: '0x1234567890123456789012345678901234567890',
      balance: '1.0'
    }
  }

  async signMessage(message: string): Promise<string> {
    return `mock_signature_${message}`
  }

  async sendTransaction(transaction: { to: string; value: string; data?: string }): Promise<string> {
    return `mock_tx_hash_${transaction.to}`
  }

  async verifyProof(proof: any): Promise<boolean> {
    return true
  }
}

export const safeWorldIdService = new SafeWorldIdService()
export default safeWorldIdService
