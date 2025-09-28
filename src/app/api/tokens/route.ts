import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/config/database'
import { SecurityManager } from '@/lib/utils/security'
import { ErrorHandler } from '@/lib/utils/performance'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Rate limiting
    const identifier = request.ip || 'unknown'
    if (!SecurityManager.checkRateLimit(identifier, 30, 60000)) { // 30 requests per minute
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    const skip = (page - 1) * limit

    // Build where clause
    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { ticker: { contains: search, mode: 'insensitive' as const } },
      ]
    } : {}

    // Get tokens with pagination
    const [tokens, total] = await Promise.all([
      prisma.token.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          creator: {
            select: {
              id: true,
              walletAddress: true,
              reputationLevel: true,
              isWorldIdVerified: true,
            }
          },
          _count: {
            select: { trades: true }
          }
        }
      }),
      prisma.token.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: {
        tokens,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        }
      },
      message: 'Tokens fetched successfully',
    })

  } catch (error) {
    ErrorHandler.logError(error as Error, 'tokens fetch')
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, ticker, description, logo, creatorId, socialLinks, teamInfo } = body

    // Validate required fields
    if (!name || !ticker || !creatorId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Rate limiting
    const identifier = request.ip || 'unknown'
    if (!SecurityManager.checkRateLimit(identifier, 5, 60000)) { // 5 creations per minute
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: SecurityManager.sanitizeInput(name),
      ticker: SecurityManager.sanitizeInput(ticker),
      description: description ? SecurityManager.sanitizeInput(description) : null,
      logo: logo ? SecurityManager.sanitizeInput(logo) : null,
      teamInfo: teamInfo ? SecurityManager.sanitizeInput(teamInfo) : null,
    }

    // Check if ticker already exists
    const existingToken = await prisma.token.findUnique({
      where: { ticker }
    })

    if (existingToken) {
      return NextResponse.json(
        { success: false, error: 'Token ticker already exists' },
        { status: 409 }
      )
    }

    // Create token
    const token = await prisma.token.create({
      data: {
        ...sanitizedData,
        creatorId,
        socialLinks: socialLinks || {},
        isLive: false,
        marketCap: 0,
        ath: 0,
        volume: 0,
        txCount: 0,
      },
      include: {
        creator: {
          select: {
            id: true,
            walletAddress: true,
            reputationLevel: true,
            isWorldIdVerified: true,
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: token,
      message: 'Token created successfully',
    })

  } catch (error) {
    ErrorHandler.logError(error as Error, 'token creation')
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}