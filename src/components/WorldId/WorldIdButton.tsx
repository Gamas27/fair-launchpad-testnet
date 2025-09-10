'use client'

import { Button } from '@/components/ui/button'
import { useWorldId } from '@/providers/WorldIdProvider'
import { Shield, ShieldCheck, ShieldX, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WorldIdButtonProps {
  className?: string
  onVerificationComplete?: (level: 'Device' | 'Phone' | 'Orb') => void
  onVerificationError?: (error: string) => void
}

export function WorldIdButton({ 
  className, 
  onVerificationComplete, 
  onVerificationError 
}: WorldIdButtonProps) {
  const { 
    isConnected, 
    isVerified, 
    verificationLevel, 
    loading, 
    error, 
    connect, 
    disconnect, 
    clearError 
  } = useWorldId()

  const handleConnect = async () => {
    try {
      clearError()
      await connect()
      
      if (onVerificationComplete) {
        onVerificationComplete(verificationLevel)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Verification failed'
      if (onVerificationError) {
        onVerificationError(errorMessage)
      }
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
    } catch (err) {
      console.error('Failed to disconnect:', err)
    }
  }

  const getVerificationIcon = () => {
    if (loading) return <Loader2 className="h-4 w-4 animate-spin" />
    if (!isConnected) return <Shield className="h-4 w-4" />
    if (error) return <ShieldX className="h-4 w-4" />
    return <ShieldCheck className="h-4 w-4" />
  }

  const getVerificationText = () => {
    if (loading) return 'Verifying...'
    if (!isConnected) return 'Verify with World ID'
    if (error) return 'Verification Failed'
    
    switch (verificationLevel) {
      case 'Orb':
        return 'Orb Verified'
      case 'Phone':
        return 'Phone Verified'
      case 'Device':
        return 'Device Verified'
      default:
        return 'Verified'
    }
  }

  const getButtonVariant = () => {
    if (loading) return 'secondary'
    if (error) return 'destructive'
    if (isVerified) {
      switch (verificationLevel) {
        case 'Orb':
          return 'default'
        case 'Phone':
          return 'secondary'
        case 'Device':
          return 'outline'
        default:
          return 'secondary'
      }
    }
    return 'default'
  }

  const getButtonClassName = () => {
    if (isVerified) {
      switch (verificationLevel) {
        case 'Orb':
          return 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white'
        case 'Phone':
          return 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white'
        case 'Device':
          return 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
        default:
          return ''
      }
    }
    return ''
  }

  if (isConnected && isVerified) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant={getButtonVariant()}
          size="sm"
          onClick={handleDisconnect}
          className={cn(
            "flex items-center gap-2",
            getButtonClassName(),
            className
          )}
        >
          {getVerificationIcon()}
          {getVerificationText()}
        </Button>
        {error && (
          <div className="text-xs text-red-500 max-w-32 truncate" title={error}>
            {error}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant={getButtonVariant()}
        size="sm"
        onClick={handleConnect}
        disabled={loading}
        className={cn(
          "flex items-center gap-2",
          "bg-gradient-to-r from-cyan-500 to-purple-600",
          "hover:from-cyan-600 hover:to-purple-700",
          "text-white font-semibold",
          "shadow-lg hover:shadow-xl",
          "transition-all duration-200",
          className
        )}
      >
        {getVerificationIcon()}
        {getVerificationText()}
      </Button>
      {error && (
        <div className="text-xs text-red-500 text-center" title={error}>
          {error}
        </div>
      )}
    </div>
  )
}

