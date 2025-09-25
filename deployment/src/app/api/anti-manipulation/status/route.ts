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
    // Get user data
    const userData = await db.getUser(user.walletAddress)
    
    if (!userData) {
      throw new Error('User not found')
    }
    
    // Get recent anti-manipulation logs
    const recentLogs = await db.getAntiManipulationLogs(user.walletAddress, 10)
    
    // Calculate risk status
    const riskLevel = userData.riskScore < 30 ? 'low' : 
                     userData.riskScore < 70 ? 'medium' : 'high'
    
    const isFlagged = userData.riskScore > 50 || userData.isBanned
    
    // Get recent trading activity for analysis
    const recentTrades = await db.getTrades(user.walletAddress, undefined, 20)
    
    // Calculate trading patterns
    const tradeCount = recentTrades.length
    const avgTradeSize = tradeCount > 0 
      ? recentTrades.reduce((sum, trade) => sum + trade.totalValue, 0) / tradeCount
      : 0
    
    const buyTrades = recentTrades.filter(trade => trade.type === 'buy').length
    const sellTrades = recentTrades.filter(trade => trade.type === 'sell').length
    const buySellRatio = sellTrades > 0 ? buyTrades / sellTrades : buyTrades
    
    const response = successResponse({
      user: {
        walletAddress: userData.walletAddress,
        riskScore: userData.riskScore,
        riskLevel,
        isFlagged,
        isBanned: userData.isBanned,
        reputationScore: userData.reputationScore,
        reputationLevel: userData.reputationLevel,
        totalTrades: userData.totalTrades,
        totalVolume: userData.totalVolume,
        lastActivity: userData.lastActivity,
      },
      riskAnalysis: {
        riskScore: userData.riskScore,
        riskLevel,
        factors: {
          highVolume: avgTradeSize > 1000,
          frequentTrading: tradeCount > 10,
          imbalancedTrading: buySellRatio > 3 || buySellRatio < 0.3,
          recentActivity: recentTrades.length > 0,
        },
        recommendations: isFlagged ? [
          'Consider reducing trade frequency',
          'Avoid large volume trades',
          'Maintain balanced buy/sell ratio',
        ] : [
          'Continue following fair trading practices',
          'Maintain current trading patterns',
        ],
      },
      recentActivity: {
        tradeCount,
        avgTradeSize,
        buySellRatio,
        lastTradeDate: recentTrades.length > 0 ? recentTrades[0].createdAt : null,
      },
      logs: recentLogs.map(log => ({
        id: log.id,
        activityType: log.activityType,
        riskScore: log.riskScore,
        flags: JSON.parse(log.flags || '[]'),
        details: log.details,
        isResolved: log.isResolved,
        createdAt: log.createdAt,
      })),
    })
    
    logApiResponse(response, user.walletAddress)
    return response
    
  } catch (error) {
    console.error('Failed to get anti-manipulation status:', error)
    throw error
  }
})
