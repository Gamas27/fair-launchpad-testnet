# 🌍 World ID Setup Guide

## **Step-by-Step World ID Configuration**

### **1. Create World ID App**

#### **Go to World ID Developer Portal**
- **URL**: [https://developer.worldcoin.org/](https://developer.worldcoin.org/)
- **Sign in** with your account
- **Click**: "Create App" or "New App"

#### **App Configuration**
```
App Name: Fair Launchpad
Description: Bonding curve token launchpad with World ID verification
Environment: Production (for mainnet) or Test (for testnet)
```

### **2. Get World ID Parameters**

#### **From Your App Dashboard**
1. **Go to your app settings**
2. **Find "App ID"** - this is your `worldIdGroupId`
3. **Get "Merkle Tree Root"** - this is your `worldIdRoot`

#### **Generate External Nullifier**
```javascript
// Option 1: Use a simple hash
const externalNullifier = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("fair-launchpad-token-verification")
);

// Option 2: Use a random value
const externalNullifier = ethers.utils.keccak256(
  ethers.utils.randomBytes(32)
);

// Option 3: Use a specific identifier
const externalNullifier = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("token-launch-verification-v1")
);
```

### **3. Example Parameters**

#### **For Testnet (Development)**
```solidity
worldIdRoot: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
worldIdGroupId: 1
worldIdExternalNullifier: 0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba
```

#### **For Mainnet (Production)**
```solidity
worldIdRoot: [Get from your World ID app dashboard]
worldIdGroupId: [Get from your World ID app dashboard]
worldIdExternalNullifier: [Generate using the methods above]
```

### **4. Quick Setup Script**

#### **Generate Parameters (Node.js)**
```javascript
const { ethers } = require("ethers");

// Generate external nullifier
const externalNullifier = ethers.utils.keccak256(
  ethers.utils.toUtf8Bytes("fair-launchpad-verification-v1")
);

console.log("External Nullifier:", externalNullifier);

// Generate a random root (for testing)
const randomRoot = ethers.utils.keccak256(ethers.utils.randomBytes(32));
console.log("Random Root (for testing):", randomRoot);
```

#### **Generate Parameters (Python)**
```python
import hashlib
import secrets

# Generate external nullifier
external_nullifier = hashlib.sha256(b"fair-launchpad-verification-v1").hexdigest()
print(f"External Nullifier: 0x{external_nullifier}")

# Generate random root (for testing)
random_root = secrets.token_hex(32)
print(f"Random Root (for testing): 0x{random_root}")
```

### **5. Contract Integration**

#### **For BondingCurveMinimal.sol**
```solidity
constructor(
    string memory name,
    string memory symbol,
    address _wldToken,
    address _worldId,
    uint256 _initialPrice,
    uint256 _maxSupply,
    uint256 _worldIdRoot,        // From World ID app
    uint256 _worldIdExternalNullifier  // Generated above
) {
    // ... rest of constructor
}
```

#### **For TokenFactory.sol**
```solidity
// When creating tokens, pass the World ID parameters
function createToken(
    string memory name,
    string memory symbol,
    uint256 initialPrice,
    uint256 maxSupply,
    uint256 worldIdRoot,        // From World ID app
    uint256 worldIdExternalNullifier  // Generated above
) external payable returns (address token) {
    // ... implementation
}
```

### **6. Testing World ID Integration**

#### **Test Parameters (Safe to Use)**
```solidity
// These are safe test parameters
worldIdRoot: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
worldIdGroupId: 1
worldIdExternalNullifier: 0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba
```

#### **Verify Integration**
1. **Deploy contract** with test parameters
2. **Test World ID verification** in your frontend
3. **Replace with production parameters** when ready

### **7. Production Setup**

#### **Get Production Parameters**
1. **Create production app** in World ID portal
2. **Get real merkle tree root** from your app
3. **Use production group ID** (usually 1 for mainnet)
4. **Generate unique external nullifier** for your app

#### **Security Considerations**
- **Keep external nullifier secret** - it's your app's unique identifier
- **Use different nullifiers** for different environments
- **Rotate parameters** if needed for security

### **8. Troubleshooting**

#### **Common Issues**
- **Invalid root**: Make sure you're using the correct merkle tree root
- **Group ID mismatch**: Use the correct group ID from your app
- **External nullifier**: Must be unique and consistent

#### **Verification**
```solidity
// Check if World ID verification works
function testWorldIdVerification() external {
    // This should not revert if World ID is set up correctly
    worldId.verifyProof(
        signal,
        worldIdRoot,
        nullifierHash,
        worldIdExternalNullifier,
        proof
    );
}
```

---

**Ready to set up World ID! 🌍**
