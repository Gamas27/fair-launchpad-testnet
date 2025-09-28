import { NextResponse } from 'next/server'
import { prisma } from '@/lib/config/database'

export async function GET() {
  try {
    // Fetch all data from the database
    const [users, tokens, trades, chatRooms, chatMessages, reputationHistory] = await Promise.all([
      prisma.user.findMany({
        include: {
          tokens: true,
          trades: true,
          chatMessages: true,
          chatRooms: true,
          reputationHistory: true,
        }
      }),
      prisma.token.findMany({
        include: {
          creator: true,
          trades: true,
        }
      }),
      prisma.trade.findMany({
        include: {
          token: true,
          user: true,
        }
      }),
      prisma.chatRoom.findMany({
        include: {
          creator: true,
          messages: {
            take: 1,
            orderBy: { timestamp: 'desc' }
          }
        }
      }),
      prisma.chatMessage.findMany({
        include: {
          sender: true,
          room: true,
        },
        orderBy: { timestamp: 'desc' },
        take: 10
      }),
      prisma.reputationHistory.findMany({
        include: {
          user: true,
        },
        orderBy: { timestamp: 'desc' },
        take: 10
      })
    ])

    // Calculate stats
    const totalVolume = trades.reduce((sum, trade) => sum + trade.amount, 0)
    const totalUsers = users.length
    const totalTokens = tokens.length
    const totalTrades = trades.length
    const marketCap24h = tokens.reduce((sum, token) => sum + token.marketCap, 0)
    const volume24h = trades
      .filter(trade => {
        const tradeDate = new Date(trade.timestamp)
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        return tradeDate >= yesterday
      })
      .reduce((sum, trade) => sum + trade.amount, 0)

    const stats = {
      totalVolume,
      totalUsers,
      totalTokens,
      totalTrades,
      marketCap24h,
      volume24h,
    }

    return NextResponse.json({
      success: true,
      data: {
        users,
        tokens,
        trades,
        chatRooms,
        chatMessages,
        reputationHistory,
        stats,
      }
    })
  } catch (error) {
    console.error('Error fetching demo data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch demo data' },
      { status: 500 }
    )
  }
}
