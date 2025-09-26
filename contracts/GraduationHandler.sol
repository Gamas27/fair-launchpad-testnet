// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IUniswapV3Factory.sol";
import "./interfaces/IUniswapV3Pool.sol";
import "./interfaces/INonfungiblePositionManager.sol";

contract GraduationHandler is Ownable, ReentrancyGuard {
    IERC20 public immutable token;
    IERC20 public immutable wldToken;
    IUniswapV3Factory public immutable uniswapFactory;
    INonfungiblePositionManager public immutable positionManager;
    address public immutable platformFeeRecipient;
    address public immutable creatorVestingRecipient;

    address public uniswapPool;
    
    // Enhanced fee distribution constants
    uint256 public constant PLATFORM_FEE_PERCENT = 10; // 10%
    uint256 public constant CREATOR_VESTING_PERCENT = 7; // 7%
    uint256 public constant LIQUIDITY_PERCENT = 83; // 83%
    uint256 public constant TOKEN_LIQUIDITY_PERCENT = 15; // 15% of token supply

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
        require(_token != address(0), "Invalid token address");
        require(_wldToken != address(0), "Invalid WLD token address");
        require(_uniswapFactory != address(0), "Invalid Uniswap Factory address");
        require(_positionManager != address(0), "Invalid Position Manager address");
        require(_platformFeeRecipient != address(0), "Invalid platform fee recipient");
        require(_creatorVestingRecipient != address(0), "Invalid creator vesting recipient");

        token = IERC20(_token);
        wldToken = IERC20(_wldToken);
        uniswapFactory = IUniswapV3Factory(_uniswapFactory);
        positionManager = INonfungiblePositionManager(_positionManager);
        platformFeeRecipient = _platformFeeRecipient;
        creatorVestingRecipient = _creatorVestingRecipient;
    }

    function handleGraduation(uint256 finalPrice, uint256 totalTokenSupply) external onlyOwner nonReentrant {
        require(uniswapPool == address(0), "Uniswap pool already created");

        uint256 totalWLD = wldToken.balanceOf(address(this));
        require(totalWLD > 0, "No WLD raised for graduation");
        require(totalTokenSupply > 0, "No tokens minted for graduation");

        // Enhanced fee distribution with validation
        uint256 platformFee = (totalWLD * PLATFORM_FEE_PERCENT) / 100;
        uint256 creatorFee = (totalWLD * CREATOR_VESTING_PERCENT) / 100;
        uint256 liquidityWLD = totalWLD - platformFee - creatorFee;
        
        // Ensure minimum liquidity requirements
        require(liquidityWLD >= (totalWLD * 80) / 100, "Insufficient liquidity allocation");
        require(platformFee > 0, "Platform fee must be greater than 0");
        require(creatorFee > 0, "Creator fee must be greater than 0");

        // Distribute fees with enhanced security
        _distributeFees(platformFee, creatorFee);
        
        // Calculate token amount for liquidity (15% of total supply)
        uint256 tokenLiquidityAmount = (totalTokenSupply * TOKEN_LIQUIDITY_PERCENT) / 100;
        require(tokenLiquidityAmount > 0, "Token liquidity amount must be greater than 0");

        // Create Uniswap V3 Pool with enhanced error handling
        _createUniswapPool();
        
        // Initialize pool with price continuity
        _initializePool(finalPrice);
        
        // Add liquidity with enhanced validation
        _addLiquidity(liquidityWLD, tokenLiquidityAmount);
        
        emit GraduationCompleted(address(token), uniswapPool, liquidityWLD, tokenLiquidityAmount);
    }

    function _distributeFees(uint256 platformFee, uint256 creatorFee) internal {
        // Transfer platform fee
        require(wldToken.transfer(platformFeeRecipient, platformFee), "Platform fee transfer failed");
        emit FeesDistributed(platformFee, creatorFee);
        
        // Transfer creator vesting fee
        require(wldToken.transfer(creatorVestingRecipient, creatorFee), "Creator fee transfer failed");
    }

    function _createUniswapPool() internal {
        // Create Uniswap V3 Pool
        uniswapFactory.createPool(address(wldToken), address(token), 3000);
        uniswapPool = uniswapFactory.getPool(address(wldToken), address(token), 3000);
        require(uniswapPool != address(0), "Uniswap pool creation failed");
        emit UniswapPoolCreated(uniswapPool, address(wldToken), address(token), 3000);
    }

    function _initializePool(uint256 finalPrice) internal {
        // Initialize pool price with enhanced calculation
        uint160 sqrtPriceX96 = _calculateSqrtPriceX96(finalPrice);
        IUniswapV3Pool(uniswapPool).initialize(sqrtPriceX96);
    }

    function _addLiquidity(uint256 wldAmount, uint256 tokenAmount) internal {
        // Approve Uniswap Position Manager to spend WLD and tokens
        require(wldToken.approve(address(positionManager), wldAmount), "WLD approval failed");
        require(token.approve(address(positionManager), tokenAmount), "Token approval failed");

        // Add liquidity with enhanced parameters
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

    function _burnLPNFT(uint256 tokenId) internal {
        // Transfer LP NFT to burn address to permanently lock liquidity
        address burnAddress = 0x000000000000000000000000000000000000dEaD;
        positionManager.safeTransferFrom(address(this), burnAddress, tokenId);
        emit LPNFTBurned(tokenId);
    }

    function _calculateSqrtPriceX96(uint256 price) internal pure returns (uint160 sqrtPriceX96) {
        // Enhanced price calculation for better precision
        // sqrtPriceX96 = sqrt(price) * 2^96
        uint256 sqrtPrice = _sqrt(price * (2**192));
        return uint160(sqrtPrice);
    }

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

    // Enhanced getter functions
    function getPoolInfo() external view returns (
        address pool,
        address token0,
        address token1,
        uint24 fee
    ) {
        return (
            uniswapPool,
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
        return uniswapPool != address(0);
    }
}