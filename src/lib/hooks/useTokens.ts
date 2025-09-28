import { useState, useEffect } from 'react'
import { apiClient, API_ENDPOINTS, buildUrl } from '../api'

export interface Token {
  id: string
  name: string
  symbol: string
  description: string
  logo: string
  website?: string
  twitter?: string
  telegram?: string
  marketCap: number
  price: number
  totalSupply: number
  liquidity: number
  creator: string
  createdAt: string
  isLive: boolean
  repRequired: number
  stats: {
    holders: number
    transactions: number
    volume24h: number
    priceChange24h: number
    ath?: number
    atl?: number
  }
  social: {
    x: string
    telegram: string
    discord: string
  }
  gradu8Story?: string
  teamInfo?: string
  repBreakdown?: {
    verified: number
    anon: number
    flagged: number
  }
  recentActivity?: Array<{
    id: string
    type: string
    user: string
    amount: string
    tokenAmount: string
    time: string
  }>
  priceHistory?: Array<{
    time: string
    price: number
  }>
}

export interface TokenFilters {
  search?: string
  category?: string
  sortBy?: string
  sortOrder?: string
  page?: number
  limit?: number
}

export interface TokensResponse {
  tokens: Token[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export function useTokens(filters: TokenFilters = {}) {
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  const fetchTokens = async (newFilters?: TokenFilters) => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams()
      Object.entries({ ...filters, ...newFilters }).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value))
        }
      })

      const response = await apiClient.get(`${buildUrl(API_ENDPOINTS.TOKENS.LIST)}?${params}`)
      
      if (response.success) {
        const tokensData = response.data as TokensResponse
        setTokens(tokensData.tokens)
        setPagination(tokensData.pagination)
        return { success: true, data: response.data }
      } else {
        throw new Error(response.error || 'Failed to fetch tokens')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tokens'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const fetchToken = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiClient.get(buildUrl(API_ENDPOINTS.TOKENS.GET, { id }))
      
      if (response.success) {
        const tokenData = response.data as Token
        return { success: true, data: tokenData }
      } else {
        throw new Error(response.error || 'Failed to fetch token')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch token'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const createToken = async (tokenData: Partial<Token>) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiClient.post(buildUrl(API_ENDPOINTS.TOKENS.CREATE), tokenData)
      
      if (response.success) {
        // Refresh tokens list
        await fetchTokens()
        const tokenData = response.data as Token
        return { success: true, data: tokenData }
      } else {
        throw new Error(response.error || 'Failed to create token')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create token'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const updateToken = async (id: string, tokenData: Partial<Token>) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiClient.put(buildUrl(API_ENDPOINTS.TOKENS.UPDATE, { id }), tokenData)
      
      if (response.success) {
        // Update token in list
        const tokenData = response.data as Token
        setTokens(prev => prev.map(token => token.id === id ? tokenData : token))
        return { success: true, data: tokenData }
      } else {
        throw new Error(response.error || 'Failed to update token')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update token'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const deleteToken = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await apiClient.delete(buildUrl(API_ENDPOINTS.TOKENS.DELETE, { id }))
      
      if (response.success) {
        // Remove token from list
        setTokens(prev => prev.filter(token => token.id !== id))
        return { success: true }
      } else {
        throw new Error(response.error || 'Failed to delete token')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete token'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Fetch tokens on mount and when filters change
  useEffect(() => {
    fetchTokens()
  }, [filters.search, filters.category, filters.sortBy, filters.sortOrder])

  return {
    tokens,
    loading,
    error,
    pagination,
    fetchTokens,
    fetchToken,
    createToken,
    updateToken,
    deleteToken,
  }
}
