// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IWorldID {
    /// @notice Verifies a World ID proof
    /// @param signal The signal that was used to generate the proof
    /// @param root The Merkle root of the World ID tree
    /// @param nullifierHash The nullifier hash of the proof
    /// @param externalNullifier The external nullifier used for the proof
    /// @param proof The zero-knowledge proof
    function verifyProof(
        uint256 signal,
        uint256 root,
        uint256 nullifierHash,
        uint256 externalNullifier,
        uint256[8] calldata proof
    ) external;
}