// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title MockWorldID
 * @dev Mock World ID contract for testing
 */
contract MockWorldID {
    function verifyProof(
        uint256 root,
        uint256 groupId,
        uint256 signalHash,
        uint256 nullifierHash,
        uint256 externalNullifierHash,
        uint256[8] calldata proof
    ) external pure {
        // Mock implementation - always succeeds
        // In real implementation, this would verify the zero-knowledge proof
        require(root != 0, "Invalid root");
        require(groupId != 0, "Invalid group ID");
        require(signalHash != 0, "Invalid signal hash");
        require(nullifierHash != 0, "Invalid nullifier hash");
        require(externalNullifierHash != 0, "Invalid external nullifier hash");
        require(proof.length == 8, "Invalid proof length");
    }
}
