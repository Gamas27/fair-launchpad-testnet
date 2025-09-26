import { useState, useEffect, useCallback } from 'react';
import { useAccount, useSigner } from 'wagmi';
import { contractService, CONTRACT_ADDRESSES } from '@/lib/contracts';
import { ethers } from 'ethers';

export interface BondingCurveState {
  price: string;
  raised: string;
  supply: string;
  graduated: boolean;
}

export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  maxSupply: string;
  initialPrice: string;
  creator: string;
}

export function useSmartContracts() {
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [bondingCurveState, setBondingCurveState] = useState<BondingCurveState | null>(null);

  // Initialize contract service with signer
  useEffect(() => {
    if (signer) {
      contractService.signer = signer;
    }
  }, [signer]);

  // Load all tokens
  const loadTokens = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const tokenAddresses = await contractService.getAllTokens();
      const tokenInfos: TokenInfo[] = [];
      
      // For each token, get its info (you'll need to implement this)
      for (const tokenAddress of tokenAddresses) {
        // This would require additional contract calls to get token info
        // For now, we'll use mock data
        tokenInfos.push({
          address: tokenAddress,
          name: `Token ${tokenAddress.slice(0, 6)}`,
          symbol: 'TKN',
          maxSupply: '1000000',
          initialPrice: '0.0001',
          creator: '0x...'
        });
      }
      
      setTokens(tokenInfos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tokens');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create new token
  const createToken = useCallback(async (
    name: string,
    symbol: string,
    maxSupply: string,
    initialPrice: string
  ) => {
    if (!isConnected || !signer) {
      throw new Error('Wallet not connected');
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const tx = await contractService.createToken(name, symbol, maxSupply, initialPrice);
      
      // Reload tokens after creation
      await loadTokens();
      
      return tx;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create token');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, signer, loadTokens]);

  // Buy tokens
  const buyTokens = useCallback(async (
    tokenAddress: string,
    wldAmount: string,
    nullifierHash: string,
    proof: number[]
  ) => {
    if (!isConnected || !signer) {
      throw new Error('Wallet not connected');
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const tx = await contractService.buyTokens(tokenAddress, wldAmount, nullifierHash, proof);
      
      // Update bonding curve state after purchase
      await loadBondingCurveState(tokenAddress);
      
      return tx;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to buy tokens');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, signer]);

  // Load bonding curve state
  const loadBondingCurveState = useCallback(async (tokenAddress: string) => {
    try {
      const state = await contractService.getBondingCurveState(tokenAddress);
      setBondingCurveState({
        price: ethers.utils.formatEther(state.price),
        raised: ethers.utils.formatEther(state.raised),
        supply: ethers.utils.formatEther(state.supply),
        graduated: state.graduated
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bonding curve state');
    }
  }, []);

  // Calculate tokens for WLD amount
  const calculateTokensForWLD = useCallback(async (
    tokenAddress: string,
    wldAmount: string
  ) => {
    try {
      const tokens = await contractService.calculateTokensForWLD(tokenAddress, wldAmount);
      return ethers.utils.formatEther(tokens);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate tokens');
      return '0';
    }
  }, []);

  // Check if token is graduated
  const isTokenGraduated = useCallback(async (tokenAddress: string) => {
    try {
      return await contractService.isTokenGraduated(tokenAddress);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check graduation status');
      return false;
    }
  }, []);

  // Get Uniswap pool address
  const getUniswapPool = useCallback(async (tokenAddress: string) => {
    try {
      return await contractService.getUniswapPool(tokenAddress);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get Uniswap pool');
      return null;
    }
  }, []);

  // Set up event listeners
  useEffect(() => {
    if (selectedToken) {
      // Listen for token purchases
      contractService.onTokenPurchased(selectedToken, (event) => {
        console.log('Token purchased:', event);
        // Update bonding curve state
        loadBondingCurveState(selectedToken);
      });

      // Listen for graduation events
      contractService.onGraduationTriggered(selectedToken, (event) => {
        console.log('Token graduated:', event);
        // Update bonding curve state
        loadBondingCurveState(selectedToken);
      });
    }

    // Listen for new token creation
    contractService.onTokenCreated((event) => {
      console.log('New token created:', event);
      // Reload tokens
      loadTokens();
    });

    return () => {
      contractService.removeAllListeners();
    };
  }, [selectedToken, loadBondingCurveState, loadTokens]);

  // Load initial data
  useEffect(() => {
    if (isConnected) {
      loadTokens();
    }
  }, [isConnected, loadTokens]);

  return {
    // State
    isLoading,
    error,
    tokens,
    selectedToken,
    bondingCurveState,
    
    // Actions
    createToken,
    buyTokens,
    loadTokens,
    loadBondingCurveState,
    calculateTokensForWLD,
    isTokenGraduated,
    getUniswapPool,
    setSelectedToken,
    
    // Contract addresses
    contractAddresses: CONTRACT_ADDRESSES,
    
    // Utils
    clearError: () => setError(null)
  };
}

