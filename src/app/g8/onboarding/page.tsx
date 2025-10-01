'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { G8Button } from '@/components/ui/g8-button'

export default function OnboardingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-g8-bg text-g8-text-primary flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        {/* Welcome Card */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-8 shadow-g8-glow">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-g8 rounded-full mx-auto flex items-center justify-center">
              <span className="text-g8-bg font-bold text-xl">G8</span>
            </div>
            <h1 className="text-g8-h1 text-g8-text-primary font-bold">
              Welcome to [G8]
            </h1>
            <p className="text-g8-body text-g8-text-secondary">
              Explore the decentralized future. Connect, create, and transact securely.
            </p>
          </div>
        </div>

        {/* Get Started Button */}
        <G8Button 
          onClick={() => router.push('/g8/onboarding/terms')}
          variant="primary"
          size="lg"
          className="w-full"
        >
          Get started
        </G8Button>
      </div>
    </div>
  )
}
