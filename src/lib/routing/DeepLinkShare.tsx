'use client'

import React, { useCallback } from 'react'
import { G8Route, G8RouteParams } from './types'
import { createDeepLinkShare } from './DeepLinking'

interface DeepLinkShareProps {
  route: G8Route
  params?: G8RouteParams
  children: React.ReactNode
  className?: string
}

/**
 * Deep link sharing component
 */
export function DeepLinkShare({ 
  route, 
  params, 
  children,
  className 
}: DeepLinkShareProps) {
  const handleShare = useCallback(async () => {
    const shareUtil = createDeepLinkShare(route, params)
    await shareUtil.share()
  }, [route, params])
  
  return (
    <div onClick={handleShare} className={className}>
      {children}
    </div>
  )
}
