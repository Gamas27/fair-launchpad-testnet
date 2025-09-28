'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft,
  Copy,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Users,
  BarChart3,
  Coins,
  Eye,
  Share2,
  MessageCircle,
  Star,
  Clock,
  DollarSign,
  Activity
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TokenDetailsProps {
  tokenId: string
  onBack: () => void
  className?: string
}

interface TokenData {
  id: string
  name: string
  symbol: string
  price: number
  priceChange: number
  volume: string
  marketCap: string
  liquidity: string
  totalSupply: string
  decimals: number
  contractAddress: string
  description: string
  website?: string
  twitter?: string
  telegram?: string
  discord?: string
  chartData: number[]
  holders: Array<{
    address: string
    percentage: number
    isOwner: boolean
  }>
}

export const TokenDetails = ({ tokenId, onBack, className }: TokenDetailsProps) => {
  const [activeTab, setActiveTab] = useState('info')
  const [showFullChart, setShowFullChart] = useState(false)

  // Mock token data - in real app this would come from API
  const tokenData: TokenData = {
    id: tokenId,
    name: 'MEME Token',
    symbol: 'MEME',
    price: 0.001,
    priceChange: 15.5,
    volume: '$500K',
    marketCap: '$1.2M',
    liquidity: '$800K',
    totalSupply: '1,000,000',
    decimals: 18,
    contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
    description: 'The ultimate meme token for the G8 community. Built with World ID verification and anti-bot protection.',
    website: 'https://memetoken.com',
    twitter: '@memetoken',
    telegram: 'https://t.me/memetoken',
    discord: 'https://discord.gg/memetoken',
    chartData: [0.0008, 0.0009, 0.001, 0.0011, 0.001, 0.0012, 0.0011, 0.001],
    holders: [
      { address: '0x123...456', percentage: 70.00, isOwner: true },
      { address: '0x789...abc', percentage: 15.50, isOwner: false },
      { address: '0xdef...123', percentage: 8.25, isOwner: false },
      { address: '0x456...789', percentage: 4.75, isOwner: false },
      { address: '0xabc...def', percentage: 1.50, isOwner: false }
    ]
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
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
          <div className="text-lg font-bold gradient-text">{tokenData.name}</div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => copyToClipboard(tokenData.contractAddress)}
              className="text-gray-400 hover:text-white"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Token Header */}
        <Card className="card-gradient border-2 border-cyan-400/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                <Coins className="h-8 w-8 text-cyan-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-white">{tokenData.name}</h1>
                  <Badge variant="outline" className="badge-outline">{tokenData.symbol}</Badge>
                  <Badge className="bg-green-500 text-white text-xs">LIVE</Badge>
                </div>
                <div className="text-sm text-gray-400">
                  Contract: {formatAddress(tokenData.contractAddress)}
                </div>
              </div>
            </div>

            {/* Price and Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-3xl font-bold text-white">${tokenData.price.toFixed(6)}</div>
                <div className={cn(
                  "flex items-center gap-1 text-sm",
                  tokenData.priceChange >= 0 ? "text-green-400" : "text-red-400"
                )}>
                  {tokenData.priceChange >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {Math.abs(tokenData.priceChange)}%
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">24h Volume</div>
                <div className="text-lg font-semibold text-white">{tokenData.volume}</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-gray-400">Market Cap</div>
                <div className="font-semibold text-white">{tokenData.marketCap}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Liquidity</div>
                <div className="font-semibold text-white">{tokenData.liquidity}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Holders</div>
                <div className="font-semibold text-white">{tokenData.holders.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart Section */}
        <Card className="card-gradient border-2 border-purple-400/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Price Chart</CardTitle>
              <div className="flex gap-2">
                {['1m', '5m', '15m', '1h', '4h', '1d'].map((timeframe) => (
                  <Button
                    key={timeframe}
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    {timeframe}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-800/50 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto" />
                <div className="text-gray-400">Chart data will be displayed here</div>
                <div className="text-xs text-gray-500">Real-time price feeds coming soon</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="info" className="text-gray-300 data-[state=active]:text-white">
              Info
            </TabsTrigger>
            <TabsTrigger value="comments" className="text-gray-300 data-[state=active]:text-white">
              Comments
            </TabsTrigger>
            <TabsTrigger value="holders" className="text-gray-300 data-[state=active]:text-white">
              Top Holders
            </TabsTrigger>
          </TabsList>

          {/* Info Tab */}
          <TabsContent value="info" className="space-y-4">
            <Card className="card-gradient border-2 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Token Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Name</div>
                    <div className="font-semibold text-white">{tokenData.name}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Symbol</div>
                    <div className="font-semibold text-white">{tokenData.symbol}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Total Supply</div>
                    <div className="font-semibold text-white">{tokenData.totalSupply}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Decimals</div>
                    <div className="font-semibold text-white">{tokenData.decimals}</div>
                  </div>
                </div>

                <div>
                  <div className="text-gray-400 mb-2">Description</div>
                  <div className="text-sm text-gray-300">{tokenData.description}</div>
                </div>

                {/* Social Links */}
                <div>
                  <div className="text-gray-400 mb-2">Social Links</div>
                  <div className="flex flex-wrap gap-2">
                    {tokenData.website && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                        onClick={() => window.open(tokenData.website, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Website
                      </Button>
                    )}
                    {tokenData.twitter && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-400 text-blue-400 hover:bg-blue-400/10"
                        onClick={() => window.open(`https://twitter.com/${tokenData.twitter?.replace('@', '')}`, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Twitter
                      </Button>
                    )}
                    {tokenData.telegram && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-400 text-green-400 hover:bg-green-400/10"
                        onClick={() => window.open(tokenData.telegram, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Telegram
                      </Button>
                    )}
                    {tokenData.discord && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-400 text-purple-400 hover:bg-purple-400/10"
                        onClick={() => window.open(tokenData.discord, '_blank')}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Discord
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comments Tab */}
          <TabsContent value="comments" className="space-y-4">
            <Card className="card-gradient border-2 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Community Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="text-gray-400">No comments yet</div>
                  <div className="text-sm text-gray-500">Be the first to comment on this token</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Top Holders Tab */}
          <TabsContent value="holders" className="space-y-4">
            <Card className="card-gradient border-2 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Top Holders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tokenData.holders.map((holder, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                          <Users className="h-4 w-4 text-gray-400" />
                        </div>
                        <div>
                          <div className="font-mono text-sm text-white">
                            {formatAddress(holder.address)}
                          </div>
                          {holder.isOwner && (
                            <Badge variant="outline" className="badge-outline text-xs">
                              Owner
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white">{holder.percentage}%</div>
                        <div className="text-xs text-gray-400">
                          {((parseFloat(tokenData.totalSupply.replace(/,/g, '')) * holder.percentage / 100)).toLocaleString()} {tokenData.symbol}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Load More Holders
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Trading Actions */}
        <div className="sticky bottom-0 bg-black/90 backdrop-blur-md border-t border-gray-800/50 p-4">
          <div className="flex gap-3">
            <Button className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold">
              <TrendingUp className="h-4 w-4 mr-2" />
              Buy
            </Button>
            <Button variant="outline" className="flex-1 border-red-400 text-red-400 hover:bg-red-400/10">
              <TrendingDown className="h-4 w-4 mr-2" />
              Sell
            </Button>
            <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
