import { NextRequest } from 'next/server'
import { AuthService } from '@/lib/auth'
import { DatabaseService } from '@/lib/database'
import { 
  withErrorHandling, 
  successResponse, 
  validateRequestBody,
  logApiRequest,
  logApiResponse 
} from '@/lib/api-utils'
import { worldIdVerificationSchema } from '@/lib/validation'

export const POST = withErrorHandling(async (request: NextRequest) => {
  logApiRequest(request)
  
  const body = await request.json()
  const data = validateRequestBody(worldIdVerificationSchema, body)
  
  const authService = AuthService.getInstance()
  const db = DatabaseService.getInstance()
  
  try {
    // Check if user exists
    let user = await db.getUser(data.walletAddress)
    
    if (!user) {
      // Create new user
      await db.createUser({
        walletAddress: data.walletAddress,
        worldIdHash: data.worldIdHash,
        verificationLevel: data.verificationLevel,
      })
      // Get the created user with all relations
      user = await db.getUser(data.walletAddress)
    } else {
      // Update existing user with World ID verification
      await db.updateUser(data.walletAddress, {
        worldIdHash: data.worldIdHash,
        verificationLevel: data.verificationLevel,
        lastActivity: new Date(),
      })
      // Get the updated user with all relations
      user = await db.getUser(data.walletAddress)
    }
    
    if (!user) {
      throw new Error('Failed to create or retrieve user')
    }
    
    // Create session
    const sessionToken = await authService.createSession({
      walletAddress: user.walletAddress,
      worldIdHash: user.worldIdHash || undefined,
      verificationLevel: user.verificationLevel,
      reputationScore: user.reputationScore,
      reputationLevel: user.reputationLevel,
    })
    
    const response = successResponse({
      user: {
        walletAddress: user.walletAddress,
        worldIdHash: user.worldIdHash,
        verificationLevel: user.verificationLevel,
        reputationScore: user.reputationScore,
        reputationLevel: user.reputationLevel,
        totalTrades: user.totalTrades,
        totalVolume: user.totalVolume,
        riskScore: user.riskScore,
        isBanned: user.isBanned,
        createdAt: user.createdAt,
      },
      sessionToken,
    }, 'World ID verification successful')
    
    logApiResponse(response)
    return response
    
  } catch (error) {
    console.error('World ID verification failed:', error)
    throw error
  }
})

