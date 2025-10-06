import * as React from "react"
import { cn } from "@/lib/utils"
import { Zap, Star, Trophy, Crown } from "lucide-react"

export interface XPProgressData {
  currentXP: number
  currentLevelXP: number
  nextLevelXP: number
  level: 'Bronze' | 'Silver' | 'Gold' | 'Diamond'
  progress: number
}

interface XPProgressBarProps {
  xpData: XPProgressData
  showDetails?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const levelConfig = {
  Bronze: {
    icon: Trophy,
    color: "text-amber-600",
    bgColor: "bg-amber-600/10",
    gradient: "from-amber-500 to-orange-500",
    glowColor: "shadow-amber-500/25"
  },
  Silver: {
    icon: Star,
    color: "text-gray-400",
    bgColor: "bg-gray-400/10",
    gradient: "from-gray-400 to-gray-300",
    glowColor: "shadow-gray-400/25"
  },
  Gold: {
    icon: Zap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    gradient: "from-yellow-500 to-yellow-400",
    glowColor: "shadow-yellow-500/25"
  },
  Diamond: {
    icon: Crown,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    gradient: "from-blue-400 to-cyan-400",
    glowColor: "shadow-blue-400/25"
  }
}

export function XPProgressBar({ 
  xpData, 
  showDetails = true, 
  size = 'md',
  className 
}: XPProgressBarProps) {
  const config = levelConfig[xpData.level]
  const IconComponent = config.icon

  const sizeClasses = {
    sm: {
      container: "h-2",
      icon: "h-3 w-3",
      text: "text-xs",
      spacing: "gap-1"
    },
    md: {
      container: "h-3",
      icon: "h-4 w-4",
      text: "text-sm",
      spacing: "gap-2"
    },
    lg: {
      container: "h-4",
      icon: "h-5 w-5",
      text: "text-base",
      spacing: "gap-3"
    }
  }

  const sizeClass = sizeClasses[size]

  return (
    <div className={cn("space-y-2", className)}>
      {/* Header with level and XP */}
      <div className="flex items-center justify-between">
        <div className={cn("flex items-center", sizeClass.spacing)}>
          <div className={cn(
            "p-1 rounded-g8-sm",
            config.bgColor
          )}>
            <IconComponent className={cn(
              sizeClass.icon,
              config.color
            )} />
          </div>
          <div>
            <div className={cn(
              "font-semibold text-g8-text-primary",
              sizeClass.text
            )}>
              {xpData.level} Level
            </div>
            {showDetails && (
              <div className={cn(
                "text-g8-text-secondary",
                sizeClass.text
              )}>
                {xpData.currentXP} XP
              </div>
            )}
          </div>
        </div>

        {showDetails && (
          <div className="text-right">
            <div className={cn(
              "font-medium text-g8-text-primary",
              sizeClass.text
            )}>
              {Math.round(xpData.progress)}%
            </div>
            <div className={cn(
              "text-g8-text-secondary",
              sizeClass.text
            )}>
              {xpData.level === 'Diamond' ? 'Max Level' : 'to Next Level'}
            </div>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="relative">
        <div className={cn(
          "bg-g8-surface2 rounded-full overflow-hidden",
          sizeClass.container
        )}>
          <div 
            className={cn(
              "h-full bg-gradient-to-r transition-all duration-500 ease-out",
              config.gradient
            )}
            style={{ width: `${xpData.progress}%` }}
          />
          
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>

        {/* Glow effect for higher levels */}
        {xpData.level === 'Gold' || xpData.level === 'Diamond' ? (
          <div className={cn(
            "absolute inset-0 rounded-full blur-sm opacity-50",
            config.glowColor
          )} />
        ) : null}
      </div>

      {/* XP details */}
      {showDetails && (
        <div className="flex justify-between text-xs text-g8-text-secondary">
          <span>{xpData.currentLevelXP} XP</span>
          <span>
            {xpData.level === 'Diamond' ? '∞' : xpData.nextLevelXP} XP
          </span>
        </div>
      )}

      {/* Level benefits preview */}
      {showDetails && xpData.level !== 'Diamond' && (
        <div className="mt-2 p-2 bg-g8-surface2/50 rounded-g8-sm">
          <div className="text-xs text-g8-text-secondary">
            Next level unlocks: {getNextLevelBenefits(xpData.level)}
          </div>
        </div>
      )}
    </div>
  )
}

function getNextLevelBenefits(currentLevel: string): string {
  switch (currentLevel) {
    case 'Bronze':
      return '1.5x trading limits, 5% fee discount'
    case 'Silver':
      return '2x trading limits, 10% fee discount'
    case 'Gold':
      return '3x trading limits, 15% fee discount, priority support'
    default:
      return 'Maximum benefits unlocked'
  }
}
