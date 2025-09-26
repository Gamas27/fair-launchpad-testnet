// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./BondingCurveMinimal.sol";
import "./interfaces/IWorldID.sol";

/**
 * @title TokenFactory
 * @dev Factory contract for creating new bonding curve tokens
 * @notice This factory allows users to create new meme tokens with bonding curve mechanics
 */
contract TokenFactory is Ownable, ReentrancyGuard {
    // Factory configuration
    address public immutable wldToken;
    address public immutable worldId;
    
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
        address _worldId
    ) Ownable(msg.sender) {
        require(_wldToken != address(0), "Invalid WLD token address");
        require(_worldId != address(0), "Invalid World ID address");
        
        wldToken = _wldToken;
        worldId = _worldId;
        
        creationFee = 0.1 ether; // Default creation fee: 0.1 WLD
    }
    
    /**
     * @dev Create a new bonding curve token
     * @param name Token name
     * @param symbol Token symbol
     * @param initialPrice Initial price in WLD
     * @param maxSupply Maximum token supply
     * @param worldIdRoot World ID root for verification
     * @param worldIdExternalNullifier World ID external nullifier
     */
    function createToken(
        string memory name,
        string memory symbol,
        uint256 initialPrice,
        uint256 maxSupply,
        uint256 worldIdRoot,
        uint256 worldIdExternalNullifier
    ) external payable nonReentrant returns (address token) {
        require(bytes(name).length > 0, "Token name required");
        require(bytes(symbol).length > 0, "Token symbol required");
        require(initialPrice > 0, "Initial price must be greater than 0");
        require(maxSupply > 0, "Max supply must be greater than 0");
        require(msg.value >= creationFee, "Insufficient creation fee");
        
        // Create new bonding curve token
        token = address(new BondingCurveMinimal(
            name,
            symbol,
            wldToken,
            worldId,
            initialPrice,
            maxSupply,
            worldIdRoot,
            worldIdExternalNullifier
        ));
        
        // Register token
        tokens[tokenCount] = token;
        isToken[token] = true;
        tokenCreators[token] = msg.sender;
        tokenCount++;
        
        // Refund excess payment
        if (msg.value > creationFee) {
            payable(msg.sender).transfer(msg.value - creationFee);
        }
        
        emit TokenCreated(
            tokenCount - 1,
            token,
            msg.sender,
            name,
            symbol,
            initialPrice,
            maxSupply
        );
    }
    
    /**
     * @dev Get token information
     * @param tokenAddress Token contract address
     * @return tokenId Token ID in factory
     * @return creator Token creator address
     * @return isRegistered Whether token is registered
     */
    function getTokenInfo(address tokenAddress) external view returns (
        uint256 tokenId,
        address creator,
        bool isRegistered
    ) {
        isRegistered = isToken[tokenAddress];
        creator = tokenCreators[tokenAddress];
        
        // Find token ID
        tokenId = type(uint256).max; // Default to max if not found
        for (uint256 i = 0; i < tokenCount; i++) {
            if (tokens[i] == tokenAddress) {
                tokenId = i;
                break;
            }
        }
    }
    
    /**
     * @dev Get all tokens created by a specific creator
     * @param creator Creator address
     * @return tokenAddresses Array of token addresses
     */
    function getTokensByCreator(address creator) external view returns (address[] memory tokenAddresses) {
        uint256 count = 0;
        
        // Count tokens by creator
        for (uint256 i = 0; i < tokenCount; i++) {
            if (tokenCreators[tokens[i]] == creator) {
                count++;
            }
        }
        
        // Create array and populate
        tokenAddresses = new address[](count);
        uint256 index = 0;
        
        for (uint256 i = 0; i < tokenCount; i++) {
            if (tokenCreators[tokens[i]] == creator) {
                tokenAddresses[index] = tokens[i];
                index++;
            }
        }
    }
    
    /**
     * @dev Get factory statistics
     * @return totalTokens Total number of tokens created
     * @return currentFee Current creation fee
     * @return factoryOwner Factory owner address
     */
    function getFactoryStats() external view returns (
        uint256 totalTokens,
        uint256 currentFee,
        address factoryOwner
    ) {
        totalTokens = tokenCount;
        currentFee = creationFee;
        factoryOwner = owner();
    }
    
    // Admin functions
    
    /**
     * @dev Update creation fee (only owner)
     * @param newFee New creation fee in WLD
     */
    function setCreationFee(uint256 newFee) external onlyOwner {
        require(newFee <= MAX_CREATION_FEE, "Fee exceeds maximum");
        uint256 oldFee = creationFee;
        creationFee = newFee;
        emit CreationFeeUpdated(oldFee, newFee);
    }
    
    
    /**
     * @dev Withdraw creation fees (only owner)
     */
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        payable(owner()).transfer(balance);
    }
    
    /**
     * @dev Emergency pause (only owner)
     */
    function pause() external onlyOwner {
        // This would require implementing Pausable functionality
        // For now, this is a placeholder
    }
    
    /**
     * @dev Emergency unpause (only owner)
     */
    function unpause() external onlyOwner {
        // This would require implementing Pausable functionality
        // For now, this is a placeholder
    }
}