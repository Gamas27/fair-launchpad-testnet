'use client'

import { WLDTokenPage } from '@/components/alchemy/WLDTokenPage'
import { AlchemyMonitoringDashboard } from '@/components/alchemy/AlchemyMonitoringDashboard'
import { useG8User } from '@/lib/state/context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AlchemyDemoPage() {
  const { isAuthenticated, isWorldIdVerified } = useG8User()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated || !isWorldIdVerified) {
      router.push('/g8/onboarding')
    }
  }, [isAuthenticated, isWorldIdVerified, router])

  if (!isAuthenticated || !isWorldIdVerified) {
    return null
  }

  return (
    <div className="min-h-screen bg-g8-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-g8-primary mb-4">
            🔗 Alchemy Integration Demo
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Real-time blockchain data powered by Alchemy
          </p>
        </div>

        {/* WLD Token Page */}
        <div className="mb-8">
          <WLDTokenPage />
        </div>

        {/* Monitoring Dashboard */}
        <AlchemyMonitoringDashboard />
      </div>
    </div>
  )
}