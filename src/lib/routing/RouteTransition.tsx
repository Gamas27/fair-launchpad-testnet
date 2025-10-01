'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useG8Navigation, useG8 } from '../state/context'

interface RouteTransitionProps {
  children: React.ReactNode
  route: string
  className?: string
}

/**
 * Route transition animations and loading states
 */
export function RouteTransition({ children, route, className }: RouteTransitionProps) {
  const { state } = useG8()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [previousRoute, setPreviousRoute] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (state.isLoading) {
      setIsTransitioning(true)
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    } else {
      // Delay hiding transition to allow animation to complete
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false)
        setPreviousRoute(route)
      }, 300)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [state.isLoading, route])

  // Animation variants
  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 1.02
    }
  }

  const loadingVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.8
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 0.8
    }
  }

  const transition = {
    type: 'tween' as const,
    ease: 'easeInOut' as const,
    duration: 0.3
  }

  return (
    <div className={`relative ${className}`}>
      {/* Loading overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="loading"
            variants={loadingVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={transition}
            className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-sm"
          >
            <LoadingSpinner />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <motion.div
        key={route}
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={transition}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  )
}

/**
 * Loading spinner component
 */
function LoadingSpinner() {
  return (
    <div className="text-center">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-purple-200/20 rounded-full"></div>
        
        {/* Spinning ring */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-purple-400 rounded-full animate-spin"></div>
        
        {/* Inner pulse */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
      </div>
      
      <p className="text-white text-sm mt-4 font-medium">Loading...</p>
    </div>
  )
}

/**
 * Route-specific transition variants
 */
export const routeTransitions = {
  // Slide transitions
  slideLeft: {
    initial: { x: '100%', opacity: 0 },
    in: { x: 0, opacity: 1 },
    out: { x: '-100%', opacity: 0 }
  },
  
  slideRight: {
    initial: { x: '-100%', opacity: 0 },
    in: { x: 0, opacity: 1 },
    out: { x: '100%', opacity: 0 }
  },
  
  slideUp: {
    initial: { y: '100%', opacity: 0 },
    in: { y: 0, opacity: 1 },
    out: { y: '-100%', opacity: 0 }
  },
  
  slideDown: {
    initial: { y: '-100%', opacity: 0 },
    in: { y: 0, opacity: 1 },
    out: { y: '100%', opacity: 0 }
  },
  
  // Fade transitions
  fade: {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  },
  
  // Scale transitions
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    in: { scale: 1, opacity: 1 },
    out: { scale: 1.2, opacity: 0 }
  },
  
  // Flip transitions
  flip: {
    initial: { rotateY: 90, opacity: 0 },
    in: { rotateY: 0, opacity: 1 },
    out: { rotateY: -90, opacity: 0 }
  }
}

/**
 * Custom transition hook
 */
export function useRouteTransition(route: string) {
  const [transitionType, setTransitionType] = useState<keyof typeof routeTransitions>('fade')
  
  useEffect(() => {
    // Determine transition type based on route
    switch (route) {
      case 'create':
        setTransitionType('scale')
        break
      case 'g8':
        setTransitionType('slideUp')
        break
      case 'profile':
        setTransitionType('slideRight')
        break
      case 'settings':
        setTransitionType('flip')
        break
      default:
        setTransitionType('fade')
    }
  }, [route])
  
  return {
    transitionType,
    variants: routeTransitions[transitionType],
    setTransitionType
  }
}

/**
 * Route transition wrapper with custom animations
 */
export function AnimatedRoute({ 
  children, 
  route, 
  transitionType = 'fade',
  className 
}: {
  children: React.ReactNode
  route: string
  transitionType?: keyof typeof routeTransitions
  className?: string
}) {
  const variants = routeTransitions[transitionType]
  
  return (
    <motion.div
      key={route}
      variants={variants}
      initial="initial"
      animate="in"
      exit="out"
      transition={{
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * Page transition wrapper
 */
export function PageTransition({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
