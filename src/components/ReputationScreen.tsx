import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getReputationLevel, calculateAllocationCap } from "@/lib/utils"
import { Shield, Trophy, Star, Target, Award, History, Users, Gift } from "lucide-react"
import { User, ReputationQuest, Achievement } from "@/types"

interface ReputationScreenProps {
  user: User
  quests: ReputationQuest[]
  achievements: Achievement[]
}

export default function ReputationScreen({ user, quests, achievements }: ReputationScreenProps) {
  const reputationInfo = getReputationLevel(user.xp)
  const nextLevelXp = reputationInfo.nextLevelXp
  const progressToNext = nextLevelXp === Infinity ? 100 : (user.xp / nextLevelXp) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-cyan-400" />
            <span className="text-2xl font-bold gradient-text">FairLaunch</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Current: {reputationInfo.level} {reputationInfo.icon}</span>
            <span className="text-sm text-cyan-400">XP: {user.xp.toLocaleString('en-US')}</span>
          </div>
        </header>

        {/* Reputation Overview */}
        <Card className="bg-card/50 backdrop-blur-sm border-purple-500/20 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-purple-400" />
              Reputation System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-center mb-4">
                  <div className="text-6xl mb-2">{reputationInfo.icon}</div>
                  <div className="text-2xl font-bold text-purple-400">{reputationInfo.level} HUMAN</div>
                  <div className="text-sm text-gray-400">Level {reputationInfo.level}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Current XP</span>
                    <span className="font-bold">{user.xp.toLocaleString('en-US')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Allocation Cap</span>
                    <span className="font-bold text-cyan-400">{calculateAllocationCap(reputationInfo.level)} WLD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verification Level</span>
                    <span className="font-bold text-green-400">{user.verificationLevel}</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress to Next Level</span>
                    <span>{nextLevelXp === Infinity ? 'Max Level' : `${user.xp}/${nextLevelXp}`}</span>
                  </div>
                  <Progress value={progressToNext} className="h-3" />
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-400" />
                      <span className="font-medium">Device Verified</span>
                      <span className="ml-auto text-green-400">✅</span>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-yellow-400" />
                      <span className="font-medium">Phone Verified</span>
                      <span className="ml-auto text-yellow-400">🔒</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-400" />
                      <span className="font-medium">Orb Verified</span>
                      <span className="ml-auto text-blue-400">🔒</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Level Progression */}
        <Card className="bg-card/50 backdrop-blur-sm border-cyan-500/20 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-cyan-400" />
              Level Progression
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`p-4 rounded-lg border ${user.reputationLevel === 'Bronze' ? 'bg-amber-500/10 border-amber-500/30' : 'bg-gray-500/10 border-gray-500/20'}`}>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🥉</div>
                    <div className="font-bold text-amber-600">BRONZE HUMAN</div>
                    <div className="text-sm text-gray-400">Cap: 200 WLD</div>
                    <div className="text-xs text-gray-500">0-999 XP</div>
                  </div>
                </div>
                <div className={`p-4 rounded-lg border ${user.reputationLevel === 'Silver' ? 'bg-gray-400/10 border-gray-400/30' : 'bg-gray-500/10 border-gray-500/20'}`}>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🥈</div>
                    <div className="font-bold text-gray-400">SILVER HUMAN</div>
                    <div className="text-sm text-gray-400">Cap: 500 WLD</div>
                    <div className="text-xs text-gray-500">1,000-2,499 XP</div>
                  </div>
                </div>
                <div className={`p-4 rounded-lg border ${user.reputationLevel === 'Gold' ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-gray-500/10 border-gray-500/20'}`}>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🥇</div>
                    <div className="font-bold text-yellow-500">GOLD HUMAN</div>
                    <div className="text-sm text-gray-400">Cap: 1,000 WLD</div>
                    <div className="text-xs text-gray-500">2,500-4,999 XP</div>
                  </div>
                </div>
                <div className={`p-4 rounded-lg border ${user.reputationLevel === 'Diamond' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-gray-500/10 border-gray-500/20'}`}>
                  <div className="text-center">
                    <div className="text-3xl mb-2">💎</div>
                    <div className="font-bold text-blue-400">DIAMOND HUMAN</div>
                    <div className="text-sm text-gray-400">Cap: 2,500 WLD</div>
                    <div className="text-xs text-gray-500">5,000+ XP</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Level Up Quests */}
        <Card className="bg-card/50 backdrop-blur-sm border-green-500/20 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-6 w-6 text-green-400" />
              Level Up Quests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quests.map((quest) => (
                <div key={quest.id} className="p-4 rounded-lg border border-gray-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{quest.completed ? '✅' : '🎯'}</span>
                      <span className="font-medium">{quest.title}</span>
                    </div>
                    <span className="text-sm text-gray-400">{quest.reward}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{quest.description}</p>
                  <div className="flex items-center gap-4">
                    <Progress value={quest.progress && quest.maxProgress ? (quest.progress / quest.maxProgress) * 100 : 0} className="flex-1" />
                    <span className="text-sm font-medium">{quest.progress || 0}/{quest.maxProgress || 0}</span>
                    {!quest.completed && (
                      <Button variant="outline" size="sm">
                        Start Quest
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-card/50 backdrop-blur-sm border-yellow-500/20 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6 text-yellow-400" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`p-4 rounded-lg border text-center ${achievement.unlocked ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-gray-500/10 border-gray-500/20'}`}>
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <div className="font-medium mb-1">{achievement.title}</div>
                  <div className="text-xs text-gray-400 mb-2">{achievement.description}</div>
                  {achievement.unlocked && (
                    <div className="text-xs text-green-400">✅ Unlocked</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg">
            <History className="h-5 w-5 mr-2" />
            Reputation History
          </Button>
          <Button variant="outline" size="lg">
            <Users className="h-5 w-5 mr-2" />
            Leaderboard
          </Button>
          <Button variant="outline" size="lg">
            <Gift className="h-5 w-5 mr-2" />
            Rewards
          </Button>
        </div>
      </div>
    </div>
  )
}
