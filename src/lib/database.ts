import { PrismaClient } from '@prisma/client'

// Global Prisma client instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Database service class for common operations
export class DatabaseService {
  private static instance: DatabaseService
  private prisma: PrismaClient

  private constructor() {
    this.prisma = prisma
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService()
    }
    return DatabaseService.instance
  }

  // User operations
  async createUser(data: {
    walletAddress: string
    worldIdHash?: string
    verificationLevel?: string
  }) {
    return this.prisma.user.create({
      data: {
        walletAddress: data.walletAddress,
        worldIdHash: data.worldIdHash,
        verificationLevel: data.verificationLevel || 'device',
      },
    })
  }

  async getUser(walletAddress: string) {
    return this.prisma.user.findUnique({
      where: { walletAddress },
      include: {
        trades: true,
        tokens: true,
        reputationHistory: true,
      },
    })
  }

  async updateUser(walletAddress: string, data: any) {
    return this.prisma.user.update({
      where: { walletAddress },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })
  }

  // Token operations
  async createToken(data: {
    name: string
    ticker: string
    description: string
    logo?: string
    creatorId: string
  }) {
    return this.prisma.token.create({
      data: {
        name: data.name,
        ticker: data.ticker,
        description: data.description,
        logo: data.logo,
        creatorId: data.creatorId,
      },
    })
  }

  async getToken(id: string) {
    return this.prisma.token.findUnique({
      where: { id },
      include: {
        creator: true,
        trades: {
          orderBy: { timestamp: 'desc' },
          take: 50,
        },
      },
    })
  }

  async getTokens(limit = 20, offset = 0) {
    return this.prisma.token.findMany({
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      include: {
        creator: true,
        _count: {
          select: { trades: true },
        },
      },
    })
  }

  async updateToken(id: string, data: any) {
    return this.prisma.token.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })
  }

  // Trade operations
  async createTrade(data: {
    userId: string
    tokenId: string
    type: string
    amount: number
    tokenAmount: number
    price: number
  }) {
    return this.prisma.trade.create({
      data: {
        userId: data.userId,
        tokenId: data.tokenId,
        type: data.type,
        amount: data.amount,
        tokenAmount: data.tokenAmount,
        price: data.price,
      },
    })
  }

  async getTrades(userId?: string, tokenId?: string, limit = 50) {
    const where: any = {}
    if (userId) where.userId = userId
    if (tokenId) where.tokenId = tokenId

    return this.prisma.trade.findMany({
      where,
      take: limit,
      orderBy: { timestamp: 'desc' },
      include: {
        user: true,
        token: true,
      },
    })
  }

  // Reputation operations
  async getReputationHistory(userId: string) {
    return this.prisma.reputationHistory.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
    })
  }

  async createReputationHistory(data: {
    userId: string
    change: number
    reason: string
  }) {
    return this.prisma.reputationHistory.create({
      data: {
        userId: data.userId,
        change: data.change,
        reason: data.reason,
      },
    })
  }

  // Analytics operations
  async getTokenStats(tokenId: string) {
    const [totalTrades, totalVolume, uniqueTraders] = await Promise.all([
      this.prisma.trade.count({
        where: { tokenId },
      }),
      this.prisma.trade.aggregate({
        where: { tokenId },
        _sum: { amount: true },
      }),
      this.prisma.trade.groupBy({
        by: ['userId'],
        where: { tokenId },
      }),
    ])

    return {
      totalTrades,
      totalVolume: totalVolume._sum.amount || 0,
      uniqueTraders: uniqueTraders.length,
    }
  }

  async getUserStats(userId: string) {
    const [totalTrades, totalVolume, tokensTraded] = await Promise.all([
      this.prisma.trade.count({
        where: { userId },
      }),
      this.prisma.trade.aggregate({
        where: { userId },
        _sum: { amount: true },
      }),
      this.prisma.trade.groupBy({
        by: ['tokenId'],
        where: { userId },
      }),
    ])

    return {
      totalTrades,
      totalVolume: totalVolume._sum.amount || 0,
      tokensTraded: tokensTraded.length,
    }
  }
}

export default DatabaseService

