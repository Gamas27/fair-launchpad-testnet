'use client'

import { useAccount, useBalance, useChainId, useSwitchChain } from 'wagmi'
import { formatEther } from 'viem'

export function useWallet() {
  const { address, isConnected, connector } = useAccount()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  
  const { data: balance } = useBalance({
    address: address,
  })

  const formattedBalance = balance ? formatEther(balance.value) : '0'

  return {
    address,
    isConnected,
    connector,
    chainId,
    balance: formattedBalance,
    symbol: balance?.symbol || 'ETH',
    switchChain,
  }
}


