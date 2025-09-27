'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  ArrowRight,
  Upload,
  Image,
  DollarSign,
  Shield,
  Zap,
  CheckCircle,
  Copy,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'

// World App Create Coin Module
export function CreateCoinModuleWorldApp() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    tokenName: '',
    tokenSymbol: '',
    description: '',
    website: '',
    twitter: '',
    telegram: '',
    
    // Step 2: Logo & Branding
    logoPreview: '',
    primaryColor: '#8b5cf6',
    secondaryColor: '#22d3ee',
    
    // Step 3: Token Economics
    totalSupply: '',
    initialPrice: '',
    liquidityPercentage: 85,
    creatorPercentage: 5,
    appPercentage: 10,
    
    // Step 4: Launch Parameters
    repGating: false,
    minRepRequired: 0,
    antiBot: true,
    bondingCurve: true,
    
    // Step 5: Review
    termsAccepted: false,
    privacyAccepted: false
  })
  const [isCreating, setIsCreating] = useState(false)
  const [createdToken, setCreatedToken] = useState<any>(null)

  const totalSteps = 5

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCreateToken = async () => {
    setIsCreating(true)
    try {
      // Simulate token creation
      await new Promise(resolve => setTimeout(resolve, 3000))
      setCreatedToken({
        address: '0x' + Math.random().toString(16).slice(2, 42),
        name: formData.tokenName,
        symbol: formData.tokenSymbol,
        createdAt: new Date().toISOString()
      })
    } finally {
      setIsCreating(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Token Name</label>
                  <input
                    type="text"
                    value={formData.tokenName}
                    onChange={(e) => handleInputChange('tokenName', e.target.value)}
                    placeholder="e.g., My Awesome Token"
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Token Symbol</label>
                  <input
                    type="text"
                    value={formData.tokenSymbol}
                    onChange={(e) => handleInputChange('tokenSymbol', e.target.value.toUpperCase())}
                    placeholder="e.g., MAT"
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your token and its purpose..."
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Twitter</label>
                    <input
                      type="text"
                      value={formData.twitter}
                      onChange={(e) => handleInputChange('twitter', e.target.value)}
                      placeholder="@username"
                      className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Telegram</label>
                    <input
                      type="text"
                      value={formData.telegram}
                      onChange={(e) => handleInputChange('telegram', e.target.value)}
                      placeholder="t.me/..."
                      className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Logo & Branding</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Token Logo</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-2xl border-2 border-gray-800/50">
                      {formData.logoPreview ? (
                        <img src={formData.logoPreview} alt="Logo preview" className="w-full h-full rounded-lg object-cover" />
                      ) : (
                        <Upload className="h-8 w-8 text-white" />
                      )}
                    </div>
                    <div>
                      <Button className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logo
                      </Button>
                      <p className="text-xs text-gray-400 mt-1">Recommended: 512x512px</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={formData.primaryColor}
                        onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                        className="w-12 h-10 rounded border border-gray-800/50 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.primaryColor}
                        onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                        className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={formData.secondaryColor}
                        onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                        className="w-12 h-10 rounded border border-gray-800/50 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.secondaryColor}
                        onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
                        className="flex-1 px-3 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Token Economics</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Total Supply</label>
                    <input
                      type="number"
                      value={formData.totalSupply}
                      onChange={(e) => handleInputChange('totalSupply', e.target.value)}
                      placeholder="1000000000"
                      className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Initial Price (SOL)</label>
                    <input
                      type="number"
                      step="0.000001"
                      value={formData.initialPrice}
                      onChange={(e) => handleInputChange('initialPrice', e.target.value)}
                      placeholder="0.000001"
                      className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-md font-semibold text-white">Distribution</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Liquidity Pool</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="70"
                          max="90"
                          value={formData.liquidityPercentage}
                          onChange={(e) => handleInputChange('liquidityPercentage', parseInt(e.target.value))}
                          className="w-24"
                        />
                        <span className="text-white font-bold w-8">{formData.liquidityPercentage}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Creator</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="3"
                          max="10"
                          value={formData.creatorPercentage}
                          onChange={(e) => handleInputChange('creatorPercentage', parseInt(e.target.value))}
                          className="w-24"
                        />
                        <span className="text-white font-bold w-8">{formData.creatorPercentage}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">App Fee</span>
                      <span className="text-white font-bold">{formData.appPercentage}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Launch Parameters</h3>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-md font-semibold text-white">REP Gating</h4>
                      <p className="text-sm text-gray-400">Require minimum REP score to participate</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.repGating}
                        onChange={(e) => handleInputChange('repGating', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {formData.repGating && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Minimum REP Required</label>
                      <input
                        type="number"
                        value={formData.minRepRequired}
                        onChange={(e) => handleInputChange('minRepRequired', parseInt(e.target.value))}
                        placeholder="100"
                        className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-md font-semibold text-white">Anti-Bot Protection</h4>
                      <p className="text-sm text-gray-400">Enable advanced bot detection</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.antiBot}
                        onChange={(e) => handleInputChange('antiBot', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-md font-semibold text-white">Bonding Curve</h4>
                      <p className="text-sm text-gray-400">Enable price discovery mechanism</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.bondingCurve}
                        onChange={(e) => handleInputChange('bondingCurve', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Review & Launch</h3>
              <div className="space-y-4">
                <Card className="card-gradient border-2 border-pink-400/50">
                  <CardHeader>
                    <CardTitle className="text-white">Token Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name</span>
                      <span className="text-white font-bold">{formData.tokenName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Symbol</span>
                      <span className="text-white font-bold">{formData.tokenSymbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Supply</span>
                      <span className="text-white font-bold">{formData.totalSupply}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Initial Price</span>
                      <span className="text-white font-bold">{formData.initialPrice} SOL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Liquidity</span>
                      <span className="text-white font-bold">{formData.liquidityPercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Creator</span>
                      <span className="text-white font-bold">{formData.creatorPercentage}%</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                      className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-300">
                      I agree to the <a href="#" className="text-cyan-400 hover:underline">Terms of Service</a>
                    </span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.privacyAccepted}
                      onChange={(e) => handleInputChange('privacyAccepted', e.target.checked)}
                      className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-300">
                      I agree to the <a href="#" className="text-cyan-400 hover:underline">Privacy Policy</a>
                    </span>
                  </label>
                </div>

                {createdToken ? (
                  <Card className="card-gradient border-2 border-green-400/50">
                    <CardContent className="p-4 text-center">
                      <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-white mb-2">Token Created Successfully!</h3>
                      <p className="text-sm text-gray-400 mb-4">Your token has been deployed to the blockchain</p>
                      <div className="bg-gray-900/50 rounded-lg p-3 mb-4">
                        <div className="text-xs text-gray-400 mb-1">Token Address</div>
                        <div className="text-sm font-mono text-white break-all">{createdToken.address}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Address
                        </Button>
                        <Button className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View on Explorer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Button
                    onClick={handleCreateToken}
                    disabled={!formData.termsAccepted || !formData.privacyAccepted || isCreating}
                    className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold py-3"
                  >
                    {isCreating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Token...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-2" />
                        Launch Token
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-md border-b border-gray-800/50">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-white">Create Token</h1>
              <p className="text-sm text-gray-400">Step {currentStep} of {totalSteps}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-400">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="card-gradient border-2 border-pink-400/50">
          <CardContent className="p-6">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        {!createdToken && (
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="border-gray-600 text-gray-400 hover:bg-gray-800/50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={nextStep}
              disabled={currentStep === totalSteps}
              className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export const CreateCoinModuleWorldAppExport = {
  version: 'v1.0.0',
  CreateCoinModule: CreateCoinModuleWorldApp
}
