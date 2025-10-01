'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function G8Page() {
  const router = useRouter()

  React.useEffect(() => {
    router.push('/g8/onboarding')
  }, [router])

  return (
    <div className="min-h-screen bg-g8-bg text-g8-text-primary flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-g8 rounded-full mx-auto flex items-center justify-center mb-4">
          <span className="text-g8-bg font-bold text-xl">G8</span>
        </div>
        <h1 className="text-g8-h1 text-g8-text-primary mb-2">Loading G8 World App...</h1>
        <p className="text-g8-body text-g8-text-secondary">Connecting to real deployed contracts</p>
      </div>
    </div>
  )
}
