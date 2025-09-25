'use client'

import { useState, useEffect, useCallback } from 'react'
import { blockchainService, TradeResult, TokenInfo } from '@/lib/blockchain'

export interface Web3State {
  isConnected: boolean
  account: string | null
  chainId: number | null
  balance: string
  isConnecting: boolean
  error: string | null
}

export interface TokenBalance {
  tokenAddress: string
  balance: string
  symbol: string
}

export function useWeb3() {
  const [state, setState] = useState<Web3State>({
    isConnected: false,
    account: null,
    chainId: null,
    balance: '0',
    isConnecting: false,
    error: null,
  })

  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([])

  const connectWallet = useCallback(async () => {
    setState(prev => ({ ...prev, isConnecting: true, error: null }))

    try {
      const account = await blockchainService.connectWallet()
      
      // Get chain ID
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      
      // Get ETH balance
      const balance = await blockchainService.getEthBalance(account)

      setState({
        isConnected: true,
        account,
        chainId: parseInt(chainId, 16),
        balance,
        isConnecting: false,
        error: null,
      })

      // Listen for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)

    } catch (error) {
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: error instanceof Error ? error.message : 'Failed to connect wallet',
      }))
    }
  }, [])

  const disconnectWallet = useCallback(() => {
    setState({
      isConnected: false,
      account: null,
      chainId: null,
      balance: '0',
      isConnecting: false,
      error: null,
    })
    setTokenBalances([])

    // Remove event listeners
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      window.ethereum.removeListener('chainChanged', handleChainChanged)
    }
  }, [])

  const handleAccountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet()
    } else {
      setState(prev => ({ ...prev, account: accounts[0] }))
    }
  }, [disconnectWallet])

  const handleChainChanged = useCallback((chainId: string) => {
    setState(prev => ({ ...prev, chainId: parseInt(chainId, 16) }))
  }, [])

  const switchNetwork = useCallback(async (chainId: string) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      })
    } catch (error) {
      console.error('Failed to switch network:', error)
      throw error
    }
  }, [])

  const addNetwork = useCallback(async (networkConfig: {
    chainId: string
    chainName: string
    rpcUrls: string[]
    blockExplorerUrls: string[]
    nativeCurrency: {
      name: string
      symbol: string
      decimals: number
    }
  }) => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [networkConfig],
      })
    } catch (error) {
      console.error('Failed to add network:', error)
      throw error
    }
  }, [])

  const buyTokens = useCallback(async (
    tokenAddress: string,
    amount: string,
    maxSlippage: number = 5
  ): Promise<TradeResult> => {
    if (!state.isConnected) {
      throw new Error('Wallet not connected')
    }

    try {
      const result = await blockchainService.buyTokens(tokenAddress, amount, maxSlippage)
      
      if (result.success) {
        // Refresh balances after successful trade
        await refreshBalances()
      }
      
      return result
    } catch (error) {
      console.error('Buy tokens failed:', error)
      throw error
    }
  }, [state.isConnected])

  const sellTokens = useCallback(async (
    tokenAddress: string,
    tokenAmount: string,
    maxSlippage: number = 5
  ): Promise<TradeResult> => {
    if (!state.isConnected) {
      throw new Error('Wallet not connected')
    }

    try {
      const result = await blockchainService.sellTokens(tokenAddress, tokenAmount, maxSlippage)
      
      if (result.success) {
        // Refresh balances after successful trade
        await refreshBalances()
      }
      
      return result
    } catch (error) {
      console.error('Sell tokens failed:', error)
      throw error
    }
  }, [state.isConnected])

  const getTokenInfo = useCallback(async (tokenAddress: string): Promise<TokenInfo> => {
    try {
      return await blockchainService.getTokenInfo(tokenAddress)
    } catch (error) {
      console.error('Get token info failed:', error)
      throw error
    }
  }, [])

  const getTokenBalance = useCallback(async (tokenAddress: string): Promise<string> => {
    if (!state.account) {
      return '0'
    }

    try {
      return await blockchainService.getBalance(tokenAddress, state.account)
    } catch (error) {
      console.error('Get token balance failed:', error)
      return '0'
    }
  }, [state.account])

  const refreshBalances = useCallback(async () => {
    if (!state.account) return

    try {
      // Refresh ETH balance
      const ethBalance = await blockchainService.getEthBalance(state.account)
      setState(prev => ({ ...prev, balance: ethBalance }))

      // Refresh token balances
      const balances = await Promise.all(
        tokenBalances.map(async (tokenBalance) => {
          const balance = await blockchainService.getBalance(tokenBalance.tokenAddress, state.account!)
          return {
            ...tokenBalance,
            balance,
          }
        })
      )
      setTokenBalances(balances)
    } catch (error) {
      console.error('Failed to refresh balances:', error)
    }
  }, [state.account, tokenBalances])

  const addTokenToWatchlist = useCallback(async (tokenAddress: string, symbol: string) => {
    if (!state.account) return

    try {
      const balance = await blockchainService.getBalance(tokenAddress, state.account)
      const newTokenBalance: TokenBalance = {
        tokenAddress,
        balance,
        symbol,
      }

      setTokenBalances(prev => {
        const existing = prev.find(tb => tb.tokenAddress === tokenAddress)
        if (existing) {
          return prev.map(tb => 
            tb.tokenAddress === tokenAddress 
              ? { ...tb, balance }
              : tb
          )
        }
        return [...prev, newTokenBalance]
      })
    } catch (error) {
      console.error('Failed to add token to watchlist:', error)
    }
  }, [state.account])

  const removeTokenFromWatchlist = useCallback((tokenAddress: string) => {
    setTokenBalances(prev => prev.filter(tb => tb.tokenAddress !== tokenAddress))
  }, [])

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' })
          if (accounts.length > 0) {
            const account = accounts[0]
            const chainId = await window.ethereum.request({ method: 'eth_chainId' })
            const balance = await blockchainService.getEthBalance(account)

            setState({
              isConnected: true,
              account,
              chainId: parseInt(chainId, 16),
              balance,
              isConnecting: false,
              error: null,
            })

            // Set up event listeners
            window.ethereum.on('accountsChanged', handleAccountsChanged)
            window.ethereum.on('chainChanged', handleChainChanged)
          }
        } catch (error) {
          console.error('Failed to check wallet connection:', error)
        }
      }
    }

    checkConnection()
  }, [handleAccountsChanged, handleChainChanged])

  return {
    ...state,
    tokenBalances,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    addNetwork,
    buyTokens,
    sellTokens,
    getTokenInfo,
    getTokenBalance,
    refreshBalances,
    addTokenToWatchlist,
    removeTokenFromWatchlist,
  }
}


