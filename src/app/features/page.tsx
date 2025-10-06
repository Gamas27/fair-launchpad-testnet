'use client'

import { useState } from 'react'
import { 
  TradingInterface, 
  TradingAnalytics, 
  CommunityFeatures 
} from '@/components'
import { 
  ReputationCard, 
  QuestInterface, 
  AchievementSystem, 
  XPProgressBar,
  ReputationBenefits 
} from '@/components/reputation'
import { G8Card, G8CardContent, G8CardHeader, G8CardTitle } from '@/components/ui/g8-card'
import { G8Button } from '@/components/ui/g8-button'
import { useReputationStore } from '@/lib/reputation/reputationStore'
import { 
  TrendingUp, 
  BarChart3, 
  Users, 
  Trophy, 
  Target,
  Zap,
  Shield,
  Award
} from 'lucide-react'

export default function FeaturesPage() {
  const [activeFeature, setActiveFeature] = useState<'reputation' | 'trading' | 'analytics' | 'community'>('reputation')
  
  const { reputationData, benefits, quests, achievements } = useReputationStore()

  // Mock data for demo
  const mockTradingData = {
    tokenId: 'demo-token',
    tokenSymbol: 'DEMO',
    currentPrice: 0.000123,
    userBalance: 1000
  }

  const mockAnalyticsData = {
    totalVolume: 125000,
    totalTrades: 45,
    winRate: 78,
    averageTradeSize: 2777,
    totalFees: 375,
    feesSaved: 125,
    reputationLevel: reputationData.level,
    xpEarned: 1250,
    tradingStreak: 7,
    bestTrade: 45.2,
    worstTrade: -12.8,
    monthlyStats: {
      volume: 25000,
      trades: 12,
      fees: 75
    },
    categoryStats: {
      verification: 150,
      trading: 800,
      community: 200,
      security: 100
    }
  }

  const mockCommunityData = {
    posts: [
      {
        id: '1',
        author: {
          id: 'user1',
          name: 'CryptoTrader',
          avatar: '',
          reputationLevel: 'Gold',
          xp: 2500
        },
        content: 'Just made my first trade on G8! The reputation system is amazing - already saved 10% on fees with my Silver level.',
        timestamp: '2024-01-15T10:30:00Z',
        likes: 12,
        comments: 3,
        shares: 2,
        isLiked: false,
        isShared: false,
        type: 'trade' as const,
        tags: ['trading', 'reputation', 'fees']
      },
      {
        id: '2',
        author: {
          id: 'user2',
          name: 'DiamondHands',
          avatar: '',
          reputationLevel: 'Diamond',
          xp: 5000
        },
        content: 'Unlocked the "Diamond Hands" achievement! 🏆 Holding strong for 30+ days and the community support has been incredible.',
        timestamp: '2024-01-15T09:15:00Z',
        likes: 25,
        comments: 8,
        shares: 5,
        isLiked: true,
        isShared: false,
        type: 'achievement' as const,
        tags: ['achievement', 'diamond', 'community']
      }
    ],
    stats: {
      totalPosts: 15,
      totalLikes: 89,
      totalShares: 23,
      followers: 156,
      following: 42,
      reputationRank: 12,
      communityXP: 450
    }
  }

  const features = [
    {
      id: 'reputation',
      title: 'Reputation System',
      description: 'Earn XP, complete quests, and unlock achievements',
      icon: Trophy,
      color: 'text-g8-warning'
    },
    {
      id: 'trading',
      title: 'Smart Trading',
      description: 'Reputation-based limits and fee discounts',
      icon: TrendingUp,
      color: 'text-g8-success'
    },
    {
      id: 'analytics',
      title: 'Trading Analytics',
      description: 'Detailed insights and performance metrics',
      icon: BarChart3,
      color: 'text-g8-primary'
    },
    {
      id: 'community',
      title: 'Community Hub',
      description: 'Social features and community engagement',
      icon: Users,
      color: 'text-g8-error'
    }
  ]

  const handleTrade = async (type: 'buy' | 'sell', amount: number) => {
    console.log(`${type} ${amount} tokens`)
    // Simulate trade
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  const handleCommunityAction = (action: string, data: any) => {
    console.log(`${action}:`, data)
  }

  return (
    <div className="min-h-screen bg-g8-bg p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-g8-text-primary">
            G8 Platform Features
          </h1>
          <p className="text-g8-text-secondary text-lg">
            Experience the future of fair trading with reputation-based benefits
          </p>
        </div>

        {/* Feature Navigation */}
        <div className="flex flex-wrap gap-2 justify-center">
          {features.map((feature) => {
            const IconComponent = feature.icon
            return (
              <G8Button
                key={feature.id}
                variant={activeFeature === feature.id ? 'primary' : 'outline'}
                onClick={() => setActiveFeature(feature.id as any)}
                className="flex items-center gap-2"
              >
                <IconComponent className={cn("h-4 w-4", feature.color)} />
                {feature.title}
              </G8Button>
            )
          })}
        </div>

        {/* Feature Content */}
        <div className="space-y-6">
          {activeFeature === 'reputation' && (
            <div className="space-y-6">
              {/* Reputation Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ReputationCard reputation={reputationData} />
                <ReputationBenefits benefits={benefits} />
              </div>

              {/* XP Progress */}
              <G8Card variant="default">
                <G8CardHeader>
                  <G8CardTitle>XP Progress</G8CardTitle>
                </G8CardHeader>
                <G8CardContent>
                  <XPProgressBar xpData={reputationData} showDetails={true} size="lg" />
                </G8CardContent>
              </G8Card>

              {/* Quests */}
              <G8Card variant="default">
                <G8CardHeader>
                  <G8CardTitle>Available Quests</G8CardTitle>
                </G8CardHeader>
                <G8CardContent>
                  <QuestInterface quests={quests} />
                </G8CardContent>
              </G8Card>

              {/* Achievements */}
              <G8Card variant="default">
                <G8CardHeader>
                  <G8CardTitle>Achievements</G8CardTitle>
                </G8CardHeader>
                <G8CardContent>
                  <AchievementSystem achievements={achievements} />
                </G8CardContent>
              </G8Card>
            </div>
          )}

          {activeFeature === 'trading' && (
            <div className="space-y-6">
              <TradingInterface
                tokenId={mockTradingData.tokenId}
                tokenSymbol={mockTradingData.tokenSymbol}
                currentPrice={mockTradingData.currentPrice}
                userBalance={mockTradingData.userBalance}
                onTrade={handleTrade}
              />
            </div>
          )}

          {activeFeature === 'analytics' && (
            <div className="space-y-6">
              <TradingAnalytics analytics={mockAnalyticsData} />
            </div>
          )}

          {activeFeature === 'community' && (
            <div className="space-y-6">
              <CommunityFeatures
                posts={mockCommunityData.posts}
                stats={mockCommunityData.stats}
                onLike={(postId) => handleCommunityAction('like', postId)}
                onShare={(postId) => handleCommunityAction('share', postId)}
                onComment={(postId, comment) => handleCommunityAction('comment', { postId, comment })}
                onFollow={(userId) => handleCommunityAction('follow', userId)}
              />
            </div>
          )}
        </div>

        {/* Feature Benefits Summary */}
        <G8Card variant="gradient" className="border-g8-primary/30">
          <G8CardHeader>
            <G8CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-g8-primary" />
              Platform Benefits
            </G8CardTitle>
          </G8CardHeader>
          <G8CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center space-y-2">
                <Trophy className="h-8 w-8 text-g8-warning mx-auto" />
                <h3 className="font-semibold text-g8-text-primary">Reputation System</h3>
                <p className="text-sm text-g8-text-secondary">
                  Earn XP, complete quests, and unlock achievements for better trading benefits
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <TrendingUp className="h-8 w-8 text-g8-success mx-auto" />
                <h3 className="font-semibold text-g8-text-primary">Smart Trading</h3>
                <p className="text-sm text-g8-text-secondary">
                  Higher reputation = higher limits, lower fees, and priority access
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <BarChart3 className="h-8 w-8 text-g8-primary mx-auto" />
                <h3 className="font-semibold text-g8-text-primary">Analytics</h3>
                <p className="text-sm text-g8-text-secondary">
                  Detailed insights into your trading performance and reputation growth
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <Users className="h-8 w-8 text-g8-error mx-auto" />
                <h3 className="font-semibold text-g8-text-primary">Community</h3>
                <p className="text-sm text-g8-text-secondary">
                  Connect with traders, share insights, and grow together
                </p>
              </div>
            </div>
          </G8CardContent>
        </G8Card>
      </div>
    </div>
  )
}
