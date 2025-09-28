'use client'

import React, { useState, useEffect } from 'react'
import { ScreenV2 } from '@/components/layout/screen-v2'
import { BottomNavV2 } from '@/components/navigation/bottom-nav-v2'
import { TokenCardV2, TokenData } from '@/components/tokens/token-card-v2'
import { CardV2 } from '@/components/ui/card-v2'
import { ButtonV2 } from '@/components/ui/button-v2'
import { InputV2 } from '@/components/ui/input-v2'
import { Badge } from '@/components/ui/badge'
import { PriceChartV2 } from '@/components/charts/price-chart-v2'
import { 
  Plus, 
  Search, 
  TrendingUp, 
  User, 
  Settings,
  DollarSign,
  Clock,
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
  ExternalLink
} from 'lucide-react'

// Types for our demo data
interface DemoUser {
  id: string
  walletAddress: string
  reputationScore: number
  reputationLevel: string
  totalTrades: number
  totalVolume: number
  marketCap?: number
}

interface DemoToken {
  id: string
  name: string
  ticker: string
  logo: string
  description: string
  marketCap: number
  ath: number
  volume: number
  txCount: number
  isLive: boolean
  timeSinceLaunch: string
  chartData: any[]
  socialLinks: any
  teamInfo: any
  gradu8Story: string
  repBreakdown: any
  priceHistory: any[]
  recentActivity: any[]
  creator: DemoUser
}

interface DemoChatRoom {
  id: string
  name: string
  type: string
  description: string
  repRequirement: number
  membersCount: number
  onlineCount: number
  avatar: string
  lastMessage: string
  lastMessageTime: string
}

interface DemoStats {
  totalVolume: number
  totalUsers: number
  totalTokens: number
  totalTrades: number
  marketCap24h: number
  volume24h: number
}

