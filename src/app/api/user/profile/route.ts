import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/config/database'
import { SecurityManager } from '@/lib/utils/security'
import { ErrorHandler } from '@/lib/utils/performance'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Rate limiting
    const identifier = request.ip || 'unknown'
    if (!SecurityManager.checkRateLimit(identifier, 20, 60000)) { // 20 requests per minute
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        tokens: true,
        trades: true,
        reputationHistory: {
          orderBy: { timestamp: 'desc' },
          take: 10,
        },
      }
    })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: user,
      message: 'User profile fetched successfully',
    })

  } catch (error) {
    ErrorHandler.logError(error as Error, 'user profile fetch')
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, ...updateData } = body

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Rate limiting
    const identifier = request.ip || 'unknown'
    if (!SecurityManager.checkRateLimit(identifier, 10, 60000)) { // 10 updates per minute
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    // Validate wallet address if provided
    if (updateData.walletAddress && !SecurityManager.validateWalletAddress(updateData.walletAddress)) {
      return NextResponse.json(
        { success: false, error: 'Invalid wallet address format' },
        { status: 400 }
      )
    }

    // Sanitize text inputs
    if (updateData.description) {
      updateData.description = SecurityManager.sanitizeInput(updateData.description)
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...updateData,
        updatedAt: new Date(),
      }
    })

    return NextResponse.json({
      success: true,
      data: user,
      message: 'User profile updated successfully',
    })

  } catch (error) {
    ErrorHandler.logError(error as Error, 'user profile update')
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}