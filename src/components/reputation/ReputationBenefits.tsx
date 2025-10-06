import * as React from "react"
import { cn } from "@/lib/utils"
import { G8Card, G8CardContent, G8CardHeader, G8CardTitle } from "@/components/ui/g8-card"
import { G8Badge } from "@/components/ui/g8-badge"
import { TrendingUp, Shield, Zap, Crown, Star, Target } from "lucide-react"

export interface ReputationBenefits {
  level: 'Bronze' | 'Silver' | 'Gold' | 'Diamond'
  tradingLimits: {
    multiplier: number
    maxAmount: number
  }
  feeDiscount: number
  priorityAccess: boolean
  exclusiveFeatures: string[]
  nextLevelBenefits?: string[]
}

interface ReputationBenefitsProps {
  benefits: ReputationBenefits
  className?: string
}

const levelConfig = {
  Bronze: {
    icon: Target,
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

export function ReputationBenefits({ benefits, className }: ReputationBenefitsProps) {
  const config = levelConfig[benefits.level]
  const IconComponent = config.icon

  const benefitCategories = [
    {
      title: "Trading Benefits",
      icon: TrendingUp,
      items: [
        {
          label: "Trading Limits",
          value: `${benefits.tradingLimits.multiplier}x multiplier`,
          description: `Up to ${benefits.tradingLimits.maxAmount.toLocaleString()} per trade`
        },
        {
          label: "Fee Discount",
          value: `${benefits.feeDiscount}% off`,
          description: "Reduced trading fees"
        }
      ]
    },
    {
      title: "Platform Benefits",
      icon: Shield,
      items: [
        {
          label: "Priority Access",
          value: benefits.priorityAccess ? "Yes" : "No",
          description: "Early access to new features"
        },
        {
          label: "Support Priority",
          value: benefits.level === 'Gold' || benefits.level === 'Diamond' ? "High" : "Standard",
          description: "Faster customer support"
        }
      ]
    }
  ]

  return (
    <div className={cn("space-y-4", className)}>
      {/* Level header */}
      <G8Card 
        variant="gradient" 
        className={cn(
          "relative overflow-hidden",
          config.borderColor
        )}
      >
        {/* Background gradient overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-5",
          config.gradient
        )} />
        
        <G8CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-3 rounded-g8-lg",
                config.bgColor
              )}>
                <IconComponent className={cn("h-6 w-6", config.color)} />
              </div>
              <div>
                <G8CardTitle className={cn("text-g8-h1", config.color)}>
                  {benefits.level} Level Benefits
                </G8CardTitle>
                <p className="text-g8-body text-g8-text-secondary">
                  Unlock exclusive trading advantages
                </p>
              </div>
            </div>
            
            <G8Badge 
              variant="gradient" 
              className={cn(
                "text-sm font-semibold",
                config.bgColor,
                config.color
              )}
            >
              {benefits.level}
            </G8Badge>
          </div>
        </G8CardHeader>
      </G8Card>

      {/* Benefits grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefitCategories.map((category, index) => (
          <G8Card key={index} variant="default" className="h-fit">
            <G8CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <category.icon className="h-5 w-5 text-g8-primary" />
                <G8CardTitle className="text-g8-h2 text-g8-text-primary">
                  {category.title}
                </G8CardTitle>
              </div>
            </G8CardHeader>
            
            <G8CardContent className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-g8-body text-g8-text-primary font-medium">
                      {item.label}
                    </span>
                    <G8Badge 
                      variant="secondary" 
                      className="text-xs font-semibold"
                    >
                      {item.value}
                    </G8Badge>
                  </div>
                  <p className="text-g8-caption text-g8-text-secondary">
                    {item.description}
                  </p>
                </div>
              ))}
            </G8CardContent>
          </G8Card>
        ))}
      </div>

      {/* Exclusive features */}
      {benefits.exclusiveFeatures.length > 0 && (
        <G8Card variant="neon" className="border-g8-primary/30">
          <G8CardHeader>
            <G8CardTitle className="text-g8-h2 text-g8-text-primary flex items-center gap-2">
              <Crown className="h-5 w-5 text-g8-primary" />
              Exclusive Features
            </G8CardTitle>
          </G8CardHeader>
          
          <G8CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {benefits.exclusiveFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-g8-body text-g8-text-primary">
                  <div className="w-2 h-2 bg-g8-primary rounded-full" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </G8CardContent>
        </G8Card>
      )}

      {/* Next level benefits */}
      {benefits.nextLevelBenefits && benefits.nextLevelBenefits.length > 0 && (
        <G8Card variant="glass" className="border-g8-warning/30">
          <G8CardHeader>
            <G8CardTitle className="text-g8-h2 text-g8-text-primary flex items-center gap-2">
              <Zap className="h-5 w-5 text-g8-warning" />
              Next Level Unlocks
            </G8CardTitle>
          </G8CardHeader>
          
          <G8CardContent>
            <div className="space-y-2">
              {benefits.nextLevelBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-g8-body text-g8-text-secondary">
                  <div className="w-2 h-2 bg-g8-warning rounded-full" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </G8CardContent>
        </G8Card>
      )}
    </div>
  )
}
