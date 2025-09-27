'use client'

import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useMemo, useState, useEffect, useCallback } from 'react'
import { PublicClient, createPublicClient, http } from 'viem'
import { mainnet, sepolia, polygon, arbitrum } from 'viem/chains'

interface PrivyWalletState {
  address: string | null
  isConnected: boolean
  balance: string | null
  symbol: string | null
  chainId: number | null
  connector: string | null
  user: any | null // Privy user object
  isEmailUser: boolean
  isPhoneUser: boolean
  publicClient: PublicClient | null
}

export function usePrivyWallet(): PrivyWalletState {
  const { ready, authenticated, user } = usePrivy()
  const { wallets } = useWallets()
  const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy')
  const activeWallet = embeddedWallet || wallets[0] // Prioritize embedded, then any other connected

  const [balance, setBalance] = useState<string | null>(null)
  const [symbol, setSymbol] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)

  const address = activeWallet?.address || null
  const isConnected = ready && authenticated && !!address

  const publicClient = useMemo(() => {
    if (!activeWallet) return null
    const chain = [mainnet, sepolia, polygon, arbitrum].find(c => c.id === activeWallet.chainId)
    if (!chain) return null
    return createPublicClient({
      chain,
      transport: http(),
    })
  }, [activeWallet])

  const fetchBalance = useCallback(async () => {
    if (publicClient && address) {
      try {
        const balanceWei = await publicClient.getBalance({ address: address as `0x${string}` })
        setBalance((Number(balanceWei) / 10 ** 18).toFixed(4)) // Convert wei to ETH
        setSymbol(publicClient.chain?.nativeCurrency?.symbol || 'ETH')
        setChainId(publicClient.chain?.id || null)
      } catch (error) {
        console.error('Failed to fetch balance:', error)
        setBalance(null)
        setSymbol(null)
        setChainId(null)
      }
    } else {
      setBalance(null)
      setSymbol(null)
      setChainId(null)
    }
  }, [publicClient, address])

  useEffect(() => {
    fetchBalance()
    const interval = setInterval(fetchBalance, 10000) // Refresh balance every 10 seconds
    return () => clearInterval(interval)
  }, [fetchBalance])

  const isEmailUser = user?.email?.address === user?.id
  const isPhoneUser = user?.phone?.number === user?.id

  return {
    address,
    isConnected,
    balance,
    symbol,
    chainId,
    connector: activeWallet?.connectorType || null,
    user,
    isEmailUser,
    isPhoneUser,
    publicClient,
  }
}