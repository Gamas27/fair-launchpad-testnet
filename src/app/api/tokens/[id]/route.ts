import { NextRequest, NextResponse } from 'next/server'

// Mock token data
const mockToken = {
  id: '1',
  name: 'MemeCoin',
  symbol: 'MEME',
  description: 'MemeCoin is the next generation of community-driven digital assets, designed for rapid growth and fair distribution. Built on the principles of decentralization and transparency, MemeCoin aims to empower its holders through innovative tokenomics and a vibrant ecosystem.',
  logo: '🔥',
  website: 'https://memecoin.com',
  twitter: '@memecoin',
  telegram: 't.me/memecoin',
  marketCap: 1200000,
  price: 0.000001,
  totalSupply: 1000000000,
  liquidity: 850000,
  creator: '0xMockCreator123',
  createdAt: '2024-01-15T10:30:00Z',
  isLive: true,
  repRequired: 50,
  stats: {
    holders: 1250,
    transactions: 12500,
    volume24h: 250000,
    priceChange24h: 15.5,
    ath: 1500000,
    atl: 800000,
  },
  social: {
    x: 'https://x.com/memecoin',
    telegram: 'https://t.me/memecoin',
    discord: 'https://discord.gg/memecoin',
  },
  gradu8Story: 'Born from the depths of the internet, MemeCoin quickly gained traction among early adopters. Its unique bonding curve mechanism ensured a fair launch, preventing large whale manipulation. As it hit its initial market cap targets, the community rallied, pushing it towards its first graduation ceremony.',
  teamInfo: 'The MemeCoin project is supported by a decentralized team of blockchain enthusiasts, developers, and community managers. Our core contributors are anonymous to maintain the decentralized ethos, but regularly engage with the community through various channels.',
  repBreakdown: {
    verified: 85,
    anon: 10,
    flagged: 5,
  },
  recentActivity: [
    { id: 'tx1', type: 'buy', user: '0xabc...123', amount: '100 SOL', tokenAmount: '10,000 MEME', time: '2m ago' },
    { id: 'tx2', type: 'sell', user: '0xdef...456', amount: '50 SOL', tokenAmount: '5,000 MEME', time: '5m ago' },
    { id: 'tx3', type: 'buy', user: '0xghi...789', amount: '200 SOL', tokenAmount: '20,000 MEME', time: '10m ago' },
  ],
  priceHistory: [
    { time: '1h', price: 0.0001 },
    { time: '30m', price: 0.00012 },
    { time: '15m', price: 0.00011 },
    { time: 'now', price: 0.00013 },
  ],
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // In production, this would fetch from database
    if (id === '1') {
      return NextResponse.json({
        success: true,
        data: mockToken
      })
    }

    return NextResponse.json(
      { success: false, error: 'Token not found' },
      { status: 404 }
    )
  } catch (error) {
    console.error('Token fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch token' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // In production, this would update the database
    const updatedToken = {
      ...mockToken,
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: updatedToken,
      message: 'Token updated successfully'
    })
  } catch (error) {
    console.error('Token update error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update token' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // In production, this would delete from database
    console.log('Deleting token:', id)

    return NextResponse.json({
      success: true,
      message: 'Token deleted successfully'
    })
  } catch (error) {
    console.error('Token deletion error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete token' },
      { status: 500 }
    )
  }
}
