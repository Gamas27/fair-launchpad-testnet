import { MiniKit, getIsUserVerified, verifyCloudProof, VerificationLevel } from '@worldcoin/minikit-js'

export interface WorldIdVerification {
  isVerified: boolean
  verificationLevel: 'Device' | 'Phone' | 'Orb'
  worldId: string | null
  error?: string
  proof?: WorldIdProof
}

export interface WorldIdConfig {
  appId: string
  action: string
  signal?: string
}

export interface WorldIdProof {
  merkle_root: string
  nullifier_hash: string
  proof: string
  verification_level: VerificationLevel
}

interface WorldIdUser {
  world_id?: string
  address?: string
  balance?: string
  verification_level?: string
  proof?: WorldIdProof
}

class WorldIdService {
  private isInitialized = false
  private config: WorldIdConfig | null = null
  private currentUser: WorldIdUser | null = null

  /**
   * Initialize World ID service with app configuration
   */
  async initialize(config: WorldIdConfig): Promise<void> {
    try {
      // Check if MiniKit is installed
      const isInstalled = await MiniKit.isInstalled()
      if (!isInstalled) {
        throw new Error('MiniKit is not installed. Please install World App.')
      }

      this.config = config
      this.isInitialized = true
      console.log('World ID service initialized successfully')
    } catch (error) {
      console.error('Failed to initialize World ID:', error)
      throw new Error('Failed to initialize World ID service')
    }
  }

  /**
   * Connect to World ID and get verification status
   */
  async connect(): Promise<WorldIdVerification> {
    if (!this.isInitialized) {
      throw new Error('World ID service not initialized')
    }

    try {
      // For now, we'll trigger verification flow directly
      // In a real implementation, you'd check if user is already verified
      // by calling getIsUserVerified with the user's wallet address
      const verificationResult = await this.triggerVerification()
      
      return {
        isVerified: verificationResult.isVerified,
        verificationLevel: verificationResult.verificationLevel,
        worldId: verificationResult.worldId,
        proof: verificationResult.proof,
        error: verificationResult.error
      }
    } catch (error) {
      console.error('World ID connection failed:', error)
      return {
        isVerified: false,
        verificationLevel: 'Device',
        worldId: null,
        error: error instanceof Error ? error.message : 'Connection failed',
      }
    }
  }

  /**
   * Disconnect from World ID
   */
  async disconnect(): Promise<void> {
    try {
      this.currentUser = null
      console.log('World ID disconnected successfully')
    } catch (error) {
      console.error('World ID disconnect failed:', error)
      throw new Error('Failed to disconnect from World ID')
    }
  }

  /**
   * Get current account information
   */
  async getAccount(): Promise<{ address: string; balance: string } | null> {
    try {
      if (!this.currentUser) {
        return null
      }
      
      // For now, return mock data since the actual API structure is unclear
      // In a real implementation, you'd get this from the connected wallet
      return {
        address: this.currentUser.address || 'unknown',
        balance: this.currentUser.balance || '0'
      }
    } catch (error) {
      console.error('Failed to get account:', error)
      return null
    }
  }

  /**
   * Sign a message with World ID
   */
  async signMessage(message: string): Promise<string> {
    try {
      if (!this.currentUser) {
        throw new Error('No user connected')
      }

      // TODO: Implement actual message signing with MiniKit
      // For now, return a mock signature
      const mockSignature = `0x${Buffer.from(`mock_signature_${message}_${Date.now()}`).toString('hex')}`
      return mockSignature
    } catch (error) {
      console.error('Failed to sign message:', error)
      throw new Error('Failed to sign message')
    }
  }

  /**
   * Send a transaction
   */
  async sendTransaction(transaction: { to: string; value: string; data?: string }): Promise<string> {
    try {
      if (!this.currentUser) {
        throw new Error('No user connected')
      }

      // TODO: Implement actual transaction sending with MiniKit
      // For now, return a mock transaction hash
      const mockTxHash = `0x${Buffer.from(`mock_tx_${transaction.to}_${Date.now()}`).toString('hex')}`
      return mockTxHash
    } catch (error) {
      console.error('Failed to send transaction:', error)
      throw new Error('Failed to send transaction')
    }
  }

  /**
   * Trigger World ID verification flow
   */
  private async triggerVerification(): Promise<WorldIdVerification> {
    try {
      // TODO: Implement actual verification with MiniKit
      // For now, simulate a successful verification
      const mockUser: WorldIdUser = {
        world_id: `world_id_${Date.now()}`,
        address: '0x1234567890123456789012345678901234567890',
        balance: '100.0',
        verification_level: VerificationLevel.Device,
        proof: {
          merkle_root: 'mock_merkle_root',
          nullifier_hash: 'mock_nullifier_hash',
          proof: 'mock_proof',
          verification_level: VerificationLevel.Device
        }
      }

      this.currentUser = mockUser
      
      return {
        isVerified: true,
        verificationLevel: this.mapVerificationLevel(mockUser.verification_level || 'Device'),
        worldId: mockUser.world_id || null,
        proof: mockUser.proof
      }
    } catch (error) {
      return {
        isVerified: false,
        verificationLevel: 'Device',
        worldId: null,
        error: error instanceof Error ? error.message : 'Verification failed'
      }
    }
  }

  /**
   * Get current user information
   */
  private async getCurrentUser(): Promise<WorldIdUser | null> {
    try {
      if (this.currentUser) {
        return this.currentUser
      }

      // For now, return null since we don't have a current user
      // In a real implementation, you'd get this from the verification result
      return null
    } catch (error) {
      console.error('Failed to get current user:', error)
      return null
    }
  }

  /**
   * Map verification level from World ID format to our format
   */
  private mapVerificationLevel(level: string): 'Device' | 'Phone' | 'Orb' {
    switch (level) {
      case 'orb':
      case 'Orb':
        return 'Orb'
      case 'phone':
      case 'Phone':
        return 'Phone'
      default:
        return 'Device'
    }
  }

  /**
   * Check if a user is verified by wallet address
   */
  async isUserVerified(walletAddress: string, rpcUrl?: string): Promise<boolean> {
    try {
      const result = await getIsUserVerified(walletAddress, rpcUrl)
      return result
    } catch (error) {
      console.error('Failed to check user verification:', error)
      return false
    }
  }

  /**
   * Verify a World ID proof
   */
  async verifyProof(proof: WorldIdProof): Promise<boolean> {
    try {
      if (!this.config) {
        throw new Error('World ID service not configured')
      }

      const appId = this.config.appId.startsWith('app_') ? this.config.appId : `app_${this.config.appId}`
      const result = await verifyCloudProof(
        proof,
        appId as `app_${string}`,
        this.config.action,
        this.config.signal
      )

      return result.success
    } catch (error) {
      console.error('Failed to verify proof:', error)
      return false
    }
  }

  /**
   * Check if service is initialized
   */
  get initialized(): boolean {
    return this.isInitialized
  }

  /**
   * Get current configuration
   */
  get currentConfig(): WorldIdConfig | null {
    return this.config
  }

  /**
   * Get current user
   */
  get user(): WorldIdUser | null {
    return this.currentUser
  }
}

// Export singleton instance
export const worldIdService = new WorldIdService()
export default worldIdService
