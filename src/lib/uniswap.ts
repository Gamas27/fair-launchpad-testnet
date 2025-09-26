import { ethers } from 'ethers';

// Uniswap V3 Factory ABI
export const UNISWAP_FACTORY_ABI = [
  "function getPool(address tokenA, address tokenB, uint24 fee) external view returns (address pool)",
  "function createPool(address tokenA, address tokenB, uint24 fee) external returns (address pool)"
];

// Uniswap V3 Pool ABI
export const UNISWAP_POOL_ABI = [
  "function initialize(uint160 sqrtPriceX96) external",
  "function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)",
  "function liquidity() external view returns (uint128)",
  "function token0() external view returns (address)",
  "function token1() external view returns (address)",
  "function fee() external view returns (uint24)"
];

// Uniswap V3 Position Manager ABI
export const POSITION_MANAGER_ABI = [
  "struct MintParams { address token0; address token1; uint24 fee; int24 tickLower; int24 tickUpper; uint256 amount0Desired; uint256 amount1Desired; uint256 amount0Min; uint256 amount1Min; address recipient; uint256 deadline; }",
  "function mint(MintParams calldata params) external payable returns (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1)",
  "function safeTransferFrom(address from, address to, uint256 tokenId) external",
  "function positions(uint256 tokenId) external view returns (uint96 nonce, address operator, address token0, address token1, uint24 fee, int24 tickLower, int24 tickUpper, uint128 liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128, uint128 tokensOwed0, uint128 tokensOwed1)"
];

export interface PoolInfo {
  address: string;
  token0: string;
  token1: string;
  fee: number;
  liquidity: string;
  sqrtPriceX96: string;
  tick: number;
}

export interface PositionInfo {
  tokenId: string;
  liquidity: string;
  amount0: string;
  amount1: string;
  tickLower: number;
  tickUpper: number;
}

export class UniswapService {
  private provider: ethers.providers.Provider;
  private signer: ethers.Signer | null = null;
  private factoryAddress: string;
  private positionManagerAddress: string;

  constructor(
    provider: ethers.providers.Provider,
    factoryAddress: string,
    positionManagerAddress: string,
    signer?: ethers.Signer
  ) {
    this.provider = provider;
    this.signer = signer || null;
    this.factoryAddress = factoryAddress;
    this.positionManagerAddress = positionManagerAddress;
  }

  // Get contract instance
  private getContract(address: string, abi: any[]) {
    if (this.signer) {
      return new ethers.Contract(address, abi, this.signer);
    }
    return new ethers.Contract(address, abi, this.provider);
  }

  // Check if pool exists
  async poolExists(tokenA: string, tokenB: string, fee: number): Promise<boolean> {
    const factory = this.getContract(this.factoryAddress, UNISWAP_FACTORY_ABI);
    const poolAddress = await factory.getPool(tokenA, tokenB, fee);
    return poolAddress !== ethers.constants.AddressZero;
  }

  // Create new pool
  async createPool(tokenA: string, tokenB: string, fee: number): Promise<string> {
    if (!this.signer) throw new Error('Signer required for pool creation');
    
    const factory = this.getContract(this.factoryAddress, UNISWAP_FACTORY_ABI);
    const tx = await factory.createPool(tokenA, tokenB, fee);
    const receipt = await tx.wait();
    
    // Get pool address from event
    const event = receipt.events?.find((e: any) => e.event === 'PoolCreated');
    return event?.args?.pool || await factory.getPool(tokenA, tokenB, fee);
  }

  // Initialize pool with price
  async initializePool(poolAddress: string, sqrtPriceX96: string): Promise<void> {
    if (!this.signer) throw new Error('Signer required for pool initialization');
    
    const pool = this.getContract(poolAddress, UNISWAP_POOL_ABI);
    const tx = await pool.initialize(sqrtPriceX96);
    await tx.wait();
  }

  // Get pool information
  async getPoolInfo(poolAddress: string): Promise<PoolInfo> {
    const pool = this.getContract(poolAddress, UNISWAP_POOL_ABI);
    
    const [token0, token1, fee, liquidity, slot0] = await Promise.all([
      pool.token0(),
      pool.token1(),
      pool.fee(),
      pool.liquidity(),
      pool.slot0()
    ]);

    return {
      address: poolAddress,
      token0,
      token1,
      fee: fee,
      liquidity: liquidity.toString(),
      sqrtPriceX96: slot0.sqrtPriceX96.toString(),
      tick: slot0.tick
    };
  }

  // Add liquidity to pool
  async addLiquidity(params: {
    token0: string;
    token1: string;
    fee: number;
    tickLower: number;
    tickUpper: number;
    amount0Desired: string;
    amount1Desired: string;
    amount0Min: string;
    amount1Min: string;
    recipient: string;
    deadline: number;
  }): Promise<PositionInfo> {
    if (!this.signer) throw new Error('Signer required for adding liquidity');
    
    const positionManager = this.getContract(this.positionManagerAddress, POSITION_MANAGER_ABI);
    
    const tx = await positionManager.mint(params, { value: 0 });
    const receipt = await tx.wait();
    
    // Get position info from event
    const event = receipt.events?.find((e: any) => e.event === 'Transfer');
    const tokenId = event?.args?.tokenId?.toString();
    
    if (!tokenId) throw new Error('Failed to get position token ID');
    
    return {
      tokenId,
      liquidity: '0', // Will be updated after position is created
      amount0: params.amount0Desired,
      amount1: params.amount1Desired,
      tickLower: params.tickLower,
      tickUpper: params.tickUpper
    };
  }

