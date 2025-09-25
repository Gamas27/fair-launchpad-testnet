import { NextRequest } from 'next/server'
import { DatabaseService } from '@/lib/database'
import { 
  withAuth, 
  successResponse, 
  logApiRequest,
  logApiResponse 
} from '@/lib/api-utils'

export const GET = withAuth(async (user, request: NextRequest, context?: { params: Promise<any> }) => {
  logApiRequest(request, user.walletAddress)
  
  const db = DatabaseService.getInstance()
  
  try {
    // Get user reputation data
    const userData = await db.getUser(user.walletAddress)
    
    if (!userData) {
      throw new Error('User not found')
    }
    
    // Get user reputation quests
    const reputationQuests = await db.getUserReputationQuests(user.walletAddress)
    
    // Get user achievements
    const achievements = await db.getUserAchievements(user.walletAddress)
    
    // Get user stats
    const stats = await db.getUserStats(user.walletAddress)
    
    const response = successResponse({
      reputation: {
        score: userData.reputationScore,
        level: userData.reputationLevel,
        xp: userData.reputationScore, // Using reputation score as XP
        totalTrades: userData.totalTrades,
        totalVolume: userData.totalVolume,
        riskScore: userData.riskScore,
        isBanned: userData.isBanned,
      },
      quests: reputationQuests.map(quest => ({
        id: quest.id,
        quest: quest.quest,
        progress: quest.progress,
        isCompleted: quest.isCompleted,
        completedAt: quest.completedAt,
      })),
      achievements: achievements.map(achievement => ({
        id: achievement.id,
        achievement: achievement.achievement,
        unlockedAt: achievement.unlockedAt,
      })),
      stats,
    })
    
    logApiResponse(response, user.walletAddress)
    return response
    
  } catch (error) {
    console.error('Failed to get user reputation:', error)
    throw error
  }
})
