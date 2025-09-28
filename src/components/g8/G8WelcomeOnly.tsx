'use client'

import React, { useState } from 'react'
import { G8Column, G8Row } from '@/components/ui/g8-layout'
import { G8Card } from '@/components/ui/g8-card'
import { G8Button } from '@/components/ui/g8-button'
import { G8Badge } from '@/components/ui/g8-badge'
import { 
  ArrowRight, 
  Shield, 
  Wallet, 
  Coins, 
  CheckCircle,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface G8WelcomeOnlyProps {
  className?: string
}

export const G8WelcomeOnly = ({ className }: G8WelcomeOnlyProps) => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'worldid' | 'wallet' | 'complete'>('welcome')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const handleWorldIdVerification = async () => {
    setIsVerifying(true)
    // Simulate World ID verification
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsVerifying(false)
    setCurrentStep('wallet')
  }

  const handleWalletCreation = async () => {
    setIsCreating(true)
    // Simulate wallet creation
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsCreating(false)
    setCurrentStep('complete')
  }

  const handleGetStarted = () => {
    setCurrentStep('worldid')
  }

  const handleBackToWelcome = () => {
    setCurrentStep('welcome')
  }

  const handleBackToWorldId = () => {
    setCurrentStep('worldid')
  }

  // Welcome Screen
  if (currentStep === 'welcome') {
    return (
      <div className={cn("min-h-screen bg-g8-bg text-g8-text-primary flex items-center justify-center p-g8-lg", className)}>
        <G8Card variant="gradient" size="lg" className="w-full max-w-md animate-scale-in">
          <G8Column gap="md" align="center">
            {/* G8 Logo with LIVE badge */}
            <G8Row gap="sm" align="center">
              <h1 className="text-g8-display font-bold text-g8-text-primary">
                G8
              </h1>
              <G8Badge variant="live" size="sm" className="animate-pulse">
                LIVE
              </G8Badge>
            </G8Row>
            
            {/* Main title */}
            <h2 className="text-g8-h1 font-semibold text-g8-text-primary text-center">
              WELCOME TO G8
            </h2>
            
            {/* Description */}
            <p className="text-g8-body text-g8-text-secondary text-center">
              Manage your digital assets securely with World ID verification and anti-bot protection
            </p>

            {/* Features */}
            <G8Column gap="sm" className="w-full">
              <G8Row gap="sm" align="center">
                <Shield className="h-4 w-4 text-g8-success" />
                <span className="text-g8-body text-g8-text-secondary">World ID verification for human-only access</span>
              </G8Row>
              <G8Row gap="sm" align="center">
                <Wallet className="h-4 w-4 text-g8-success" />
                <span className="text-g8-body text-g8-text-secondary">Secure wallet creation and management</span>
              </G8Row>
              <G8Row gap="sm" align="center">
                <Coins className="h-4 w-4 text-g8-success" />
                <span className="text-g8-body text-g8-text-secondary">Anti-bot token launchpad</span>
              </G8Row>
              <G8Row gap="sm" align="center">
                <Users className="h-4 w-4 text-g8-success" />
                <span className="text-g8-body text-g8-text-secondary">Community-driven token discovery</span>
              </G8Row>
            </G8Column>

            {/* Stats */}
            <G8Row gap="md" className="w-full">
              <G8Column gap="xs" align="center" className="flex-1">
                <div className="text-g8-h2 font-bold text-g8-text-primary">10K+</div>
                <div className="text-g8-caption text-g8-text-secondary">Users</div>
              </G8Column>
              <G8Column gap="xs" align="center" className="flex-1">
                <div className="text-g8-h2 font-bold text-g8-text-primary">500+</div>
                <div className="text-g8-caption text-g8-text-secondary">Tokens</div>
              </G8Column>
              <G8Column gap="xs" align="center" className="flex-1">
                <div className="text-g8-h2 font-bold text-g8-text-primary">$2M+</div>
                <div className="text-g8-caption text-g8-text-secondary">Volume</div>
              </G8Column>
            </G8Row>

            {/* CTA Button */}
            <G8Button
              onClick={handleGetStarted}
              variant="primary"
              size="lg"
              className="w-full"
              icon={<Sparkles className="h-5 w-5" />}
            >
              Get Started
              <ArrowRight className="h-5 w-5 ml-2" />
            </G8Button>
          </G8Column>
        </G8Card>
      </div>
    )
  }

  // World ID Verification
  if (currentStep === 'worldid') {
    return (
      <div className={cn("min-h-screen bg-g8-bg text-g8-text-primary flex items-center justify-center p-g8-lg", className)}>
        <G8Card variant="gradient" size="lg" className="w-full max-w-md animate-scale-in">
          <G8Column gap="md" align="center">
            {/* Header */}
            <G8Row gap="sm" align="center">
              <Shield className="h-6 w-6 text-g8-success" />
              <h2 className="text-g8-h1 font-semibold text-g8-text-primary">
                Verify your World ID
              </h2>
            </G8Row>
            
            <p className="text-g8-body text-g8-text-secondary text-center">
              Prove personhood to create your wallet.
            </p>

            {/* Benefits */}
            <G8Column gap="sm" className="w-full">
              <G8Row gap="sm" align="center">
                <CheckCircle className="h-4 w-4 text-g8-success" />
                <span className="text-g8-body text-g8-text-secondary">Human verification required</span>
              </G8Row>
              <G8Row gap="sm" align="center">
                <CheckCircle className="h-4 w-4 text-g8-success" />
                <span className="text-g8-body text-g8-text-secondary">Anti-bot protection</span>
              </G8Row>
              <G8Row gap="sm" align="center">
                <CheckCircle className="h-4 w-4 text-g8-success" />
                <span className="text-g8-body text-g8-text-secondary">Privacy-preserving</span>
              </G8Row>
            </G8Column>

            {/* Action Buttons */}
            <G8Column gap="sm" className="w-full">
              <G8Button
                onClick={handleWorldIdVerification}
                disabled={isVerifying}
                variant="primary"
                size="lg"
                className="w-full"
                loading={isVerifying}
                icon={<Shield className="h-5 w-5" />}
              >
                {isVerifying ? 'Verifying...' : 'Verify with World ID'}
                <ArrowRight className="h-5 w-5 ml-2" />
              </G8Button>

              <G8Button
                onClick={handleBackToWelcome}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                ← Back
              </G8Button>
            </G8Column>

            {/* Terms */}
            <p className="text-g8-caption text-g8-text-secondary text-center">
              By continuing you agree to the{' '}
              <button className="text-g8-text-primary hover:underline">
                Terms
              </button>
              {' '}and{' '}
              <button className="text-g8-text-primary hover:underline">
                Privacy Policy
              </button>
              .
            </p>
          </G8Column>
        </G8Card>
      </div>
    )
  }

  // Wallet Creation
  if (currentStep === 'wallet') {
    return (
      <div className={cn("min-h-screen bg-g8-bg text-g8-text-primary flex items-center justify-center p-g8-lg", className)}>
        <G8Card variant="gradient" size="lg" className="w-full max-w-md animate-scale-in">
          <G8Column gap="md" align="center">
            {/* Header */}
            <G8Row gap="sm" align="center">
              <Wallet className="h-6 w-6 text-g8-success" />
              <h2 className="text-g8-h1 font-semibold text-g8-text-primary">
                Create your wallet
              </h2>
            </G8Row>
            
            <p className="text-g8-body text-g8-text-secondary text-center">
              Create a secure wallet to launch and trade tokens
            </p>

            {/* Status */}
            <G8Card variant="success" size="sm" className="w-full">
              <G8Row gap="sm" align="center">
                <CheckCircle className="h-4 w-4 text-g8-success" />
                <span className="text-g8-body text-g8-text-primary">World ID verified</span>
              </G8Row>
            </G8Card>

            {/* Action Buttons */}
            <G8Column gap="sm" className="w-full">
              <G8Button
                onClick={handleWalletCreation}
                disabled={isCreating}
                variant="primary"
                size="lg"
                className="w-full"
                loading={isCreating}
                icon={<Wallet className="h-5 w-5" />}
              >
                {isCreating ? 'Creating Wallet...' : 'Create Secure Wallet'}
                <ArrowRight className="h-5 w-5 ml-2" />
              </G8Button>

              <G8Button
                onClick={handleBackToWorldId}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                ← Back
              </G8Button>
            </G8Column>
          </G8Column>
        </G8Card>
      </div>
    )
  }

  // Success/Complete
  if (currentStep === 'complete') {
    return (
      <div className={cn("min-h-screen bg-g8-bg text-g8-text-primary flex items-center justify-center p-g8-lg", className)}>
        <G8Card variant="success" size="lg" className="w-full max-w-md animate-bounce-in">
          <G8Column gap="md" align="center">
            {/* Success Icon */}
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-g8-success/20 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-g8-success" />
              </div>
              <div className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-g8-success flex items-center justify-center">
                <Star className="h-4 w-4 text-g8-bg" />
              </div>
            </div>

            {/* Success Message */}
            <h2 className="text-g8-h1 font-semibold text-g8-text-primary text-center">
              Welcome to G8!
            </h2>
            
            <p className="text-g8-body text-g8-text-secondary text-center">
              You're ready to launch tokens in the G8 platform
            </p>

            {/* What's Next */}
            <G8Card variant="default" size="sm" className="w-full">
              <G8Column gap="sm">
                <h3 className="text-g8-body font-semibold text-g8-text-primary">
                  What's Next?
                </h3>
                <G8Column gap="xs">
                  <G8Row gap="sm" align="center">
                    <CheckCircle className="h-4 w-4 text-g8-success" />
                    <span className="text-g8-caption text-g8-text-secondary">World ID verification completed</span>
                  </G8Row>
                  <G8Row gap="sm" align="center">
                    <CheckCircle className="h-4 w-4 text-g8-success" />
                    <span className="text-g8-caption text-g8-text-secondary">Secure wallet created</span>
                  </G8Row>
                  <G8Row gap="sm" align="center">
                    <CheckCircle className="h-4 w-4 text-g8-success" />
                    <span className="text-g8-caption text-g8-text-secondary">Ready to launch tokens</span>
                  </G8Row>
                </G8Column>
              </G8Column>
            </G8Card>

            {/* Action Buttons */}
            <G8Column gap="sm" className="w-full">
              <G8Button
                onClick={handleBackToWelcome}
                variant="primary"
                size="lg"
                className="w-full"
                icon={<Zap className="h-5 w-5" />}
              >
                Explore G8 Platform
                <ArrowRight className="h-5 w-5 ml-2" />
              </G8Button>

              <G8Button
                onClick={handleBackToWelcome}
                variant="ghost"
                size="lg"
                className="w-full"
              >
                Start Over
              </G8Button>
            </G8Column>
          </G8Column>
        </G8Card>
      </div>
    )
  }

  return null
}
