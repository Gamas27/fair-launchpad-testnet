'use client'

import { useState } from 'react'
import LandingPage from '@/components/LandingPage'
import TokenLaunchScreen from '@/components/TokenLaunchScreen'
import ReputationScreen from '@/components/ReputationScreen'
import { TradingInterface } from '@/components/trading/TradingInterface'
import { Navigation } from '@/components/Navigation'
import { WalletButton } from '@/components/WalletConnect/WalletButton'
import { WalletInfo } from '@/components/WalletConnect/WalletInfo'
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
          <WalletButton />
        </div>
        <div className="mb-6">
          <WalletInfo />
        </div>
        {renderContent()}
      </main>
    </div>
  )
}
