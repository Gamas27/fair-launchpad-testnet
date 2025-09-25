import { NextRequest } from 'next/server'
import { DatabaseService } from '@/lib/database'
import { AuthService } from '@/lib/auth'
import { 
  withAuth, 
  successResponse, 
  validateRequestBody,
  logApiRequest,
  logApiResponse 
} from '@/lib/api-utils'
import { z } from 'zod'

const executeTradeSchema = z.object({
  tokenAddress: z.string().min(1),
  type: z.enum(['buy', 'sell']),
  amount: z.number().positive(),
  maxSlippage: z.number().min(0).max(100).optional().default(5),
})

export const POST = withAuth(async (user, request: NextRequest, context?: { params: Promise<any> }) => {
  logApiRequest(request, user.walletAddress)
  
  const body = await request.json()
  const data = validateRequestBody(executeTradeSchema, body)
  
  const db = DatabaseService.getInstance()
  const authService = AuthService.getInstance()
  
  try {
    // Get token details
    const token = await db.getToken(data.tokenAddress)
    if (!token) {
      throw new Error('Token not found')
    }
    
    // Check if token is active
    if (token.status !== 'active') {
      throw new Error('Token is not active for trading')
    }
    
    // Check user allocation limits
    const userData = await db.getUser(user.walletAddress)
    if (!userData) {
      throw new Error('User not found')
    }
    
    const remainingAllocation = userData.allocationCap - userData.usedAllocation
    if (data.type === 'buy' && data.amount > remainingAllocation) {
      throw new Error('Insufficient allocation remaining')
    }
    
    // Check rate limiting
    const canTrade = await authService.checkRateLimit(
      user.walletAddress,
      'trade',
      10, // max 10 trades
      60000 // per minute
    )
    
    if (!canTrade) {
      throw new Error('Rate limit exceeded. Please wait before trading again.')
    }
    
    // Calculate trade details
    const currentPrice = token.currentPrice
    const totalValue = data.amount * currentPrice
    
    // For now, we'll simulate the trade execution
    // In production, this would interact with the blockchain
    const tradeResult = {
      success: true,
      transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      blockNumber: Math.floor(Math.random() * 1000000) + 1000000,
      gasUsed: Math.floor(Math.random() * 100000) + 50000,
      effectivePrice: currentPrice,
      slippage: Math.random() * 2, // 0-2% slippage
    }
    
    // Create trade record
    const trade = await db.createTrade({
      userAddress: user.walletAddress,
      tokenAddress: data.tokenAddress,
      type: data.type,
      amount: data.amount,
      price: currentPrice,
      totalValue,
      blockNumber: BigInt(tradeResult.blockNumber),
      transactionHash: tradeResult.transactionHash,
      riskScore: 0, // TODO: Calculate risk score
      isSuspicious: false, // TODO: Implement anti-manipulation check
    })
    
    // Update user stats
    const newUsedAllocation = data.type === 'buy' 
      ? userData.usedAllocation + data.amount
      : Math.max(0, userData.usedAllocation - data.amount)
    
    await db.updateUser(user.walletAddress, {
      usedAllocation: newUsedAllocation,
      totalTrades: userData.totalTrades + 1,
      totalVolume: userData.totalVolume + totalValue,
      lastActivity: new Date(),
    })
    
    // Update token stats
    await db.updateToken(data.tokenAddress, {
      totalTrades: token.totalTrades + 1,
      totalVolume: token.totalVolume + totalValue,
      currentSupply: data.type === 'buy' 
        ? token.currentSupply + BigInt(Math.floor(data.amount))
        : token.currentSupply - BigInt(Math.floor(data.amount)),
    })
    
    const response = successResponse({
      trade: {
        id: trade.id,
        type: trade.type,
        amount: trade.amount,
        price: trade.price,
        totalValue: trade.totalValue,
        transactionHash: trade.transactionHash,
        blockNumber: trade.blockNumber?.toString(),
        createdAt: trade.createdAt,
      },
      execution: tradeResult,
      userStats: {
        usedAllocation: newUsedAllocation,
        remainingAllocation: userData.allocationCap - newUsedAllocation,
        totalTrades: userData.totalTrades + 1,
        totalVolume: userData.totalVolume + totalValue,
      },
    }, 'Trade executed successfully')
    
    logApiResponse(response, user.walletAddress)
    return response
    
  } catch (error) {
    console.error('Failed to execute trade:', error)
    throw error
  }
})
