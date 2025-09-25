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

const tradingHistoryQuerySchema = z.object({
  tokenAddress: z.string().optional(),
  type: z.enum(['buy', 'sell']).optional(),
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
  
  const queryParams = validateQueryParams(tradingHistoryQuerySchema, searchParams)
  const { limit, offset } = queryParams
  
  const db = DatabaseService.getInstance()
  
  try {
    const where: any = {
      userAddress: user.walletAddress,
    }
    
    if (queryParams.tokenAddress) {
      where.tokenAddress = queryParams.tokenAddress
    }
    
    if (queryParams.type) {
      where.type = queryParams.type
    }
    
    const [trades, total] = await Promise.all([
      db.getTrades(user.walletAddress, queryParams.tokenAddress, limit),
      db.prisma.trade.count({ where }),
    ])
    
    // Get token details for each trade
    const tradesWithTokens = await Promise.all(
      trades.map(async (trade) => {
        const token = await db.getToken(trade.tokenAddress)
        return {
          id: trade.id,
          type: trade.type,
          amount: trade.amount,
          price: trade.price,
          totalValue: trade.totalValue,
          blockNumber: trade.blockNumber?.toString(),
          transactionHash: trade.transactionHash,
          riskScore: trade.riskScore,
          isSuspicious: trade.isSuspicious,
          createdAt: trade.createdAt,
          token: token ? {
            address: token.address,
            name: token.name,
            symbol: token.symbol,
            imageUrl: token.imageUrl,
          } : null,
        }
      })
    )
    
    const responseData = createPaginationResponse(tradesWithTokens, total, limit, offset)
    
    const response = successResponse(responseData)
    logApiResponse(response, user.walletAddress)
    return response
    
  } catch (error) {
    console.error('Failed to get trading history:', error)
    throw error
  }
})
