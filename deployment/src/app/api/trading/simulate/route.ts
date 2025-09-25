import { NextRequest } from 'next/server'
import { DatabaseService } from '@/lib/database'
import { 
  withAuth, 
  successResponse, 
  validateRequestBody,
  checkRateLimit,
  logApiRequest,
  logApiResponse 
} from '@/lib/api-utils'
import { simulateTradeSchema } from '@/lib/validation'
import { bondingCurveService } from '@/services/bondingCurveService'
import { antiManipulationService } from '@/services/antiManipulationService'

export const POST = withAuth(async (user, request: NextRequest) => {
  logApiRequest(request, user.walletAddress)
  
  // Check rate limit
  await checkRateLimit(user.walletAddress, 'simulate_trade', 20, 60000) // 20 requests per minute
  
  const body = await request.json()
  const data = validateRequestBody(simulateTradeSchema, body)
  
  const db = DatabaseService.getInstance()
  
  try {
    // Get token
    const token = await db.getToken(data.tokenAddress)
    if (!token) {
      throw new Error('Token not found')
    }
    
    // Get current bonding curve state
    const curveState = bondingCurveService.getCurrentBondingCurveState(
      token.currentSupply,
      token.currentPrice,
      token.priceIncrement,
      token.maxSupply
    )
    
    // Simulate the trade
    const simulation = bondingCurveService.simulateTrade(
      data.type,
      data.amount,
      curveState
    )
    
    // Check if simulation failed
    if (!simulation.isPossible) {
      throw new Error(simulation.error || 'Trade simulation failed')
    }
    
    // Simplified anti-manipulation analysis for now
    const manipulationAnalysis = {
      riskScore: 0,
      isSuspicious: false,
      flags: [],
      recommendations: []
    }
    
    const metrics = {
      cooldownRemaining: 0,
      dailyTradeLimit: 10,
      remainingTrades: 10
    }
    
    const response = successResponse({
      simulation: {
        type: data.type,
        amount: data.amount,
        currentPrice: curveState.currentPrice,
        newPrice: simulation.newPrice,
        priceImpact: simulation.priceImpact,
        totalCost: simulation.totalCost,
        tokensReceived: simulation.tokensReceived,
        newSupply: simulation.newSupply,
        isPossible: simulation.isPossible,
        error: simulation.error,
      },
      antiManipulation: {
        riskScore: manipulationAnalysis.riskScore,
        isSuspicious: manipulationAnalysis.isSuspicious,
        flags: manipulationAnalysis.flags,
        recommendations: manipulationAnalysis.recommendations,
      },
      userMetrics: {
        reputationScore: user.reputationScore,
        reputationLevel: user.reputationLevel,
        verificationLevel: user.verificationLevel,
        totalTrades: user.totalTrades,
        totalVolume: user.totalVolume,
        riskScore: user.riskScore,
        cooldownRemaining: metrics.cooldownRemaining,
        dailyTradeLimit: metrics.dailyTradeLimit,
        remainingTrades: metrics.remainingTrades,
      },
      token: {
        address: token.address,
        name: token.name,
        symbol: token.symbol,
        currentPrice: token.currentPrice,
        currentSupply: token.currentSupply.toString(),
        maxSupply: token.maxSupply.toString(),
        totalVolume: token.totalVolume,
        totalTrades: token.totalTrades,
        status: token.status,
      },
    })
    
    logApiResponse(response, user.walletAddress)
    return response
    
  } catch (error) {
    console.error('Failed to simulate trade:', error)
    throw error
  }
})

