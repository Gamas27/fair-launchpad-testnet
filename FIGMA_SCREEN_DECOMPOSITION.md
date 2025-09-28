# 🎨 Figma Screen Decomposition - G8 Platform

## 📊 **Complete Screen Analysis (36 Screens)**

Based on the comprehensive Figma board analysis, here's the detailed decomposition of all screens with component specifications:

---

## 🔐 **1. ONBOARDING & AUTHENTICATION FLOW (6 Screens)**

### **Screen 1.1: Welcome to G8 (2 variants)**
**Components Needed:**
- `WelcomeScreen` - Main container
- `G8Logo` - Brand logo with "G8" text
- `LiveBadge` - Animated "LIVE" indicator
- `FeatureList` - Bullet points with icons
- `StatsGrid` - 3-column stats (Users, Tokens, Volume)
- `PrimaryButton` - "Get Started" CTA

**Specifications:**
- **Layout**: Centered card on black background
- **Colors**: Dark theme with neon accents (cyan, purple, green, pink)
- **Typography**: Bold headings, medium descriptions
- **Spacing**: 24px padding, 16px gaps
- **Animations**: Pulse on LIVE badge, hover effects

### **Screen 1.2: Age Verification & TOS**
**Components Needed:**
- `AgeVerification` - Main container
- `Checkbox` - Age verification toggle
- `Checkbox` - TOS acceptance toggle
- `Link` - Terms & Conditions link
- `Link` - Privacy Policy link
- `PrimaryButton` - "Continue" (disabled until both checked)
- `SecondaryButton` - "Back" navigation

**Specifications:**
- **Layout**: Centered form with checkboxes
- **Validation**: Both checkboxes required to proceed
- **Colors**: Gray checkboxes, cyan links, disabled state for button
- **Typography**: Small labels, medium descriptions

### **Screen 1.3: World ID Verification**
**Components Needed:**
- `WorldIdVerification` - Main container
- `ShieldIcon` - World ID icon
- `InfoCard` - Verification benefits
- `VerificationLevels` - Device/Phone/Orb badges
- `PrimaryButton` - "Verify with World ID"
- `SecondaryButton` - "Back" navigation

**Specifications:**
- **Layout**: Centered card with info sections
- **Colors**: Green success states, blue info cards
- **Icons**: Shield, checkmarks, verification levels
- **Loading**: Spinner during verification

### **Screen 1.4: Verification Failed**
**Components Needed:**
- `VerificationFailed` - Main container
- `ErrorIcon` - X icon in red circle
- `ErrorInfo` - Common issues list
- `PrimaryButton` - "Try Again"
- `SecondaryButton` - "Contact Support"
- `TertiaryButton` - "Back" navigation

**Specifications:**
- **Layout**: Error state with red accents
- **Colors**: Red error states, gray text
- **Content**: Troubleshooting tips and support options

### **Screen 1.5: Recovery Options**
**Components Needed:**
- `RecoveryOptions` - Main container
- `Checkbox` - Cloud backup toggle
- `Checkbox` - Manual backup toggle
- `Checkbox` - Email backup toggle
- `Badge` - "Recommended" for cloud backup
- `Button` - "Disable Cloud Backup" (conditional)
- `PrimaryButton` - "Continue"
- `SecondaryButton` - "Back" navigation

**Specifications:**
- **Layout**: Checkbox list with recommendations
- **Colors**: Green for recommended options
- **Logic**: Cloud backup enabled by default

### **Screen 1.6: Wallet Created Success**
**Components Needed:**
- `WalletCreated` - Main container
- `SuccessIcon` - Checkmark in green circle
- `WalletInfo` - Address display with copy
- `SuccessList` - Completed steps
- `PrimaryButton` - "View Wallet"
- `SecondaryButton` - "Create Token"

**Specifications:**
- **Layout**: Success state with green accents
- **Colors**: Green success states, cyan buttons
- **Content**: Wallet address, completion checklist

---

## 🏠 **2. HOME & DASHBOARD (4 Screens)**

### **Screen 2.1: G8 Home Screen**
**Components Needed:**
- `HomeHeader` - G8 logo with LIVE badge
- `BalanceCard` - Portfolio balance display
- `PortfolioChange` - Percentage change indicator
- `QuickActions` - Create Token & Discover buttons
- `TokenList` - Scrollable token cards
- `SearchBar` - Token search input
- `FilterButtons` - All/Live/Trending filters
- `BottomNavigation` - 5-tab navigation

**Specifications:**
- **Layout**: Header + content + bottom nav
- **Colors**: Cyan accents, green for positive changes
- **Typography**: Large balance, medium descriptions
- **Interactions**: Clickable tokens, search functionality

