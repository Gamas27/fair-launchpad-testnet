'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Wallet, Shield, ArrowRight } from 'lucide-react'

export default function WalletPage() {
  const router = useRouter()

  // Mock wallet data - in real app this would come from context/state
  const walletAddress = '0x742d35Cc6634C0532925a3b8D'
  const verificationLevel = 'Device'

  return (
    <div className="min-h-screen bg-g8-bg text-g8-text-primary flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        {/* Wallet Information Card */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-8 shadow-g8-glow">
          <div className="text-center space-y-6">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-g8-success/20 rounded-full mx-auto flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-g8-success" />
            </div>
            
            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-g8-h1 text-g8-text-primary font-bold">
                Wallet Created Successfully
              </h1>
              <p className="text-g8-body text-g8-text-secondary">
                Your secure wallet is ready to use
              </p>
            </div>

            {/* Wallet Details */}
            <div className="bg-g8-bg/50 border border-g8-stroke rounded-g8-md p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-g8-success" />
                  <span className="text-g8-body text-g8-text-secondary">Wallet Address</span>
                </div>
                <span className="text-g8-caption text-g8-text-primary font-mono">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-g8-success" />
                  <span className="text-g8-body text-g8-text-secondary">Verification</span>
                </div>
                <span className="text-g8-caption text-g8-success font-medium">
                  {verificationLevel}
                </span>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-g8-caption text-g8-success">
                <CheckCircle className="h-3 w-3" />
                <span>World ID verified and linked</span>
              </div>
              <div className="flex items-center gap-2 text-g8-caption text-g8-success">
                <CheckCircle className="h-3 w-3" />
                <span>Secure wallet infrastructure ready</span>
              </div>
              <div className="flex items-center gap-2 text-g8-caption text-g8-success">
                <CheckCircle className="h-3 w-3" />
                <span>Ready for token operations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Single Continue Button */}
        <button 
          onClick={() => router.push('/g8/dashboard')}
          className="w-full bg-gradient-g8 text-g8-bg font-medium py-4 px-6 rounded-g8-lg shadow-g8-glow hover:shadow-g8-m transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span>Continue to G8</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

