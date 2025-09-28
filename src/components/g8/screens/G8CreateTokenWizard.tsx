'use client'

import React, { useState } from 'react'
import { G8Column, G8Row } from '@/components/ui/g8-layout'
import { G8Card } from '@/components/ui/g8-card'
import { G8Button } from '@/components/ui/g8-button'
import { G8Input } from '@/components/ui/g8-input'
import { G8FormField } from '@/components/ui/g8-form-field'
import { G8FileUpload } from '@/components/ui/g8-file-upload'
import { G8Badge } from '@/components/ui/g8-badge'
import { 
  ArrowLeft, 
  ArrowRight,
  Coins,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Link,
  Users,
  Eye
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createTokenValidator, useFormValidation, type TokenCreationData } from '@/lib/validation'

interface G8CreateTokenWizardProps {
  step?: number
  onBack?: () => void
  onNext?: (data: any) => void
  className?: string
}

export const G8CreateTokenWizard = ({ 
  step = 1,
  onBack,
  onNext,
  className 
}: G8CreateTokenWizardProps) => {
  const [formData, setFormData] = useState<TokenCreationData>({
    tokenName: '',
    symbol: '',
    description: '',
    totalSupply: '',
    initialPrice: '',
    website: '',
    twitter: '',
    telegram: '',
    logo: []
  })

  const validator = createTokenValidator()
  const { errors, isValid, validateField, validateForm } = useFormValidation(validator)

  const steps = [
    { key: 'identity', label: 'Identity', description: 'Basic token information', icon: Coins },
    { key: 'economics', label: 'Economics', description: 'Tokenomics and pricing', icon: DollarSign },
    { key: 'metadata', label: 'Metadata', description: 'Description and links', icon: Link },
    { key: 'review', label: 'Review', description: 'Final review and launch', icon: Eye },
    { key: 'launch', label: 'Launch', description: 'Deploy your token', icon: Users }
  ]

  const currentStepData = steps[step - 1]

  const handleNext = () => {
    const result = validateForm(formData)
    if (result.isValid) {
      onNext?.(formData)
    }
  }

  const handleInputChange = (field: keyof TokenCreationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    validateField(field, value)
  }

  const handleFileChange = (files: File[]) => {
    setFormData(prev => ({ ...prev, logo: files }))
  }

  const renderStepContent = () => {
    switch (step) {
      case 1: // Identity
        return (
          <G8Column gap="md">
            <G8FormField
              label="Token name"
              placeholder="e.g. OMG"
              value={formData.tokenName}
              onChange={(value) => handleInputChange('tokenName', value)}
              error={errors.tokenName}
              help="Choose a memorable name for your token"
              required
            />
            
            <G8FormField
              label="Symbol"
              placeholder="e.g. OMG"
              value={formData.symbol}
              onChange={(value) => handleInputChange('symbol', value)}
              error={errors.symbol}
              help="Short ticker symbol (2-10 characters, uppercase)"
              required
            />

            <G8FileUpload
              label="Token Logo"
              accept="image/*"
              maxSize={2}
              value={formData.logo}
              onChange={handleFileChange}
              help="Upload a logo for your token (optional, max 2MB)"
            />
          </G8Column>
        )

      case 2: // Economics
        return (
          <G8Column gap="md">
            <G8FormField
              label="Total Supply"
              placeholder="e.g. 1000000"
              value={formData.totalSupply}
              onChange={(value) => handleInputChange('totalSupply', value)}
              error={errors.totalSupply}
              help="Total number of tokens to create"
              required
            />
            
            <G8FormField
              label="Initial Price (WLD)"
              placeholder="e.g. 0.001"
              value={formData.initialPrice}
              onChange={(value) => handleInputChange('initialPrice', value)}
              error={errors.initialPrice}
              help="Starting price per token in WLD"
              required
            />

            <G8Card variant="default" size="sm">
              <G8Column gap="sm">
                <h4 className="text-g8-body font-semibold text-g8-text-primary">
                  Tokenomics Preview
                </h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-g8-caption">
                    <span className="text-g8-text-secondary">Market Cap:</span>
                    <span className="text-g8-text-primary">
                      {formData.totalSupply && formData.initialPrice 
                        ? `${(parseFloat(formData.totalSupply) * parseFloat(formData.initialPrice)).toLocaleString()} WLD`
                        : '0 WLD'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between text-g8-caption">
                    <span className="text-g8-text-secondary">Tokens:</span>
                    <span className="text-g8-text-primary">
                      {formData.totalSupply ? parseFloat(formData.totalSupply).toLocaleString() : '0'}
                    </span>
                  </div>
                </div>
              </G8Column>
            </G8Card>
          </G8Column>
        )

      case 3: // Metadata
        return (
          <G8Column gap="md">
            <G8FormField
              label="Description"
              placeholder="Describe your token..."
              value={formData.description}
              onChange={(value) => handleInputChange('description', value)}
              error={errors.description}
              help="Tell the community about your token"
              multiline
              rows={4}
            />

            <G8FormField
              label="Website"
              placeholder="https://example.com"
              value={formData.website}
              onChange={(value) => handleInputChange('website', value)}
              error={errors.website}
              help="Your project website (optional)"
            />

            <G8FormField
              label="Twitter"
              placeholder="@username"
              value={formData.twitter}
              onChange={(value) => handleInputChange('twitter', value)}
              error={errors.twitter}
              help="Your Twitter handle (optional)"
            />

            <G8FormField
              label="Telegram"
              placeholder="@username"
              value={formData.telegram}
              onChange={(value) => handleInputChange('telegram', value)}
              error={errors.telegram}
              help="Your Telegram handle (optional)"
            />
          </G8Column>
        )

      case 4: // Review
        return (
          <G8Column gap="md">
            <G8Card variant="gradient" size="lg">
              <G8Column gap="md">
                <div className="flex items-center gap-g8-sm">
                  <Coins className="h-6 w-6 text-g8-text-primary" />
                  <h3 className="text-g8-h2 font-semibold text-g8-text-primary">
                    Review Your Token
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-g8-md">
                  <div>
                    <p className="text-g8-caption text-g8-text-secondary">Name</p>
                    <p className="text-g8-body font-semibold text-g8-text-primary">
                      {formData.tokenName || 'Not set'}
                    </p>
                  </div>
                  <div>
                    <p className="text-g8-caption text-g8-text-secondary">Symbol</p>
                    <p className="text-g8-body font-semibold text-g8-text-primary">
                      {formData.symbol || 'Not set'}
                    </p>
                  </div>
                  <div>
                    <p className="text-g8-caption text-g8-text-secondary">Total Supply</p>
                    <p className="text-g8-body font-semibold text-g8-text-primary">
                      {formData.totalSupply ? parseFloat(formData.totalSupply).toLocaleString() : 'Not set'}
                    </p>
                  </div>
                  <div>
                    <p className="text-g8-caption text-g8-text-secondary">Initial Price</p>
                    <p className="text-g8-body font-semibold text-g8-text-primary">
                      {formData.initialPrice ? `${formData.initialPrice} WLD` : 'Not set'}
                    </p>
                  </div>
                </div>

                {formData.description && (
                  <div>
                    <p className="text-g8-caption text-g8-text-secondary mb-g8-xs">Description</p>
                    <p className="text-g8-body text-g8-text-primary">
                      {formData.description}
                    </p>
                  </div>
                )}

                {(formData.website || formData.twitter || formData.telegram) && (
                  <div>
                    <p className="text-g8-caption text-g8-text-secondary mb-g8-xs">Links</p>
                    <div className="flex flex-wrap gap-g8-sm">
                      {formData.website && (
                        <G8Badge variant="outline" size="sm">
                          Website
                        </G8Badge>
                      )}
                      {formData.twitter && (
                        <G8Badge variant="outline" size="sm">
                          Twitter
                        </G8Badge>
                      )}
                      {formData.telegram && (
                        <G8Badge variant="outline" size="sm">
                          Telegram
                        </G8Badge>
                      )}
                    </div>
                  </div>
                )}
              </G8Column>
            </G8Card>
          </G8Column>
        )

      case 5: // Launch
        return (
          <G8Column gap="md">
            <G8Card variant="success" size="lg">
              <G8Column gap="md" align="center">
                <CheckCircle className="h-12 w-12 text-g8-success" />
                <h3 className="text-g8-h2 font-semibold text-g8-text-primary text-center">
                  Ready to Launch!
                </h3>
                <p className="text-g8-body text-g8-text-secondary text-center">
                  Your token is ready to be deployed to the blockchain. 
                  This action cannot be undone.
                </p>
              </G8Column>
            </G8Card>

            <G8Card variant="default" size="md">
              <G8Column gap="sm">
                <h4 className="text-g8-body font-semibold text-g8-text-primary">
                  Launch Summary
                </h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-g8-caption">
                    <span className="text-g8-text-secondary">Token:</span>
                    <span className="text-g8-text-primary">{formData.tokenName} ({formData.symbol})</span>
                  </div>
                  <div className="flex justify-between text-g8-caption">
                    <span className="text-g8-text-secondary">Supply:</span>
                    <span className="text-g8-text-primary">{formData.totalSupply} tokens</span>
                  </div>
                  <div className="flex justify-between text-g8-caption">
                    <span className="text-g8-text-secondary">Price:</span>
                    <span className="text-g8-text-primary">{formData.initialPrice} WLD</span>
                  </div>
                  <div className="flex justify-between text-g8-caption">
                    <span className="text-g8-text-secondary">Market Cap:</span>
                    <span className="text-g8-text-primary">
                      {formData.totalSupply && formData.initialPrice 
                        ? `${(parseFloat(formData.totalSupply) * parseFloat(formData.initialPrice)).toLocaleString()} WLD`
                        : '0 WLD'
                      }
                    </span>
                  </div>
                </div>
              </G8Column>
            </G8Card>
          </G8Column>
        )

      default:
        return null
    }
  }

  return (
    <div className={cn("min-h-screen bg-g8-bg text-g8-text-primary", className)}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-g8-bg/90 backdrop-blur-md border-b border-g8-stroke">
        <div className="p-g8-lg">
          <G8Row gap="md" align="center" justify="between">
            <G8Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </G8Button>
            
            <G8Column gap="xs" align="center">
              <h1 className="text-g8-h1 font-semibold text-g8-text-primary">
                Create Token
              </h1>
              <p className="text-g8-caption text-g8-text-secondary">
                Step {step} of {steps.length} — {currentStepData.label}
              </p>
            </G8Column>

            <div className="w-20"></div>
          </G8Row>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-g8-lg py-g8-md">
        <div className="flex items-center gap-g8-sm">
          {steps.map((stepItem, index) => {
            const Icon = stepItem.icon
            return (
              <React.Fragment key={stepItem.key}>
                <div className={cn(
                  "flex items-center gap-g8-xs px-g8-sm py-g8-xs rounded-g8-sm transition-all duration-200",
                  index + 1 <= step 
                    ? "bg-g8-success/20 text-g8-success border border-g8-success/30" 
                    : "bg-g8-surface text-g8-text-secondary border border-g8-stroke"
                )}>
                  {index + 1 < step ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : index + 1 === step ? (
                    <Icon className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                  <span className="text-g8-caption font-medium">
                    {stepItem.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "h-px w-g8-md transition-colors duration-200",
                    index + 1 < step ? "bg-g8-success" : "bg-g8-stroke"
                  )} />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="p-g8-lg">
        <G8Column gap="md" className="max-w-2xl mx-auto">
          {/* Step Description */}
          <G8Card variant="default" size="sm">
            <G8Row gap="sm" align="center">
              <Coins className="h-5 w-5 text-g8-text-primary" />
              <div>
                <h2 className="text-g8-h2 font-semibold text-g8-text-primary">
                  {currentStepData.label}
                </h2>
                <p className="text-g8-body text-g8-text-secondary">
                  {currentStepData.description}
                </p>
              </div>
            </G8Row>
          </G8Card>

          {/* Form Content */}
          <G8Card variant="gradient" size="lg">
            {renderStepContent()}
          </G8Card>

          {/* Action Buttons */}
          <G8Row gap="sm" justify="between">
            <G8Button
              variant="ghost"
              size="lg"
              onClick={onBack}
              disabled={step === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Previous
            </G8Button>

            <G8Button
              variant={step === steps.length ? "success" : "primary"}
              size="lg"
              onClick={handleNext}
              disabled={step === steps.length && !isValid}
            >
              {step === steps.length ? 'Launch Token' : 'Continue'}
              {step === steps.length ? (
                <Users className="h-4 w-4 ml-1" />
              ) : (
                <ArrowRight className="h-4 w-4 ml-1" />
              )}
            </G8Button>
          </G8Row>
        </G8Column>
      </div>
    </div>
  )
}
