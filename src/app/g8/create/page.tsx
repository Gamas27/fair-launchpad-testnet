'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Upload, Image, DollarSign, CheckCircle } from 'lucide-react'
import G8AppLayout from '@/components/g8/G8AppLayout'
import { useG8User } from '@/lib/state/context'

export default function CreatePage() {
  const { user: currentUser, isAuthenticated } = useG8User()

  // Since World ID is mandatory, redirect to onboarding if not authenticated
  if (!isAuthenticated || !currentUser) {
    return (
      <G8AppLayout>
        <div className="p-6 text-center">
          <div className="w-20 h-20 bg-g8-surface2 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-g8-text-secondary text-2xl">🔒</span>
          </div>
          <h1 className="text-g8-h1 text-g8-text-primary font-bold mb-2">World ID Required</h1>
          <p className="text-g8-body text-g8-text-secondary mb-6">
            Please complete World ID verification to create tokens.
          </p>
          <button 
            onClick={() => window.location.href = '/g8/onboarding'}
            className="bg-gradient-g8 text-g8-bg px-6 py-3 rounded-g8-lg font-medium hover:opacity-90 transition-opacity"
          >
            Complete World ID Verification
          </button>
        </div>
      </G8AppLayout>
    )
  }
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    tokenName: '',
    tokenSymbol: '',
    description: '',
    image: null as File | null,
    imagePreview: '',
    twitter: '',
    initialBuyAmount: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCreating, setIsCreating] = useState(false)

  const totalSteps = 5

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      handleInputChange('imagePreview', e.target?.result)
    }
    reader.readAsDataURL(file)
    handleInputChange('image', file)
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (step === 1) {
      if (!formData.tokenName.trim()) {
        newErrors.tokenName = 'Token name is required'
      } else if (formData.tokenName.length < 2) {
        newErrors.tokenName = 'Name must be at least 2 characters'
      } else if (formData.tokenName.length > 24) {
        newErrors.tokenName = 'Name must be 24 characters or fewer'
      }
      
      if (!formData.tokenSymbol.trim()) {
        newErrors.tokenSymbol = 'Token symbol is required'
      } else if (!/^[A-Z]{3,5}$/.test(formData.tokenSymbol)) {
        newErrors.tokenSymbol = 'Symbol should be 3 to 5 uppercase letters'
      }
    }
    
    if (step === 2) {
      if (!formData.description.trim()) {
        newErrors.description = 'Description is required'
      } else if (formData.description.length > 160) {
        newErrors.description = 'Description must be 160 characters or fewer'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCreateToken = async () => {
    if (!validateStep(currentStep)) return
    
    setIsCreating(true)
    try {
      // Simulate token creation
      await new Promise(resolve => setTimeout(resolve, 2000))
      router.push('/g8/dashboard')
    } catch (error) {
      console.error('Token creation failed:', error)
    } finally {
      setIsCreating(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-g8-h1 text-g8-text-primary font-bold">Create Token</h2>
              <p className="text-g8-caption text-g8-text-secondary">Step 1 of 5 — Identity</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-g8-body text-g8-text-primary font-medium mb-2 block">
                  Token name
                </label>
                <input
                  type="text"
                  placeholder="e.g. OMG"
                  value={formData.tokenName}
                  onChange={(e) => handleInputChange('tokenName', e.target.value)}
                  className="w-full bg-g8-surface border border-g8-stroke rounded-g8-md px-4 py-3 text-g8-body text-g8-text-primary placeholder-g8-text-secondary focus:outline-none focus:border-g8-text-primary/50"
                />
                {errors.tokenName && (
                  <p className="text-g8-error text-g8-caption mt-1">{errors.tokenName}</p>
                )}
                <p className="text-g8-caption text-g8-text-secondary mt-1">
                  Keep it short, fun, and memeable (≤ 24 chars).
                </p>
              </div>
              
              <div>
                <label className="text-g8-body text-g8-text-primary font-medium mb-2 block">
                  Symbol
                </label>
                <input
                  type="text"
                  placeholder="e.g. OMG"
                  value={formData.tokenSymbol}
                  onChange={(e) => handleInputChange('tokenSymbol', e.target.value.toUpperCase())}
                  className="w-full bg-g8-surface border border-g8-stroke rounded-g8-md px-4 py-3 text-g8-body text-g8-text-primary placeholder-g8-text-secondary focus:outline-none focus:border-g8-text-primary/50"
                />
                {errors.tokenSymbol && (
                  <p className="text-g8-error text-g8-caption mt-1">{errors.tokenSymbol}</p>
                )}
                <p className="text-g8-caption text-g8-text-secondary mt-1">
                  3–5 uppercase letters work best.
                </p>
              </div>
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-g8-h1 text-g8-text-primary font-bold">Token Description</h2>
              <p className="text-g8-caption text-g8-text-secondary">Step 2 of 5 — Description</p>
            </div>
            
            <div>
              <label className="text-g8-body text-g8-text-primary font-medium mb-2 block">
                Short description
              </label>
              <textarea
                placeholder="Describe your token in 1-2 concise lines..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full bg-g8-surface border border-g8-stroke rounded-g8-md px-4 py-3 text-g8-body text-g8-text-primary placeholder-g8-text-secondary focus:outline-none focus:border-g8-text-primary/50 resize-none"
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description && (
                  <p className="text-g8-error text-g8-caption">{errors.description}</p>
                )}
                <p className="text-g8-caption text-g8-text-secondary ml-auto">
                  {formData.description.length}/160
                </p>
              </div>
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-g8-h1 text-g8-text-primary font-bold">Token Image</h2>
              <p className="text-g8-caption text-g8-text-secondary">Step 3 of 5 — Image</p>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-g8-stroke rounded-g8-lg p-8 text-center relative">
                {formData.imagePreview ? (
                  <div className="space-y-4">
                    <img 
                      src={formData.imagePreview} 
                      alt="Token preview" 
                      className="w-20 h-20 rounded-full mx-auto object-cover"
                    />
                    <p className="text-g8-body text-g8-text-primary">Image uploaded</p>
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.createElement('input')
                        input.type = 'file'
                        input.accept = 'image/*'
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0]
                          if (file) handleImageUpload(file)
                        }
                        input.click()
                      }}
                      className="bg-g8-surface text-g8-text-primary border border-g8-stroke font-medium py-2 px-4 rounded-g8-md hover:border-g8-text-primary/20 transition-all duration-200"
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-g8-text-secondary mx-auto" />
                    <div>
                      <p className="text-g8-body text-g8-text-primary">Click to upload token image</p>
                      <p className="text-g8-caption text-g8-text-secondary">JPG or PNG, max 500 KB. Square 1:1 recommended.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.createElement('input')
                        input.type = 'file'
                        input.accept = 'image/*'
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0]
                          if (file) handleImageUpload(file)
                        }
                        input.click()
                      }}
                      className="bg-gradient-g8 text-g8-bg font-medium py-3 px-6 rounded-g8-lg shadow-g8-glow hover:shadow-g8-m transition-all duration-200"
                    >
                      Choose Image
                    </button>
                  </div>
                )}
              </div>
              
              <div className="bg-g8-surface2 border border-g8-stroke rounded-g8-lg p-4 space-y-3">
                <h4 className="text-g8-body text-g8-text-primary font-medium">Do these:</h4>
                <ul className="text-g8-caption text-g8-text-secondary space-y-1">
                  <li>• Use a simple mascot, icon, or funny sketch.</li>
                  <li>• High contrast, readable at small sizes.</li>
                  <li>• Keep backgrounds clean.</li>
                </ul>
              </div>
            </div>
          </div>
        )
      
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-g8-h1 text-g8-text-primary font-bold">Social Presence</h2>
              <p className="text-g8-caption text-g8-text-secondary">Step 4 of 5 — Social</p>
            </div>
            
            <div>
              <label className="text-g8-body text-g8-text-primary font-medium mb-2 block">
                X (Twitter) username
              </label>
              <input
                type="text"
                placeholder="@username"
                value={formData.twitter}
                onChange={(e) => handleInputChange('twitter', e.target.value)}
                className="w-full bg-g8-surface border border-g8-stroke rounded-g8-md px-4 py-3 text-g8-body text-g8-text-primary placeholder-g8-text-secondary focus:outline-none focus:border-g8-text-primary/50"
              />
              <p className="text-g8-caption text-g8-text-secondary mt-1">
                Add Telegram and website after creation.
              </p>
            </div>
          </div>
        )
      
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-g8-h1 text-g8-text-primary font-bold">Initial Buy (Optional)</h2>
              <p className="text-g8-caption text-g8-text-secondary">Step 5 of 5 — Initial Buy</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-g8-body text-g8-text-primary font-medium mb-2 block">
                  Initial buy amount
                </label>
                <input
                  type="number"
                  placeholder="0.0"
                  value={formData.initialBuyAmount}
                  onChange={(e) => handleInputChange('initialBuyAmount', e.target.value)}
                  className="w-full bg-g8-surface border border-g8-stroke rounded-g8-md px-4 py-3 text-g8-body text-g8-text-primary placeholder-g8-text-secondary focus:outline-none focus:border-g8-text-primary/50"
                />
                <p className="text-g8-caption text-g8-text-secondary mt-1">
                  Balance: 0.0 WLD
                </p>
              </div>
              
              <div className="bg-g8-surface2 border border-g8-stroke rounded-g8-lg p-4">
                <h4 className="text-g8-body text-g8-text-primary font-medium mb-2">What is Initial Buy?</h4>
                <p className="text-g8-caption text-g8-text-secondary">
                  Purchase your own tokens before launch to create initial liquidity and set a starting price. The amount is deducted during creation.
                </p>
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <G8AppLayout>
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="text-g8-text-secondary hover:text-g8-text-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="text-center">
            <h1 className="text-g8-h1 text-g8-text-primary font-bold">Create Token</h1>
            <p className="text-g8-caption text-g8-text-secondary">Step {currentStep} of {totalSteps}</p>
          </div>
          <div className="w-5" />
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-g8-surface2 rounded-full h-2">
          <div 
            className="bg-gradient-g8 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="bg-g8-surface border border-g8-stroke rounded-g8-lg p-6">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex space-x-3">
          {currentStep > 1 && (
            <button 
              onClick={prevStep}
              className="flex-1 bg-g8-surface text-g8-text-primary border border-g8-stroke font-medium py-3 px-6 rounded-g8-lg hover:border-g8-text-primary/20 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          )}
          
          <button 
            onClick={currentStep === totalSteps ? handleCreateToken : nextStep}
            disabled={isCreating}
            className="flex-1 bg-gradient-g8 text-g8-bg font-medium py-3 px-6 rounded-g8-lg shadow-g8-glow hover:shadow-g8-m transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isCreating ? (
              <>
                <div className="w-4 h-4 border-2 border-g8-bg border-t-transparent rounded-full animate-spin" />
                <span>Creating...</span>
              </>
            ) : currentStep === totalSteps ? (
              <>
                <CheckCircle className="h-4 w-4" />
                <span>Launch Token</span>
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {/* Disclaimer */}
        <div className="bg-g8-surface2 border border-g8-stroke rounded-g8-lg p-4">
          <div className="flex items-start space-x-3">
            <span className="text-g8-warning text-lg">⚠️</span>
            <div>
              <h4 className="text-g8-body text-g8-text-primary font-medium mb-1">First token creation free!</h4>
              <p className="text-g8-caption text-g8-text-secondary">
                Welcome to [G8]. Your first token creation is free. Trading can be volatile—read the Terms & Guidelines before proceeding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </G8AppLayout>
  )
}
