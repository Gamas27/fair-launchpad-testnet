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
        createdTokens: true,
        reputationQuests: {
          include: {
            quest: true,
          },
        },
        achievements: {
          include: {
            achievement: true,
          },
        },
        antiManipulationLogs: true,
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
    address: string
    name: string
    symbol: string
    description: string
    imageUrl?: string
    creatorAddress: string
    initialPrice: number
    priceIncrement: number
    maxSupply: bigint
  }) {
    return this.prisma.token.create({
      data: {
        address: data.address,
        name: data.name,
        symbol: data.symbol,
        description: data.description,
        imageUrl: data.imageUrl,
        creatorAddress: data.creatorAddress,
        initialPrice: data.initialPrice,
        priceIncrement: data.priceIncrement,
        maxSupply: data.maxSupply,
        currentPrice: data.initialPrice,
      },
    })
  }

  async getToken(address: string) {
    return this.prisma.token.findUnique({
      where: { address },
      include: {
        creator: true,
        trades: {
          orderBy: { createdAt: 'desc' },
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

  async updateToken(address: string, data: any) {
    return this.prisma.token.update({
      where: { address },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })
  }

  // Trade operations
  async createTrade(data: {
    userAddress: string
    tokenAddress: string
    type: string
    amount: number
    price: number
    totalValue: number
    blockNumber?: bigint
    transactionHash?: string
    riskScore?: number
    isSuspicious?: boolean
    manipulationFlags?: string
  }) {
    return this.prisma.trade.create({
      data: {
        userAddress: data.userAddress,
        tokenAddress: data.tokenAddress,
        type: data.type,
        amount: data.amount,
        price: data.price,
        totalValue: data.totalValue,
        blockNumber: data.blockNumber,
        transactionHash: data.transactionHash,
        riskScore: data.riskScore || 0,
        isSuspicious: data.isSuspicious || false,
        manipulationFlags: data.manipulationFlags,
      },
    })
  }

  async getTrades(userAddress?: string, tokenAddress?: string, limit = 50) {
    const where: any = {}
    if (userAddress) where.userAddress = userAddress
    if (tokenAddress) where.tokenAddress = tokenAddress

    return this.prisma.trade.findMany({
      where,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        token: true,
      },
    })
  }

  // Reputation operations
  async getReputationQuests() {
    return this.prisma.reputationQuest.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
    })
  }

  async getUserReputationQuests(userAddress: string) {
    return this.prisma.userReputationQuest.findMany({
      where: { userAddress },
      include: {
        quest: true,
      },
    })
  }

  async updateUserReputationQuest(
    userAddress: string,
    questId: string,
    progress: number,
    isCompleted = false
  ) {
    return this.prisma.userReputationQuest.upsert({
      where: {
        userAddress_questId: {
          userAddress,
          questId,
        },
      },
      update: {
        progress,
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
        updatedAt: new Date(),
      },
      create: {
        userAddress,
        questId,
        progress,
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
      },
    })
  }

  // Achievement operations
  async getAchievements() {
    return this.prisma.achievement.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
    })
  }

  async getUserAchievements(userAddress: string) {
    return this.prisma.userAchievement.findMany({
      where: { userAddress },
      include: {
        achievement: true,
      },
    })
  }

  async createUserAchievement(userAddress: string, achievementId: string) {
    return this.prisma.userAchievement.create({
      data: {
        userAddress,
        achievementId,
      },
    })
  }

  // Anti-manipulation operations
  async createAntiManipulationLog(data: {
    userAddress: string
    activityType: string
    riskScore: number
    flags: string
    details?: string
  }) {
    return this.prisma.antiManipulationLog.create({
      data: {
        userAddress: data.userAddress,
        activityType: data.activityType,
        riskScore: data.riskScore,
        flags: data.flags,
        details: data.details,
      },
    })
  }

  async getAntiManipulationLogs(userAddress?: string, limit = 50) {
    const where: any = {}
    if (userAddress) where.userAddress = userAddress

    return this.prisma.antiManipulationLog.findMany({
      where,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
      },
    })
  }

  // Session operations
  async createSession(data: {
    userAddress: string
    sessionToken: string
    expiresAt: Date
  }) {
    return this.prisma.session.create({
      data: {
        userAddress: data.userAddress,
        sessionToken: data.sessionToken,
        expiresAt: data.expiresAt,
      },
    })
  }

  async getSession(sessionToken: string) {
    return this.prisma.session.findUnique({
      where: { sessionToken },
      include: {
        user: true,
      },
    })
  }

  async deleteSession(sessionToken: string) {
    return this.prisma.session.delete({
      where: { sessionToken },
    })
  }

  // Analytics operations
  async getTokenStats(tokenAddress: string) {
    const [totalTrades, totalVolume, uniqueTraders] = await Promise.all([
      this.prisma.trade.count({
        where: { tokenAddress },
      }),
      this.prisma.trade.aggregate({
        where: { tokenAddress },
        _sum: { totalValue: true },
      }),
      this.prisma.trade.groupBy({
        by: ['userAddress'],
        where: { tokenAddress },
      }),
    ])

    return {
      totalTrades,
      totalVolume: totalVolume._sum.totalValue || 0,
      uniqueTraders: uniqueTraders.length,
    }
  }

  async getUserStats(userAddress: string) {
    const [totalTrades, totalVolume, tokensTraded] = await Promise.all([
      this.prisma.trade.count({
        where: { userAddress },
      }),
      this.prisma.trade.aggregate({
        where: { userAddress },
        _sum: { totalValue: true },
      }),
      this.prisma.trade.groupBy({
        by: ['tokenAddress'],
        where: { userAddress },
      }),
    ])

    return {
      totalTrades,
      totalVolume: totalVolume._sum.totalValue || 0,
      tokensTraded: tokensTraded.length,
    }
  }
}

export default DatabaseService

