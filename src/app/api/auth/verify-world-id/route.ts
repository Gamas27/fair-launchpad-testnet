import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/config/database'
import { WorldIdService } from '@/lib/services/world-id'
import { SecurityManager } from '@/lib/utils/security'
import { ErrorHandler } from '@/lib/utils/performance'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { worldIdHash, verificationLevel, proof } = body

    // Validate input
    if (!worldIdHash || !verificationLevel) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!SecurityManager.validateWorldIdHash(worldIdHash)) {
      return NextResponse.json(
        { success: false, error: 'Invalid World ID hash format' },
        { status: 400 }
      )
    }

    // Rate limiting
    const identifier = request.ip || 'unknown'
    if (!SecurityManager.checkRateLimit(identifier, 5, 60000)) { // 5 verifications per minute
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    // Verify World ID
    const worldIdService = WorldIdService.getInstance(process.env.NEXT_PUBLIC_WORLD_ID_API_KEY)
    const verification = await worldIdService.verifyWorldId(proof, verificationLevel)

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { worldIdHash }
    })

    if (user) {
      // Update existing user
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          verificationLevel,
          isWorldIdVerified: true,
          lastActivity: new Date(),
        }
      })
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          worldIdHash,
          verificationLevel,
          isWorldIdVerified: true,
          walletAddress: '', // Will be set when wallet is created
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: { user },
      message: 'World ID verified successfully',
    })

  } catch (error) {
    ErrorHandler.logError(error as Error, 'World ID verification')
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}