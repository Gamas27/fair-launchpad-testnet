// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/IWorldID.sol";

contract BondingCurve is ERC20, Ownable, ReentrancyGuard {
    uint256 public constant GRADUATION_THRESHOLD = 1000 ether;
    
    IWorldID public immutable worldId;
    address public immutable wldToken;
    
    uint256 public currentPrice;
    uint256 public totalRaisedWLD;
    uint256 public maxSupply;
    bool public isGraduated;
    address public uniswapPool;
    
    uint256 public worldIdRoot;
    uint256 public worldIdGroupId;
    uint256 public worldIdExternalNullifier;
    
    mapping(uint256 => bool) public usedNullifiers;
    mapping(address => bool) public hasPurchased;
    
    event TokensPurchased(address indexed buyer, uint256 wldAmount, uint256 tokenAmount, uint256 newPrice);
    event Graduated(address indexed uniswapPoolAddress, uint256 totalRaisedWLD, uint256 finalPrice);
    event WorldIDVerified(address indexed user, uint256 nullifierHash);

    constructor(
        string memory name,
        string memory symbol,
        address _wldToken,
        address _worldId,
        uint256 _initialPrice,
        uint256 _maxSupply,
        uint256 _worldIdRoot,
        uint256 _worldIdExternalNullifier
    ) ERC20(name, symbol) Ownable(msg.sender) {
        wldToken = _wldToken;
        worldId = IWorldID(_worldId);
        currentPrice = _initialPrice;
        maxSupply = _maxSupply;
        worldIdRoot = _worldIdRoot;
        worldIdExternalNullifier = _worldIdExternalNullifier;
    }

    function buy(
        uint256 wldAmount,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) external nonReentrant {
        require(!isGraduated, "Already graduated");
        require(wldAmount > 0, "Amount must be greater than 0");
        require(!usedNullifiers[nullifierHash], "WorldID: nullifier already used");
        require(!hasPurchased[msg.sender], "WorldID: address already purchased");
        
        require(ERC20(wldToken).transferFrom(msg.sender, address(this), wldAmount), "WLD transfer failed");

        _verifyWorldIdProof(nullifierHash, proof);
        
        usedNullifiers[nullifierHash] = true;
        hasPurchased[msg.sender] = true;
        
        uint256 tokensToMint = wldAmount / currentPrice;
        require(totalSupply() + tokensToMint <= maxSupply, "Max supply exceeded");

        _mint(msg.sender, tokensToMint);
        totalRaisedWLD += wldAmount;
        
        // Improved price calculation: exponential curve that's more reasonable
        // Price increases by 0.1% for each token minted, with a minimum increase
        uint256 priceIncrease = (currentPrice * tokensToMint) / 1000;
        if (priceIncrease < 1) priceIncrease = 1; // Minimum 1 wei increase
        currentPrice = currentPrice + priceIncrease;

        emit TokensPurchased(msg.sender, wldAmount, tokensToMint, currentPrice);

        if (totalRaisedWLD >= GRADUATION_THRESHOLD) {
            _graduate();
        }
    }

    function _verifyWorldIdProof(uint256 nullifierHash, uint256[8] calldata proof) internal {
        try worldId.verifyProof(
            uint256(keccak256(abi.encodePacked(msg.sender, address(this)))),
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

    function _graduate() internal {
        require(!isGraduated, "Already graduated");
        isGraduated = true;
        
        // Simple graduation - just mark as graduated
        // Graduation logic can be added later
        emit Graduated(address(0), totalRaisedWLD, currentPrice);
    }

    function getBondingCurveState() external view returns (uint256, uint256, uint256, bool) {
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
