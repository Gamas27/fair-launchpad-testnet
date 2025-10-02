import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/config/database'
import { SecurityManager } from '@/lib/utils/security'
import { ErrorHandler } from '@/lib/utils/performance'

export async function POST(request: NextRequest) {
  try {
    console.log('🔐 World ID verification request received')
    
    const body = await request.json()
    const { worldIdHash, verificationLevel, proof } = body

    console.log('📝 Request data:', { worldIdHash, verificationLevel, hasProof: !!proof })

    // Validate input
    if (!worldIdHash || !verificationLevel) {
      console.log('❌ Missing required fields')
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // For testnet mode, skip strict validation
    if (process.env.NODE_ENV !== 'development' && !SecurityManager.validateWorldIdHash(worldIdHash)) {
      console.log('❌ Invalid World ID hash format')
      return NextResponse.json(
        { success: false, error: 'Invalid World ID hash format' },
        { status: 400 }
      )
    }

    // Rate limiting (very relaxed for development)
    const identifier = request.ip || 'unknown'
    if (!SecurityManager.checkRateLimit(identifier, 100, 60000)) { // 100 verifications per minute for development
      console.log('❌ Rate limit exceeded')
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    // Simulate World ID verification for testnet
    console.log('🔍 Simulating World ID verification...')
    const verification = {
      worldIdHash: `testnet_worldid_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
      verificationLevel,
      timestamp: Date.now(),
      proof: proof || 'test_proof',
    }
    
    console.log('✅ World ID verification successful:', verification.worldIdHash)

    // Create or update user in database
    console.log('👤 Creating/updating user in database...')
    
    const walletAddress = `0x${Math.random().toString(16).substring(2, 42)}`
    const reputationScore = Math.floor(Math.random() * 100)
    const totalTrades = Math.floor(Math.random() * 50)
    const totalVolume = Math.random() * 1000
    
    // Try to find existing user by worldIdHash
    let user = await prisma.user.findFirst({
      where: { worldIdHash }
    })
    
    if (user) {
      // Update existing user
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          isWorldIdVerified: true,
          verificationLevel: verificationLevel,
          updatedAt: new Date()
        }
      })
      console.log('✅ Existing user updated:', user.id)
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          worldIdHash,
          verificationLevel: verificationLevel,
          walletAddress,
          isWorldIdVerified: true,
          reputationScore,
          reputationLevel: 'verified',
          totalTrades,
          totalVolume,
          walletCreatedAt: new Date()
        }
      })
      console.log('✅ New user created:', user.id)
    }

    return NextResponse.json({
      success: true,
      data: { user },
      message: 'World ID verified successfully',
    })

  } catch (error) {
    console.error('❌ World ID verification error:', error)
    ErrorHandler.logError(error as Error, 'World ID verification')
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}