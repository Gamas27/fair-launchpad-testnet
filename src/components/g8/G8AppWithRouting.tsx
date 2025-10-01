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

// Import routing and state management
import { 
  useNavigation, 
  useRouteParams, 
  useRouteGuard, 
  useTabNavigation,
  RouteGuard,
  useRouteAnalytics
} from '@/lib/routing'
import { 
  useG8, 
  useG8User, 
  useG8Navigation, 
  useG8Data,
  useOptimizedSelector,
  PerformanceProfiler
} from '@/lib/state'
import { useG8Integration } from '@/lib/routing/G8NavigationIntegration'
import { G8NavigationTest } from './G8NavigationTest'

// Import all modules
import { DiscoveryModuleWorldAppExport } from '@/modules/discovery-module/world-app'
import { ProfileModuleWorldAppExport } from '@/modules/profile-module/world-app'
import { NavigationModuleWorldApp } from '@/modules/navigation-module/world-app'
import { CoinProfileModuleWorldAppExport } from '@/modules/coin-profile-module/world-app'
import { ChatModuleWorldAppExport } from '@/modules/chat-module/world-app'
import { CreateCoinModuleWorldAppExport } from '@/modules/create-coin-module/world-app'
import { SettingsModuleWorldAppExport } from '@/modules/settings-module/world-app'

// Import enhanced onboarding, home dashboard, token creation, token details, and user profile
import { EnhancedOnboarding } from './EnhancedOnboarding'
import { HomeDashboard, GraduationZone } from './HomeDashboard'
import { TokenCreationFlow } from './TokenCreationFlow'
import { TokenDetails } from './TokenDetails'
import { UserProfile } from './UserProfile'

