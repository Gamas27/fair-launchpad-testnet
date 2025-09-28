'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Search, 
  Wallet, 
  BarChart3,
  Home,
  TrendingUp,
  Plus,
  ArrowRight,
  CheckCircle,
  Loader2,
  MessageCircle,
  Settings,
  Coins,
  User,
  Eye
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Import all modules
import { DiscoveryModuleWorldAppExport } from '@/modules/discovery-module/world-app'
import { ProfileModuleWorldAppExport } from '@/modules/profile-module/world-app'
import { NavigationModuleWorldApp } from '@/modules/navigation-module/world-app'
import { CoinProfileModuleWorldAppExport } from '@/modules/coin-profile-module/world-app'
import { ChatModuleWorldAppExport } from '@/modules/chat-module/world-app'
import { CreateCoinModuleWorldAppExport } from '@/modules/create-coin-module/world-app'
import { SettingsModuleWorldAppExport } from '@/modules/settings-module/world-app'

// Mock authentication state
function useMockAuth() {
  const [isVerified, setIsVerified] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const verifyWorldId = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsVerified(true)
    } finally {
      setLoading(false)
    }
  }

  const createWallet = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setAddress('0xMockPrivyWallet1234567890')
      setIsConnected(true)
    } finally {
      setLoading(false)
    }
  }

  return {
    isVerified,
    isConnected,
    address,
    loading,
    verifyWorldId,
    createWallet
  }
}

// Core Journey Component
function CoreJourneyFlow({ onComplete }: { onComplete: () => void }) {
  const { isVerified, isConnected, address, loading, verifyWorldId, createWallet } = useMockAuth()
  const [currentStep, setCurrentStep] = useState<'worldId' | 'wallet' | 'complete'>('worldId')

  useEffect(() => {
    if (isVerified && currentStep === 'worldId') {
      setCurrentStep('wallet')
    }
  }, [isVerified, currentStep])

  useEffect(() => {
    if (isConnected && currentStep === 'wallet') {
      setCurrentStep('complete')
      setTimeout(() => onComplete(), 2000)
    }
  }, [isConnected, currentStep, onComplete])

  const handleWorldId = async () => {
    await verifyWorldId()
  }

  const handleWallet = async () => {
    await createWallet()
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md card-gradient border-2 border-pink-400/50">
        <CardHeader>
          {currentStep === 'worldId' && (
            <>
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="h-5 w-5" />
                Step 1: Verify Your Identity
              </CardTitle>
              <CardDescription className="text-gray-300">
                World ID verification is required to create a wallet
              </CardDescription>
            </>
          )}
          {currentStep === 'wallet' && (
            <>
              <CardTitle className="flex items-center gap-2 text-white">
                <Wallet className="h-5 w-5" />
                Step 2: Create Your Wallet
              </CardTitle>
              <CardDescription className="text-gray-300">
                Your secure in-app wallet will be created via Privy
              </CardDescription>
            </>
          )}
          {currentStep === 'complete' && (
            <>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                Journey Complete!
              </CardTitle>
              <CardDescription className="text-gray-300">
                You're ready to launch tokens in the Fair Launchpad
              </CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {currentStep === 'worldId' && (
            <Button
              onClick={handleWorldId}
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Shield className="h-4 w-4 mr-2" />
              )}
              {loading ? 'Verifying...' : 'Verify with World ID'}
            </Button>
          )}
          
          {currentStep === 'wallet' && (
            <Button
              onClick={handleWallet}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Wallet className="h-4 w-4 mr-2" />
              )}
              {loading ? 'Creating Wallet...' : 'Create Privy Wallet'}
            </Button>
          )}

          {currentStep === 'complete' && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <h3 className="font-medium text-green-800 mb-2">What's Next?</h3>
              <ul className="space-y-1 text-sm text-green-700">
                <li>✅ World ID verification completed</li>
                <li>✅ Secure wallet created</li>
                <li>✅ Ready to launch tokens</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Bottom Navigation Component
function BottomNavigation({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discovery', label: 'Discovery', icon: Search },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-gray-800/50 z-50">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex flex-col items-center py-3 px-2 transition-colors",
                activeTab === tab.id
                  ? "text-cyan-400 border-t-2 border-cyan-400"
                  : "text-gray-400 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Main App Component
export default function IntegratedApp() {
  const [journeyComplete, setJourneyComplete] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const [showCreateCoin, setShowCreateCoin] = useState(false)

  // Show Core Journey first
  if (!journeyComplete) {
    return <CoreJourneyFlow onComplete={() => setJourneyComplete(true)} />
  }

  // Show Create Coin flow
  if (showCreateCoin) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
          <div className="flex items-center justify-between p-3">
            <Button 
              variant="ghost" 
              onClick={() => setShowCreateCoin(false)}
              className="text-gray-400 hover:text-white"
            >
              ← Back
            </Button>
            <div className="text-lg font-bold gradient-text">Create Token</div>
            <div></div>
          </div>
        </div>
        <CreateCoinModuleWorldAppExport.CreateCoinModule />
      </div>
    )
  }

  // Show Coin Profile
  if (selectedToken) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
          <div className="flex items-center justify-between p-3">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedToken(null)}
              className="text-gray-400 hover:text-white"
            >
              ← Back
            </Button>
            <div className="text-lg font-bold gradient-text">Token Profile</div>
            <div></div>
          </div>
        </div>
        <CoinProfileModuleWorldAppExport.CoinProfileModule />
      </div>
    )
  }

  // Main App with Bottom Navigation
  return (
    <div className="min-h-screen bg-black text-white pb-16">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <div className="text-lg font-bold gradient-text">FairLaunch</div>
            <Badge className="bg-green-500 text-white text-xs font-bold animate-pulse">LIVE</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowCreateCoin(true)}
              className="text-gray-400 hover:text-white"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setActiveTab('settings')}
              className="text-gray-400 hover:text-white"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="p-4">
        {activeTab === 'home' && (
          <div className="space-y-4">
            <Card className="card-gradient border-2 border-pink-400/50">
              <CardHeader>
                <CardTitle className="text-white">Welcome to FairLaunch</CardTitle>
                <CardDescription className="text-gray-300">
                  Anti-bot meme coin launchpad with World ID verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    onClick={() => setShowCreateCoin(true)}
                    className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Token
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                    onClick={() => setActiveTab('discovery')}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Discover
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="card-gradient border-2 border-cyan-400/50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-400">1,250</div>
                  <div className="text-sm text-gray-400">REP Score</div>
                </CardContent>
              </Card>
              <Card className="card-gradient border-2 border-purple-400/50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">15</div>
                  <div className="text-sm text-gray-400">Tokens Created</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="card-gradient border-2 border-green-400/50">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">Created MEME Token</span>
                  <Badge variant="outline" className="badge-outline">2h ago</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">Traded DOGE</span>
                  <Badge variant="outline" className="badge-outline">5h ago</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">Joined ARC Community</span>
                  <Badge variant="outline" className="badge-outline">1d ago</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'discovery' && (
          <DiscoveryModuleWorldAppExport.DiscoveryModule />
        )}

        {activeTab === 'chat' && (
          <ChatModuleWorldAppExport.ChatModule />
        )}

        {activeTab === 'profile' && (
          <ProfileModuleWorldAppExport.ProfileModule />
        )}

        {activeTab === 'settings' && (
          <SettingsModuleWorldAppExport.SettingsModule />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}