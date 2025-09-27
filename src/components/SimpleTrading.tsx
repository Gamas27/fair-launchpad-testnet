'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, BarChart3, ArrowUpRight, ArrowDownRight, Zap, Shield, Users, Star, Activity } from 'lucide-react'
import { useSafeWorldId } from '@/providers/SafeWorldIdProvider'

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

export default function SimpleTrading() {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [tokens, setTokens] = useState<Token[]>([])
  const [buyAmount, setBuyAmount] = useState("")
  const [sellAmount, setSellAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy')
  const { isVerified, verificationLevel } = useSafeWorldId()

  useEffect(() => {
    console.log('SimpleTrading: Loading mock data...')
    // Load mock data immediately
    const mockTokens = [
      {
        address: '0x1234567890123456789012345678901234567890',
        name: 'Test Token',
        symbol: 'TEST',
        description: 'A test token for demonstration',
        imageUrl: 'https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=TEST',
        currentPrice: 0.001,
        totalVolume: 1000,
        totalTrades: 50,
        marketCap: 10000,
        status: 'active',
        creator: {
          walletAddress: '0x1234567890123456789012345678901234567890',
          reputationLevel: 'Gold',
          verificationLevel: 'device'
        },
        _count: {
          trades: 50
        }
      }
    ]
    
    setTokens(mockTokens)
    setSelectedToken(mockTokens[0])
    console.log('SimpleTrading: Mock data loaded')
  }, [])

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
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Fair Trading Hub
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Trade tokens with anti-manipulation protection
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Token List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Available Tokens
              </CardTitle>
              <CardDescription>
                Select a token to trade
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {tokens.map((token) => (
                <div
                  key={token.address}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedToken?.address === token.address
                      ? 'border-cyan-400 bg-cyan-400/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedToken(token)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
                      {token.symbol.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{token.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {token.symbol}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{token.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">${token.currentPrice.toFixed(6)}</div>
                      <div className="text-xs text-gray-500">${token.marketCap.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Trading Interface */}
        <div className="lg:col-span-2">
          {selectedToken ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trade {selectedToken.symbol}
                </CardTitle>
                <CardDescription>
                  Current price: ${selectedToken.currentPrice.toFixed(6)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Token Info */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    {selectedToken.symbol.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{selectedToken.name}</h3>
                    <p className="text-gray-500">{selectedToken.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">${selectedToken.currentPrice.toFixed(6)}</div>
                    <div className="text-sm text-gray-500">Market Cap: ${selectedToken.marketCap.toLocaleString()}</div>
                  </div>
                </div>

                {/* Trading Tabs */}
                <div className="flex gap-2">
                  <Button
                    variant={activeTab === 'buy' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('buy')}
                    className="flex-1"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Buy
                  </Button>
                  <Button
                    variant={activeTab === 'sell' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('sell')}
                    className="flex-1"
                  >
                    <TrendingDown className="h-4 w-4 mr-2" />
                    Sell
                  </Button>
                </div>

                {/* Trading Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Amount in WLD
                    </label>
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={activeTab === 'buy' ? buyAmount : sellAmount}
                      onChange={(e) => {
                        if (activeTab === 'buy') {
                          setBuyAmount(e.target.value)
                        } else {
                          setSellAmount(e.target.value)
                        }
                      }}
                      className="text-lg"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">
                      You will receive:
                    </span>
                    <span className="font-semibold">
                      {activeTab === 'buy' 
                        ? buyAmount ? `${(parseFloat(buyAmount) / selectedToken.currentPrice).toFixed(2)} ${selectedToken.symbol}` : '0'
                        : sellAmount ? `${(parseFloat(sellAmount) * selectedToken.currentPrice).toFixed(2)} WLD` : '0'
                      }
                    </span>
                  </div>

                  <Button
                    onClick={handleTrade}
                    disabled={isLoading || !isVerified}
                    className="w-full"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {activeTab === 'buy' ? (
                          <>
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Buy {selectedToken.symbol}
                          </>
                        ) : (
                          <>
                            <TrendingDown className="h-4 w-4 mr-2" />
                            Sell {selectedToken.symbol}
                          </>
                        )}
                      </>
                    )}
                  </Button>

                  {!isVerified && (
                    <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <Shield className="h-5 w-5 text-yellow-500 mx-auto mb-2" />
                      <p className="text-sm text-yellow-700">
                        Please verify with World ID to start trading
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Token Selected</h3>
                <p className="text-gray-500">Please select a token from the list to start trading</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}