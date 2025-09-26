'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  BarChart3, 
  Activity,
  Users,
  DollarSign,
  Shield,
  Star,
  Zap,
  ExternalLink,
  Copy,
  Share2
} from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { useSafeWorldId } from "@/providers/SafeWorldIdProvider"
import PriceChart from "@/components/PriceChart"

interface Token {
  address: string
  name: string
  symbol: string
  description: string
  imageUrl?: string
  creatorAddress: string
  initialPrice: number
  priceIncrement: number
  maxSupply: string
  currentSupply: string
  currentPrice: number
  totalVolume: number
  totalTrades: number
  marketCap: number
  status: string
  launchDate: string
  createdAt: string
  creator: {
    walletAddress: string
    reputationLevel: string
    verificationLevel: string
  }
  _count: {
    trades: number
  }
}

interface Trade {
  id: string
  type: 'buy' | 'sell'
  amount: number
  price: number
  totalValue: number
  timestamp: string
  userAddress: string
}

interface TokenDexPageProps {
  tokenAddress: string
}

export default function TokenDexPage({ tokenAddress }: TokenDexPageProps) {
  const [token, setToken] = useState<Token | null>(null)
  const [trades, setTrades] = useState<Trade[]>([])
  const [priceHistory, setPriceHistory] = useState<{ time: string; price: number }[]>([])
  const [, setVolumeHistory] = useState<{ time: string; volume: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'trading' | 'analytics'>('overview')
  const { isVerified, verificationLevel } = useSafeWorldId()

  useEffect(() => {
    if (tokenAddress) {
      fetchTokenData()
      generateMockData()
    }
  }, [tokenAddress, fetchTokenData])

  const fetchTokenData = useCallback(async () => {
    try {
      const response = await fetch(`/api/tokens/${tokenAddress}`)
      if (response.ok) {
        const data = await response.json()
        setToken(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch token data:', error)
    } finally {
      setLoading(false)
    }
  }, [tokenAddress])

  const generateMockData = () => {
    // Generate mock price history (last 24 hours)
    const now = new Date()
    const priceHistoryData = []
    const volumeHistoryData = []
    let currentPrice = 0.01
    
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000)
      const variation = (Math.random() - 0.5) * 0.02
      currentPrice = Math.max(0.001, currentPrice + variation)
      
      priceHistoryData.push({
        time: time.toISOString(),
        price: currentPrice
      })
      
      volumeHistoryData.push({
        time: time.toISOString(),
        volume: Math.random() * 10000
      })
    }
    
    setPriceHistory(priceHistoryData)
    setVolumeHistory(volumeHistoryData)

    // Generate mock trades
    const mockTrades: Trade[] = []
    for (let i = 0; i < 20; i++) {
      const isBuy = Math.random() > 0.5
      const amount = Math.random() * 1000 + 100
      const price = currentPrice * (1 + (Math.random() - 0.5) * 0.1)
      
      mockTrades.push({
        id: `trade_${i}`,
        type: isBuy ? 'buy' : 'sell',
        amount,
        price,
        totalValue: amount * price,
        timestamp: new Date(now.getTime() - i * 5 * 60 * 1000).toISOString(),
        userAddress: `0x${Math.random().toString(16).substr(2, 40)}`
      })
    }
    
    setTrades(mockTrades.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500'
      case 'launching':
        return 'bg-yellow-500'
      case 'completed':
        return 'bg-blue-500'
      case 'failed':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
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

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Token Not Found</h1>
          <p className="text-gray-400">The requested token could not be found.</p>
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
              {token.imageUrl && (
                <img 
                  src={token.imageUrl} 
                  alt={token.symbol}
                  className="w-16 h-16 rounded-full"
                />
              )}
              <div>
                <h1 className="text-3xl font-bold">{token.name}</h1>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-cyan-400">{token.symbol}</span>
                  <Badge className={getStatusColor(token.status)}>
                    {token.status}
                  </Badge>
                  <Badge className={getReputationColor(token.creator.reputationLevel)}>
                    {token.creator.reputationLevel}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(token.address)}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Address
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`https://etherscan.io/token/${token.address}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Etherscan
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg mb-6">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'trading', label: 'Trading', icon: Activity },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                activeTab === id
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab(id as 'overview' | 'trading' | 'analytics')}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Current Price</p>
                      <p className="text-2xl font-bold text-cyan-400">${token.currentPrice.toFixed(4)}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-cyan-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Market Cap</p>
                      <p className="text-2xl font-bold text-green-400">${token.marketCap.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">24h Volume</p>
                      <p className="text-2xl font-bold text-blue-400">${token.totalVolume.toLocaleString()}</p>
                    </div>
                    <Activity className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Trades</p>
                      <p className="text-2xl font-bold text-purple-400">{token.totalTrades}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Token Information */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-blue-400" />
                    Token Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Token Address</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{formatAddress(token.address)}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(token.address)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Supply</span>
                      <span className="font-semibold">{parseInt(token.maxSupply).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current Supply</span>
                      <span className="font-semibold">{parseInt(token.currentSupply).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Launch Date</span>
                      <span className="font-semibold">{new Date(token.launchDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price Increment</span>
                      <span className="font-semibold">${token.priceIncrement.toFixed(4)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-green-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-400" />
                    Security & Fairness
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">World ID Verified</span>
                      <Badge className="bg-green-500">✅ Verified</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Anti-Bot Protection</span>
                      <Badge className="bg-blue-500">🛡️ Active</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fair Distribution</span>
                      <Badge className="bg-purple-500">⚖️ Enabled</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Creator Reputation</span>
                      <Badge className={getReputationColor(token.creator.reputationLevel)}>
                        {token.creator.reputationLevel}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Your Verification</span>
                      <Badge className={isVerified ? "bg-green-500" : "bg-red-500"}>
                        {isVerified ? `✅ ${verificationLevel}` : "❌ Required"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <Card className="bg-card/50 backdrop-blur-sm border-gray-500/20">
              <CardHeader>
                <CardTitle>About {token.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">{token.description}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Trading Tab */}
        {activeTab === 'trading' && (
          <div className="space-y-6">
            {/* Price Chart */}
            <PriceChart data={priceHistory} height={300} />

            {/* Recent Trades */}
            <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-400" />
                  Recent Trades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {trades.slice(0, 10).map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between py-2 border-b border-gray-700/50 last:border-b-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${trade.type === 'buy' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        <span className="text-sm">{trade.type.toUpperCase()}</span>
                        <span className="text-xs text-gray-400">{formatAddress(trade.userAddress)}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{trade.amount.toFixed(2)} WLD</div>
                        <div className="text-xs text-gray-400">${trade.price.toFixed(4)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Volume Chart Placeholder */}
            <Card className="bg-card/50 backdrop-blur-sm border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Volume Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-500">Volume analytics will be integrated here</p>
                    <p className="text-sm text-gray-600">Historical data and trends</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trading Statistics */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-lg">Trading Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">24h High</span>
                    <span className="font-semibold">${(token.currentPrice * 1.15).toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">24h Low</span>
                    <span className="font-semibold">${(token.currentPrice * 0.85).toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Average Trade Size</span>
                    <span className="font-semibold">${(token.totalVolume / token.totalTrades).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Unique Traders</span>
                    <span className="font-semibold">{Math.floor(token.totalTrades * 0.3)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-lg">Market Health</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Liquidity Score</span>
                    <Badge className="bg-green-500">High</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Volatility</span>
                    <Badge className="bg-yellow-500">Medium</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fair Trade Rate</span>
                    <Badge className="bg-blue-500">98.2%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bot Detection</span>
                    <Badge className="bg-red-500">0.1%</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
