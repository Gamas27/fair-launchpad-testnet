import { alchemy } from './alchemyClient'

// Token analytics interface
export interface TokenAnalytics {
  metadata: any
  balances: any
  transfers: any
  lastUpdated: Date
}

// Community metrics interface
export interface CommunityMetrics {
  holderCount: number
  transferCount: number
  tradingVolume: number
  communityActivity: number
}

// Get real-time token analytics
export const getTokenAnalytics = async (tokenAddress: string): Promise<TokenAnalytics> => {
  try {
    const tokenData = await alchemy.core.getTokenMetadata(tokenAddress)
    const tokenBalances = await alchemy.core.getTokenBalances(tokenAddress)
    const tokenTransfers = await alchemy.core.getTokenTransfers(tokenAddress)
    
    return {
      metadata: tokenData,
      balances: tokenBalances,
      transfers: tokenTransfers,
      lastUpdated: new Date()
    }
  } catch (error) {
    console.error('Error fetching token analytics:', error)
    throw new Error('Failed to fetch token analytics')
  }
}

// Get community engagement metrics
export const getCommunityMetrics = async (tokenAddress: string): Promise<CommunityMetrics> => {
  try {
    const holders = await alchemy.core.getTokenHolders(tokenAddress)
    const transfers = await alchemy.core.getTokenTransfers(tokenAddress)
    const volume = await alchemy.core.getTokenVolume(tokenAddress)
    
    return {
      holderCount: holders.length,
      transferCount: transfers.length,
      tradingVolume: volume,
      communityActivity: calculateActivityScore(transfers)
    }
  } catch (error) {
    console.error('Error fetching community metrics:', error)
    throw new Error('Failed to fetch community metrics')
  }
}

// Calculate community activity score
const calculateActivityScore = (transfers: any[]): number => {
  if (!transfers || transfers.length === 0) return 0
  
  // Simple activity score based on transfer frequency
  const recentTransfers = transfers.filter(transfer => {
    const transferTime = new Date(transfer.blockTimestamp)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    return transferTime > oneDayAgo
  })
  
  return Math.min(recentTransfers.length * 10, 100) // Cap at 100
}

// Get current token price
export const getCurrentPrice = async (tokenAddress: string): Promise<number> => {
  try {
    const tokenData = await alchemy.core.getTokenMetadata(tokenAddress)
    return tokenData?.price || 0
  } catch (error) {
    console.error('Error fetching current price:', error)
    return 0
  }
}

// Get trading volume
export const getTradingVolume = async (tokenAddress: string): Promise<number> => {
  try {
    const volume = await alchemy.core.getTokenVolume(tokenAddress)
    return volume || 0
  } catch (error) {
    console.error('Error fetching trading volume:', error)
    return 0
  }
}

// Get holder count
export const getHolderCount = async (tokenAddress: string): Promise<number> => {
  try {
    const holders = await alchemy.core.getTokenHolders(tokenAddress)
    return holders.length
  } catch (error) {
    console.error('Error fetching holder count:', error)
    return 0
  }
}
