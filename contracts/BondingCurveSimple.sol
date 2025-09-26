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
 * @title BondingCurveSimple
 * @dev Simplified bonding curve contract to avoid stack depth issues
 */
contract BondingCurveSimple is ERC20, Ownable, ReentrancyGuard, Pausable {
    // Constants
    uint256 public constant GRADUATION_THRESHOLD = 1000 ether;
    
    // Immutable addresses
    IWorldID public immutable worldId;
    IUniswapV3Factory public immutable uniswapFactory;
    INonfungiblePositionManager public immutable positionManager;
    GraduationHandlerOptimized public immutable graduationHandler;
    address public immutable wldToken;
    address public immutable platformFeeRecipient;
    address public immutable creatorVestingRecipient;
    
    // State variables
    uint256 public currentPrice;
    uint256 public totalRaisedWLD;
    uint256 public maxSupply;
    bool public isGraduated;
    address public uniswapPool;
    
    // World ID state
    uint256 public worldIdRoot;
    uint256 public worldIdGroupId;
    uint256 public worldIdExternalNullifier;
    
    // Mappings
    mapping(uint256 => bool) public usedNullifiers;
    mapping(address => bool) public hasPurchased;
    
    // Events
    event TokensPurchased(address indexed buyer, uint256 wldAmount, uint256 tokenAmount, uint256 newPrice);
    event Graduated(address indexed uniswapPoolAddress, uint256 totalRaisedWLD, uint256 finalPrice);
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
        require(_wldToken != address(0), "Invalid WLD token address");
        require(_worldId != address(0), "Invalid World ID address");
        require(_uniswapFactory != address(0), "Invalid Uniswap Factory address");
        require(_positionManager != address(0), "Invalid Position Manager address");
        require(_platformFeeRecipient != address(0), "Invalid platform fee recipient");
        require(_creatorVestingRecipient != address(0), "Invalid creator vesting recipient");
        require(_initialPrice > 0, "Initial price must be greater than 0");
        require(_maxSupply > 0, "Max supply must be greater than 0");

        wldToken = _wldToken;
        worldId = IWorldID(_worldId);
        uniswapFactory = IUniswapV3Factory(_uniswapFactory);
        positionManager = INonfungiblePositionManager(_positionManager);
        platformFeeRecipient = _platformFeeRecipient;
        creatorVestingRecipient = _creatorVestingRecipient;
        currentPrice = _initialPrice;
        maxSupply = _maxSupply;
        worldIdRoot = _worldIdRoot;
        worldIdGroupId = _worldIdGroupId;
        worldIdExternalNullifier = _worldIdExternalNullifier;
        
        graduationHandler = new GraduationHandlerOptimized(
            address(this),
            wldToken,
            _uniswapFactory,
            _positionManager,
            _platformFeeRecipient,
            _creatorVestingRecipient
        );
    }

    function buy(
        uint256 wldAmount,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external payable nonReentrant whenNotPaused {
        require(!isGraduated, "Already graduated");
        require(wldAmount > 0, "Amount must be greater than 0");
        require(!usedNullifiers[nullifierHash], "WorldID: nullifier already used");
        require(!hasPurchased[msg.sender], "WorldID: address already purchased");
        
        // Transfer WLD tokens
        require(ERC20(wldToken).transferFrom(msg.sender, address(this), wldAmount), "WLD transfer failed");

        // Verify World ID proof
        _verifyWorldIdProof(nullifierHash, proof);
        
        // Mark as used
        usedNullifiers[nullifierHash] = true;
        hasPurchased[msg.sender] = true;
        
        // Calculate and mint tokens
        uint256 tokensToMint = _calculateTokensForWLD(wldAmount);
        require(totalSupply() + tokensToMint <= maxSupply, "Max supply exceeded");

        _mint(msg.sender, tokensToMint);
        totalRaisedWLD += wldAmount;
        currentPrice = _calculateNextPrice(tokensToMint);

        emit TokensPurchased(msg.sender, wldAmount, tokensToMint, currentPrice);

        // Check graduation
        if (totalRaisedWLD >= GRADUATION_THRESHOLD) {
            _graduate();
        }
    }

    function _verifyWorldIdProof(uint256 nullifierHash, uint256[8] calldata proof) internal {
        try worldId.verifyProof(
            uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp))),
            worldIdRoot,
            nullifierHash,
            worldIdExternalNullifier,
            proof
        ) {
            emit WorldIDVerified(msg.sender, nullifierHash);
        } catch {
            revert("WorldID: Invalid proof");
        }
    }

    function _calculateTokensForWLD(uint256 wldAmount) internal view returns (uint256) {
        return wldAmount / currentPrice;
    }

    function _calculateNextPrice(uint256 tokensMinted) internal view returns (uint256) {
        return currentPrice + (tokensMinted / 1000);
    }

    function _graduate() internal {
        require(!isGraduated, "Already graduated");
        isGraduated = true;

        // Transfer tokens to graduation handler
        ERC20(wldToken).transfer(address(graduationHandler), totalRaisedWLD);
        ERC20(address(this)).transfer(address(graduationHandler), totalSupply());

        // Call graduation handler
        uniswapPool = graduationHandler.handleGraduation(currentPrice, totalSupply());

        emit Graduated(uniswapPool, totalRaisedWLD, currentPrice);
    }

    // View functions
    function getBondingCurveState() external view returns (
        uint256 price,
        uint256 raised,
        uint256 supply,
        bool graduated
    ) {
        return (currentPrice, totalRaisedWLD, totalSupply(), isGraduated);
    }

    function hasAddressPurchased(address user) external view returns (bool) {
        return hasPurchased[user];
    }

    function getGraduationProgress() external view returns (uint256) {
        if (totalRaisedWLD >= GRADUATION_THRESHOLD) return 100;
        return (totalRaisedWLD * 100) / GRADUATION_THRESHOLD;
    }

    // Admin functions
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function setWorldIdRoot(uint256 _newRoot) external onlyOwner {
        worldIdRoot = _newRoot;
    }

    function setWorldIdExternalNullifier(uint256 _newExternalNullifier) external onlyOwner {
        worldIdExternalNullifier = _newExternalNullifier;
    }

    function setWorldIdGroupId(uint256 _newGroupId) external onlyOwner {
        worldIdGroupId = _newGroupId;
    }
}
