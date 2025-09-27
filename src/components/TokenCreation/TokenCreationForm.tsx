'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { contractService } from '@/lib/contracts'
import { useWallets } from '@privy-io/react-auth'
import { ethers } from 'ethers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Plus, CheckCircle, Upload, Image } from 'lucide-react'

interface TokenCreationFormProps {
  onTokenCreated?: (tokenAddress: string) => void
}

export function TokenCreationForm({ onTokenCreated }: TokenCreationFormProps) {
  const { address, isConnected } = useAuth()
  const { wallets } = useWallets()
  const [isCreating, setIsCreating] = useState(false)
  const [createdToken, setCreatedToken] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    imageUrl: '',
    initialPrice: '1',
    maxSupply: '1000000'
  })

  const handleCreateToken = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first')
      return
    }

    if (!formData.name || !formData.symbol || !formData.description) {
      alert('Please fill in all required fields')
      return
    }

    setIsCreating(true)
    try {
      // Get the active wallet
      const activeWallet = wallets.find((wallet) => wallet.walletClientType === 'privy') || wallets[0]
      
      if (!activeWallet) {
        throw new Error('No wallet connected')
      }

      // Convert to wei using ethers.js parseEther to avoid scientific notation
      const initialPriceWei = ethers.parseEther(formData.initialPrice).toString()
      const maxSupplyWei = ethers.parseEther(formData.maxSupply).toString()

      // Create token using Privy wallet integration
      const result = await contractService.createTokenWithPrivyWallet(
        activeWallet,
        formData.name,
        formData.symbol,
        initialPriceWei,
        maxSupplyWei
      )

      console.log('Token creation result:', result)
      const tokenAddress = result.tokenAddress || result.transactionHash
      setCreatedToken(tokenAddress)
      
      // Save token to backend database
      try {
        const response = await fetch('/api/tokens', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            address: tokenAddress,
            name: formData.name,
            symbol: formData.symbol,
            description: formData.description,
            imageUrl: formData.imageUrl || `https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=${formData.symbol}`,
            initialPrice: parseFloat(formData.initialPrice),
            priceIncrement: 0.01, // Default price increment
            maxSupply: parseFloat(formData.maxSupply),
          }),
        })
        
        if (response.ok) {
          console.log('Token saved to database successfully')
        } else {
          console.error('Failed to save token to database:', await response.text())
        }
      } catch (dbError) {
        console.error('Failed to save token to database:', dbError)
        // Don't fail the entire process if database save fails
      }
      
      onTokenCreated?.(tokenAddress)
      
    } catch (error) {
      console.error('Error creating token:', error)
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        wallet: activeWallet,
        formData
      })
      alert(`Failed to create token: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsCreating(false)
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Create New Token</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              Please connect your wallet to create a new token.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (createdToken) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Token Created Successfully!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Your token has been created and deployed to the blockchain.
            </p>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm font-mono break-all">
                Token Address: {createdToken}
              </p>
            </div>
            <Button 
              onClick={() => {
                setCreatedToken(null)
                setFormData({ name: '', symbol: '', description: '', imageUrl: '', initialPrice: '1', maxSupply: '1000000' })
              }}
              variant="outline"
            >
              Create Another Token
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Token
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Token Name *</Label>
            <Input
              id="name"
              placeholder="My Awesome Token"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="symbol">Token Symbol *</Label>
            <Input
              id="symbol"
              placeholder="MAT"
              value={formData.symbol}
              onChange={(e) => setFormData(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe your token and its purpose..."
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Token Image URL (Optional)</Label>
          <div className="flex items-center gap-2">
            <Input
              id="imageUrl"
              placeholder="https://example.com/token-image.png"
              value={formData.imageUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
            />
            {formData.imageUrl && (
              <div className="w-10 h-10 rounded-lg overflow-hidden border">
                <img 
                  src={formData.imageUrl} 
                  alt="Token preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="initialPrice">Initial Price (WLD)</Label>
            <Input
              id="initialPrice"
              type="number"
              step="0.01"
              placeholder="1.0"
              value={formData.initialPrice}
              onChange={(e) => setFormData(prev => ({ ...prev, initialPrice: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxSupply">Max Supply</Label>
            <Input
              id="maxSupply"
              type="number"
              placeholder="1000000"
              value={formData.maxSupply}
              onChange={(e) => setFormData(prev => ({ ...prev, maxSupply: e.target.value }))}
            />
          </div>
        </div>

        <Alert>
          <AlertDescription>
            <strong>Deployed Contract:</strong> TokenFactory at {contractService.getTokenFactoryAddress()}
          </AlertDescription>
        </Alert>

        <Button 
          onClick={handleCreateToken}
          disabled={isCreating || !formData.name || !formData.symbol || !formData.description}
          className="w-full"
        >
          {isCreating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating Token...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Create Token
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