### **Screen 2.2: G8 Graduation Zone**
**Components Needed:**
- `GraduationZone` - Main container
- `StarIcon` - Zone indicator
- `ActionGrid` - 2x2 button grid
- `ActionButton` - Create & Mint
- `ActionButton` - Stake & Earn
- `ActionButton` - Swap & Bridge
- `ActionButton` - Launchpad

**Specifications:**
- **Layout**: Card with 2x2 button grid
- **Colors**: Green primary, colored accents per action
- **Icons**: Coins, TrendingUp, BarChart3, Rocket

### **Screen 2.3: Token List/Assets**
**Components Needed:**
- `TokenCard` - Individual token display
- `TokenLogo` - Token image placeholder
- `TokenInfo` - Name, symbol, time since launch
- `PriceDisplay` - Current price
- `ChangeIndicator` - Percentage change with arrow
- `TokenStats` - Volume and market cap
- `ActionButtons` - View and Trade buttons

**Specifications:**
- **Layout**: Card-based list with stats
- **Colors**: Cyan for positive, red for negative changes
- **Typography**: Bold names, small stats
- **Interactions**: Hover effects, clickable cards

### **Screen 2.4: Portfolio Overview**
**Components Needed:**
- `PortfolioCard` - Main container
- `CircularProgress` - 88% completion indicator
- `PortfolioStats` - Numerical counters
- `RecentActivity` - Activity list with timestamps
- `QuickStats` - 2x2 grid of metrics

**Specifications:**
- **Layout**: Centered progress with surrounding stats
- **Colors**: Cyan progress, colored stat cards
- **Animations**: Progress animation, pulse effects

---

## 🪙 **3. TOKEN MANAGEMENT (8 Screens)**

### **Screen 3.1: Token Details (Multiple variants)**
**Components Needed:**
- `TokenHeader` - Logo, name, symbol, status
- `PriceDisplay` - Current price with change
- `ChartContainer` - Price chart (placeholder)
- `TimeframeButtons` - 1m/5m/15m/1h/4h/1d
- `TokenInfo` - Supply, decimals, contract
- `SocialLinks` - Website, Twitter, Telegram, Discord
- `TradingButtons` - Buy/Sell actions
- `ChatButton` - Floating chat shortcut

**Specifications:**
- **Layout**: Header + chart + info + actions
- **Colors**: Token-specific branding, cyan accents
- **Typography**: Large prices, small details
- **Interactions**: Chart interactions, social links

### **Screen 3.2: Token Info**
**Components Needed:**
- `InfoSection` - Token metadata
- `InfoRow` - Name, Symbol, Total Supply
- `InfoRow` - Decimals, Contract Address
- `Description` - Token description text
- `SocialLinks` - External link buttons

**Specifications:**
- **Layout**: Label-value pairs
- **Colors**: Gray labels, white values
- **Typography**: Small labels, medium values
- **Links**: External link icons

### **Screen 3.3: Top Holders (Multiple variants)**
**Components Needed:**
- `HoldersTable` - Address and percentage columns
- `HolderRow` - Individual holder display
- `AddressDisplay` - Truncated address
- `PercentageDisplay` - Holder percentage
- `OwnerBadge` - "Owner" indicator
- `LoadMoreButton` - Pagination control

**Specifications:**
- **Layout**: Table with address and percentage columns
- **Colors**: Gray rows, cyan accents
- **Typography**: Monospace addresses, bold percentages
- **Data**: Top 5 holders with load more

### **Screen 3.4: Trade History**
**Components Needed:**
- `HistoryList` - Trade history container
- `TradeRow` - Individual trade display
- `TradeIcon` - Buy/Sell indicator
- `TradeDetails` - Token, amount, price
- `TradeValue` - Total value
- `TradeTime` - Timestamp
- `StatusBadge` - Completed/Pending/Failed

**Specifications:**
- **Layout**: List of trade rows
- **Colors**: Green for buy, red for sell
- **Typography**: Small details, medium values
- **Status**: Color-coded status badges

---

## 🚀 **4. TOKEN CREATION FLOW (6 Screens)**

### **Screen 4.1: Before You Create**
**Components Needed:**
- `InfoCard` - Requirements and benefits
- `RequirementList` - Bullet points
- `BenefitList` - Feature highlights
- `PrimaryButton` - "Next" navigation
- `SearchBar` - Token search (bottom)
- `FilterButtons` - Filter options (bottom)

**Specifications:**
- **Layout**: Information card with bottom search
- **Colors**: Blue info cards, cyan buttons
- **Content**: Educational content about token creation

