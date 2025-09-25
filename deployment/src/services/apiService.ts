import { 
  User, 
  Token, 
  Trade, 
  ReputationQuest, 
  Achievement,
  AntiManipulationLog 
} from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

class ApiService {
  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    }

    // Add auth token if available
    const token = localStorage.getItem('sessionToken')
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data.data || data
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // Authentication & User Management
  async verifyWorldId(data: {
    walletAddress: string
    worldIdHash: string
    verificationLevel: 'device' | 'document' | 'orb'
    proof?: any
  }) {
    return this.request<{
      user: User
      sessionToken: string
    }>('/auth/verify-world-id', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getUserProfile() {
    return this.request<User>('/user/profile')
  }

  async updateUserProfile(data: Partial<User>) {
    return this.request<User>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async getUserReputation() {
    return this.request<{
      reputation: {
        score: number
        level: string
        xp: number
        totalTrades: number
        totalVolume: number
        riskScore: number
        isBanned: boolean
      }
      quests: Array<{
        id: string
        quest: string
        progress: number
        isCompleted: boolean
        completedAt: string | null
      }>
      achievements: Array<{
        id: string
        achievement: string
        unlockedAt: string | null
      }>
      stats: any
    }>('/user/reputation')
  }

  // Token Management
  async getTokens(params?: {
    status?: 'launching' | 'active' | 'completed' | 'failed'
    creator?: string
    limit?: number
    offset?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    
    const queryString = searchParams.toString()
    return this.request<{
      items: Token[]
      total: number
      limit: number
      offset: number
    }>(`/tokens${queryString ? `?${queryString}` : ''}`)
  }

  async getToken(address: string) {
    return this.request<Token>(`/tokens/${address}`)
  }

  async getTokenTrades(address: string, params?: {
    type?: 'buy' | 'sell'
    limit?: number
    offset?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    
    const queryString = searchParams.toString()
    return this.request<{
      items: Trade[]
      total: number
      limit: number
      offset: number
    }>(`/tokens/${address}/trades${queryString ? `?${queryString}` : ''}`)
  }

  // Trading
  async simulateTrade(data: {
    tokenAddress: string
    type: 'buy' | 'sell'
    amount: number
    userAddress: string
  }) {
    return this.request<{
      success: boolean
      tokensReceived: number
      newPrice: number
      priceImpact: number
      totalCost: number
      slippage: number
      gasEstimate: number
    }>('/trading/simulate', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async executeTrade(data: {
    tokenAddress: string
    type: 'buy' | 'sell'
    amount: number
    maxSlippage?: number
  }) {
    return this.request<{
      trade: {
        id: string
        type: string
        amount: number
        price: number
        totalValue: number
        transactionHash: string
        blockNumber: string
        createdAt: string
      }
      execution: {
        success: boolean
        transactionHash: string
        blockNumber: number
        gasUsed: number
        effectivePrice: number
        slippage: number
      }
      userStats: {
        usedAllocation: number
        remainingAllocation: number
        totalTrades: number
        totalVolume: number
      }
    }>('/trading/execute', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getTradingHistory(params?: {
    tokenAddress?: string
    type?: 'buy' | 'sell'
    limit?: number
    offset?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    
    const queryString = searchParams.toString()
    return this.request<{
      items: Array<Trade & { token: Token | null }>
      total: number
      limit: number
      offset: number
    }>(`/trading/history${queryString ? `?${queryString}` : ''}`)
  }

  // Anti-Manipulation
  async getAntiManipulationStatus() {
    return this.request<{
      user: {
        walletAddress: string
        riskScore: number
        riskLevel: 'low' | 'medium' | 'high'
        isFlagged: boolean
        isBanned: boolean
        reputationScore: number
        reputationLevel: string
        totalTrades: number
        totalVolume: number
        lastActivity: string
      }
      riskAnalysis: {
        riskScore: number
        riskLevel: string
        factors: {
          highVolume: boolean
          frequentTrading: boolean
          imbalancedTrading: boolean
          recentActivity: boolean
        }
        recommendations: string[]
      }
      recentActivity: {
        tradeCount: number
        avgTradeSize: number
        buySellRatio: number
        lastTradeDate: string | null
      }
      logs: Array<{
        id: string
        activityType: string
        riskScore: number
        flags: string[]
        details: string
        isResolved: boolean
        createdAt: string
      }>
    }>('/anti-manipulation/status')
  }

  async analyzeTrade(data: {
    tokenAddress: string
    type: 'buy' | 'sell'
    amount: number
    price: number
    totalValue: number
  }) {
    return this.request<{
      analysis: {
        riskScore: number
        riskLevel: 'low' | 'medium' | 'high'
        isSuspicious: boolean
        factors: string[]
        recommendations: string[]
      }
      trade: {
        tokenAddress: string
        type: string
        amount: number
        price: number
        totalValue: number
      }
      context: {
        userAvgTrade: number
        recentTradeCount: number
        priceDeviation: number
        userReputation: number
        recentSuspiciousTrades: number
      }
    }>('/anti-manipulation/analyze', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getAntiManipulationLogs(params?: {
    activityType?: string
    isResolved?: boolean
    limit?: number
    offset?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    
    const queryString = searchParams.toString()
    return this.request<{
      items: AntiManipulationLog[]
      total: number
      limit: number
      offset: number
    }>(`/anti-manipulation/logs${queryString ? `?${queryString}` : ''}`)
  }

  // Reputation System
  async getReputationQuests() {
    return this.request<{
      items: ReputationQuest[]
      total: number
    }>('/reputation/quests')
  }

  async completeQuest(data: {
    questId: string
    progress?: number
  }) {
    return this.request<{
      quest: {
        id: string
        title: string
        description: string
        type: string
        targetValue: number
        reward: number
      }
      progress: {
        current: number
        target: number
        percentage: number
        isCompleted: boolean
        xpAwarded: number
      }
      userQuest: {
        id: string
        progress: number
        isCompleted: boolean
        completedAt: string | null
      }
    }>('/reputation/complete-quest', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getAchievements(params?: {
    rarity?: 'common' | 'rare' | 'epic' | 'legendary'
    unlocked?: boolean
    limit?: number
    offset?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    
    const queryString = searchParams.toString()
    return this.request<{
      achievements: {
        items: Array<{
          id: string
          title: string
          description: string
          icon: string
          rarity: string
          requirements: any
          reward: number
          isUnlocked: boolean
          unlockedAt: string | null
        }>
        total: number
        limit: number
        offset: number
      }
      summary: {
        total: number
        unlocked: number
        locked: number
        byRarity: {
          common: number
          rare: number
          epic: number
          legendary: number
        }
        unlockedByRarity: {
          common: number
          rare: number
          epic: number
          legendary: number
        }
      }
    }>(`/reputation/achievements${queryString ? `?${queryString}` : ''}`)
  }
}

export const apiService = new ApiService()



