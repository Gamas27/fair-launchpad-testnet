// World ID verification service for testnet environment
import { TESTNET_CONFIG } from '@/lib/config/testnet'

export interface WorldIdVerification {
  worldIdHash: string
  verificationLevel: string
  timestamp: number
  proof: string
}

export class WorldIdService {
  private static instance: WorldIdService
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  static getInstance(apiKey?: string): WorldIdService {
    if (!WorldIdService.instance) {
      // For testnet/hackathon, use mock verification
      const mockApiKey = apiKey || 'testnet_world_id_api_key'
      WorldIdService.instance = new WorldIdService(mockApiKey)
    }
    return WorldIdService.instance
  }

  async verifyWorldId(proof: string, verificationLevel: string): Promise<WorldIdVerification> {
    try {
      // For testnet/hackathon environment, always simulate World ID verification
      if (process.env.NODE_ENV === 'development' || 
          process.env.NEXT_PUBLIC_TESTNET_MODE === 'true' ||
          TESTNET_CONFIG.ENVIRONMENT.MOCK_WORLD_ID || 
          this.apiKey === 'testnet_world_id_api_key' ||
          !this.apiKey ||
          this.apiKey === 'mock_world_id_api_key') {
        
        console.log('🔐 Simulating World ID verification for testnet environment')
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        return {
          worldIdHash: `testnet_worldid_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
          verificationLevel,
          timestamp: Date.now(),
          proof: proof,
        }
      }

      // In production, this would call the World ID API
      const response = await fetch('https://developer.worldcoin.org/api/v1/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          proof,
          verificationLevel,
        }),
      })

      if (!response.ok) {
        throw new Error(`World ID verification failed: ${response.statusText}`)
      }

      const data = await response.json()
      
      return {
        worldIdHash: data.world_id_hash,
        verificationLevel: data.verification_level,
        timestamp: Date.now(),
        proof: data.proof,
      }
    } catch (error) {
      console.error('World ID verification error:', error)
      throw new Error('Failed to verify World ID')
    }
  }

  async checkVerificationStatus(worldIdHash: string): Promise<boolean> {
    try {
      const response = await fetch(`https://developer.worldcoin.org/api/v1/verify/${worldIdHash}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      })

      return response.ok
    } catch (error) {
      console.error('World ID status check error:', error)
      return false
    }
  }
}
