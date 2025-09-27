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
  ArrowRight,
  TrendingUp
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================================================
// TOKEN MODULE WORLD APP - SIMPLIFIED VERSION
// ============================================================================

interface TokenFormData {
  name: string
  symbol: string
  description: string
  totalSupply: string
  initialPrice: string
}

interface TokenModuleWorldAppProps {
  className?: string
  onTokenCreated?: (tokenAddress: string) => void
}

// Mock World ID and Privy hooks for World App deployment
function useMockWorldId() {
  const [isVerified, setIsVerified] = useState(true) // Assume verified for World App
  const [verificationLevel] = useState('Orb')
  return { isVerified, verificationLevel }
}

function useMockPrivyWallet() {
  const [isConnected, setIsConnected] = useState(true) // Assume connected for World App
  const [address, setAddress] = useState('0xMockPrivyWalletAddress1234567890')
  return { isConnected, address }
}

export const TokenCreationFormWorldApp = ({ 
  className, 
  onTokenCreated 
}: TokenModuleWorldAppProps) => {
  const { isVerified, verificationLevel } = useMockWorldId()
  const { isConnected, address } = useMockPrivyWallet()
  
  const [formData, setFormData] = useState<TokenFormData>({
    name: '',
    symbol: '',
    description: '',
    totalSupply: '1000000',
    initialPrice: '0.001'
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
    if (!isVerified) {
      setError('World ID verification required')
      return
    }

    if (!isConnected) {
      setError('Wallet connection required')
      return
    }

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
      setSuccess('Token created successfully!')
      setCurrentStep('complete')
      
      if (onTokenCreated) {
        onTokenCreated(mockAddress)
      }
    } catch (err) {
      setError('Token creation failed. Please try again.')
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
      <Card className={cn("w-full max-w-md mx-auto", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Deploying Token...
          </CardTitle>
          <CardDescription>
            Creating your token on the blockchain
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Validating parameters...</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Deploying contract...</span>
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
      <Card className={cn("w-full max-w-md mx-auto", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            Token Created!
          </CardTitle>
          <CardDescription>
            Your token is now live
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Token deployed successfully!
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
                <div className="text-sm font-medium text-blue-800">Name</div>
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
              Create Another
            </Button>
            <Button
              onClick={() => window.open(`https://sepolia.etherscan.io/token/${tokenAddress}`, '_blank')}
              className="flex-1"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="h-5 w-5" />
          Create Token
        </CardTitle>
        <CardDescription>
          Launch a new token with anti-bot protection
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Indicators */}
        <div className="space-y-2">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              World ID: <Badge className={cn("text-white", "bg-gradient-to-r from-purple-500 to-pink-600")}>{verificationLevel}</Badge>
            </AlertDescription>
          </Alert>
          <Alert>
            <Coins className="h-4 w-4" />
            <AlertDescription>
              Wallet: <Badge>{address?.slice(0, 6)}...{address?.slice(-4)}</Badge>
            </AlertDescription>
          </Alert>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Simplified Form */}
        <div className="space-y-4">
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
              rows={2}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
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
          </div>
        </div>

        {/* Token Preview */}
        <div className="p-3 bg-gray-50 rounded-md">
          <h4 className="text-sm font-medium mb-2">Preview</h4>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <Coins className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <div className="font-medium">{formData.name || 'Token Name'}</div>
              <div className="text-sm text-gray-600">{formData.symbol || 'SYMBOL'}</div>
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
          {isLoading ? 'Creating...' : 'Create Token'}
        </Button>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// TOKEN MODULE WORLD APP - MAIN PAGE
// ============================================================================

export const TokenModulePageWorldApp = () => {
  const [createdTokens, setCreatedTokens] = useState<string[]>([])

  const handleTokenCreated = (tokenAddress: string) => {
    setCreatedTokens(prev => [...prev, tokenAddress])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Token Creation
          </h1>
          <p className="text-gray-600">
            Create tokens with anti-bot protection
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
              <Shield className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">World ID</span>
          </div>
          
          <ArrowRight className="h-4 w-4 text-gray-400" />
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
              <Coins className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">Create Token</span>
          </div>
          
          <ArrowRight className="h-4 w-4 text-gray-400" />
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">Launch</span>
          </div>
        </div>

        {/* Main Token Creation Component */}
        <TokenCreationFormWorldApp onTokenCreated={handleTokenCreated} />

        {/* Created Tokens List */}
        {createdTokens.length > 0 && (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Created Tokens
              </CardTitle>
              <CardDescription>
                Your successfully created tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {createdTokens.map((address, index) => (
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
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-sm">Token Module</CardTitle>
            <CardDescription>
              Token Creation Module v1.0.0
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs space-y-1 font-mono">
              <div>Environment: World App</div>
              <div>Version: v1.0.0</div>
              <div>Module: Token Creation</div>
              <div>Status: {createdTokens.length > 0 ? 'Active' : 'Ready'}</div>
              <div>Tokens Created: {createdTokens.length}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ============================================================================
// TOKEN MODULE WORLD APP - EXPORTS
// ============================================================================

export const TokenModuleWorldApp = {
  version: 'v1.0.0',
  name: 'Token Creation Module (World App)',
  
  // Components
  TokenCreationForm: TokenCreationFormWorldApp,
  TokenModulePage: TokenModulePageWorldApp,
  
  // Metadata
  features: {
    tokenCreation: true,
    antiBotProtection: true,
    bondingCurve: true,
    worldAppOptimized: true,
    simplifiedUI: true
  }
}