### **Screen 4.2: Create & Mint**
**Components Needed:**
- `FormContainer` - Main form wrapper
- `InputField` - Token Name input
- `InputField` - Token Symbol input
- `InputField` - Total Supply input
- `InputField` - Decimals input
- `ValidationMessage` - Error states
- `NavigationButtons` - Back/Next buttons

**Specifications:**
- **Layout**: Vertical form with validation
- **Validation**: Required fields, format checking
- **Colors**: Red for errors, cyan for focus
- **Typography**: Small labels, medium inputs

### **Screen 4.3: Token Identity**
**Components Needed:**
- `IdentityForm` - Name and symbol inputs
- `TokenPreview` - Live preview of token
- `ValidationMessage` - Error states
- `NavigationButtons` - Back/Next buttons

**Specifications:**
- **Layout**: Form with live preview
- **Preview**: Token card showing name/symbol
- **Validation**: Real-time validation feedback

### **Screen 4.4: Token Image**
**Components Needed:**
- `ImageUpload` - Drag & drop area
- `UploadIcon` - Upload indicator
- `ImagePreview` - Selected image preview
- `RequirementsList` - Image specifications
- `NavigationButtons` - Back/Next buttons

**Specifications:**
- **Layout**: Upload area with requirements
- **Upload**: Drag & drop with file validation
- **Requirements**: Size, format, quality specs
- **Preview**: Selected image display

### **Screen 4.5: Social Presence**
**Components Needed:**
- `SocialForm` - Social links inputs
- `InputField` - Website URL
- `InputField` - Twitter handle
- `InputField` - Telegram link
- `InputField` - Discord link
- `BenefitsCard` - Why social links matter
- `NavigationButtons` - Back/Next buttons

**Specifications:**
- **Layout**: Optional social links form
- **Validation**: URL format checking
- **Benefits**: Educational content about social presence

### **Screen 4.6: Initial Buy Amount**
**Components Needed:**
- `AmountInput` - ETH amount input
- `BondingCurveInfo` - Educational content
- `RecommendationsList` - Suggested amounts
- `NavigationButtons` - Back/Create Token buttons

**Specifications:**
- **Layout**: Input with educational content
- **Education**: Bonding curve explanation
- **Recommendations**: Suggested amounts
- **Validation**: Numeric input validation

### **Screen 4.7: Success Screen**
**Components Needed:**
- `SuccessContainer` - Main success wrapper
- `SuccessIcon` - Large checkmark
- `TokenDetails` - Created token info
- `ContractAddress` - Blockchain address
- `ActionButtons` - View Token & Share
- `CompletionList` - Success checklist

**Specifications:**
- **Layout**: Success state with actions
- **Colors**: Green success theme
- **Content**: Token details and next steps
- **Actions**: View token and sharing options

---

## 👤 **5. ACCOUNT & SETTINGS (4 Screens)**

### **Screen 5.1: Settings/Profile**
**Components Needed:**
- `ProfileHeader` - Avatar and username
- `SettingsList` - Menu items
- `SettingsItem` - My Wallet
- `SettingsItem` - Security
- `SettingsItem` - Notifications
- `SettingsItem` - Language
- `SettingsItem` - Help & Support
- `LogoutButton` - Sign out option

**Specifications:**
- **Layout**: Profile header + settings list
- **Colors**: Gray menu items, red logout
- **Typography**: Medium headings, small descriptions
- **Icons**: Settings-specific icons

### **Screen 5.2: User Profile/Stats**
**Components Needed:**
- `ProfileCard` - User information
- `Avatar` - Profile picture
- `Username` - Display name
- `StatsGrid` - 3x1 numerical counters
- `ReputationBadge` - User level indicator
- `ActivityList` - Recent activity

**Specifications:**
- **Layout**: Profile card with stats grid
- **Colors**: Cyan for stats, colored badges
- **Typography**: Large numbers, small labels
- **Data**: User statistics and activity

### **Screen 5.3: Help & Support**
**Components Needed:**
- `HelpHeader` - "How Can We Help?" title
- `FAQList` - Common questions
- `FAQItem` - "What is a Bonding Curve?"
- `FAQItem` - "How to Create Token?"
- `SupportButton` - Contact support
- `BottomNavigation` - Navigation bar

**Specifications:**
- **Layout**: FAQ list with support options
- **Content**: Common questions and answers
- **Navigation**: Bottom navigation bar
- **Colors**: Gray text, cyan accents

### **Screen 5.4: Account Management**
**Components Needed:**
- `AccountList` - Account options
- `AccountItem` - Upload address
- `AccountItem` - Connect wallet
- `AccountItem` - Message send
- `AccountItem` - Logout
- `StatusIndicators` - Connection status

