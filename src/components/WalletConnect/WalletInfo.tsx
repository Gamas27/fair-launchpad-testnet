'use client'

import { useWallet } from '@/hooks/useWallet'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Wallet, Coins, Network } from 'lucide-react'

export function WalletInfo() {
  const { address, isConnected, balance, symbol, chainId, connector } = useWallet()

  if (!isConnected) {
    return null
  }

  const getChainName = (chainId: number) => {
    switch (chainId) {
      case 1: return 'Ethereum'
      case 11155111: return 'Sepolia'
      case 137: return 'Polygon'
      case 42161: return 'Arbitrum'
      default: return `Chain ${chainId}`
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Wallet Connected
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Address:</span>
            <Badge variant="outline" className="font-mono text-xs">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Network:</span>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Network className="h-3 w-3" />
              {getChainName(chainId)}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Balance:</span>
            <Badge variant="outline" className="flex items-center gap-1">
              <Coins className="h-3 w-3" />
              {parseFloat(balance).toFixed(4)} {symbol}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Connector:</span>
            <Badge variant="outline">
              {connector?.name}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


