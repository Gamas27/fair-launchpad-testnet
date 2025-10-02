'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useApi'
import { useG8 } from '@/lib/state/context'

export default function WorldIdPage() {
  const router = useRouter()
  const { verifyWorldId, loading, error } = useAuth()
  const { setUser } = useG8()
  const [isVerified, setIsVerified] = useState(false)

  const handleVerify = async () => {
    console.log('🔐 Frontend: Button clicked, starting verification...')
    
    // Simulate World ID verification with real API call
    // Generate a proper 64-character hex hash (32 bytes)
    const mockWorldIdHash = `0x${Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
    const mockVerificationLevel = 'device'
    const mockProof = { proof: 'mock_proof_data' }

    console.log('🔐 Frontend: Calling verifyWorldId with:', { mockWorldIdHash, mockVerificationLevel })
    
    const result = await verifyWorldId(mockWorldIdHash, mockVerificationLevel, mockProof)
    
    console.log('🔐 Frontend: verifyWorldId result:', result)
    
    if (result) {
      console.log('🔐 Frontend: Verification successful, setting isVerified to true')
      setIsVerified(true)
      
      // Update G8 state with the verified user
      setUser(result)
      
      console.log('🔐 Frontend: User set in G8 state:', result)
    } else {
      console.log('🔐 Frontend: Verification failed, result is null')
    }
  }

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
            World ID Verification
          </h1>
        </div>

        {/* Content */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-6 space-y-4">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-g8-success/20 rounded-full mx-auto flex items-center justify-center">
              <span className="text-g8-success text-2xl">🌍</span>
            </div>
            <h2 className="text-g8-h2 text-g8-text-primary font-semibold">
              Verify once to enable secure platform interactions.
            </h2>
            <p className="text-g8-body text-g8-text-secondary">
              World ID helps us verify you're a unique human without compromising your privacy.
            </p>
          </div>
        </div>

        {/* Debug Info */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-4 text-center">
          <p className="text-g8-text-secondary text-sm">
            Debug: loading={loading ? 'true' : 'false'}, error={error || 'none'}, isVerified={isVerified ? 'true' : 'false'}
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-g8-error/20 border border-g8-error/50 rounded-g8-lg p-4 text-center">
            <p className="text-g8-error font-medium">❌ {error}</p>
          </div>
        )}

        {/* Verification Button */}
        {!isVerified ? (
          <button 
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-gradient-g8 text-g8-bg font-medium py-4 px-6 rounded-g8-lg shadow-g8-glow hover:shadow-g8-m transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify with World ID'}
          </button>
        ) : (
          <div className="space-y-4">
            <div className="bg-g8-success/20 border border-g8-success/50 rounded-g8-lg p-4 text-center">
              <p className="text-g8-success font-medium">✅ Verified Successfully!</p>
            </div>
            <button 
              onClick={() => router.push('/g8/onboarding/wallet')}
              className="w-full bg-gradient-g8 text-g8-bg font-medium py-4 px-6 rounded-g8-lg shadow-g8-glow hover:shadow-g8-m transition-all duration-200"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
