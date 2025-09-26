import React from 'react';
import { useGraduation } from '@/hooks/useGraduation';
import { useSmartContracts } from '@/hooks/useSmartContracts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  ExternalLink,
  Lock,
  DollarSign,
  Users,
  BarChart3,
  Activity,
  Zap
} from 'lucide-react';

interface GraduationDashboardProps {
  tokenAddress: string;
  className?: string;
}

export function GraduationDashboard({ tokenAddress, className }: GraduationDashboardProps) {
  const {
    graduationStatus,
    graduationEvents,
    isLoading,
    error,
    progressPercentage,
    isGraduated,
    getAnalytics,
    getStats
  } = useGraduation(tokenAddress);

  const { tokens } = useSmartContracts();
  const [analytics, setAnalytics] = React.useState<any>(null);
  const [stats, setStats] = React.useState<any>(null);

  React.useEffect(() => {
    if (tokenAddress) {
      getAnalytics().then(setAnalytics);
      getStats().then(setStats);
    }
  }, [tokenAddress, getAnalytics, getStats]);

  const formatAmount = (amount: string) => {
    const num = parseFloat(amount);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(2);
  };

  const formatTime = (milliseconds: number) => {
    if (milliseconds < 0) return 'Unknown';
    
    const minutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
  };

  if (isLoading) {
    return (
      <div className={className}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-red-500 text-center">
            <p>Failed to load graduation dashboard</p>
            <p className="text-sm text-gray-500 mt-1">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cyan-500" />
              <span>Graduation Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-500">
                  {progressPercentage.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-500">
                  {isGraduated ? 'Graduated' : 'Complete'}
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatAmount(graduationStatus?.currentRaised || '0')} WLD</span>
                <span>{formatAmount(graduationStatus?.graduationThreshold || '1000')} WLD</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isGraduated ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Status</span>
                </>
              ) : (
                <>
                  <Clock className="h-5 w-5 text-cyan-500" />
                  <span>Status</span>
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                {isGraduated ? (
                  <Badge variant="default" className="bg-green-500 text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Graduated
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-cyan-500 text-cyan-500">
                    <Clock className="h-3 w-3 mr-1" />
                    In Progress
                  </Badge>
                )}
              </div>
              
              {isGraduated && graduationStatus?.uniswapPool && (
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Uniswap Pool</div>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {graduationStatus.uniswapPool.slice(0, 6)}...{graduationStatus.uniswapPool.slice(-4)}
                  </code>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Analytics Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-500" />
              <span>Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-sm">Raised</span>
                      </div>
                      <div className="font-medium">
                        {formatAmount(analytics.totalRaised || '0')} WLD
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">Trades</span>
                      </div>
                      <div className="font-medium">
                        {analytics.recentTrades?.length || 0}
                      </div>
                    </div>
                  </div>
                  
                  {analytics.timeUntilGraduation > 0 && (
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">Est. Time</span>
                      </div>
                      <div className="font-medium">
                        {formatTime(analytics.timeUntilGraduation)}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Liquidity Lock Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-orange-500" />
              <span>Liquidity Lock</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">85%</div>
                <div className="text-sm text-gray-500">WLD Locked</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">15%</div>
                <div className="text-sm text-gray-500">Token Supply</div>
              </div>
              
              <div className="text-center">
                <Badge variant="outline" className="border-orange-500 text-orange-500">
                  <Zap className="h-3 w-3 mr-1" />
                  Permanent Lock
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Events Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <span>Recent Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {graduationEvents.length > 0 ? (
                graduationEvents.slice(0, 3).map((event, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">
                      Graduated with {formatAmount(event.liquidityAmount)} WLD
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 text-sm">
                  No recent events
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Statistics Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              <span>Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats && (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">
                      {stats.totalTokensGraduated || 0}
                    </div>
                    <div className="text-sm text-gray-500">Tokens Graduated</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">
                      {formatAmount(stats.totalLiquidityLocked || '0')} WLD
                    </div>
                    <div className="text-sm text-gray-500">Liquidity Locked</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">
                      {stats.graduationSuccessRate || 100}%
                    </div>
                    <div className="text-sm text-gray-500">Success Rate</div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