// Enhanced authentication hook with state management
function useEnhancedAuth() {
  const { setUser, setLoading, setError } = useG8()
  const { isAuthenticated, isWorldIdVerified, isWalletConnected } = useG8User()
  const [address, setAddress] = useState<string | null>(null)
  const [loading, setLoadingState] = useState(false)

  const verifyWorldId = async () => {
    setLoadingState(true)
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Update state with new user data
      setUser({
        id: 'user_' + Date.now(),
        walletAddress: address || '',
        worldIdHash: 'hash_' + Date.now(),
        verificationLevel: 'Device',
        reputationScore: 1250,
        reputationLevel: 'Gold',
        totalTrades: 15,
        totalVolume: 50000,
        isWorldIdVerified: true,
        isWalletConnected: true,
        walletCreatedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    } catch (error) {
      setError('World ID verification failed')
    } finally {
      setLoadingState(false)
      setLoading(false)
    }
  }

  const createWallet = async () => {
    setLoadingState(true)
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      const newAddress = '0xMockPrivyWallet' + Date.now()
      setAddress(newAddress)
      
      // Update user with wallet info
      setUser({
        id: 'user_' + Date.now(),
        walletAddress: newAddress,
        worldIdHash: 'hash_' + Date.now(),
        verificationLevel: 'Device',
        reputationScore: 1250,
        reputationLevel: 'Gold',
        totalTrades: 15,
        totalVolume: 50000,
        isWorldIdVerified: true,
        isWalletConnected: true,
        walletCreatedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    } catch (error) {
      setError('Wallet creation failed')
    } finally {
      setLoadingState(false)
      setLoading(false)
    }
  }

  return {
    isVerified: isWorldIdVerified,
    isConnected: isWalletConnected,
    address,
    loading: loading || useG8().state.isLoading,
    verifyWorldId,
    createWallet
  }
}

// Core Journey Component with routing integration
function CoreJourneyFlow({ onComplete }: { onComplete: () => void }) {
  const { isVerified, isConnected, address, loading, verifyWorldId, createWallet } = useEnhancedAuth()
  const { navigate } = useNavigation()
  const { trackNavigation } = useRouteAnalytics()
  const [currentStep, setCurrentStep] = useState<'worldId' | 'wallet' | 'complete'>('worldId')

  useEffect(() => {
    if (isVerified && currentStep === 'worldId') {
      setCurrentStep('wallet')
      trackNavigation('wallet-setup', { step: 'wallet' })
    }
  }, [isVerified, currentStep, trackNavigation])

  useEffect(() => {
    if (isConnected && currentStep === 'wallet') {
      setCurrentStep('complete')
      trackNavigation('journey-complete', { step: 'complete' })
      setTimeout(() => onComplete(), 2000)
    }
  }, [isConnected, currentStep, onComplete, trackNavigation])

  const handleWorldId = async () => {
    trackNavigation('world-id-verification', { step: 'worldId' })
    await verifyWorldId()
  }

  const handleWallet = async () => {
    trackNavigation('wallet-creation', { step: 'wallet' })
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
                You're ready to launch tokens in the G8 platform
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

// Enhanced Bottom Navigation with routing
function EnhancedBottomNavigation() {
  const { switchTab, getAvailableTabs, currentTab } = useTabNavigation()
  const { navigate } = useNavigation()
  const { trackNavigation } = useRouteAnalytics()
  
  const tabs = [
    { id: 'home', label: 'Home', icon: Home, route: 'home' as const },
    { id: 'discovery', label: 'Discovery', icon: Search, route: 'g8' as const },
    { id: 'chat', label: 'Chat', icon: MessageCircle, route: 'chat' as const },
    { id: 'profile', label: 'Profile', icon: User, route: 'profile' as const },
    { id: 'settings', label: 'Settings', icon: Settings, route: 'settings' as const }
  ]

  const handleTabClick = (tab: typeof tabs[0]) => {
    trackNavigation('tab-switch', { from: currentTab, to: tab.id })
    
    // Try to switch tab first
    if (switchTab(tab.route)) {
      return
    }
    
    // Fallback to navigation
    navigate(tab.route)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-gray-800/50 z-50">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = currentTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={cn(
                "flex-1 flex flex-col items-center py-3 px-2 transition-colors",
                isActive
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

// Main G8 App with integrated routing and state management
export default function G8AppWithRouting() {
  const { state, dispatch } = useG8()
  const { navigate, goBack } = useNavigation()
  const { trackNavigation } = useRouteAnalytics()
  const { setTokens, setChatRooms } = useG8Data()
  
  // Initialize G8 integration
  useG8Integration()
  
  // Optimized selectors
  const userTokens = useOptimizedSelector(
    (state) => state.tokens.filter(t => t.creatorId === state.user?.id),
    ['tokens', 'user.id']
  )
  
  const [journeyComplete, setJourneyComplete] = useState(false)
  const [selectedToken, setSelectedToken] = useState<string | null>(null)
  const [showCreateCoin, setShowCreateCoin] = useState(false)

  // Initialize data on mount
  useEffect(() => {
    // Load mock tokens
    const mockTokens = [
      {
        id: 'token_1',
        name: 'MEME Token',
        ticker: 'MEME',
        logo: '/api/placeholder/40/40',
        description: 'The ultimate meme token',
        marketCap: '$1.2M',
        volume: '$500K',
        price: 0.001,
        priceChange: 15.5,
        isLive: true,
        timeSinceLaunch: '2h',
        chartData: [0.0008, 0.0009, 0.001, 0.0011, 0.001],
        creatorId: state.user?.id || 'user_1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    
    setTokens(mockTokens)
    
    // Load mock chat rooms
    const mockChatRooms = [
      {
        id: 'chat_1',
        name: 'General Chat',
        type: 'general' as const,
        description: 'General discussion',
        repRequirement: 0,
        isLocked: false,
        membersCount: 150,
        onlineCount: 25,
        lastMessage: 'Welcome to the community!',
        lastMessageTime: new Date(),
        creatorId: 'system',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    
    setChatRooms(mockChatRooms)
  }, [setTokens, setChatRooms, state.user?.id])

  // Show Enhanced Onboarding first
  if (!journeyComplete) {
    return <EnhancedOnboarding onComplete={() => setJourneyComplete(true)} />
  }

  // Show Create Coin flow with routing
  if (showCreateCoin) {
    return (
      <RouteGuard route="create">
        <TokenCreationFlow
          onComplete={(tokenData) => {
            console.log('Token created:', tokenData)
            setShowCreateCoin(false)
            trackNavigation('token-created', { tokenName: tokenData.tokenName })
          }}
          onBack={() => {
            setShowCreateCoin(false)
            trackNavigation('back-from-create', { from: 'create' })
          }}
        />
      </RouteGuard>
    )
  }

  // Show Token Details with routing
  if (selectedToken) {
    return (
      <RouteGuard route="token-details">
        <TokenDetails
          tokenId={selectedToken}
          onBack={() => {
            setSelectedToken(null)
            trackNavigation('back-from-token', { from: 'token-details' })
          }}
        />
      </RouteGuard>
    )
  }

  // Main App with Enhanced Navigation
  return (
    <PerformanceProfiler componentName="G8AppWithRouting">
      <div className="min-h-screen bg-black text-white pb-16">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <div className="text-lg font-bold gradient-text">G8</div>
              <Badge className="bg-green-500 text-white text-xs font-bold animate-pulse">LIVE</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setShowCreateCoin(true)
                  trackNavigation('create-token-click', { from: 'home' })
                }}
                className="text-gray-400 hover:text-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('settings')}
                className="text-gray-400 hover:text-white"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Test - Remove this in production */}
        <G8NavigationTest />

        {/* Content based on current route */}
        <div className="p-4">
          {state.currentRoute === 'home' && (
            <div className="space-y-6">
              <HomeDashboard onTokenClick={(tokenId) => {
                setSelectedToken(tokenId)
                trackNavigation('token-click', { tokenId, from: 'home' })
              }} />
              <GraduationZone />
            </div>
          )}

          {state.currentRoute === 'g8' && (
            <DiscoveryModuleWorldAppExport.DiscoveryModule />
          )}

          {state.currentRoute === 'chat' && (
            <ChatModuleWorldAppExport.ChatModule />
          )}

          {state.currentRoute === 'profile' && (
            <UserProfile onBack={() => navigate('home')} />
          )}

          {state.currentRoute === 'settings' && (
            <UserProfile onBack={() => navigate('home')} />
          )}
        </div>

        {/* Enhanced Bottom Navigation */}
        <EnhancedBottomNavigation />
      </div>
    </PerformanceProfiler>
  )
}
