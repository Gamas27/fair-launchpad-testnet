// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title MockUniswapFactory
 * @dev Mock Uniswap V3 Factory for testing
 */
contract MockUniswapFactory {
    mapping(address => mapping(address => mapping(uint24 => address))) public pools;
    
    function getPool(
        address tokenA,
        address tokenB,
        uint24 fee
    ) external view returns (address pool) {
        return pools[tokenA][tokenB][fee];
    }
    
    function createPool(
        address tokenA,
        address tokenB,
        uint24 fee
    ) external returns (address pool) {
        // Create a mock pool address
        pool = address(uint160(uint256(keccak256(abi.encodePacked(tokenA, tokenB, fee, block.timestamp)))));
        pools[tokenA][tokenB][fee] = pool;
        pools[tokenB][tokenA][fee] = pool;
        return pool;
    }
}
