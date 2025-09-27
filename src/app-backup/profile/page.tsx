'use client'

import { Navigation } from '@/components/Navigation'
import { RouteGuard } from '@/components/RouteGuard'
import { WalletInfo } from '@/components/WalletConnect/WalletInfo'
import { WorldIdStatus } from '@/components/WorldId/WorldIdStatus'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { User, Shield, Trophy, TrendingUp, Activity, Star, Zap, Target } from 'lucide-react'
import { getReputationLevel, calculateAllocationCap } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { useState, useEffect } from 'react'

export default function ProfilePage() {
  const { isConnected, isVerified } = useAuth()
  const [userXp, setUserXp] = useState(1500) // Mock XP for demonstration
  const [tradingStats, setTradingStats] = useState({
    totalTrades: 0,
    successRate: 0,
    volume: 0
  })

  // Get reputation level based on XP
  const reputationInfo = getReputationLevel(userXp)
  const allocationCap = calculateAllocationCap(reputationInfo.level)

  // Mock achievements based on reputation level
  const achievements = [
    {
      id: 'verified-human',
      title: 'Verified Human',
      description: 'World ID verification completed',
      icon: Shield,
      unlocked: isVerified,
      color: 'text-green-400'
    },
    {
      id: 'first-launch',
      title: 'Token Creator',
      description: 'Successfully launched a token',
      icon: Trophy,
      unlocked: userXp >= 500,
      color: 'text-yellow-400'
    },
    {
      id: 'active-trader',
      title: 'Active Trader',
      description: 'Completed 10+ trades',
      icon: TrendingUp,
      unlocked: tradingStats.totalTrades >= 10,
      color: 'text-blue-400'
    },
    {
      id: 'community-hero',
      title: 'Community Hero',
      description: 'Reached Diamond level',
      icon: Star,
      unlocked: reputationInfo.level === 'Diamond',
      color: 'text-purple-400'
    }
  ]

  // Mock quests based on reputation level
  const quests = [
    {
      id: 'verify-phone',
      title: 'Verify Phone Number',
      description: 'Complete phone verification',
      reward: 100,
      completed: isVerified,
      progress: isVerified ? 100 : 0
    },
    {
      id: 'complete-trades',
      title: 'Complete Trades',
      description: 'Execute 5 successful trades',
      reward: 200,
      completed: tradingStats.totalTrades >= 5,
      progress: Math.min(100, (tradingStats.totalTrades / 5) * 100)
    },
    {
      id: 'earn-xp',
      title: 'Earn XP',
      description: 'Reach 1000 XP',
      reward: 300,
      completed: userXp >= 1000,
      progress: Math.min(100, (userXp / 1000) * 100)
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <RouteGuard requiresAuth>
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                User Profile
              </h1>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Your reputation, achievements, and trading history
              </p>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <WalletInfo />
              <WorldIdStatus />
            </div>

            {/* Reputation System */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Reputation System
                </CardTitle>
                <CardDescription>
                  Your current reputation level and progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Current Level */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{reputationInfo.icon}</span>
                      <div>
                        <div className={`text-2xl font-bold ${reputationInfo.color}`}>
                          {reputationInfo.level}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {userXp} XP
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress to next level</span>
                        <span>{reputationInfo.progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${reputationInfo.progress}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {reputationInfo.nextLevelXp === Infinity 
                          ? 'Max level reached!' 
                          : `${reputationInfo.nextLevelXp - userXp} XP to next level`
                        }
                      </div>
                    </div>
                  </div>

                  {/* Allocation Cap */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400">
                        {allocationCap} WLD
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Allocation Cap
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Used:</span>
                        <span>0 WLD</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Available:</span>
                        <span className="text-green-400">{allocationCap} WLD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trading Stats */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  Trading Statistics
                </CardTitle>
                <CardDescription>
                  Your trading performance and history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">
                      {tradingStats.totalTrades}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Trades</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-400">
                      {tradingStats.successRate}%
                    </div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">
                      ${tradingStats.volume.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Volume</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quests */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-400" />
                  Active Quests
                </CardTitle>
                <CardDescription>
                  Complete quests to earn XP and level up
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quests.map((quest) => (
                    <div key={quest.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{quest.title}</h4>
                          {quest.completed && (
                            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                              Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {quest.description}
                        </p>
                        <div className="mt-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{quest.progress.toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${quest.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="text-lg font-bold text-yellow-400">
                          +{quest.reward} XP
                        </div>
                        <div className="text-xs text-muted-foreground">Reward</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  Your badges and accomplishments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`text-center p-4 border rounded-lg transition-all ${
                        achievement.unlocked 
                          ? 'border-green-500/50 bg-green-500/10' 
                          : 'opacity-50'
                      }`}
                    >
                      <achievement.icon className={`h-8 w-8 mx-auto mb-2 ${
                        achievement.unlocked ? achievement.color : 'text-gray-400'
                      }`} />
                      <div className="text-sm font-semibold">{achievement.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {achievement.description}
                      </div>
                      {achievement.unlocked && (
                        <Badge variant="secondary" className="mt-2 bg-green-500/20 text-green-400">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </RouteGuard>
      </main>
    </div>
  )
}