// Simple in-memory database for demo purposes
interface Token {
  id: string
  name: string
  symbol: string
  description: string
  totalSupply: number
  maxPerPerson: number
  currentPrice: number
  marketCap: number
  createdAt: string
  creator: string
  trades: Trade[]
}

interface Trade {
  id: string
  tokenId: string
  type: 'buy' | 'sell'
  amount: number
  price: number
  user: string
  timestamp: string
}

interface User {
  id: string
  address: string
  worldIdVerified: boolean
  tokens: { [tokenId: string]: number } // token holdings
}

// In-memory storage
let tokens: Token[] = []
let users: User[] = []
let trades: Trade[] = []

// Generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9)

// API functions
export const api = {
  // Token management
  createToken: (tokenData: Omit<Token, 'id' | 'createdAt' | 'trades' | 'currentPrice' | 'marketCap'>) => {
    const token: Token = {
      id: generateId(),
      ...tokenData,
      currentPrice: 0.0005, // Starting price
      marketCap: 0,
      createdAt: new Date().toISOString(),
      trades: []
    }
    tokens.push(token)
    return token
  },

  getTokens: () => tokens,

  getToken: (id: string) => tokens.find(t => t.id === id),

  // User management
  createUser: (address: string, worldIdVerified: boolean = false) => {
    const user: User = {
      id: generateId(),
      address,
      worldIdVerified,
      tokens: {}
    }
    users.push(user)
    return user
  },

  getUser: (address: string) => users.find(u => u.address === address),

  updateUserVerification: (address: string, verified: boolean) => {
    const user = users.find(u => u.address === address)
    if (user) {
      user.worldIdVerified = verified
    }
    return user
  },

  // Trading
  executeTrade: (tokenId: string, type: 'buy' | 'sell', amount: number, userAddress: string) => {
    const token = tokens.find(t => t.id === tokenId)
    const user = users.find(u => u.address === userAddress)
    
    if (!token || !user) {
      throw new Error('Token or user not found')
    }

    if (!user.worldIdVerified) {
      throw new Error('User must be World ID verified to trade')
    }

    const trade: Trade = {
      id: generateId(),
      tokenId,
      type,
      amount,
      price: token.currentPrice,
      user: userAddress,
      timestamp: new Date().toISOString()
    }

    trades.push(trade)
    token.trades.push(trade)

    // Update user holdings
    if (type === 'buy') {
      user.tokens[tokenId] = (user.tokens[tokenId] || 0) + amount
    } else {
      user.tokens[tokenId] = Math.max(0, (user.tokens[tokenId] || 0) - amount)
    }

    // Update token price (simple simulation)
    const priceChange = (Math.random() - 0.5) * 0.0001
    token.currentPrice = Math.max(0.0001, token.currentPrice + priceChange)
    token.marketCap = token.currentPrice * token.totalSupply

    return trade
  },

  getUserTrades: (userAddress: string) => {
    return trades.filter(t => t.user === userAddress)
  },

  getUserHoldings: (userAddress: string) => {
    const user = users.find(u => u.address === userAddress)
    if (!user) return {}
    
    return Object.entries(user.tokens).reduce((acc, [tokenId, amount]) => {
      const token = tokens.find(t => t.id === tokenId)
      if (token && amount > 0) {
        acc[tokenId] = {
          token,
          amount,
          value: amount * token.currentPrice
        }
      }
      return acc
    }, {} as Record<string, { token: Token; amount: number; value: number }>)
  },

  // Statistics
  getStats: () => ({
    totalTokens: tokens.length,
    totalTrades: trades.length,
    totalUsers: users.length,
    verifiedUsers: users.filter(u => u.worldIdVerified).length,
    totalVolume: trades.reduce((sum, t) => sum + (t.amount * t.price), 0)
  })
}

export type { Token, Trade, User }
