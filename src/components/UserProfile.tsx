'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  User, 
  Wallet, 
  Trophy, 
  Star, 
  Shield,
  Zap,
  Activity,
  DollarSign,
  BarChart3,
  Copy
} from "lucide-react"
import { useState, useEffect } from "react"
import { useSafeWorldId } from "@/providers/SafeWorldIdProvider"

interface UserData {
  walletAddress: string
  worldIdHash: string
  verificationLevel: string
  reputationScore: number
  reputationLevel: string
  totalTrades: number
  totalVolume: number
  lastActivity: string
  isBanned: boolean
  riskScore: number
  allocationCap: number
  usedAllocation: number
  marketCap?: number
  createdAt: string
}

interface TokenHolding {
  tokenAddress: string
  tokenName: string
  tokenSymbol: string
  amount: number
  value: number
  price: number
  change24h: number
}

interface LaunchedToken {
  address: string
  name: string
  symbol: string
  description: string
  imageUrl?: string
  currentPrice: number
  totalVolume: number
  totalTrades: number
  marketCap: number
  status: string
  launchDate: string
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  rarity: string
  unlockedAt: string
}

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [holdings, setHoldings] = useState<TokenHolding[]>([])
  const [launchedTokens, setLaunchedTokens] = useState<LaunchedToken[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'holdings' | 'launched' | 'achievements'>('overview')
  const { isVerified } = useSafeWorldId()

  useEffect(() => {
    fetchUserData()
    generateMockData()
  }, [])

  const fetchUserData = async () => {
    try {
      // In a real app, this would fetch from /api/user/me
      // For now, we'll use mock data
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      setLoading(false)
    }
  }

  const generateMockData = () => {
    // Mock user data
    setUserData({
      walletAddress: '0x1234567890123456789012345678901234567890',
      worldIdHash: 'world_id_hash_123',
      verificationLevel: 'orb',
      reputationScore: 1250,
      reputationLevel: 'Gold',
      totalTrades: 47,
      totalVolume: 12500,
      lastActivity: new Date().toISOString(),
      isBanned: false,
      riskScore: 0.05,
      allocationCap: 1000,
      usedAllocation: 750,
      marketCap: 50000,
      createdAt: '2024-01-15T10:30:00Z'
    })

    // Mock holdings
    setHoldings([
      {
        tokenAddress: '0x1111111111111111111111111111111111111111',
        tokenName: 'FairLaunch Token',
        tokenSymbol: 'FLT',
        amount: 5000,
        value: 750,
        price: 0.15,
        change24h: 12.5
      },
      {
        tokenAddress: '0x2222222222222222222222222222222222222222',
        tokenName: 'HumanCoin',
        tokenSymbol: 'HUMAN',
        amount: 2000,
        value: 500,
        price: 0.25,
        change24h: -3.2
      },
      {
        tokenAddress: '0x3333333333333333333333333333333333333333',
        tokenName: 'Reputation Token',
        tokenSymbol: 'REP',
        amount: 10000,
        value: 800,
        price: 0.08,
        change24h: 8.7
      }
    ])

    // Mock launched tokens
    setLaunchedTokens([
      {
        address: '0x4444444444444444444444444444444444444444',
        name: 'MyLaunch Token',
        symbol: 'MLT',
        description: 'My first token launch',
        imageUrl: 'https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=MLT',
        currentPrice: 0.05,
        totalVolume: 5000,
        totalTrades: 25,
        marketCap: 25000,
        status: 'active',
        launchDate: '2024-09-20T14:30:00Z'
      },
      {
        address: '0x5555555555555555555555555555555555555555',
        name: 'Community Coin',
        symbol: 'CC',
        description: 'Community-driven token',
        imageUrl: 'https://via.placeholder.com/100x100/10B981/FFFFFF?text=CC',
        currentPrice: 0.12,
        totalVolume: 8000,
        totalTrades: 40,
        marketCap: 12000,
        status: 'launching',
        launchDate: '2024-09-22T09:15:00Z'
      }
    ])

    // Mock achievements
    setAchievements([
      {
        id: 'first_trade',
        title: 'First Trade',
        description: 'Completed your first trade',
        icon: '🎯',
        rarity: 'common',
        unlockedAt: '2024-01-15T10:30:00Z'
      },
      {
        id: 'volume_master',
        title: 'Volume Master',
        description: 'Traded over $10,000 in volume',
        icon: '💰',
        rarity: 'rare',
        unlockedAt: '2024-08-15T16:45:00Z'
      },
      {
        id: 'token_creator',
        title: 'Token Creator',
        description: 'Successfully launched your first token',
        icon: '🚀',
        rarity: 'epic',
        unlockedAt: '2024-09-20T14:30:00Z'
      },
      {
        id: 'gold_reputation',
        title: 'Gold Reputation',
        description: 'Achieved Gold reputation level',
        icon: '🏆',
        rarity: 'legendary',
        unlockedAt: '2024-09-10T12:00:00Z'
      }
    ])
  }

  const getReputationColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'gold':
        return 'text-yellow-500 bg-yellow-500/10'
      case 'silver':
        return 'text-gray-400 bg-gray-500/10'
      case 'bronze':
        return 'text-orange-500 bg-orange-500/10'
      default:
        return 'text-gray-500 bg-gray-500/10'
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendary':
        return 'text-purple-500 bg-purple-500/10'
      case 'epic':
        return 'text-blue-500 bg-blue-500/10'
      case 'rare':
        return 'text-green-500 bg-green-500/10'
      case 'common':
        return 'text-gray-500 bg-gray-500/10'
      default:
        return 'text-gray-500 bg-gray-500/10'
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-cyan-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-gray-400">Unable to load user profile.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <div className="bg-card/30 backdrop-blur-sm border-b border-gray-700/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold">
                {userData.walletAddress.slice(2, 4).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold">User Profile</h1>
                <div className="flex items-center space-x-2">
                  <span className="text-lg text-gray-400">{formatAddress(userData.walletAddress)}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(userData.walletAddress)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={getReputationColor(userData.reputationLevel)}>
                {userData.reputationLevel}
              </Badge>
              <Badge className="bg-green-500">
                {userData.verificationLevel.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg mb-6">
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'holdings', label: 'Holdings', icon: Wallet },
            { id: 'launched', label: 'Launched', icon: Zap },
            { id: 'achievements', label: 'Achievements', icon: Trophy }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === id
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab(id as 'overview' | 'holdings' | 'achievements' | 'settings')}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Value</p>
                      <p className="text-2xl font-bold text-cyan-400">${holdings.reduce((sum, h) => sum + h.value, 0).toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-cyan-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Reputation Score</p>
                      <p className="text-2xl font-bold text-green-400">{userData.reputationScore}</p>
                    </div>
                    <Star className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Trades</p>
                      <p className="text-2xl font-bold text-blue-400">{userData.totalTrades}</p>
                    </div>
                    <Activity className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Volume Traded</p>
                      <p className="text-2xl font-bold text-purple-400">${userData.totalVolume.toLocaleString()}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Information */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-400" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Wallet Address</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{formatAddress(userData.walletAddress)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(userData.walletAddress)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">World ID Verified</span>
                      <Badge className="bg-green-500">✅ {userData.verificationLevel}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Reputation Level</span>
                      <Badge className={getReputationColor(userData.reputationLevel)}>
                        {userData.reputationLevel}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Member Since</span>
                      <span className="font-semibold">{new Date(userData.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Activity</span>
                      <span className="font-semibold">{new Date(userData.lastActivity).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    Security & Risk
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Risk Score</span>
                      <Badge className={userData.riskScore < 0.1 ? "bg-green-500" : "bg-yellow-500"}>
                        {userData.riskScore.toFixed(2)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Allocation Cap</span>
                      <span className="font-semibold">{userData.allocationCap} WLD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Used Allocation</span>
                      <span className="font-semibold">{userData.usedAllocation} WLD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Available</span>
                      <span className="font-semibold text-green-400">
                        {userData.allocationCap - userData.usedAllocation} WLD
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account Status</span>
                      <Badge className={userData.isBanned ? "bg-red-500" : "bg-green-500"}>
                        {userData.isBanned ? "Banned" : "Active"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Holdings Tab */}
        {activeTab === 'holdings' && (
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-cyan-400" />
                  Token Holdings
                </CardTitle>
                <CardDescription>
                  Your current token portfolio and values
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {holdings.map((holding) => (
                    <div key={holding.tokenAddress} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-lg font-bold">
                          {holding.tokenSymbol.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold">{holding.tokenName}</div>
                          <div className="text-sm text-gray-400">{holding.tokenSymbol}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{holding.amount.toLocaleString()} {holding.tokenSymbol}</div>
                        <div className="text-sm text-gray-400">${holding.value.toLocaleString()}</div>
                        <div className={`text-sm ${holding.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {holding.change24h >= 0 ? '+' : ''}{holding.change24h.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Launched Tokens Tab */}
        {activeTab === 'launched' && (
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-green-400" />
                  Launched Tokens
                </CardTitle>
                <CardDescription>
                  Tokens you have successfully launched
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {launchedTokens.map((token) => (
                    <div key={token.address} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        {token.imageUrl && (
                          <img 
                            src={token.imageUrl} 
                            alt={token.symbol}
                            className="w-12 h-12 rounded-full"
                          />
                        )}
                        <div>
                          <div className="font-semibold">{token.name}</div>
                          <div className="text-sm text-gray-400">{token.symbol}</div>
                          <div className="text-xs text-gray-500">{token.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${token.currentPrice.toFixed(4)}</div>
                        <div className="text-sm text-gray-400">${token.marketCap.toLocaleString()} MC</div>
                        <Badge className={token.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}>
                          {token.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-yellow-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  Your earned achievements and milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold">{achievement.title}</div>
                        <div className="text-sm text-gray-400">{achievement.description}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
