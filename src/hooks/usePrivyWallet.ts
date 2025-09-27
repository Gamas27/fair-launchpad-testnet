'use client'

import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useAccount, useBalance, useChainId } from 'wagmi'
import { useMemo } from 'react'

export function usePrivyWallet() {
  const { ready, authenticated, user, login, logout } = usePrivy()
  const { wallets } = useWallets()
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })
  const chainId = useChainId()

  const walletInfo = useMemo(() => {
    if (!authenticated || !user?.wallet) {
      return {
        isConnected: false,
        address: null,
        balance: '0',
        chainId: null,
        connector: null,
        symbol: 'ETH',
        user: null,
        wallets: [],
      }
    }

    return {
      isConnected: authenticated && !!user.wallet.address,
      address: user.wallet.address,
      balance: balance?.formatted || '0',
      chainId: chainId || null,
      connector: user.wallet.connectorType || 'privy',
      symbol: balance?.symbol || 'ETH',
      user: user,
      wallets: wallets,
    }
  }, [authenticated, user, address, balance, chainId, wallets])

  return {
    ...walletInfo,
    ready,
    login,
    logout,
    // Additional Privy-specific methods
    isEmailUser: !!user?.email,
    isPhoneUser: !!user?.phone,
    isGoogleUser: !!user?.google,
    isTwitterUser: !!user?.twitter,
    isDiscordUser: !!user?.discord,
    hasEmbeddedWallet: wallets.some(wallet => wallet.walletClientType === 'privy'),
    hasExternalWallet: wallets.some(wallet => wallet.walletClientType !== 'privy'),
  }
}
