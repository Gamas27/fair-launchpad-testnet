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

const analyzeTradeSchema = z.object({
  tokenAddress: z.string().min(1),
  type: z.enum(['buy', 'sell']),
  amount: z.number().positive(),
  price: z.number().positive(),
  totalValue: z.number().positive(),
})

export const POST = withAuth(async (user, request: NextRequest, context?: { params: Promise<Record<string, unknown>> }) => {
  logApiRequest(request, user.walletAddress)
  
  const body = await request.json()
  const data = validateRequestBody(analyzeTradeSchema, body)
  
  const db = DatabaseService.getInstance()
  
  try {
    // Get user data
    const userData = await db.getUser(user.walletAddress)
    
    if (!userData) {
      throw new Error('User not found')
    }
    
    // Get recent trades for analysis
    const recentTrades = await db.getTrades(user.walletAddress, undefined, 50)
    const tokenTrades = await db.getTrades(undefined, data.tokenAddress, 100)
    
    // Calculate risk factors
    const riskFactors = []
    let riskScore = 0
    
    // Factor 1: Trade size relative to user's typical trades
    const userAvgTrade = recentTrades.length > 0 
      ? recentTrades.reduce((sum, trade) => sum + trade.totalValue, 0) / recentTrades.length
      : 0
    
    if (data.totalValue > userAvgTrade * 5) {
      riskFactors.push('unusually_large_trade')
      riskScore += 20
    }
    
    // Factor 2: Trade frequency
    const recentTradeCount = recentTrades.filter(
      trade => Date.now() - new Date(trade.createdAt).getTime() < 300000 // 5 minutes
    ).length
    
    if (recentTradeCount > 5) {
      riskFactors.push('high_frequency_trading')
      riskScore += 15
    }
    
    // Factor 3: Price deviation from market
    const tokenAvgPrice = tokenTrades.length > 0
      ? tokenTrades.reduce((sum, trade) => sum + trade.price, 0) / tokenTrades.length
      : data.price
    
    const priceDeviation = Math.abs(data.price - tokenAvgPrice) / tokenAvgPrice
    if (priceDeviation > 0.1) { // 10% deviation
      riskFactors.push('price_deviation')
      riskScore += 10
    }
    
    // Factor 4: User reputation
    if (userData.reputationScore < 100) {
      riskFactors.push('low_reputation')
      riskScore += 10
    }
    
    // Factor 5: Recent suspicious activity
    const recentSuspiciousTrades = recentTrades.filter(trade => trade.isSuspicious).length
    if (recentSuspiciousTrades > 2) {
      riskFactors.push('recent_suspicious_activity')
      riskScore += 25
    }
    
    // Factor 6: Trading pattern analysis
    const buyTrades = recentTrades.filter(trade => trade.type === 'buy').length
    const sellTrades = recentTrades.filter(trade => trade.type === 'sell').length
    
    if (data.type === 'buy' && buyTrades > sellTrades * 3) {
      riskFactors.push('imbalanced_buying')
      riskScore += 15
    } else if (data.type === 'sell' && sellTrades > buyTrades * 3) {
      riskFactors.push('imbalanced_selling')
      riskScore += 15
    }
    
    // Cap risk score at 100
    riskScore = Math.min(riskScore, 100)
    
    const isSuspicious = riskScore > 50
    const riskLevel = riskScore < 30 ? 'low' : 
                     riskScore < 70 ? 'medium' : 'high'
    
    // Log the analysis
    await db.createAntiManipulationLog({
      userAddress: user.walletAddress,
      activityType: 'trade_analysis',
      riskScore,
      flags: JSON.stringify(riskFactors),
      details: `Trade analysis: ${data.type} ${data.amount} tokens at ${data.price} price`,
    })
    
    const response = successResponse({
      analysis: {
        riskScore,
        riskLevel,
        isSuspicious,
        factors: riskFactors,
        recommendations: isSuspicious ? [
          'Trade flagged for review',
          'Consider reducing trade size',
          'Maintain balanced trading patterns',
        ] : [
          'Trade appears normal',
          'Continue following fair trading practices',
        ],
      },
      trade: {
        tokenAddress: data.tokenAddress,
        type: data.type,
        amount: data.amount,
        price: data.price,
        totalValue: data.totalValue,
      },
      context: {
        userAvgTrade,
        recentTradeCount,
        priceDeviation: priceDeviation * 100, // as percentage
        userReputation: userData.reputationScore,
        recentSuspiciousTrades,
      },
    })
    
    logApiResponse(response, user.walletAddress)
    return response
    
  } catch (error) {
    console.error('Failed to analyze trade:', error)
    throw error
  }
})
