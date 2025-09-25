import { NextRequest } from 'next/server'
import { DatabaseService } from '@/lib/database'
import { 
  withAuth, 
  successResponse, 
  logApiRequest,
  logApiResponse 
} from '@/lib/api-utils'

export const GET = withAuth(async (user, request: NextRequest) => {
  logApiRequest(request, user.walletAddress)
  
  const db = DatabaseService.getInstance()
  
  try {
    const userData = await db.getUser(user.walletAddress)
    
    if (!userData) {
      throw new Error('User not found')
    }
    
    // Get user statistics
    const stats = await db.getUserStats(user.walletAddress)
    
    const response = successResponse({
      user: {
        walletAddress: userData.walletAddress,
        worldIdHash: userData.worldIdHash,
        verificationLevel: userData.verificationLevel,
        reputationScore: userData.reputationScore,
        reputationLevel: userData.reputationLevel,
        totalTrades: userData.totalTrades,
        totalVolume: userData.totalVolume,
        riskScore: userData.riskScore,
        isBanned: userData.isBanned,
        lastActivity: userData.lastActivity,
        createdAt: userData.createdAt,
      },
      stats,
      reputationQuests: userData.reputationQuests.map(quest => ({
        id: quest.id,
        quest: quest.quest,
        progress: quest.progress,
        isCompleted: quest.isCompleted,
        completedAt: quest.completedAt,
      })),
      achievements: userData.achievements.map(achievement => ({
        id: achievement.id,
        achievement: achievement.achievement,
        unlockedAt: achievement.unlockedAt,
      })),
    })
    
    logApiResponse(response, user.walletAddress)
    return response
    
  } catch (error) {
    console.error('Failed to get user profile:', error)
    throw error
  }
})

export const PUT = withAuth(async (user, request: NextRequest) => {
  logApiRequest(request, user.walletAddress)
  
  const body = await request.json()
  const db = DatabaseService.getInstance()
  
  try {
    // Only allow updating certain fields
    const allowedFields = {
      worldIdHash: body.worldIdHash,
      verificationLevel: body.verificationLevel,
    }
    
    // Remove undefined values
    const updateData = Object.fromEntries(
      Object.entries(allowedFields).filter(([_, value]) => value !== undefined)
    )
    
    if (Object.keys(updateData).length === 0) {
      throw new Error('No valid fields to update')
    }
    
    const updatedUser = await db.updateUser(user.walletAddress, updateData)
    
    const response = successResponse({
      user: {
        walletAddress: updatedUser.walletAddress,
        worldIdHash: updatedUser.worldIdHash,
        verificationLevel: updatedUser.verificationLevel,
        reputationScore: updatedUser.reputationScore,
        reputationLevel: updatedUser.reputationLevel,
        totalTrades: updatedUser.totalTrades,
        totalVolume: updatedUser.totalVolume,
        riskScore: updatedUser.riskScore,
        isBanned: updatedUser.isBanned,
        lastActivity: updatedUser.lastActivity,
        createdAt: updatedUser.createdAt,
      },
    }, 'Profile updated successfully')
    
    logApiResponse(response, user.walletAddress)
    return response
    
  } catch (error) {
    console.error('Failed to update user profile:', error)
    throw error
  }
})

