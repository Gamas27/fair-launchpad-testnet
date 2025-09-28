'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Filter,
  Eye,
  BarChart3,
  Coins,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Clock,
  Users
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

interface HomeDashboardProps {
  className?: string
  onTokenClick?: (tokenId: string) => void
}

export const HomeDashboard = ({ className, onTokenClick }: HomeDashboardProps) => {
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
      <Card className="card-gradient border-2 border-cyan-400/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-2xl">G8</CardTitle>
              <CardDescription className="text-gray-300">Your Portfolio</CardDescription>
            </div>
            <Badge className="bg-green-500 text-white text-xs font-bold animate-pulse">LIVE</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Balance Display */}
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-white">${totalBalance.toLocaleString()}</div>
            <div className={cn(
              "flex items-center justify-center gap-1 text-sm",
              portfolioChange >= 0 ? "text-green-400" : "text-red-400"
            )}>
              {portfolioChange >= 0 ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              {Math.abs(portfolioChange)}% today
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Token
            </Button>
            <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
              <TrendingUp className="h-4 w-4 mr-2" />
              Discover
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
          />
        </div>

        <div className="flex gap-2">
          {[
            { id: 'all', label: 'All', count: mockTokens.length },
            { id: 'live', label: 'Live', count: mockTokens.filter(t => t.isLive).length },
            { id: 'trending', label: 'Trending', count: mockTokens.filter(t => t.priceChange > 5).length }
          ].map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.id as any)}
              className={cn(
                selectedFilter === filter.id
                  ? "bg-cyan-500 text-white"
                  : "border-gray-600 text-gray-300 hover:bg-gray-700"
              )}
            >
              {filter.label} ({filter.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Token List */}
      <div className="space-y-3">
        {filteredTokens.map((token) => (
          <Card 
            key={token.id} 
            className="card-gradient border-2 border-gray-700/50 hover:border-cyan-400/50 transition-colors cursor-pointer"
            onClick={() => onTokenClick?.(token.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <Coins className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{token.name}</span>
                      <Badge variant="outline" className="badge-outline text-xs">
                        {token.ticker}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400">
                      {token.timeSinceLaunch} ago
                    </div>
                  </div>
                </div>

                <div className="text-right space-y-1">
                  <div className="font-semibold text-white">
                    ${token.price.toFixed(6)}
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-sm",
                    token.priceChange >= 0 ? "text-green-400" : "text-red-400"
                  )}>
                    {token.priceChange >= 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {Math.abs(token.priceChange)}%
                  </div>
                </div>
              </div>

              {/* Token Stats */}
              <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Volume</div>
                  <div className="text-white font-medium">{token.volume}</div>
                </div>
                <div>
                  <div className="text-gray-400">Market Cap</div>
                  <div className="text-white font-medium">{token.marketCap}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-3 flex gap-2">
                <Button size="sm" className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Trade
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTokens.length === 0 && (
        <Card className="card-gradient border-2 border-gray-700/50">
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto mb-2" />
              <div className="text-lg font-medium">No tokens found</div>
              <div className="text-sm">Try adjusting your search or filters</div>
            </div>
            <Button 
              onClick={() => {
                setSearchQuery('')
                setSelectedFilter('all')
              }}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="card-gradient border-2 border-cyan-400/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400">10K+</div>
            <div className="text-sm text-gray-400">Active Users</div>
          </CardContent>
        </Card>
        <Card className="card-gradient border-2 border-purple-400/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">500+</div>
            <div className="text-sm text-gray-400">Tokens Created</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Graduation Zone Component
export const GraduationZone = ({ className }: { className?: string }) => {
  return (
    <Card className={cn("card-gradient border-2 border-green-400/50", className)}>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Star className="h-5 w-5 text-green-400" />
          G8 Graduation Zone
        </CardTitle>
        <CardDescription className="text-gray-300">
          Advanced features for experienced users
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white">
            <Coins className="h-4 w-4 mr-2" />
            Create & Mint
          </Button>
          <Button variant="outline" className="border-green-400 text-green-400 hover:bg-green-400/10">
            <TrendingUp className="h-4 w-4 mr-2" />
            Stake & Earn
          </Button>
          <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10">
            <BarChart3 className="h-4 w-4 mr-2" />
            Swap & Bridge
          </Button>
          <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
            <Rocket className="h-4 w-4 mr-2" />
            Launchpad
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
