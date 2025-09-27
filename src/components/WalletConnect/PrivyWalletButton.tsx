'use client'

import { usePrivy, useWallets } from '@privy-io/react-auth'
import { Button } from '@/components/ui/button'
import { Wallet, LogOut, Copy, Check, User } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function PrivyWalletButton() {
  const { ready, authenticated, user, login, logout } = usePrivy()
  const { wallets } = useWallets()
  const [copied, setCopied] = useState(false)

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyAddress = async () => {
    if (user?.wallet?.address && typeof window !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(user.wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!ready) {
    return (
      <Button disabled className="flex items-center gap-2">
        <Wallet className="h-4 w-4" />
        Loading...
      </Button>
    )
  }

  if (authenticated && user?.wallet?.address) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={copyAddress}
          className="flex items-center gap-2"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {formatAddress(user.wallet.address)}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={login}
      className={cn(
        "flex items-center gap-2",
        "bg-gradient-to-r from-cyan-500 to-purple-600",
        "hover:from-cyan-600 hover:to-purple-700",
        "text-white font-semibold",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-200"
      )}
    >
      <Wallet className="h-4 w-4" />
      Connect Wallet
    </Button>
  )
}

export function PrivyUserProfile() {
  const { ready, authenticated, user } = usePrivy()
  const { wallets } = useWallets()

  if (!ready || !authenticated || !user) {
    return null
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <User className="h-4 w-4" />
      <span>
        {user.email?.address || user.phone?.number || 'Connected'}
      </span>
      {wallets.length > 0 && (
        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          {wallets.length} wallet{wallets.length > 1 ? 's' : ''}
        </span>
      )}
    </div>
  )
}
