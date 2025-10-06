import * as React from "react"
import { cn } from "@/lib/utils"
import { G8Card, G8CardContent, G8CardHeader, G8CardTitle } from "@/components/ui/g8-card"
import { G8Button } from "@/components/ui/g8-button"
import { G8Badge } from "@/components/ui/g8-badge"
import { Trophy, Star, Shield, Target, Users, Zap, Crown, Award } from "lucide-react"

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
  category: 'trader' | 'community' | 'security' | 'milestone'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface AchievementSystemProps {
  achievements: Achievement[]
  className?: string
}

const achievementCategoryConfig = {
  trader: {
    icon: Target,
    color: "text-g8-warning",
    bgColor: "bg-g8-warning/10",
    borderColor: "border-g8-warning/30"
  },
  community: {
    icon: Users,
    color: "text-g8-primary",
    bgColor: "bg-g8-primary/10",
    borderColor: "border-g8-primary/30"
  },
  security: {
    icon: Shield,
    color: "text-g8-error",
    bgColor: "bg-g8-error/10",
    borderColor: "border-g8-error/30"
  },
  milestone: {
    icon: Crown,
    color: "text-g8-success",
    bgColor: "bg-g8-success/10",
    borderColor: "border-g8-success/30"
  }
}

const rarityConfig = {
  common: {
    color: "text-gray-400",
    bgColor: "bg-gray-400/10",
    borderColor: "border-gray-400/30",
    icon: Star
  },
  rare: {
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
    icon: Zap
  },
  epic: {
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/30",
    icon: Trophy
  },
  legendary: {
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/30",
    icon: Crown
  }
}

const iconMap = {
  '🤝': 'Handshake',
  '🕵️': 'Detective',
  '💎': 'Diamond',
  '🦸': 'Superhero',
  '🎯': 'Target',
  '🏆': 'Trophy',
  '⭐': 'Star',
  '🛡️': 'Shield',
  '👑': 'Crown',
  '🏅': 'Medal'
}

export function AchievementSystem({ achievements, className }: AchievementSystemProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all')
  const [selectedRarity, setSelectedRarity] = React.useState<string>('all')

  const categories = [
    { id: 'all', label: 'All', count: achievements.length },
    { id: 'trader', label: 'Trader', count: achievements.filter(a => a.category === 'trader').length },
    { id: 'community', label: 'Community', count: achievements.filter(a => a.category === 'community').length },
    { id: 'security', label: 'Security', count: achievements.filter(a => a.category === 'security').length },
    { id: 'milestone', label: 'Milestone', count: achievements.filter(a => a.category === 'milestone').length }
  ]

  const rarities = [
    { id: 'all', label: 'All', count: achievements.length },
    { id: 'common', label: 'Common', count: achievements.filter(a => a.rarity === 'common').length },
    { id: 'rare', label: 'Rare', count: achievements.filter(a => a.rarity === 'rare').length },
    { id: 'epic', label: 'Epic', count: achievements.filter(a => a.rarity === 'epic').length },
    { id: 'legendary', label: 'Legendary', count: achievements.filter(a => a.rarity === 'legendary').length }
  ]

  const filteredAchievements = achievements.filter(achievement => {
    const categoryMatch = selectedCategory === 'all' || achievement.category === selectedCategory
    const rarityMatch = selectedRarity === 'all' || achievement.rarity === selectedRarity
    return categoryMatch && rarityMatch
  })

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCount = achievements.length

  return (
    <div className={cn("space-y-4", className)}>
      {/* Stats header */}
      <G8Card variant="gradient" className="mb-4">
        <G8CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-g8-h2 text-g8-text-primary font-semibold">
                Achievements
              </h3>
              <p className="text-g8-body text-g8-text-secondary">
                {unlockedCount} of {totalCount} unlocked
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-g8-text-primary">
                {Math.round((unlockedCount / totalCount) * 100)}%
              </div>
              <div className="text-xs text-g8-text-secondary">
                Completion
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="relative h-2 bg-g8-surface2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-g8-primary to-g8-secondary transition-all duration-500 ease-out"
                style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        </G8CardContent>
      </G8Card>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <G8Button
              key={category.id}
              variant={selectedCategory === category.id ? "primary" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
            >
              {category.label}
              <G8Badge variant="secondary" className="ml-2 text-xs">
                {category.count}
              </G8Badge>
            </G8Button>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {rarities.map((rarity) => (
            <G8Button
              key={rarity.id}
              variant={selectedRarity === rarity.id ? "primary" : "outline"}
              size="sm"
              onClick={() => setSelectedRarity(rarity.id)}
              className="whitespace-nowrap"
            >
              {rarity.label}
              <G8Badge variant="secondary" className="ml-2 text-xs">
                {rarity.count}
              </G8Badge>
            </G8Button>
          ))}
        </div>
      </div>

      {/* Achievements grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredAchievements.map((achievement) => {
          const categoryConfig = achievementCategoryConfig[achievement.category]
          const rarityConfigData = rarityConfig[achievement.rarity]
          const CategoryIcon = categoryConfig.icon
          const RarityIcon = rarityConfigData.icon

          return (
            <G8Card 
              key={achievement.id}
              variant={achievement.unlocked ? "gradient" : "default"}
              className={cn(
                "transition-all duration-200 hover:shadow-g8-s",
                achievement.unlocked ? "opacity-100" : "opacity-60",
                achievement.unlocked ? categoryConfig.borderColor : "border-g8-stroke"
              )}
            >
              <G8CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-3 rounded-g8-lg text-2xl",
                      achievement.unlocked ? categoryConfig.bgColor : "bg-g8-surface2"
                    )}>
                      {achievement.icon}
                    </div>
                    <div>
                      <G8CardTitle className={cn(
                        "text-g8-h2",
                        achievement.unlocked ? "text-g8-text-primary" : "text-g8-text-secondary"
                      )}>
                        {achievement.title}
                      </G8CardTitle>
                      <p className="text-g8-body text-g8-text-secondary mt-1">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <G8Badge 
                      variant={achievement.unlocked ? "success" : "secondary"}
                      className="text-xs"
                    >
                      <RarityIcon className="h-3 w-3 mr-1" />
                      {achievement.rarity}
                    </G8Badge>
                    
                    {achievement.unlocked && achievement.unlockedAt && (
                      <div className="text-xs text-g8-text-secondary">
                        Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </G8CardHeader>

              {!achievement.unlocked && (
                <G8CardContent className="pt-0">
                  <div className="flex items-center gap-2 text-xs text-g8-text-secondary">
                    <Award className="h-3 w-3" />
                    <span>Locked - Complete requirements to unlock</span>
                  </div>
                </G8CardContent>
              )}
            </G8Card>
          )
        })}
      </div>

      {/* Empty state */}
      {filteredAchievements.length === 0 && (
        <G8Card variant="glass" className="text-center py-8">
          <G8CardContent>
            <Trophy className="h-12 w-12 text-g8-text-secondary mx-auto mb-4" />
            <h3 className="text-g8-h2 text-g8-text-primary mb-2">
              No Achievements Found
            </h3>
            <p className="text-g8-body text-g8-text-secondary">
              Try adjusting your filters to see more achievements.
            </p>
          </G8CardContent>
        </G8Card>
      )}
    </div>
  )
}
