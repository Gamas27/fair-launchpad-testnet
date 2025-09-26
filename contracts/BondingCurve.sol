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
import "./GraduationHandler.sol";

contract BondingCurve is ERC20, Ownable, ReentrancyGuard, Pausable {
    uint256 public constant GRADUATION_THRESHOLD = 1000 ether; // 1000 WLD threshold
    uint256 public constant PLATFORM_FEE_PERCENT = 10; // 10% platform fee
    uint256 public constant CREATOR_VESTING_PERCENT = 7; // 7% creator vesting
    uint256 public constant LIQUIDITY_PERCENT = 85; // 85% for liquidity
    uint256 public constant TOKEN_LIQUIDITY_PERCENT = 15; // 15% of token supply for liquidity
    uint24 public constant UNISWAP_FEE = 3000; // 0.3% fee tier
    
    IWorldID public immutable worldId;
    IUniswapV3Factory public immutable uniswapFactory;
    INonfungiblePositionManager public immutable positionManager;
    GraduationHandler public immutable graduationHandler;
    
    address public immutable wldToken;
    address public immutable platformFeeRecipient;
    address public immutable creatorVestingRecipient;
    
    uint256 public currentPrice;
    uint256 public totalRaisedWLD;
    uint256 public maxSupply;
    bool public isGraduated;
    address public uniswapPool;
    
    // Enhanced World ID integration
    mapping(uint256 => bool) public usedNullifiers;
    mapping(address => bool) public hasPurchased; // Track if address has purchased
    uint256 public worldIdRoot;
    uint256 public worldIdGroupId;
    uint256 public worldIdExternalNullifier;
    
    event TokensPurchased(address indexed buyer, uint256 wldAmount, uint256 tokenAmount, uint256 newPrice);
    event Graduated(address indexed uniswapPoolAddress, uint256 totalRaisedWLD, uint256 finalPrice);
    event PlatformFeePaid(address indexed recipient, uint256 amount);
    event CreatorVestingSet(address indexed recipient, uint256 amount);
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
        
        graduationHandler = new GraduationHandler(
            address(this), // token address
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
        require(!isGraduated, "AlreadyGraduated");
        require(wldAmount > 0, "Amount must be greater than 0");
        require(ERC20(wldToken).transferFrom(msg.sender, address(this), wldAmount), "WLD transfer failed");

        // Enhanced World ID verification - one-per-human rule
        require(!usedNullifiers[nullifierHash], "WorldID: nullifier already used");
        require(!hasPurchased[msg.sender], "WorldID: address already purchased");
        
        // Verify World ID proof with enhanced security
        try worldId.verifyProof(
            uint256(keccak256(abi.encodePacked(msg.sender, block.timestamp))), // signal with timestamp
            worldIdRoot,
            nullifierHash,
            worldIdExternalNullifier,
            proof
        ) {
            // Mark nullifier as used and address as having purchased
            usedNullifiers[nullifierHash] = true;
            hasPurchased[msg.sender] = true;
            emit WorldIDVerified(msg.sender, nullifierHash);
        } catch {
            revert("WorldID: Invalid proof");
        }

        uint256 tokensToMint = calculateTokensForWLD(wldAmount);
        require(totalSupply() + tokensToMint <= maxSupply, "MaxSupplyExceeded");

        _mint(msg.sender, tokensToMint);
        totalRaisedWLD += wldAmount;
        currentPrice = calculateNextPrice(tokensToMint);

        emit TokensPurchased(msg.sender, wldAmount, tokensToMint, currentPrice);

        if (totalRaisedWLD >= GRADUATION_THRESHOLD) {
            _graduate();
        }
    }

    function calculateTokensForWLD(uint256 wldAmount) public view returns (uint256) {
        // Simple linear bonding curve for now
        // Price increases with supply
        // tokens = wldAmount / currentPrice
        return wldAmount / currentPrice;
    }

    function calculateNextPrice(uint256 tokensMinted) internal view returns (uint256) {
        // Example: Price increases by a fixed amount per token minted
        // This is a placeholder and should be replaced with a proper bonding curve formula
        return currentPrice + (tokensMinted / 1000); // Adjust as needed
    }

    function _graduate() internal {
        require(!isGraduated, "AlreadyGraduated");
        isGraduated = true;

        // Transfer WLD to GraduationHandler
        ERC20(wldToken).transfer(address(graduationHandler), totalRaisedWLD);
        // Transfer all minted tokens to GraduationHandler
        ERC20(address(this)).transfer(address(graduationHandler), totalSupply());

        // Call the graduation handler
        graduationHandler.handleGraduation(currentPrice, totalSupply());

        uniswapPool = graduationHandler.uniswapPool();

        emit Graduated(uniswapPool, totalRaisedWLD, currentPrice);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function setWorldIdRoot(uint256 _newRoot) public onlyOwner {
        worldIdRoot = _newRoot;
    }

    function setWorldIdExternalNullifier(uint256 _newExternalNullifier) public onlyOwner {
        worldIdExternalNullifier = _newExternalNullifier;
    }

    function setWorldIdGroupId(uint256 _newGroupId) public onlyOwner {
        worldIdGroupId = _newGroupId;
    }

    // Enhanced functions for better integration
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
}