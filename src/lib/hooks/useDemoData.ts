import { useState, useEffect } from 'react'

interface DemoUser {
  id: string
  walletAddress: string
  worldIdHash: string | null
  verificationLevel: string
  reputationScore: number
  reputationLevel: string
  totalTrades: number
  totalVolume: number
  marketCap: number | null
  isWorldIdVerified: boolean
  walletCreationMethod: string
  walletCreatedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

interface DemoToken {
  id: string
  name: string
  ticker: string
  logo: string | null
  description: string | null
  marketCap: number
  ath: number
  volume: number
  txCount: number
  isLive: boolean
  timeSinceLaunch: string | null
  chartData: string | null
  socialLinks: string | null
  teamInfo: string | null
  gradu8Story: string | null
  repBreakdown: string | null
  priceHistory: string | null
  recentActivity: string | null
  createdAt: Date
  updatedAt: Date
  creatorId: string
  creator: DemoUser
}

interface DemoChatRoom {
  id: string
  name: string
  type: string
  description: string | null
  repRequirement: number | null
  isLocked: boolean
  membersCount: number
  onlineCount: number
  avatar: string | null
  lastMessage: string | null
  lastMessageTime: Date | null
  createdAt: Date
  updatedAt: Date
  creatorId: string
  creator: DemoUser
}

interface DemoStats {
  totalVolume: number
  totalUsers: number
  totalTokens: number
  totalTrades: number
  marketCap24h: number
  volume24h: number
}

interface DemoData {
  users: DemoUser[]
  tokens: DemoToken[]
  chatRooms: DemoChatRoom[]
  stats: DemoStats
}

export function useDemoData() {
  const [data, setData] = useState<DemoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/demo/data')
        
        if (!response.ok) {
          throw new Error('Failed to fetch demo data')
        }
        
        const result = await response.json()
        
        if (result.success) {
          setData(result.data)
        } else {
          throw new Error(result.error || 'Failed to fetch demo data')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        console.error('Error fetching demo data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
