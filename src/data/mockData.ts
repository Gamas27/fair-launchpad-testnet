import { TokenData, UserReputation, Token, User, Quest, Achievement } from '@/types'

export const mockTokenData: TokenData = {
  id: '1',
  name: 'FairLaunch Token',
  symbol: 'FLT',
  logo: '/api/placeholder/64/64',
  currentPrice: 0.0001,
  marketCap: 1000000,
  progress: 45,
  securityScore: 95,
  humansVerified: 1250,
  botsBlocked: 89,
  avgBuy: 150
}

export const mockToken: Token = {
  id: '1',
  name: 'FairLaunch Token',
  symbol: 'FLT',
  logo: '/api/placeholder/64/64',
  currentPrice: 0.0001,
  marketCap: 1000000,
  progress: 45,
  securityScore: 95,
  humanCount: 1250,
  botCount: 89,
  avgBuy: 150
}

export const mockUserReputation: UserReputation = {
  level: 'Silver',
  xp: 450,
  quests: {
    verifyPhone: true,
    completeTrades: 3,
    reportSuspicious: 1,
    earnCommunityXp: 50
  },
  achievements: {
    fairTrader: true,
    botHunter: false,
    diamondHands: false,
    communityHero: false
  }
}

export const mockUser: User = {
  address: '0x1234567890123456789012345678901234567890',
  allocationCap: 1000,
  usedAllocation: 300,
  reputationLevel: 'Silver',
  verificationLevel: 'Orb',
  xp: 450
}

export const mockQuests: Quest[] = [
  {
    id: 'verify-phone',
    title: 'Verify Phone Number',
    description: 'Add an extra layer of security',
    reward: 50,
    completed: true
  },
  {
    id: 'complete-trades',
    title: 'Complete 5 Trades',
    description: 'Make 5 successful trades',
    reward: 100,
    completed: false,
    progress: 3,
    target: 5
  },
  {
    id: 'report-suspicious',
    title: 'Report Suspicious Activity',
    description: 'Help keep the community safe',
    reward: 75,
    completed: false,
    progress: 1,
    target: 3
  }
]

export const mockAchievements: Achievement[] = [
  {
    id: 'fair-trader',
    title: 'Fair Trader',
    description: 'Complete your first trade',
    icon: '🏆',
    unlocked: true,
    unlockedAt: '2024-01-15'
  },
  {
    id: 'bot-hunter',
    title: 'Bot Hunter',
    description: 'Report 5 suspicious activities',
    icon: '🛡️',
    unlocked: false
  },
  {
    id: 'diamond-hands',
    title: 'Diamond Hands',
    description: 'Hold tokens for 30 days',
    icon: '💎',
    unlocked: false
  },
  {
    id: 'community-hero',
    title: 'Community Hero',
    description: 'Earn 1000 community XP',
    icon: '🌟',
    unlocked: false
  }
]
