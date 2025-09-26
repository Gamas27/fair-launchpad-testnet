// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IUniswapV3Factory.sol";
import "./interfaces/IUniswapV3Pool.sol";
import "./interfaces/INonfungiblePositionManager.sol";

/**
 * @title GraduationHandlerOptimized
 * @dev Gas-optimized version of the graduation handler contract
 * @notice Optimizations include:
 * - Packed structs for storage efficiency
 * - Batch operations for gas efficiency
 * - Optimized Uniswap interactions
 * - Reduced external calls
 * - Efficient event emissions
 */
contract GraduationHandlerOptimized is Ownable, ReentrancyGuard {
    // Immutable addresses for gas efficiency
    IERC20 public immutable token;
    IERC20 public immutable wldToken;
    IUniswapV3Factory public immutable uniswapFactory;
    INonfungiblePositionManager public immutable positionManager;
    address public immutable platformFeeRecipient;
    address public immutable creatorVestingRecipient;

    // Packed struct for gas efficiency
    struct GraduationState {
        address uniswapPool;
        bool isGraduated;
        uint128 totalWLD;        // Using uint128 for gas efficiency
        uint128 totalTokens;     // Using uint128 for gas efficiency
    }
    
    // Fee distribution constants - using uint8 for gas efficiency
    uint8 public constant PLATFORM_FEE_PERCENT = 10;
    uint8 public constant CREATOR_VESTING_PERCENT = 7;
    uint8 public constant LIQUIDITY_PERCENT = 83;
    uint8 public constant TOKEN_LIQUIDITY_PERCENT = 15;
    
    // State variables
    GraduationState public graduationState;
    
    // Events - optimized for gas efficiency
    event UniswapPoolCreated(address indexed pool, address indexed token0, address indexed token1, uint24 fee);
    event LiquidityAdded(uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1);
    event LPNFTBurned(uint256 tokenId);
    event FeesDistributed(uint256 platformFee, uint256 creatorFee);
    event GraduationCompleted(address indexed token, address indexed pool, uint256 wldAmount, uint256 tokenAmount);

    constructor(
        address _token,
        address _wldToken,
        address _uniswapFactory,
        address _positionManager,
        address _platformFeeRecipient,
        address _creatorVestingRecipient
    ) Ownable(msg.sender) {
        // Batch validation for gas efficiency
        require(_token != address(0) && _wldToken != address(0) && 
                _uniswapFactory != address(0) && _positionManager != address(0) &&
                _platformFeeRecipient != address(0) && _creatorVestingRecipient != address(0),
                "Invalid addresses");

        token = IERC20(_token);
        wldToken = IERC20(_wldToken);
        uniswapFactory = IUniswapV3Factory(_uniswapFactory);
        positionManager = INonfungiblePositionManager(_positionManager);
        platformFeeRecipient = _platformFeeRecipient;
        creatorVestingRecipient = _creatorVestingRecipient;
        
        // Initialize state
        graduationState = GraduationState({
            uniswapPool: address(0),
            isGraduated: false,
            totalWLD: 0,
            totalTokens: 0
        });
    }

    /**
     * @dev Gas-optimized graduation handler
     */
    function handleGraduation(uint256 finalPrice, uint256 totalTokenSupply) external onlyOwner nonReentrant returns (address) {
        require(!graduationState.isGraduated, "Already graduated");
        require(graduationState.uniswapPool == address(0), "Uniswap pool already created");

        uint256 totalWLD = wldToken.balanceOf(address(this));
        require(totalWLD > 0, "No WLD raised for graduation");
        require(totalTokenSupply > 0, "No tokens minted for graduation");

        // Batch fee calculations for gas efficiency
        (uint256 platformFee, uint256 creatorFee, uint256 liquidityWLD) = _calculateFees(totalWLD);
        uint256 tokenLiquidityAmount = (totalTokenSupply * TOKEN_LIQUIDITY_PERCENT) / 100;
        
        // Validate minimum requirements
        require(liquidityWLD >= (totalWLD * 80) / 100, "Insufficient liquidity allocation");
        require(platformFee > 0 && creatorFee > 0, "Invalid fee amounts");
        require(tokenLiquidityAmount > 0, "Token liquidity amount must be greater than 0");

        // Batch operations for gas efficiency
        _distributeFees(platformFee, creatorFee);
        _createAndInitializePool(finalPrice);
        _addLiquidity(liquidityWLD, tokenLiquidityAmount);
        
        // Update state in single operation
        graduationState = GraduationState({
            uniswapPool: graduationState.uniswapPool,
            isGraduated: true,
            totalWLD: uint128(totalWLD),
            totalTokens: uint128(totalTokenSupply)
        });

        emit GraduationCompleted(address(token), graduationState.uniswapPool, liquidityWLD, tokenLiquidityAmount);
        
        return graduationState.uniswapPool;
    }

    /**
     * @dev Gas-optimized fee calculation
     */
    function _calculateFees(uint256 totalWLD) internal pure returns (uint256 platformFee, uint256 creatorFee, uint256 liquidityWLD) {
        platformFee = (totalWLD * PLATFORM_FEE_PERCENT) / 100;
        creatorFee = (totalWLD * CREATOR_VESTING_PERCENT) / 100;
        liquidityWLD = totalWLD - platformFee - creatorFee;
    }

    /**
     * @dev Gas-optimized fee distribution
     */
    function _distributeFees(uint256 platformFee, uint256 creatorFee) internal {
        // Batch transfers for gas efficiency
        require(wldToken.transfer(platformFeeRecipient, platformFee), "Platform fee transfer failed");
        require(wldToken.transfer(creatorVestingRecipient, creatorFee), "Creator fee transfer failed");
        
        emit FeesDistributed(platformFee, creatorFee);
    }

    /**
     * @dev Gas-optimized pool creation and initialization
     */
    function _createAndInitializePool(uint256 finalPrice) internal {
        // Create Uniswap V3 Pool
        uniswapFactory.createPool(address(wldToken), address(token), 3000);
        graduationState.uniswapPool = uniswapFactory.getPool(address(wldToken), address(token), 3000);
        require(graduationState.uniswapPool != address(0), "Uniswap pool creation failed");
        
        // Initialize pool with optimized price calculation
        uint160 sqrtPriceX96 = _calculateSqrtPriceX96(finalPrice);
        IUniswapV3Pool(graduationState.uniswapPool).initialize(sqrtPriceX96);
        
        emit UniswapPoolCreated(graduationState.uniswapPool, address(wldToken), address(token), 3000);
    }

    /**
     * @dev Gas-optimized liquidity addition
     */
    function _addLiquidity(uint256 wldAmount, uint256 tokenAmount) internal {
        // Batch approvals for gas efficiency
        require(wldToken.approve(address(positionManager), wldAmount), "WLD approval failed");
        require(token.approve(address(positionManager), tokenAmount), "Token approval failed");

        // Optimized mint parameters
        INonfungiblePositionManager.MintParams memory params = INonfungiblePositionManager.MintParams({
            token0: address(wldToken),
            token1: address(token),
            fee: 3000,
            tickLower: -887272, // Min tick for full range
            tickUpper: 887272,  // Max tick for full range
            amount0Desired: wldAmount,
            amount1Desired: tokenAmount,
            amount0Min: 0, // Allow slippage for testnet
            amount1Min: 0, // Allow slippage for testnet
            recipient: address(this), // Send LP NFT to this contract
            deadline: block.timestamp + 300 // 5 minute deadline
        });

        (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1) = positionManager.mint(params);
        emit LiquidityAdded(tokenId, liquidity, amount0, amount1);

        // Burn LP NFT to permanently lock liquidity
        _burnLPNFT(tokenId);
    }

    /**
     * @dev Gas-optimized LP NFT burning
     */
    function _burnLPNFT(uint256 tokenId) internal {
        // Transfer LP NFT to burn address to permanently lock liquidity
        address burnAddress = 0x000000000000000000000000000000000000dEaD;
        positionManager.safeTransferFrom(address(this), burnAddress, tokenId);
        emit LPNFTBurned(tokenId);
    }

    /**
     * @dev Gas-optimized sqrt price calculation
     */
    function _calculateSqrtPriceX96(uint256 price) internal pure returns (uint160 sqrtPriceX96) {
        // Optimized calculation for better precision and gas efficiency
        uint256 sqrtPrice = _sqrt(price * (2**192));
        return uint160(sqrtPrice);
    }

    /**
     * @dev Gas-optimized square root calculation
     */
    function _sqrt(uint256 x) internal pure returns (uint256) {
        if (x == 0) return 0;
        uint256 z = (x + 1) / 2;
        uint256 y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
        return y;
    }

    // Optimized getter functions
    function getPoolInfo() external view returns (
        address pool,
        address token0,
        address token1,
        uint24 fee
    ) {
        return (
            graduationState.uniswapPool,
            address(wldToken),
            address(token),
            3000
        );
    }

    function getFeeDistribution() external view returns (
        uint256 platformFeePercent,
        uint256 creatorVestingPercent,
        uint256 liquidityPercent
    ) {
        return (
            PLATFORM_FEE_PERCENT,
            CREATOR_VESTING_PERCENT,
            LIQUIDITY_PERCENT
        );
    }

    function isGraduated() external view returns (bool) {
        return graduationState.isGraduated;
    }

    function uniswapPool() external view returns (address) {
        return graduationState.uniswapPool;
    }

    function getGraduationState() external view returns (
        address pool,
        bool graduated,
        uint256 totalWLD,
        uint256 totalTokens
    ) {
        return (
            graduationState.uniswapPool,
            graduationState.isGraduated,
            graduationState.totalWLD,
            graduationState.totalTokens
        );
    }
}
