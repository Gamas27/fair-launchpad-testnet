'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useWeb3 } from '@/hooks/useWeb3'
import { Copy, ExternalLink, RefreshCw, Wallet } from 'lucide-react'

export function WalletConnection() {
  const {
    isConnected,
    account,
    chainId,
    balance,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    refreshBalances,
  } = useWeb3()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleConnect = async () => {
    try {
      await connectWallet()
    } catch (error) {
      console.error('Connection failed:', error)
    }
  }

  const handleDisconnect = () => {
    disconnectWallet()
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refreshBalances()
    } catch (error) {
      console.error('Refresh failed:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getNetworkName = (chainId: number | null) => {
    switch (chainId) {
      case 1:
        return 'Ethereum Mainnet'
      case 11155111:
        return 'Sepolia Testnet'
      case 137:
        return 'Polygon'
      case 8453:
        return 'Base'
      default:
        return `Chain ${chainId}`
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatBalance = (balance: string) => {
    const num = parseFloat(balance)
    if (num < 0.001) {
      return '< 0.001'
    }
    return num.toFixed(4)
  }

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </CardTitle>
          <CardDescription>
            Connect your wallet to start trading tokens
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full"
          >
            {isConnecting ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Connected
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
        <CardDescription>
          Your wallet is connected and ready for trading
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Account Address */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
          <div>
            <p className="text-sm font-medium">Account</p>
            <p className="text-sm text-gray-600 font-mono">
              {formatAddress(account!)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(account!)}
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`https://etherscan.io/address/${account}`, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Network */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Network</span>
          <Badge variant="secondary">
            {getNetworkName(chainId)}
          </Badge>
        </div>

        {/* ETH Balance */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">ETH Balance</span>
          <span className="text-sm font-mono">
            {formatBalance(balance)} ETH
          </span>
        </div>

        {/* Disconnect Button */}
        <Button
          variant="outline"
          onClick={handleDisconnect}
          className="w-full"
        >
          Disconnect Wallet
        </Button>
      </CardContent>
    </Card>
  )
}