  // Burn liquidity position (send to burn address)
  async burnLiquidityPosition(tokenId: string): Promise<void> {
    if (!this.signer) throw new Error('Signer required for burning position');
    
    const positionManager = this.getContract(this.positionManagerAddress, POSITION_MANAGER_ABI);
    const burnAddress = '0x000000000000000000000000000000000000dEaD';
    
    const tx = await positionManager.safeTransferFrom(
      await this.signer.getAddress(),
      burnAddress,
      tokenId
    );
    await tx.wait();
  }

  // Calculate sqrt price from token price
  calculateSqrtPriceX96(price: string, token0First: boolean): string {
    const priceNum = parseFloat(price);
    const sqrtPrice = Math.sqrt(priceNum);
    const sqrtPriceX96 = Math.floor(sqrtPrice * Math.pow(2, 96));
    return sqrtPriceX96.toString();
  }

  // Calculate optimal tick range for full range
  getFullRangeTicks(): { tickLower: number; tickUpper: number } {
    return {
      tickLower: -887272, // Full range lower tick
      tickUpper: 887272   // Full range upper tick
    };
  }

  // Get position information
  async getPositionInfo(tokenId: string): Promise<PositionInfo> {
    const positionManager = this.getContract(this.positionManagerAddress, POSITION_MANAGER_ABI);
    const position = await positionManager.positions(tokenId);
    
    return {
      tokenId,
      liquidity: position.liquidity.toString(),
      amount0: '0', // Will be calculated from liquidity
      amount1: '0', // Will be calculated from liquidity
      tickLower: position.tickLower,
      tickUpper: position.tickUpper
    };
  }

  // Listen for pool events
  onPoolCreated(callback: (event: any) => void) {
    const factory = this.getContract(this.factoryAddress, UNISWAP_FACTORY_ABI);
    factory.on('PoolCreated', callback);
  }

  // Get pool liquidity information
  async getPoolLiquidity(poolAddress: string): Promise<{
    totalLiquidity: string;
    token0Liquidity: string;
    token1Liquidity: string;
    price: string;
  }> {
    const pool = this.getContract(poolAddress, UNISWAP_POOL_ABI);
    const [liquidity, slot0] = await Promise.all([
      pool.liquidity(),
      pool.slot0()
    ]);

    // Calculate token amounts from liquidity
    const sqrtPriceX96 = slot0.sqrtPriceX96;
    const price = (sqrtPriceX96 / Math.pow(2, 96)) ** 2;
    
    return {
      totalLiquidity: liquidity.toString(),
      token0Liquidity: '0', // Would need to calculate from liquidity
      token1Liquidity: '0', // Would need to calculate from liquidity
      price: price.toString()
    };
  }

  // Check if pool has sufficient liquidity
  async hasSufficientLiquidity(poolAddress: string, minLiquidity: string): Promise<boolean> {
    const liquidity = await this.getPoolLiquidity(poolAddress);
    return parseFloat(liquidity.totalLiquidity) >= parseFloat(minLiquidity);
  }

  // Get pool trading volume (24h)
  async getPoolVolume(poolAddress: string): Promise<{
    volume24h: string;
    volume7d: string;
    trades24h: number;
  }> {
    // This would require additional contract calls or subgraph queries
    // For now, return mock data
    return {
      volume24h: '0',
      volume7d: '0',
      trades24h: 0
    };
  }

  // Get pool price history
  async getPoolPriceHistory(poolAddress: string, hours: number = 24): Promise<{
    timestamp: number;
    price: string;
  }[]> {
    // This would require additional contract calls or subgraph queries
    // For now, return mock data
    return [];
  }

  // Calculate optimal tick range for given price range
  calculateTickRange(
    currentPrice: number,
    priceRangePercent: number = 0.1
  ): { tickLower: number; tickUpper: number } {
    const sqrtPrice = Math.sqrt(currentPrice);
    const sqrtPriceX96 = sqrtPrice * Math.pow(2, 96);
    
    const tick = Math.floor(Math.log(sqrtPriceX96 / Math.pow(2, 96)) / Math.log(1.0001));
    
    const tickSpacing = 60; // 0.3% fee tier
    const tickLower = Math.floor((tick - (tick * priceRangePercent)) / tickSpacing) * tickSpacing;
    const tickUpper = Math.ceil((tick + (tick * priceRangePercent)) / tickSpacing) * tickSpacing;
    
    return { tickLower, tickUpper };
  }

  // Estimate gas cost for pool operations
  async estimateGasCost(operation: 'createPool' | 'addLiquidity' | 'removeLiquidity'): Promise<string> {
    // Mock gas estimates
    const gasEstimates = {
      createPool: '150000',
      addLiquidity: '300000',
      removeLiquidity: '200000'
    };
    
    return gasEstimates[operation] || '100000';
  }

  // Get pool fees earned
  async getPoolFees(poolAddress: string): Promise<{
    fees0: string;
    fees1: string;
    totalFees: string;
  }> {
    // This would require additional contract calls
    // For now, return mock data
    return {
      fees0: '0',
      fees1: '0',
      totalFees: '0'
    };
  }

  // Remove all listeners
  removeAllListeners() {
    // Implementation to remove all event listeners
  }
}

// Export singleton instance
export const uniswapService = new UniswapService(
  new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.testnet.worldchain.org'),
  process.env.NEXT_PUBLIC_UNISWAP_FACTORY_ADDRESS || '0x0000000000000000000000000000000000000000',
  process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS || '0x0000000000000000000000000000000000000000'
);
