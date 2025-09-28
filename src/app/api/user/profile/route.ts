import { NextRequest, NextResponse } from 'next/server'

// Mock user data
const mockUser = {
  id: 'user_123',
  username: '@CryptoTrader',
  displayName: 'Crypto Trader',
  bio: 'Passionate about DeFi and token launches',
  avatar: '🚀',
  verified: true,
  repScore: 1250,
  joinDate: '2024-01-15',
  walletAddress: '0xMockPrivyWallet1234567890',
  stats: {
    tokensCreated: 15,
    tokensGraduated: 8,
    followers: 2500,
    following: 150,
    totalVolume: 125000,
    totalTrades: 450,
  },
  preferences: {
    theme: 'dark',
    language: 'en',
    currency: 'SOL',
    notifications: {
      push: true,
      email: true,
      trading: true,
      social: true,
    },
    privacy: {
      profilePublic: true,
      showRep: true,
      showHoldings: true,
    },
  },
  security: {
    twoFactor: false,
    biometric: true,
    sessionTimeout: 30,
    autoLock: true,
  },
  wallet: {
    primary: '0xMockPrivyWallet1234567890',
    autoConnect: true,
    gasOptimization: true,
    slippageTolerance: 0.5,
  },
}

export async function GET(request: NextRequest) {
  try {
    // In production, this would fetch from database
    return NextResponse.json({
      success: true,
      data: mockUser
    })
  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch profile' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // In production, this would update the database
    const updatedUser = {
      ...mockUser,
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: 'Profile updated successfully'
    })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update profile' },
      { status: 500 }
    )
  }
}
