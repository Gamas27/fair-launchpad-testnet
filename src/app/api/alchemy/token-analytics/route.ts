import { NextRequest, NextResponse } from 'next/server'
import { getTokenAnalytics } from '@/lib/alchemy/tokenAnalytics'

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
    
    const analytics = await getTokenAnalytics(tokenAddress)
    
    return NextResponse.json({
      success: true,
      data: analytics
    })
  } catch (error) {
    console.error('Error fetching token analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch token analytics' },
      { status: 500 }
    )
  }
}
