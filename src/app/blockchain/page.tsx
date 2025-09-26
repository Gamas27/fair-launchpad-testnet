'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { WalletConnection } from '@/components/Web3/WalletConnection'
import { BlockchainTradingInterface } from '@/components/trading/BlockchainTradingInterface'
import { TokenDeployment } from '@/components/trading/TokenDeployment'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useWeb3 } from '@/hooks/useWeb3'
import { blockchainService } from '@/lib/blockchain'
import { ExternalLink, Search, Loader2 } from 'lucide-react'

export default function BlockchainPage() {
  const { isConnected, account } = useWeb3()
  const [tokenAddress, setTokenAddress] = useState('')
  const [isLoadingToken, setIsLoadingToken] = useState(false)
  const [tokenError, setTokenError] = useState<string | null>(null)

  const handleTokenSearch = async () => {
    if (!tokenAddress) return

    setIsLoadingToken(true)
    setTokenError(null)

    try {
      // Validate token address format
      if (!tokenAddress.startsWith('0x') || tokenAddress.length !== 42) {
        throw new Error('Invalid token address format')
      }

      // Try to get token info to validate it exists
      await blockchainService.getTokenInfo(tokenAddress)
    } catch (error) {
      console.error('Token validation failed:', error)
      setTokenError(error instanceof Error ? error.message : 'Invalid token address')
    } finally {
      setIsLoadingToken(false)
    }
  }

  const exampleTokens = [
    {
      name: 'FairLaunch Token',
      symbol: 'FLT',
      address: '0x1111111111111111111111111111111111111111',
    },
    {
      name: 'Test Token',
      symbol: 'TEST',
      address: '0x2222222222222222222222222222222222222222',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Blockchain Integration</h1>
          <p className="text-xl text-gray-600 mb-6">
            Trade tokens on the blockchain with real transactions
          </p>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Powered by Ethereum
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wallet Connection */}
          <div className="lg:col-span-1">
            <WalletConnection />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="trade" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="trade">Trade Tokens</TabsTrigger>
                <TabsTrigger value="deploy">Deploy Token</TabsTrigger>
                <TabsTrigger value="explore">Explore</TabsTrigger>
              </TabsList>

              <TabsContent value="trade" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Trade Existing Tokens</CardTitle>
                    <CardDescription>
                      Buy and sell tokens using the bonding curve mechanism
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tokenAddress">Token Contract Address</Label>
                      <div className="flex gap-2">
                        <Input
                          id="tokenAddress"
                          placeholder="0x..."
                          value={tokenAddress}
                          onChange={(e) => setTokenAddress(e.target.value)}
                          className="font-mono"
                        />
                        <Button
                          onClick={handleTokenSearch}
                          disabled={isLoadingToken || !tokenAddress}
                        >
                          {isLoadingToken ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Search className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {tokenError && (
                        <p className="text-sm text-red-600">{tokenError}</p>
                      )}
                    </div>

                    {/* Example Tokens */}
                    <div className="space-y-2">
                      <Label>Example Tokens</Label>
                      <div className="flex flex-wrap gap-2">
                        {exampleTokens.map((token) => (
                          <Button
                            key={token.address}
                            variant="outline"
                            size="sm"
                            onClick={() => setTokenAddress(token.address)}
                            className="text-xs"
                          >
                            {token.symbol}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {tokenAddress && !tokenError && (
                      <BlockchainTradingInterface tokenAddress={tokenAddress} />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="deploy" className="space-y-6">
                <TokenDeployment />
              </TabsContent>

              <TabsContent value="explore" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Explore the Platform</CardTitle>
                    <CardDescription>
                      Learn about the FairLaunch platform and its features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">How It Works</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                              1
                            </div>
                            <div>
                              <p className="font-medium">Connect Wallet</p>
                              <p className="text-gray-600">Connect your MetaMask or other Web3 wallet</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                              2
                            </div>
                            <div>
                              <p className="font-medium">Deploy or Trade</p>
                              <p className="text-gray-600">Deploy new tokens or trade existing ones</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                              3
                            </div>
                            <div>
                              <p className="font-medium">Anti-Bot Protection</p>
                              <p className="text-gray-600">World ID verification prevents bot manipulation</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Features</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Bonding Curve Pricing</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>World ID Integration</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Anti-Manipulation Detection</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Reputation System</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Real-time Trading</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-semibold mb-3">Network Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center justify-between">
                          <span>Network:</span>
                          <Badge variant="outline">Ethereum Sepolia</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Chain ID:</span>
                          <span className="font-mono">11155111</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Explorer:</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open('https://sepolia.etherscan.io', '_blank')}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Etherscan
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}



