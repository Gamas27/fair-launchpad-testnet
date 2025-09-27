'use client'

import { usePrivyWallet } from './usePrivyWallet'

// Legacy hook - now uses Privy under the hood
export function useWallet() {
  const privyWallet = usePrivyWallet()
  
  return {
    address: privyWallet.address,
    isConnected: privyWallet.isConnected,
    balance: privyWallet.balance,
    symbol: privyWallet.symbol,
    chainId: privyWallet.chainId,
    connector: privyWallet.connector,
    // Legacy switchChain function - Privy handles this automatically
    switchChain: async () => {
      console.warn('switchChain is not needed with Privy - it handles chain switching automatically')
    },
  }
}



