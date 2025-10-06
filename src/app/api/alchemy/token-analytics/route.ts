import { NextRequest, NextResponse } from 'next/server'
import { getTokenAnalytics } from '@/lib/alchemy/tokenAnalytics'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 API Route: Starting token analytics request')
    const { searchParams } = new URL(request.url)
    const tokenAddress = searchParams.get('tokenAddress')
    
    console.log('🔍 API Route: Token address:', tokenAddress)
    
    if (!tokenAddress) {
      return NextResponse.json(
        { error: 'Token address is required' },
        { status: 400 }
      )
    }
    
    console.log('🔍 API Route: Calling getTokenAnalytics...')
    const analytics = await getTokenAnalytics(tokenAddress)
    console.log('🔍 API Route: Analytics result:', analytics.success)
    
    return NextResponse.json({
      success: true,
      data: analytics
    })
  } catch (error) {
    console.error('❌ API Route Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch token analytics' },
      { status: 500 }
    )
  }
}
