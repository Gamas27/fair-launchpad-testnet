'use client'

import React from 'react'
import { G8Button } from '@/components/ui/g8-button'
import { G8Card, G8CardContent, G8CardDescription, G8CardHeader, G8CardTitle } from '@/components/ui/g8-card'
import { G8Badge } from '@/components/ui/g8-badge'
import { 
  ArrowRight, 
  Shield, 
  Wallet, 
  Coins, 
  Users,
  TrendingUp,
  Star,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface WelcomeScreenV2Props {
  onNext: () => void
  className?: string
}

export const WelcomeScreenV2 = ({ onNext, className }: WelcomeScreenV2Props) => {
  return (
    <div className={cn("min-h-screen bg-background-primary text-text-primary flex items-center justify-center p-4", className)}>
      <G8Card variant="gradient" size="lg" className="w-full max-w-md animate-scale-in">
        <G8CardHeader className="text-center space-y-3">
          {/* G8 Logo with LIVE badge - more compact */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent">
              G8
            </div>
            <G8Badge variant="live" size="sm" className="animate-pulse">
              LIVE
            </G8Badge>
          </div>
          
          {/* Main title - more prominent */}
          <G8CardTitle className="text-2xl text-text-primary mb-1">
            WELCOME TO G8
          </G8CardTitle>
          
          {/* Description - more concise */}
          <G8CardDescription className="text-text-secondary text-base">
            Manage your digital assets securely with World ID verification and anti-bot protection
          </G8CardDescription>
        </G8CardHeader>
        
        <G8CardContent className="space-y-6">
          {/* Features - more compact layout */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              <span className="text-text-secondary">World ID verification for human-only access</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
              <span className="text-text-secondary">Secure wallet creation and management</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
              <span className="text-text-secondary">Anti-bot token launchpad</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-pink animate-pulse" />
              <span className="text-text-secondary">Community-driven token discovery</span>
            </div>
          </div>

          {/* Stats - more compact grid */}
          <div className="grid grid-cols-3 gap-3 py-4">
            <div className="text-center">
              <div className="text-xl font-bold text-accent-cyan">10K+</div>
              <div className="text-xs text-text-muted">Users</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-accent-purple">500+</div>
              <div className="text-xs text-text-muted">Tokens</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-accent-green">$2M+</div>
              <div className="text-xs text-text-muted">Volume</div>
            </div>
          </div>

          {/* CTA Button - more prominent */}
          <G8Button
            onClick={onNext}
            variant="primary"
            size="lg"
            className="w-full"
            icon={<Sparkles className="h-4 w-4" />}
          >
            Get Started
            <ArrowRight className="h-4 w-4 ml-2" />
          </G8Button>
        </G8CardContent>
      </G8Card>
    </div>
  )
}

interface AgeVerificationV2Props {
  onNext: () => void
  onBack: () => void
  className?: string
}

export const AgeVerificationV2 = ({ onNext, onBack, className }: AgeVerificationV2Props) => {
  const [ageVerified, setAgeVerified] = React.useState(false)
  const [tosAccepted, setTosAccepted] = React.useState(false)

  const canProceed = ageVerified && tosAccepted

  return (
    <div className={cn("min-h-screen bg-background-primary text-text-primary flex items-center justify-center p-4", className)}>
      <G8Card variant="gradient" size="lg" className="w-full max-w-md animate-scale-in">
        <G8CardHeader className="text-center">
          <G8CardTitle className="text-2xl text-text-primary">
            Age Verification & Terms
          </G8CardTitle>
          <G8CardDescription className="text-text-secondary">
            Please confirm your age and accept our terms of service
          </G8CardDescription>
        </G8CardHeader>
        
        <G8CardContent className="space-y-6">
          {/* Age Verification */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="age-verification"
                checked={ageVerified}
                onChange={(e) => setAgeVerified(e.target.checked)}
                className="w-5 h-5 text-accent-cyan bg-background-card border-background-tertiary rounded focus:ring-accent-cyan focus:ring-2"
              />
              <label htmlFor="age-verification" className="text-sm text-text-secondary">
                I am of the age of majority in my jurisdiction (18+ years old)
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="tos-acceptance"
                checked={tosAccepted}
                onChange={(e) => setTosAccepted(e.target.checked)}
                className="w-5 h-5 text-accent-cyan bg-background-card border-background-tertiary rounded focus:ring-accent-cyan focus:ring-2"
              />
              <label htmlFor="tos-acceptance" className="text-sm text-text-secondary">
                I accept the <span className="text-accent-cyan underline cursor-pointer">Terms & Conditions</span> and <span className="text-accent-cyan underline cursor-pointer">Privacy Policy</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <G8Button
              onClick={onNext}
              disabled={!canProceed}
              variant={canProceed ? "primary" : "outline"}
              size="lg"
              className="w-full"
            >
              {canProceed ? (
                <>
                  Continue
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              ) : (
                'Please accept terms to continue'
              )}
            </G8Button>

            <G8Button
              onClick={onBack}
              variant="ghost"
              size="lg"
              className="w-full"
            >
              ← Back
            </G8Button>
          </div>
        </G8CardContent>
      </G8Card>
    </div>
  )
}

interface WorldIdVerificationV2Props {
  onVerify: () => void
  onBack: () => void
  loading?: boolean
  className?: string
}

export const WorldIdVerificationV2 = ({ onVerify, onBack, loading = false, className }: WorldIdVerificationV2Props) => {
  return (
    <div className={cn("min-h-screen bg-background-primary text-text-primary flex items-center justify-center p-4", className)}>
      <G8Card variant="gradient" size="lg" className="w-full max-w-md animate-scale-in">
        <G8CardHeader className="text-center">
          <G8CardTitle className="flex items-center justify-center gap-2 text-text-primary text-2xl">
            <Shield className="h-6 w-6 text-accent-cyan" />
            WORLD ID VERIFICATION
          </G8CardTitle>
          <G8CardDescription className="text-text-secondary">
            Verify your identity with World ID to access the platform
          </G8CardDescription>
        </G8CardHeader>
        
        <G8CardContent className="space-y-6">
          {/* World ID Info */}
          <G8Card variant="glass" size="sm">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <div className="w-2 h-2 rounded-full bg-accent-green" />
                <span>Human verification required</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <div className="w-2 h-2 rounded-full bg-accent-green" />
                <span>Anti-bot protection</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <div className="w-2 h-2 rounded-full bg-accent-green" />
                <span>Privacy-preserving</span>
              </div>
            </div>
          </G8Card>

          {/* Verification Levels */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-text-secondary">Verification Levels:</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted">Device</span>
                <G8Badge variant="outline" size="sm">Basic</G8Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted">Phone</span>
                <G8Badge variant="secondary" size="sm">Enhanced</G8Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-muted">Orb</span>
                <G8Badge variant="gradient" size="sm">Premium</G8Badge>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <G8Button
              onClick={onVerify}
              disabled={loading}
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              icon={<Shield className="h-5 w-5" />}
            >
              {loading ? 'Verifying...' : 'Verify with World ID'}
            </G8Button>

            <G8Button
              onClick={onBack}
              variant="ghost"
              size="lg"
              className="w-full"
            >
              ← Back
            </G8Button>
          </div>
        </G8CardContent>
      </G8Card>
    </div>
  )
}
