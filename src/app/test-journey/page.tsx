'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { GuidedWalletCreation } from '@/components/Auth/GuidedWalletCreation'
import { TokenLaunchForm } from '@/components/Launch/TokenLaunchForm'
import { useAuth } from '@/contexts/AuthContext'
import { useSafeWorldId } from '@/providers/SafeWorldIdProvider'
import { useWallets } from '@privy-io/react-auth'
import { 
  CheckCircle, 
  AlertCircle, 
  Shield, 
  Wallet, 
  Rocket,
  ArrowRight,
  User
} from 'lucide-react'

export default function TestJourneyPage() {
  const { isConnected, isVerified, address } = useAuth()
  const { verificationLevel } = useSafeWorldId()
  const { wallets } = useWallets()
  
  const [currentStep, setCurrentStep] = useState<'setup' | 'launch' | 'complete'>('setup')
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const handleWalletCreated = (address: string) => {
    setWalletAddress(address)
    setCurrentStep('launch')
  }

  const handleTokenLaunched = () => {
    setCurrentStep('complete')
  }

  const getActiveWallet = () => {
    return wallets.find(wallet => wallet.address === address)
  }

  const getWalletType = () => {
    const wallet = getActiveWallet()
    return wallet?.walletClientType || 'unknown'
  }

  const isPrivyWallet = () => {
    return getWalletType() === 'privy'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            User Journey Test
          </h1>
          <p className="text-gray-600">
            Test the complete user flow: World ID → Wallet → Token Launch
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isVerified ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {isVerified ? <CheckCircle className="h-4 w-4" /> : '1'}
            </div>
            <span className="text-sm font-medium">World ID</span>
          </div>
          
          <ArrowRight className="h-4 w-4 text-gray-400" />
          
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isConnected && isPrivyWallet() ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {isConnected && isPrivyWallet() ? <CheckCircle className="h-4 w-4" /> : '2'}
            </div>
            <span className="text-sm font-medium">Privy Wallet</span>
          </div>
          
          <ArrowRight className="h-4 w-4 text-gray-400" />
          
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep === 'complete' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {currentStep === 'complete' ? <CheckCircle className="h-4 w-4" /> : '3'}
            </div>
            <span className="text-sm font-medium">Token Launch</span>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* World ID Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4" />
                World ID Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Verified:</span>
                  <Badge variant={isVerified ? "default" : "secondary"}>
                    {isVerified ? 'Yes' : 'No'}
                  </Badge>
                </div>
                {isVerified && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Level:</span>
                    <Badge variant="outline">{verificationLevel}</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Wallet Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Wallet className="h-4 w-4" />
                Wallet Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Connected:</span>
                  <Badge variant={isConnected ? "default" : "secondary"}>
                    {isConnected ? 'Yes' : 'No'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Type:</span>
                  <Badge variant={isPrivyWallet() ? "default" : "destructive"}>
                    {getWalletType()}
                  </Badge>
                </div>
                {address && (
                  <div className="text-xs text-gray-500 font-mono">
                    {address.slice(0, 6)}...{address.slice(-4)}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Token Launch Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Rocket className="h-4 w-4" />
                Launch Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Can Launch:</span>
                  <Badge variant={isConnected && isVerified && isPrivyWallet() ? "default" : "secondary"}>
                    {isConnected && isVerified && isPrivyWallet() ? 'Yes' : 'No'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Step:</span>
                  <Badge variant="outline">{currentStep}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        {currentStep === 'setup' && (
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Setup Your Account</CardTitle>
              <CardDescription>
                Verify your identity with World ID and create a secure wallet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GuidedWalletCreation 
                onWalletCreated={handleWalletCreated}
                onError={(error) => console.error('Wallet creation error:', error)}
              />
            </CardContent>
          </Card>
        )}

        {currentStep === 'launch' && (
          <Card>
            <CardHeader>
              <CardTitle>Step 2: Launch Your Token</CardTitle>
              <CardDescription>
                Create and launch your token using your verified Privy wallet
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isConnected || !isVerified || !isPrivyWallet() ? (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please complete the setup process first. You need:
                    <ul className="mt-2 space-y-1">
                      <li>• World ID verification: {isVerified ? '✅' : '❌'}</li>
                      <li>• Privy wallet connection: {isConnected && isPrivyWallet() ? '✅' : '❌'}</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              ) : (
                <TokenLaunchForm />
              )}
            </CardContent>
          </Card>
        )}

        {currentStep === 'complete' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Journey Complete!
              </CardTitle>
              <CardDescription>
                You have successfully completed the user journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <h3 className="font-medium text-green-800 mb-2">Journey Summary</h3>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>✅ World ID verification completed</li>
                    <li>✅ Privy wallet created and connected</li>
                    <li>✅ Token launched successfully</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={() => setCurrentStep('setup')}
                  variant="outline"
                  className="w-full"
                >
                  <User className="h-4 w-4 mr-2" />
                  Start New Journey
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Debug Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs space-y-1 font-mono">
              <div>isConnected: {isConnected.toString()}</div>
              <div>isVerified: {isVerified.toString()}</div>
              <div>address: {address || 'null'}</div>
              <div>walletType: {getWalletType()}</div>
              <div>isPrivyWallet: {isPrivyWallet().toString()}</div>
              <div>currentStep: {currentStep}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
