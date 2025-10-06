'use client'

import React, { useState } from 'react'
import { Settings, Shield, AlertTriangle, CheckCircle } from 'lucide-react'
import { G8Button } from '@/components/ui/g8-button'

interface SlippageProtectionProps {
  currentSlippage: number
  onSlippageChange: (slippage: number) => void
  className?: string
}

export function SlippageProtection({ 
  currentSlippage, 
  onSlippageChange, 
  className = '' 
}: SlippageProtectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [customSlippage, setCustomSlippage] = useState('')
  const [isCustomMode, setIsCustomMode] = useState(false)

  const presetSlippages = [0.1, 0.5, 1.0, 3.0]

  const getSlippageStatus = (slippage: number) => {
    if (slippage < 0.5) return { status: 'safe', color: 'text-g8-success', icon: CheckCircle }
    if (slippage < 1.0) return { status: 'warning', color: 'text-g8-warning', icon: AlertTriangle }
    return { status: 'danger', color: 'text-g8-error', icon: AlertTriangle }
  }

  const handlePresetSelect = (slippage: number) => {
    onSlippageChange(slippage)
    setIsCustomMode(false)
    setCustomSlippage('')
  }

  const handleCustomSubmit = () => {
    const slippage = parseFloat(customSlippage)
    if (!isNaN(slippage) && slippage >= 0 && slippage <= 50) {
      onSlippageChange(slippage)
      setIsCustomMode(false)
      setCustomSlippage('')
    }
  }

  const status = getSlippageStatus(currentSlippage)
  const StatusIcon = status.icon

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-g8-surface border border-g8-stroke rounded-g8-lg px-3 py-2 hover:bg-g8-surface2 transition-colors"
      >
        <Settings className="w-4 h-4 text-g8-text-secondary" />
        <span className="text-g8-text-primary text-sm font-medium">
          Slippage: {currentSlippage}%
        </span>
        <StatusIcon className={`w-4 h-4 ${status.color}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-g8-surface border border-g8-stroke rounded-g8-lg shadow-lg z-50">
          <div className="p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-g8-text-primary" />
              <h3 className="text-g8-h3 text-g8-text-primary font-semibold">Slippage Protection</h3>
            </div>

            {/* Current Status */}
            <div className="flex items-center space-x-2 p-3 bg-g8-surface2 rounded-g8-lg">
              <StatusIcon className={`w-5 h-5 ${status.color}`} />
              <div>
                <p className="text-g8-body text-g8-text-primary font-medium">
                  Current: {currentSlippage}%
                </p>
                <p className="text-g8-caption text-g8-text-secondary">
                  {status.status === 'safe' && 'Safe slippage tolerance'}
                  {status.status === 'warning' && 'Moderate slippage risk'}
                  {status.status === 'danger' && 'High slippage risk'}
                </p>
              </div>
            </div>

            {/* Preset Options */}
            <div className="space-y-2">
              <p className="text-g8-body text-g8-text-primary font-medium">Quick Settings</p>
              <div className="grid grid-cols-2 gap-2">
                {presetSlippages.map((slippage) => (
                  <button
                    key={slippage}
                    onClick={() => handlePresetSelect(slippage)}
                    className={`p-2 rounded-g8-lg border transition-colors ${
                      currentSlippage === slippage
                        ? 'bg-g8-primary border-g8-primary text-g8-bg'
                        : 'bg-g8-surface border-g8-stroke text-g8-text-primary hover:bg-g8-surface2'
                    }`}
                  >
                    {slippage}%
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="space-y-2">
              <p className="text-g8-body text-g8-text-primary font-medium">Custom Slippage</p>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={customSlippage}
                  onChange={(e) => setCustomSlippage(e.target.value)}
                  placeholder="Enter %"
                  className="flex-1 px-3 py-2 bg-g8-surface border border-g8-stroke rounded-g8-lg text-g8-text-primary placeholder-g8-text-secondary focus:outline-none focus:ring-2 focus:ring-g8-primary"
                  min="0"
                  max="50"
                  step="0.1"
                />
                <G8Button
                  onClick={handleCustomSubmit}
                  disabled={!customSlippage || parseFloat(customSlippage) < 0 || parseFloat(customSlippage) > 50}
                  size="sm"
                >
                  Set
                </G8Button>
              </div>
            </div>

            {/* Warning Messages */}
            {currentSlippage > 1.0 && (
              <div className="p-3 bg-g8-error/10 border border-g8-error/20 rounded-g8-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 text-g8-error mt-0.5" />
                  <div>
                    <p className="text-g8-caption text-g8-error font-medium">High Slippage Warning</p>
                    <p className="text-g8-caption text-g8-text-secondary">
                      Your transaction may be executed at a significantly different price than expected.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Info */}
            <div className="p-3 bg-g8-surface2 rounded-g8-lg">
              <p className="text-g8-caption text-g8-text-secondary">
                <strong>Slippage</strong> is the difference between the expected price and the actual price of your trade. 
                Higher slippage tolerance increases the chance of successful execution but may result in worse prices.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
