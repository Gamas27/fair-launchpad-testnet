import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { G8Card, G8CardContent, G8CardHeader, G8CardTitle } from "@/components/ui/g8-card"
import { G8Button } from "@/components/ui/g8-button"
import { G8Input } from "@/components/ui/g8-input"
import { G8Badge } from "@/components/ui/g8-badge"
import { useReputationStore } from "@/lib/reputation/reputationStore"
import { 
  Users, 
  MessageCircle, 
  Share2, 
  Heart, 
  Star, 
  Flag, 
  Trophy,
  TrendingUp,
  UserPlus,
  Award,
  Zap
} from "lucide-react"

export interface CommunityPost {
  id: string
  author: {
    id: string
    name: string
    avatar: string
    reputationLevel: string
    xp: number
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  isShared: boolean
  type: 'text' | 'trade' | 'achievement' | 'question'
  tags: string[]
}

export interface CommunityStats {
  totalPosts: number
  totalLikes: number
  totalShares: number
  followers: number
  following: number
  reputationRank: number
  communityXP: number
}

interface CommunityFeaturesProps {
  posts: CommunityPost[]
  stats: CommunityStats
  onLike: (postId: string) => void
  onShare: (postId: string) => void
  onComment: (postId: string, comment: string) => void
  onFollow: (userId: string) => void
  className?: string
}

export function CommunityFeatures({ 
  posts, 
  stats, 
  onLike, 
  onShare, 
  onComment, 
  onFollow,
  className 
}: CommunityFeaturesProps) {
  const [activeTab, setActiveTab] = useState<'feed' | 'trending' | 'following'>('feed')
  const [newPost, setNewPost] = useState('')
  const [isPosting, setIsPosting] = useState(false)
  
  const { reputationData } = useReputationStore()

  const handleCreatePost = async () => {
    if (!newPost.trim() || isPosting) return
    
    setIsPosting(true)
    try {
      // Simulate post creation
      await new Promise(resolve => setTimeout(resolve, 1000))
      setNewPost('')
    } catch (error) {
      console.error('Failed to create post:', error)
    } finally {
      setIsPosting(false)
    }
  }

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'trade': return TrendingUp
      case 'achievement': return Trophy
      case 'question': return MessageCircle
      default: return MessageCircle
    }
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'trade': return 'text-g8-success'
      case 'achievement': return 'text-g8-warning'
      case 'question': return 'text-g8-primary'
      default: return 'text-g8-text-secondary'
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-g8-text-primary">
          Community Hub
        </h2>
        <p className="text-g8-text-secondary">
          Connect, share, and grow with the G8 community
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <G8Card variant="gradient" className="text-center">
          <G8CardContent className="pt-4">
            <Users className="h-8 w-8 text-g8-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-g8-text-primary">
              {stats.followers}
            </div>
            <div className="text-sm text-g8-text-secondary">Followers</div>
          </G8CardContent>
        </G8Card>
        
        <G8Card variant="gradient" className="text-center">
          <G8CardContent className="pt-4">
            <Heart className="h-8 w-8 text-g8-error mx-auto mb-2" />
            <div className="text-2xl font-bold text-g8-text-primary">
              {stats.totalLikes}
            </div>
            <div className="text-sm text-g8-text-secondary">Likes</div>
          </G8CardContent>
        </G8Card>
        
        <G8Card variant="gradient" className="text-center">
          <G8CardContent className="pt-4">
            <Share2 className="h-8 w-8 text-g8-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-g8-text-primary">
              {stats.totalShares}
            </div>
            <div className="text-sm text-g8-text-secondary">Shares</div>
          </G8CardContent>
        </G8Card>
        
        <G8Card variant="gradient" className="text-center">
          <G8CardContent className="pt-4">
            <Trophy className="h-8 w-8 text-g8-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-g8-text-primary">
              #{stats.reputationRank}
            </div>
            <div className="text-sm text-g8-text-secondary">Rank</div>
          </G8CardContent>
        </G8Card>
      </div>

