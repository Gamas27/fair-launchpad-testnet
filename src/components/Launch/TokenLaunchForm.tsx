'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { usePrivyWallet } from '@/hooks/usePrivyWallet'
import { useSafeWorldId } from '@/providers/SafeWorldIdProvider'
import { contractService } from '@/lib/contracts'
import { useWallets } from '@privy-io/react-auth'
import { Rocket, Shield, CheckCircle, AlertCircle, Loader2, ExternalLink } from 'lucide-react'

interface LaunchFormData {
  name: string
  symbol: string
  description: string
  initialPrice: string
  maxSupply: string
  imageUrl: string
}

export function TokenLaunchForm() {
  const { address, isConnected } = usePrivyWallet()
  const { isVerified, verificationLevel } = useSafeWorldId()
  const { wallets } = useWallets()
  
  const [isLaunching, setIsLaunching] = useState(false)
  const [launchResult, setLaunchResult] = useState<{
    success: boolean
    tokenAddress?: string
    transactionHash?: string
    error?: string
  } | null>(null)
  const [transactionStatus, setTransactionStatus] = useState<string>('')
  
  const [formData, setFormData] = useState<LaunchFormData>({
    name: '',
    symbol: '',
    description: '',
    initialPrice: '1.0',
    maxSupply: '1000000',
    imageUrl: ''
  })

  const handleInputChange = (field: keyof LaunchFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      return 'Token name is required'
    }
    if (!formData.symbol.trim()) {
      return 'Token symbol is required'
    }
    if (formData.symbol.length < 2 || formData.symbol.length > 10) {
      return 'Token symbol must be 2-10 characters'
    }
    if (!formData.description.trim()) {
      return 'Token description is required'
    }
    if (isNaN(parseFloat(formData.initialPrice)) || parseFloat(formData.initialPrice) <= 0) {
      return 'Initial price must be a positive number'
    }
    if (isNaN(parseFloat(formData.maxSupply)) || parseFloat(formData.maxSupply) <= 0) {
      return 'Max supply must be a positive number'
    }
    return null
  }

  const handleLaunch = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first')
      return
    }

    if (!isVerified) {
      alert('Please verify with World ID first to prevent bot manipulation')
      return
    }

    const validationError = validateForm()
    if (validationError) {
      alert(validationError)
      return
    }

    setIsLaunching(true)
    setLaunchResult(null)
    setTransactionStatus('Preparing transaction...')

    try {
      // Get the connected wallet
      const wallet = wallets[0]
      if (!wallet) {
        throw new Error('No wallet connected')
      }

      setTransactionStatus('Converting values to wei...')
      
      // Convert to wei using BigInt to avoid scientific notation
      const initialPriceWei = (BigInt(Math.floor(parseFloat(formData.initialPrice) * 1e18))).toString()
      const maxSupplyWei = (BigInt(Math.floor(parseFloat(formData.maxSupply) * 1e18))).toString()

      console.log('Creating token with:', {
        name: formData.name,
        symbol: formData.symbol,
        initialPrice: initialPriceWei,
        maxSupply: maxSupplyWei
      })

      setTransactionStatus('Sending transaction to blockchain...')
      
      // Create token using Privy wallet directly
      const result = await contractService.createTokenWithPrivyWallet(
        wallet,
        formData.name,
        formData.symbol,
        initialPriceWei,
        maxSupplyWei
      )
      
      setTransactionStatus('Transaction confirmed!')

      console.log('Token creation result:', result)
      
      setLaunchResult({
        success: true,
        tokenAddress: result.tokenAddress,
        transactionHash: result.transactionHash
      })

      // Save token to backend database
      try {
        await fetch('/api/tokens', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            address: result.tokenAddress,
            name: formData.name,
            symbol: formData.symbol,
            description: formData.description,
            imageUrl: formData.imageUrl || `https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=${formData.symbol}`,
            initialPrice: parseFloat(formData.initialPrice),
            priceIncrement: 0.01, // Default price increment
            maxSupply: parseFloat(formData.maxSupply),
          }),
        })
        console.log('Token saved to database successfully')
      } catch (dbError) {
        console.error('Failed to save token to database:', dbError)
        // Don't fail the entire process if database save fails
      }

      // Reset form
      setFormData({
        name: '',
        symbol: '',
        description: '',
        initialPrice: '1.0',
        maxSupply: '1000000',
        imageUrl: ''
      })

    } catch (error: any) {
      console.error('Error creating token:', error)
      
      // Handle specific error types
      let errorMessage = 'Failed to create token. Please try again.'
      
      if (error.code === 'ACTION_REJECTED' || error.reason === 'rejected') {
        errorMessage = 'Transaction was rejected. Please try again and confirm the transaction in MetaMask.'
      } else if (error.code === 4001) {
        errorMessage = 'Transaction was rejected by user. Please try again and confirm the transaction in MetaMask.'
      } else if (error.message?.includes('insufficient funds')) {
        errorMessage = 'Insufficient funds. Please ensure you have enough ETH to cover gas fees.'
      } else if (error.message?.includes('gas')) {
        errorMessage = 'Gas estimation failed. Please try again or increase gas limit in MetaMask.'
      } else if (error.message?.includes('network')) {
        errorMessage = 'Network error. Please check your connection and try again.'
      } else if (error.message?.includes('contract')) {
        errorMessage = 'Contract interaction failed. Please verify the contract address is correct.'
      } else if (error.message?.includes('user denied')) {
        errorMessage = 'Transaction was rejected by user. Please try again and confirm the transaction in MetaMask.'
      } else if (error.message) {
        errorMessage = `Transaction failed: ${error.message}`
      }
      
      setLaunchResult({
        success: false,
        error: errorMessage,
      })
    } finally {
      setIsLaunching(false)
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Launch New Token
          </CardTitle>
          <CardDescription>
            Create a new meme coin with fair launch mechanics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please connect your wallet to launch a new token.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!isVerified) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Launch New Token
          </CardTitle>
          <CardDescription>
            Create a new meme coin with fair launch mechanics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Please verify with World ID first to prevent bot manipulation and ensure fair launches.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (launchResult?.success) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            Token Launched Successfully!
          </CardTitle>
          <CardDescription>
            Your token has been created and is ready for trading
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Token Address</Label>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono">
                {launchResult.tokenAddress?.slice(0, 6)}...{launchResult.tokenAddress?.slice(-4)}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigator.clipboard.writeText(launchResult.tokenAddress || '')}
              >
                Copy
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Transaction Hash</Label>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono">
                {launchResult.transactionHash?.slice(0, 6)}...{launchResult.transactionHash?.slice(-4)}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`https://worldscan.org/tx/${launchResult.transactionHash}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button 
            onClick={() => setLaunchResult(null)}
            className="w-full"
          >
            Launch Another Token
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="h-5 w-5" />
          Launch New Token
        </CardTitle>
        <CardDescription>
          Create a new meme coin with fair launch mechanics. World ID verification required.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Verification Status */}
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <Shield className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-700">
            World ID Verified ({verificationLevel})
          </span>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Token Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., DogeCoin 2.0"
              maxLength={50}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="symbol">Token Symbol *</Label>
            <Input
              id="symbol"
              value={formData.symbol}
              onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
              placeholder="e.g., DOGE2"
              maxLength={10}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your token and its purpose..."
            rows={3}
            maxLength={500}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="initialPrice">Initial Price (WLD) *</Label>
            <Input
              id="initialPrice"
              type="number"
              step="0.01"
              value={formData.initialPrice}
              onChange={(e) => handleInputChange('initialPrice', e.target.value)}
              placeholder="1.0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="maxSupply">Max Supply *</Label>
            <Input
              id="maxSupply"
              type="number"
              value={formData.maxSupply}
              onChange={(e) => handleInputChange('maxSupply', e.target.value)}
              placeholder="1000000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL (Optional)</Label>
          <Input
            id="imageUrl"
            value={formData.imageUrl}
            onChange={(e) => handleInputChange('imageUrl', e.target.value)}
            placeholder="https://example.com/token-image.png"
          />
        </div>

        {/* Launch Button */}
        <Button 
          onClick={handleLaunch}
          disabled={isLaunching}
          className="w-full"
          size="lg"
        >
          {isLaunching ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating Token...
            </>
          ) : (
            <>
              <Rocket className="h-4 w-4 mr-2" />
              Launch Token
            </>
          )}
        </Button>
        
        {/* Transaction Status */}
        {isLaunching && transactionStatus && (
          <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded border">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{transactionStatus}</span>
            </div>
          </div>
        )}

        {/* Error Display */}
        {launchResult?.success === false && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="space-y-2">
              <p>{launchResult.error}</p>
              {launchResult.error.includes('rejected') && (
                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                  <p className="font-medium text-yellow-800">💡 Tips for successful transaction:</p>
                  <ul className="mt-1 text-yellow-700 list-disc list-inside space-y-1">
                    <li>Make sure you have enough ETH for gas fees</li>
                    <li>Check that you're on the correct network (Sepolia/Goerli for testnet)</li>
                    <li>Confirm the transaction in MetaMask when prompted</li>
                    <li>Try increasing the gas limit if the transaction fails</li>
                  </ul>
                </div>
              )}
              <div className="mt-3 flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    setLaunchResult(null)
                    setTransactionStatus('')
                  }}
                >
                  Try Again
                </Button>
                {launchResult.error?.includes('rejected') && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      // Reset form and try again
                      setLaunchResult(null)
                      setTransactionStatus('')
                    }}
                  >
                    Reset Form
                  </Button>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Launch Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Token will be created using the deployed TokenFactory contract</p>
          <p>• Initial bonding curve will start at the specified price</p>
          <p>• Token will be tradeable immediately after creation</p>
          <p>• Graduation to Uniswap V3 will happen automatically when conditions are met</p>
        </div>
      </CardContent>
    </Card>
  )
}
