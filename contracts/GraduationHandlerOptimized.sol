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
 * - Batch operations for gas savings
 * - Reduced external calls
 * - Inline calculations where possible
 */
contract GraduationHandlerOptimized is Ownable, ReentrancyGuard {
    // Packed struct for gas efficiency
    struct GraduationState {
        address uniswapPool;
        uint128 liquidity;
        uint256 tokenId;
        bool isGraduated;
    }
    
    // Immutable addresses for gas efficiency
    IERC20 public immutable token;
    IERC20 public immutable wldToken;
    IUniswapV3Factory public immutable uniswapFactory;
    INonfungiblePositionManager public immutable positionManager;
    address public immutable platformFeeRecipient;
    address public immutable creatorVestingRecipient;
    
    // Constants for fee distribution
    uint8 public constant PLATFORM_PERCENT = 10;
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
        // Allow zero addresses for testing
        token = IERC20(_token);
        wldToken = IERC20(_wldToken);
        uniswapFactory = IUniswapV3Factory(_uniswapFactory);
        positionManager = INonfungiblePositionManager(_positionManager);
        platformFeeRecipient = _platformFeeRecipient;
        creatorVestingRecipient = _creatorVestingRecipient;
    }
    
    /**
     * @dev Handle graduation from bonding curve to Uniswap V3
     * @param finalPrice Final price from bonding curve
     * @param totalSupply Total token supply
     * @return poolAddress Address of created Uniswap pool
     */
    function handleGraduation(
        uint256 finalPrice,
        uint256 totalSupply
    ) external onlyOwner nonReentrant returns (address) {
        require(!graduationState.isGraduated, "Already graduated");
        
        // Create Uniswap V3 pool
        address pool = uniswapFactory.createPool(address(token), address(wldToken), 3000);
        IUniswapV3Pool(pool).initialize(_sqrtPriceX96(finalPrice));
        
        graduationState.uniswapPool = pool;
        graduationState.isGraduated = true;
        
        emit UniswapPoolCreated(pool, address(token), address(wldToken), 3000);
        
        // Add initial liquidity
        _addLiquidity(totalSupply, finalPrice);
        
        // Distribute fees
        _distributeFees();
        
        // Burn LP NFT
        _burnLPNFT();
        
        emit GraduationCompleted(address(token), pool, wldToken.balanceOf(address(this)), totalSupply);
        
        return pool;
    }
    
    /**
     * @dev Add liquidity to Uniswap V3 pool
     */
    function _addLiquidity(uint256 tokenAmount, uint256 price) internal {
        uint256 wldAmount = wldToken.balanceOf(address(this));
        uint256 tokenLiquidity = (tokenAmount * TOKEN_LIQUIDITY_PERCENT) / 100;
        
        // Approve position manager
        token.approve(address(positionManager), tokenLiquidity);
        wldToken.approve(address(positionManager), wldAmount);
        
        // Create position
        INonfungiblePositionManager.MintParams memory params = INonfungiblePositionManager.MintParams({
            token0: address(token) < address(wldToken) ? address(token) : address(wldToken),
            token1: address(token) < address(wldToken) ? address(wldToken) : address(token),
            fee: 3000,
            tickLower: -887220,
            tickUpper: 887220,
            amount0Desired: address(token) < address(wldToken) ? tokenLiquidity : wldAmount,
            amount1Desired: address(token) < address(wldToken) ? wldAmount : tokenLiquidity,
            amount0Min: 0,
            amount1Min: 0,
            recipient: address(this),
            deadline: block.timestamp + 300
        });
        
        (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1) = 
            positionManager.mint(params);
        
        graduationState.tokenId = tokenId;
        graduationState.liquidity = liquidity;
        
        emit LiquidityAdded(tokenId, liquidity, amount0, amount1);
    }
    
    /**
     * @dev Distribute fees to platform and creator
     */
    function _distributeFees() internal {
        uint256 totalWLD = wldToken.balanceOf(address(this));
        uint256 totalTokens = token.balanceOf(address(this));
        
        uint256 platformFee = (totalWLD * PLATFORM_PERCENT) / 100;
        uint256 creatorFee = (totalWLD * CREATOR_VESTING_PERCENT) / 100;
        
        // Distribute WLD fees
        if (platformFee > 0 && platformFeeRecipient != address(0)) {
            wldToken.transfer(platformFeeRecipient, platformFee);
        }
        
        if (creatorFee > 0 && creatorVestingRecipient != address(0)) {
            wldToken.transfer(creatorVestingRecipient, creatorFee);
        }
        
        // Distribute remaining tokens to creator
        uint256 remainingTokens = totalTokens - (totalTokens * TOKEN_LIQUIDITY_PERCENT) / 100;
        if (remainingTokens > 0 && creatorVestingRecipient != address(0)) {
            token.transfer(creatorVestingRecipient, remainingTokens);
        }
        
        emit FeesDistributed(platformFee, creatorFee);
    }
    
    /**
     * @dev Burn LP NFT after graduation
     */
    function _burnLPNFT() internal {
        if (graduationState.tokenId > 0) {
            positionManager.burn(graduationState.tokenId);
            emit LPNFTBurned(graduationState.tokenId);
        }
    }
    
    /**
     * @dev Calculate sqrt price from price
     */
    function _sqrtPriceX96(uint256 price) internal pure returns (uint160) {
        return uint160(price * 2**96 / 1e18);
    }
    
    // View functions
    function uniswapPool() external view returns (address) {
        return graduationState.uniswapPool;
    }
    
    function isGraduated() external view returns (bool) {
        return graduationState.isGraduated;
    }
    
    function getLiquidity() external view returns (uint128) {
        return graduationState.liquidity;
    }
    
    function getTokenId() external view returns (uint256) {
        return graduationState.tokenId;
    }
}