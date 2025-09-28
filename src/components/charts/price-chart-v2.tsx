import React from 'react'
import { cn } from '@/lib/utils'

export interface PriceChartV2Props {
  data: number[]
  timeframes?: string[]
  activeTimeframe?: string
  onTimeframeChange?: (timeframe: string) => void
  height?: number
  showGrid?: boolean
  showTooltip?: boolean
  className?: string
}

export const PriceChartV2: React.FC<PriceChartV2Props> = ({
  data,
  timeframes = ['1H', '1D', '1W', '1M', '3M', '1Y'],
  activeTimeframe = '1H',
  onTimeframeChange,
  height = 200,
  showGrid = true,
  showTooltip = true,
  className
}) => {
  const maxPrice = Math.max(...data)
  const minPrice = Math.min(...data)
  const priceRange = maxPrice - minPrice
  
  // Generate SVG path for the line chart
  const generatePath = () => {
    if (data.length < 2) return ''
    
    const width = 100
    const height = 100
    const stepX = width / (data.length - 1)
    
    const points = data.map((value, index) => {
      const x = index * stepX
      const y = height - ((value - minPrice) / priceRange) * height
      return `${x},${y}`
    })
    
    return `M ${points.join(' L ')}`
  }

  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={cn('w-full', className)}>
      {/* Timeframe Selector */}
      {timeframes.length > 0 && (
        <div className="flex space-x-1 mb-4">
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => onTimeframeChange?.(timeframe)}
              className={cn(
                'px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200',
                activeTimeframe === timeframe
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              )}
            >
              {timeframe}
            </button>
          ))}
        </div>
      )}

      {/* Chart Container */}
      <div className="relative">
        <svg
          width="100%"
          height={height}
          viewBox="0 0 100 100"
          className="overflow-visible"
        >
          {/* Grid Lines */}
          {showGrid && (
            <g className="opacity-20">
              {[0, 25, 50, 75, 100].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="100"
                  y2={y}
                  stroke="#374151"
                  strokeWidth="0.5"
                />
              ))}
              {[0, 20, 40, 60, 80, 100].map((x) => (
                <line
                  key={x}
                  x1={x}
                  y1="0"
                  x2={x}
                  y2="100"
                  stroke="#374151"
                  strokeWidth="0.5"
                />
              ))}
            </g>
          )}

          {/* Gradient Definition */}
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <path
            d={`${generatePath()} L 100,100 L 0,100 Z`}
            fill={`url(#${gradientId})`}
          />

          {/* Line */}
          <path
            d={generatePath()}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {data.map((value, index) => {
            const x = (index / (data.length - 1)) * 100
            const y = 100 - ((value - minPrice) / priceRange) * 100
            
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="1"
                fill="#06b6d4"
                className="hover:r-2 transition-all duration-200"
              />
            )
          })}
        </svg>

        {/* Price Labels */}
        <div className="absolute top-0 right-0 text-right">
          <div className="text-lg font-bold text-white">
            ${maxPrice.toFixed(4)}
          </div>
          <div className="text-sm text-gray-400">
            ${minPrice.toFixed(4)}
          </div>
        </div>
      </div>

      {/* Chart Info */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
        <div>
          <span className="text-green-400">+2.5%</span> in {activeTimeframe}
        </div>
        <div>
          Vol: $1.2M
        </div>
      </div>
    </div>
  )
}

// Mini Chart Component for Token Cards
export interface MiniChartV2Props {
  data: number[]
  height?: number
  className?: string
}

export const MiniChartV2: React.FC<MiniChartV2Props> = ({
  data,
  height = 60,
  className
}) => {
  const maxPrice = Math.max(...data)
  const minPrice = Math.min(...data)
  const priceRange = maxPrice - minPrice
  
  const generatePath = () => {
    if (data.length < 2) return ''
    
    const width = 100
    const height = 100
    const stepX = width / (data.length - 1)
    
    const points = data.map((value, index) => {
      const x = index * stepX
      const y = height - ((value - minPrice) / priceRange) * height
      return `${x},${y}`
    })
    
    return `M ${points.join(' L ')}`
  }

  const isPositive = data[data.length - 1] > data[0]
  const changePercent = ((data[data.length - 1] - data[0]) / data[0]) * 100

  return (
    <div className={cn('relative', className)}>
      <svg
        width="100%"
        height={height}
        viewBox="0 0 100 100"
        className="overflow-visible"
      >
        <path
          d={generatePath()}
          fill="none"
          stroke={isPositive ? '#10b981' : '#ef4444'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      
      <div className="absolute top-0 right-0 text-xs">
        <span className={isPositive ? 'text-green-400' : 'text-red-400'}>
          {isPositive ? '+' : ''}{changePercent.toFixed(1)}%
        </span>
      </div>
    </div>
  )
}
