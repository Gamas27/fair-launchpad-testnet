'use client'

import { useState } from 'react'
import LandingPage from '@/components/LandingPage'
import TokenLaunchScreen from '@/components/TokenLaunchScreen'
import ReputationScreen from '@/components/ReputationScreen'
import { TradingInterface } from '@/components/trading/TradingInterface'
import { Navigation } from '@/components/Navigation'
import { WalletButton } from '@/components/WalletConnect/WalletButton'
import { WalletInfo } from '@/components/WalletConnect/WalletInfo'
import { WorldIdButton } from '@/components/WorldId/WorldIdButton'
import { WorldIdStatus } from '@/components/WorldId/WorldIdStatus'
import { mockToken, mockUser, mockQuests, mockAchievements } from '@/data/mockData'

export default function Home() {
  const [activeTab, setActiveTab] = useState('landing')

  const renderContent = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />
      case 'launch':
        return <TokenLaunchScreen token={mockToken} user={mockUser} />
      case 'reputation':
        return <ReputationScreen user={mockUser} quests={mockQuests} achievements={mockAchievements} />
      case 'trading':
        return <TradingInterface />
      default:
        return <LandingPage />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">FairLaunch UI</h1>
          <div className="flex items-center gap-4">
            <WorldIdButton />
            <WalletButton />
          </div>
        </div>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <WalletInfo />
          <WorldIdStatus />
        </div>
        {renderContent()}
      </main>
    </div>
  )
}
