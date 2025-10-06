import * as React from "react"
import { cn } from "@/lib/utils"
import { G8Card, G8CardContent, G8CardHeader, G8CardTitle } from "@/components/ui/g8-card"
import { G8Badge } from "@/components/ui/g8-badge"
import { useReputationStore } from "@/lib/reputation/reputationStore"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  Target, 
  Award,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react"

export interface TradingAnalyticsData {
  totalVolume: number
  totalTrades: number
  winRate: number
  averageTradeSize: number
  totalFees: number
  feesSaved: number
  reputationLevel: string
  xpEarned: number
  tradingStreak: number
  bestTrade: number
  worstTrade: number
  monthlyStats: {
    volume: number
    trades: number
    fees: number
  }
  categoryStats: {
    verification: number
    trading: number
    community: number
    security: number
  }
}

interface TradingAnalyticsProps {
  analytics: TradingAnalyticsData
  className?: string
}

export function TradingAnalytics({ analytics, className }: TradingAnalyticsProps) {
  const { reputationData } = useReputationStore()
  
  const statsCards = [
    {
      title: "Total Volume",
      value: `$${analytics.totalVolume.toLocaleString()}`,
      icon: DollarSign,
      color: "text-g8-success",
      bgColor: "bg-g8-success/10",
      borderColor: "border-g8-success/30"
    },
    {
      title: "Total Trades",
      value: analytics.totalTrades.toLocaleString(),
      icon: Activity,
      color: "text-g8-primary",
      bgColor: "bg-g8-primary/10",
      borderColor: "border-g8-primary/30"
    },
    {
      title: "Win Rate",
      value: `${analytics.winRate}%`,
      icon: Target,
      color: "text-g8-warning",
      bgColor: "bg-g8-warning/10",
      borderColor: "border-g8-warning/30"
    },
    {
      title: "Fees Saved",
      value: `$${analytics.feesSaved.toLocaleString()}`,
      icon: Award,
      color: "text-g8-success",
      bgColor: "bg-g8-success/10",
      borderColor: "border-g8-success/30"
    }
  ]

  const performanceMetrics = [
    {
      label: "Average Trade Size",
      value: `$${analytics.averageTradeSize.toLocaleString()}`,
      trend: "+12.5%"
    },
    {
      label: "Trading Streak",
      value: `${analytics.tradingStreak} days`,
      trend: "+3"
    },
    {
      label: "Best Trade",
      value: `+${analytics.bestTrade}%`,
      trend: "All time"
    },
    {
      label: "Worst Trade",
      value: `${analytics.worstTrade}%`,
      trend: "All time"
    }
  ]

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-g8-text-primary">
          Trading Analytics
        </h2>
        <p className="text-g8-text-secondary">
          Your trading performance and reputation insights
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <G8Card 
              key={index}
              variant="gradient" 
              className={cn(
                "text-center",
                stat.borderColor
              )}
            >
              <G8CardContent className="pt-4">
                <div className={cn(
                  "w-12 h-12 rounded-g8-lg mx-auto mb-3 flex items-center justify-center",
                  stat.bgColor
                )}>
                  <IconComponent className={cn("h-6 w-6", stat.color)} />
                </div>
                <div className="text-2xl font-bold text-g8-text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-g8-text-secondary">
                  {stat.title}
                </div>
              </G8CardContent>
            </G8Card>
          )
        })}
      </div>

      {/* Performance Metrics */}
      <G8Card variant="default">
        <G8CardHeader>
          <G8CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-g8-primary" />
            Performance Metrics
          </G8CardTitle>
        </G8CardHeader>
        <G8CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="space-y-1">
                <div className="text-sm text-g8-text-secondary">
                  {metric.label}
                </div>
                <div className="text-lg font-semibold text-g8-text-primary">
                  {metric.value}
                </div>
                <div className="text-xs text-g8-text-secondary">
                  {metric.trend}
                </div>
              </div>
            ))}
          </div>
        </G8CardContent>
      </G8Card>

      {/* Monthly Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <G8Card variant="default">
          <G8CardHeader>
            <G8CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-g8-primary" />
              This Month
            </G8CardTitle>
          </G8CardHeader>
          <G8CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-g8-text-secondary">Volume</span>
                <span className="text-g8-text-primary font-medium">
                  ${analytics.monthlyStats.volume.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-g8-text-secondary">Trades</span>
                <span className="text-g8-text-primary font-medium">
                  {analytics.monthlyStats.trades}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-g8-text-secondary">Fees Paid</span>
                <span className="text-g8-text-primary font-medium">
                  ${analytics.monthlyStats.fees.toLocaleString()}
                </span>
              </div>
            </div>
          </G8CardContent>
        </G8Card>

        <G8Card variant="default">
          <G8CardHeader>
            <G8CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-g8-primary" />
              XP Breakdown
            </G8CardTitle>
          </G8CardHeader>
          <G8CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-g8-text-secondary">Verification</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-g8-surface2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-g8-success rounded-full"
                      style={{ width: `${(analytics.categoryStats.verification / 1000) * 100}%` }}
                    />
                  </div>
                  <span className="text-g8-text-primary font-medium">
                    {analytics.categoryStats.verification}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-g8-text-secondary">Trading</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-g8-surface2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-g8-warning rounded-full"
                      style={{ width: `${(analytics.categoryStats.trading / 1000) * 100}%` }}
                    />
                  </div>
                  <span className="text-g8-text-primary font-medium">
                    {analytics.categoryStats.trading}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-g8-text-secondary">Community</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-g8-surface2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-g8-primary rounded-full"
                      style={{ width: `${(analytics.categoryStats.community / 1000) * 100}%` }}
                    />
                  </div>
                  <span className="text-g8-text-primary font-medium">
                    {analytics.categoryStats.community}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-g8-text-secondary">Security</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-g8-surface2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-g8-error rounded-full"
                      style={{ width: `${(analytics.categoryStats.security / 1000) * 100}%` }}
                    />
                  </div>
                  <span className="text-g8-text-primary font-medium">
                    {analytics.categoryStats.security}
                  </span>
                </div>
              </div>
            </div>
          </G8CardContent>
        </G8Card>
      </div>

      {/* Reputation Benefits */}
      <G8Card variant="gradient" className="border-g8-primary/30">
        <G8CardHeader>
          <G8CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-g8-primary" />
            Reputation Benefits
          </G8CardTitle>
        </G8CardHeader>
        <G8CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-g8-text-primary">
                {reputationData.level}
              </div>
              <div className="text-sm text-g8-text-secondary">
                Current Level
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-g8-text-primary">
                {analytics.xpEarned}
              </div>
              <div className="text-sm text-g8-text-secondary">
                XP Earned
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-g8-text-primary">
                ${analytics.feesSaved.toLocaleString()}
              </div>
              <div className="text-sm text-g8-text-secondary">
                Fees Saved
              </div>
            </div>
          </div>
        </G8CardContent>
      </G8Card>
    </div>
  )
}
