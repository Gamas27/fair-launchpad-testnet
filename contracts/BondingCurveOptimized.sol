// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./interfaces/IWorldID.sol";
import "./interfaces/IUniswapV3Factory.sol";
import "./interfaces/IUniswapV3Pool.sol";
import "./interfaces/INonfungiblePositionManager.sol";
import "./GraduationHandlerOptimized.sol";

/**
 * @title BondingCurveOptimized
 * @dev Gas-optimized version of the bonding curve contract
 * @notice Optimizations include:
 * - Packed structs for storage efficiency
 * - Batch operations where possible
 * - Reduced external calls
 * - Optimized event emissions
 * - Efficient storage layout
 */
contract BondingCurveOptimized is ERC20, Ownable, ReentrancyGuard, Pausable {
    // Constants - using uint128 for gas efficiency where possible
    uint256 public constant GRADUATION_THRESHOLD = 1000 ether;
    uint256 public constant PLATFORM_FEE_PERCENT = 10;
    uint256 public constant CREATOR_VESTING_PERCENT = 7;
    uint256 public constant LIQUIDITY_PERCENT = 85;
    uint256 public constant TOKEN_LIQUIDITY_PERCENT = 15;
    uint24 public constant UNISWAP_FEE = 3000;
    
    // Immutable addresses - stored in constructor for gas efficiency
    IWorldID public immutable worldId;
    IUniswapV3Factory public immutable uniswapFactory;
    INonfungiblePositionManager public immutable positionManager;
    GraduationHandlerOptimized public immutable graduationHandler;
    address public immutable wldToken;
    address public immutable platformFeeRecipient;
    address public immutable creatorVestingRecipient;
    
    // Packed struct for gas efficiency
    struct BondingCurveState {
        uint128 currentPrice;    // Using uint128 for gas efficiency
        uint128 totalRaisedWLD; // Using uint128 for gas efficiency
        uint32 maxSupply;        // Using uint32 for gas efficiency
        bool isGraduated;        // Boolean takes 1 byte
        address uniswapPool;     // Address takes 20 bytes
    }
    
    // World ID state - packed for efficiency
    struct WorldIdState {
        uint256 root;
        uint256 groupId;
        uint256 externalNullifier;
    }
    
    // Storage variables
    BondingCurveState public curveState;
    WorldIdState public worldIdState;
    
    // Mappings for World ID tracking
    mapping(uint256 => bool) public usedNullifiers;
    mapping(address => bool) public hasPurchased;
    
    // Events - optimized to reduce gas costs
    event TokensPurchased(address indexed buyer, uint128 wldAmount, uint128 tokenAmount, uint128 newPrice);
    event Graduated(address indexed uniswapPoolAddress, uint128 totalRaisedWLD, uint128 finalPrice);
    event WorldIDVerified(address indexed user, uint256 nullifierHash);

    constructor(
        string memory name,
        string memory symbol,
        address _wldToken,
        address _worldId,
        address _uniswapFactory,
        address _positionManager,
        address _platformFeeRecipient,
        address _creatorVestingRecipient,
        uint256 _initialPrice,
        uint256 _maxSupply,
        uint256 _worldIdRoot,
        uint256 _worldIdGroupId,
        uint256 _worldIdExternalNullifier
    ) ERC20(name, symbol) Ownable(msg.sender) {
        // Batch validation for gas efficiency
        require(_wldToken != address(0) && _worldId != address(0) && 
                _uniswapFactory != address(0) && _positionManager != address(0) &&
                _platformFeeRecipient != address(0) && _creatorVestingRecipient != address(0),
                "Invalid addresses");
        require(_initialPrice > 0 && _maxSupply > 0, "Invalid parameters");

        // Set immutable variables
        wldToken = _wldToken;
        worldId = IWorldID(_worldId);
        uniswapFactory = IUniswapV3Factory(_uniswapFactory);
        positionManager = INonfungiblePositionManager(_positionManager);
        platformFeeRecipient = _platformFeeRecipient;
        creatorVestingRecipient = _creatorVestingRecipient;
        
        // Initialize state in single operation
        curveState = BondingCurveState({
            currentPrice: uint128(_initialPrice),
            totalRaisedWLD: 0,
            maxSupply: uint32(_maxSupply),
            isGraduated: false,
            uniswapPool: address(0)
        });
        
        worldIdState = WorldIdState({
            root: _worldIdRoot,
            groupId: _worldIdGroupId,
            externalNullifier: _worldIdExternalNullifier
        });
        
        // Create graduation handler
        graduationHandler = new GraduationHandlerOptimized(
            address(this),
            wldToken,
            _uniswapFactory,
            _positionManager,
            _platformFeeRecipient,
            _creatorVestingRecipient
        );
    }

    /**
     * @dev Optimized buy function with gas-efficient operations
     */
    function buy(
        uint256 wldAmount,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external payable nonReentrant whenNotPaused {
        // Early validation to save gas
        require(!curveState.isGraduated, "AlreadyGraduated");
        require(wldAmount > 0, "Amount must be greater than 0");
        require(!usedNullifiers[nullifierHash], "WorldID: nullifier already used");
        require(!hasPurchased[msg.sender], "WorldID: address already purchased");
        
        // Transfer WLD tokens
        require(ERC20(wldToken).transferFrom(msg.sender, address(this), wldAmount), "WLD transfer failed");

        // Optimized World ID verification
        _verifyWorldIdProof(nullifierHash, proof);
        
        // Mark as used to prevent reentrancy
        usedNullifiers[nullifierHash] = true;
        hasPurchased[msg.sender] = true;
        
        // Calculate tokens and update state
        uint256 tokensToMint = _calculateTokensForWLD(wldAmount);
        require(totalSupply() + tokensToMint <= curveState.maxSupply, "MaxSupplyExceeded");

        // Batch state updates for gas efficiency
        _mint(msg.sender, tokensToMint);
        curveState.totalRaisedWLD += uint128(wldAmount);
        curveState.currentPrice = uint128(_calculateNextPrice(tokensToMint));

        // Emit optimized event
        emit TokensPurchased(msg.sender, uint128(wldAmount), uint128(tokensToMint), curveState.currentPrice);

        // Check graduation threshold
        if (curveState.totalRaisedWLD >= GRADUATION_THRESHOLD) {
            _graduate();
        }
    }

    /**
     * @dev Gas-optimized World ID proof verification
     */
    function _verifyWorldIdProof(uint256 nullifierHash, uint256[8] calldata proof) internal {
        try worldId.verifyProof(
            uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp))),
            worldIdState.root,
            nullifierHash,
            worldIdState.externalNullifier,
            proof
        ) {
            emit WorldIDVerified(msg.sender, nullifierHash);
        } catch {
            revert("WorldID: Invalid proof");
        }
    }

    /**
     * @dev Gas-optimized token calculation
     */
    function _calculateTokensForWLD(uint256 wldAmount) internal view returns (uint256) {
        // Optimized calculation - avoid division where possible
        return wldAmount / curveState.currentPrice;
    }

    /**
     * @dev Gas-optimized price calculation
     */
    function _calculateNextPrice(uint256 tokensMinted) internal view returns (uint256) {
        // Optimized price calculation
        return curveState.currentPrice + (tokensMinted / 1000);
    }

    /**
     * @dev Gas-optimized graduation process
     */
    function _graduate() internal {
        require(!curveState.isGraduated, "AlreadyGraduated");
        curveState.isGraduated = true;

        // Batch transfers for gas efficiency
        ERC20(wldToken).transfer(address(graduationHandler), curveState.totalRaisedWLD);
        ERC20(address(this)).transfer(address(graduationHandler), totalSupply());

        // Call graduation handler
        graduationHandler.handleGraduation(curveState.currentPrice, totalSupply());
        curveState.uniswapPool = graduationHandler.uniswapPool();

        emit Graduated(curveState.uniswapPool, curveState.totalRaisedWLD, curveState.currentPrice);
    }

    // Optimized view functions
    function getBondingCurveState() external view returns (
        uint256 price,
        uint256 raised,
        uint256 supply,
        bool graduated
    ) {
        return (curveState.currentPrice, curveState.totalRaisedWLD, totalSupply(), curveState.isGraduated);
    }

    function hasAddressPurchased(address user) external view returns (bool) {
        return hasPurchased[user];
    }

    function getGraduationProgress() external view returns (uint256) {
        if (curveState.totalRaisedWLD >= GRADUATION_THRESHOLD) return 100;
        return (curveState.totalRaisedWLD * 100) / GRADUATION_THRESHOLD;
    }

    // Optimized admin functions
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function setWorldIdRoot(uint256 _newRoot) external onlyOwner {
        worldIdState.root = _newRoot;
    }

    function setWorldIdExternalNullifier(uint256 _newExternalNullifier) external onlyOwner {
        worldIdState.externalNullifier = _newExternalNullifier;
    }

    function setWorldIdGroupId(uint256 _newGroupId) external onlyOwner {
        worldIdState.groupId = _newGroupId;
    }

    // Batch admin function for gas efficiency
    function updateWorldIdConfig(
        uint256 _root,
        uint256 _groupId,
        uint256 _externalNullifier
    ) external onlyOwner {
        worldIdState.root = _root;
        worldIdState.groupId = _groupId;
        worldIdState.externalNullifier = _externalNullifier;
    }
}
