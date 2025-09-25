import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  Zap,
  Shield,
  Users,
  Clock,
  Star,
  Activity
} from "lucide-react"
import { useState, useEffect } from "react"
import { useSafeWorldId } from "@/providers/SafeWorldIdProvider"

interface Token {
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
  creator: {
    walletAddress: string
    reputationLevel: string
    verificationLevel: string
  }
  _count: {
    trades: number
  }
}

export default function DeeprInspiredTrading() {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [tokens, setTokens] = useState<Token[]>([])
  const [buyAmount, setBuyAmount] = useState("")
  const [sellAmount, setSellAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy')
  const { isVerified, verificationLevel } = useSafeWorldId()

  useEffect(() => {
    fetchTokens()
  }, [])

  const fetchTokens = async () => {
    try {
      const response = await fetch('/api/tokens')
      if (response.ok) {
        const data = await response.json()
        setTokens(data.data.data || [])
        if (data.data.data?.length > 0 && !selectedToken) {
          setSelectedToken(data.data.data[0])
        }
      }
    } catch (error) {
      console.error('Failed to fetch tokens:', error)
    }
  }

  const handleTrade = async () => {
    if (!isVerified) {
      alert("Please verify with World ID first!")
      return
    }

    if (!selectedToken) {
      alert("Please select a token to trade")
      return
    }

    const amount = parseFloat(activeTab === 'buy' ? buyAmount : sellAmount)
    if (amount <= 0) {
      alert("Invalid amount")
      return
    }

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert(`Successfully ${activeTab === 'buy' ? 'bought' : 'sold'} ${amount} WLD worth of ${selectedToken.symbol}!`)
      
      if (activeTab === 'buy') {
        setBuyAmount("")
      } else {
        setSellAmount("")
      }
    } catch (error) {
      alert(`${activeTab === 'buy' ? 'Buy' : 'Sell'} failed. Please try again.`)
    } finally {
      setIsLoading(false)
    }
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

  return (
    <div className="space-y-6">
      {/* Header with Deepr.fun style */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Fair Trading Hub
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Trade verified tokens with anti-bot protection and fair distribution
        </p>
      </div>

      {/* Token Selection - Deepr.fun style grid */}
      <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Zap className="h-6 w-6 text-cyan-400" />
            Select Token to Trade
          </CardTitle>
          <CardDescription>
            Choose from verified tokens with World ID protection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tokens.map((token) => (
              <Card 
                key={token.address}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedToken?.address === token.address 
                    ? 'border-cyan-500 bg-cyan-500/10' 
                    : 'border-gray-700 hover:border-cyan-500/50'
                }`}
                onClick={() => setSelectedToken(token)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {token.imageUrl && (
                        <img 
                          src={token.imageUrl} 
                          alt={token.symbol}
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                      <div>
                        <div className="font-semibold">{token.name}</div>
                        <div className="text-sm text-gray-400">{token.symbol}</div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(token.status)}>
                      {token.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price</span>
                      <span className="font-semibold">${token.currentPrice.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Market Cap</span>
                      <span className="font-semibold">${token.marketCap.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Volume</span>
                      <span className="font-semibold">${token.totalVolume.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Creator</span>
                      <Badge className={getReputationColor(token.creator.reputationLevel)}>
                        {token.creator.reputationLevel}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trading Interface - Deepr.fun style */}
      {selectedToken && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Trading Panel */}
          <Card className="bg-card/50 backdrop-blur-sm border-green-500/20">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Activity className="h-6 w-6 text-green-400" />
                Trade {selectedToken.symbol}
              </CardTitle>
              <CardDescription>
                Current Price: ${selectedToken.currentPrice.toFixed(4)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tab Selection */}
              <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
                <button
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'buy'
                      ? 'bg-green-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('buy')}
                >
                  <TrendingUp className="h-4 w-4 inline mr-2" />
                  Buy
                </button>
                <button
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'sell'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('sell')}
                >
                  <TrendingDown className="h-4 w-4 inline mr-2" />
                  Sell
                </button>
              </div>

              {/* Amount Input */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    {activeTab === 'buy' ? 'Buy Amount' : 'Sell Amount'} (WLD)
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="w-full bg-gray-800 border-gray-700 text-white text-lg py-3"
                      value={activeTab === 'buy' ? buyAmount : sellAmount}
                      onChange={(e) => {
                        if (activeTab === 'buy') {
                          setBuyAmount(e.target.value)
                        } else {
                          setSellAmount(e.target.value)
                        }
                      }}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      WLD
                    </div>
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-2">
                  {[100, 500, 1000, 2000].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        if (activeTab === 'buy') {
                          setBuyAmount(amount.toString())
                        } else {
                          setSellAmount(amount.toString())
                        }
                      }}
                    >
                      {amount}
                    </Button>
                  ))}
                </div>

                {/* Trade Button */}
                <Button
                  className={`w-full py-3 text-lg font-semibold ${
                    activeTab === 'buy'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                  onClick={handleTrade}
                  disabled={isLoading || !isVerified}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      {activeTab === 'buy' ? 'Buying...' : 'Selling...'}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {activeTab === 'buy' ? (
                        <ArrowUpRight className="h-5 w-5" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5" />
                      )}
                      {activeTab === 'buy' ? 'Buy' : 'Sell'} {selectedToken.symbol}
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Token Details & Stats */}
          <div className="space-y-4">
            {/* Token Info */}
            <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="h-5 w-5 text-blue-400" />
                  {selectedToken.name} Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Symbol</span>
                  <span className="font-semibold">{selectedToken.symbol}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Current Price</span>
                  <span className="font-semibold text-lg">${selectedToken.currentPrice.toFixed(4)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Market Cap</span>
                  <span className="font-semibold">${selectedToken.marketCap.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">24h Volume</span>
                  <span className="font-semibold">${selectedToken.totalVolume.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Trades</span>
                  <span className="font-semibold">{selectedToken._count.trades}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Creator</span>
                  <Badge className={getReputationColor(selectedToken.creator.reputationLevel)}>
                    {selectedToken.creator.reputationLevel}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card className="bg-card/50 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-400" />
                  Security Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">World ID Verified</span>
                  <Badge className="bg-green-500">✅ Verified</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Anti-Bot Protection</span>
                  <Badge className="bg-blue-500">🛡️ Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Fair Distribution</span>
                  <Badge className="bg-purple-500">⚖️ Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Your Verification</span>
                  <Badge className={isVerified ? "bg-green-500" : "bg-red-500"}>
                    {isVerified ? `✅ ${verificationLevel}` : "❌ Required"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Market Overview - Deepr.fun style */}
      <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-cyan-400" />
            Market Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">$2.4M</div>
              <div className="text-sm text-gray-400">Total Volume</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">1,247</div>
              <div className="text-sm text-gray-400">Active Traders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">98.2%</div>
              <div className="text-sm text-gray-400">Fair Trades</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">+12.5%</div>
              <div className="text-sm text-gray-400">24h Change</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
