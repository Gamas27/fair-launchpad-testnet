'use client'

import { useState, useEffect, useCallback } from 'react'
import { apiService } from '@/services/apiService'
import { ReputationQuest, Achievement } from '@/types'

interface ReputationData {
  reputation: {
    score: number
    level: string
    xp: number
    totalTrades: number
    totalVolume: number
    riskScore: number
    isBanned: boolean
  }
  quests: Array<{
    id: string
    quest: string
    progress: number
    isCompleted: boolean
    completedAt: string | null
  }>
  achievements: Array<{
    id: string
    achievement: string
    unlockedAt: string | null
  }>
  stats: any
}

interface QuestProgress {
  current: number
  target: number
  percentage: number
  isCompleted: boolean
  xpAwarded: number
}

export function useReputation() {
  const [reputationData, setReputationData] = useState<ReputationData | null>(null)
  const [quests, setQuests] = useState<ReputationQuest[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReputationData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const [reputationResponse, questsResponse, achievementsResponse] = await Promise.all([
        apiService.getUserReputation(),
        apiService.getReputationQuests(),
        apiService.getAchievements()
      ])

      setReputationData(reputationResponse)
      setQuests(questsResponse.items)
      setAchievements(achievementsResponse.achievements.items)
    } catch (err) {
      console.error('Failed to fetch reputation data:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch reputation data')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const completeQuest = useCallback(async (questId: string, progress?: number): Promise<QuestProgress | null> => {
    try {
      setError(null)
      
      const response = await apiService.completeQuest({
        questId,
        progress
      })

      // Update local state
      if (reputationData) {
        setReputationData(prev => prev ? {
          ...prev,
          reputation: {
            ...prev.reputation,
            score: prev.reputation.score + response.progress.xpAwarded,
            xp: prev.reputation.xp + response.progress.xpAwarded
          }
        } : null)
      }

      // Update quests list
      setQuests(prev => prev.map(quest => 
        quest.id === questId 
          ? { ...quest, progress: response.progress.current, isCompleted: response.progress.isCompleted }
          : quest
      ))

      return response.progress
    } catch (err) {
      console.error('Failed to complete quest:', err)
      setError(err instanceof Error ? err.message : 'Failed to complete quest')
      return null
    }
  }, [reputationData])

  const refreshData = useCallback(() => {
    fetchReputationData()
  }, [fetchReputationData])

  useEffect(() => {
    fetchReputationData()
  }, [fetchReputationData])

  return {
    reputationData,
    quests,
    achievements,
    isLoading,
    error,
    completeQuest,
    refreshData,
    
    // Computed values
    reputationLevel: reputationData?.reputation.level || 'Bronze',
    reputationScore: reputationData?.reputation.score || 0,
    reputationXp: reputationData?.reputation.xp || 0,
    totalTrades: reputationData?.reputation.totalTrades || 0,
    totalVolume: reputationData?.reputation.totalVolume || 0,
    riskScore: reputationData?.reputation.riskScore || 0,
    isBanned: reputationData?.reputation.isBanned || false,
    
    // Quest helpers
    activeQuests: quests?.filter(quest => !quest.isCompleted) || [],
    completedQuests: quests?.filter(quest => quest.isCompleted) || [],
    
    // Achievement helpers
    unlockedAchievements: achievements?.filter(achievement => achievement.unlockedAt !== null) || [],
    lockedAchievements: achievements?.filter(achievement => achievement.unlockedAt === null) || [],
  }
}
