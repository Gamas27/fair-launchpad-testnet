'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useSafeWorldId } from '@/providers/SafeWorldIdProvider'
import { usePrivy } from '@privy-io/react-auth'
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
  ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface GuidedWalletCreationProps {
  className?: string
  onWalletCreated?: (address: string) => void
  onError?: (error: string) => void
}

export function GuidedWalletCreation({ 
  className, 
  onWalletCreated, 
  onError 
}: GuidedWalletCreationProps) {
  const { 
    isVerified, 
    verificationLevel, 
    worldId, 
    loading: worldIdLoading, 
    error: worldIdError,
    connect: connectWorldId,
    disconnect: disconnectWorldId,
    clearError: clearWorldIdError
  } = useSafeWorldId()
  
  const { 
    ready, 
    authenticated, 
    user, 
    login, 
    logout,
    createWallet 
  } = usePrivy()

  const [currentStep, setCurrentStep] = useState<'worldid' | 'wallet' | 'complete'>('worldid')
  const [isCreatingWallet, setIsCreatingWallet] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  // Auto-advance to wallet creation after World ID verification
  useEffect(() => {
    if (isVerified && currentStep === 'worldid') {
      setCurrentStep('wallet')
    }
  }, [isVerified, currentStep])

  // Auto-advance to complete after wallet creation
  useEffect(() => {
    if (authenticated && user?.wallet?.address && currentStep === 'wallet') {
      setWalletAddress(user.wallet.address)
      setCurrentStep('complete')
      if (onWalletCreated) {
        onWalletCreated(user.wallet.address)
      }
    }
  }, [authenticated, user, currentStep, onWalletCreated])

  const handleWorldIdConnect = async () => {
    try {
      clearWorldIdError()
      await connectWorldId()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'World ID verification failed'
      if (onError) {
        onError(errorMessage)
      }
    }
  }

  const handleCreateWallet = async () => {
    if (!isVerified) {
      if (onError) {
        onError('Please verify with World ID first')
      }
      return
    }

    try {
      setIsCreatingWallet(true)
      await createWallet()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Wallet creation failed'
      if (onError) {
        onError(errorMessage)
      }
    } finally {
      setIsCreatingWallet(false)
    }
  }

  const handleCopyAddress = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
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
  if (worldIdLoading || isCreatingWallet) {
    return (
      <Card className={cn("w-full max-w-md", className)}>
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
                authenticated ? "bg-green-500" : "bg-gray-300"
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
      <Card className={cn("w-full max-w-md", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Wallet Created Successfully
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
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyAddress}
                  className="h-6 w-6 p-0"
                >
                  {copied ? (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
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
  if (worldIdError) {
    return (
      <Card className={cn("w-full max-w-md", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Verification Error
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {worldIdError}
            </AlertDescription>
          </Alert>
          <Button
            onClick={() => {
              clearWorldIdError()
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
      <Card className={cn("w-full max-w-md", className)}>
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
            onClick={handleWorldIdConnect}
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
      <Card className={cn("w-full max-w-md", className)}>
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
            onClick={handleCreateWallet}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={!isVerified}
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
