'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Network, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { usePrivyWallet } from '@/hooks/usePrivyWallet'
import { useWallets } from '@privy-io/react-auth'

export function NetworkSwitcher() {
  const { chainId, isConnected } = usePrivyWallet()
  const { wallets } = useWallets()
  const [isSwitching, setIsSwitching] = useState(false)

  const sepoliaChainId = 11155111
  const goerliChainId = 5
  const mainnetChainId = 1

  const getNetworkInfo = (chainId: number) => {
    switch (chainId) {
      case sepoliaChainId:
        return { name: 'Sepolia Testnet', color: 'bg-green-500', isTestnet: true }
      case goerliChainId:
        return { name: 'Goerli Testnet', color: 'bg-blue-500', isTestnet: true }
      case mainnetChainId:
        return { name: 'Ethereum Mainnet', color: 'bg-purple-500', isTestnet: false }
      default:
        return { name: `Chain ${chainId}`, color: 'bg-gray-500', isTestnet: false }
    }
  }

  const currentNetwork = getNetworkInfo(chainId || 0)
  const isOnTestnet = currentNetwork.isTestnet

  const switchToSepolia = async () => {
    if (!isConnected || !wallets.length) return

    setIsSwitching(true)
    try {
      // Get the connected wallet from Privy
      const wallet = wallets[0]
      
      // Check if it's a MetaMask wallet
      if (wallet.connectorType !== 'injected' && !wallet.connectorType?.includes('metamask')) {
        throw new Error('Please connect with MetaMask to switch networks.')
      }

      // Get the provider from the wallet
      const provider = await wallet.getEthereumProvider()
      
      if (!provider) {
        throw new Error('Unable to get wallet provider.')
      }

      // Request to switch to Sepolia testnet
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }], // 11155111 in hex
      })
    } catch (error: any) {
      // If the chain doesn't exist, add it
      if (error.code === 4902) {
        try {
          const wallet = wallets[0]
          const provider = await wallet.getEthereumProvider()
          
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0xaa36a7',
              chainName: 'Sepolia Testnet',
              rpcUrls: ['https://rpc.sepolia.org'],
              nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18,
              },
              blockExplorerUrls: ['https://sepolia.etherscan.io'],
            }],
          })
        } catch (addError) {
          console.error('Failed to add Sepolia network:', addError)
        }
      } else {
        console.error('Failed to switch to Sepolia:', error)
      }
    } finally {
      setIsSwitching(false)
    }
  }

  if (!isConnected) {
    return null
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5" />
          Network Status
        </CardTitle>
        <CardDescription>
          Current network configuration for token creation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Network */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${currentNetwork.color}`} />
            <div>
              <p className="font-medium">{currentNetwork.name}</p>
              <p className="text-sm text-gray-500">Chain ID: {chainId}</p>
            </div>
          </div>
          <Badge variant={isOnTestnet ? 'default' : 'secondary'}>
            {isOnTestnet ? 'Testnet' : 'Mainnet'}
          </Badge>
        </div>

        {/* Network Recommendations */}
        {!isOnTestnet && (
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Switch to Testnet for Testing</strong>
              <br />
              You're currently on mainnet. For testing token creation, we recommend switching to Sepolia testnet to avoid real ETH costs.
            </AlertDescription>
          </Alert>
        )}

        {isOnTestnet && (
          <Alert variant="default">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Ready for Testing!</strong>
              <br />
              You're on a testnet. You can safely test token creation without real ETH costs.
            </AlertDescription>
          </Alert>
        )}

        {/* Wallet Info */}
        {wallets.length > 0 && (
          <div className="p-2 bg-blue-50 rounded border">
            <p className="text-sm font-medium text-blue-800">
              Connected Wallet: {wallets[0].connectorType}
            </p>
            <p className="text-xs text-blue-600">
              {wallets[0].connectorType === 'injected' ? 'MetaMask detected' : 'External wallet connected'}
            </p>
          </div>
        )}

        {/* Network Switch Button */}
        {chainId !== sepoliaChainId && (
          <div className="space-y-2">
            <Button
              onClick={switchToSepolia}
              disabled={isSwitching}
              className="w-full"
              variant="outline"
            >
              {isSwitching ? 'Switching...' : 'Switch to Sepolia Testnet'}
            </Button>
            <p className="text-xs text-gray-500 text-center">
              Sepolia is recommended for testing token creation
            </p>
            {wallets[0]?.connectorType !== 'injected' && (
              <Alert variant="warning">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Note:</strong> Network switching works best with MetaMask. 
                  If you're using another wallet, please manually switch to Sepolia testnet.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Network Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <p><strong>Sepolia Testnet:</strong> Chain ID 11155111</p>
          <p><strong>RPC URL:</strong> https://rpc.sepolia.org</p>
          <p><strong>Explorer:</strong> https://sepolia.etherscan.io</p>
        </div>
      </CardContent>
    </Card>
  )
}
