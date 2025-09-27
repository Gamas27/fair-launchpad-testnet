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
import { tokenQuerySchema } from '@/lib/validation'

export const GET = withOptionalAuth(async (user, request: NextRequest) => {
  logApiRequest(request, user?.walletAddress)
  
  const { searchParams } = new URL(request.url)
  
  // Add default values if not provided
  if (!searchParams.has('limit')) {
    searchParams.set('limit', '20')
  }
  if (!searchParams.has('offset')) {
    searchParams.set('offset', '0')
  }
  
  const queryParams = validateQueryParams(tokenQuerySchema, searchParams)
  const { limit, offset } = queryParams
  
  const db = DatabaseService.getInstance()
  
  try {
    const where: any = {}
    
    if (queryParams.status) {
      where.status = queryParams.status
    }
    
    if (queryParams.creator) {
      where.creatorAddress = queryParams.creator
    }
    
    const [tokens, total] = await Promise.all([
      db.getTokens({
        where,
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' },
        include: {
          creator: {
            select: {
              walletAddress: true,
              reputationLevel: true,
              verificationLevel: true,
            },
          },
          _count: {
            select: { trades: true },
          },
        },
      }),
      db.getTokenCount({ where }),
    ])
    
    // Serialize BigInt values
    const serializedTokens = tokens.map(token => ({
      ...token,
      maxSupply: token.maxSupply.toString(),
      currentSupply: token.currentSupply.toString(),
    }))
    
    const responseData = createPaginationResponse(serializedTokens, total, limit, offset)
    
    const response = successResponse(responseData)
    logApiResponse(response, user?.walletAddress)
    return response
    
  } catch (error) {
    console.error('Failed to get tokens:', error)
    throw error
  }
})

export const POST = withOptionalAuth(async (user, request: NextRequest) => {
  logApiRequest(request, user?.walletAddress)
  
  // For demo purposes, use an existing user if none exists
  if (!user) {
    user = {
      walletAddress: '0x1234567890123456789012345678901234567890', // Use existing Gold user
      worldIdHash: 'demo_world_id_hash',
      verificationLevel: 'device'
    }
  }
  
  const body = await request.json()
  const db = DatabaseService.getInstance()
  
  try {
    // Validate token data
    const tokenData = {
      address: body.address,
      name: body.name,
      symbol: body.symbol,
      description: body.description,
      imageUrl: body.imageUrl,
      creatorAddress: user.walletAddress,
      initialPrice: parseFloat(body.initialPrice),
      priceIncrement: parseFloat(body.priceIncrement),
      maxSupply: BigInt(body.maxSupply),
      currentPrice: parseFloat(body.initialPrice), // Set current price to initial price
      totalVolume: 0,
      totalTrades: 0,
      marketCap: 0,
      status: 'active'
    }
    
    // Check if token already exists
    const existingToken = await db.getToken(tokenData.address)
    if (existingToken) {
      throw new Error('Token with this address already exists')
    }
    
    // Check if symbol is already taken
    const existingSymbol = await db.getTokenBySymbol(tokenData.symbol)
    if (existingSymbol) {
      throw new Error('Token symbol already taken')
    }
    
    // Create token
    const token = await db.createToken(tokenData)
    
    const response = successResponse({
      token: {
        address: token.address,
        name: token.name,
        symbol: token.symbol,
        description: token.description,
        imageUrl: token.imageUrl,
        creatorAddress: token.creatorAddress,
        initialPrice: token.initialPrice,
        priceIncrement: token.priceIncrement,
        maxSupply: token.maxSupply.toString(),
        currentPrice: token.currentPrice,
        currentSupply: token.currentSupply.toString(),
        totalVolume: token.totalVolume,
        totalTrades: token.totalTrades,
        status: token.status,
        launchDate: token.launchDate,
        createdAt: token.createdAt,
      },
    }, 'Token created successfully')
    
    logApiResponse(response, user.walletAddress)
    return response
    
  } catch (error) {
    console.error('Failed to create token:', error)
    throw error
  }
})

