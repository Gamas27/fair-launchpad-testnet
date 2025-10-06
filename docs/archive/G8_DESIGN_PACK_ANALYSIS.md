# 🎨 G8 Design Pack Analysis

## 📋 **Design System Overview**

Based on the G8 design pack analysis, here's a comprehensive breakdown of the design system specifications:

### 🎨 **Color System (Design Tokens)**

#### **Background Colors**
- **Primary Background**: `#0B0E13` (Deep dark blue-black)
- **Surface**: `#0F141A` (Slightly lighter dark blue)
- **Surface 2**: `#121822` (Card backgrounds)

#### **Text Colors**
- **Primary Text**: `#EAF1FF` (Light blue-white)
- **Secondary Text**: `#C2CBD8` (Muted blue-gray)

#### **Accent Colors**
- **Success**: `#34D399` (Green)
- **Warning**: `#F59E0B` (Orange)
- **Error**: `#F87171` (Red)
- **Stroke**: `#27313A` (Border color)

#### **Gradient System**
- **Accent Gradient**: Mint → Lilac → Sky
  - **Mint**: `#A8FFE3` (0%)
  - **Lilac**: `#CAB1FF` (50%)
  - **Sky**: `#AEE3FF` (100%)
  - **Angle**: 135°

### 📏 **Spacing System**
- **XS**: 4px
- **SM**: 8px
- **MD**: 12px
- **LG**: 16px
- **XL**: 24px
- **XXL**: 32px

### 🔄 **Border Radius**
- **XS**: 4px
- **SM**: 8px
- **MD**: 12px
- **LG**: 16px
- **XL**: 20px

### 🎭 **Typography System**

#### **Font Stack**
- **Primary**: Satoshi
- **Fallback**: Inter, system-ui, -apple-system, Segoe UI, Roboto
- **Monospace**: ui-monospace, SFMono-Regular, Menlo, Monaco

#### **Text Styles**
- **Display**: 28px, 700 weight, 0.2 letter-spacing
- **H1**: 22px, 700 weight
- **H2**: 18px, 600 weight
- **Body**: 14px, 500 weight
- **Caption**: 12px, 500 weight
- **Mono**: 12px, 500 weight (monospace)

### 🎨 **Shadow System**
- **Small**: `0 2px 8px rgba(0,0,0,0.35)`
- **Medium**: `0 8px 24px rgba(0,0,0,0.45)`
- **Glow**: `0 0 24px rgba(168,255,227,0.25)`

## 🧩 **Component System**

### **Core Components**

#### **1. AppBar**
- **Props**: title, showSearch, rightActions
- **Tokens**: bg (surface), text (textPrimary), height (56px)
- **Notes**: Top bar with optional inline search pill

#### **2. BottomNav**
- **Props**: items, active
- **Tokens**: bg (surface2), text (textSecondary), active (textPrimary)

#### **3. PrimaryButton**
- **Props**: label, iconLeft, iconRight, disabled
- **Variants**: size (sm, md, lg)
- **Tokens**: bgGrad (accentGradient), text (bg), radius (lg), shadow (glow)

#### **4. IconButton**
- **Props**: icon, ariaLabel
- **Tokens**: bg (surface), text (textPrimary), radius (md)

