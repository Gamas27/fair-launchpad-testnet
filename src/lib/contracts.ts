import { ethers } from 'ethers';

// Contract ABIs (you'll need to get these from deployed contracts)
export const GRADUATION_HANDLER_ABI = [
  "function graduateToUniswap(address tokenAddress, address wldToken, uint256 finalPrice, uint256 wldAmount, uint256 tokenAmount) external returns (address)",
  "event PoolCreated(address indexed token0, address indexed token1, address indexed pool, uint160 sqrtPriceX96)",
  "event LiquidityAdded(uint256 indexed tokenId, uint128 liquidity, uint256 amount0, uint256 amount1)",
  "event LiquidityBurned(uint256 indexed tokenId)",
  "event GraduationCompleted(address indexed token, address indexed pool, uint256 wldAmount, uint256 tokenAmount)"
];

export const TOKEN_FACTORY_ABI = [
  "function createToken(string memory name, string memory symbol, uint256 maxSupply, uint256 initialPrice) external",
  "function getTokenCount() external view returns (uint256)",
  "function getCreatorTokens(address creator) external view returns (address[])",
  "function getAllTokens() external view returns (address[])",
  "function getCreationFee() external view returns (uint256)",
  "event TokenCreated(address indexed token, address indexed creator, string name, string symbol, uint256 maxSupply, uint256 initialPrice)"
];

export const BONDING_CURVE_ABI = [
  "function buy(uint256 wldAmount, uint256 nullifierHash, uint256[8] calldata proof) external",
  "function getState() external view returns (uint256 price, uint256 raised, uint256 supply, bool graduated)",
  "function calculateTokensForWLD(uint256 wldAmount) external view returns (uint256)",
  "function currentPrice() external view returns (uint256)",
  "function totalRaisedWLD() external view returns (uint256)",
  "function isGraduated() external view returns (bool)",
  "function uniswapPool() external view returns (address)",
  "event TokenPurchased(address indexed buyer, uint256 wldAmount, uint256 tokenAmount, uint256 newPrice, uint256 totalRaised)",
  "event GraduationTriggered(uint256 totalRaised, address uniswapPool, uint256 liquidityAmount, uint256 platformFee, uint256 creatorVesting)"
];

// Contract addresses (update these with your deployed addresses)
export const CONTRACT_ADDRESSES = {
  GRADUATION_HANDLER: process.env.NEXT_PUBLIC_GRADUATION_HANDLER_ADDRESS || '0xDA0bab807633f07f013f94DD0E6A4F96F8742B53',
  TOKEN_FACTORY: process.env.NEXT_PUBLIC_TOKEN_FACTORY_ADDRESS || '0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47',
  BONDING_CURVE: process.env.NEXT_PUBLIC_BONDING_CURVE_ADDRESS || '0xd9145CCE52D386f254917e481eB44e9943F39138',
  WLD_TOKEN: process.env.NEXT_PUBLIC_WLD_TOKEN_ADDRESS || '0x0000000000000000000000000000000000000000',
  WORLD_ID: process.env.NEXT_PUBLIC_WORLD_ID_ADDRESS || '0x0000000000000000000000000000000000000000',
  UNISWAP_FACTORY: process.env.NEXT_PUBLIC_UNISWAP_FACTORY_ADDRESS || '0x0000000000000000000000000000000000000000',
  POSITION_MANAGER: process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS || '0x0000000000000000000000000000000000000000'
};

// Contract instances
export class ContractService {
  private provider: ethers.providers.Provider;
  private signer: ethers.Signer | null = null;

  constructor(provider: ethers.providers.Provider, signer?: ethers.Signer) {
    this.provider = provider;
    this.signer = signer || null;
  }

  // Get contract instance
  private getContract(address: string, abi: any[]) {
    if (this.signer) {
      return new ethers.Contract(address, abi, this.signer);
    }
    return new ethers.Contract(address, abi, this.provider);
  }