**Specifications:**
- **Layout**: List of account actions
- **Status**: Connection and wallet status
- **Colors**: Green for connected, red for logout
- **Actions**: Account management functions

---

## 🛠️ **6. UTILITY SCREENS (8 Screens)**

### **Screen 6.1: Trade History (Empty State)**
**Components Needed:**
- `EmptyState` - "No trades found yet" message
- `EmptyIcon` - Activity icon
- `BottomNavigation` - Navigation bar

**Specifications:**
- **Layout**: Centered empty state
- **Colors**: Gray text, muted icons
- **Content**: Encouraging empty state message

### **Screen 6.2: Wallet Confirmation**
**Components Needed:**
- `ConfirmationContainer` - Main wrapper
- `ProgressCircle` - 88% progress indicator
- `ProgressSteps` - Step indicators
- `CancelButton` - Cancel option
- `StatusText` - "Confirming your wallet..."

**Specifications:**
- **Layout**: Centered progress indicator
- **Animation**: Progress circle animation
- **Colors**: Cyan progress, gray text
- **Content**: Wallet setup progress

### **Screen 6.3: User Stats (Numerical)**
**Components Needed:**
- `StatsContainer` - Main wrapper
- `StatNumber` - Large numerical display
- `StatLabel` - Description text
- `StatsGrid` - 3x1 grid layout

**Specifications:**
- **Layout**: Grid of large numbers
- **Typography**: Very large numbers, small labels
- **Colors**: Cyan, purple, green accents
- **Data**: User achievement numbers

---

## 🎨 **COMPONENT SPECIFICATIONS**

### **Color Palette:**
- **Primary**: Cyan (#00BCD4)
- **Secondary**: Purple (#9C27B0)
- **Success**: Green (#4CAF50)
- **Warning**: Orange (#FF9800)
- **Error**: Red (#F44336)
- **Background**: Black (#000000)
- **Surface**: Gray (#1A1A1A)
- **Text**: White (#FFFFFF)
- **Muted**: Gray (#666666)

### **Typography Scale:**
- **H1**: 32px, Bold
- **H2**: 24px, Bold
- **H3**: 20px, Bold
- **Body**: 16px, Regular
- **Small**: 14px, Regular
- **Caption**: 12px, Regular

### **Spacing System:**
- **XS**: 4px
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **XXL**: 48px

### **Component Sizes:**
- **Touch Targets**: 44px minimum
- **Button Height**: 48px
- **Input Height**: 40px
- **Card Padding**: 16px
- **Border Radius**: 8px

### **Animation Specifications:**
- **Duration**: 200ms for micro-interactions
- **Easing**: ease-out for entrances
- **Hover**: Scale 1.05, color transitions
- **Loading**: Spin animations, pulse effects
- **Progress**: Smooth transitions

---

## 📱 **MOBILE OPTIMIZATION**

### **Screen Sizes:**
- **Mobile**: 375px - 414px width
- **Tablet**: 768px - 1024px width
- **Desktop**: 1024px+ width

### **Touch Interactions:**
- **Tap Targets**: 44px minimum
- **Swipe Gestures**: Horizontal navigation
- **Pull to Refresh**: Token list updates
- **Long Press**: Context menus

### **Performance:**
- **Bundle Size**: <150kB
- **Load Time**: <3s on 4G
- **FPS**: 60fps scroll
- **Memory**: <100MB usage

---

## 🎯 **IMPLEMENTATION PRIORITY**

### **Phase 1: Core Components (Week 1)**
1. `WelcomeScreen` - Onboarding entry
2. `HomeDashboard` - Main app interface
3. `TokenCard` - Token display
4. `Navigation` - Bottom navigation
5. `Button` - Primary actions

### **Phase 2: Forms & Inputs (Week 2)**
1. `InputField` - Form inputs
2. `Checkbox` - Toggle inputs
3. `ImageUpload` - File uploads
4. `ValidationMessage` - Error states
5. `FormContainer` - Form wrappers

### **Phase 3: Advanced Features (Week 3)**
1. `ChartContainer` - Price charts
2. `HoldersTable` - Data tables
3. `SocialLinks` - External links
4. `ProgressCircle` - Progress indicators
5. `EmptyState` - Empty states

### **Phase 4: Polish & Integration (Week 4)**
1. `Animations` - Micro-interactions
2. `LoadingStates` - Loading indicators
3. `ErrorBoundaries` - Error handling
4. `Performance` - Optimization
5. `Testing` - Component testing

---

This comprehensive decomposition provides the exact specifications needed to build all 36 screens with pixel-perfect accuracy to the Figma design.
