import { NextRequest, NextResponse } from 'next/server'
import { getCommunityMetrics } from '@/lib/alchemy/tokenAnalytics'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tokenAddress = searchParams.get('tokenAddress')
    
    if (!tokenAddress) {
      return NextResponse.json(
        { error: 'Token address is required' },
        { status: 400 }
      )
    }
    
    const metrics = await getCommunityMetrics(tokenAddress)
    
    return NextResponse.json({
      success: true,
      data: metrics
    })
  } catch (error) {
    console.error('Error fetching community metrics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch community metrics' },
      { status: 500 }
    )
  }
}
