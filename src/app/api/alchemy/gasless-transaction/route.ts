import { NextRequest, NextResponse } from 'next/server'
import { sponsorCommunityAction, checkGaslessEligibility } from '@/lib/alchemy/gaslessTransactions'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userAddress, action } = body
    
    if (!userAddress || !action) {
      return NextResponse.json(
        { error: 'User address and action are required' },
        { status: 400 }
      )
    }
    
    // Check if user qualifies for gas-less transaction
    const qualifies = await checkGaslessEligibility(userAddress)
    
    if (!qualifies) {
      return NextResponse.json(
        { error: 'User does not qualify for gas-less transaction' },
        { status: 403 }
      )
    }
    
    // Execute gas-less transaction
    const result = await sponsorCommunityAction(action)
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Gas-less transaction executed successfully'
    })
  } catch (error) {
    console.error('Error executing gas-less transaction:', error)
    return NextResponse.json(
      { error: 'Failed to execute gas-less transaction' },
      { status: 500 }
    )
  }
}
