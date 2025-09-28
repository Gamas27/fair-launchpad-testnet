import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/config/database'
import { SecurityManager } from '@/lib/utils/security'
import { ErrorHandler } from '@/lib/utils/performance'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const roomId = searchParams.get('roomId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    if (!roomId) {
      return NextResponse.json(
        { success: false, error: 'Room ID is required' },
        { status: 400 }
      )
    }

    // Rate limiting
    const identifier = request.ip || 'unknown'
    if (!SecurityManager.checkRateLimit(identifier, 30, 60000)) { // 30 requests per minute
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    const skip = (page - 1) * limit

    const [messages, total] = await Promise.all([
      prisma.chatMessage.findMany({
        where: { roomId },
        skip,
        take: limit,
        orderBy: { timestamp: 'desc' },
        include: {
          sender: {
            select: {
              id: true,
              walletAddress: true,
              reputationLevel: true,
              isWorldIdVerified: true,
            }
          }
        }
      }),
      prisma.chatMessage.count({ where: { roomId } })
    ])

    return NextResponse.json({
      success: true,
      data: {
        messages: messages.reverse(), // Show oldest first
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        }
      },
      message: 'Messages fetched successfully',
    })

  } catch (error) {
    ErrorHandler.logError(error as Error, 'chat messages fetch')
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { roomId, senderId, message, type = 'text', attachments } = body

    // Validate required fields
    if (!roomId || !senderId || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Rate limiting
    const identifier = request.ip || 'unknown'
    if (!SecurityManager.checkRateLimit(identifier, 20, 60000)) { // 20 messages per minute
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    // Sanitize message
    const sanitizedMessage = SecurityManager.sanitizeInput(message)

    // Create message
    const chatMessage = await prisma.chatMessage.create({
      data: {
        roomId,
        senderId,
        message: sanitizedMessage,
        type,
        attachments: attachments || null,
      },
      include: {
        sender: {
          select: {
            id: true,
            walletAddress: true,
            reputationLevel: true,
            isWorldIdVerified: true,
          }
        }
      }
    })

    // Update room's last message info
    await prisma.chatRoom.update({
      where: { id: roomId },
      data: {
        lastMessage: sanitizedMessage.substring(0, 100), // Truncate for preview
        lastMessageTime: new Date(),
      }
    })

    return NextResponse.json({
      success: true,
      data: chatMessage,
      message: 'Message sent successfully',
    })

  } catch (error) {
    ErrorHandler.logError(error as Error, 'chat message creation')
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}