'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Users, Activity, Zap } from 'lucide-react'

interface CommunityDashboardProps {
  tokenAddress: string
  className?: string
}

interface CommunityData {
  holderCount: number
  transferCount: number
  tradingVolume: number
  communityActivity: number
  currentPrice: number
  priceChange: number
}

export function AlchemyCommunityDashboard({ tokenAddress, className }: CommunityDashboardProps) {
  const [data, setData] = useState<CommunityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        setLoading(true)
        
        // Fetch community metrics
        const metricsResponse = await fetch(`/api/alchemy/community-metrics?tokenAddress=${tokenAddress}`)
        const metricsData = await metricsResponse.json()
        
        if (!metricsData.success) {
          throw new Error(metricsData.error || 'Failed to fetch community metrics')
        }
        
        // Fetch token analytics
        const analyticsResponse = await fetch(`/api/alchemy/token-analytics?tokenAddress=${tokenAddress}`)
        const analyticsData = await analyticsResponse.json()
        
        if (!analyticsData.success) {
          throw new Error(analyticsData.error || 'Failed to fetch token analytics')
        }
        
        setData({
          holderCount: metricsData.data.holderCount,
          transferCount: metricsData.data.transferCount,
          tradingVolume: metricsData.data.tradingVolume,
          communityActivity: metricsData.data.communityActivity,
          currentPrice: analyticsData.data.metadata?.price || 0,
          priceChange: 0 // TODO: Calculate price change
        })
        
        setError(null)
      } catch (err) {
        console.error('Error fetching community data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch community data')
      } finally {
        setLoading(false)
      }
    }

    if (tokenAddress) {
      fetchCommunityData()
      
      // Set up real-time updates every 30 seconds
      const interval = setInterval(fetchCommunityData, 30000)
      return () => clearInterval(interval)
    }
  }, [tokenAddress])

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-g8-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`space-y-4 ${className}`}>
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-500">
              <p>Error loading community data: {error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!data) {
    return (
      <div className={`space-y-4 ${className}`}>
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-gray-500">
              <p>No community data available</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Community Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-g8-primary" />
            Community Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-g8-primary">{data.holderCount}</div>
              <div className="text-sm text-gray-600">Holders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-g8-primary">{data.transferCount}</div>
              <div className="text-sm text-gray-600">Transfers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-g8-primary">
                ${data.tradingVolume.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Volume</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-g8-primary">{data.communityActivity}%</div>
              <div className="text-sm text-gray-600">Activity</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Token Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-g8-primary" />
            Token Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">Current Price</div>
              <div className="text-2xl font-bold text-g8-primary">
                ${data.currentPrice.toFixed(6)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Price Change</div>
              <div className="text-2xl font-bold text-g8-primary">
                {data.priceChange > 0 ? '+' : ''}{data.priceChange.toFixed(2)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-g8-primary" />
            Community Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Activity Score</span>
              <Badge variant={data.communityActivity > 50 ? 'default' : 'secondary'}>
                {data.communityActivity}%
              </Badge>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-g8-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(data.communityActivity, 100)}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600">
              {data.communityActivity > 50 
                ? 'High community engagement!' 
                : 'Community activity is growing'
              }
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gas-less Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-g8-primary" />
            Gas-less Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Gas-less Trading</span>
              <Badge variant="default">Available</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sponsored Actions</span>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="text-sm text-gray-600">
              Community members with high reputation can enjoy gas-less transactions!
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
