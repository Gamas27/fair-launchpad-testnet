'use client'

import React, { useEffect, useRef } from 'react'
import { useStateOptimization } from './optimization'

interface PerformanceProfilerProps {
  componentName: string
  children: React.ReactNode
}

/**
 * Performance profiler component
 */
export function PerformanceProfiler({ 
  componentName, 
  children 
}: PerformanceProfilerProps) {
  const renderStartTime = useRef<number>(0)
  const { trackRender } = useStateOptimization()
  
  useEffect(() => {
    renderStartTime.current = performance.now()
  })
  
  useEffect(() => {
    const renderTime = performance.now() - renderStartTime.current
    trackRender(componentName, renderTime, [])
  })
  
  return <>{children}</>
}
