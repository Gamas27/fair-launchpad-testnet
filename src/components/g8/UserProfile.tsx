'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  User,
  Wallet,
  Shield,
  Settings,
  Bell,
  Globe,
  HelpCircle,
  LogOut,
  Edit,
  Save,
  Copy,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Coins,
  Star,
  Clock,
  Activity,
  BarChart3,
  MessageCircle,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface UserProfileProps {
  onBack: () => void
  className?: string
}

interface UserStats {
  reputationScore: number
  reputationLevel: string
  totalTrades: number
  totalVolume: number
  tokensCreated: number
  tokensHeld: number
  joinDate: string
  lastActive: string
}

interface TradeHistory {
  id: string
  type: 'buy' | 'sell'
  token: string
  amount: string
  price: string
  value: string
  timestamp: string
  status: 'completed' | 'pending' | 'failed'
}

export const UserProfile = ({ onBack, className }: UserProfileProps) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [showPrivateKey, setShowPrivateKey] = useState(false)

  // Mock user data
  const userData = {
    id: 'user_123',
    username: '@kenseiHatanaka',
    displayName: 'Kensei Hatanaka',
    avatar: '/api/placeholder/80/80',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    worldIdHash: 'hash_123456789',
    verificationLevel: 'Orb' as 'Device' | 'Phone' | 'Orb',
    isWorldIdVerified: true,
    isWalletConnected: true,
    createdAt: '2024-01-15',
    lastActive: '2024-01-20'
  }

  const userStats: UserStats = {
    reputationScore: 2151,
    reputationLevel: 'Gold',
    totalTrades: 3150,
    totalVolume: 10945,
    tokensCreated: 3,
    tokensHeld: 12,
    joinDate: '2024-01-15',
    lastActive: '2 hours ago'
  }

  const tradeHistory: TradeHistory[] = [
    {
      id: '1',
      type: 'buy',
      token: 'MEME',
      amount: '1000',
      price: '0.001',
      value: '1.0',
      timestamp: '2h ago',
      status: 'completed'
    },
    {
      id: '2',
      type: 'sell',
      token: 'DOGE',
      amount: '500',
      price: '0.08',
      value: '40.0',
      timestamp: '5h ago',
      status: 'completed'
    },
    {
      id: '3',
      type: 'buy',
      token: 'PEPE',
      amount: '1000000',
      price: '0.000012',
      value: '12.0',
      timestamp: '1d ago',
      status: 'completed'
    }
  ]

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getReputationColor = (level: string) => {
    switch (level) {
      case 'Gold': return 'text-yellow-400'
      case 'Silver': return 'text-gray-400'
      case 'Bronze': return 'text-orange-400'
      default: return 'text-gray-400'
    }
  }

  const getTradeIcon = (type: 'buy' | 'sell') => {
    return type === 'buy' ? (
      <TrendingUp className="h-4 w-4 text-green-400" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-400" />
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400'
      case 'pending': return 'text-yellow-400'
      case 'failed': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className={cn("min-h-screen bg-black text-white", className)}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
        <div className="flex items-center justify-between p-3">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="text-lg font-bold gradient-text">Profile</div>
          <Button 
            variant="ghost" 
            onClick={() => setIsEditing(!isEditing)}
            className="text-gray-400 hover:text-white"
          >
            {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <Card className="card-gradient border-2 border-cyan-400/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
                <User className="h-10 w-10 text-cyan-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-white">{userData.displayName}</h1>
                  <Badge className={cn("text-white", getReputationColor(userStats.reputationLevel))}>
                    {userStats.reputationLevel}
                  </Badge>
                </div>
                <div className="text-sm text-gray-400">{userData.username}</div>
                <div className="text-xs text-gray-500">
                  Joined {new Date(userData.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{userStats.reputationScore}</div>
                <div className="text-xs text-gray-400">REP Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{userStats.totalTrades}</div>
                <div className="text-xs text-gray-400">Trades</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{userStats.tokensCreated}</div>
                <div className="text-xs text-gray-400">Created</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="overview" className="text-gray-300 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="wallet" className="text-gray-300 data-[state=active]:text-white">
              Wallet
            </TabsTrigger>
            <TabsTrigger value="trades" className="text-gray-300 data-[state=active]:text-white">
              Trades
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-gray-300 data-[state=active]:text-white">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card className="card-gradient border-2 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Portfolio Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Total Volume</div>
                    <div className="text-lg font-semibold text-white">${userStats.totalVolume.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Tokens Held</div>
                    <div className="text-lg font-semibold text-white">{userStats.tokensHeld}</div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-sm text-gray-300 mb-2">Recent Activity</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Created MEME Token</span>
                      <span className="text-gray-500">2h ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Traded DOGE</span>
                      <span className="text-gray-500">5h ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Joined ARC Community</span>
                      <span className="text-gray-500">1d ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="space-y-4">
            <Card className="card-gradient border-2 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Wallet Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-300">Wallet Address</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      value={userData.walletAddress}
                      readOnly
                      className="bg-gray-800 border-gray-600 text-white font-mono text-sm"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(userData.walletAddress)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-300">World ID Status</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-green-500 text-white">
                      <Shield className="h-3 w-3 mr-1" />
                      {userData.verificationLevel} Verified
                    </Badge>
                    <div className="text-sm text-gray-400">
                      Hash: {formatAddress(userData.worldIdHash)}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-sm text-gray-300 mb-2">Security Features</div>
                  <div className="space-y-1 text-xs text-gray-400">
                    <div>✅ World ID verification enabled</div>
                    <div>✅ Secure wallet via Privy</div>
                    <div>✅ Anti-bot protection active</div>
                    <div>✅ Recovery options configured</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trades Tab */}
          <TabsContent value="trades" className="space-y-4">
            <Card className="card-gradient border-2 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Trade History</CardTitle>
              </CardHeader>
              <CardContent>
                {tradeHistory.length > 0 ? (
                  <div className="space-y-3">
                    {tradeHistory.map((trade) => (
                      <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getTradeIcon(trade.type)}
                          <div>
                            <div className="font-semibold text-white">
                              {trade.type.toUpperCase()} {trade.token}
                            </div>
                            <div className="text-sm text-gray-400">
                              {trade.amount} {trade.token} @ ${trade.price}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-white">${trade.value}</div>
                          <div className="text-xs text-gray-400">{trade.timestamp}</div>
                          <div className={cn("text-xs", getStatusColor(trade.status))}>
                            {trade.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-400">No trades found yet</div>
                    <div className="text-sm text-gray-500">Start trading to see your history</div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card className="card-gradient border-2 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-300">Display Name</Label>
                    <Input
                      value={userData.displayName}
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-300">Username</Label>
                    <Input
                      value={userData.username}
                      disabled={!isEditing}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-300">Notifications</div>
                        <div className="text-xs text-gray-400">Push notifications for trades and updates</div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Bell className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-300">Language</div>
                        <div className="text-xs text-gray-400">Interface language</div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        English
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-300">Help & Support</div>
                        <div className="text-xs text-gray-400">Get help and contact support</div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <HelpCircle className="h-4 w-4 mr-1" />
                        Help
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-2 border-red-400/50">
              <CardHeader>
                <CardTitle className="text-red-400">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full border-red-400 text-red-400 hover:bg-red-400/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
