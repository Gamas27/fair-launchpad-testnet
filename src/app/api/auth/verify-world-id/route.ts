import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { worldIdHash, verificationLevel } = body

    // Validate required fields
    if (!worldIdHash || !verificationLevel) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Mock World ID verification
    // In production, this would integrate with World ID API
    const isValidVerification = verificationLevel === 'orb' || verificationLevel === 'device'
    
    if (!isValidVerification) {
      return NextResponse.json(
        { success: false, error: 'Invalid verification level' },
        { status: 400 }
      )
    }

    // Mock user creation/update
    const user = {
      id: `user_${Date.now()}`,
      worldIdHash,
      verificationLevel,
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Mock session creation
    const session = {
      id: `session_${Date.now()}`,
      userId: user.id,
      token: `token_${Math.random().toString(36).substring(2)}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    }

    return NextResponse.json({
      success: true,
      data: {
        user,
        session,
        message: 'World ID verification successful'
      }
    })

  } catch (error) {
    console.error('World ID verification error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
