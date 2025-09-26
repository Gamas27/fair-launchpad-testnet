import { useState, useEffect, useCallback } from 'react';
import { useAccount, useSigner } from 'wagmi';
import { graduationService, GraduationStatus, GraduationEvent } from '@/lib/graduation';

export function useGraduation(tokenAddress?: string) {
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [graduationStatus, setGraduationStatus] = useState<GraduationStatus | null>(null);
  const [graduationEvents, setGraduationEvents] = useState<GraduationEvent[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  // Initialize graduation service with signer
  useEffect(() => {
    if (signer) {
      graduationService.signer = signer;
    }
  }, [signer]);

  // Load graduation status
  const loadGraduationStatus = useCallback(async () => {
    if (!tokenAddress) return;

    try {
      setIsLoading(true);
      setError(null);
      
      const status = await graduationService.getGraduationStatus(tokenAddress);
      setGraduationStatus(status);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load graduation status');
    } finally {
      setIsLoading(false);
    }
  }, [tokenAddress]);

  // Start monitoring graduation threshold
  const startMonitoring = useCallback(() => {
    if (!tokenAddress || isMonitoring) return;

    setIsMonitoring(true);
    
    graduationService.monitorGraduationThreshold(tokenAddress, (status) => {
      setGraduationStatus(status);
      
      if (status.isGraduated) {
        setIsMonitoring(false);
      }
    });
  }, [tokenAddress, isMonitoring]);

  // Stop monitoring
  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
  }, []);

  // Check if ready for graduation
  const isReadyForGraduation = useCallback(async (): Promise<boolean> => {
    if (!tokenAddress) return false;
    
    try {
      return await graduationService.isReadyForGraduation(tokenAddress);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check graduation readiness');
      return false;
    }
  }, [tokenAddress]);

  // Get graduation analytics
  const getAnalytics = useCallback(async () => {
    if (!tokenAddress) return null;
    
    try {
      return await graduationService.getGraduationAnalytics(tokenAddress);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get graduation analytics');
      return null;
    }
  }, [tokenAddress]);

  // Get graduation history
  const loadGraduationHistory = useCallback(async () => {
    try {
      const history = await graduationService.getGraduationHistory();
      setGraduationEvents(history);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load graduation history');
    }
  }, []);

  // Get graduation statistics
  const getStats = useCallback(async () => {
    try {
      return await graduationService.getGraduationStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get graduation statistics');
      return null;
    }
  }, []);

  // Set up event listeners
  useEffect(() => {
    if (tokenAddress) {
      // Listen for graduation events
      graduationService.onGraduationEvent(tokenAddress, (event) => {
        setGraduationEvents(prev => [event, ...prev]);
        setGraduationStatus(prev => prev ? { ...prev, isGraduated: true } : null);
      });
    }
  }, [tokenAddress]);

  // Load initial data
  useEffect(() => {
    if (tokenAddress && isConnected) {
      loadGraduationStatus();
      loadGraduationHistory();
    }
  }, [tokenAddress, isConnected, loadGraduationStatus, loadGraduationHistory]);

  // Auto-start monitoring when token is selected
  useEffect(() => {
    if (tokenAddress && graduationStatus && !graduationStatus.isGraduated) {
      startMonitoring();
    }
  }, [tokenAddress, graduationStatus, startMonitoring]);

  return {
    // State
    isLoading,
    error,
    graduationStatus,
    graduationEvents,
    isMonitoring,
    
    // Actions
    loadGraduationStatus,
    startMonitoring,
    stopMonitoring,
    isReadyForGraduation,
    getAnalytics,
    loadGraduationHistory,
    getStats,
    
    // Utils
    clearError: () => setError(null),
    
    // Computed values
    progressPercentage: graduationStatus?.progressPercentage || 0,
    isGraduated: graduationStatus?.isGraduated || false,
    timeUntilGraduation: graduationStatus?.progressPercentage ? 
      (100 - graduationStatus.progressPercentage) * 10 : 0, // Rough estimate
  };
}

