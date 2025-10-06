'use client'

import React from 'react'
import G8AppLayout from '@/components/g8/G8AppLayout'
import { useG8User } from '@/lib/state/context'
import { 
  ReputationCard, 
  QuestInterface, 
  AchievementSystem, 
  XPProgressBar, 
  ReputationBenefits 
} from '@/components/reputation'
import { useReputationStore } from '@/lib/reputation/reputationStore'

export default function ReputationPage() {
  const { user: currentUser, isAuthenticated } = useG8User()

  // Since World ID is mandatory, redirect to onboarding if not authenticated
  if (!isAuthenticated || !currentUser) {
    return (
      <G8AppLayout>
        <div className="p-6 text-center">
          <div className="w-20 h-20 bg-g8-surface2 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-g8-text-secondary text-2xl">🔒</span>
          </div>
          <h1 className="text-g8-h1 text-g8-text-primary font-bold mb-2">World ID Required</h1>
          <p className="text-g8-body text-g8-text-secondary mb-6">
            Please complete World ID verification to access your reputation.
          </p>
          <button 
            onClick={() => window.location.href = '/g8/onboarding'}
            className="bg-gradient-g8 text-g8-bg px-6 py-3 rounded-g8-lg font-medium hover:opacity-90 transition-opacity"
          >
            Complete World ID Verification
          </button>
        </div>
      </G8AppLayout>
    )
  }
  const { 
    reputationData, 
    quests, 
    achievements,
    benefits
  } = useReputationStore()

  // Create xpProgress data from reputationData
  const xpProgress = {
    currentXP: reputationData.xp,
    currentLevelXP: reputationData.currentLevelXp,
    nextLevelXP: reputationData.nextLevelXp,
    level: reputationData.level,
    progress: reputationData.progress
  }

  return (
    <G8AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-g8-h1 text-g8-text-primary font-bold mb-2">Reputation</h1>
          <p className="text-g8-body text-g8-text-secondary">Build your reputation and unlock benefits</p>
        </div>

        {/* Reputation Card */}
        <ReputationCard reputation={reputationData} />

        {/* XP Progress */}
        <XPProgressBar xpData={xpProgress} />

        {/* Quest Interface */}
        <QuestInterface 
          quests={quests}
          onQuestComplete={(questId) => {
            console.log('Quest completed:', questId)
            // Handle quest completion logic
          }}
        />

        {/* Achievement System */}
        <AchievementSystem 
          achievements={achievements}
          onAchievementUnlock={(achievementId) => {
            console.log('Achievement unlocked:', achievementId)
            // Handle achievement unlock logic
          }}
        />

        {/* Reputation Benefits */}
        <ReputationBenefits 
          benefits={benefits}
        />
      </div>
    </G8AppLayout>
  )
}