#### **5. SearchPill**
- **Props**: placeholder, value, onSubmit
- **Tokens**: bg (#0F141A), border (stroke), text (textSecondary), radius (md)

#### **6. SegmentedControl**
- **Props**: segments, active
- **Tokens**: track (surface), activeGrad (accentGradient), radius (md)

#### **7. TabPills**
- **Props**: tabs, active
- **Tokens**: bg (surface), active (textPrimary)

#### **8. StatCard**
- **Props**: title, value, delta, icon
- **Tokens**: bg (surface2), radius (lg), border (stroke)

#### **9. ChartCard**
- **Props**: symbol, timeframes, activeTf
- **Tokens**: bg (surface), radius (lg), border (stroke)

#### **10. InfoCard**
- **Props**: title, rows
- **Tokens**: bg (surface2), radius (lg), border (stroke)

#### **11. FormField**
- **Props**: label, placeholder, value, help, error
- **Tokens**: bg (surface), border (stroke), radius (md)

#### **12. TokenRow**
- **Props**: avatar, name, symbol, price, spark
- **Tokens**: bg (transparent), text (textPrimary)

#### **13. EmptyState**
- **Props**: title, body, primaryCta, secondaryLink
- **Tokens**: bg (surface2), radius (lg)

#### **14. Toast**
- **Props**: type, message
- **Tokens**: bg (surface), radius (md)

#### **15. Sheet**
- **Props**: title, children
- **Tokens**: bg (surface), radius (xl)

## 📱 **Screen Layouts**

### **1. Home Feed Screen**
```json
{
  "name": "home_feed",
  "layout": {
    "type": "col",
    "children": [
      {
        "type": "row",
        "children": [
          { "type": "text", "props": { "style": "display", "text": "G8" } },
          { "type": "search", "props": { "placeholder": "Search tokens, creators…" } }
        ]
      },
      {
        "type": "segmented",
        "props": {
          "items": [
            { "key": "cap", "label": "Market Cap" },
            { "key": "vol", "label": "Volume" },
            { "key": "new", "label": "Latest" }
          ],
          "active": "new"
        }
      },
      {
        "type": "list",
        "props": {
          "kind": "tokenRow",
          "items": [
            {
              "avatar": "",
              "name": "WORLD CAT",
              "symbol": "WCAT",
              "price": "0.042 WLD",
              "spark": "up"
            }
          ]
        }
      },
      {
        "type": "bottomNav",
        "props": { "active": "home" }
      }
    ]
  }
}
```

### **2. Onboarding World ID Screen**
```json
{
  "name": "onboarding_worldid",
  "layout": {
    "type": "col",
    "children": [
      {
        "type": "card",
        "children": [
          {
            "type": "col",
            "children": [
              { "type": "text", "props": { "style": "h1", "text": "Verify your World ID" } },
              { "type": "text", "props": { "style": "body", "text": "Prove personhood to create your wallet." } }
            ]
          }
        ]
      },
      {
        "type": "button",
        "props": { "label": "Verify with World ID", "variant": "primary" }
      },
      {
        "type": "text",
        "props": { "style": "caption", "text": "By continuing you agree to the Terms." }
      }
    ]
  }
}
```

### **3. Token Details Screen**
```json
{
  "name": "token_details",
  "layout": {
    "type": "col",
    "children": [
      {
        "type": "card",
        "children": [
          {
            "type": "col",
            "children": [
              {
                "type": "row",
                "children": [
                  { "type": "icon", "props": { "name": "logo" } },
                  {
                    "type": "col",
                    "children": [
                      { "type": "text", "props": { "style": "h2", "text": "WORLD CAT" } },
                      { "type": "text", "props": { "style": "caption", "text": "Verified links" } }
                    ]
                  }
                ]
              },
              {
                "type": "row",
                "children": [
                  { "type": "text", "props": { "style": "body", "text": "Contract" } },
                  { "type": "text", "props": { "style": "mono", "text": "0x1234…abcd" } }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### **4. Create Token Wizard Step 1**
```json
{
  "name": "create_wizard_step1_identity",
  "layout": {
    "type": "col",
    "children": [
      { "type": "text", "props": { "style": "h1", "text": "Create Token" } },
      { "type": "text", "props": { "style": "caption", "text": "Step 1 of 5 — Identity" } },
      { "type": "formField", "props": { "label": "Token name", "placeholder": "e.g. OMG" } },
      { "type": "formField", "props": { "label": "Symbol", "placeholder": "e.g. OMG" } },
      { "type": "button", "props": { "label": "Continue", "variant": "primary" } }
    ]
  }
}
```

## 🎯 **Key Design Principles**

### **1. Layout System**
- **Column-based layouts** with consistent 12px gaps
- **Card-based components** with 16px padding
- **Row layouts** for horizontal arrangements
- **Stack layouts** for vertical arrangements

### **2. Component Hierarchy**
- **Display text**: 28px for main headings
- **H1**: 22px for section headings
- **H2**: 18px for subsection headings
- **Body**: 14px for main content
- **Caption**: 12px for labels and metadata

### **3. Color Usage**
- **Primary background**: Deep dark blue-black
- **Surface cards**: Slightly lighter backgrounds
- **Text hierarchy**: Primary white, secondary muted
- **Accent gradient**: Mint to lilac to sky for primary actions

### **4. Interactive Elements**
- **Primary buttons**: Gradient background with glow shadow
- **Secondary buttons**: Surface background
- **Form fields**: Surface background with stroke borders
- **Search pills**: Dark background with stroke borders

## 🚀 **Implementation Recommendations**

### **1. Update Current Design System**
- Replace current color scheme with G8 design tokens
- Update typography to use Satoshi font
- Implement proper spacing system (4px, 8px, 12px, 16px, 24px, 32px)
- Add gradient system for primary actions

### **2. Component Updates**
- Update G8Button to use gradient backgrounds
- Update G8Card to use proper surface colors
- Update G8Input to match form field specifications
- Add new components: SearchPill, SegmentedControl, StatCard

### **3. Screen Implementation**
- Implement proper home feed with search and segmented controls
- Create token details screen with info cards
- Build token creation wizard with form fields
- Add proper onboarding flow with World ID verification

### **4. Layout System**
- Implement column-based layout system
- Add proper gap spacing (12px default)
- Create card-based component system
- Add row/column/stack layout components

## 📊 **Current vs Design Pack Comparison**

### **✅ What's Already Aligned**
- Dark theme approach
- Card-based components
- Mobile-first design
- Gradient usage for primary actions

### **🔍 What Needs Updates**
- **Color system**: Current colors don't match design tokens
- **Typography**: Need to implement Satoshi font and proper sizing
- **Spacing**: Current spacing doesn't follow 4px grid system
- **Components**: Missing SearchPill, SegmentedControl, StatCard
- **Layout**: Need proper column/row/stack system

### **🚀 Next Steps**
1. **Update design tokens** to match G8 specifications
2. **Implement missing components** (SearchPill, SegmentedControl, etc.)
3. **Update existing components** to match design specifications
4. **Create proper layout system** with column/row/stack components
5. **Implement screen layouts** based on JSON specifications

The G8 design pack provides a comprehensive design system that's much more detailed and specific than our current implementation. We need to align our components and styling with these exact specifications to achieve the proper G8 design.
