import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/config/database'
import { SecurityManager } from '@/lib/utils/security'
import { ErrorHandler } from '@/lib/utils/performance'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Rate limiting
    const identifier = request.ip || 'unknown'
    if (!SecurityManager.checkRateLimit(identifier, 20, 60000)) { // 20 requests per minute
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    const token = await prisma.token.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            walletAddress: true,
            reputationLevel: true,
            isWorldIdVerified: true,
          }
        },
        trades: {
          orderBy: { timestamp: 'desc' },
          take: 10,
          include: {
            user: {
              select: {
                id: true,
                walletAddress: true,
                reputationLevel: true,
              }
            }
          }
        }
      }
    })

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: token,
      message: 'Token fetched successfully',
    })

  } catch (error) {
    ErrorHandler.logError(error as Error, 'token fetch')
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
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

    // Rate limiting
    const identifier = request.ip || 'unknown'
    if (!SecurityManager.checkRateLimit(identifier, 10, 60000)) { // 10 updates per minute
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    // Sanitize inputs
    const sanitizedData = { ...body }
    if (sanitizedData.name) sanitizedData.name = SecurityManager.sanitizeInput(sanitizedData.name)
    if (sanitizedData.description) sanitizedData.description = SecurityManager.sanitizeInput(sanitizedData.description)
    if (sanitizedData.teamInfo) sanitizedData.teamInfo = SecurityManager.sanitizeInput(sanitizedData.teamInfo)

    const token = await prisma.token.update({
      where: { id },
      data: {
        ...sanitizedData,
        updatedAt: new Date(),
      },
      include: {
        creator: {
          select: {
            id: true,
            walletAddress: true,
            reputationLevel: true,
            isWorldIdVerified: true,
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: token,
      message: 'Token updated successfully',
    })

  } catch (error) {
    ErrorHandler.logError(error as Error, 'token update')
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
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

    // Rate limiting
    const identifier = request.ip || 'unknown'
    if (!SecurityManager.checkRateLimit(identifier, 5, 60000)) { // 5 deletions per minute
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      )
    }

    // Check if token exists and get creator info
    const token = await prisma.token.findUnique({
      where: { id },
      select: { creatorId: true }
    })

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token not found' },
        { status: 404 }
      )
    }

    // Delete token (cascade will handle related records)
    await prisma.token.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: `Token ${id} deleted successfully`,
    })

  } catch (error) {
    ErrorHandler.logError(error as Error, 'token deletion')
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}