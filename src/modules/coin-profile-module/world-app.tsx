'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  MessageCircle,
  ExternalLink,
  Star,
  Share2,
  Heart,
  DollarSign,
  Activity
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Simplified mock token data for World App
const mockToken = {
  id: 1,
  name: 'ARC',
  fullName: 'ARCADE COIN',
  description: 'Community-driven GameFi platform for arcade enthusiasts. Built by gamers, for gamers.',
  logo: '🎮',
  marketCap: '$1.2B',
  price: '$0.045',
  change: '+5.25%',
  volume24h: '$2.4M',
  age: '3h',
  repScore: 95,
  status: 'LIVE',
  totalSupply: '1B',
  holders: '12.5K',
  transactions: '1.2K',
  social: {
    twitter: '@ARCadePlayer',
    telegram: 't.me/arcadecoin',
    discord: 'discord.gg/arcade'
  },
  repBreakdown: {
    verified: 85,
    anon: 10,
    flagged: 5
  }
}

// World App Coin Profile Module
export function CoinProfileModuleWorldApp() {
  const [activeTab, setActiveTab] = useState<'overview' | 'community' | 'activity'>('overview')
  const [isFollowing, setIsFollowing] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  const getChangeColor = (change: string) => {
    return change.startsWith('+') ? 'text-green-400' : 'text-red-400'
  }

  const getChangeIcon = (change: string) => {
    return change.startsWith('+') ? TrendingUp : TrendingDown
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-xl">
              {mockToken.logo}
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">{mockToken.name}</h1>
              <p className="text-sm text-gray-400">{mockToken.fullName}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn("p-1", isFavorited ? "text-red-400" : "text-gray-400 hover:text-white")}
              onClick={() => setIsFavorited(!isFavorited)}
            >
              <Heart className={cn("h-4 w-4", isFavorited && "fill-current")} />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Price and Stats */}
        <Card className="card-gradient border-2 border-pink-400/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-2xl font-bold text-white">{mockToken.price}</div>
                <div className={cn("text-sm font-medium flex items-center gap-1", getChangeColor(mockToken.change))}>
                  {React.createElement(getChangeIcon(mockToken.change), { className: "h-4 w-4" })}
                  {mockToken.change}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Market Cap</div>
                <div className="text-lg font-bold text-cyan-400">{mockToken.marketCap}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-xs text-gray-400">Volume 24h</div>
                <div className="text-sm font-bold text-white">{mockToken.volume24h}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400">Holders</div>
                <div className="text-sm font-bold text-white">{mockToken.holders}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400">Age</div>
                <div className="text-sm font-bold text-white">{mockToken.age}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold">
                <DollarSign className="h-4 w-4 mr-2" />
                Buy
              </Button>
              <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
                <TrendingDown className="h-4 w-4 mr-2" />
                Sell
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('overview')}
            className={cn(
              "flex-1",
              activeTab === 'overview'
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "border-pink-400 text-pink-400 hover:bg-pink-400/10"
            )}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'community' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('community')}
            className={cn(
              "flex-1",
              activeTab === 'community'
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
            )}
          >
            Community
          </Button>
          <Button
            variant={activeTab === 'activity' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('activity')}
            className={cn(
              "flex-1",
              activeTab === 'activity'
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "border-green-400 text-green-400 hover:bg-green-400/10"
            )}
          >
            Activity
          </Button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Description */}
            <Card className="card-gradient border-2 border-pink-400/50">
              <CardHeader>
                <CardTitle className="text-white">About {mockToken.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm leading-relaxed">{mockToken.description}</p>
              </CardContent>
            </Card>

            {/* Token Stats */}
            <Card className="card-gradient border-2 border-cyan-400/50">
              <CardHeader>
                <CardTitle className="text-white">Token Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Supply</span>
                  <span className="text-white font-bold">{mockToken.totalSupply}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Transactions</span>
                  <span className="text-white font-bold">{mockToken.transactions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">REP Score</span>
                  <span className="text-white font-bold">{mockToken.repScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <Badge className="bg-green-500 text-white text-xs">{mockToken.status}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'community' && (
          <div className="space-y-4">
            {/* REP Breakdown */}
            <Card className="card-gradient border-2 border-pink-400/50">
              <CardHeader>
                <CardTitle className="text-white">REP Breakdown</CardTitle>
                <CardDescription className="text-gray-400">Community reputation analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Verified Users</span>
                  <span className="text-green-400 font-bold">{mockToken.repBreakdown.verified}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Anonymous</span>
                  <span className="text-yellow-400 font-bold">{mockToken.repBreakdown.anon}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Flagged</span>
                  <span className="text-red-400 font-bold">{mockToken.repBreakdown.flagged}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="card-gradient border-2 border-cyan-400/50">
              <CardHeader>
                <CardTitle className="text-white">Community</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-blue-400 text-blue-400 hover:bg-blue-400/10">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {mockToken.social.twitter}
                </Button>
                <Button variant="outline" className="w-full justify-start border-blue-400 text-blue-400 hover:bg-blue-400/10">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {mockToken.social.telegram}
                </Button>
                <Button variant="outline" className="w-full justify-start border-purple-400 text-purple-400 hover:bg-purple-400/10">
                  <Users className="h-4 w-4 mr-2" />
                  {mockToken.social.discord}
                </Button>
              </CardContent>
            </Card>

            {/* Follow Button */}
            <Button
              variant={isFollowing ? "outline" : "default"}
              className={cn(
                "w-full",
                isFollowing
                  ? "border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                  : "bg-gradient-to-r from-cyan-500 to-pink-500 text-white"
              )}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              {isFollowing ? (
                <>
                  <Star className="h-4 w-4 mr-2" />
                  Following
                </>
              ) : (
                <>
                  <Star className="h-4 w-4 mr-2" />
                  Follow Project
                </>
              )}
            </Button>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-4">
            <Card className="card-gradient border-2 border-green-400/50">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Large Buy Order</div>
                      <div className="text-xs text-gray-400">2 minutes ago</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-400">+$50K</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">New Holder</div>
                      <div className="text-xs text-gray-400">5 minutes ago</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-blue-400">+1</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                      <Activity className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">Price Update</div>
                      <div className="text-xs text-gray-400">10 minutes ago</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-purple-400">+2.5%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export const CoinProfileModuleWorldAppExport = {
  version: 'v1.0.0',
  CoinProfileModule: CoinProfileModuleWorldApp
}
