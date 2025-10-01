'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export default function TermsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-g8-bg text-g8-text-primary p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.back()}
            className="text-g8-text-secondary hover:text-g8-text-primary transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-g8-h1 text-g8-text-primary font-bold">
            Terms of Service
          </h1>
        </div>

        {/* Content */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-6 space-y-4">
          <h2 className="text-g8-h2 text-g8-text-primary font-semibold">
            Please read and accept to continue:
          </h2>
          <ul className="space-y-3 text-g8-body text-g8-text-secondary">
            <li>• Trading memecoins involves substantial risk, including possible loss of all funds.</li>
            <li>• Prices can be extremely volatile and may change without warning.</li>
            <li>• Your data is processed according to our Privacy Policy.</li>
            <li>• You agree to follow our User Conduct Policy.</li>
          </ul>
        </div>

        {/* Accept Button */}
        <button 
          onClick={() => router.push('/g8/onboarding/worldid')}
          className="w-full bg-gradient-g8 text-g8-bg font-medium py-4 px-6 rounded-g8-lg shadow-g8-glow hover:shadow-g8-m transition-all duration-200"
        >
          Accept & continue
        </button>
      </div>
    </div>
  )
}

