# World App Deployment Plan

## 🎯 **Deployment Goals**

### **Target Features**
1. **Welcome + Onboarding Flow** with World ID and Privy wallet integration
2. **Main App Screen** with Tabs (Home, Token Creation, Token Discovery, Reputation)
3. **Robust Navigation** and state management
4. **API Integration** with backend services
5. **Smart Contract Integration** for token operations
6. **World App Styling** compliance

## 🔧 **Current Issues & Solutions**

### **1. CSS Rendering Issues** ✅ FIXED
**Problem**: Custom utility classes conflicting with Tailwind
**Solution**: Removed conflicting CSS, let Tailwind handle styling
**Status**: ✅ Fixed - G8 design system now properly applied

### **2. World ID Integration** ⚠️ NEEDS FIX
**Problem**: "World ID API key is required" error
**Solution**: Add environment variable for World ID API key
**Status**: ⚠️ In Progress

### **3. World App Compliance** 📋 TODO
**Requirements**:
- Mobile-first design
- Tab navigation
- Snap-to text boxes
- No footers/sidebars
- Smooth transitions
- Consistent backgrounds
- Clear navigation cues

## 🚀 **Implementation Plan**

### **Phase 1: Fix Core Issues** (30 minutes)

#### **1.1 Fix World ID Integration**
```bash
# Add to .env.local
NEXT_PUBLIC_WORLD_ID_API_KEY=your_world_id_api_key_here
```

#### **1.2 Add World App Meta Tags**
Update `src/app/layout.tsx`:
```tsx
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta name="theme-color" content="#0B0E13">
```

#### **1.3 Install World App UI Kit**
```bash
npm install @worldcoin/mini-apps-ui-kit-react
```

### **Phase 2: Enhance Onboarding Flow** (45 minutes)

#### **2.1 World ID Integration**
- Fix API key configuration
- Add proper World ID verification flow
- Implement error handling

#### **2.2 Privy Wallet Integration**
- Add Privy wallet connection
- Implement wallet creation flow
- Add wallet state management

#### **2.3 Onboarding Screens**
- Welcome screen
- Terms of Service
- World ID verification
- Wallet creation
- Completion screen

### **Phase 3: Main App Implementation** (60 minutes)

#### **3.1 Tab Navigation**
- Home tab with portfolio
- Token Creation tab
- Discovery tab with search
- Reputation tab with user stats

#### **3.2 Smart Contract Integration**
- Token creation contracts
- Trading contracts
- Reputation contracts

#### **3.3 State Management**
- Global state with React Context
- Local storage persistence
- Real-time updates

### **Phase 4: World App Compliance** (30 minutes)

#### **4.1 Mobile Optimization**
- Touch-friendly interactions
- Proper viewport handling
- Smooth scrolling

#### **4.2 Navigation**
- Tab-based navigation
- Clear navigation cues
- Consistent styling

#### **4.3 Performance**
- Optimize bundle size
- Lazy loading
- Image optimization

## 📱 **World App Specific Requirements**

### **Design Guidelines**
- **Navigation**: Tab navigation only
- **Input**: Snap-to text boxes
- **Layout**: No footers, sidebars, or excessive scrolling
- **Transitions**: Smooth screen transitions
- **Consistency**: Consistent background colors
- **Responsiveness**: Mobile-first approach

### **Technical Requirements**
- **Viewport**: Proper mobile viewport
- **Touch**: Touch-friendly interactions
- **Performance**: Fast loading and smooth animations
- **Security**: Proper CSP settings

## 🔧 **Implementation Steps**

### **Step 1: Fix World ID (15 minutes)**
1. Add environment variable
2. Update World ID service
3. Test verification flow

### **Step 2: Add Privy Integration (20 minutes)**
1. Install Privy SDK
2. Add wallet connection
3. Implement wallet state

### **Step 3: Enhance Navigation (25 minutes)**
1. Implement tab navigation
2. Add proper routing
3. Add state management

### **Step 4: Smart Contract Integration (30 minutes)**
1. Add contract interfaces
2. Implement token operations
3. Add transaction handling

### **Step 5: World App Compliance (20 minutes)**
1. Add mobile optimizations
2. Implement proper navigation
3. Add performance optimizations

## 📊 **Success Metrics**

### **Technical Metrics**
- ✅ CSS properly rendering
- ✅ World ID verification working
- ✅ Wallet connection functional
- ✅ Navigation smooth and responsive
- ✅ API integration complete

### **User Experience Metrics**
- ✅ Mobile-first design
- ✅ Touch-friendly interactions
- ✅ Fast loading times
- ✅ Smooth animations
- ✅ Clear navigation

### **World App Compliance**
- ✅ Tab navigation
- ✅ Mobile viewport
- ✅ Touch interactions
- ✅ Performance optimized
- ✅ Design guidelines followed

## 🎯 **Next Steps**

1. **Fix World ID integration** (15 min)
2. **Add Privy wallet integration** (20 min)
3. **Enhance navigation system** (25 min)
4. **Implement smart contracts** (30 min)
5. **Add World App compliance** (20 min)

**Total Time**: ~2 hours
**Result**: Fully functional World App with all required features

