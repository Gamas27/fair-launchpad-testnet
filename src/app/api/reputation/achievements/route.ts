import { NextRequest } from 'next/server'
import { DatabaseService } from '@/lib/database'
import { 
  withAuth, 
  successResponse, 
  validateQueryParams,
  getPaginationParams,
  createPaginationResponse,
  logApiRequest,
  logApiResponse 
} from '@/lib/api-utils'
import { z } from 'zod'

const achievementsQuerySchema = z.object({
  rarity: z.enum(['common', 'rare', 'epic', 'legendary']).optional(),
  unlocked: z.string().optional(),
  limit: z.string().optional(),
  offset: z.string().optional(),
})

export const GET = withAuth(async (user, request: NextRequest, context?: { params: Promise<any> }) => {
  logApiRequest(request, user.walletAddress)
  
  const { searchParams } = new URL(request.url)
  
  // Add default values if not provided
  if (!searchParams.has('limit')) {
    searchParams.set('limit', '20')
  }
  if (!searchParams.has('offset')) {
    searchParams.set('offset', '0')
  }
  
  const queryParams = validateQueryParams(achievementsQuerySchema, searchParams)
  const { limit, offset } = queryParams
  
  const db = DatabaseService.getInstance()
  
  try {
    // Get all achievements
    const allAchievements = await db.getAchievements()
    
    // Get user's unlocked achievements
    const userAchievements = await db.getUserAchievements(user.walletAddress)
    const unlockedAchievementIds = new Set(userAchievements.map(ua => ua.achievementId))
    
    // Filter achievements based on query parameters
    let filteredAchievements = allAchievements
    
    if (queryParams.rarity) {
      filteredAchievements = filteredAchievements.filter(
        achievement => achievement.rarity === queryParams.rarity
      )
    }
    
    if (queryParams.unlocked !== undefined) {
      const isUnlocked = queryParams.unlocked === 'true'
      filteredAchievements = filteredAchievements.filter(achievement =>
        isUnlocked 
          ? unlockedAchievementIds.has(achievement.id)
          : !unlockedAchievementIds.has(achievement.id)
      )
    }
    
    // Apply pagination
    const paginatedAchievements = filteredAchievements.slice(offset, offset + limit)
    
    // Format achievements with user progress
    const formattedAchievements = paginatedAchievements.map(achievement => {
      const userAchievement = userAchievements.find(ua => ua.achievementId === achievement.id)
      
      return {
        id: achievement.id,
        title: achievement.title,
        description: achievement.description,
        icon: achievement.icon,
        rarity: achievement.rarity,
        requirements: JSON.parse(achievement.requirements || '{}'),
        reward: achievement.reward,
        isUnlocked: !!userAchievement,
        unlockedAt: userAchievement?.unlockedAt || null,
      }
    })
    
    const responseData = createPaginationResponse(
      formattedAchievements,
      filteredAchievements.length,
      limit,
      offset
    )
    
    // Add summary statistics
    const summary = {
      total: allAchievements.length,
      unlocked: userAchievements.length,
      locked: allAchievements.length - userAchievements.length,
      byRarity: {
        common: allAchievements.filter(a => a.rarity === 'common').length,
        rare: allAchievements.filter(a => a.rarity === 'rare').length,
        epic: allAchievements.filter(a => a.rarity === 'epic').length,
        legendary: allAchievements.filter(a => a.rarity === 'legendary').length,
      },
      unlockedByRarity: {
        common: userAchievements.filter(ua => ua.achievement.rarity === 'common').length,
        rare: userAchievements.filter(ua => ua.achievement.rarity === 'rare').length,
        epic: userAchievements.filter(ua => ua.achievement.rarity === 'epic').length,
        legendary: userAchievements.filter(ua => ua.achievement.rarity === 'legendary').length,
      },
    }
    
    const response = successResponse({
      achievements: responseData,
      summary,
    })
    
    logApiResponse(response, user.walletAddress)
    return response
    
  } catch (error) {
    console.error('Failed to get achievements:', error)
    throw error
  }
})
