'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Wallet, 
  Coins, 
  ArrowRight, 
  CheckCircle,
  Sparkles,
  Users,
  TrendingUp
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface WelcomeScreenProps {
  onNext: () => void
  className?: string
}

export const WelcomeScreen = ({ onNext, className }: WelcomeScreenProps) => {
  return (
    <div className={cn("min-h-screen bg-black text-white flex items-center justify-center p-4", className)}>
      <Card className="w-full max-w-md card-gradient border-2 border-pink-400/50">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="text-3xl font-bold gradient-text">G8</div>
            <Badge className="bg-green-500 text-white text-xs font-bold animate-pulse">LIVE</Badge>
          </div>
          
          <CardTitle className="text-2xl text-white">
            WELCOME TO G8
          </CardTitle>
          
          <CardDescription className="text-gray-300 text-base">
            Manage your digital assets securely with World ID verification and anti-bot protection
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-gray-300">World ID verification for human-only access</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-gray-300">Secure wallet creation and management</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-gray-300">Anti-bot token launchpad</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-pink-400" />
              <span className="text-gray-300">Community-driven token discovery</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="text-center">
              <div className="text-lg font-bold text-cyan-400">10K+</div>
              <div className="text-xs text-gray-400">Users</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-400">500+</div>
              <div className="text-xs text-gray-400">Tokens</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">$2M+</div>
              <div className="text-xs text-gray-400">Volume</div>
            </div>
          </div>

          <Button
            onClick={onNext}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 text-lg"
          >
            Get Started
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

interface AgeVerificationProps {
  onNext: () => void
  onBack: () => void
  className?: string
}

export const AgeVerification = ({ onNext, onBack, className }: AgeVerificationProps) => {
  const [ageVerified, setAgeVerified] = React.useState(false)
  const [tosAccepted, setTosAccepted] = React.useState(false)

  const canProceed = ageVerified && tosAccepted

  return (
    <div className={cn("min-h-screen bg-black text-white flex items-center justify-center p-4", className)}>
      <Card className="w-full max-w-md card-gradient border-2 border-pink-400/50">
        <CardHeader>
          <CardTitle className="text-xl text-white text-center">
            Age Verification & Terms
          </CardTitle>
          <CardDescription className="text-gray-300 text-center">
            Please confirm your age and accept our terms of service
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Age Verification */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="age-verification"
                checked={ageVerified}
                onChange={(e) => setAgeVerified(e.target.checked)}
                className="w-5 h-5 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
              />
              <label htmlFor="age-verification" className="text-sm text-gray-300">
                I am of the age of majority in my jurisdiction (18+ years old)
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="tos-acceptance"
                checked={tosAccepted}
                onChange={(e) => setTosAccepted(e.target.checked)}
                className="w-5 h-5 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
              />
              <label htmlFor="tos-acceptance" className="text-sm text-gray-300">
                I accept the <span className="text-cyan-400 underline">Terms & Conditions</span> and <span className="text-cyan-400 underline">Privacy Policy</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onNext}
              disabled={!canProceed}
              className={cn(
                "w-full py-3 text-lg font-semibold",
                canProceed
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              )}
            >
              {canProceed ? (
                <>
                  Continue
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              ) : (
                'Please accept terms to continue'
              )}
            </Button>

            <Button
              onClick={onBack}
              variant="ghost"
              className="w-full text-gray-400 hover:text-white"
            >
              ← Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface WorldIdVerificationProps {
  onVerify: () => void
  onBack: () => void
  loading?: boolean
  className?: string
}

export const WorldIdVerification = ({ onVerify, onBack, loading = false, className }: WorldIdVerificationProps) => {
  return (
    <div className={cn("min-h-screen bg-black text-white flex items-center justify-center p-4", className)}>
      <Card className="w-full max-w-md card-gradient border-2 border-pink-400/50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-white text-xl">
            <Shield className="h-6 w-6" />
            WORLD ID VERIFICATION
          </CardTitle>
          <CardDescription className="text-gray-300">
            Verify your identity with World ID to access the platform
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* World ID Info */}
          <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Human verification required</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Anti-bot protection</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Privacy-preserving</span>
            </div>
          </div>

          {/* Verification Levels */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-300">Verification Levels:</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Device</span>
                <Badge variant="outline" className="badge-outline">Basic</Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Phone</span>
                <Badge variant="outline" className="badge-outline">Enhanced</Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Orb</span>
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">Premium</Badge>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onVerify}
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 text-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Verifying...
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5 mr-2" />
                  Verify with World ID
                </>
              )}
            </Button>

            <Button
              onClick={onBack}
              variant="ghost"
              className="w-full text-gray-400 hover:text-white"
            >
              ← Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface VerificationFailedProps {
  onRetry: () => void
  onContactSupport: () => void
  onBack: () => void
  className?: string
}

export const VerificationFailed = ({ onRetry, onContactSupport, onBack, className }: VerificationFailedProps) => {
  return (
    <div className={cn("min-h-screen bg-black text-white flex items-center justify-center p-4", className)}>
      <Card className="w-full max-w-md card-gradient border-2 border-red-400/50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-red-400 text-xl">
            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-white font-bold">✕</span>
            </div>
            VERIFICATION FAILED
          </CardTitle>
          <CardDescription className="text-gray-300">
            World ID verification was unsuccessful. Please try again or contact support.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Error Info */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 space-y-2">
            <div className="text-sm text-red-300">
              Common issues:
            </div>
            <div className="text-xs text-gray-300 space-y-1">
              <div>• Ensure you have a valid World ID</div>
              <div>• Check your internet connection</div>
              <div>• Try refreshing the page</div>
              <div>• Contact support if issues persist</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onRetry}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold"
            >
              Try Again
            </Button>

            <Button
              onClick={onContactSupport}
              variant="outline"
              className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
            >
              Contact Support
            </Button>

            <Button
              onClick={onBack}
              variant="ghost"
              className="w-full text-gray-400 hover:text-white"
            >
              ← Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface RecoveryOptionsProps {
  onNext: () => void
  onBack: () => void
  className?: string
}

export const RecoveryOptions = ({ onNext, onBack, className }: RecoveryOptionsProps) => {
  const [cloudBackup, setCloudBackup] = React.useState(true)
  const [manualBackup, setManualBackup] = React.useState(false)
  const [emailBackup, setEmailBackup] = React.useState(true)

  return (
    <div className={cn("min-h-screen bg-black text-white flex items-center justify-center p-4", className)}>
      <Card className="w-full max-w-md card-gradient border-2 border-pink-400/50">
        <CardHeader>
          <CardTitle className="text-xl text-white text-center">
            Recovery Options
          </CardTitle>
          <CardDescription className="text-gray-300 text-center">
            Choose your preferred backup and recovery methods
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Recovery Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="cloud-backup"
                  checked={cloudBackup}
                  onChange={(e) => setCloudBackup(e.target.checked)}
                  className="w-5 h-5 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
                />
                <label htmlFor="cloud-backup" className="text-sm text-gray-300">
                  Cloud backup
                </label>
              </div>
              <Badge variant="outline" className="badge-outline">Recommended</Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="manual-backup"
                  checked={manualBackup}
                  onChange={(e) => setManualBackup(e.target.checked)}
                  className="w-5 h-5 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
                />
                <label htmlFor="manual-backup" className="text-sm text-gray-300">
                  Manual backup
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="email-backup"
                  checked={emailBackup}
                  onChange={(e) => setEmailBackup(e.target.checked)}
                  className="w-5 h-5 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
                />
                <label htmlFor="email-backup" className="text-sm text-gray-300">
                  Email backup
                </label>
              </div>
            </div>
          </div>

          {/* Cloud Backup Toggle */}
          {cloudBackup && (
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Disable Cloud Backup</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-400 text-red-400 hover:bg-red-400/10"
                >
                  Disable
                </Button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onNext}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3"
            >
              Continue
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>

            <Button
              onClick={onBack}
              variant="ghost"
              className="w-full text-gray-400 hover:text-white"
            >
              ← Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface WalletCreatedProps {
  onViewWallet: () => void
  onCreateToken: () => void
  walletAddress?: string
  className?: string
}

export const WalletCreated = ({ onViewWallet, onCreateToken, walletAddress, className }: WalletCreatedProps) => {
  return (
    <div className={cn("min-h-screen bg-black text-white flex items-center justify-center p-4", className)}>
      <Card className="w-full max-w-md card-gradient border-2 border-green-400/50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-green-400 text-xl">
            <CheckCircle className="h-6 w-6" />
            WALLET CREATED
          </CardTitle>
          <CardDescription className="text-gray-300">
            Your wallet has been successfully created and is ready to use
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Success Info */}
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 space-y-2">
            <div className="text-sm text-green-300 font-medium">
              Wallet Details:
            </div>
            <div className="text-xs text-gray-300 space-y-1">
              <div>• Secure wallet created via Privy</div>
              <div>• World ID verified and linked</div>
              <div>• Ready for token operations</div>
              {walletAddress && (
                <div className="font-mono text-cyan-400">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onViewWallet}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold"
            >
              <Wallet className="h-5 w-5 mr-2" />
              View Wallet
            </Button>

            <Button
              onClick={onCreateToken}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold"
            >
              <Coins className="h-5 w-5 mr-2" />
              Create Token
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface WalletConfirmationProps {
  progress: number
  onCancel: () => void
  className?: string
}

export const WalletConfirmation = ({ progress, onCancel, className }: WalletConfirmationProps) => {
  return (
    <div className={cn("min-h-screen bg-black text-white flex items-center justify-center p-4", className)}>
      <Card className="w-full max-w-md card-gradient border-2 border-blue-400/50">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-white">
            Confirming your wallet...
          </CardTitle>
          <CardDescription className="text-gray-300">
            Setting up your secure wallet infrastructure
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Progress Circle */}
          <div className="flex justify-center">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-700"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                  className="text-cyan-400"
                  style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-cyan-400">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>World ID verified</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Security keys generated</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse" />
              <span>Wallet infrastructure setup</span>
            </div>
          </div>

          {/* Cancel Button */}
          <Button
            onClick={onCancel}
            variant="ghost"
            className="w-full text-gray-400 hover:text-white"
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
