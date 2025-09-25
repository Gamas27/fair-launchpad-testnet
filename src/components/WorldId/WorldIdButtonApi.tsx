'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'
import { useWorldIdApi } from '@/hooks/useWorldIdApi'

interface WorldIdButtonApiProps {
  onVerificationComplete?: () => void
  className?: string
}

export function WorldIdButtonApi({ onVerificationComplete, className }: WorldIdButtonApiProps) {
  const { 
    user,
    isVerifying,
    isLoading,
    error,
    verifyWorldId,
    isVerified,
    verificationLevel,
    needsVerification,
    canVerify
  } = useWorldIdApi()

  const [selectedLevel, setSelectedLevel] = useState<'device' | 'document' | 'orb'>('device')

  const handleVerify = async () => {
    const success = await verifyWorldId(selectedLevel)
    if (success && onVerificationComplete) {
      onVerificationComplete()
    }
  }

  const getVerificationIcon = () => {
    if (isVerifying) return <RefreshCw className="h-4 w-4 animate-spin" />
    if (isVerified) return <CheckCircle className="h-4 w-4" />
    return <Shield className="h-4 w-4" />
  }

  const getVerificationText = () => {
    if (isVerifying) return 'Verifying...'
    if (isVerified) return `Verified (${verificationLevel})`
    return 'Verify with World ID'
  }

  const getButtonVariant = () => {
    if (isVerified) return 'default'
    if (needsVerification) return 'destructive'
    return 'outline'
  }

  return (
    <div className={className}>
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <div className="flex items-center gap-2 text-red-400">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        </div>
      )}

      {isVerified ? (
        <div className="flex items-center gap-3">
          <Button variant="default" disabled className="flex items-center gap-2">
            {getVerificationIcon()}
            {getVerificationText()}
          </Button>
          <Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">
            Verified Human
          </Badge>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Verification Level Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Verification Level:</label>
            <div className="flex gap-2">
              <Button
                variant={selectedLevel === 'device' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLevel('device')}
                className="flex-1"
              >
                Device
              </Button>
              <Button
                variant={selectedLevel === 'document' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLevel('document')}
                className="flex-1"
              >
                Document
              </Button>
              <Button
                variant={selectedLevel === 'orb' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedLevel('orb')}
                className="flex-1"
              >
                Orb
              </Button>
            </div>
          </div>

          {/* Verification Button */}
          <Button
            onClick={handleVerify}
            disabled={!canVerify || isVerifying}
            variant={getButtonVariant()}
            className="w-full flex items-center gap-2"
          >
            {getVerificationIcon()}
            {getVerificationText()}
          </Button>

          {/* Verification Info */}
          <div className="text-xs text-gray-400 space-y-1">
            <p>• <strong>Device:</strong> Basic verification using device fingerprint</p>
            <p>• <strong>Document:</strong> Government ID verification</p>
            <p>• <strong>Orb:</strong> Biometric verification (highest security)</p>
          </div>
        </div>
      )}

      {/* User Info */}
      {user && (
        <div className="mt-4 p-3 bg-card/50 rounded-lg border border-border/50">
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Reputation:</span>
              <span className="font-semibold">{user.reputationLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Score:</span>
              <span className="font-semibold">{user.reputationScore}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Trades:</span>
              <span className="font-semibold">{user.totalTrades}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Volume:</span>
              <span className="font-semibold">${user.totalVolume.toLocaleString('en-US')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Risk Score:</span>
              <Badge 
                variant={user.riskScore < 30 ? 'default' : user.riskScore < 70 ? 'secondary' : 'destructive'}
                className="text-xs"
              >
                {user.riskScore}/100
              </Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
