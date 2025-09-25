'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiService } from '@/services/apiService'
import { useWallet } from './useWallet'
import { useWorldId } from './useWorldId'

interface TradeSimulation {
  success: boolean
  tokensReceived: number
  newPrice: number
  priceImpact: number
  totalCost: number
  slippage: number
  gasEstimate: number
}

interface TradeExecution {
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
}

interface TradeHistoryItem {
  id: string
  type: 'buy' | 'sell'
  amount: number
  price: number
  totalValue: number
  blockNumber: string | null
  transactionHash: string | null
  riskScore: number
  isSuspicious: boolean
  createdAt: string
  token: {
    address: string
    name: string
    symbol: string
    imageUrl: string | null
  } | null
}

interface AntiManipulationStatus {
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
}

export function useTradingApi(tokenAddress?: string) {
  const { address, isConnected } = useWallet()
  const { isVerified, verificationLevel } = useWorldId()
  
  const [tradeHistory, setTradeHistory] = useState<TradeHistoryItem[]>([])
  const [antiManipulationStatus, setAntiManipulationStatus] = useState<AntiManipulationStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTradeHistory = useCallback(async (params?: {
    tokenAddress?: string
    type?: 'buy' | 'sell'
    limit?: number
    offset?: number
  }) => {
    if (!isConnected || !address) return

    try {
      setIsLoading(true)
      setError(null)
      
      const response = await apiService.getTradingHistory({
        ...params,
        tokenAddress: params?.tokenAddress || tokenAddress
      })
      
      setTradeHistory(response.items)
    } catch (err) {
      console.error('Failed to fetch trade history:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch trade history')
    } finally {
      setIsLoading(false)
    }
  }, [isConnected, address, tokenAddress])

  const fetchAntiManipulationStatus = useCallback(async () => {
    if (!isConnected || !address) return

    try {
      setError(null)
      
      const response = await apiService.getAntiManipulationStatus()
      setAntiManipulationStatus(response)
    } catch (err) {
      console.error('Failed to fetch anti-manipulation status:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch anti-manipulation status')
    }
  }, [isConnected, address])

  const simulateTrade = useCallback(async (
    type: 'buy' | 'sell',
    amount: number
  ): Promise<TradeSimulation | null> => {
    if (!isConnected || !address || !tokenAddress) {
      setError('Wallet not connected or token address missing')
      return null
    }

    try {
      setError(null)
      
      const response = await apiService.simulateTrade({
        tokenAddress,
        type,
        amount,
        userAddress: address
      })
      
      return response
    } catch (err) {
      console.error('Trade simulation failed:', err)
      setError(err instanceof Error ? err.message : 'Trade simulation failed')
      return null
    }
  }, [isConnected, address, tokenAddress])

  const executeTrade = useCallback(async (
    type: 'buy' | 'sell',
    amount: number,
    maxSlippage = 5
  ): Promise<TradeExecution | null> => {
    if (!isConnected || !address || !tokenAddress) {
      setError('Wallet not connected or token address missing')
      return null
    }

    if (!isVerified) {
      setError('World ID verification required to trade')
      return null
    }

    try {
      setIsLoading(true)
      setError(null)
      
      const response = await apiService.executeTrade({
        tokenAddress,
        type,
        amount,
        maxSlippage
      })
      
      // Refresh data after successful trade
      await Promise.all([
        fetchTradeHistory(),
        fetchAntiManipulationStatus()
      ])
      
      return response
    } catch (err) {
      console.error('Trade execution failed:', err)
      setError(err instanceof Error ? err.message : 'Trade execution failed')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [isConnected, address, tokenAddress, isVerified, fetchTradeHistory, fetchAntiManipulationStatus])

  const analyzeTrade = useCallback(async (
    type: 'buy' | 'sell',
    amount: number,
    price: number
  ) => {
    if (!isConnected || !address || !tokenAddress) {
      setError('Wallet not connected or token address missing')
      return null
    }

    try {
      setError(null)
      
      const response = await apiService.analyzeTrade({
        tokenAddress,
        type,
        amount,
        price,
        totalValue: amount * price
      })
      
      return response
    } catch (err) {
      console.error('Trade analysis failed:', err)
      setError(err instanceof Error ? err.message : 'Trade analysis failed')
      return null
    }
  }, [isConnected, address, tokenAddress])

  const refreshData = useCallback(() => {
    if (isConnected && address) {
      fetchTradeHistory()
      fetchAntiManipulationStatus()
    }
  }, [isConnected, address, fetchTradeHistory, fetchAntiManipulationStatus])

  useEffect(() => {
    if (isConnected && address) {
      fetchTradeHistory()
      fetchAntiManipulationStatus()
    }
  }, [isConnected, address, fetchTradeHistory, fetchAntiManipulationStatus])

  return {
    // Data
    tradeHistory,
    antiManipulationStatus,
    
    // State
    isLoading,
    error,
    
    // Actions
    simulateTrade,
    executeTrade,
    analyzeTrade,
    fetchTradeHistory,
    fetchAntiManipulationStatus,
    refreshData,
    
    // Computed values
    canTrade: isConnected && isVerified && !antiManipulationStatus?.user.isBanned,
    riskLevel: antiManipulationStatus?.user.riskLevel || 'low',
    riskScore: antiManipulationStatus?.user.riskScore || 0,
    isFlagged: antiManipulationStatus?.user.isFlagged || false,
    isBanned: antiManipulationStatus?.user.isBanned || false,
    reputationScore: antiManipulationStatus?.user.reputationScore || 0,
    reputationLevel: antiManipulationStatus?.user.reputationLevel || 'Bronze',
    totalTrades: antiManipulationStatus?.user.totalTrades || 0,
    totalVolume: antiManipulationStatus?.user.totalVolume || 0,
    
    // Trade history helpers
    recentTrades: tradeHistory.slice(0, 10),
    buyTrades: tradeHistory?.filter(trade => trade.type === 'buy') || [],
    sellTrades: tradeHistory?.filter(trade => trade.type === 'sell') || [],
    suspiciousTrades: tradeHistory?.filter(trade => trade.isSuspicious) || [],
    
    // Risk analysis
    riskFactors: antiManipulationStatus?.riskAnalysis.factors || {
      highVolume: false,
      frequentTrading: false,
      imbalancedTrading: false,
      recentActivity: false
    },
    recommendations: antiManipulationStatus?.riskAnalysis.recommendations || [],
  }
}
