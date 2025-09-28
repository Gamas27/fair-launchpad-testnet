'use client'

import React, { useState, useEffect } from 'react'
import { G8Card, G8CardContent, G8CardHeader, G8CardTitle } from '@/components/ui/g8-card'
import { G8Button } from '@/components/ui/g8-button'
import { G8Badge } from '@/components/ui/g8-badge'
import { 
  WelcomeScreenV2,
  AgeVerificationV2,
  WorldIdVerificationV2
} from './WelcomeScreenV2'
import { HomeDashboardV2, GraduationZoneV2 } from './HomeDashboardV2'
import { EnhancedBottomNavigationV2 } from './BottomNavigationV2'
import { 
  Plus, 
  Settings, 
  TrendingUp,
  Coins,
  Star,
  Activity
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Enhanced authentication hook with state management
function useEnhancedAuth() {
  const [isVerified, setIsVerified] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const verifyWorldId = async () => {
    setLoading(true)
    setError(null)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsVerified(true)
    } catch (err) {
      setError('World ID verification failed')
    } finally {
      setLoading(false)
    }
  }

  const createWallet = async () => {
    setLoading(true)
    setError(null)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      const newAddress = '0xMockPrivyWallet' + Date.now()
      setAddress(newAddress)
      setIsConnected(true)
    } catch (err) {
      setError('Wallet creation failed')
    } finally {
      setLoading(false)
    }
  }

  return {
    isVerified,
    isConnected,
    address,
    loading,
    error,
    verifyWorldId,
    createWallet
  }
}

// Core Journey Component with enhanced UI
function CoreJourneyFlowV2({ onComplete }: { onComplete: () => void }) {
  const { isVerified, isConnected, address, loading, error, verifyWorldId, createWallet } = useEnhancedAuth()
  const [currentStep, setCurrentStep] = useState<'welcome' | 'age' | 'worldId' | 'wallet' | 'complete'>('welcome')

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

  if (currentStep === 'welcome') {
    return <WelcomeScreenV2 onNext={() => setCurrentStep('age')} />
  }

  if (currentStep === 'age') {
    return (
      <AgeVerificationV2
        onNext={() => setCurrentStep('worldId')}
        onBack={() => setCurrentStep('welcome')}
      />
    )
  }

  if (currentStep === 'worldId') {
    return (
      <WorldIdVerificationV2
        onVerify={handleWorldId}
        onBack={() => setCurrentStep('age')}
        loading={loading}
      />
    )
  }

  if (currentStep === 'wallet') {
    return (
      <div className="min-h-screen bg-background-primary text-text-primary flex items-center justify-center p-4">
        <G8Card variant="gradient" size="lg" className="w-full max-w-md animate-scale-in">
          <G8CardHeader className="text-center">
            <G8CardTitle className="flex items-center justify-center gap-2 text-text-primary text-2xl">
              <Coins className="h-6 w-6 text-accent-cyan" />
              CREATE YOUR WALLET
            </G8CardTitle>
            <p className="text-text-secondary">
              Create a secure wallet to launch and trade tokens
            </p>
          </G8CardHeader>
          <G8CardContent className="space-y-6">
            <G8Card variant="success" size="sm">
              <div className="flex items-center gap-2 text-sm text-accent-green">
                <div className="w-2 h-2 rounded-full bg-accent-green" />
                <span>World ID verified</span>
              </div>
            </G8Card>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <div className="w-2 h-2 rounded-full bg-accent-green" />
                <span>Identity verified with World ID</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                <span>Creating secure wallet...</span>
              </div>
            </div>

            <G8Button
              onClick={handleWallet}
              disabled={loading}
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              icon={<Coins className="h-5 w-5" />}
            >
              {loading ? 'Creating Wallet...' : 'Create Secure Wallet'}
            </G8Button>
          </G8CardContent>
        </G8Card>
      </div>
    )
  }

  if (currentStep === 'complete') {
    return (
      <div className="min-h-screen bg-background-primary text-text-primary flex items-center justify-center p-4">
        <G8Card variant="success" size="lg" className="w-full max-w-md animate-bounce-in">
          <G8CardHeader className="text-center">
            <G8CardTitle className="flex items-center justify-center gap-2 text-accent-green text-2xl">
              <Star className="h-6 w-6" />
              JOURNEY COMPLETE!
            </G8CardTitle>
            <p className="text-text-secondary">
              You're ready to launch tokens in the G8 platform
            </p>
          </G8CardHeader>
          <G8CardContent className="space-y-6">
            <G8Card variant="glass" size="sm">
              <div className="text-sm text-accent-green font-medium mb-2">What's Next?</div>
              <ul className="space-y-1 text-xs text-text-secondary">
                <li>✅ World ID verification completed</li>
                <li>✅ Secure wallet created</li>
                <li>✅ Ready to launch tokens</li>
              </ul>
            </G8Card>
          </G8CardContent>
        </G8Card>
      </div>
    )
  }

  return null
}

