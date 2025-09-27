'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Shield, 
  Wallet, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  User, 
  Coins, 
  Network,
  Copy,
  ExternalLink,
  ArrowRight,
  Rocket
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================================================
// CORE JOURNEY WORLD APP - SIMPLIFIED FOR WORLD APP DEPLOYMENT
// ============================================================================

interface WorldAppJourneyProps {
  className?: string
  onJourneyComplete?: () => void
}

export const WorldAppJourney = ({ 
  className, 
  onJourneyComplete 
}: WorldAppJourneyProps) => {
  const [currentStep, setCurrentStep] = useState<'worldid' | 'wallet' | 'complete'>('worldid')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState(false)
  const [verificationLevel, setVerificationLevel] = useState<'Device' | 'Phone' | 'Orb'>('Device')

  // Simulate World ID verification
  const handleWorldIdVerification = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Simulate World ID verification process
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsVerified(true)
      setVerificationLevel('Orb')
      setCurrentStep('wallet')
    } catch (err) {
      setError('World ID verification failed')
    } finally {
      setIsLoading(false)
    }
  }

  // Simulate wallet creation
  const handleWalletCreation = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Simulate wallet creation process
      await new Promise(resolve => setTimeout(resolve, 1500))
      const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`
      setWalletAddress(mockAddress)
      setCurrentStep('complete')
      
      if (onJourneyComplete) {
        onJourneyComplete()
      }
    } catch (err) {
      setError('Wallet creation failed')
    } finally {
      setIsLoading(false)
    }
  }

  const getVerificationBadgeColor = (level: string) => {
    switch (level) {
      case 'Orb': return 'bg-gradient-to-r from-purple-500 to-pink-600'
      case 'Phone': return 'bg-gradient-to-r from-blue-500 to-cyan-600'
      case 'Device': return 'bg-gradient-to-r from-green-500 to-emerald-600'
      default: return 'bg-gray-500'
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <Card className={cn("w-full max-w-md mx-auto", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            {currentStep === 'worldid' ? 'Verifying Identity...' : 
             currentStep === 'wallet' ? 'Creating Wallet...' : 
             'Processing...'}
          </CardTitle>
          <CardDescription>
            {currentStep === 'worldid' ? 'Please complete World ID verification' :
             currentStep === 'wallet' ? 'Setting up your secure wallet...' :
             'Please wait...'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-3 h-3 rounded-full",
                isVerified ? "bg-green-500" : "bg-gray-300"
              )} />
              <span className="text-sm">World ID Verification</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-3 h-3 rounded-full",
                walletAddress ? "bg-green-500" : "bg-gray-300"
              )} />
              <span className="text-sm">Wallet Creation</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Show complete state
  if (currentStep === 'complete' && walletAddress) {
    return (
      <Card className={cn("w-full max-w-md mx-auto", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Journey Complete!
          </CardTitle>
          <CardDescription>
            Your secure wallet is ready for token operations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* World ID Status */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">World ID</span>
            </div>
            <Badge className={cn("text-white", getVerificationBadgeColor(verificationLevel))}>
              {verificationLevel} Verified
            </Badge>
          </div>

          {/* Wallet Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Address:</span>
              <Badge variant="outline" className="font-mono text-xs">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </Badge>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Ready to Launch Tokens</span>
            </div>
            <p className="text-xs text-green-600 mt-1">
              You can now create and launch tokens in the app
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Show error states
  if (error) {
    return (
      <Card className={cn("w-full max-w-md mx-auto", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
          <Button
            onClick={() => {
              setError(null)
              setCurrentStep('worldid')
            }}
            className="w-full"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Show World ID verification step
  if (currentStep === 'worldid') {
    return (
      <Card className={cn("w-full max-w-md mx-auto", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Step 1: Verify Your Identity
          </CardTitle>
          <CardDescription>
            World ID verification is required to create a wallet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-3 h-3 rounded-full bg-gray-300" />
              <span>1. Verify your identity with World ID</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-3 h-3 rounded-full bg-gray-300" />
              <span>2. Get your secure wallet created</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-3 h-3 rounded-full bg-gray-300" />
              <span>3. Start launching tokens</span>
            </div>
          </div>

          <Button
            onClick={handleWorldIdVerification}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Shield className="h-4 w-4 mr-2" />
            Verify with World ID
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Show wallet creation step
  if (currentStep === 'wallet') {
    return (
      <Card className={cn("w-full max-w-md mx-auto", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Step 2: Create Your Wallet
          </CardTitle>
          <CardDescription>
            Create a secure wallet to launch and trade tokens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* World ID Status */}
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">World ID Verified</span>
            </div>
            <Badge className={cn("text-white", getVerificationBadgeColor(verificationLevel))}>
              {verificationLevel}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Identity verified with World ID</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-3 h-3 rounded-full bg-gray-300" />
              <span>Creating secure wallet...</span>
            </div>
          </div>

          <Button
            onClick={handleWalletCreation}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Wallet className="h-4 w-4 mr-2" />
            Create Secure Wallet
          </Button>
        </CardContent>
      </Card>
    )
  }

  return null
}

// ============================================================================
// CORE JOURNEY WORLD APP - MAIN PAGE
// ============================================================================

export const WorldAppJourneyPage = () => {
  const [journeyComplete, setJourneyComplete] = useState(false)

  const handleJourneyComplete = () => {
    setJourneyComplete(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Fair Launchpad
          </h1>
          <p className="text-gray-600">
            Launch tokens with World ID verification and secure wallets
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <Shield className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">World ID</span>
          </div>
          
          <ArrowRight className="h-4 w-4 text-gray-400" />
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <Wallet className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">Secure Wallet</span>
          </div>
          
          <ArrowRight className="h-4 w-4 text-gray-400" />
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <Rocket className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">Token Launch</span>
          </div>
        </div>

        {/* Main Journey Component */}
        <WorldAppJourney 
          onJourneyComplete={handleJourneyComplete}
        />

        {/* Success Message */}
        {journeyComplete && (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                Journey Complete!
              </CardTitle>
              <CardDescription>
                        You&apos;re ready to launch tokens in the Fair Launchpad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <h3 className="font-medium text-green-800 mb-2">What&apos;s Next?</h3>
                <ul className="space-y-1 text-sm text-green-700">
                  <li>✅ World ID verification completed</li>
                  <li>✅ Secure wallet created</li>
                  <li>✅ Ready to launch tokens</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Debug Information */}
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-sm">World App Mini App</CardTitle>
            <CardDescription>
              Core Journey Module v1.0.0
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs space-y-1 font-mono">
              <div>Environment: World App</div>
              <div>Version: v1.0.0</div>
              <div>Module: Core Journey</div>
              <div>Status: {journeyComplete ? 'Complete' : 'In Progress'}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ============================================================================
// CORE JOURNEY WORLD APP - EXPORTS
// ============================================================================

export const CoreJourneyWorldApp = {
  version: 'v1.0.0-world-app',
  name: 'Core Journey World App',
  
  // Components
  WorldAppJourney,
  WorldAppJourneyPage,
  
  // Metadata
  features: {
    worldIdRequired: true,
    privyWalletOnly: true,
    guidedFlow: true,
    worldAppOptimized: true,
    simplified: true
  }
}
