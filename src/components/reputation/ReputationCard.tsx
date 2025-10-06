import * as React from "react"
import { cn } from "@/lib/utils"
import { G8Card, G8CardContent, G8CardHeader, G8CardTitle } from "@/components/ui/g8-card"
import { G8Badge } from "@/components/ui/g8-badge"
import { Trophy, Star, Zap, Crown } from "lucide-react"

export interface ReputationData {
  level: 'Bronze' | 'Silver' | 'Gold' | 'Diamond'
  xp: number
  currentLevelXp: number
  nextLevelXp: number
  progress: number
  icon: string
  color: string
}

interface ReputationCardProps {
  reputation: ReputationData
  className?: string
}

const levelConfig = {
  Bronze: {
    icon: Trophy,
    color: "text-amber-600",
    bgColor: "bg-amber-600/10",
    borderColor: "border-amber-600/30",
    gradient: "from-amber-500 to-orange-500"
  },
  Silver: {
    icon: Star,
    color: "text-gray-400",
    bgColor: "bg-gray-400/10",
    borderColor: "border-gray-400/30",
    gradient: "from-gray-400 to-gray-300"
  },
  Gold: {
    icon: Zap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    gradient: "from-yellow-500 to-yellow-400"
  },
  Diamond: {
    icon: Crown,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
    gradient: "from-blue-400 to-cyan-400"
  }
}

export function ReputationCard({ reputation, className }: ReputationCardProps) {
  const config = levelConfig[reputation.level]
  const IconComponent = config.icon

  return (
    <G8Card 
      variant="gradient" 
      className={cn(
        "relative overflow-hidden",
        config.borderColor,
        className
      )}
    >
      {/* Background gradient overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-5",
        config.gradient
      )} />
      
      <G8CardHeader className="relative">
        <div className="flex items-center justify-between">
          <G8CardTitle className="flex items-center gap-2">
            <IconComponent className={cn("h-5 w-5", config.color)} />
            <span className={config.color}>
              {reputation.level} Level
            </span>
          </G8CardTitle>
          
          <G8Badge 
            variant="gradient" 
            className={cn(
              "text-xs font-semibold",
              config.bgColor,
              config.color
            )}
          >
            {reputation.xp} XP
          </G8Badge>
        </div>
      </G8CardHeader>

      <G8CardContent className="relative space-y-4">
        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-g8-text-secondary">
              Progress to {reputation.level === 'Diamond' ? 'Max' : 'Next Level'}
            </span>
            <span className="text-g8-text-primary font-medium">
              {Math.round(reputation.progress)}%
            </span>
          </div>
          
          <div className="relative h-2 bg-g8-surface2 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full bg-gradient-to-r transition-all duration-500 ease-out",
                config.gradient
              )}
              style={{ width: `${reputation.progress}%` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </div>
          
          <div className="flex justify-between text-xs text-g8-text-secondary">
            <span>{reputation.currentLevelXp} XP</span>
            <span>
              {reputation.level === 'Diamond' ? '∞' : reputation.nextLevelXp} XP
            </span>
          </div>
        </div>

        {/* Level benefits */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-g8-text-primary">
            Level Benefits
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-g8-success rounded-full" />
              <span className="text-g8-text-secondary">
                {reputation.level === 'Bronze' ? '1x' : 
                 reputation.level === 'Silver' ? '1.5x' :
                 reputation.level === 'Gold' ? '2x' : '3x'} Trading Limits
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-g8-warning rounded-full" />
              <span className="text-g8-text-secondary">
                {reputation.level === 'Bronze' ? '0%' : 
                 reputation.level === 'Silver' ? '5%' :
                 reputation.level === 'Gold' ? '10%' : '15%'} Fee Discount
              </span>
            </div>
          </div>
        </div>
      </G8CardContent>
    </G8Card>
  )
}
