'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { contractService } from '@/lib/contracts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Plus, CheckCircle } from 'lucide-react'

interface TokenCreationFormProps {
  onTokenCreated?: (tokenAddress: string) => void
}

export function TokenCreationForm({ onTokenCreated }: TokenCreationFormProps) {
  const { address, isConnected } = useAuth()
  const [isCreating, setIsCreating] = useState(false)
  const [createdToken, setCreatedToken] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    initialPrice: '1',
    maxSupply: '1000000'
  })

  const handleCreateToken = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first')
      return
    }

    if (!formData.name || !formData.symbol) {
      alert('Please fill in all required fields')
      return
    }

    setIsCreating(true)
    try {
      // Convert to wei
      const initialPriceWei = (parseFloat(formData.initialPrice) * 1e18).toString()
      const maxSupplyWei = (parseFloat(formData.maxSupply) * 1e18).toString()

      // Create token using deployed TokenFactory
      const tx = await contractService.createToken(
        formData.name,
        formData.symbol,
        initialPriceWei,
        maxSupplyWei
      )

      console.log('Token creation transaction:', tx)
      setCreatedToken(tx)
      onTokenCreated?.(tx)
      
    } catch (error) {
      console.error('Error creating token:', error)
      alert('Failed to create token. Please try again.')
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
                setFormData({ name: '', symbol: '', initialPrice: '1', maxSupply: '1000000' })
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
          disabled={isCreating || !formData.name || !formData.symbol}
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
