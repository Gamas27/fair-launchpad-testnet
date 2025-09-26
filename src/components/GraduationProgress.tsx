import React from 'react';
import { useGraduation } from '@/hooks/useGraduation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  ExternalLink,
  Lock,
  DollarSign,
  Users
} from 'lucide-react';

interface GraduationProgressProps {
  tokenAddress: string;
  className?: string;
}

export function GraduationProgress({ tokenAddress, className }: GraduationProgressProps) {
  const {
    graduationStatus,
    isLoading,
    error,
    progressPercentage,
    isGraduated,
    timeUntilGraduation,
    getAnalytics
  } = useGraduation(tokenAddress);

  const [analytics, setAnalytics] = React.useState<any>(null);

  React.useEffect(() => {
    if (tokenAddress) {
      getAnalytics().then(setAnalytics);
    }
  }, [tokenAddress, getAnalytics]);

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
            <span className="ml-2">Loading graduation status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-red-500 text-center">
            <p>Failed to load graduation status</p>
            <p className="text-sm text-gray-500 mt-1">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!graduationStatus) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">
            No graduation data available
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatTime = (milliseconds: number) => {
    if (milliseconds < 0) return 'Unknown';
    
    const minutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
  };

  const formatAmount = (amount: string) => {
    const num = parseFloat(amount);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(2);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isGraduated ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Token Graduated</span>
            </>
          ) : (
            <>
              <TrendingUp className="h-5 w-5 text-cyan-500" />
              <span>Graduation Progress</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to Graduation</span>
            <span className="font-medium">{progressPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatAmount(graduationStatus.currentRaised)} WLD raised</span>
            <span>{formatAmount(graduationStatus.graduationThreshold)} WLD target</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex justify-center">
          {isGraduated ? (
            <Badge variant="default" className="bg-green-500 text-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              Graduated to Uniswap
            </Badge>
          ) : (
            <Badge variant="outline" className="border-cyan-500 text-cyan-500">
              <Clock className="h-3 w-3 mr-1" />
              In Progress
            </Badge>
          )}
        </div>

        {/* Graduation Details */}
        {isGraduated ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-700 mb-2">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">Graduation Complete!</span>
              </div>
              <p className="text-sm text-green-600">
                This token has successfully graduated to Uniswap V3 with locked liquidity.
              </p>
            </div>

            {graduationStatus.uniswapPool && (
              <div className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Uniswap Pool:</span>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {graduationStatus.uniswapPool.slice(0, 6)}...{graduationStatus.uniswapPool.slice(-4)}
                </code>
              </div>
            )}

            {graduationStatus.graduationTime && (
              <div className="text-sm text-gray-500">
                Graduated: {new Date(graduationStatus.graduationTime).toLocaleString()}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Time Estimate */}
            {timeUntilGraduation > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-700 mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">Estimated Time</span>
                </div>
                <p className="text-sm text-blue-600">
                  {formatTime(timeUntilGraduation)} until graduation
                </p>
              </div>
            )}

            {/* Analytics */}
            {analytics && (
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">Raised</span>
                  </div>
                  <div className="font-medium">
                    {formatAmount(analytics.totalRaised)} WLD
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
            )}

            {/* Liquidity Lock Info */}
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-cyan-700 mb-1">
                <Lock className="h-4 w-4" />
                <span className="font-medium">Liquidity Lock</span>
              </div>
              <p className="text-sm text-cyan-600">
                Upon graduation, 85% of raised WLD + 15% of token supply will be permanently locked in Uniswap V3.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

