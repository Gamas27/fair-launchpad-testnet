'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiService } from '@/services/apiService'
import { Token, Trade } from '@/types'

interface TokenListResponse {
  items: Token[]
  total: number
  limit: number
  offset: number
}

interface TokenTradesResponse {
  items: Trade[]
  total: number
  limit: number
  offset: number
}

export function useTokens() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTokens = useCallback(async (params?: {
    status?: 'launching' | 'active' | 'completed' | 'failed'
    creator?: string
    limit?: number
    offset?: number
  }) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await apiService.getTokens(params)
      setTokens(response?.items || [])
      
      return response
    } catch (err) {
      console.error('Failed to fetch tokens:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch tokens')
      setTokens([]) // Ensure tokens is always an array
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const refreshTokens = useCallback(() => {
    fetchTokens()
  }, [fetchTokens])

  useEffect(() => {
    fetchTokens()
  }, [fetchTokens])

  return {
    tokens,
    isLoading,
    error,
    fetchTokens,
    refreshTokens,
    
    // Computed values
    activeTokens: tokens?.filter(token => token.status === 'active') || [],
    launchingTokens: tokens?.filter(token => token.status === 'launching') || [],
    completedTokens: tokens?.filter(token => token.status === 'completed') || [],
    failedTokens: tokens?.filter(token => token.status === 'failed') || [],
  }
}

export function useToken(address: string) {
  const [token, setToken] = useState<Token | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchToken = useCallback(async () => {
    if (!address) return

    try {
      setIsLoading(true)
      setError(null)
      
      const response = await apiService.getToken(address)
      setToken(response)
    } catch (err) {
      console.error('Failed to fetch token:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch token')
    } finally {
      setIsLoading(false)
    }
  }, [address])

  const refreshToken = useCallback(() => {
    fetchToken()
  }, [fetchToken])

  useEffect(() => {
    fetchToken()
  }, [fetchToken])

  return {
    token,
    isLoading,
    error,
    fetchToken,
    refreshToken,
  }
}

export function useTokenTrades(tokenAddress: string) {
  const [trades, setTrades] = useState<Trade[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTokenTrades = useCallback(async (params?: {
    type?: 'buy' | 'sell'
    limit?: number
    offset?: number
  }) => {
    if (!tokenAddress) return

    try {
      setIsLoading(true)
      setError(null)
      
      const response = await apiService.getTokenTrades(tokenAddress, params)
      setTrades(response.items)
      
      return response
    } catch (err) {
      console.error('Failed to fetch token trades:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch token trades')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [tokenAddress])

  const refreshTrades = useCallback(() => {
    fetchTokenTrades()
  }, [fetchTokenTrades])

  useEffect(() => {
    fetchTokenTrades()
  }, [fetchTokenTrades])

  return {
    trades,
    isLoading,
    error,
    fetchTokenTrades,
    refreshTrades,
    
    // Computed values
    recentTrades: trades.slice(0, 10),
    buyTrades: trades?.filter(trade => trade.type === 'buy') || [],
    sellTrades: trades?.filter(trade => trade.type === 'sell') || [],
    totalVolume: trades.reduce((sum, trade) => sum + trade.totalValue, 0),
    averageTradeSize: trades.length > 0 ? trades.reduce((sum, trade) => sum + trade.totalValue, 0) / trades.length : 0,
  }
}