  // Token Factory methods
  async createToken(name: string, symbol: string, maxSupply: string, initialPrice: string) {
    if (!this.signer) throw new Error('Signer required for token creation');
    
    const factory = this.getContract(CONTRACT_ADDRESSES.TOKEN_FACTORY, TOKEN_FACTORY_ABI);
    const tx = await factory.createToken(name, symbol, ethers.utils.parseEther(maxSupply), ethers.utils.parseEther(initialPrice));
    return await tx.wait();
  }

  async getTokenCount() {
    const factory = this.getContract(CONTRACT_ADDRESSES.TOKEN_FACTORY, TOKEN_FACTORY_ABI);
    return await factory.getTokenCount();
  }

  async getAllTokens() {
    const factory = this.getContract(CONTRACT_ADDRESSES.TOKEN_FACTORY, TOKEN_FACTORY_ABI);
    return await factory.getAllTokens();
  }

  // Bonding Curve methods
  async buyTokens(tokenAddress: string, wldAmount: string, nullifierHash: string, proof: number[]) {
    if (!this.signer) throw new Error('Signer required for token purchase');
    
    const bondingCurve = this.getContract(tokenAddress, BONDING_CURVE_ABI);
    const tx = await bondingCurve.buy(
      ethers.utils.parseEther(wldAmount),
      nullifierHash,
      proof
    );
    return await tx.wait();
  }

  async getBondingCurveState(tokenAddress: string) {
    const bondingCurve = this.getContract(tokenAddress, BONDING_CURVE_ABI);
    return await bondingCurve.getState();
  }

  async calculateTokensForWLD(tokenAddress: string, wldAmount: string) {
    const bondingCurve = this.getContract(tokenAddress, BONDING_CURVE_ABI);
    return await bondingCurve.calculateTokensForWLD(ethers.utils.parseEther(wldAmount));
  }

  async isTokenGraduated(tokenAddress: string) {
    const bondingCurve = this.getContract(tokenAddress, BONDING_CURVE_ABI);
    return await bondingCurve.isGraduated();
  }

  async getUniswapPool(tokenAddress: string) {
    const bondingCurve = this.getContract(tokenAddress, BONDING_CURVE_ABI);
    return await bondingCurve.uniswapPool();
  }

  // Graduation Handler methods
  async graduateToken(tokenAddress: string, wldAmount: string, tokenAmount: string) {
    if (!this.signer) throw new Error('Signer required for graduation');
    
    const graduationHandler = this.getContract(CONTRACT_ADDRESSES.GRADUATION_HANDLER, GRADUATION_HANDLER_ABI);
    const bondingCurve = this.getContract(tokenAddress, BONDING_CURVE_ABI);
    const state = await bondingCurve.getState();
    
    const tx = await graduationHandler.graduateToUniswap(
      tokenAddress,
      CONTRACT_ADDRESSES.WLD_TOKEN,
      state.price,
      ethers.utils.parseEther(wldAmount),
      ethers.utils.parseEther(tokenAmount)
    );
    return await tx.wait();
  }

  // Event listeners
  onTokenPurchased(tokenAddress: string, callback: (event: any) => void) {
    const bondingCurve = this.getContract(tokenAddress, BONDING_CURVE_ABI);
    bondingCurve.on('TokenPurchased', callback);
  }

  onGraduationTriggered(tokenAddress: string, callback: (event: any) => void) {
    const bondingCurve = this.getContract(tokenAddress, BONDING_CURVE_ABI);
    bondingCurve.on('GraduationTriggered', callback);
  }

  onTokenCreated(callback: (event: any) => void) {
    const factory = this.getContract(CONTRACT_ADDRESSES.TOKEN_FACTORY, TOKEN_FACTORY_ABI);
    factory.on('TokenCreated', callback);
  }

  // Remove listeners
  removeAllListeners() {
    // Implementation to remove all event listeners
  }
}

// Export singleton instance
export const contractService = new ContractService(
  new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.worldchain.org')
);

