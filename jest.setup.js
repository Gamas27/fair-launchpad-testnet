import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    }
  },
}))

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock World ID
jest.mock('@worldcoin/minikit-js', () => ({
  MiniKit: {
    init: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
    getAccount: jest.fn(),
    signMessage: jest.fn(),
    sendTransaction: jest.fn(),
  },
}))

// Mock World ID React
jest.mock('@worldcoin/minikit-react', () => ({
  useMiniKit: () => ({
    isConnected: false,
    account: null,
    connect: jest.fn(),
    disconnect: jest.fn(),
    signMessage: jest.fn(),
    sendTransaction: jest.fn(),
  }),
  MiniKitProvider: ({ children }) => children,
}))

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock utils
jest.mock('@/lib/utils', () => ({
  cn: (...classes) => {
    // Simple mock that handles basic class merging
    const classArray = classes.filter(Boolean).flat()
    const classSet = new Set()
    
    // Add classes and handle conflicts (last one wins)
    classArray.forEach(cls => {
      if (typeof cls === 'string') {
        const parts = cls.split(' ')
        parts.forEach(part => {
          if (part.trim()) {
            // Remove conflicting classes (simple approach)
            const baseClass = part.split('-')[0]
            if (baseClass === 'p' || baseClass === 'm' || baseClass === 'w' || baseClass === 'h') {
              // Remove existing classes with same base
              for (const existing of classSet) {
                if (existing.startsWith(baseClass + '-')) {
                  classSet.delete(existing)
                }
              }
            }
            classSet.add(part)
          }
        })
      }
    })
    
    return Array.from(classSet).join(' ')
  },
  formatCurrency: (amount, currency = 'WLD') => `${amount.toLocaleString()} ${currency}`,
  formatPercentage: (value) => `${(value * 100).toFixed(1)}%`,
  getReputationLevel: (xp) => {
    let level = 'Bronze'
    let icon = '🥉'
    let color = 'text-amber-600'
    let currentLevelXp = 0
    let nextLevelXp = 1000

    if (xp >= 5000) {
      level = 'Diamond'
      icon = '💎'
      color = 'text-blue-400'
      currentLevelXp = 5000
      nextLevelXp = Infinity
    } else if (xp >= 2500) {
      level = 'Gold'
      icon = '🥇'
      color = 'text-yellow-500'
      currentLevelXp = 2500
      nextLevelXp = 5000
    } else if (xp >= 1000) {
      level = 'Silver'
      icon = '🥈'
      color = 'text-gray-400'
      currentLevelXp = 1000
      nextLevelXp = 2500
    }

    const progress = level === 'Diamond' ? 100 : ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100

    return {
      level,
      icon,
      color,
      currentLevelXp,
      nextLevelXp,
      progress: Math.max(0, Math.min(100, progress))
    }
  },
  calculateAllocationCap: (level) => {
    const caps = {
      "Bronze": 200,
      "Silver": 500,
      "Gold": 1000,
      "Diamond": 2500
    }
    return caps[level] || 200
  }
}))

// Mock UI components
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className, ...props }) => (
    <div className={className || ''} {...props}>
      {children}
    </div>
  ),
  CardHeader: ({ children, className, ...props }) => (
    <div className={className || ''} {...props}>
      {children}
    </div>
  ),
  CardTitle: ({ children, className, ...props }) => (
    <h3 className={className || ''} {...props}>
      {children}
    </h3>
  ),
  CardDescription: ({ children, className, ...props }) => (
    <p className={className || ''} {...props}>
      {children}
    </p>
  ),
  CardContent: ({ children, className, ...props }) => (
    <div className={className || ''} {...props}>
      {children}
    </div>
  ),
  CardFooter: ({ children, className, ...props }) => (
    <div className={className || ''} {...props}>
      {children}
    </div>
  ),
}))

jest.mock('@/components/ui/progress', () => ({
  Progress: ({ children, className, value, ...props }) => (
    <div 
      className={className || ''} 
      data-value={value} 
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      {children}
    </div>
  ),
  ProgressIndicator: ({ className, style, ...props }) => (
    <div className={className || ''} style={style} {...props} />
  ),
}))

// Mock Button component with proper class handling
jest.mock('@/components/ui/button', () => {
  const React = require('react')
  
  // Simple class merging function
  const mergeClasses = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }
  
  // Mock buttonVariants function
  const buttonVariants = (options) => {
    const { variant = 'default', size = 'default', className } = options || {}
    
    const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    
    const variantClasses = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
      neon: 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/25',
    }
    
    const sizeClasses = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    }
    
    return mergeClasses(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    )
  }
  
  return {
    Button: ({ children, className, variant, size, asChild = false, ...props }) => {
      const classes = buttonVariants({ variant, size, className })
      
      if (asChild) {
        // For asChild, we need to clone the child element and add classes
        const child = React.Children.only(children)
        return React.cloneElement(child, {
          className: mergeClasses(classes, child.props.className),
          'data-variant': variant,
          'data-size': size,
          ...props,
        })
      }
      
      return (
        <button className={classes} data-variant={variant} data-size={size} {...props}>
          {children}
        </button>
      )
    },
    buttonVariants,
  }
})
