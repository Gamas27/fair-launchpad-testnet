'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface PriceData {
  time: string
  price: number
}

interface PriceChartProps {
  data: PriceData[]
  height?: number
}

export default function PriceChart({ data, height = 200 }: PriceChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20">
        <CardContent className="p-6">
          <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-500">No price data available</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const maxPrice = Math.max(...data.map(d => d.price))
  const minPrice = Math.min(...data.map(d => d.price))
  const priceRange = maxPrice - minPrice
  const isPositive = data[data.length - 1].price > data[0].price

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isPositive ? (
            <TrendingUp className="h-5 w-5 text-green-400" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-400" />
          )}
          Price History (24h)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative" style={{ height: `${height}px` }}>
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 400 ${height}`}
            className="absolute inset-0"
          >
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((y, i) => (
              <line
                key={i}
                x1="0"
                y1={y * height}
                x2="400"
                y2={y * height}
                stroke="rgba(75, 85, 99, 0.3)"
                strokeWidth="1"
              />
            ))}
            
            {/* Price line */}
            <polyline
              fill="none"
              stroke={isPositive ? "#10B981" : "#EF4444"}
              strokeWidth="2"
              points={data.map((d, i) => {
                const x = (i / (data.length - 1)) * 400
                const y = height - ((d.price - minPrice) / priceRange) * height
                return `${x},${y}`
              }).join(' ')}
            />
            
            {/* Area fill */}
            <polygon
              fill={isPositive ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)"}
              points={`0,${height} ${data.map((d, i) => {
                const x = (i / (data.length - 1)) * 400
                const y = height - ((d.price - minPrice) / priceRange) * height
                return `${x},${y}`
              }).join(' ')} 400,${height}`}
            />
          </svg>
          
          {/* Price labels */}
          <div className="absolute top-0 right-0 text-right">
            <div className="text-lg font-bold text-cyan-400">
              ${data[data.length - 1].price.toFixed(4)}
            </div>
            <div className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{((data[data.length - 1].price - data[0].price) / data[0].price * 100).toFixed(2)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
