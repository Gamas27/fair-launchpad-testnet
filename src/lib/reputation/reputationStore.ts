import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getReputationLevel, calculateAllocationCap } from '@/lib/utils'

export interface ReputationData {
  xp: number
  level: 'Bronze' | 'Silver' | 'Gold' | 'Diamond'
  currentLevelXp: number
  nextLevelXp: number
  progress: number
  icon: string
  color: string
}

export interface ReputationQuest {
  id: string
  title: string
  description: string
  xpReward: number
  completed: boolean
  progress: number
  maxProgress: number
  category: 'verification' | 'trading' | 'community' | 'security'
  timeFrame?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
  category: 'trader' | 'community' | 'security' | 'milestone'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface ReputationBenefits {
  level: 'Bronze' | 'Silver' | 'Gold' | 'Diamond'
  tradingLimits: {
    multiplier: number
    maxAmount: number
  }
  feeDiscount: number
  priorityAccess: boolean
  exclusiveFeatures: string[]
  nextLevelBenefits?: string[]
}

interface ReputationStore {
  // State
  xp: number
  quests: ReputationQuest[]
  achievements: Achievement[]
  
  // Computed data
  reputationData: ReputationData
  benefits: ReputationBenefits
  
  // Actions
  addXP: (amount: number) => void
  completeQuest: (questId: string) => void
  updateQuestProgress: (questId: string, progress: number) => void
  unlockAchievement: (achievementId: string) => void
  resetReputation: () => void
  
