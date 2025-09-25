# 🧪 FairLaunch UI/UX Testing Guide

## 🎯 Test Users Created

We've created 5 test users with different reputation levels and trading histories:

### 1. **Gold User** (Experienced Trader)
- **Address**: `0x1234567890123456789012345678901234567890`
- **Reputation**: Gold (2500 XP)
- **Verification**: Orb (highest level)
- **Trades**: 45 trades, $125,000 volume
- **Risk Score**: 15 (low risk)
- **Status**: Active, well-established trader

### 2. **Silver User** (Intermediate Trader)
- **Address**: `0x2345678901234567890123456789012345678901`
- **Reputation**: Silver (800 XP)
- **Verification**: Document
- **Trades**: 12 trades, $35,000 volume
- **Risk Score**: 25 (low risk)
- **Status**: Active, moderate experience

### 3. **Bronze User** (New Trader)
- **Address**: `0x3456789012345678901234567890123456789012`
- **Reputation**: Bronze (150 XP)
- **Verification**: Device
- **Trades**: 3 trades, $5,000 volume
- **Risk Score**: 5 (very low risk)
- **Status**: Active, just starting

### 4. **High Risk User** (Flagged Trader)
- **Address**: `0x4567890123456789012345678901234567890123`
- **Reputation**: Bronze (100 XP)
- **Verification**: Orb
- **Trades**: 25 trades, $15,000 volume
- **Risk Score**: 85 (high risk)
- **Status**: Active but flagged for suspicious activity

### 5. **Unverified User** (New User)
- **Address**: `0x5678901234567890123456789012345678901234`
- **Reputation**: Bronze (0 XP)
- **Verification**: None
- **Trades**: 0 trades, $0 volume
- **Risk Score**: 0
- **Status**: Needs World ID verification

## 🪙 Test Tokens Available

### 1. **FairLaunch Token (FLT)**
- **Address**: `0x1111111111111111111111111111111111111111`
- **Price**: $0.15
- **Market Cap**: $75M
- **Status**: Active
- **Trades**: 120 trades, $75,000 volume

### 2. **HumanCoin (HUMAN)**
- **Address**: `0x2222222222222222222222222222222222222222`
- **Price**: $0.25
- **Market Cap**: $50M
- **Status**: Active
- **Trades**: 85 trades, $45,000 volume

### 3. **Reputation Token (REP)**
- **Address**: `0x3333333333333333333333333333333333333333`
- **Price**: $0.08
- **Market Cap**: $64M
- **Status**: Active
- **Trades**: 60 trades, $25,000 volume

### 4. **LaunchPad Coin (LPC)**
- **Address**: `0x4444444444444444444444444444444444444444`
- **Price**: $0.12
- **Market Cap**: $3.6M
- **Status**: Launching
- **Trades**: 25 trades, $15,000 volume

## 🧪 Testing Scenarios

### Scenario 1: New User Onboarding
**User**: Unverified User (`0x5678901234567890123456789012345678901234`)

**Flow**:
1. Connect wallet
2. Verify with World ID (Device level)
3. View reputation screen (should show 0 XP, Bronze level)
4. Check available quests
5. Try to trade (should be blocked until verification)

### Scenario 2: Experienced Trader
**User**: Gold User (`0x1234567890123456789012345678901234567890`)

**Flow**:
1. Connect wallet
2. View reputation screen (should show Gold level, 2500 XP)
3. Check completed quests and achievements
4. View trading history
5. Execute trades on different tokens
6. Check anti-manipulation status

### Scenario 3: High Risk User
**User**: High Risk User (`0x4567890123456789012345678901234567890123`)

**Flow**:
1. Connect wallet
2. View reputation screen (should show Bronze level but high risk)
3. Check anti-manipulation logs
4. Try to trade (should show warnings)
5. View risk analysis and recommendations

### Scenario 4: Quest Completion
**User**: Silver User (`0x2345678901234567890123456789012345678901`)

**Flow**:
1. Connect wallet
2. View reputation screen
3. Complete available quests
4. Watch XP increase
5. Check for new achievements

## 🎮 How to Test

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Connect Test Wallets
Use MetaMask or another wallet extension with these test addresses:
- Import the private keys (you'll need to generate them)
- Or use the addresses directly in the UI

### 3. Test Each Component

#### **Home Page**
- [ ] Verify all cards display correctly
- [ ] Check user stats for connected wallet
- [ ] Test navigation between sections

#### **World ID Verification**
- [ ] Test verification flow for unverified user
- [ ] Check different verification levels
- [ ] Verify session persistence

#### **Reputation System**
- [ ] View reputation levels and XP
- [ ] Check quest progress
- [ ] Complete quests and watch XP increase
- [ ] View achievements (unlocked and locked)

#### **Trading Interface**
- [ ] Simulate trades
- [ ] Execute trades (if verified)
- [ ] Check trade history
- [ ] View risk analysis
- [ ] Test different tokens

#### **Anti-Manipulation**
- [ ] View risk status
- [ ] Check manipulation logs
- [ ] Test trade analysis
- [ ] Verify recommendations

### 4. Test Edge Cases

#### **Error Handling**
- [ ] Test with invalid wallet addresses
- [ ] Test network failures
- [ ] Test rate limiting
- [ ] Test insufficient funds

#### **Responsive Design**
- [ ] Test on mobile devices
- [ ] Test on tablets
- [ ] Test different screen sizes
- [ ] Test sidebar navigation

#### **Performance**
- [ ] Test with large datasets
- [ ] Test loading states
- [ ] Test error states
- [ ] Test refresh functionality

## 🔍 Key Features to Test

### ✅ **Authentication & Verification**
- Wallet connection
- World ID verification
- Session management
- User profile updates

### ✅ **Reputation System**
- XP tracking
- Quest completion
- Achievement unlocking
- Level progression

### ✅ **Trading System**
- Trade simulation
- Trade execution
- Trade history
- Risk analysis

### ✅ **Anti-Manipulation**
- Risk scoring
- Suspicious activity detection
- Trade analysis
- User flagging

### ✅ **UI/UX**
- Navigation
- Loading states
- Error handling
- Responsive design

## 🐛 Common Issues to Watch For

1. **Wallet Connection Issues**
   - MetaMask not detected
   - Wrong network
   - Account switching

2. **API Errors**
   - Network timeouts
   - Invalid responses
   - Authentication failures

3. **State Management**
   - Data not refreshing
   - Stale data
   - Race conditions

4. **UI Issues**
   - Layout breaks
   - Missing data
   - Loading states

## 📊 Success Criteria

### ✅ **Functional Requirements**
- All API endpoints working
- Data persistence
- Real-time updates
- Error handling

### ✅ **User Experience**
- Intuitive navigation
- Clear feedback
- Responsive design
- Fast loading

### ✅ **Security**
- Proper authentication
- Data validation
- Rate limiting
- Anti-manipulation

## 🚀 Next Steps

After testing:
1. Document any bugs found
2. Test on different browsers
3. Test on mobile devices
4. Performance testing
5. Security testing
6. User acceptance testing

---

**Happy Testing! 🎉**



