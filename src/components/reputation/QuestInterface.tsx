import * as React from "react"
import { cn } from "@/lib/utils"
import { G8Card, G8CardContent, G8CardHeader, G8CardTitle } from "@/components/ui/g8-card"
import { G8Button } from "@/components/ui/g8-button"
import { G8Badge } from "@/components/ui/g8-badge"
import { CheckCircle, Clock, Star, Target, Trophy } from "lucide-react"

export interface ReputationQuest {
  id: string
  title: string
  description: string
  xpReward: number
  completed: boolean
  progress: number
  maxProgress: number
  category: 'verification' | 'trading' | 'community' | 'security'
  timeFrame?: string
}

interface QuestInterfaceProps {
  quests: ReputationQuest[]
  onQuestComplete?: (questId: string) => void
  className?: string
}

const questCategoryConfig = {
  verification: {
    icon: CheckCircle,
    color: "text-g8-success",
    bgColor: "bg-g8-success/10",
    borderColor: "border-g8-success/30"
  },
  trading: {
    icon: Target,
    color: "text-g8-warning",
    bgColor: "bg-g8-warning/10",
    borderColor: "border-g8-warning/30"
  },
  community: {
    icon: Star,
    color: "text-g8-primary",
    bgColor: "bg-g8-primary/10",
    borderColor: "border-g8-primary/30"
  },
  security: {
    icon: Trophy,
    color: "text-g8-error",
    bgColor: "bg-g8-error/10",
    borderColor: "border-g8-error/30"
  }
}

export function QuestInterface({ quests, onQuestComplete, className }: QuestInterfaceProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all')

  const categories = [
    { id: 'all', label: 'All Quests', count: quests.length },
    { id: 'verification', label: 'Verification', count: quests.filter(q => q.category === 'verification').length },
    { id: 'trading', label: 'Trading', count: quests.filter(q => q.category === 'trading').length },
    { id: 'community', label: 'Community', count: quests.filter(q => q.category === 'community').length },
    { id: 'security', label: 'Security', count: quests.filter(q => q.category === 'security').length }
  ]

  const filteredQuests = selectedCategory === 'all' 
    ? quests 
    : quests.filter(quest => quest.category === selectedCategory)

  return (
    <div className={cn("space-y-4", className)}>
      {/* Category filter */}
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
            <G8Badge 
              variant="secondary" 
              className="ml-2 text-xs"
            >
              {category.count}
            </G8Badge>
          </G8Button>
        ))}
      </div>

      {/* Quests list */}
      <div className="space-y-3">
        {filteredQuests.map((quest) => {
          const config = questCategoryConfig[quest.category]
          const IconComponent = config.icon
          const progressPercentage = (quest.progress / quest.maxProgress) * 100

          return (
            <G8Card 
              key={quest.id}
              variant="default"
              className={cn(
                "transition-all duration-200 hover:shadow-g8-s",
                quest.completed ? "opacity-75" : "",
                config.borderColor
              )}
            >
              <G8CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-g8-md",
                      config.bgColor
                    )}>
                      <IconComponent className={cn("h-4 w-4", config.color)} />
                    </div>
                    <div>
                      <G8CardTitle className="text-g8-h2 text-g8-text-primary">
                        {quest.title}
                      </G8CardTitle>
                      <p className="text-g8-body text-g8-text-secondary mt-1">
                        {quest.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {quest.completed ? (
                      <G8Badge variant="success" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </G8Badge>
                    ) : (
                      <G8Badge variant="secondary" className="text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        {quest.xpReward} XP
                      </G8Badge>
                    )}
                  </div>
                </div>
              </G8CardHeader>

              <G8CardContent className="pt-0">
                {/* Progress bar */}
                {!quest.completed && quest.maxProgress > 1 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-g8-text-secondary">
                        Progress
                      </span>
                      <span className="text-g8-text-primary font-medium">
                        {quest.progress}/{quest.maxProgress}
                      </span>
                    </div>
                    
                    <div className="relative h-2 bg-g8-surface2 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full bg-gradient-to-r transition-all duration-500 ease-out",
                          config.gradient || "from-g8-primary to-g8-secondary"
                        )}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Time frame */}
                {quest.timeFrame && (
                  <div className="flex items-center gap-1 text-xs text-g8-text-secondary mt-2">
                    <Clock className="h-3 w-3" />
                    <span>{quest.timeFrame}</span>
                  </div>
                )}

                {/* Action button */}
                {!quest.completed && (
                  <div className="mt-3">
                    <G8Button
                      variant="primary"
                      size="sm"
                      onClick={() => onQuestComplete?.(quest.id)}
                      className="w-full"
                    >
                      {quest.progress > 0 ? 'Continue Quest' : 'Start Quest'}
                    </G8Button>
                  </div>
                )}
              </G8CardContent>
            </G8Card>
          )
        })}
      </div>

      {/* Empty state */}
      {filteredQuests.length === 0 && (
        <G8Card variant="glass" className="text-center py-8">
          <G8CardContent>
            <Trophy className="h-12 w-12 text-g8-text-secondary mx-auto mb-4" />
            <h3 className="text-g8-h2 text-g8-text-primary mb-2">
              No Quests Available
            </h3>
            <p className="text-g8-body text-g8-text-secondary">
              Check back later for new quests to earn XP and level up!
            </p>
          </G8CardContent>
        </G8Card>
      )}
    </div>
  )
}
