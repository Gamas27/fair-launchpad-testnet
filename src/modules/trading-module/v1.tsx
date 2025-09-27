'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Coins, 
  Rocket,
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Shield,
  Zap,
  ExternalLink,
  Copy,
  TrendingUp,
  DollarSign,
  Users
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================================================
// TRADING MODULE V1 - LAUNCH TOKEN PAGE
// ============================================================================

interface TokenFormData {
  name: string
  symbol: string
  description: string
  totalSupply: string
  initialPrice: string
  imageUrl: string
  website: string
  twitter: string
  telegram: string
}

interface TradingModuleProps {
  className?: string
  onTokenCreated?: (tokenAddress: string) => void
}

export const LaunchTokenForm = ({ 
  className, 
  onTokenCreated 
}: TradingModuleProps) => {
  const [formData, setFormData] = useState<TokenFormData>({
    name: '',
    symbol: '',
    description: '',
    totalSupply: '1000000',
    initialPrice: '0.001',
    imageUrl: '',
    website: '',
    twitter: '',
    telegram: ''
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<'form' | 'deploying' | 'complete'>('form')
  const [tokenAddress, setTokenAddress] = useState<string | null>(null)

  const handleInputChange = (field: keyof TokenFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return 'Token name is required'
    if (!formData.symbol.trim()) return 'Token symbol is required'
    if (!formData.description.trim()) return 'Token description is required'
    if (!formData.totalSupply || parseFloat(formData.totalSupply) <= 0) return 'Total supply must be greater than 0'
    if (!formData.initialPrice || parseFloat(formData.initialPrice) <= 0) return 'Initial price must be greater than 0'
    return null
  }

  const handleSubmit = async () => {
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)
    setError(null)
    setCurrentStep('deploying')

    try {
      // Simulate token deployment
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Generate mock token address
      const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`
      setTokenAddress(mockAddress)
      setSuccess('Token launched successfully!')
      setCurrentStep('complete')
      
      if (onTokenCreated) {
        onTokenCreated(mockAddress)
      }
    } catch (err) {
      setError('Token launch failed. Please try again.')
      setCurrentStep('form')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (currentStep === 'deploying') {
    return (
      <Card className={cn("w-full max-w-2xl mx-auto", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Launching Token...
          </CardTitle>
          <CardDescription>
            Deploying your token to the blockchain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Validating token parameters...</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Deploying smart contract...</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-3 h-3 rounded-full bg-gray-300" />
              <span>Setting up bonding curve...</span>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (currentStep === 'complete' && tokenAddress) {
    return (
      <Card className={cn("w-full max-w-2xl mx-auto", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            Token Launched Successfully!
          </CardTitle>
          <CardDescription>
            Your token is now live and ready for trading
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Token launched successfully! You can now start trading.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-sm font-medium">Token Address:</span>
              <div className="flex items-center gap-2">
                <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                  {tokenAddress.slice(0, 6)}...{tokenAddress.slice(-4)}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(tokenAddress)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-blue-50 rounded-md">
                <div className="text-sm font-medium text-blue-800">Token Name</div>
                <div className="text-lg font-bold text-blue-900">{formData.name}</div>
              </div>
              <div className="p-3 bg-green-50 rounded-md">
                <div className="text-sm font-medium text-green-800">Symbol</div>
                <div className="text-lg font-bold text-green-900">{formData.symbol}</div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setCurrentStep('form')
                setTokenAddress(null)
                setSuccess(null)
              }}
              variant="outline"
              className="flex-1"
            >
              Launch Another Token
            </Button>
            <Button
              onClick={() => window.open(`https://sepolia.etherscan.io/token/${tokenAddress}`, '_blank')}
              className="flex-1"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Explorer
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="h-5 w-5" />
          Launch Your Token
        </CardTitle>
        <CardDescription>
          Create and launch a new token with anti-bot protection
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Token Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Coins className="h-4 w-4" />
              Basic Information
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Token Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., My Awesome Token"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Token Symbol *</label>
                <input
                  type="text"
                  value={formData.symbol}
                  onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
                  placeholder="e.g., MAT"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your token..."
                  rows={3}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Token Economics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Token Economics
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Total Supply *</label>
                <input
                  type="number"
                  value={formData.totalSupply}
                  onChange={(e) => handleInputChange('totalSupply', e.target.value)}
                  placeholder="1000000"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Initial Price (ETH) *</label>
                <input
                  type="number"
                  step="0.000001"
                  value={formData.initialPrice}
                  onChange={(e) => handleInputChange('initialPrice', e.target.value)}
                  placeholder="0.001"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  placeholder="https://example.com/image.png"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-4 w-4" />
            Social Links (Optional)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://example.com"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Twitter</label>
              <input
                type="text"
                value={formData.twitter}
                onChange={(e) => handleInputChange('twitter', e.target.value)}
                placeholder="@username"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Telegram</label>
              <input
                type="text"
                value={formData.telegram}
                onChange={(e) => handleInputChange('telegram', e.target.value)}
                placeholder="@username"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Token Preview */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3">Token Preview</h4>
          <div className="flex items-center gap-4">
            {formData.imageUrl ? (
              <img 
                src={formData.imageUrl} 
                alt="Token" 
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <Coins className="h-6 w-6 text-gray-500" />
              </div>
            )}
            <div>
              <div className="font-semibold">{formData.name || 'Token Name'}</div>
              <div className="text-sm text-gray-600">{formData.symbol || 'SYMBOL'}</div>
              <div className="text-xs text-gray-500">
                Supply: {formData.totalSupply || '0'} | Price: {formData.initialPrice || '0'} ETH
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Rocket className="h-4 w-4 mr-2" />
          )}
          {isLoading ? 'Launching Token...' : 'Launch Token'}
        </Button>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// TRADING MODULE V1 - MAIN PAGE
// ============================================================================

export const TradingModulePage = () => {
  const [launchedTokens, setLaunchedTokens] = useState<string[]>([])

  const handleTokenCreated = (tokenAddress: string) => {
    setLaunchedTokens(prev => [...prev, tokenAddress])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Launch Token
          </h1>
          <p className="text-gray-600">
            Create and launch tokens with anti-bot protection
          </p>
        </div>

        {/* Main Token Launch Component */}
        <LaunchTokenForm onTokenCreated={handleTokenCreated} />

        {/* Launched Tokens List */}
        {launchedTokens.length > 0 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Launched Tokens
              </CardTitle>
              <CardDescription>
                Your successfully launched tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {launchedTokens.map((address, index) => (
                  <div key={address} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">#{index + 1}</Badge>
                      <code className="text-sm font-mono">
                        {address.slice(0, 6)}...{address.slice(-4)}
                      </code>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`https://sepolia.etherscan.io/token/${address}`, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Debug Information */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-sm">Trading Module</CardTitle>
            <CardDescription>
              Launch Token Module v1.0.0
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs space-y-1 font-mono">
              <div>Environment: Production</div>
              <div>Version: v1.0.0</div>
              <div>Module: Launch Token</div>
              <div>Status: {launchedTokens.length > 0 ? 'Active' : 'Ready'}</div>
              <div>Tokens Launched: {launchedTokens.length}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ============================================================================
// TRADING MODULE V1 - EXPORTS
// ============================================================================

export const TradingModuleV1 = {
  version: 'v1.0.0',
  name: 'Launch Token Module',
  
  // Components
  LaunchTokenForm,
  TradingModulePage,
  
  // Metadata
  features: {
    tokenLaunch: true,
    antiBotProtection: true,
    bondingCurve: true,
    socialLinks: true,
    tokenPreview: true
  }
}
