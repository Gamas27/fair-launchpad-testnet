// API Configuration and Base Functions
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export interface ApiResponse<T = any> {
  success: boolean
  data: T
  error?: string
  message?: string
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Base API client
export class ApiClient {
  private baseURL: string
  private defaultHeaders: Record<string, string>

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new ApiError(
          data.error || 'Request failed',
          response.status,
          data
        )
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError(
        error instanceof Error ? error.message : 'Network error',
        0
      )
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

// Global API client instance
export const apiClient = new ApiClient()

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    VERIFY_WORLD_ID: '/auth/verify-world-id',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  
  // User Management
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile',
    STATS: '/user/stats',
    SETTINGS: '/user/settings',
  },
  
  // Token Management
  TOKENS: {
    LIST: '/tokens',
    CREATE: '/tokens',
    GET: '/tokens/:id',
    UPDATE: '/tokens/:id',
    DELETE: '/tokens/:id',
    SEARCH: '/tokens/search',
    TRENDING: '/tokens/trending',
  },
  
  // Trading
  TRADING: {
    BUY: '/trading/buy',
    SELL: '/trading/sell',
    ORDERS: '/trading/orders',
    HISTORY: '/trading/history',
  },
  
  // Chat
  CHAT: {
    ROOMS: '/chat/rooms',
    MESSAGES: '/chat/messages',
    JOIN: '/chat/join',
    LEAVE: '/chat/leave',
  },
  
  // Analytics
  ANALYTICS: {
    TOKEN_STATS: '/analytics/token/:id',
    MARKET_DATA: '/analytics/market',
    USER_ACTIVITY: '/analytics/user',
  },
} as const

// Utility functions
export const buildUrl = (endpoint: string, params?: Record<string, string | number>): string => {
  let url = endpoint
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value))
    })
  }
  return url
}

export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}