// Main G8 App with enhanced routing and state management
export default function G8AppV3() {
  const [journeyComplete, setJourneyComplete] = useState(false)
  const [currentTab, setCurrentTab] = useState('home')
  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const [showCreateCoin, setShowCreateCoin] = useState(false)

  // Show Core Journey first
  if (!journeyComplete) {
    return <CoreJourneyFlowV2 onComplete={() => setJourneyComplete(true)} />
  }

  // Show Create Coin flow
  if (showCreateCoin) {
    return (
      <div className="min-h-screen bg-background-primary text-text-primary">
        <div className="sticky top-0 z-10 bg-background-primary/90 backdrop-blur-md border-b border-background-tertiary/50">
          <div className="flex items-center justify-between p-4">
            <G8Button 
              variant="ghost" 
              onClick={() => setShowCreateCoin(false)}
              className="text-text-muted hover:text-text-primary"
            >
              ← Back
            </G8Button>
            <div className="text-xl font-bold bg-gradient-neon bg-clip-text text-transparent">
              Create Token
            </div>
            <div></div>
          </div>
        </div>
        <div className="p-4">
          <G8Card variant="gradient" className="animate-fade-in-up">
            <G8CardContent className="p-8 text-center">
              <Coins className="h-16 w-16 text-accent-cyan mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-text-primary mb-2">Token Creation</h2>
              <p className="text-text-secondary mb-6">
                Create your token with our guided wizard
              </p>
              <G8Button variant="primary" size="lg">
                Start Creating
              </G8Button>
            </G8CardContent>
          </G8Card>
        </div>
      </div>
    )
  }

  // Show Token Details
  if (selectedToken) {
    return (
      <div className="min-h-screen bg-background-primary text-text-primary">
        <div className="sticky top-0 z-10 bg-background-primary/90 backdrop-blur-md border-b border-background-tertiary/50">
          <div className="flex items-center justify-between p-4">
            <G8Button 
              variant="ghost" 
              onClick={() => setSelectedToken(null)}
              className="text-text-muted hover:text-text-primary"
            >
              ← Back
            </G8Button>
            <div className="text-xl font-bold bg-gradient-neon bg-clip-text text-transparent">
              Token Profile
            </div>
            <div></div>
          </div>
        </div>
        <div className="p-4">
          <G8Card variant="gradient" className="animate-fade-in-up">
            <G8CardContent className="p-8 text-center">
              <Coins className="h-16 w-16 text-accent-cyan mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-text-primary mb-2">Token Details</h2>
              <p className="text-text-secondary mb-6">
                View token information and trading options
              </p>
              <G8Button variant="primary" size="lg">
                View Details
              </G8Button>
            </G8CardContent>
          </G8Card>
        </div>
      </div>
    )
  }

  // Main App with Enhanced Navigation
  return (
    <div className="min-h-screen bg-background-primary text-text-primary pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background-primary/90 backdrop-blur-md border-b border-background-tertiary/50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold bg-gradient-neon bg-clip-text text-transparent">
              G8
            </div>
            <G8Badge variant="live" size="sm" className="animate-pulse">
              LIVE
            </G8Badge>
          </div>
          <div className="flex items-center gap-2">
            <G8Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowCreateCoin(true)}
              className="text-text-muted hover:text-text-primary"
            >
              <Plus className="h-4 w-4" />
            </G8Button>
            <G8Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setCurrentTab('settings')}
              className="text-text-muted hover:text-text-primary"
            >
              <Settings className="h-4 w-4" />
            </G8Button>
          </div>
        </div>
      </div>

      {/* Content based on current tab */}
      <div className="p-4">
        {currentTab === 'home' && (
          <div className="space-y-6">
            <HomeDashboardV2 
              onTokenClick={(tokenId) => {
                setSelectedToken(tokenId)
              }} 
            />
            <GraduationZoneV2 />
          </div>
        )}

        {currentTab === 'discovery' && (
          <div className="space-y-6">
            <G8Card variant="gradient" className="animate-fade-in-up">
              <G8CardContent className="p-8 text-center">
                <TrendingUp className="h-16 w-16 text-accent-cyan mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">Discovery</h2>
                <p className="text-text-secondary mb-6">
                  Discover trending tokens and new opportunities
                </p>
                <G8Button variant="primary" size="lg">
                  Explore Tokens
                </G8Button>
              </G8CardContent>
            </G8Card>
          </div>
        )}

        {currentTab === 'chat' && (
          <div className="space-y-6">
            <G8Card variant="gradient" className="animate-fade-in-up">
              <G8CardContent className="p-8 text-center">
                <Activity className="h-16 w-16 text-accent-cyan mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">Community Chat</h2>
                <p className="text-text-secondary mb-6">
                  Join the conversation with other token creators
                </p>
                <G8Button variant="primary" size="lg">
                  Join Chat
                </G8Button>
              </G8CardContent>
            </G8Card>
          </div>
        )}

        {currentTab === 'profile' && (
          <div className="space-y-6">
            <G8Card variant="gradient" className="animate-fade-in-up">
              <G8CardContent className="p-8 text-center">
                <Coins className="h-16 w-16 text-accent-cyan mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">Your Profile</h2>
                <p className="text-text-secondary mb-6">
                  View your portfolio and trading history
                </p>
                <G8Button variant="primary" size="lg">
                  View Profile
                </G8Button>
              </G8CardContent>
            </G8Card>
          </div>
        )}

        {currentTab === 'settings' && (
          <div className="space-y-6">
            <G8Card variant="gradient" className="animate-fade-in-up">
              <G8CardContent className="p-8 text-center">
                <Settings className="h-16 w-16 text-accent-cyan mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">Settings</h2>
                <p className="text-text-secondary mb-6">
                  Configure your account and preferences
                </p>
                <G8Button variant="primary" size="lg">
                  Open Settings
                </G8Button>
              </G8CardContent>
            </G8Card>
          </div>
        )}
      </div>

      {/* Enhanced Bottom Navigation */}
      <EnhancedBottomNavigationV2 
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />
    </div>
  )
}