export default function DemoFullPage() {
  const [activeTab, setActiveTab] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedToken, setSelectedToken] = useState<DemoToken | null>(null)
  const [showCreateToken, setShowCreateToken] = useState(false)
  const [showCoinProfile, setShowCoinProfile] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Mock data - in a real app, this would come from API calls
  const [tokens, setTokens] = useState<DemoToken[]>([])
  const [chatRooms, setChatRooms] = useState<DemoChatRoom[]>([])
  const [stats, setStats] = useState<DemoStats | null>(null)
  const [user, setUser] = useState<DemoUser | null>(null)

  // Load demo data on mount
  useEffect(() => {
    const loadDemoData = async () => {
      try {
        // Simulate API calls to load data
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock data based on our seeded database
        const mockTokens: DemoToken[] = [
          {
            id: '1',
            name: 'MemeCoin',
            ticker: 'MEME',
            logo: '🔥',
            description: 'The ultimate meme token for the decentralized future. Built by the community, for the community.',
            marketCap: 1200000,
            ath: 0.0035,
            volume: 800000,
            txCount: 1250,
            isLive: true,
            timeSinceLaunch: '3h',
            chartData: [
              { time: '00:00', price: 0.0001 },
              { time: '01:00', price: 0.00012 },
              { time: '02:00', price: 0.00015 },
              { time: '03:00', price: 0.00018 },
              { time: '04:00', price: 0.00022 },
              { time: '05:00', price: 0.00025 },
            ],
            socialLinks: {
              twitter: 'https://twitter.com/memecoin',
              telegram: 'https://t.me/memecoin',
              discord: 'https://discord.gg/memecoin',
            },
            teamInfo: {
              founder: 'Satoshi Nakamoto',
              team: ['Alice', 'Bob', 'Charlie'],
              advisors: ['Vitalik Buterin', 'Elon Musk'],
            },
            gradu8Story: 'MemeCoin started as a joke but quickly became a serious project with a passionate community.',
            repBreakdown: {
              community: 40,
              trading: 30,
              holding: 20,
              social: 10,
            },
            priceHistory: [
              { timestamp: '2024-01-01T00:00:00Z', price: 0.0001 },
              { timestamp: '2024-01-01T01:00:00Z', price: 0.00012 },
              { timestamp: '2024-01-01T02:00:00Z', price: 0.00015 },
            ],
            recentActivity: [
              { type: 'trade', user: '0x1234...', amount: 1000, timestamp: '2024-01-01T03:00:00Z' },
              { type: 'listing', exchange: 'Uniswap', timestamp: '2024-01-01T02:30:00Z' },
            ],
            creator: {
              id: '1',
              walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
              reputationScore: 850,
              reputationLevel: 'expert',
              totalTrades: 45,
              totalVolume: 125000.50,
              marketCap: 2500000.00,
            }
          },
          {
            id: '2',
            name: 'DoggyCoin',
            ticker: 'DOGE',
            logo: '🐶',
            description: 'The most loyal token in the crypto space. Much wow, very moon!',
            marketCap: 800000,
            ath: 0.0025,
            volume: 450000,
            txCount: 890,
            isLive: false,
            timeSinceLaunch: '8h',
            chartData: [
              { time: '00:00', price: 0.0008 },
              { time: '02:00', price: 0.0012 },
              { time: '04:00', price: 0.0015 },
              { time: '06:00', price: 0.0018 },
              { time: '08:00', price: 0.0016 },
            ],
            socialLinks: {
              twitter: 'https://twitter.com/doggycoin',
              telegram: 'https://t.me/doggycoin',
            },
            teamInfo: {
              founder: 'Doge Master',
              team: ['Doge Dev', 'Doge Designer'],
            },
            gradu8Story: 'DoggyCoin brings the fun back to crypto with its loyal community and meme-worthy moments.',
            repBreakdown: {
              community: 50,
              trading: 25,
              holding: 15,
              social: 10,
            },
            priceHistory: [
              { timestamp: '2024-01-01T00:00:00Z', price: 0.0008 },
              { timestamp: '2024-01-01T02:00:00Z', price: 0.0012 },
            ],
            recentActivity: [
              { type: 'trade', user: '0x5678...', amount: 500, timestamp: '2024-01-01T07:00:00Z' },
            ],
            creator: {
              id: '2',
              walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
              reputationScore: 650,
              reputationLevel: 'advanced',
              totalTrades: 28,
              totalVolume: 75000.25,
              marketCap: 1800000.00,
            }
          },
          {
            id: '3',
            name: 'SpaceCoin',
            ticker: 'SPCE',
            logo: '🚀',
            description: 'To the moon and beyond! SpaceCoin is the future of interplanetary commerce.',
            marketCap: 2500000,
            ath: 0.0045,
            volume: 1200000,
            txCount: 2100,
            isLive: true,
            timeSinceLaunch: '1d',
            chartData: [
              { time: '00:00', price: 0.002 },
              { time: '06:00', price: 0.0025 },
              { time: '12:00', price: 0.003 },
              { time: '18:00', price: 0.0035 },
              { time: '24:00', price: 0.0042 },
            ],
            socialLinks: {
              twitter: 'https://twitter.com/spacecoin',
              telegram: 'https://t.me/spacecoin',
              discord: 'https://discord.gg/spacecoin',
              website: 'https://spacecoin.io',
            },
            teamInfo: {
              founder: 'Elon Musk',
              team: ['Space Dev', 'Rocket Engineer', 'Moon Specialist'],
              advisors: ['Neil Armstrong', 'Buzz Aldrin'],
            },
            gradu8Story: 'SpaceCoin represents the next frontier in cryptocurrency, aiming to become the standard for space-based transactions.',
            repBreakdown: {
              community: 35,
              trading: 40,
              holding: 20,
              social: 5,
            },
            priceHistory: [
              { timestamp: '2024-01-01T00:00:00Z', price: 0.002 },
              { timestamp: '2024-01-01T12:00:00Z', price: 0.003 },
            ],
            recentActivity: [
              { type: 'trade', user: '0x9abc...', amount: 2000, timestamp: '2024-01-01T23:00:00Z' },
              { type: 'listing', exchange: 'Binance', timestamp: '2024-01-01T22:00:00Z' },
            ],
            creator: {
              id: '3',
              walletAddress: '0x9876543210fedcba9876543210fedcba98765432',
              reputationScore: 320,
              reputationLevel: 'intermediate',
              totalTrades: 12,
              totalVolume: 25000.75,
              marketCap: 500000.00,
            }
          },
        ]

        const mockChatRooms: DemoChatRoom[] = [
          {
            id: '1',
            name: 'General',
            type: 'public',
            description: 'General discussion about G8 and tokens',
            repRequirement: 0,
            membersCount: 150,
            onlineCount: 25,
            avatar: '💬',
            lastMessage: 'Welcome to G8!',
            lastMessageTime: '2024-01-01T15:00:00Z',
          },
          {
            id: '2',
            name: 'MemeCoin Chat',
            type: 'coin',
            description: 'Discussion about MemeCoin',
            repRequirement: 100,
            membersCount: 75,
            onlineCount: 12,
            avatar: '🔥',
            lastMessage: 'MemeCoin to the moon!',
            lastMessageTime: '2024-01-01T14:30:00Z',
          },
          {
            id: '3',
            name: 'SpaceCoin Community',
            type: 'coin',
            description: 'SpaceCoin community discussions',
            repRequirement: 200,
            membersCount: 120,
            onlineCount: 18,
            avatar: '🚀',
            lastMessage: 'Ready for launch!',
            lastMessageTime: '2024-01-01T14:45:00Z',
          },
        ]

        const mockStats: DemoStats = {
          totalVolume: 2500000,
          totalUsers: 1250,
          totalTokens: 45,
          totalTrades: 12500,
          marketCap24h: 8500000,
          volume24h: 1200000,
        }

        const mockUser: DemoUser = {
          id: '1',
          walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
          reputationScore: 850,
          reputationLevel: 'expert',
          totalTrades: 45,
          totalVolume: 125000.50,
          marketCap: 2500000.00,
        }

        setTokens(mockTokens)
        setChatRooms(mockChatRooms)
        setStats(mockStats)
        setUser(mockUser)
        setIsLoaded(true)
      } catch (error) {
        console.error('Error loading demo data:', error)
      }
    }

    loadDemoData()
  }, [])

  const handleTokenClick = (token: DemoToken) => {
    setSelectedToken(token)
    setShowCoinProfile(true)
  }

  const renderHomeScreen = () => (
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
            Explore the decentralized future, connect, create, and transact securely.
          </p>
          <ButtonV2 
            gradient="neon" 
            size="lg" 
            className="w-full animate-bounce-in hover:animate-pulse-glow"
            onClick={() => setShowCreateToken(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Token
          </ButtonV2>
        </div>
      </CardV2>

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-2 gap-4">
          <CardV2 
            variant="elevated" 
            className="text-center animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            <div className="space-y-2">
              <DollarSign className="h-8 w-8 text-cyan-400 mx-auto animate-float" />
              <div className="text-2xl font-bold text-white">${(stats.totalVolume / 1000000).toFixed(1)}M</div>
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
      )}

      {/* Trending Tokens */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white animate-fade-in-left">Trending Tokens</h2>
          <ButtonV2 variant="ghost" size="sm" className="animate-fade-in-right">View All</ButtonV2>
        </div>
        
        <div className="space-y-3">
          {tokens.map((token, index) => (
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
                  logo: token.logo,
                  currentPrice: token.ath,
                  priceChange24h: Math.random() * 20 - 10, // Random price change for demo
                  marketCap: `${(token.marketCap / 1000000).toFixed(1)}M`,
                  volume24h: `${(token.volume / 1000).toFixed(0)}K`,
                  timeSinceLaunch: token.timeSinceLaunch,
                  isLive: token.isLive,
                  borderColorClass: token.isLive ? 'border-cyan-400/50' : 'border-pink-400/50',
                  bgColorClass: token.isLive ? 'bg-cyan-400/5' : 'bg-pink-400/5',
                }}
                onClick={() => handleTokenClick(token)}
                variant="default"
                className="hover:animate-pulse-glow cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )

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
        <InputV2
          label="Token Name"
          placeholder="Enter token name"
          icon={<User className="h-4 w-4" />}
          className="animate-fade-in-up"
        />
        <InputV2
          label="Token Symbol"
          placeholder="Enter token symbol"
          icon={<TrendingUp className="h-4 w-4" />}
          className="animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        />
        <InputV2
          label="Description"
          placeholder="Describe your token"
          icon={<BarChart3 className="h-4 w-4" />}
          className="animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        />
        
        <ButtonV2 
          gradient="primary" 
          size="lg" 
          className="w-full animate-bounce-in hover:animate-pulse-glow"
          style={{ animationDelay: '300ms' }}
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
          <div className="flex items-center space-x-4">
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
          <div className="flex items-center space-x-4">
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

  const renderProfileScreen = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      {user && (
        <CardV2 variant="gradient" glow className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 animate-fade-in">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto animate-float">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white animate-bounce-in">@{user.walletAddress.slice(0, 8)}...</h2>
              <p className="text-gray-400 animate-fade-in capitalize">{user.reputationLevel} Creator</p>
            </div>
          </div>
        </CardV2>
      )}

      {/* Stats */}
      {user && (
        <div className="grid grid-cols-3 gap-4">
          <CardV2 variant="elevated" className="text-center animate-fade-in-up">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">${(user.totalVolume / 1000).toFixed(0)}K</div>
              <div className="text-sm text-gray-400">Portfolio</div>
            </div>
          </CardV2>
          <CardV2 variant="elevated" className="text-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{user.reputationScore}</div>
              <div className="text-sm text-gray-400">Rep Score</div>
            </div>
          </CardV2>
          <CardV2 variant="elevated" className="text-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-white">{user.totalTrades}</div>
              <div className="text-sm text-gray-400">Trades</div>
            </div>
          </CardV2>
        </div>
      )}

      {/* My Tokens */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white animate-fade-in-left">My Tokens</h3>
        <div className="space-y-3">
          {tokens.slice(0, 2).map((token, index) => (
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
                  logo: token.logo,
                  currentPrice: token.ath,
                  priceChange24h: Math.random() * 20 - 10,
                  marketCap: `${(token.marketCap / 1000000).toFixed(1)}M`,
                  volume24h: `${(token.volume / 1000).toFixed(0)}K`,
                  timeSinceLaunch: token.timeSinceLaunch,
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

  const renderChatScreen = () => (
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
        {chatRooms.map((room, index) => (
          <CardV2 
            key={room.id}
            variant="elevated" 
            hover 
            className="cursor-pointer animate-fade-in-up hover:animate-pulse-glow"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center space-x-4 p-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-full flex items-center justify-center">
                <span className="text-2xl">{room.avatar}</span>
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
                <p className="text-xs text-gray-500 mt-1">{room.lastMessage}</p>
              </div>
            </div>
          </CardV2>
        ))}
      </div>
    </div>
  )

  const renderCoinProfile = () => {
    if (!selectedToken) return null

    return (
      <div className="space-y-6">
        {/* Token Header */}
        <CardV2 variant="gradient" glow className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 animate-fade-in">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto animate-float">
              <span className="text-4xl">{selectedToken.logo}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white animate-bounce-in">{selectedToken.name}</h2>
              <p className="text-gray-400 animate-fade-in">{selectedToken.ticker}</p>
            </div>
          </div>
        </CardV2>

        {/* Price Chart */}
        <CardV2 variant="elevated" className="animate-fade-in-up">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Price Chart</h3>
            <PriceChartV2 
              data={selectedToken.chartData} 
              lineColor={selectedToken.isLive ? '#06b6d4' : '#ff6b9d'}
            />
          </div>
        </CardV2>

        {/* Token Details */}
        <CardV2 variant="elevated" className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold text-white">Token Details</h3>
            <p className="text-gray-300 text-sm">{selectedToken.description}</p>
            
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
        <CardV2 variant="elevated" className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold text-white">Team</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Founder: {selectedToken.teamInfo.founder}</p>
              <p className="text-sm text-gray-400">Team: {selectedToken.teamInfo.team.join(', ')}</p>
              {selectedToken.teamInfo.advisors && (
                <p className="text-sm text-gray-400">Advisors: {selectedToken.teamInfo.advisors.join(', ')}</p>
              )}
            </div>
          </div>
        </CardV2>

        {/* Graduation Story */}
        <CardV2 variant="elevated" className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold text-white">Graduation Story</h3>
            <p className="text-gray-300 text-sm">{selectedToken.gradu8Story}</p>
          </div>
        </CardV2>
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

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400">Loading demo data...</p>
        </div>
      </div>
    )
  }

  return (
    <ScreenV2
      title={showCoinProfile ? selectedToken?.name || 'Token' : 'G8'}
      showBackButton={showCoinProfile}
      onBack={() => setShowCoinProfile(false)}
      background="pattern"
      actions={
        !showCoinProfile && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowChat(!showChat)}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
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
      <div className={`transition-all duration-500 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
        {renderContent()}
      </div>
    </ScreenV2>
  )
}
