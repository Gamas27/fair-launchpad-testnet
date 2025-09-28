'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Image as ImageIcon,
  Link,
  Coins,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Info,
  ExternalLink,
  Copy,
  Share2,
  Eye
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TokenCreationFlowProps {
  onComplete: (tokenData: any) => void
  onBack: () => void
  className?: string
}

type CreationStep = 
  | 'before-create' 
  | 'create-mint' 
  | 'token-identity' 
  | 'token-image' 
  | 'social-presence' 
  | 'initial-buy' 
  | 'success'

export const TokenCreationFlow = ({ onComplete, onBack, className }: TokenCreationFlowProps) => {
  const [currentStep, setCurrentStep] = useState<CreationStep>('before-create')
  const [formData, setFormData] = useState({
    tokenName: '',
    tokenSymbol: '',
    totalSupply: '',
    decimals: '18',
    description: '',
    image: null as File | null,
    website: '',
    twitter: '',
    telegram: '',
    discord: '',
    initialBuyAmount: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const steps = [
    { id: 'before-create', title: 'Before You Create', progress: 14 },
    { id: 'create-mint', title: 'Create & Mint', progress: 28 },
    { id: 'token-identity', title: 'Token Identity', progress: 42 },
    { id: 'token-image', title: 'Token Image', progress: 56 },
    { id: 'social-presence', title: 'Social Presence', progress: 70 },
    { id: 'initial-buy', title: 'Initial Buy Amount', progress: 84 },
    { id: 'success', title: 'Success', progress: 100 }
  ]

  const currentStepIndex = steps.findIndex(step => step.id === currentStep)
  const currentStepData = steps[currentStepIndex]

  const validateStep = (step: CreationStep): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 'create-mint':
        if (!formData.tokenName.trim()) newErrors.tokenName = 'Token name is required'
        if (!formData.tokenSymbol.trim()) newErrors.tokenSymbol = 'Token symbol is required'
        if (!formData.totalSupply.trim()) newErrors.totalSupply = 'Total supply is required'
        if (!formData.decimals.trim()) newErrors.decimals = 'Decimals is required'
        break
      case 'token-identity':
        if (!formData.tokenName.trim()) newErrors.tokenName = 'Token name is required'
        if (!formData.tokenSymbol.trim()) newErrors.tokenSymbol = 'Token symbol is required'
        break
      case 'token-image':
        if (!formData.image) newErrors.image = 'Token image is required'
        break
      case 'social-presence':
        // Social links are optional
        break
      case 'initial-buy':
        if (!formData.initialBuyAmount.trim()) newErrors.initialBuyAmount = 'Initial buy amount is required'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      const nextIndex = currentStepIndex + 1
      if (nextIndex < steps.length) {
        setCurrentStep(steps[nextIndex].id as CreationStep)
      }
    }
  }

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id as CreationStep)
    } else {
      onBack()
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      // Simulate token creation
      await new Promise(resolve => setTimeout(resolve, 2000))
      onComplete(formData)
    } catch (error) {
      console.error('Token creation failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
    }
  }

  // Before You Create Screen
  if (currentStep === 'before-create') {
    return (
      <div className={cn("min-h-screen bg-black text-white flex items-center justify-center p-4", className)}>
        <Card className="w-full max-w-md card-gradient border-2 border-pink-400/50">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-white">Before You Create</CardTitle>
            <CardDescription className="text-gray-300">
              Important information about token creation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div className="text-sm text-gray-300">
                    <div className="font-medium text-blue-300 mb-2">What you need to know:</div>
                    <ul className="space-y-1 text-xs">
                      <li>• Token creation requires World ID verification</li>
                      <li>• You'll need to provide token details and image</li>
                      <li>• Social links help with community building</li>
                      <li>• Initial buy amount affects token distribution</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-300">Requirements:</div>
                <div className="space-y-1 text-xs text-gray-400">
                  <div>✅ World ID verification</div>
                  <div>✅ Token name and symbol</div>
                  <div>✅ Token image (PNG/JPG)</div>
                  <div>✅ Initial buy amount</div>
                </div>
              </div>
            </div>

            <Button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3"
            >
              Next
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Create & Mint Screen
  if (currentStep === 'create-mint') {
    return (
      <div className={cn("min-h-screen bg-black text-white flex items-center justify-center p-4", className)}>
        <Card className="w-full max-w-md card-gradient border-2 border-pink-400/50">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-white">Create & Mint</CardTitle>
            <CardDescription className="text-gray-300">
              Configure your token's basic parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="tokenName" className="text-sm font-medium text-gray-300">
                  Token Name
                </Label>
                <Input
                  id="tokenName"
                  value={formData.tokenName}
                  onChange={(e) => setFormData(prev => ({ ...prev, tokenName: e.target.value }))}
                  placeholder="e.g., My Awesome Token"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
                {errors.tokenName && (
                  <p className="text-red-400 text-xs mt-1">{errors.tokenName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="tokenSymbol" className="text-sm font-medium text-gray-300">
                  Token Symbol
                </Label>
                <Input
                  id="tokenSymbol"
                  value={formData.tokenSymbol}
                  onChange={(e) => setFormData(prev => ({ ...prev, tokenSymbol: e.target.value.toUpperCase() }))}
                  placeholder="e.g., MAT"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
                {errors.tokenSymbol && (
                  <p className="text-red-400 text-xs mt-1">{errors.tokenSymbol}</p>
                )}
              </div>

              <div>
                <Label htmlFor="totalSupply" className="text-sm font-medium text-gray-300">
                  Total Supply
                </Label>
                <Input
                  id="totalSupply"
                  type="number"
                  value={formData.totalSupply}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalSupply: e.target.value }))}
                  placeholder="1000000"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
                {errors.totalSupply && (
                  <p className="text-red-400 text-xs mt-1">{errors.totalSupply}</p>
                )}
              </div>

              <div>
                <Label htmlFor="decimals" className="text-sm font-medium text-gray-300">
                  Decimals
                </Label>
                <Input
                  id="decimals"
                  type="number"
                  value={formData.decimals}
                  onChange={(e) => setFormData(prev => ({ ...prev, decimals: e.target.value }))}
                  placeholder="18"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
                {errors.decimals && (
                  <p className="text-red-400 text-xs mt-1">{errors.decimals}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Token Identity Screen
  if (currentStep === 'token-identity') {
    return (
      <div className={cn("min-h-screen bg-black text-white flex items-center justify-center p-4", className)}>
        <Card className="w-full max-w-md card-gradient border-2 border-pink-400/50">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-white">Token Identity</CardTitle>
            <CardDescription className="text-gray-300">
              Confirm your token's name and symbol
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="tokenName" className="text-sm font-medium text-gray-300">
                  Token Name
                </Label>
                <Input
                  id="tokenName"
                  value={formData.tokenName}
                  onChange={(e) => setFormData(prev => ({ ...prev, tokenName: e.target.value }))}
                  placeholder="e.g., My Awesome Token"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
                {errors.tokenName && (
                  <p className="text-red-400 text-xs mt-1">{errors.tokenName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="tokenSymbol" className="text-sm font-medium text-gray-300">
                  Token Symbol
                </Label>
                <Input
                  id="tokenSymbol"
                  value={formData.tokenSymbol}
                  onChange={(e) => setFormData(prev => ({ ...prev, tokenSymbol: e.target.value.toUpperCase() }))}
                  placeholder="e.g., MAT"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
                {errors.tokenSymbol && (
                  <p className="text-red-400 text-xs mt-1">{errors.tokenSymbol}</p>
                )}
              </div>

              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-sm text-gray-300 mb-2">Preview:</div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <Coins className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{formData.tokenName || 'Token Name'}</div>
                    <div className="text-sm text-gray-400">{formData.tokenSymbol || 'SYMBOL'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Token Image Screen
  if (currentStep === 'token-image') {
    return (
      <div className={cn("min-h-screen bg-black text-white flex items-center justify-center p-4", className)}>
        <Card className="w-full max-w-md card-gradient border-2 border-pink-400/50">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-white">Token Image</CardTitle>
            <CardDescription className="text-gray-300">
              Upload your token's image
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {formData.image ? (
                    <div className="space-y-2">
                      <ImageIcon className="h-12 w-12 text-green-400 mx-auto" />
                      <div className="text-sm text-green-400">{formData.image.name}</div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                      <div className="text-sm text-gray-300">Upload Token Image</div>
                      <div className="text-xs text-gray-400">PNG, JPG up to 2MB</div>
                    </div>
                  )}
                </label>
              </div>

              {errors.image && (
                <p className="text-red-400 text-xs text-center">{errors.image}</p>
              )}

              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-sm text-gray-300 mb-2">Requirements:</div>
                <div className="space-y-1 text-xs text-gray-400">
                  <div>• Square image recommended (512x512px)</div>
                  <div>• PNG or JPG format</div>
                  <div>• Maximum 2MB file size</div>
                  <div>• High quality and clear</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Social Presence Screen
  if (currentStep === 'social-presence') {
    return (
      <div className={cn("min-h-screen bg-black text-white flex items-center justify-center p-4", className)}>
        <Card className="w-full max-w-md card-gradient border-2 border-pink-400/50">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-white">Social Presence</CardTitle>
            <CardDescription className="text-gray-300">
              Add your social links (optional)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="website" className="text-sm font-medium text-gray-300">
                  Website
                </Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://yourwebsite.com"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="twitter" className="text-sm font-medium text-gray-300">
                  Twitter
                </Label>
                <Input
                  id="twitter"
                  value={formData.twitter}
                  onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                  placeholder="@yourusername"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="telegram" className="text-sm font-medium text-gray-300">
                  Telegram
                </Label>
                <Input
                  id="telegram"
                  value={formData.telegram}
                  onChange={(e) => setFormData(prev => ({ ...prev, telegram: e.target.value }))}
                  placeholder="https://t.me/yourgroup"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="discord" className="text-sm font-medium text-gray-300">
                  Discord
                </Label>
                <Input
                  id="discord"
                  value={formData.discord}
                  onChange={(e) => setFormData(prev => ({ ...prev, discord: e.target.value }))}
                  placeholder="https://discord.gg/yourinvite"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
              </div>

              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-sm text-gray-300 mb-2">Benefits:</div>
                <div className="space-y-1 text-xs text-gray-400">
                  <div>• Build community around your token</div>
                  <div>• Increase visibility and trust</div>
                  <div>• Provide updates and announcements</div>
                  <div>• Connect with potential investors</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Initial Buy Amount Screen
  if (currentStep === 'initial-buy') {
    return (
      <div className={cn("min-h-screen bg-black text-white flex items-center justify-center p-4", className)}>
        <Card className="w-full max-w-md card-gradient border-2 border-pink-400/50">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-white">Initial Buy Amount</CardTitle>
            <CardDescription className="text-gray-300">
              Set your initial token purchase amount
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="initialBuyAmount" className="text-sm font-medium text-gray-300">
                  Initial Buy Amount (ETH)
                </Label>
                <Input
                  id="initialBuyAmount"
                  type="number"
                  step="0.001"
                  value={formData.initialBuyAmount}
                  onChange={(e) => setFormData(prev => ({ ...prev, initialBuyAmount: e.target.value }))}
                  placeholder="0.1"
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
                {errors.initialBuyAmount && (
                  <p className="text-red-400 text-xs mt-1">{errors.initialBuyAmount}</p>
                )}
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div className="text-sm text-gray-300">
                    <div className="font-medium text-blue-300 mb-2">What is a bonding curve?</div>
                    <div className="text-xs space-y-1">
                      <div>A bonding curve is a mathematical relationship between price and supply.</div>
                      <div>• Higher initial buy = higher starting price</div>
                      <div>• Creates liquidity for your token</div>
                      <div>• Enables immediate trading</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-sm text-gray-300 mb-2">Recommendations:</div>
                <div className="space-y-1 text-xs text-gray-400">
                  <div>• Start with 0.1-1 ETH for testing</div>
                  <div>• Higher amounts create more liquidity</div>
                  <div>• Consider your budget and goals</div>
                  <div>• You can always buy more later</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Coins className="h-4 w-4 mr-2" />
                    Create Token
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Success Screen
  if (currentStep === 'success') {
    return (
      <div className={cn("min-h-screen bg-black text-white flex items-center justify-center p-4", className)}>
        <Card className="w-full max-w-md card-gradient border-2 border-green-400/50">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-green-400 text-xl">
              <CheckCircle className="h-6 w-6" />
              G8 Your Mint & Sell
            </CardTitle>
            <CardDescription className="text-gray-300">
              Your token has been successfully created
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              
              <div className="space-y-2">
                <div className="text-lg font-semibold text-white">{formData.tokenName}</div>
                <div className="text-sm text-gray-400">{formData.tokenSymbol}</div>
                <div className="text-xs text-gray-500">
                  Contract: 0x{Math.random().toString(16).substr(2, 8)}...{Math.random().toString(16).substr(2, 4)}
                </div>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 space-y-2">
              <div className="text-sm text-green-300 font-medium">Token Details:</div>
              <div className="text-xs text-gray-300 space-y-1">
                <div>• Total Supply: {formData.totalSupply} {formData.tokenSymbol}</div>
                <div>• Decimals: {formData.decimals}</div>
                <div>• Initial Buy: {formData.initialBuyAmount} ETH</div>
                <div>• Status: Live and trading</div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => {/* Navigate to token details */}}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold"
              >
                <Eye className="h-5 w-5 mr-2" />
                View Token
              </Button>

              <Button
                onClick={() => {/* Share functionality */}}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
