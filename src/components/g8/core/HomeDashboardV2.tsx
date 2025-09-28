'use client'

import React, { useState } from 'react'
import { G8Card, G8CardContent, G8CardDescription, G8CardHeader, G8CardTitle } from '@/components/ui/g8-card'
import { G8Button } from '@/components/ui/g8-button'
import { G8Badge } from '@/components/ui/g8-badge'
import { G8Input } from '@/components/ui/g8-input'
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Eye,
  BarChart3,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Users,
  Activity
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Token {
  id: string
  name: string
  ticker: string
  logo: string
  price: number
  priceChange: number
  volume: string
  marketCap: string
  isLive: boolean
  timeSinceLaunch: string
  chartData: number[]
}

interface HomeDashboardV2Props {
  className?: string
  onTokenClick?: (tokenId: string) => void
}

export const HomeDashboardV2 = ({ className, onTokenClick }: HomeDashboardV2Props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'live' | 'trending'>('all')

  // Mock data - in real app this would come from API
  const mockTokens: Token[] = [
    {
      id: '1',
      name: 'MEME Token',
      ticker: 'MEME',
      logo: '/api/placeholder/40/40',
      price: 0.001,
      priceChange: 15.5,
      volume: '$500K',
      marketCap: '$1.2M',
      isLive: true,
      timeSinceLaunch: '2h',
      chartData: [0.0008, 0.0009, 0.001, 0.0011, 0.001]
    },
    {
      id: '2',
      name: 'DOGE',
      ticker: 'DOGE',
      logo: '/api/placeholder/40/40',
      price: 0.08,
      priceChange: -2.3,
      volume: '$2.1M',
      marketCap: '$12.5B',
      isLive: true,
      timeSinceLaunch: '1d',
      chartData: [0.082, 0.081, 0.08, 0.079, 0.08]
    },
    {
      id: '3',
      name: 'PEPE',
      ticker: 'PEPE',
      logo: '/api/placeholder/40/40',
      price: 0.000012,
      priceChange: 8.7,
      volume: '$800K',
      marketCap: '$5.2B',
      isLive: true,
      timeSinceLaunch: '3d',
      chartData: [0.000011, 0.000012, 0.000013, 0.000012, 0.000012]
    }
  ]

  const filteredTokens = mockTokens.filter(token => {
    const matchesSearch = token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         token.ticker.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (selectedFilter === 'live') return matchesSearch && token.isLive
    if (selectedFilter === 'trending') return matchesSearch && token.priceChange > 5
    return matchesSearch
  })

  const totalBalance = 12345.67
  const portfolioChange = 2.5

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header with Balance */}
      <G8Card variant="gradient" size="lg" className="animate-fade-in-up">
        <G8CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <G8CardTitle className="text-3xl text-text-primary">G8</G8CardTitle>
              <G8CardDescription className="text-text-secondary text-lg">Your Portfolio</G8CardDescription>
            </div>
            <G8Badge variant="live" size="sm" className="animate-pulse">
              LIVE
            </G8Badge>
          </div>
        </G8CardHeader>
        <G8CardContent className="space-y-6">
          {/* Balance Display */}
          <div className="text-center space-y-3">
            <div className="text-5xl font-bold text-text-primary">${totalBalance.toLocaleString()}</div>
            <div className={cn(
              "flex items-center justify-center gap-2 text-lg font-semibold",
              portfolioChange >= 0 ? "text-accent-green" : "text-accent-red"
            )}>
              {portfolioChange >= 0 ? (
                <ArrowUpRight className="h-5 w-5" />
              ) : (
                <ArrowDownRight className="h-5 w-5" />
              )}
              {Math.abs(portfolioChange)}% today
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <G8Button 
              variant="primary" 
              size="lg"
              className="w-full"
              icon={<Plus className="h-5 w-5" />}
            >
              Create Token
            </G8Button>
            <G8Button 
              variant="outline" 
              size="lg"
              className="w-full"
              icon={<TrendingUp className="h-5 w-5" />}
            >
              Discover
            </G8Button>
          </div>
        </G8CardContent>
      </G8Card>

      {/* Search and Filters */}
      <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <G8Input
          placeholder="Search tokens..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search className="h-4 w-4" />}
          variant="neon"
          className="w-full"
        />

        <div className="flex gap-2">
          {[
            { id: 'all', label: 'All', count: mockTokens.length },
            { id: 'live', label: 'Live', count: mockTokens.filter(t => t.isLive).length },
            { id: 'trending', label: 'Trending', count: mockTokens.filter(t => t.priceChange > 5).length }
          ].map((filter) => (
            <G8Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "primary" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.id as any)}
              className="flex-1"
            >
              {filter.label} ({filter.count})
            </G8Button>
          ))}
        </div>
      </div>

      {/* Token List */}
      <div className="space-y-4">
        {filteredTokens.map((token, index) => (
          <G8Card 
            key={token.id} 
            variant="default" 
            className="hover:border-accent-cyan/50 transition-all duration-200 cursor-pointer animate-fade-in-up"
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            onClick={() => onTokenClick?.(token.id)}
          >
            <G8CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-background-tertiary flex items-center justify-center">
                    <Coins className="h-6 w-6 text-accent-cyan" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-text-primary text-lg">{token.name}</span>
                      <G8Badge variant="outline" size="sm">
                        {token.ticker}
                      </G8Badge>
                    </div>
                    <div className="text-sm text-text-muted">
                      {token.timeSinceLaunch} ago
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="font-semibold text-text-primary text-lg">
                    ${token.price.toFixed(6)}
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    token.priceChange >= 0 ? "text-accent-green" : "text-accent-red"
                  )}>
                    {token.priceChange >= 0 ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {Math.abs(token.priceChange)}%
                  </div>
                </div>
              </div>

              {/* Token Stats */}
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-text-muted">Volume</div>
                  <div className="font-semibold text-text-primary">{token.volume}</div>
                </div>
                <div>
                  <div className="text-text-muted">Market Cap</div>
                  <div className="font-semibold text-text-primary">{token.marketCap}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <G8Button 
                  size="sm" 
                  variant="primary"
                  className="flex-1"
                  icon={<Eye className="h-4 w-4" />}
                >
                  View
                </G8Button>
                <G8Button 
                  size="sm" 
                  variant="outline"
                  className="flex-1"
                  icon={<BarChart3 className="h-4 w-4" />}
                >
                  Trade
                </G8Button>
              </div>
            </G8CardContent>
          </G8Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTokens.length === 0 && (
        <G8Card variant="glass" className="animate-fade-in-up">
          <G8CardContent className="p-8 text-center">
            <div className="text-text-muted mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 text-text-muted" />
              <div className="text-lg font-medium">No tokens found</div>
              <div className="text-sm">Try adjusting your search or filters</div>
            </div>
            <G8Button 
              onClick={() => {
                setSearchQuery('')
                setSelectedFilter('all')
              }}
              variant="primary"
            >
              Clear Filters
            </G8Button>
          </G8CardContent>
        </G8Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <G8Card variant="neon" size="sm">
          <G8CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-accent-cyan">10K+</div>
            <div className="text-sm text-text-muted">Active Users</div>
          </G8CardContent>
        </G8Card>
        <G8Card variant="neon" size="sm">
          <G8CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-accent-purple">500+</div>
            <div className="text-sm text-text-muted">Tokens Created</div>
          </G8CardContent>
        </G8Card>
      </div>
    </div>
  )
}

// Graduation Zone Component
export const GraduationZoneV2 = ({ className }: { className?: string }) => {
  return (
    <G8Card variant="success" className={cn("animate-fade-in-up", className)} style={{ animationDelay: '0.5s' }}>
      <G8CardHeader>
        <G8CardTitle className="text-text-primary flex items-center gap-2">
          <Star className="h-6 w-6 text-accent-green" />
          G8 Graduation Zone
        </G8CardTitle>
        <G8CardDescription className="text-text-secondary">
          Advanced features for experienced users
        </G8CardDescription>
      </G8CardHeader>
      <G8CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <G8Button 
            variant="secondary" 
            size="lg"
            className="w-full"
            icon={<Coins className="h-5 w-5" />}
          >
            Create & Mint
          </G8Button>
          <G8Button 
            variant="outline" 
            size="lg"
            className="w-full"
            icon={<TrendingUp className="h-5 w-5" />}
          >
            Stake & Earn
          </G8Button>
          <G8Button 
            variant="outline" 
            size="lg"
            className="w-full"
            icon={<BarChart3 className="h-5 w-5" />}
          >
            Swap & Bridge
          </G8Button>
          <G8Button 
            variant="outline" 
            size="lg"
            className="w-full"
            icon={<Activity className="h-5 w-5" />}
          >
            Launchpad
          </G8Button>
        </div>
      </G8CardContent>
    </G8Card>
  )
}
