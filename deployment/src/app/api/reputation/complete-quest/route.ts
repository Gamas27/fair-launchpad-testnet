import { NextRequest } from 'next/server'
import { DatabaseService } from '@/lib/database'
import { 
  withAuth, 
  successResponse, 
  validateRequestBody,
  logApiRequest,
  logApiResponse 
} from '@/lib/api-utils'
import { z } from 'zod'

const completeQuestSchema = z.object({
  questId: z.string().min(1),
  progress: z.number().min(0).max(100).optional(),
})

export const POST = withAuth(async (user, request: NextRequest, context?: { params: Promise<any> }) => {
  logApiRequest(request, user.walletAddress)
  
  const body = await request.json()
  const data = validateRequestBody(completeQuestSchema, body)
  
  const db = DatabaseService.getInstance()
  
  try {
    // Get the quest
    const quest = await db.prisma.reputationQuest.findUnique({
      where: { id: data.questId },
    })
    
    if (!quest) {
      throw new Error('Quest not found')
    }
    
    if (!quest.isActive) {
      throw new Error('Quest is not active')
    }
    
    // Get user's current progress
    const userQuest = await db.prisma.userReputationQuest.findUnique({
      where: {
        userAddress_questId: {
          userAddress: user.walletAddress,
          questId: data.questId,
        },
      },
    })
    
    const currentProgress = userQuest?.progress || 0
    const newProgress = data.progress !== undefined ? data.progress : quest.targetValue
    const isCompleted = newProgress >= quest.targetValue
    
    // Update or create user quest progress
    const updatedUserQuest = await db.updateUserReputationQuest(
      user.walletAddress,
      data.questId,
      newProgress,
      isCompleted
    )
    
    // If quest is completed, award XP
    let xpAwarded = 0
    if (isCompleted && (!userQuest || !userQuest.isCompleted)) {
      xpAwarded = quest.reward
      
      // Update user reputation score
      const userData = await db.getUser(user.walletAddress)
      if (userData) {
        const newReputationScore = userData.reputationScore + xpAwarded
        
        // Calculate new reputation level
        let newReputationLevel = 'Bronze'
        if (newReputationScore >= 5000) {
          newReputationLevel = 'Diamond'
        } else if (newReputationScore >= 2500) {
          newReputationLevel = 'Gold'
        } else if (newReputationScore >= 1000) {
          newReputationLevel = 'Silver'
        }
        
        await db.updateUser(user.walletAddress, {
          reputationScore: newReputationScore,
          reputationLevel: newReputationLevel,
        })
      }
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
      progress: {
        current: newProgress,
        target: quest.targetValue,
        percentage: Math.min((newProgress / quest.targetValue) * 100, 100),
        isCompleted,
        xpAwarded,
      },
      userQuest: {
        id: updatedUserQuest.id,
        progress: updatedUserQuest.progress,
        isCompleted: updatedUserQuest.isCompleted,
        completedAt: updatedUserQuest.completedAt,
      },
    }, isCompleted ? 'Quest completed!' : 'Quest progress updated')
    
    logApiResponse(response, user.walletAddress)
    return response
    
  } catch (error) {
    console.error('Failed to complete quest:', error)
    throw error
  }
})
