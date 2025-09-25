'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { getReputationLevel, calculateAllocationCap } from "@/lib/utils"
import { Shield, Trophy, Star, Target, Award, History, Users, Gift, RefreshCw, AlertCircle } from "lucide-react"
import { useReputation } from "@/hooks/useReputation"
import { useWorldIdApi } from "@/hooks/useWorldIdApi"

export default function ReputationScreenApi() {
  const { 
    reputationData,
    quests,
    achievements,
    isLoading,
    error,
    completeQuest,
    refreshData,
    reputationLevel,
    reputationScore,
    reputationXp,
    totalTrades,
    totalVolume,
    riskScore,
    isBanned,
    activeQuests,
    completedQuests,
    unlockedAchievements,
    lockedAchievements
  } = useReputation()

  const { user, isVerified, verificationLevel } = useWorldIdApi()

  const reputationInfo = getReputationLevel(reputationXp)
  const nextLevelXp = reputationInfo.nextLevelXp
  const progressToNext = nextLevelXp === Infinity ? 100 : (reputationXp / nextLevelXp) * 100

  const handleCompleteQuest = async (questId: string) => {
    const result = await completeQuest(questId)
    if (result) {
      // Quest completed successfully
      console.log('Quest completed!', result)
    }
  }

  if (isLoading && !reputationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-cyan-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading reputation data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 mb-4">{error}</p>
          <Button onClick={refreshData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-cyan-400" />
            <span className="text-2xl font-bold gradient-text">FairLaunch</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Current: {reputationInfo.level} {reputationInfo.icon}</span>
            <span className="text-sm text-cyan-400">XP: {reputationXp.toLocaleString('en-US')}</span>
            <Button onClick={refreshData} variant="outline" size="sm" disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </header>

        {/* Reputation Overview */}
        <Card className="bg-card/50 backdrop-blur-sm border-purple-500/20 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-purple-400" />
              Reputation System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">{reputationInfo.icon}</div>
                  <div className="text-2xl font-bold text-purple-400">{reputationInfo.level} HUMAN</div>
                  <div className="text-sm text-gray-400">Level {reputationInfo.level}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to next level:</span>
                    <span>{progressToNext.toFixed(1)}%</span>
                  </div>
                  <Progress value={progressToNext} className="h-2" />
                  <div className="text-xs text-gray-400 text-center">
                    {reputationXp.toLocaleString('en-US')} / {nextLevelXp === Infinity ? '∞' : nextLevelXp.toLocaleString('en-US')} XP
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-purple-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">{totalTrades}</div>
                    <div className="text-xs text-gray-400">Total Trades</div>
                  </div>
                  <div className="text-center p-3 bg-purple-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">${totalVolume.toLocaleString('en-US')}</div>
                    <div className="text-xs text-gray-400">Total Volume</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Risk Score:</span>
                    <Badge variant={riskScore < 30 ? 'default' : riskScore < 70 ? 'secondary' : 'destructive'}>
                      {riskScore}/100
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <Badge variant={isBanned ? 'destructive' : 'default'}>
                      {isBanned ? 'Banned' : 'Active'}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Verification:</span>
                    <Badge variant={isVerified ? 'default' : 'secondary'}>
                      {verificationLevel}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Quests */}
        <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-cyan-400" />
              Active Quests ({activeQuests?.length || 0})
            </CardTitle>
            <CardDescription>
              Complete quests to earn XP and improve your reputation
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(!activeQuests || activeQuests.length === 0) ? (
              <div className="text-center py-8 text-gray-400">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No active quests available</p>
                <p className="text-sm">Check back later for new quests!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeQuests.map((quest) => (
                  <div key={quest.id} className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-cyan-400">{quest.title}</h3>
                      <Badge variant="outline">{quest.reward} XP</Badge>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">{quest.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress:</span>
                        <span>{quest.progress}/{quest.targetValue}</span>
                      </div>
                      <Progress value={(quest.progress / quest.targetValue) * 100} className="h-2" />
                      <Button 
                        onClick={() => handleCompleteQuest(quest.id)}
                        size="sm"
                        className="w-full"
                        disabled={quest.progress < quest.targetValue}
                      >
                        {quest.progress >= quest.targetValue ? 'Complete Quest' : 'In Progress'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-card/50 backdrop-blur-sm border-yellow-500/20 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6 text-yellow-400" />
              Achievements ({unlockedAchievements?.length || 0}/{achievements?.length || 0})
            </CardTitle>
            <CardDescription>
              Unlock achievements to showcase your trading prowess
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Unlocked Achievements */}
              <div>
                <h4 className="font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Unlocked ({unlockedAchievements?.length || 0})
                </h4>
                <div className="space-y-2">
                  {(unlockedAchievements || []).slice(0, 5).map((achievement) => (
                    <div key={achievement.id} className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <div className="flex items-center gap-2">
                        <div className="text-lg">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium text-yellow-400">{achievement.title}</div>
                          <div className="text-xs text-gray-400">{achievement.description}</div>
                        </div>
                        <Badge variant="default" className="text-xs">
                          {achievement.rarity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locked Achievements */}
              <div>
                <h4 className="font-semibold text-gray-400 mb-3 flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Locked ({lockedAchievements?.length || 0})
                </h4>
                <div className="space-y-2">
                  {(lockedAchievements || []).slice(0, 5).map((achievement) => (
                    <div key={achievement.id} className="p-3 bg-gray-500/10 rounded-lg border border-gray-500/20 opacity-60">
                      <div className="flex items-center gap-2">
                        <div className="text-lg grayscale">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-400">{achievement.title}</div>
                          <div className="text-xs text-gray-500">{achievement.description}</div>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {achievement.rarity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <Card className="bg-card/50 backdrop-blur-sm border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-6 w-6 text-green-400" />
              Trading Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-500/10 rounded-lg">
                <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">{totalTrades}</div>
                <div className="text-xs text-gray-400">Total Trades</div>
              </div>
              <div className="text-center p-4 bg-green-500/10 rounded-lg">
                <div className="text-2xl font-bold text-green-400">${totalVolume.toLocaleString('en-US')}</div>
                <div className="text-xs text-gray-400">Total Volume</div>
              </div>
              <div className="text-center p-4 bg-green-500/10 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{reputationScore}</div>
                <div className="text-xs text-gray-400">Reputation Score</div>
              </div>
              <div className="text-center p-4 bg-green-500/10 rounded-lg">
                <div className="text-2xl font-bold text-green-400">{riskScore}</div>
                <div className="text-xs text-gray-400">Risk Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
