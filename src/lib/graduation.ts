import { ethers } from 'ethers';

export interface GraduationStatus {
  isGraduated: boolean;
  graduationThreshold: string;
  currentRaised: string;
  progressPercentage: number;
  uniswapPool?: string;
  graduationTime?: number;
}

export interface GraduationEvent {
  tokenAddress: string;
  totalRaised: string;
  uniswapPool: string;
  liquidityAmount: string;
  platformFee: string;
  creatorVesting: string;
  timestamp: number;
}

export class GraduationService {
  private provider: ethers.providers.Provider;
  private signer: ethers.Signer | null = null;
  private graduationThreshold: string = '1000'; // 1000 WLD threshold

  constructor(provider: ethers.providers.Provider, signer?: ethers.Signer) {
    this.provider = provider;
    this.signer = signer || null;
  }

  // Check graduation status for a token
  async getGraduationStatus(tokenAddress: string): Promise<GraduationStatus> {
    try {
      // Mock implementation - replace with actual contract calls
      const mockState = {
        raised: ethers.utils.parseEther('500'), // 500 WLD raised
        graduated: false
      };
      
      const currentRaised = ethers.utils.formatEther(mockState.raised);
      const progressPercentage = Math.min(
        (parseFloat(currentRaised) / parseFloat(this.graduationThreshold)) * 100,
        100
      );

      return {
        isGraduated: mockState.graduated,
        graduationThreshold: this.graduationThreshold,
        currentRaised,
        progressPercentage,
        uniswapPool: mockState.graduated ? '0x...' : undefined,
        graduationTime: mockState.graduated ? Date.now() : undefined
      };
    } catch (error) {
      console.error('Failed to get graduation status:', error);
      throw error;
    }
  }

  // Monitor graduation threshold
  async monitorGraduationThreshold(
    tokenAddress: string,
    callback: (status: GraduationStatus) => void
  ): Promise<void> {
    const checkStatus = async () => {
      try {
        const status = await this.getGraduationStatus(tokenAddress);
        callback(status);
        
        // If not graduated, check again in 30 seconds
        if (!status.isGraduated) {
          setTimeout(checkStatus, 30000);
        }
      } catch (error) {
        console.error('Failed to monitor graduation:', error);
        // Retry in 60 seconds on error
        setTimeout(checkStatus, 60000);
      }
    };

    // Start monitoring
    checkStatus();
  }

  // Listen for graduation events
  onGraduationEvent(tokenAddress: string, callback: (event: GraduationEvent) => void): void {
    // Mock event listener - replace with actual contract event listening
    console.log('Listening for graduation events on token:', tokenAddress);
  }

  // Calculate graduation progress
  calculateProgress(currentRaised: string, threshold: string): number {
    const current = parseFloat(currentRaised);
    const thresh = parseFloat(threshold);
    return Math.min((current / thresh) * 100, 100);
  }

  // Get time until graduation (estimate)
  getTimeUntilGraduation(currentRaised: string, threshold: string, recentTrades: any[]): number {
    if (recentTrades.length === 0) return -1; // No recent trades

    const current = parseFloat(currentRaised);
    const thresh = parseFloat(threshold);
    const remaining = thresh - current;
    
    if (remaining <= 0) return 0; // Already graduated

    // Calculate average trade size from recent trades
    const avgTradeSize = recentTrades.reduce((sum, trade) => sum + parseFloat(trade.amount), 0) / recentTrades.length;
    
    // Calculate trades per minute
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    const recentTradesCount = recentTrades.filter(trade => trade.timestamp > oneMinuteAgo).length;
    
    if (recentTradesCount === 0) return -1; // No recent activity

    const tradesNeeded = Math.ceil(remaining / avgTradeSize);
    const minutesUntilGraduation = tradesNeeded / recentTradesCount;
    
    return Math.round(minutesUntilGraduation * 60 * 1000); // Return in milliseconds
  }

  // Get graduation analytics
  async getGraduationAnalytics(tokenAddress: string): Promise<{
    totalRaised: string;
    graduationThreshold: string;
    progressPercentage: number;
    timeUntilGraduation: number;
    recentTrades: any[];
    isGraduated: boolean;
    uniswapPool?: string;
  }> {
    const status = await this.getGraduationStatus(tokenAddress);
    
    // Get recent trades (mock data)
    const recentTrades: any[] = []; // Placeholder
    
    const timeUntilGraduation = this.getTimeUntilGraduation(
      status.currentRaised,
      status.graduationThreshold,
      recentTrades
    );

    return {
      totalRaised: status.currentRaised,
      graduationThreshold: status.graduationThreshold,
      progressPercentage: status.progressPercentage,
      timeUntilGraduation,
      recentTrades,
      isGraduated: status.isGraduated,
      uniswapPool: status.uniswapPool
    };
  }

  // Validate graduation parameters
  validateGraduationParameters(
    wldAmount: string,
    tokenAmount: string,
    finalPrice: string
  ): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (parseFloat(wldAmount) <= 0) {
      errors.push('WLD amount must be greater than 0');
    }
    
    if (parseFloat(tokenAmount) <= 0) {
      errors.push('Token amount must be greater than 0');
    }
    
    if (parseFloat(finalPrice) <= 0) {
      errors.push('Final price must be greater than 0');
    }
    
    // Check if amounts are reasonable
    const wld = parseFloat(wldAmount);
    const tokens = parseFloat(tokenAmount);
    const price = parseFloat(finalPrice);
    
    if (wld / tokens !== price) {
      errors.push('WLD amount and token amount must match the final price');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Get graduation history
  async getGraduationHistory(): Promise<GraduationEvent[]> {
    // Mock data - replace with actual blockchain queries
    return [];
  }

  // Check if token is ready for graduation
  async isReadyForGraduation(tokenAddress: string): Promise<boolean> {
    const status = await this.getGraduationStatus(tokenAddress);
    return parseFloat(status.currentRaised) >= parseFloat(status.graduationThreshold);
  }

  // Get graduation statistics
  async getGraduationStats(): Promise<{
    totalTokensGraduated: number;
    totalLiquidityLocked: string;
    averageGraduationTime: number;
    graduationSuccessRate: number;
  }> {
    // Mock data - replace with actual blockchain queries
    return {
      totalTokensGraduated: 0,
      totalLiquidityLocked: '0',
      averageGraduationTime: 0,
      graduationSuccessRate: 100
    };
  }
}

// Export singleton instance
export const graduationService = new GraduationService(
  new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.testnet.worldchain.org')
);

