import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/config/database'
import { SecurityManager } from '@/lib/utils/security'
import { ErrorHandler } from '@/lib/utils/performance'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'public'
    const repRequirement = searchParams.get('repRequirement') ? parseInt(searchParams.get('repRequirement')!) : undefined

    // Rate limiting
    const identifier = request.ip || 'unknown'
    if (!SecurityManager.checkRateLimit(identifier, 20, 60000)) { // 20 requests per minute
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    // Build where clause
    const where: any = { type }
    if (repRequirement !== undefined) {
      where.repRequirement = { lte: repRequirement }
    }

    const rooms = await prisma.chatRoom.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        creator: {
          select: {
            id: true,
            walletAddress: true,
            reputationLevel: true,
          }
        },
        _count: {
          select: { messages: true }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: rooms,
      message: 'Chat rooms fetched successfully',
    })

  } catch (error) {
    ErrorHandler.logError(error as Error, 'chat rooms fetch')
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, type, description, repRequirement, creatorId } = body

    // Validate required fields
    if (!name || !type || !creatorId) {
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
      type: SecurityManager.sanitizeInput(type),
      description: description ? SecurityManager.sanitizeInput(description) : null,
      repRequirement: repRequirement || null,
    }

    // Create chat room
    const room = await prisma.chatRoom.create({
      data: {
        ...sanitizedData,
        creatorId,
        membersCount: 1, // Creator is the first member
        onlineCount: 0,
      },
      include: {
        creator: {
          select: {
            id: true,
            walletAddress: true,
            reputationLevel: true,
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: room,
      message: 'Chat room created successfully',
    })

  } catch (error) {
    ErrorHandler.logError(error as Error, 'chat room creation')
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}