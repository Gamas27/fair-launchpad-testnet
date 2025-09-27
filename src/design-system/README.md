# Fair Launchpad Design System

A comprehensive design system for the Fair Launchpad application, providing consistent UI components, tokens, and patterns.

## 🎨 Design Tokens

### Colors
- **Primary**: Cyan (#00d4ff) - Neon blue for CTAs and highlights
- **Secondary**: Purple (#4ecdc4) - Teal for secondary elements
- **Background**: Dark gradient (gray-900 → blue-900 → gray-900)
- **Cards**: Semi-transparent with backdrop blur
- **Text**: White/light gray with gradient text effects

### Typography
- **Headings**: Bold, large sizes with gradient text
- **Body**: Clean, readable fonts with proper contrast
- **Icons**: Lucide React icons for consistency

### Spacing
- **Grid System**: 8px base unit
- **Component Spacing**: Consistent padding and margins
- **Layout**: Responsive breakpoints

## 🧩 Components

### Core Components
- **Buttons**: Multiple variants including neon glow effect
- **Cards**: Glassmorphism design with subtle borders
- **Progress Bars**: Gradient progress indicators
- **Navigation**: Fixed bottom navigation with active states
- **Forms**: Input fields with validation states
- **Modals**: Overlay components with backdrop blur

### Layout Components
- **Container**: Responsive container with max-width
- **Grid**: Flexible grid system
- **Stack**: Vertical and horizontal stacking
- **Section**: Content sections with consistent spacing

### Feedback Components
- **Alerts**: Success, warning, error, and info states
- **Toasts**: Temporary notifications
- **Loading**: Spinner and skeleton states
- **Empty States**: Placeholder content

## 🎯 Usage

```tsx
import { Button, Card, Progress } from '@/design-system'

// Use design system components
<Button variant="primary" size="lg">
  Launch Token
</Button>

<Card className="glassmorphism">
  <CardContent>
    Token Information
  </CardContent>
</Card>
```

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet**: Responsive grid layouts
- **Desktop**: Enhanced spacing and larger elements
- **Navigation**: Touch-friendly bottom navigation

## 🔧 Development

### Adding New Components
1. Create component in appropriate directory
2. Add to design system exports
3. Include TypeScript definitions
4. Add Storybook stories
5. Write tests

### Design Token Updates
1. Update tokens in `tokens/` directory
2. Update component variants
3. Test across all components
4. Update documentation

## 📚 Documentation

- [Component Library](./components/README.md)
- [Design Tokens](./tokens/README.md)
- [Patterns](./patterns/README.md)
- [Accessibility](./accessibility/README.md)
