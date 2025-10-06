import { withRateLimit } from './rateLimiter'

// Production-ready interfaces
export interface TokenAnalytics {
  metadata: {
    name: string
    symbol: string
    decimals: number
    price?: number
  }
  balances: any[]
  transfers: any[]
  lastUpdated: Date
  success: boolean
  error?: string
}

export interface CommunityMetrics {
  holderCount: number
  transferCount: number
  tradingVolume: number
  communityActivity: number
  success: boolean
  error?: string
}

// Production-ready retry mechanism with exponential backoff
const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      if (attempt === maxRetries) {
        throw error
      }
      const delay = baseDelay * Math.pow(2, attempt - 1)
      console.warn(`Alchemy API attempt ${attempt} failed, retrying in ${delay}ms...`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  throw new Error('Max retries exceeded')
}

// Production-ready token analytics with proper error handling
export const getTokenAnalytics = async (tokenAddress: string): Promise<TokenAnalytics> => {
  try {
    // Validate token address format
    if (!tokenAddress || !tokenAddress.startsWith('0x') || tokenAddress.length !== 42) {
      throw new Error('Invalid token address format')
    }

    console.log(`🔍 Fetching token analytics for: ${tokenAddress}`)

    // Use raw HTTP requests for better compatibility
    const apiKey = process.env.ALCHEMY_API_KEY || ''
    const baseUrl = 'https://eth-mainnet.g.alchemy.com/v2'
    
    // Use retry mechanism with rate limiting for production reliability
    const [tokenData, tokenTransfers] = await Promise.all([
      retryWithBackoff(() => withRateLimit(async () => {
        const response = await fetch(`${baseUrl}/${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'alchemy_getTokenMetadata',
            params: [tokenAddress],
            id: 1
          })
        })
        const data = await response.json()
        if (data.error) throw new Error(data.error.message)
        return data.result
      }, 'getTokenMetadata')),
      retryWithBackoff(() => withRateLimit(async () => {
        const response = await fetch(`${baseUrl}/${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'alchemy_getAssetTransfers',
            params: [{
              fromBlock: '0x0',
              toBlock: 'latest',
              contractAddresses: [tokenAddress],
              category: ['erc20']
            }],
            id: 2
          })
        })
        const data = await response.json()
        if (data.error) throw new Error(data.error.message)
        return data.result
      }, 'getAssetTransfers'))
    ])
    
    console.log(`✅ Successfully fetched token analytics for: ${tokenAddress}`)
    
    return {
      metadata: {
        name: tokenData.name || 'Unknown Token',
        symbol: tokenData.symbol || 'UNKNOWN',
        decimals: tokenData.decimals || 18,
        price: tokenData.price || 0
      },
      balances: [],
      transfers: tokenTransfers.transfers || [],
      lastUpdated: new Date(),
      success: true
    }
  } catch (error) {
    console.error('❌ Error fetching token analytics:', error)
    
    return {
      metadata: {
        name: 'Error Token',
        symbol: 'ERROR',
        decimals: 18,
        price: 0
      },
      balances: [],
      transfers: [],
      lastUpdated: new Date(),
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Production-ready community metrics with proper error handling
export const getCommunityMetrics = async (tokenAddress: string): Promise<CommunityMetrics> => {
  try {
    // Validate token address format
    if (!tokenAddress || !tokenAddress.startsWith('0x') || tokenAddress.length !== 42) {
      throw new Error('Invalid token address format')
    }

    console.log(`🔍 Fetching community metrics for: ${tokenAddress}`)

    // Use raw HTTP requests for better compatibility
    const apiKey = process.env.ALCHEMY_API_KEY || ''
    const baseUrl = 'https://eth-mainnet.g.alchemy.com/v2'
    
    // Fetch transfers with retry mechanism and rate limiting
    const transfers = await retryWithBackoff(() => withRateLimit(async () => {
      const response = await fetch(`${baseUrl}/${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'alchemy_getAssetTransfers',
          params: [{
            fromBlock: '0x0',
            toBlock: 'latest',
            contractAddresses: [tokenAddress],
            category: ['erc20']
          }],
          id: 3
        })
      })
      const data = await response.json()
      if (data.error) throw new Error(data.error.message)
      return data.result
    }, 'getAssetTransfers'))
    
    // Calculate metrics from transfer data
    const uniqueHolders = new Set<string>()
    let totalVolume = 0
    
    transfers.transfers?.forEach((transfer: any) => {
      if (transfer.from) uniqueHolders.add(transfer.from)
      if (transfer.to) uniqueHolders.add(transfer.to)
      if (transfer.value) {
        totalVolume += parseFloat(transfer.value) || 0
      }
    })
    
    const holderCount = uniqueHolders.size
    const transferCount = transfers.transfers?.length || 0
    const communityActivity = calculateActivityScore(transfers.transfers || [])
    
    console.log(`✅ Successfully fetched community metrics for: ${tokenAddress}`)
    
    return {
      holderCount,
      transferCount,
      tradingVolume: totalVolume,
      communityActivity,
      success: true
    }
  } catch (error) {
    console.error('❌ Error fetching community metrics:', error)
    
    return {
      holderCount: 0,
      transferCount: 0,
      tradingVolume: 0,
      communityActivity: 0,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Calculate community activity score
const calculateActivityScore = (transfers: any[]): number => {
  if (!transfers || transfers.length === 0) return 0
  
  // Calculate activity based on recent transfers (last 24 hours)
  const recentTransfers = transfers.filter(transfer => {
    const transferTime = new Date(transfer.blockTimestamp)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    return transferTime > oneDayAgo
  })
  
  // Activity score: recent transfers * 10, capped at 100
  return Math.min(recentTransfers.length * 10, 100)
}

// Production-ready current price fetcher
export const getCurrentPrice = async (tokenAddress: string): Promise<number> => {
  try {
    if (!tokenAddress || !tokenAddress.startsWith('0x') || tokenAddress.length !== 42) {
      throw new Error('Invalid token address format')
    }

    const tokenData = await retryWithBackoff(() => withRateLimit(() => alchemy.core.getTokenMetadata(tokenAddress), 'getTokenMetadata'))
    return tokenData?.price || 0
  } catch (error) {
    console.error('Error fetching current price:', error)
    return 0
  }
}

// Production-ready trading volume fetcher
export const getTradingVolume = async (tokenAddress: string): Promise<number> => {
  try {
    if (!tokenAddress || !tokenAddress.startsWith('0x') || tokenAddress.length !== 42) {
      throw new Error('Invalid token address format')
    }

    const transfers = await retryWithBackoff(() => withRateLimit(() => alchemy.core.getAssetTransfers({
      fromBlock: '0x0',
      toBlock: 'latest',
      contractAddresses: [tokenAddress],
      category: ['erc20']
    }), 'getAssetTransfers'))
    
    const volume = transfers.transfers?.reduce((total: number, transfer: any) => {
      return total + (parseFloat(transfer.value) || 0)
    }, 0) || 0
    
    return volume
  } catch (error) {
    console.error('Error fetching trading volume:', error)
    return 0
  }
}

// Production-ready holder count fetcher
export const getHolderCount = async (tokenAddress: string): Promise<number> => {
  try {
    if (!tokenAddress || !tokenAddress.startsWith('0x') || tokenAddress.length !== 42) {
      throw new Error('Invalid token address format')
    }

    const transfers = await retryWithBackoff(() => withRateLimit(() => alchemy.core.getAssetTransfers({
      fromBlock: '0x0',
      toBlock: 'latest',
      contractAddresses: [tokenAddress],
      category: ['erc20']
    }), 'getAssetTransfers'))
    
    const uniqueHolders = new Set<string>()
    transfers.transfers?.forEach((transfer: any) => {
      if (transfer.from) uniqueHolders.add(transfer.from)
      if (transfer.to) uniqueHolders.add(transfer.to)
    })
    
    return uniqueHolders.size
  } catch (error) {
    console.error('Error fetching holder count:', error)
    return 0
  }
}