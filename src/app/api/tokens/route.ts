import { NextRequest, NextResponse } from 'next/server'

// Mock tokens data
const mockTokens = [
  {
    id: '1',
    name: 'MemeCoin',
    symbol: 'MEME',
    description: 'The next generation of community-driven digital assets',
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
    },
    social: {
      x: 'https://x.com/memecoin',
      telegram: 'https://t.me/memecoin',
      discord: 'https://discord.gg/memecoin',
    },
  },
  {
    id: '2',
    name: 'DoggyCoin',
    symbol: 'DOGE',
    description: 'The original meme coin with a loyal community',
    logo: '🐶',
    website: 'https://doggycoin.com',
    twitter: '@doggycoin',
    telegram: 't.me/doggycoin',
    marketCap: 800000,
    price: 0.0000008,
    totalSupply: 1000000000,
    liquidity: 600000,
    creator: '0xMockCreator456',
    createdAt: '2024-01-14T15:45:00Z',
    isLive: false,
    repRequired: 0,
    stats: {
      holders: 890,
      transactions: 8500,
      volume24h: 180000,
      priceChange24h: -5.2,
    },
    social: {
      x: 'https://x.com/doggycoin',
      telegram: 'https://t.me/doggycoin',
      discord: 'https://discord.gg/doggycoin',
    },
  },
  {
    id: '3',
    name: 'SpaceCoin',
    symbol: 'SPCE',
    description: 'Reaching for the stars in the crypto universe',
    logo: '🚀',
    website: 'https://spacecoin.com',
    twitter: '@spacecoin',
    telegram: 't.me/spacecoin',
    marketCap: 2500000,
    price: 0.0000025,
    totalSupply: 1000000000,
    liquidity: 2000000,
    creator: '0xMockCreator789',
    createdAt: '2024-01-13T08:20:00Z',
    isLive: true,
    repRequired: 100,
    stats: {
      holders: 2100,
      transactions: 25000,
      volume24h: 450000,
      priceChange24h: 25.8,
    },
    social: {
      x: 'https://x.com/spacecoin',
      telegram: 'https://t.me/spacecoin',
      discord: 'https://discord.gg/spacecoin',
    },
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Filter tokens based on search
    let filteredTokens = mockTokens
    if (search) {
      filteredTokens = mockTokens.filter(token =>
        token.name.toLowerCase().includes(search.toLowerCase()) ||
        token.symbol.toLowerCase().includes(search.toLowerCase()) ||
        token.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Filter by category
    if (category) {
      if (category === 'live') {
        filteredTokens = filteredTokens.filter(token => token.isLive)
      } else if (category === 'trending') {
        filteredTokens = filteredTokens.filter(token => token.stats.priceChange24h > 10)
      } else if (category === 'new') {
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
        filteredTokens = filteredTokens.filter(token => new Date(token.createdAt) > oneDayAgo)
      }
    }

    // Sort tokens
    filteredTokens.sort((a, b) => {
      let aValue, bValue
      switch (sortBy) {
        case 'marketCap':
          aValue = a.marketCap
          bValue = b.marketCap
          break
        case 'price':
          aValue = a.price
          bValue = b.price
          break
        case 'volume24h':
          aValue = a.stats.volume24h
          bValue = b.stats.volume24h
          break
        case 'createdAt':
        default:
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
      }

      if (sortOrder === 'asc') {
        return aValue - bValue
      } else {
        return bValue - aValue
      }
    })

    // Paginate results
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTokens = filteredTokens.slice(startIndex, endIndex)

    return NextResponse.json({
      success: true,
      data: {
        tokens: paginatedTokens,
        pagination: {
          page,
          limit,
          total: filteredTokens.length,
          totalPages: Math.ceil(filteredTokens.length / limit),
        },
      }
    })
  } catch (error) {
    console.error('Tokens fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tokens' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      symbol,
      description,
      website,
      twitter,
      telegram,
      totalSupply,
      initialPrice,
      liquidityPercentage,
      creatorPercentage,
      repGating,
      minRepRequired,
      antiBot,
      bondingCurve,
    } = body

    // Validate required fields
    if (!name || !symbol || !description) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Mock token creation
    const newToken = {
      id: `token_${Date.now()}`,
      name,
      symbol: symbol.toUpperCase(),
      description,
      logo: '🪙', // Default logo
      website,
      twitter,
      telegram,
      marketCap: 0,
      price: parseFloat(initialPrice) || 0.000001,
      totalSupply: parseInt(totalSupply) || 1000000000,
      liquidity: 0,
      creator: '0xMockCreator123', // In production, get from auth
      createdAt: new Date().toISOString(),
      isLive: false,
      repRequired: repGating ? parseInt(minRepRequired) || 0 : 0,
      stats: {
        holders: 0,
        transactions: 0,
        volume24h: 0,
        priceChange24h: 0,
      },
      social: {
        x: twitter ? `https://x.com/${twitter.replace('@', '')}` : '',
        telegram: telegram || '',
        discord: '',
      },
      settings: {
        antiBot: antiBot || false,
        bondingCurve: bondingCurve || true,
        liquidityPercentage: parseInt(liquidityPercentage) || 85,
        creatorPercentage: parseInt(creatorPercentage) || 5,
      },
    }

    // In production, this would save to database and deploy smart contract
    console.log('Creating token:', newToken)

    return NextResponse.json({
      success: true,
      data: newToken,
      message: 'Token created successfully'
    })
  } catch (error) {
    console.error('Token creation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create token' },
      { status: 500 }
    )
  }
}
