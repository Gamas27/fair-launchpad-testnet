import { NextRequest } from 'next/server'
import { DatabaseService } from '@/lib/database'
import { 
  withOptionalAuth, 
  successResponse, 
  validateQueryParams,
  getPaginationParams,
  createPaginationResponse,
  logApiRequest,
  logApiResponse 
} from '@/lib/api-utils'
import { z } from 'zod'

const tradeQuerySchema = z.object({
  type: z.enum(['buy', 'sell']).optional(),
  limit: z.string().optional(),
  offset: z.string().optional(),
})

export const GET = withOptionalAuth(async (user, request: NextRequest, { params }: { params: { address: string } }) => {
  logApiRequest(request, user?.walletAddress)
  
  const { searchParams } = new URL(request.url)
  
  // Add default values if not provided
  if (!searchParams.has('limit')) {
    searchParams.set('limit', '20')
  }
  if (!searchParams.has('offset')) {
    searchParams.set('offset', '0')
  }
  
  const queryParams = validateQueryParams(tradeQuerySchema, searchParams)
  const { limit, offset } = queryParams
  
  const db = DatabaseService.getInstance()
  
  try {
    const where: any = {
      tokenAddress: params.address,
    }
    
    if (queryParams.type) {
      where.type = queryParams.type
    }
    
    const [trades, total] = await Promise.all([
      db.getTrades(undefined, params.address, limit),
      db.prisma.trade.count({ where }),
    ])
    
    const responseData = createPaginationResponse(trades, total, limit, offset)
    
    const response = successResponse(responseData)
    logApiResponse(response, user?.walletAddress)
    return response
    
  } catch (error) {
    console.error('Failed to get token trades:', error)
    throw error
  }
})
