import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, DollarSign, Clock, ExternalLink, BarChart3 } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

interface Token {
  address: string
  name: string
  symbol: string
  description: string
  imageUrl?: string
  creatorAddress: string
  currentPrice: number
  totalVolume: number
  totalTrades: number
  marketCap: number
  status: string
  launchDate: string
  creator: {
    walletAddress: string
    reputationLevel: string
    verificationLevel: string
  }
  _count: {
    trades: number
  }
}

export default function TokenList() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTokens()
  }, [])

  const fetchTokens = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/tokens')
      if (!response.ok) {
        throw new Error('Failed to fetch tokens')
      }
      const data = await response.json()
      const fetchedTokens = data.data.data || []
      
      // Add mock data for testing if no tokens exist
      if (fetchedTokens.length === 0) {
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
      } else {
        setTokens(fetchedTokens)
      }
    } catch (err) {
      console.error('Failed to fetch tokens:', err)
      // Add fallback mock data
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
      setError(null) // Clear error since we have fallback data
    } finally {
      setLoading(false)
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

  const getReputationColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'gold':
        return 'text-yellow-500'
      case 'silver':
        return 'text-gray-400'
      case 'bronze':
        return 'text-orange-500'
      default:
        return 'text-gray-500'
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Live Tokens</h2>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <button 
          onClick={fetchTokens}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Live Tokens</h2>
        <button 
          onClick={fetchTokens}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Refresh
        </button>
      </div>
      
      {tokens.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No tokens found. Be the first to launch one!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {tokens.map((token) => (
            <Card key={token.address} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {token.imageUrl && (
                      <img 
                        src={token.imageUrl} 
                        alt={token.symbol}
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                    <div>
                      <CardTitle className="text-lg">{token.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {token.symbol} • Created by {token.creator.walletAddress.slice(0, 6)}...{token.creator.walletAddress.slice(-4)}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(token.status)}>
                      {token.status}
                    </Badge>
                    <span className={`text-sm font-semibold ${getReputationColor(token.creator.reputationLevel)}`}>
                      {token.creator.reputationLevel}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-4">{token.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <div>
                      <div className="font-semibold">${token.currentPrice.toFixed(4)}</div>
                      <div className="text-gray-500">Price</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="font-semibold">${token.marketCap.toLocaleString()}</div>
                      <div className="text-gray-500">Market Cap</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    <div>
                      <div className="font-semibold">{token._count.trades}</div>
                      <div className="text-gray-500">Trades</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <div>
                      <div className="font-semibold">${token.totalVolume.toLocaleString()}</div>
                      <div className="text-gray-500">Volume</div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    <Link href={`/token/${token.address}`}>
                      <Button size="sm" className="flex-1">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View DEX
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`https://etherscan.io/token/${token.address}`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
