'use client'

import { useSafeWorldId } from '@/providers/SafeWorldIdProvider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, ShieldCheck, ShieldX, User, Globe, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WorldIdStatusProps {
  className?: string
  showDetails?: boolean
}

export function WorldIdStatus({ className, showDetails = true }: WorldIdStatusProps) {
  const { 
    isVerified, 
    verificationLevel, 
    worldId, 
    account, 
    loading, 
    error 
  } = useSafeWorldId()

  const getStatusIcon = () => {
    if (loading) return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
    if (error) return <ShieldX className="h-5 w-5 text-red-500" />
    if (isVerified) return <ShieldCheck className="h-5 w-5 text-green-500" />
    return <Shield className="h-5 w-5 text-gray-500" />
  }

  const getStatusText = () => {
    if (loading) return 'Verifying...'
    if (error) return 'Verification Failed'
    if (isVerified) return 'Human Verified'
    return 'Not Verified'
  }

  const getStatusColor = () => {
    if (loading) return 'text-blue-600'
    if (error) return 'text-red-600'
    if (isVerified) return 'text-green-600'
    return 'text-gray-600'
  }

  const getVerificationBadgeVariant = () => {
    switch (verificationLevel) {
      case 'Orb':
        return 'default'
      case 'Phone':
        return 'secondary'
      case 'Device':
        return 'outline'
      default:
        return 'outline'
    }
  }

  const getVerificationBadgeColor = () => {
    switch (verificationLevel) {
      case 'Orb':
        return 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
      case 'Phone':
        return 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
      case 'Device':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
      default:
        return ''
    }
  }

  const formatWorldId = (id: string | null) => {
    if (!id) return 'Not available'
    return `${id.slice(0, 8)}...${id.slice(-8)}`
  }

  const formatAddress = (address: string | null) => {
    if (!address) return 'Not available'
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!showDetails) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {getStatusIcon()}
        <span className={cn("text-sm font-medium", getStatusColor())}>
          {getStatusText()}
        </span>
        {isVerified && (
          <Badge 
            variant={getVerificationBadgeVariant()}
            className={cn("text-xs", getVerificationBadgeColor())}
          >
            {verificationLevel}
          </Badge>
        )}
      </div>
    )
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {getStatusIcon()}
          World ID Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Status</span>
          <div className="flex items-center gap-2">
            <span className={cn("text-sm font-medium", getStatusColor())}>
              {getStatusText()}
            </span>
            {isVerified && (
              <Badge 
                variant={getVerificationBadgeVariant()}
                className={cn("text-xs", getVerificationBadgeColor())}
              >
                {verificationLevel}
              </Badge>
            )}
          </div>
        </div>

        {/* Verification Level */}
        {isVerified && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Verification Level</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">{verificationLevel}</span>
            </div>
          </div>
        )}

        {/* World ID */}
        {worldId && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">World ID</span>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-mono">{formatWorldId(worldId)}</span>
            </div>
          </div>
        )}

        {/* Account Address */}
        {account?.address && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Account</span>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-mono">{formatAddress(account.address)}</span>
            </div>
          </div>
        )}

        {/* Account Balance */}
        {account?.balance && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Balance</span>
            <span className="text-sm font-medium">
              {parseFloat(account.balance).toFixed(4)} WLD
            </span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center gap-2">
              <ShieldX className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          </div>
        )}

        {/* Benefits */}
        {isVerified && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <h4 className="text-sm font-medium text-green-800 mb-2">Verification Benefits</h4>
            <ul className="text-xs text-green-700 space-y-1">
              {verificationLevel === 'Orb' && (
                <>
                  <li>• Maximum trading limits</li>
                  <li>• Priority support</li>
                  <li>• Access to exclusive features</li>
                </>
              )}
              {verificationLevel === 'Phone' && (
                <>
                  <li>• Higher trading limits</li>
                  <li>• Reduced cooldown periods</li>
                  <li>• Enhanced security</li>
                </>
              )}
              {verificationLevel === 'Device' && (
                <>
                  <li>• Basic trading access</li>
                  <li>• Standard security</li>
                  <li>• Upgrade available</li>
                </>
              )}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
