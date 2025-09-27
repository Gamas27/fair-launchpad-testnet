'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Home,
  Search,
  MessageCircle,
  Wallet,
  Plus,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Star,
  BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================================================
// NAVIGATION MODULE V1 - FUTURISTIC MOBILE INTERFACE
// ============================================================================

interface TokenData {
  id: string
  symbol: string
  name: string
  marketCap: string
  change: number
  changePercent: string
  status?: 'NEW' | 'GRADUATED' | 'LIVE'
  graphData: number[]
  icon: string
  color: 'cyan' | 'pink' | 'green' | 'purple'
}

interface NavigationModuleProps {
  className?: string
  onTokenSelect?: (token: TokenData) => void
}

// Mock token data based on the image
const mockTokens: TokenData[] = [
  {
    id: '1',
    symbol: 'ARC',
    name: 'ARCADE COIN',
    marketCap: '$1.2B',
    change: 5.25,
    changePercent: '+5.25%',
    status: 'LIVE',
    graphData: [100, 105, 98, 110, 115, 108, 125],
    icon: '🎮',
    color: 'cyan'
  },
  {
    id: '2',
    symbol: 'GRT',
    name: 'GAME TOKEN',
    marketCap: '$800M',
    change: 1.12,
    changePercent: '+1.12%',
    status: 'GRADUATED',
    graphData: [80, 85, 82, 88, 90, 87, 91],
    icon: '🎯',
    color: 'pink'
  },
  {
    id: '3',
    symbol: 'NXT',
    name: 'NEXUS COIN',
    marketCap: '$752B',
    change: -1.50,
    changePercent: '-1.50%',
    status: 'NEW',
    graphData: [120, 118, 125, 122, 119, 124, 121],
    icon: '⚡',
    color: 'cyan'
  }
]

// Navigation tabs
const navigationTabs = [
  { id: 'home', label: 'Home', icon: Home, active: true },
  { id: 'search', label: 'Search', icon: Search, active: false },
  { id: 'chat', label: 'Chat', icon: MessageCircle, active: false },
  { id: 'wallet', label: 'Wallet', icon: Wallet, active: false },
  { id: 'create', label: 'Create', icon: Plus, active: false }
]

// Mini chart component
const MiniChart = ({ data, color }: { data: number[], color: string }) => {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = ((max - value) / range) * 100
    return `${x},${y}`
  }).join(' ')

  const colorClass = {
    cyan: 'stroke-cyan-400',
    pink: 'stroke-pink-400',
    green: 'stroke-green-400',
    purple: 'stroke-purple-400'
  }[color] || 'stroke-cyan-400'

  return (
    <div className="w-16 h-8">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={cn("opacity-80", colorClass)}
        />
      </svg>
    </div>
  )
}

// Token card component
const TokenCard = ({ token, onClick }: { token: TokenData, onClick?: () => void }) => {
  const colorClasses = {
    cyan: 'border-cyan-400/50 bg-cyan-400/5',
    pink: 'border-pink-400/50 bg-pink-400/5',
    green: 'border-green-400/50 bg-green-400/5',
    purple: 'border-purple-400/50 bg-purple-400/5'
  }

  const statusColors = {
    NEW: 'bg-blue-500 text-white',
    GRADUATED: 'bg-purple-500 text-white',
    LIVE: 'bg-green-500 text-white'
  }

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg",
        "border-2 rounded-xl p-4 mb-3",
        colorClasses[token.color],
        "hover:shadow-cyan-400/20 hover:shadow-lg"
      )}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-2xl">
              {token.icon}
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">REP</div>
              <div className="text-xl font-bold text-white">{token.symbol}</div>
              <div className="text-sm text-gray-300">{token.name}</div>
            </div>
          </div>
          {token.status && (
            <Badge className={cn("text-xs font-bold", statusColors[token.status])}>
              {token.status}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-white">MC: {token.marketCap}</div>
            <div className={cn(
              "text-sm font-medium",
              token.change >= 0 ? "text-green-400" : "text-red-400"
            )}>
              {token.changePercent}
            </div>
          </div>
          <MiniChart data={token.graphData} color={token.color} />
        </div>
      </CardContent>
    </Card>
  )
}

// Bottom navigation component
const BottomNavigation = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: string) => void }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-gray-800/50">
      <div className="flex items-center justify-around py-2">
        {navigationTabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-300",
                isActive 
                  ? "text-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20" 
                  : "text-gray-400 hover:text-cyan-300"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 transition-all duration-300",
                isActive && "drop-shadow-lg"
              )} />
              <span className={cn(
                "text-xs font-medium transition-all duration-300",
                isActive && "text-cyan-400"
              )}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Main navigation interface
export const NavigationInterface = ({ 
  className, 
  onTokenSelect 
}: NavigationModuleProps) => {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedToken, setSelectedToken] = useState<TokenData | null>(null)

  const handleTokenClick = (token: TokenData) => {
    setSelectedToken(token)
    if (onTokenSelect) {
      onTokenSelect(token)
    }
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className={cn("min-h-screen bg-black text-white", className)}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              FairLaunch
            </div>
            <Badge className="bg-green-500 text-white text-xs font-bold animate-pulse">
              LIVE
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Activity className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Zap className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20 px-4 pt-4">
        {/* Token List */}
        <div className="space-y-3">
          {mockTokens.map((token) => (
            <TokenCard 
              key={token.id} 
              token={token} 
              onClick={() => handleTokenClick(token)}
            />
          ))}
        </div>

        {/* Selected Token Details */}
        {selectedToken && (
          <Card className="mt-6 border-2 border-cyan-400/50 bg-cyan-400/5 rounded-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                {selectedToken.symbol} Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Market Cap</div>
                  <div className="text-lg font-bold text-white">{selectedToken.marketCap}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">24h Change</div>
                  <div className={cn(
                    "text-lg font-bold",
                    selectedToken.change >= 0 ? "text-green-400" : "text-red-400"
                  )}>
                    {selectedToken.changePercent}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}

// Main navigation page
export const NavigationModulePage = () => {
  const [selectedToken, setSelectedToken] = useState<TokenData | null>(null)

  const handleTokenSelect = (token: TokenData) => {
    setSelectedToken(token)
    console.log('Selected token:', token)
  }

  return (
    <div className="min-h-screen bg-black">
      <NavigationInterface onTokenSelect={handleTokenSelect} />
    </div>
  )
}

// ============================================================================
// NAVIGATION MODULE V1 - EXPORTS
// ============================================================================

export const NavigationModuleV1 = {
  version: 'v1.0.0',
  name: 'Navigation Module',
  
  // Components
  NavigationInterface,
  NavigationModulePage,
  
  // Metadata
  features: {
    bottomNavigation: true,
    tokenCards: true,
    miniCharts: true,
    statusBadges: true,
    mobileOptimized: true,
    futuristicDesign: true
  }
}