  // Getters
  getQuestById: (id: string) => ReputationQuest | undefined
  getAchievementById: (id: string) => Achievement | undefined
  getQuestsByCategory: (category: string) => ReputationQuest[]
  getAchievementsByCategory: (category: string) => Achievement[]
  getUnlockedAchievements: () => Achievement[]
  getCompletedQuests: () => ReputationQuest[]
}

const initialQuests: ReputationQuest[] = [
  {
    id: 'verify-phone',
    title: 'Verify Phone Number',
    description: 'Complete phone verification to unlock higher trading limits',
    xpReward: 150,
    completed: false,
    progress: 0,
    maxProgress: 1,
    category: 'verification',
    timeFrame: 'One-time'
  },
  {
    id: 'complete-trades',
    title: 'Complete 3 Fair Trades',
    description: 'Make 3 successful trades to prove your trading skills',
    xpReward: 100,
    completed: false,
    progress: 0,
    maxProgress: 3,
    category: 'trading',
    timeFrame: 'Weekly'
  },
  {
    id: 'report-suspicious',
    title: 'Report Suspicious User',
    description: 'Help the community by reporting suspicious activity',
    xpReward: 25,
    completed: false,
    progress: 0,
    maxProgress: 1,
    category: 'community',
    timeFrame: 'One-time'
  },
  {
    id: 'earn-community-xp',
    title: 'Earn 100 Community XP',
    description: 'Participate in community activities and discussions',
    xpReward: 50,
    completed: true,
    progress: 100,
    maxProgress: 100,
    category: 'community',
    timeFrame: 'Monthly'
  }
]

const initialAchievements: Achievement[] = [
  {
    id: 'first-trade',
    title: 'Fair Trader',
    description: 'Complete your first fair trade',
    icon: '🤝',
    unlocked: true,
    unlockedAt: '2024-01-15',
    category: 'trader',
    rarity: 'common'
  },
  {
    id: 'bot-hunter',
    title: 'Bot Hunter',
    description: 'Report your first suspicious account',
    icon: '🕵️',
    unlocked: false,
    category: 'community',
    rarity: 'rare'
  },
  {
    id: 'diamond-hands',
    title: 'Diamond Hands',
    description: 'Hold a position for 30+ days',
    icon: '💎',
    unlocked: false,
    category: 'trader',
    rarity: 'epic'
  },
  {
    id: 'community-hero',
    title: 'Community Hero',
    description: 'Help 10+ community members',
    icon: '🦸',
    unlocked: false,
    category: 'community',
    rarity: 'legendary'
  }
]

function calculateBenefits(level: string): ReputationBenefits {
  const levelBenefits = {
    Bronze: {
      tradingLimits: { multiplier: 1, maxAmount: 1000 },
      feeDiscount: 0,
      priorityAccess: false,
      exclusiveFeatures: ['Basic trading'],
      nextLevelBenefits: ['1.5x trading limits', '5% fee discount']
    },
    Silver: {
      tradingLimits: { multiplier: 1.5, maxAmount: 5000 },
      feeDiscount: 5,
      priorityAccess: false,
      exclusiveFeatures: ['Basic trading', '5% fee discount'],
      nextLevelBenefits: ['2x trading limits', '10% fee discount', 'Priority support']
    },
    Gold: {
      tradingLimits: { multiplier: 2, maxAmount: 10000 },
      feeDiscount: 10,
      priorityAccess: true,
      exclusiveFeatures: ['Basic trading', '10% fee discount', 'Priority support'],
      nextLevelBenefits: ['3x trading limits', '15% fee discount', 'Exclusive features']
    },
    Diamond: {
      tradingLimits: { multiplier: 3, maxAmount: 25000 },
      feeDiscount: 15,
      priorityAccess: true,
      exclusiveFeatures: ['Basic trading', '15% fee discount', 'Priority support', 'Exclusive features', 'VIP support']
    }
  }

  return {
    level: level as 'Bronze' | 'Silver' | 'Gold' | 'Diamond',
    ...levelBenefits[level as keyof typeof levelBenefits]
  }
}

export const useReputationStore = create<ReputationStore>()(
  persist(
    (set, get) => ({
      // Initial state
      xp: 1250,
      quests: initialQuests,
      achievements: initialAchievements,
      
      // Computed data
      get reputationData() {
        const { xp } = get()
        return getReputationLevel(xp)
      },
      
      get benefits() {
        const { reputationData } = get()
        return calculateBenefits(reputationData.level)
      },
      
      // Actions
      addXP: (amount: number) => {
        set((state) => {
          const newXP = state.xp + amount
          const newReputationData = getReputationLevel(newXP)
          
          // Check for level up achievements
          const levelUpAchievements = state.achievements.filter(achievement => 
            !achievement.unlocked && 
            (achievement.id === 'level-silver' && newReputationData.level === 'Silver') ||
            (achievement.id === 'level-gold' && newReputationData.level === 'Gold') ||
            (achievement.id === 'level-diamond' && newReputationData.level === 'Diamond')
          )
          
          const updatedAchievements = state.achievements.map(achievement => {
            if (levelUpAchievements.some(la => la.id === achievement.id)) {
              return {
                ...achievement,
                unlocked: true,
                unlockedAt: new Date().toISOString()
              }
            }
            return achievement
          })
          
          return {
            xp: newXP,
            achievements: updatedAchievements
          }
        })
      },
      
      completeQuest: (questId: string) => {
        set((state) => {
          const quest = state.quests.find(q => q.id === questId)
          if (!quest || quest.completed) return state
          
          const updatedQuests = state.quests.map(q => 
            q.id === questId 
              ? { ...q, completed: true, progress: q.maxProgress }
              : q
          )
          
          return {
            quests: updatedQuests,
            xp: state.xp + quest.xpReward
          }
        })
      },
      
      updateQuestProgress: (questId: string, progress: number) => {
        set((state) => {
          const updatedQuests = state.quests.map(q => 
            q.id === questId 
              ? { ...q, progress: Math.min(progress, q.maxProgress) }
              : q
          )
          
          return { quests: updatedQuests }
        })
      },
      
      unlockAchievement: (achievementId: string) => {
        set((state) => {
          const updatedAchievements = state.achievements.map(achievement =>
            achievement.id === achievementId
              ? { ...achievement, unlocked: true, unlockedAt: new Date().toISOString() }
              : achievement
          )
          
          return { achievements: updatedAchievements }
        })
      },
      
      resetReputation: () => {
        set({
          xp: 0,
          quests: initialQuests,
          achievements: initialAchievements
        })
      },
      
      // Getters
      getQuestById: (id: string) => {
        return get().quests.find(quest => quest.id === id)
      },
      
      getAchievementById: (id: string) => {
        return get().achievements.find(achievement => achievement.id === id)
      },
      
      getQuestsByCategory: (category: string) => {
        return get().quests.filter(quest => 
          category === 'all' || quest.category === category
        )
      },
      
      getAchievementsByCategory: (category: string) => {
        return get().achievements.filter(achievement => 
          category === 'all' || achievement.category === category
        )
      },
      
      getUnlockedAchievements: () => {
        return get().achievements.filter(achievement => achievement.unlocked)
      },
      
      getCompletedQuests: () => {
        return get().quests.filter(quest => quest.completed)
      }
    }),
    {
      name: 'reputation-store',
      partialize: (state) => ({
        xp: state.xp,
        quests: state.quests,
        achievements: state.achievements
      })
    }
  )
)
