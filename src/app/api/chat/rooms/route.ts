import { NextRequest, NextResponse } from 'next/server'

// Mock chat rooms data
const mockChatRooms = [
  {
    id: 1,
    type: 'group',
    name: 'ARC Community',
    icon: '🎮',
    description: 'Official ARC token community chat',
    lastMessage: 'The new game update is amazing!',
    timestamp: '2m ago',
    unread: 3,
    repRequired: 50,
    members: 1250,
    isOnline: true,
    isPrivate: false,
    tags: ['gaming', 'arc', 'community'],
  },
  {
    id: 2,
    type: 'dm',
    name: '@GameFiGuru',
    icon: '👨‍💻',
    description: 'Direct message with GameFiGuru',
    lastMessage: 'Thanks for the tip about ARC!',
    timestamp: '5m ago',
    unread: 1,
    repRequired: 0,
    members: 1,
    isOnline: true,
    isPrivate: true,
    tags: ['dm', 'gaming'],
  },
  {
    id: 3,
    type: 'group',
    name: 'GRT Traders',
    icon: '🎯',
    description: 'GRT trading discussion group',
    lastMessage: 'Price is looking good today',
    timestamp: '10m ago',
    unread: 0,
    repRequired: 100,
    members: 890,
    isOnline: false,
    isPrivate: false,
    tags: ['trading', 'grt', 'analysis'],
  },
  {
    id: 4,
    type: 'coin',
    name: 'ARC Token Chat',
    icon: '🎮',
    description: 'ARC token official chat room',
    lastMessage: 'New holder joined the community!',
    timestamp: '15m ago',
    unread: 0,
    repRequired: 25,
    members: 450,
    isOnline: true,
    isPrivate: false,
    tags: ['coin', 'arc', 'official'],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all'
    const search = searchParams.get('search') || ''
    const repMin = parseInt(searchParams.get('repMin') || '0')

    let filteredRooms = mockChatRooms

    // Filter by type
    if (type !== 'all') {
      filteredRooms = filteredRooms.filter(room => room.type === type)
    }

    // Filter by search
    if (search) {
      filteredRooms = filteredRooms.filter(room =>
        room.name.toLowerCase().includes(search.toLowerCase()) ||
        room.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Filter by REP requirement
    filteredRooms = filteredRooms.filter(room => room.repRequired <= repMin)

    return NextResponse.json({
      success: true,
      data: filteredRooms
    })
  } catch (error) {
    console.error('Chat rooms fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch chat rooms' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      description,
      type,
      repRequired,
      isPrivate,
      tags,
    } = body

    // Validate required fields
    if (!name || !type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Mock room creation
    const newRoom = {
      id: Date.now(),
      name,
      description: description || '',
      type,
      icon: '💬', // Default icon
      lastMessage: '',
      timestamp: 'now',
      unread: 0,
      repRequired: repRequired || 0,
      members: 1,
      isOnline: true,
      isPrivate: isPrivate || false,
      tags: tags || [],
      createdAt: new Date().toISOString(),
    }

    // In production, this would save to database
    console.log('Creating chat room:', newRoom)

    return NextResponse.json({
      success: true,
      data: newRoom,
      message: 'Chat room created successfully'
    })
  } catch (error) {
    console.error('Chat room creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create chat room' },
      { status: 500 }
    )
  }
}
