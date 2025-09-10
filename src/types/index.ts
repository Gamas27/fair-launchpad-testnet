export type ReputationLevel = 'Bronze' | 'Silver' | 'Gold' | 'Diamond'

export interface TokenData {
  id: string
  name: string
  symbol: string
  logo: string
  currentPrice: number
  marketCap: number
  progress: number
  securityScore: number
  humansVerified: number
  botsBlocked: number
  avgBuy: number
}

export interface UserReputation {
  level: ReputationLevel
  xp: number
  quests: {
    verifyPhone: boolean
    completeTrades: number
    reportSuspicious: number
    earnCommunityXp: number
  }
  achievements: {
    fairTrader: boolean
    botHunter: boolean
    diamondHands: boolean
    communityHero: boolean
  }
}

// Re-export anti-manipulation types
export * from './antiManipulation'

// Additional types for components
export interface Token {
  id: string
  name: string
  symbol: string
  logo: string
  currentPrice: number
  marketCap: number
  progress: number
  securityScore: number
  humanCount: number
  botCount: number
  avgBuy: number
}

export interface User {
  address: string
  allocationCap: number
  usedAllocation: number
  reputationLevel: ReputationLevel
  verificationLevel: string
  xp: number
}

export interface Quest {
  id: string
  title: string
  description: string
  reward: number
  completed: boolean
  progress?: number
  target?: number
}

export interface ReputationQuest {
  id: string
  title: string
  description: string
  reward: number
  completed: boolean
  progress?: number
  target?: number
  maxProgress?: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
}
