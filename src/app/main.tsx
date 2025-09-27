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
  Settings,
  Plus,
  ArrowRight,
  CheckCircle,
  Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'

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
    { id: 'profile', label: 'Profile', icon: Wallet },
    { id: 'navigation', label: 'Tokens', icon: BarChart3 }
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
export default function MainApp() {
  const [journeyComplete, setJourneyComplete] = useState(false)
  const [activeTab, setActiveTab] = useState('home')

  // Show Core Journey first
  if (!journeyComplete) {
    return <CoreJourneyFlow onComplete={() => setJourneyComplete(true)} />
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
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Settings className="h-4 w-4" />
          </Button>
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
                  <Button className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Token
                  </Button>
                  <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Trade
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'discovery' && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-2">Discovery</h2>
              <p className="text-gray-400">Search and discover tokens</p>
            </div>
            {/* Discovery content will be integrated here */}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-2">Profile</h2>
              <p className="text-gray-400">Your wallet and stats</p>
            </div>
            {/* Profile content will be integrated here */}
          </div>
        )}

        {activeTab === 'navigation' && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-2">Tokens</h2>
              <p className="text-gray-400">Token cards and charts</p>
            </div>
            {/* Navigation/Token content will be integrated here */}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
