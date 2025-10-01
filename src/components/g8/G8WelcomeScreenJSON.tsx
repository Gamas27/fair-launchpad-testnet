'use client'

import React from 'react'
import { G8Column } from '@/components/ui/g8-layout'
import { G8Button } from '@/components/ui/g8-button'
import { G8Card } from '@/components/ui/g8-card'
import { useRouter } from 'next/navigation'
import { getString } from '@/lib/content/g8-content'

export const G8WelcomeScreenJSON: React.FC = () => {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/onboarding/tos')
  }

  // Content from G8 Content Pack v1.1
  const title = getString('onboarding.welcome.title')
  const subtitle = getString('onboarding.welcome.subtitle')
  const cta = getString('onboarding.welcome.cta')

  return (
    <div className="min-h-screen bg-g8-bg text-g8-text-primary p-g8-lg">
            <G8Column gap="lg" className="items-center">
        {/* Welcome Card */}
        <G8Card 
          variant="gradient" 
          size="lg" 
          className="w-full max-w-md bg-g8-surface border-g8-stroke shadow-g8-glow"
        >
            <G8Column gap="md" className="items-center text-center">
            <h1 className="text-g8-h1 text-g8-text-primary font-bold">
              {title}
            </h1>
            <p className="text-g8-body text-g8-text-secondary">
              {subtitle}
            </p>
          </G8Column>
        </G8Card>

        {/* Get Started Button */}
        <G8Button
          variant="primary"
          size="lg"
          onClick={handleGetStarted}
          className="w-full max-w-md bg-gradient-g8 text-g8-bg shadow-g8-glow hover:shadow-g8-m"
        >
          {cta}
        </G8Button>
      </G8Column>
    </div>
  )
}

export default G8WelcomeScreenJSON

