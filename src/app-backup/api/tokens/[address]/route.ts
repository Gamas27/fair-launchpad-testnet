import { NextRequest } from 'next/server'
import { DatabaseService } from '@/lib/database'
import { 
  withOptionalAuth, 
  successResponse, 
  errorResponse,
  logApiRequest,
  logApiResponse 
} from '@/lib/api-utils'

export const GET = withOptionalAuth(async (user, request: NextRequest, { params }) => {
  const { address } = await params
  logApiRequest(request, user?.walletAddress)
  
  const db = DatabaseService.getInstance()
  
  try {
    const token = await db.getToken(address)
    
    if (!token) {
      return errorResponse('Token not found', 404)
    }
    
    // Serialize BigInt values
    const serializedToken = {
      ...token,
      maxSupply: token.maxSupply.toString(),
      currentSupply: token.currentSupply.toString(),
    }
    
    const response = successResponse(serializedToken)
    logApiResponse(response, user?.walletAddress)
    return response
    
  } catch (error) {
    console.error('Failed to get token:', error)
    return errorResponse('Failed to fetch token', 500)
  }
})