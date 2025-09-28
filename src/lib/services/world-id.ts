// World ID verification service
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
      if (!apiKey) {
        throw new Error('World ID API key is required')
      }
      WorldIdService.instance = new WorldIdService(apiKey)
    }
    return WorldIdService.instance
  }

  async verifyWorldId(proof: string, verificationLevel: string): Promise<WorldIdVerification> {
    try {
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
