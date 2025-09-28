'use client'

import React, { useState, useEffect } from 'react'
import { 
  WelcomeScreen,
  AgeVerification,
  WorldIdVerification,
  VerificationFailed,
  RecoveryOptions,
  WalletCreated,
  WalletConfirmation
} from './WelcomeScreen'
import { useG8 } from '@/lib/state'
import { useNavigation } from '@/lib/routing'

type OnboardingStep = 
  | 'welcome' 
  | 'age-verification' 
  | 'world-id' 
  | 'verification-failed' 
  | 'recovery-options' 
  | 'wallet-confirmation' 
  | 'wallet-created' 
  | 'complete'

interface EnhancedOnboardingProps {
  onComplete: () => void
  className?: string
}

export const EnhancedOnboarding = ({ onComplete, className }: EnhancedOnboardingProps) => {
  const { setUser, setLoading, setError } = useG8()
  const { navigate } = useNavigation()
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome')
  const [isLoading, setIsLoading] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [verificationLevel, setVerificationLevel] = useState<'Device' | 'Phone' | 'Orb'>('Device')
  const [progress, setProgress] = useState(0)

  // Simulate World ID verification
  const handleWorldIdVerification = async () => {
    setIsLoading(true)
    setLoading(true)
    
    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Randomly assign verification level
      const levels: ('Device' | 'Phone' | 'Orb')[] = ['Device', 'Phone', 'Orb']
      const randomLevel = levels[Math.floor(Math.random() * levels.length)]
      setVerificationLevel(randomLevel)
      
      setCurrentStep('recovery-options')
    } catch (error) {
      setError('World ID verification failed')
      setCurrentStep('verification-failed')
    } finally {
      setIsLoading(false)
      setLoading(false)
    }
  }

  // Simulate wallet creation
  const handleWalletCreation = async () => {
    setIsLoading(true)
    setLoading(true)
    setCurrentStep('wallet-confirmation')
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    try {
      // Simulate wallet creation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`
      setWalletAddress(mockAddress)
      
      // Update user state
      setUser({
        id: 'user_' + Date.now(),
        walletAddress: mockAddress,
        worldIdHash: 'hash_' + Date.now(),
        verificationLevel,
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
      
      setCurrentStep('wallet-created')
    } catch (error) {
      setError('Wallet creation failed')
    } finally {
      setIsLoading(false)
      setLoading(false)
    }
  }

  // Handle retry from verification failed
  const handleRetryVerification = () => {
    setCurrentStep('world-id')
    setError(null)
  }

  // Handle contact support
  const handleContactSupport = () => {
    // In a real app, this would open support chat or email
    console.log('Contact support')
  }

  // Handle view wallet
  const handleViewWallet = () => {
    navigate('profile')
    onComplete()
  }

  // Handle create token
  const handleCreateToken = () => {
    navigate('create')
    onComplete()
  }

  // Handle cancel wallet creation
  const handleCancelWallet = () => {
    setCurrentStep('recovery-options')
    setProgress(0)
  }

  // Render current step
  switch (currentStep) {
    case 'welcome':
      return (
        <WelcomeScreen 
          onNext={() => setCurrentStep('age-verification')}
          className={className}
        />
      )

    case 'age-verification':
      return (
        <AgeVerification
          onNext={() => setCurrentStep('world-id')}
          onBack={() => setCurrentStep('welcome')}
          className={className}
        />
      )

    case 'world-id':
      return (
        <WorldIdVerification
          onVerify={handleWorldIdVerification}
          onBack={() => setCurrentStep('age-verification')}
          loading={isLoading}
          className={className}
        />
      )

    case 'verification-failed':
      return (
        <VerificationFailed
          onRetry={handleRetryVerification}
          onContactSupport={handleContactSupport}
          onBack={() => setCurrentStep('world-id')}
          className={className}
        />
      )

    case 'recovery-options':
      return (
        <RecoveryOptions
          onNext={handleWalletCreation}
          onBack={() => setCurrentStep('world-id')}
          className={className}
        />
      )

    case 'wallet-confirmation':
      return (
        <WalletConfirmation
          progress={progress}
          onCancel={handleCancelWallet}
          className={className}
        />
      )

    case 'wallet-created':
      return (
        <WalletCreated
          onViewWallet={handleViewWallet}
          onCreateToken={handleCreateToken}
          walletAddress={walletAddress}
          className={className}
        />
      )

    default:
      return null
  }
}

// Main onboarding page component
export const EnhancedOnboardingPage = () => {
  const [onboardingComplete, setOnboardingComplete] = useState(false)

  const handleOnboardingComplete = () => {
    setOnboardingComplete(true)
  }

  if (onboardingComplete) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="text-2xl font-bold text-green-400">Onboarding Complete!</div>
          <div className="text-gray-300">Redirecting to G8 platform...</div>
        </div>
      </div>
    )
  }

  return (
    <EnhancedOnboarding 
      onComplete={handleOnboardingComplete}
    />
  )
}
