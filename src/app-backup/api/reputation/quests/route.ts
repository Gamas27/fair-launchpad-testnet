import { NextRequest } from 'next/server'
import { DatabaseService } from '@/lib/database'
import { 
  withOptionalAuth, 
  successResponse, 
  logApiRequest,
  logApiResponse 
} from '@/lib/api-utils'

export const GET = withOptionalAuth(async (user, request: NextRequest) => {
  logApiRequest(request, user?.walletAddress)
  
  const db = DatabaseService.getInstance()
  
  try {
    const quests = await db.getReputationQuests()
    
    let userQuests = []
    if (user) {
      userQuests = await db.getUserReputationQuests(user.walletAddress)
    }
    
    // Map quests with user progress
    const questsWithProgress = quests.map(quest => {
      const userQuest = userQuests.find(uq => uq.questId === quest.id)
      
      return {
        id: quest.id,
        title: quest.title,
        description: quest.description,
        type: quest.type,
        targetValue: quest.targetValue,
        reward: quest.reward,
        isActive: quest.isActive,
        createdAt: quest.createdAt,
        userProgress: userQuest ? {
          progress: userQuest.progress,
          isCompleted: userQuest.isCompleted,
          completedAt: userQuest.completedAt,
        } : {
          progress: 0,
          isCompleted: false,
          completedAt: null,
        },
      }
    })
    
    const response = successResponse({
      quests: questsWithProgress,
      userStats: user ? {
        reputationScore: user.reputationScore,
        reputationLevel: user.reputationLevel,
        totalQuests: userQuests.length,
        completedQuests: userQuests.filter(uq => uq.isCompleted).length,
      } : null,
    })
    
    logApiResponse(response, user?.walletAddress)
    return response
    
  } catch (error) {
    console.error('Failed to get reputation quests:', error)
    throw error
  }
})

export const POST = withOptionalAuth(async (user, request: NextRequest) => {
  logApiRequest(request, user?.walletAddress)
  
  if (!user) {
    throw new Error('Authentication required to complete quests')
  }
  
  const body = await request.json()
  const { questId, progress, isCompleted } = body
  
  const db = DatabaseService.getInstance()
  
  try {
    // Validate quest exists
    const quest = await db.prisma.reputationQuest.findUnique({
      where: { id: questId },
    })
    
    if (!quest) {
      throw new Error('Quest not found')
    }
    
    if (!quest.isActive) {
      throw new Error('Quest is not active')
    }
    
    // Update user quest progress
    const userQuest = await db.updateUserReputationQuest(
      user.walletAddress,
      questId,
      progress,
      isCompleted
    )
    
    // If quest is completed, update user reputation
    if (isCompleted && !userQuest.isCompleted) {
      const newReputationScore = user.reputationScore + quest.reward
      
      // Calculate new reputation level
      let newReputationLevel = user.reputationLevel
      if (newReputationScore >= 1000) newReputationLevel = 'Legend'
      else if (newReputationScore >= 500) newReputationLevel = 'Expert'
      else if (newReputationScore >= 200) newReputationLevel = 'Veteran'
      else if (newReputationScore >= 100) newReputationLevel = 'Trader'
      else if (newReputationScore >= 50) newReputationLevel = 'Active'
      else if (newReputationScore >= 10) newReputationLevel = 'Member'
      
      await db.updateUser(user.walletAddress, {
        reputationScore: newReputationScore,
        reputationLevel: newReputationLevel,
      })
    }
    
    const response = successResponse({
      quest: {
        id: quest.id,
        title: quest.title,
        description: quest.description,
        type: quest.type,
        targetValue: quest.targetValue,
        reward: quest.reward,
      },
      userProgress: {
        progress: userQuest.progress,
        isCompleted: userQuest.isCompleted,
        completedAt: userQuest.completedAt,
      },
      updatedReputation: isCompleted ? {
        reputationScore: user.reputationScore + quest.reward,
        reputationLevel: user.reputationLevel,
      } : null,
    }, 'Quest progress updated successfully')
    
    logApiResponse(response, user.walletAddress)
    return response
    
  } catch (error) {
    console.error('Failed to update quest progress:', error)
    throw error
  }
})

