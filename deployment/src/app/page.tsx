'use client'

import { useState } from 'react'
import DeeprInspiredLanding from '@/components/DeeprInspiredLanding'
import DeeprInspiredLaunch from '@/components/DeeprInspiredLaunch'
import TokenLaunchForm from '@/components/TokenLaunchForm'
import TokenList from '@/components/TokenList'
import DeeprInspiredTrading from '@/components/DeeprInspiredTrading'
import UserProfile from '@/components/UserProfile'
import { Navigation } from '@/components/Navigation'
import { WalletButton } from '@/components/WalletConnect/WalletButton'
import { WalletInfo } from '@/components/WalletConnect/WalletInfo'
import { WorldIdButton } from '@/components/WorldId/WorldIdButton'
import { WorldIdStatus } from '@/components/WorldId/WorldIdStatus'
import { mockToken, mockUser } from '@/data/mockData'

export default function Home() {
  const [activeTab, setActiveTab] = useState('landing')

  const renderContent = () => {
    switch (activeTab) {
      case 'landing':
        return <DeeprInspiredLanding onNavigateToLaunch={() => setActiveTab('launch')} />
      case 'launch':
        return (
          <div className="space-y-6">
            <TokenLaunchForm />
            <TokenList />
          </div>
        )
      case 'trading':
        return <DeeprInspiredTrading />
      case 'profile':
        return <UserProfile />
      default:
        return <DeeprInspiredLanding onNavigateToLaunch={() => setActiveTab('launch')} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto px-4 py-4">
        {/* Mobile-optimized header */}
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h1 className="text-xl font-bold">FairLaunch</h1>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <WorldIdButton />
            <WalletButton />
          </div>
        </div>
        
        {/* Mobile-optimized status cards */}
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <WalletInfo />
          <WorldIdStatus />
        </div>
        
        {renderContent()}
      </main>
    </div>
  )
}
