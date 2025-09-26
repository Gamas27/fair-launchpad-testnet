// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./BondingCurveBasic.sol";

/**
 * @title TokenFactoryBasic
 * @dev Factory contract for creating basic bonding curve tokens
 * @notice This factory allows users to create new meme tokens with basic bonding curve mechanics
 */
contract TokenFactoryBasic is Ownable, ReentrancyGuard {
    // Factory configuration
    address public immutable wldToken;
    
    // Factory state
    uint256 public tokenCount;
    uint256 public creationFee;
    uint256 public constant MAX_CREATION_FEE = 1 ether; // Maximum fee in WLD
    
    // Token registry
    mapping(uint256 => address) public tokens;
    mapping(address => bool) public isToken;
    mapping(address => address) public tokenCreators;
    
    // Events
    event TokenCreated(
        uint256 indexed tokenId,
        address indexed token,
        address indexed creator,
        string name,
        string symbol,
        uint256 initialPrice,
        uint256 maxSupply
    );
    
    event CreationFeeUpdated(uint256 oldFee, uint256 newFee);
    
    constructor(
        address _wldToken,
        address _platformFeeRecipient,
        address _creatorVestingRecipient,
        uint256 _creationFee
    ) Ownable(msg.sender) {
        require(_wldToken != address(0), "Invalid WLD token address");
        require(_platformFeeRecipient != address(0), "Invalid platform fee recipient");
        require(_creatorVestingRecipient != address(0), "Invalid creator vesting recipient");
        require(_creationFee <= MAX_CREATION_FEE, "Creation fee too high");
        
        wldToken = _wldToken;
        creationFee = _creationFee;
    }
    
    /**
     * @dev Create a new basic bonding curve token
     * @param name Token name
     * @param symbol Token symbol
     * @param initialPrice Initial price in WLD
     * @param maxSupply Maximum token supply
     */
    function createToken(
        string memory name,
        string memory symbol,
        uint256 initialPrice,
        uint256 maxSupply
    ) external payable nonReentrant returns (address token) {
        require(bytes(name).length > 0, "Token name required");
        require(bytes(symbol).length > 0, "Token symbol required");
        require(initialPrice > 0, "Initial price must be greater than 0");
        require(maxSupply > 0, "Max supply must be greater than 0");
        require(msg.value >= creationFee, "Insufficient creation fee");
        
        // Create new bonding curve token
        token = address(new BondingCurveBasic(
            name,
            symbol,
            wldToken,
            initialPrice,
            maxSupply
        ));
        
        // Register token
        tokens[tokenCount] = token;
        isToken[token] = true;
        tokenCreators[token] = msg.sender;
        
        emit TokenCreated(tokenCount, token, msg.sender, name, symbol, initialPrice, maxSupply);
        
        tokenCount++;
    }
    
    // View functions
    function getToken(uint256 tokenId) external view returns (address) {
        return tokens[tokenId];
    }
    
    function getTokenCount() external view returns (uint256) {
        return tokenCount;
    }
    
    function isTokenCreated(address token) external view returns (bool) {
        return isToken[token];
    }
    
    function getTokenCreator(address token) external view returns (address) {
        return tokenCreators[token];
    }
    
    // Admin functions
    function setCreationFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= MAX_CREATION_FEE, "Creation fee too high");
        uint256 oldFee = creationFee;
        creationFee = _newFee;
        emit CreationFeeUpdated(oldFee, _newFee);
    }
    
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Fee withdrawal failed");
    }
}
