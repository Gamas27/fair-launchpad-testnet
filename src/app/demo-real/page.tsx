'use client'

import React, { useState } from 'react'
import { ScreenV2 } from '@/components/layout/screen-v2'
import { BottomNavV2 } from '@/components/navigation/bottom-nav-v2'
import { TokenCardV2, TokenData } from '@/components/tokens/token-card-v2'
import { CardV2 } from '@/components/ui/card-v2'
import { ButtonV2 } from '@/components/ui/button-v2'
import { Badge } from '@/components/ui/badge'
import { PriceChartV2 } from '@/components/charts/price-chart-v2'
import { useDemoData } from '@/lib/hooks/useDemoData'
import { 
  Plus, 
  TrendingUp, 
  User, 
  Settings,
  DollarSign,
  BarChart3,
  MessageCircle,
  Users,
  Activity,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Heart,
  Share2,
  ExternalLink,
  Loader2
} from 'lucide-react'

export default function DemoRealPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedToken, setSelectedToken] = useState<any>(null)
  const [showCoinProfile, setShowCoinProfile] = useState(false)
  
  const { data, loading, error } = useDemoData()

  const handleTokenClick = (token: any) => {
    setSelectedToken(token)
    setShowCoinProfile(true)
  }

  const renderLoadingScreen = () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-16 w-16 text-cyan-400 animate-spin mx-auto" />
        <p className="text-gray-400">Loading demo data from database...</p>
      </div>
    </div>
  )

  const renderErrorScreen = () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
          <span className="text-2xl">❌</span>
        </div>
        <p className="text-red-400">Error loading demo data: {error}</p>
        <ButtonV2 
          variant="outline" 
          onClick={() => window.location.reload()}
        >
          Retry
        </ButtonV2>
      </div>
    </div>
  )

  const renderHomeScreen = () => {
    if (!data) return null

    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <CardV2 
          variant="gradient" 
          glow 
          className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 animate-fade-in-up"
        >
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent animate-pulse-glow">
              Welcome to G8
            </h1>
            <p className="text-gray-300 animate-fade-in">
              Real data from the database - {data.stats.totalUsers} users, {data.stats.totalTokens} tokens
            </p>
            <ButtonV2 
              gradient="neon" 
              size="lg" 
              className="w-full animate-bounce-in hover:animate-pulse-glow"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Token
            </ButtonV2>
          </div>
        </CardV2>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <CardV2 
            variant="elevated" 
            className="text-center animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            <div className="space-y-2">
              <DollarSign className="h-8 w-8 text-cyan-400 mx-auto animate-float" />
              <div className="text-2xl font-bold text-white">${(data.stats.totalVolume / 1000).toFixed(0)}K</div>
              <div className="text-sm text-gray-400">Total Volume</div>
            </div>
          </CardV2>
          <CardV2 
            variant="elevated" 
            className="text-center animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            <div className="space-y-2">
              <TrendingUp className="h-8 w-8 text-green-400 mx-auto animate-float" />
              <div className="text-2xl font-bold text-white">+12.5%</div>
              <div className="text-sm text-gray-400">24h Change</div>
            </div>
          </CardV2>
        </div>

        {/* Trending Tokens */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white animate-fade-in-left">Live Tokens</h2>
            <ButtonV2 variant="ghost" size="sm" className="animate-fade-in-right">View All</ButtonV2>
          </div>
          
          <div className="space-y-3">
            {data.tokens.map((token, index) => {
              // Parse JSON fields
              const chartData = token.chartData ? JSON.parse(token.chartData) : []
              const socialLinks = token.socialLinks ? JSON.parse(token.socialLinks) : {}
              const teamInfo = token.teamInfo ? JSON.parse(token.teamInfo) : {}
              const repBreakdown = token.repBreakdown ? JSON.parse(token.repBreakdown) : {}
              
              return (
                <div
                  key={token.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <TokenCardV2
                    token={{
                      id: token.id,
                      name: token.name,
                      ticker: token.ticker,
                      logo: token.logo || '🪙',
                      currentPrice: token.ath,
                      priceChange24h: Math.random() * 20 - 10, // Random for demo
                      marketCap: `${(token.marketCap / 1000000).toFixed(1)}M`,
                      volume24h: `${(token.volume / 1000).toFixed(0)}K`,
                      timeSinceLaunch: token.timeSinceLaunch || 'Unknown',
                      isLive: token.isLive,
                      borderColorClass: token.isLive ? 'border-cyan-400/50' : 'border-pink-400/50',
                      bgColorClass: token.isLive ? 'bg-cyan-400/5' : 'bg-pink-400/5',
                    }}
                    onClick={() => handleTokenClick(token)}
                    variant="default"
                    className="hover:animate-pulse-glow cursor-pointer"
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const renderCreateScreen = () => (
    <div className="space-y-6">
      <CardV2 variant="gradient" glow className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 animate-fade-in">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white animate-bounce-in">Create Your Token</h2>
          <p className="text-gray-300 animate-fade-in">
            Launch your token with G8's fair launch mechanism
          </p>
        </div>
      </CardV2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <CardV2 variant="elevated" className="p-4 animate-fade-in-up">
            <h3 className="text-lg font-semibold text-white mb-2">Token Details</h3>
            <p className="text-sm text-gray-400">Define your token's identity and purpose</p>
          </CardV2>
          <CardV2 variant="elevated" className="p-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h3 className="text-lg font-semibold text-white mb-2">Launch Settings</h3>
            <p className="text-sm text-gray-400">Configure launch parameters and timing</p>
          </CardV2>
        </div>
        
        <ButtonV2 
          gradient="primary" 
          size="lg" 
          className="w-full animate-bounce-in hover:animate-pulse-glow"
        >
          <Plus className="h-5 w-5 mr-2" />
          Launch Token
        </ButtonV2>
      </div>
    </div>
  )

  const renderG8Screen = () => (
    <div className="space-y-6">
      <CardV2 variant="gradient" glow className="bg-gradient-to-br from-green-900/20 to-cyan-900/20 animate-fade-in">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white animate-bounce-in">G8 Graduation Zone</h2>
          <p className="text-gray-300 animate-fade-in">
            Create & Win, Graduate & Hold
          </p>
        </div>
      </CardV2>

      <div className="grid grid-cols-1 gap-4">
        <CardV2 variant="elevated" hover className="cursor-pointer animate-fade-in-up hover:animate-pulse-glow">
          <div className="flex items-center space-x-4 p-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-full flex items-center justify-center animate-float">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Create & Win</h3>
              <p className="text-sm text-gray-400">Launch your token and compete for rewards</p>
            </div>
          </div>
        </CardV2>

        <CardV2 variant="elevated" hover className="cursor-pointer animate-fade-in-up hover:animate-pulse-glow" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center space-x-4 p-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-cyan-400 rounded-full flex items-center justify-center animate-float">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">Graduate & Hold</h3>
              <p className="text-sm text-gray-400">Tokens that have graduated to major exchanges</p>
            </div>
          </div>
        </CardV2>
      </div>
    </div>
  )

  const renderProfileScreen = () => {
    if (!data) return null

    const currentUser = data.users[0] // Use first user as current user

    return (
      <div className="space-y-6">
        {/* Profile Header */}
        <CardV2 variant="gradient" glow className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 animate-fade-in">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto animate-float">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white animate-bounce-in">
                {currentUser.walletAddress.slice(0, 8)}...
              </h2>
              <p className="text-gray-400 animate-fade-in capitalize">{currentUser.reputationLevel}</p>
            </div>
          </div>
        </CardV2>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <CardV2 variant="elevated" className="text-center animate-fade-in-up">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">${(currentUser.totalVolume / 1000).toFixed(0)}K</div>
              <div className="text-sm text-gray-400">Volume</div>
            </div>
          </CardV2>
          <CardV2 variant="elevated" className="text-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{currentUser.reputationScore}</div>
              <div className="text-sm text-gray-400">Rep Score</div>
            </div>
          </CardV2>
          <CardV2 variant="elevated" className="text-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{currentUser.totalTrades}</div>
              <div className="text-sm text-gray-400">Trades</div>
            </div>
          </CardV2>
        </div>

        {/* My Tokens */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white animate-fade-in-left">My Tokens</h3>
          <div className="space-y-3">
            {data.tokens.filter(token => token.creatorId === currentUser.id).map((token, index) => (
              <div
                key={token.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <TokenCardV2
                  token={{
                    id: token.id,
                    name: token.name,
                    ticker: token.ticker,
                    logo: token.logo || '🪙',
                    currentPrice: token.ath,
                    priceChange24h: Math.random() * 20 - 10,
                    marketCap: `${(token.marketCap / 1000000).toFixed(1)}M`,
                    volume24h: `${(token.volume / 1000).toFixed(0)}K`,
                    timeSinceLaunch: token.timeSinceLaunch || 'Unknown',
                    isLive: token.isLive,
                    borderColorClass: token.isLive ? 'border-cyan-400/50' : 'border-pink-400/50',
                    bgColorClass: token.isLive ? 'bg-cyan-400/5' : 'bg-pink-400/5',
                  }}
                  onClick={() => handleTokenClick(token)}
                  variant="compact"
                  className="hover:animate-pulse-glow cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderChatScreen = () => {
    if (!data) return null

    return (
      <div className="space-y-6">
        <CardV2 variant="gradient" glow className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-white animate-bounce-in">Community Chat</h2>
            <p className="text-gray-300 animate-fade-in">
              Connect with the G8 community
            </p>
          </div>
        </CardV2>

        <div className="space-y-4">
          {data.chatRooms.map((room, index) => (
            <CardV2 
              key={room.id}
              variant="elevated" 
              hover 
              className="cursor-pointer animate-fade-in-up hover:animate-pulse-glow"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-4 p-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl">{room.avatar || '💬'}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{room.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{room.onlineCount}/{room.membersCount}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{room.description}</p>
                  {room.lastMessage && (
                    <p className="text-xs text-gray-500 mt-1">{room.lastMessage}</p>
                  )}
                </div>
              </div>
            </CardV2>
          ))}
        </div>
      </div>
    )
  }

  const renderCoinProfile = () => {
    if (!selectedToken) return null

    const chartData = selectedToken.chartData ? JSON.parse(selectedToken.chartData) : []
    const socialLinks = selectedToken.socialLinks ? JSON.parse(selectedToken.socialLinks) : {}
    const teamInfo = selectedToken.teamInfo ? JSON.parse(selectedToken.teamInfo) : {}

    return (
      <div className="space-y-6">
        {/* Token Header */}
        <CardV2 variant="gradient" glow className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 animate-fade-in">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto animate-float">
              <span className="text-4xl">{selectedToken.logo || '🪙'}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white animate-bounce-in">{selectedToken.name}</h2>
              <p className="text-gray-400 animate-fade-in">{selectedToken.ticker}</p>
            </div>
          </div>
        </CardV2>

        {/* Price Chart */}
        {chartData.length > 0 && (
          <CardV2 variant="elevated" className="animate-fade-in-up">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Price Chart</h3>
              <PriceChartV2 
                data={chartData} 
                lineColor={selectedToken.isLive ? '#06b6d4' : '#ff6b9d'}
              />
            </div>
          </CardV2>
        )}

        {/* Token Details */}
        <CardV2 variant="elevated" className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold text-white">Token Details</h3>
            {selectedToken.description && (
              <p className="text-gray-300 text-sm">{selectedToken.description}</p>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Market Cap</p>
                <p className="text-lg font-semibold text-white">${(selectedToken.marketCap / 1000000).toFixed(1)}M</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Volume</p>
                <p className="text-lg font-semibold text-white">${(selectedToken.volume / 1000).toFixed(0)}K</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Transactions</p>
                <p className="text-lg font-semibold text-white">{selectedToken.txCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <Badge className={selectedToken.isLive ? "bg-green-500" : "bg-gray-500"}>
                  {selectedToken.isLive ? "LIVE" : "ENDED"}
                </Badge>
              </div>
            </div>
          </div>
        </CardV2>

        {/* Team Info */}
        {teamInfo.founder && (
          <CardV2 variant="elevated" className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="p-4 space-y-4">
              <h3 className="text-lg font-semibold text-white">Team</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Founder: {teamInfo.founder}</p>
                {teamInfo.team && (
                  <p className="text-sm text-gray-400">Team: {teamInfo.team.join(', ')}</p>
                )}
                {teamInfo.advisors && (
                  <p className="text-sm text-gray-400">Advisors: {teamInfo.advisors.join(', ')}</p>
                )}
              </div>
            </div>
          </CardV2>
        )}

        {/* Graduation Story */}
        {selectedToken.gradu8Story && (
          <CardV2 variant="elevated" className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="p-4 space-y-4">
              <h3 className="text-lg font-semibold text-white">Graduation Story</h3>
              <p className="text-gray-300 text-sm">{selectedToken.gradu8Story}</p>
            </div>
          </CardV2>
        )}
      </div>
    )
  }

  const renderContent = () => {
    if (showCoinProfile) {
      return renderCoinProfile()
    }
    
    switch (activeTab) {
      case 'home':
        return renderHomeScreen()
      case 'create':
        return renderCreateScreen()
      case 'g8':
        return renderG8Screen()
      case 'profile':
        return renderProfileScreen()
      case 'chat':
        return renderChatScreen()
      default:
        return renderHomeScreen()
    }
  }

  if (loading) {
    return renderLoadingScreen()
  }

  if (error) {
    return renderErrorScreen()
  }

  return (
    <ScreenV2
      title={showCoinProfile ? selectedToken?.name || 'Token' : 'G8 Real Data'}
      showBackButton={showCoinProfile}
      onBack={() => setShowCoinProfile(false)}
      background="pattern"
      actions={
        !showCoinProfile && (
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
              <MessageCircle className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        )
      }
      footer={
        !showCoinProfile && (
          <BottomNavV2
            items={[
              { id: 'home', label: 'Home', icon: TrendingUp },
              { id: 'create', label: 'Create', icon: Plus },
              { id: 'g8', label: 'G8', icon: BarChart3 },
              { id: 'chat', label: 'Chat', icon: MessageCircle },
              { id: 'profile', label: 'Profile', icon: User },
            ]}
            activeItem={activeTab}
            onItemClick={setActiveTab}
          />
        )
      }
    >
      <div className={`transition-all duration-500 ${data ? 'animate-fade-in' : 'opacity-0'}`}>
        {renderContent()}
      </div>
    </ScreenV2>
  )
}
