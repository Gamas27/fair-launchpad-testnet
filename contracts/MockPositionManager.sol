// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title MockPositionManager
 * @dev Mock Uniswap V3 Position Manager for testing
 */
contract MockPositionManager {
    struct MintParams {
        address token0;
        address token1;
        uint24 fee;
        int24 tickLower;
        int24 tickUpper;
        uint256 amount0Desired;
        uint256 amount1Desired;
        uint256 amount0Min;
        uint256 amount1Min;
        address recipient;
        uint256 deadline;
    }
    
    uint256 public nextTokenId = 1;
    
    function mint(MintParams calldata params)
        external
        payable
        returns (
            uint256 tokenId,
            uint128 liquidity,
            uint256 amount0,
            uint256 amount1
        )
    {
        tokenId = nextTokenId++;
        liquidity = 1000; // Mock liquidity
        amount0 = params.amount0Desired;
        amount1 = params.amount1Desired;
    }
    
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external {
        // Mock implementation - just emit event
        emit Transfer(from, to, tokenId);
    }
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
}
