import { NextRequest, NextResponse } from 'next/server'

// Mock messages data
const mockMessages = [
  {
    id: 1,
    roomId: 1,
    user: '@ARCadePlayer',
    avatar: '🎮',
    message: 'The new game update is amazing! Can\'t wait to see what\'s next.',
    timestamp: '2m ago',
    repScore: 850,
    isVerified: true,
    glowColor: 'cyan',
    type: 'text',
    attachments: [],
  },
  {
    id: 2,
    roomId: 1,
    user: '@GameFiGuru',
    avatar: '👨‍💻',
    message: 'I agree! The graphics are incredible. This is going to be huge.',
    timestamp: '1m ago',
    repScore: 1200,
    isVerified: true,
    glowColor: 'purple',
    type: 'text',
    attachments: [],
  },
  {
    id: 3,
    roomId: 1,
    user: '@CryptoNewbie',
    avatar: '🆕',
    message: 'First time here, excited to be part of the community!',
    timestamp: '30s ago',
    repScore: 150,
    isVerified: false,
    glowColor: 'green',
    type: 'text',
    attachments: [],
  },
  {
    id: 4,
    roomId: 2,
    user: '@GameFiGuru',
    avatar: '👨‍💻',
    message: 'Thanks for the tip about ARC!',
    timestamp: '5m ago',
    repScore: 1200,
    isVerified: true,
    glowColor: 'purple',
    type: 'text',
    attachments: [],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const roomId = searchParams.get('roomId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

    if (!roomId) {
      return NextResponse.json(
        { success: false, error: 'Room ID is required' },
        { status: 400 }
      )
    }

    // Filter messages by room
    let roomMessages = mockMessages.filter(msg => msg.roomId === parseInt(roomId))

    // Sort by timestamp (newest first)
    roomMessages.sort((a, b) => {
      const aTime = new Date(a.timestamp).getTime()
      const bTime = new Date(b.timestamp).getTime()
      return bTime - aTime
    })

    // Paginate results
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedMessages = roomMessages.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        messages: paginatedMessages,
        pagination: {
          page,
          limit,
          total: roomMessages.length,
          totalPages: Math.ceil(roomMessages.length / limit),
        },
      }
    })
  } catch (error) {
    console.error('Messages fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      roomId,
      message,
      type = 'text',
      attachments = [],
    } = body

    // Validate required fields
    if (!roomId || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Mock message creation
    const newMessage = {
      id: Date.now(),
      roomId: parseInt(roomId),
      user: '@CurrentUser', // In production, get from auth
      avatar: '👤',
      message,
      timestamp: new Date().toISOString(),
      repScore: 1250, // In production, get from user profile
      isVerified: true,
      glowColor: 'cyan',
      type,
      attachments,
      createdAt: new Date().toISOString(),
    }

    // In production, this would save to database and broadcast to room
    console.log('Creating message:', newMessage)

    return NextResponse.json({
      success: true,
      data: newMessage,
      message: 'Message sent successfully'
    })
  } catch (error) {
    console.error('Message creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
