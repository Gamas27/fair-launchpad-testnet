'use client'

import { useReputationStore } from '@/lib/reputation/reputationStore'
import { 
  ReputationCard, 
  QuestInterface, 
  AchievementSystem, 
  XPProgressBar,
  ReputationBenefits 
} from '@/components/reputation'
import { G8Card, G8CardContent, G8CardHeader, G8CardTitle } from '@/components/ui/g8-card'
import { G8Button } from '@/components/ui/g8-button'
import { Trophy, Star, Zap, Crown } from 'lucide-react'

export default function ReputationPage() {
  const {
    reputationData,
    benefits,
    quests,
    achievements,
    addXP,
    completeQuest,
    updateQuestProgress,
    unlockAchievement,
    resetReputation
  } = useReputationStore()

  const handleQuestComplete = (questId: string) => {
    completeQuest(questId)
    addXP(quests.find(q => q.id === questId)?.xpReward || 0)
  }

  const handleAddXP = (amount: number) => {
    addXP(amount)
  }

  const handleUnlockAchievement = (achievementId: string) => {
    unlockAchievement(achievementId)
  }

  const handleReset = () => {
    resetReputation()
  }

  return (
    <div className="min-h-screen bg-g8-bg p-4 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-g8-text-primary">
            Reputation System
          </h1>
          <p className="text-g8-text-secondary">
            Earn XP, complete quests, and unlock achievements to level up your trading experience
          </p>
        </div>

        {/* Demo Controls */}
        <G8Card variant="glass" className="mb-6">
          <G8CardHeader>
            <G8CardTitle>Demo Controls</G8CardTitle>
          </G8CardHeader>
          <G8CardContent>
            <div className="flex flex-wrap gap-2">
              <G8Button onClick={() => handleAddXP(100)} variant="primary" size="sm">
                +100 XP
              </G8Button>
              <G8Button onClick={() => handleAddXP(500)} variant="primary" size="sm">
                +500 XP
              </G8Button>
              <G8Button onClick={() => handleAddXP(1000)} variant="primary" size="sm">
                +1000 XP
              </G8Button>
              <G8Button onClick={handleReset} variant="danger" size="sm">
                Reset
              </G8Button>
            </div>
          </G8CardContent>
        </G8Card>

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
            <QuestInterface 
              quests={quests} 
              onQuestComplete={handleQuestComplete}
            />
          </G8CardContent>
        </G8Card>

        {/* Achievements */}
        <G8Card variant="default">
          <G8CardHeader>
            <G8CardTitle>Achievements</G8CardTitle>
          </G8CardHeader>
          <G8CardContent>
            <AchievementSystem 
              achievements={achievements}
            />
          </G8CardContent>
        </G8Card>

        {/* Level Icons Demo */}
        <G8Card variant="gradient">
          <G8CardHeader>
            <G8CardTitle>Level Progression</G8CardTitle>
          </G8CardHeader>
          <G8CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center space-y-2">
                <div className="p-4 bg-amber-600/10 rounded-g8-lg border border-amber-600/30">
                  <Trophy className="h-8 w-8 text-amber-600 mx-auto" />
                </div>
                <h3 className="font-semibold text-g8-text-primary">Bronze</h3>
                <p className="text-sm text-g8-text-secondary">0-999 XP</p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="p-4 bg-gray-400/10 rounded-g8-lg border border-gray-400/30">
                  <Star className="h-8 w-8 text-gray-400 mx-auto" />
                </div>
                <h3 className="font-semibold text-g8-text-primary">Silver</h3>
                <p className="text-sm text-g8-text-secondary">1000-2499 XP</p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="p-4 bg-yellow-500/10 rounded-g8-lg border border-yellow-500/30">
                  <Zap className="h-8 w-8 text-yellow-500 mx-auto" />
                </div>
                <h3 className="font-semibold text-g8-text-primary">Gold</h3>
                <p className="text-sm text-g8-text-secondary">2500-4999 XP</p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="p-4 bg-blue-400/10 rounded-g8-lg border border-blue-400/30">
                  <Crown className="h-8 w-8 text-blue-400 mx-auto" />
                </div>
                <h3 className="font-semibold text-g8-text-primary">Diamond</h3>
                <p className="text-sm text-g8-text-secondary">5000+ XP</p>
              </div>
            </div>
          </G8CardContent>
        </G8Card>
      </div>
    </div>
  )
}