      {/* Create Post */}
      <G8Card variant="default">
        <G8CardHeader>
          <G8CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-g8-primary" />
            Create Post
          </G8CardTitle>
        </G8CardHeader>
        <G8CardContent className="space-y-4">
          <G8Input
            placeholder="Share your thoughts, trading insights, or ask a question..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <G8Button variant="outline" size="sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                Trade
              </G8Button>
              <G8Button variant="outline" size="sm">
                <Trophy className="h-4 w-4 mr-1" />
                Achievement
              </G8Button>
              <G8Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-1" />
                Question
              </G8Button>
            </div>
            <G8Button
              variant="primary"
              onClick={handleCreatePost}
              disabled={!newPost.trim() || isPosting}
              loading={isPosting}
            >
              {isPosting ? 'Posting...' : 'Post'}
            </G8Button>
          </div>
        </G8CardContent>
      </G8Card>

      {/* Feed Tabs */}
      <div className="flex gap-2">
        <G8Button
          variant={activeTab === 'feed' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('feed')}
        >
          All Posts
        </G8Button>
        <G8Button
          variant={activeTab === 'trending' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('trending')}
        >
          Trending
        </G8Button>
        <G8Button
          variant={activeTab === 'following' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('following')}
        >
          Following
        </G8Button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => {
          const TypeIcon = getPostTypeIcon(post.type)
          return (
            <G8Card key={post.id} variant="default">
              <G8CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-g8-surface2 rounded-full flex items-center justify-center">
                      <span className="text-g8-text-primary font-semibold">
                        {post.author.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-g8-text-primary">
                          {post.author.name}
                        </span>
                        <G8Badge variant="secondary" className="text-xs">
                          {post.author.reputationLevel}
                        </G8Badge>
                        <G8Badge variant="outline" className="text-xs">
                          {post.author.xp} XP
                        </G8Badge>
                      </div>
                      <div className="text-sm text-g8-text-secondary">
                        {new Date(post.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <TypeIcon className={cn("h-4 w-4", getPostTypeColor(post.type))} />
                    <G8Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onFollow(post.author.id)}
                    >
                      <UserPlus className="h-4 w-4" />
                    </G8Button>
                  </div>
                </div>
              </G8CardHeader>
              
              <G8CardContent className="space-y-4">
                <p className="text-g8-text-primary">{post.content}</p>
                
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag, index) => (
                      <G8Badge key={index} variant="outline" className="text-xs">
                        #{tag}
                      </G8Badge>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <G8Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onLike(post.id)}
                      className={cn(
                        "flex items-center gap-1",
                        post.isLiked ? "text-g8-error" : "text-g8-text-secondary"
                      )}
                    >
                      <Heart className={cn("h-4 w-4", post.isLiked ? "fill-current" : "")} />
                      <span>{post.likes}</span>
                    </G8Button>
                    
                    <G8Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-g8-text-secondary"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </G8Button>
                    
                    <G8Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onShare(post.id)}
                      className={cn(
                        "flex items-center gap-1",
                        post.isShared ? "text-g8-warning" : "text-g8-text-secondary"
                      )}
                    >
                      <Share2 className="h-4 w-4" />
                      <span>{post.shares}</span>
                    </G8Button>
                  </div>
                  
                  <G8Button variant="ghost" size="sm">
                    <Flag className="h-4 w-4" />
                  </G8Button>
                </div>
              </G8CardContent>
            </G8Card>
          )
        })}
      </div>

      {/* Community XP Progress */}
      <G8Card variant="gradient" className="border-g8-primary/30">
        <G8CardHeader>
          <G8CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-g8-primary" />
            Community XP Progress
          </G8CardTitle>
        </G8CardHeader>
        <G8CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-g8-text-secondary">Community XP</span>
              <span className="text-g8-text-primary font-medium">
                {stats.communityXP} / 1000
              </span>
            </div>
            <div className="relative h-2 bg-g8-surface2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-g8-primary to-g8-secondary transition-all duration-500 ease-out"
                style={{ width: `${(stats.communityXP / 1000) * 100}%` }}
              />
            </div>
            <div className="text-sm text-g8-text-secondary">
              Earn XP by engaging with the community: likes, shares, comments, and helpful posts
            </div>
          </div>
        </G8CardContent>
      </G8Card>
    </div>
  )
}
