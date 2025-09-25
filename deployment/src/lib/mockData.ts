import { User, Token, ReputationQuest, Achievement } from "@/types"

export const mockUser: User = {
  address: "0x1234567890123456789012345678901234567890",
  reputationLevel: "Bronze",
  xp: 1250,
  verificationLevel: "Device",
  allocationCap: 200,
  usedAllocation: 120
}

export const mockToken: Token = {
  id: "1",
  name: "SHIBBY",
  symbol: "SHIBBY",
  logo: "🦮",
  currentPrice: 0.05,
  marketCap: 12450,
  progress: 80,
  securityScore: 92,
  humanCount: 1247,
  botCount: 23,
  avgBuy: 45
}

export const mockQuests: ReputationQuest[] = [
  {
    id: "1",
    title: "Verify Phone Number",
    description: "Complete phone verification to unlock higher trading limits",
    completed: false,
    progress: 0,
    maxProgress: 1,
    reward: 150
  },
  {
    id: "2",
    title: "Complete 3 Fair Trades",
    description: "Make 3 successful trades to prove your trading skills",
    completed: false,
    progress: 2,
    maxProgress: 3,
    reward: 100
  },
  {
    id: "3",
    title: "Report Suspicious User",
    description: "Help the community by reporting suspicious activity",
    completed: false,
    progress: 0,
    maxProgress: 1,
    reward: 25
  },
  {
    id: "4",
    title: "Earn 100 Community XP",
    description: "Participate in community activities and discussions",
    completed: true,
    progress: 100,
    maxProgress: 100,
    reward: 50
  }
]

export const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "Fair Trader",
    description: "Complete your first fair trade",
    icon: "🤝",
    unlocked: true,
    unlockedAt: "2024-01-15"
  },
  {
    id: "2",
    title: "Bot Hunter",
    description: "Report your first suspicious account",
    icon: "🕵️",
    unlocked: false
  },
  {
    id: "3",
    title: "Diamond Hands",
    description: "Hold a position for 30+ days",
    icon: "💎",
    unlocked: false
  },
  {
    id: "4",
    title: "Community Hero",
    description: "Help 10+ community members",
    icon: "🦸",
    unlocked: false
  }
]
