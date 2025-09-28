'use client'

import React, { useState } from 'react'
import { G8Column, G8Row } from '@/components/ui/g8-layout'
import { G8Card } from '@/components/ui/g8-card'
import { G8Button } from '@/components/ui/g8-button'
import { G8Badge } from '@/components/ui/g8-badge'
import { 
  Shield, 
  CheckCircle, 
  ArrowRight,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface G8OnboardingWorldIdProps {
  onVerify?: () => void
  onBack?: () => void
  className?: string
}

export const G8OnboardingWorldId = ({ 
  onVerify, 
  onBack,
  className 
}: G8OnboardingWorldIdProps) => {
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerify = async () => {
    setIsVerifying(true)
    // Simulate World ID verification
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsVerifying(false)
    onVerify?.()
  }

  return (
    <div className={cn("min-h-screen bg-g8-bg text-g8-text-primary p-g8-lg", className)}>
      <G8Column gap="md" align="center" justify="center" className="max-w-md mx-auto">
        {/* Main Card */}
        <G8Card variant="gradient" size="lg" className="w-full">
          <G8Column gap="md">
            {/* Header */}
            <G8Column gap="sm" align="center">
              <div className="flex items-center gap-g8-sm">
                <Shield className="h-6 w-6 text-g8-success" />
                <h1 className="text-g8-h1 font-semibold text-g8-text-primary">
                  Verify your World ID
                </h1>
              </div>
              
              <p className="text-g8-body text-g8-text-secondary text-center">
                Prove personhood to create your wallet.
              </p>
            </G8Column>

            {/* Verification Benefits */}
            <G8Column gap="sm">
              <div className="flex items-center gap-g8-sm text-g8-body text-g8-text-secondary">
                <CheckCircle className="h-4 w-4 text-g8-success" />
                <span>Human verification required</span>
              </div>
              <div className="flex items-center gap-g8-sm text-g8-body text-g8-text-secondary">
                <CheckCircle className="h-4 w-4 text-g8-success" />
                <span>Anti-bot protection</span>
              </div>
              <div className="flex items-center gap-g8-sm text-g8-body text-g8-text-secondary">
                <CheckCircle className="h-4 w-4 text-g8-success" />
                <span>Privacy-preserving</span>
              </div>
            </G8Column>

            {/* Verification Levels */}
            <G8Card variant="default" size="sm">
              <G8Column gap="sm">
                <h3 className="text-g8-body font-medium text-g8-text-primary">
                  Verification Levels:
                </h3>
                <G8Row gap="sm" align="center" justify="between">
                  <span className="text-g8-caption text-g8-text-secondary">Device</span>
                  <G8Badge variant="outline" size="sm">Basic</G8Badge>
                </G8Row>
                <G8Row gap="sm" align="center" justify="between">
                  <span className="text-g8-caption text-g8-text-secondary">Phone</span>
                  <G8Badge variant="secondary" size="sm">Enhanced</G8Badge>
                </G8Row>
                <G8Row gap="sm" align="center" justify="between">
                  <span className="text-g8-caption text-g8-text-secondary">Orb</span>
                  <G8Badge variant="gradient" size="sm">Premium</G8Badge>
                </G8Row>
              </G8Column>
            </G8Card>
          </G8Column>
        </G8Card>

        {/* Action Buttons */}
        <G8Column gap="sm" className="w-full">
          <G8Button
            onClick={handleVerify}
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

          {onBack && (
            <G8Button
              onClick={onBack}
              variant="ghost"
              size="lg"
              className="w-full"
            >
              ← Back
            </G8Button>
          )}
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

        {/* Learn More */}
        <G8Button variant="ghost" size="sm">
          <ExternalLink className="h-4 w-4 mr-1" />
          Learn more about World ID
        </G8Button>
      </G8Column>
    </div>
  )
}
