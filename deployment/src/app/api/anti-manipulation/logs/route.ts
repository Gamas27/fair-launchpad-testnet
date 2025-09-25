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

const logsQuerySchema = z.object({
  activityType: z.string().optional(),
  isResolved: z.string().optional(),
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
  
  const queryParams = validateQueryParams(logsQuerySchema, searchParams)
  const { limit, offset } = queryParams
  
  const db = DatabaseService.getInstance()
  
  try {
    const where: any = {
      userAddress: user.walletAddress,
    }
    
    if (queryParams.activityType) {
      where.activityType = queryParams.activityType
    }
    
    if (queryParams.isResolved !== undefined) {
      where.isResolved = queryParams.isResolved === 'true'
    }
    
    const logs = await db.getAntiManipulationLogs(user.walletAddress, parseInt(limit || '20'))
    
    const formattedLogs = logs.map(log => ({
      id: log.id,
      activityType: log.activityType,
      riskScore: log.riskScore,
      flags: JSON.parse(log.flags || '[]'),
      details: log.details,
      isResolved: log.isResolved,
      resolvedAt: log.resolvedAt,
      resolvedBy: log.resolvedBy,
      createdAt: log.createdAt,
      updatedAt: log.updatedAt,
    }))
    
    const responseData = {
      items: formattedLogs,
      total: formattedLogs.length,
      limit,
      offset,
    }
    
    const response = successResponse(responseData)
    logApiResponse(response, user.walletAddress)
    return response
    
  } catch (error) {
    console.error('Failed to get anti-manipulation logs:', error)
    throw error
  }
})
