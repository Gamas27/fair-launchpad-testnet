'use client'

import React, { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Settings, 
  Maximize2, 
  Minimize2,
  Volume2,
  Activity
} from 'lucide-react'

interface ChartData {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface AdvancedChartingProps {
  data: ChartData[]
  symbol: string
  onTimeframeChange: (timeframe: string) => void
  onIndicatorToggle: (indicator: string) => void
  className?: string
}

export function AdvancedCharting({ 
  data, 
  symbol, 
  onTimeframeChange, 
  onIndicatorToggle, 
  className = '' 
}: AdvancedChartingProps) {
  const [timeframe, setTimeframe] = useState('1h')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['sma', 'volume'])
  const [showSettings, setShowSettings] = useState(false)

  const timeframes = [
    { value: '1m', label: '1m' },
    { value: '5m', label: '5m' },
    { value: '15m', label: '15m' },
    { value: '1h', label: '1h' },
    { value: '4h', label: '4h' },
    { value: '1d', label: '1d' },
    { value: '1w', label: '1w' }
  ]

  const indicators = [
    { id: 'sma', label: 'SMA', description: 'Simple Moving Average' },
    { id: 'ema', label: 'EMA', description: 'Exponential Moving Average' },
    { id: 'rsi', label: 'RSI', description: 'Relative Strength Index' },
    { id: 'macd', label: 'MACD', description: 'Moving Average Convergence Divergence' },
    { id: 'bollinger', label: 'BB', description: 'Bollinger Bands' },
    { id: 'volume', label: 'Volume', description: 'Trading Volume' }
  ]

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe)
    onTimeframeChange(newTimeframe)
  }

  const handleIndicatorToggle = (indicatorId: string) => {
    const newIndicators = activeIndicators.includes(indicatorId)
      ? activeIndicators.filter(id => id !== indicatorId)
      : [...activeIndicators, indicatorId]
    
    setActiveIndicators(newIndicators)
    onIndicatorToggle(indicatorId)
  }

  const getPriceChange = () => {
    if (data.length < 2) return { change: 0, percentage: 0 }
    const latest = data[data.length - 1]
    const previous = data[data.length - 2]
    const change = latest.close - previous.close
    const percentage = (change / previous.close) * 100
    return { change, percentage }
  }

  const priceChange = getPriceChange()

  return (
    <div className={`bg-g8-surface border border-g8-stroke rounded-g8-lg ${isFullscreen ? 'fixed inset-4 z-50' : ''} ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-g8-stroke">
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-5 h-5 text-g8-text-primary" />
          <div>
            <h3 className="text-g8-body text-g8-text-primary font-semibold">{symbol}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-g8-caption text-g8-text-secondary">
                {data.length > 0 && `$${data[data.length - 1].close.toFixed(4)}`}
              </span>
              <div className={`flex items-center space-x-1 ${
                priceChange.change >= 0 ? 'text-g8-success' : 'text-g8-error'
              }`}>
                {priceChange.change >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span className="text-g8-caption font-medium">
                  {priceChange.change >= 0 ? '+' : ''}{priceChange.percentage.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-g8-text-secondary hover:text-g8-text-primary hover:bg-g8-surface2 rounded-g8-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-g8-text-secondary hover:text-g8-text-primary hover:bg-g8-surface2 rounded-g8-lg transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex items-center space-x-1 p-4 border-b border-g8-stroke">
        {timeframes.map((tf) => (
          <button
            key={tf.value}
            onClick={() => handleTimeframeChange(tf.value)}
            className={`px-3 py-1 rounded-g8-lg text-g8-caption font-medium transition-colors ${
              timeframe === tf.value
                ? 'bg-g8-primary text-g8-bg'
                : 'text-g8-text-secondary hover:text-g8-text-primary hover:bg-g8-surface2'
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Chart Area */}
      <div className="relative">
        <div className="h-96 bg-g8-surface2 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-g8-text-secondary mx-auto mb-4" />
            <p className="text-g8-body text-g8-text-secondary mb-2">Advanced Chart</p>
            <p className="text-g8-caption text-g8-text-secondary">
              Interactive candlestick chart with technical indicators
            </p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {activeIndicators.map((indicator) => (
                <span
                  key={indicator}
                  className="px-2 py-1 bg-g8-primary/20 text-g8-primary text-g8-caption rounded-g8-lg"
                >
                  {indicators.find(i => i.id === indicator)?.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Chart Controls Overlay */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="p-2 bg-g8-surface/80 backdrop-blur-sm border border-g8-stroke rounded-g8-lg text-g8-text-primary hover:bg-g8-surface transition-colors">
            <Activity className="w-4 h-4" />
          </button>
          <button className="p-2 bg-g8-surface/80 backdrop-blur-sm border border-g8-stroke rounded-g8-lg text-g8-text-primary hover:bg-g8-surface transition-colors">
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-t border-g8-stroke p-4">
          <h4 className="text-g8-body text-g8-text-primary font-semibold mb-4">Chart Settings</h4>
          
          <div className="space-y-4">
            <div>
              <p className="text-g8-caption text-g8-text-secondary mb-2">Technical Indicators</p>
              <div className="grid grid-cols-2 gap-2">
                {indicators.map((indicator) => (
                  <label
                    key={indicator.id}
                    className="flex items-center space-x-2 p-2 bg-g8-surface2 rounded-g8-lg cursor-pointer hover:bg-g8-surface transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={activeIndicators.includes(indicator.id)}
                      onChange={() => handleIndicatorToggle(indicator.id)}
                      className="w-4 h-4 text-g8-primary bg-g8-surface border-g8-stroke rounded focus:ring-g8-primary"
                    />
                    <div>
                      <p className="text-g8-caption text-g8-text-primary font-medium">
                        {indicator.label}
                      </p>
                      <p className="text-g8-caption text-g8-text-secondary">
                        {indicator.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-g8-caption text-g8-text-secondary mb-2">Chart Settings</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-g8-caption text-g8-text-primary">Grid Lines</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-g8-primary" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-g8-caption text-g8-text-primary">Crosshair</span>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-g8-primary" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-g8-caption text-g8-text-primary">Volume Profile</span>
                  <input type="checkbox" className="w-4 h-4 text-g8-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="flex items-center justify-between p-4 border-t border-g8-stroke bg-g8-surface2">
        <div className="flex items-center space-x-4 text-g8-caption text-g8-text-secondary">
          <span>O: {data.length > 0 && data[data.length - 1].open.toFixed(4)}</span>
          <span>H: {data.length > 0 && data[data.length - 1].high.toFixed(4)}</span>
          <span>L: {data.length > 0 && data[data.length - 1].low.toFixed(4)}</span>
          <span>C: {data.length > 0 && data[data.length - 1].close.toFixed(4)}</span>
        </div>
        <div className="flex items-center space-x-2 text-g8-caption text-g8-text-secondary">
          <Volume2 className="w-3 h-3" />
          <span>Vol: {data.length > 0 && data[data.length - 1].volume.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
