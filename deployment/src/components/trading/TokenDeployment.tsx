'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useWeb3 } from '@/hooks/useWeb3'
import { blockchainService, BondingCurveParams } from '@/lib/blockchain'
import { Loader2, Upload, CheckCircle, AlertCircle } from 'lucide-react'

export function TokenDeployment() {
  const { isConnected, account } = useWeb3()
  
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    initialSupply: '1000000',
    initialPrice: '0.0001',
    priceIncrement: '0.000001',
    maxSupply: '10000000',
    reserveRatio: 0.5,
  })

  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentResult, setDeploymentResult] = useState<{
    success: boolean
    tokenAddress?: string
    transactionHash?: string
    error?: string
  } | null>(null)

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleDeploy = async () => {
    if (!isConnected || !account) {
      setDeploymentResult({
        success: false,
        error: 'Please connect your wallet first'
      })
      return
    }

    if (!formData.name || !formData.symbol) {
      setDeploymentResult({
        success: false,
        error: 'Please fill in token name and symbol'
      })
      return
    }

    setIsDeploying(true)
    setDeploymentResult(null)

    try {
      const bondingCurveParams: BondingCurveParams = {
        initialPrice: formData.initialPrice,
        priceIncrement: formData.priceIncrement,
        maxSupply: formData.maxSupply,
        reserveRatio: formData.reserveRatio,
      }

      const result = await blockchainService.deployToken(
        formData.name,
        formData.symbol,
        formData.initialSupply,
        bondingCurveParams
      )

      setDeploymentResult({
        success: true,
        tokenAddress: result.tokenAddress,
        transactionHash: result.transactionHash,
      })
    } catch (error) {
      console.error('Token deployment failed:', error)
      setDeploymentResult({
        success: false,
        error: error instanceof Error ? error.message : 'Deployment failed'
      })
    } finally {
      setIsDeploying(false)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!isConnected) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Connect Wallet to Deploy</CardTitle>
          <CardDescription>
            Please connect your wallet to deploy a new token
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Deploy New Token
          </CardTitle>
          <CardDescription>
            Create a new token with bonding curve pricing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Token Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Token Name *</Label>
              <Input
                id="name"
                placeholder="My Awesome Token"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="symbol">Token Symbol *</Label>
              <Input
                id="symbol"
                placeholder="MAT"
                value={formData.symbol}
                onChange={(e) => handleInputChange('symbol', e.target.value)}
                maxLength={10}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your token..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          {/* Token Economics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="initialSupply">Initial Supply</Label>
              <Input
                id="initialSupply"
                type="number"
                value={formData.initialSupply}
                onChange={(e) => handleInputChange('initialSupply', e.target.value)}
                placeholder="1000000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxSupply">Max Supply</Label>
              <Input
                id="maxSupply"
                type="number"
                value={formData.maxSupply}
                onChange={(e) => handleInputChange('maxSupply', e.target.value)}
                placeholder="10000000"
              />
            </div>
          </div>

          {/* Bonding Curve Parameters */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Bonding Curve Parameters</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="initialPrice">Initial Price (ETH)</Label>
                <Input
                  id="initialPrice"
                  type="number"
                  step="0.000001"
                  value={formData.initialPrice}
                  onChange={(e) => handleInputChange('initialPrice', e.target.value)}
                  placeholder="0.0001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceIncrement">Price Increment (ETH)</Label>
                <Input
                  id="priceIncrement"
                  type="number"
                  step="0.000001"
                  value={formData.priceIncrement}
                  onChange={(e) => handleInputChange('priceIncrement', e.target.value)}
                  placeholder="0.000001"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reserveRatio">Reserve Ratio</Label>
              <Input
                id="reserveRatio"
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={formData.reserveRatio}
                onChange={(e) => handleInputChange('reserveRatio', Number(e.target.value))}
                placeholder="0.5"
              />
              <p className="text-sm text-gray-600">
                The ratio of reserve tokens to total supply (0.5 = 50%)
              </p>
            </div>
          </div>

          {/* Deployment Button */}
          <Button
            onClick={handleDeploy}
            disabled={isDeploying || !formData.name || !formData.symbol}
            className="w-full"
          >
            {isDeploying ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deploying Token...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Deploy Token
              </>
            )}
          </Button>

          {/* Deployment Result */}
          {deploymentResult && (
            <div className={`p-4 rounded-md ${
              deploymentResult.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {deploymentResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
                <span className={`font-medium ${
                  deploymentResult.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {deploymentResult.success ? 'Token Deployed Successfully!' : 'Deployment Failed'}
                </span>
              </div>

              {deploymentResult.success && (
                <div className="space-y-2 text-sm text-green-700">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Token Address:</span>
                    <Badge variant="outline" className="font-mono">
                      {formatAddress(deploymentResult.tokenAddress!)}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://etherscan.io/address/${deploymentResult.tokenAddress}`, '_blank')}
                    >
                      View on Etherscan
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Transaction:</span>
                    <Badge variant="outline" className="font-mono">
                      {formatAddress(deploymentResult.transactionHash!)}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://etherscan.io/tx/${deploymentResult.transactionHash}`, '_blank')}
                    >
                      View Transaction
                    </Button>
                  </div>
                </div>
              )}

              {!deploymentResult.success && (
                <p className="text-sm text-red-700">{deploymentResult.error}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


