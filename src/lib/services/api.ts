// API Service Functions for Frontend-Backend Integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? '' : 'http://localhost:3000')

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface User {
  id: string
  walletAddress: string
  worldIdHash: string
  verificationLevel: 'Device' | 'Phone' | 'Orb'
  reputationScore: number
  reputationLevel: string
  totalTrades: number
  totalVolume: number
  isWorldIdVerified: boolean
  isWalletConnected: boolean
  walletCreatedAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface Token {
  id: string
  name: string
  ticker: string
  logo?: string
  description?: string
  marketCap: number
  volume: number
  price: number
  change24h: number
  isLive: boolean
  creator: User
  createdAt: string
}

export interface ChatRoom {
  id: string
  name: string
  type: string
  description?: string
  membersCount: number
  onlineCount: number
  lastMessage?: string
  lastMessageTime?: string
  creator: User
}

// Authentication Services
export const authService = {
  async verifyWorldId(worldIdHash: string, verificationLevel: string, proof?: any): Promise<ApiResponse<{user: User}>> {
    try {
      const url = `${API_BASE_URL}/api/auth/verify-world-id`
      console.log('🔐 Frontend: Starting World ID verification...')
      console.log('🔐 Frontend: API_BASE_URL:', API_BASE_URL)
      console.log('🔐 Frontend: Full URL:', url)
      console.log('🔐 Frontend: Request data:', { worldIdHash, verificationLevel })
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          worldIdHash,
          verificationLevel,
          proof
        })
      })

      console.log('🔐 Frontend: Response status:', response.status)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('🔐 Frontend: Response data:', data)
      return data
    } catch (error) {
      console.error('World ID verification failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error during verification'
      }
    }
  }
}

// User Services
export const userService = {
  async getProfile(userId: string): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/profile?userId=${userId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      return {
        success: false,
        error: 'Failed to fetch user profile'
      }
    }
  },

  async updateProfile(userId: string, updates: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, ...updates })
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to update user profile:', error)
      return {
        success: false,
        error: 'Failed to update user profile'
      }
    }
  }
}

// Token Services
export const tokenService = {
  async getTokens(filters?: {
    sortBy?: string
    order?: 'asc' | 'desc'
    limit?: number
    offset?: number
  }): Promise<ApiResponse<Token[]>> {
    try {
      const params = new URLSearchParams()
      if (filters?.sortBy) params.append('sortBy', filters.sortBy)
      if (filters?.order) params.append('order', filters.order)
      if (filters?.limit) params.append('limit', filters.limit.toString())
      if (filters?.offset) params.append('offset', filters.offset.toString())

      const response = await fetch(`${API_BASE_URL}/api/tokens?${params}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to fetch tokens:', error)
      return {
        success: false,
        error: 'Failed to fetch tokens'
      }
    }
  },

  async getTokenById(tokenId: string): Promise<ApiResponse<Token>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tokens/${tokenId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to fetch token:', error)
      return {
        success: false,
        error: 'Failed to fetch token'
      }
    }
  },

  async createToken(tokenData: {
    name: string
    ticker: string
    description: string
    logo?: string
    socialLinks?: string
  }): Promise<ApiResponse<Token>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tokenData)
      })

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to create token:', error)
      return {
        success: false,
        error: 'Failed to create token'
      }
    }
  }
}

// Chat Services
export const chatService = {
  async getRooms(type?: string): Promise<ApiResponse<ChatRoom[]>> {
    try {
      const params = new URLSearchParams()
      if (type) params.append('type', type)

      const response = await fetch(`${API_BASE_URL}/api/chat/rooms?${params}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to fetch chat rooms:', error)
      return {
        success: false,
        error: 'Failed to fetch chat rooms'
      }
    }
  },

  async getMessages(roomId: string, limit?: number): Promise<ApiResponse<any[]>> {
    try {
      const params = new URLSearchParams()
      if (limit) params.append('limit', limit.toString())

      const response = await fetch(`${API_BASE_URL}/api/chat/messages?roomId=${roomId}&${params}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Failed to fetch messages:', error)
      return {
        success: false,
        error: 'Failed to fetch messages'
      }
    }
  }
}

// Health Check
export const healthService = {
  async checkHealth(): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Health check failed:', error)
      return {
        success: false,
        error: 'Health check failed'
      }
    }
  }
}
