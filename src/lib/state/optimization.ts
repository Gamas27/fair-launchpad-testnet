'use client'

import { useCallback, useMemo, useRef, useEffect } from 'react'
import { G8AppState, G8Action } from './types'

export interface PerformanceMetrics {
  renderCount: number
  lastRenderTime: number
  averageRenderTime: number
  memoryUsage: number
  stateSize: number
}

export interface OptimizationConfig {
  enableMemoization: boolean
  enableBatching: boolean
  enableDebouncing: boolean
  debounceDelay: number
  maxRenderTime: number
  enableProfiling: boolean
  logPerformance: boolean
}

export interface RenderInfo {
  component: string
  renderTime: number
  stateChanges: string[]
  timestamp: number
}

/**
 * Performance Optimization Service
 * Optimizes state updates and prevents unnecessary re-renders
 */
export class StateOptimizationService {
  private static instance: StateOptimizationService
  private config: OptimizationConfig
  private metrics: Map<string, PerformanceMetrics> = new Map()
  private renderHistory: RenderInfo[] = []
  private pendingUpdates: Map<string, G8Action[]> = new Map()
  private debounceTimers: Map<string, NodeJS.Timeout> = new Map()
  
  private constructor() {
    this.config = {
      enableMemoization: true,
      enableBatching: true,
      enableDebouncing: true,
      debounceDelay: 16, // 60fps
      maxRenderTime: 16,
      enableProfiling: process.env.NODE_ENV === 'development',
      logPerformance: process.env.NODE_ENV === 'development'
    }
  }
  
  static getInstance(): StateOptimizationService {
    if (!StateOptimizationService.instance) {
      StateOptimizationService.instance = new StateOptimizationService()
    }
    return StateOptimizationService.instance
  }
  
  /**
   * Configure optimization settings
   */
  configure(config: Partial<OptimizationConfig>) {
    this.config = { ...this.config, ...config }
  }
  
  /**
   * Track component render
   */
  trackRender(componentName: string, renderTime: number, stateChanges: string[]) {
    if (!this.config.enableProfiling) return
    
    const renderInfo: RenderInfo = {
      component: componentName,
      renderTime,
      stateChanges,
      timestamp: Date.now()
    }
    
    this.renderHistory.push(renderInfo)
    
    // Keep only last 100 renders
    if (this.renderHistory.length > 100) {
      this.renderHistory.shift()
    }
    
    // Update metrics
    this.updateMetrics(componentName, renderTime)
    
    // Log performance if enabled
    if (this.config.logPerformance && renderTime > this.config.maxRenderTime) {
      console.warn(`Slow render detected in ${componentName}: ${renderTime}ms`)
    }
  }
  
  /**
   * Batch state updates
   */
  batchUpdates(componentId: string, action: G8Action) {
    if (!this.config.enableBatching) {
      return [action]
    }
    
    if (!this.pendingUpdates.has(componentId)) {
      this.pendingUpdates.set(componentId, [])
    }
    
    this.pendingUpdates.get(componentId)!.push(action)
    
    // Process batched updates after a short delay
    setTimeout(() => {
      this.processBatchedUpdates(componentId)
    }, 0)
    
    return []
  }
  
  /**
   * Process batched updates
   */
  private processBatchedUpdates(componentId: string) {
    const updates = this.pendingUpdates.get(componentId)
    if (!updates || updates.length === 0) return
    
    // Clear pending updates
    this.pendingUpdates.set(componentId, [])
    
    // Return all batched actions
    return updates
  }
  
  /**
   * Debounce state updates
   */
  debounceUpdate(componentId: string, action: G8Action, delay?: number): G8Action[] {
    if (!this.config.enableDebouncing) {
      return [action]
    }
    
    const debounceDelay = delay || this.config.debounceDelay
    
    // Clear existing timer
    const existingTimer = this.debounceTimers.get(componentId)
    if (existingTimer) {
      clearTimeout(existingTimer)
    }
    
    // Set new timer
    const timer = setTimeout(() => {
      this.debounceTimers.delete(componentId)
    }, debounceDelay)
    
    this.debounceTimers.set(componentId, timer)
    
    // Return empty array to prevent immediate update
    return []
  }
  
  /**
   * Create optimized selector
   */
  createSelector<T>(selector: (state: G8AppState) => T, dependencies: string[]) {
    let lastResult: T | null = null
    let lastDependencies: any[] = []
    
    return (state: G8AppState) => {
      // Check if dependencies have changed
      const currentDependencies = dependencies.map(dep => {
        const keys = dep.split('.')
        let value: any = state
        for (const key of keys) {
          value = value?.[key]
        }
        return value
      })
      
      const dependenciesChanged = currentDependencies.some((dep, index) => 
        dep !== lastDependencies[index]
      )
      
      if (!dependenciesChanged && lastResult !== null) {
        return lastResult
      }
      
      lastResult = selector(state)
      lastDependencies = currentDependencies
      
      return lastResult
    }
  }
  
  /**
   * Create memoized callback
   */
  createMemoizedCallback<T extends (...args: any[]) => any>(
    callback: T,
    dependencies: any[]
  ): T {
    let lastArgs: any[] = []
    let lastResult: any = null
    
    return ((...args: any[]) => {
      const argsChanged = args.some((arg, index) => arg !== lastArgs[index])
      const depsChanged = dependencies.some((dep, index) => dep !== dependencies[index])
      
      if (!argsChanged && !depsChanged && lastResult !== null) {
        return lastResult
      }
      
      lastResult = callback(...args)
      lastArgs = args
      
      return lastResult
    }) as T
  }
  
  /**
   * Update metrics
   */
  private updateMetrics(componentName: string, renderTime: number) {
    const existing = this.metrics.get(componentName) || {
      renderCount: 0,
      lastRenderTime: 0,
      averageRenderTime: 0,
      memoryUsage: 0,
      stateSize: 0
    }
    
    const newMetrics: PerformanceMetrics = {
      renderCount: existing.renderCount + 1,
      lastRenderTime: renderTime,
      averageRenderTime: (existing.averageRenderTime * existing.renderCount + renderTime) / (existing.renderCount + 1),
      memoryUsage: this.getMemoryUsage(),
      stateSize: this.getStateSize()
    }
    
    this.metrics.set(componentName, newMetrics)
  }
  
  /**
   * Get memory usage
   */
  private getMemoryUsage(): number {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      return (performance as any).memory.usedJSHeapSize
    }
    return 0
  }
  
  /**
   * Get state size
   */
  private getStateSize(): number {
    try {
      return JSON.stringify({}).length
    } catch {
      return 0
    }
  }
  
  /**
   * Get performance metrics
   */
  getMetrics(componentName?: string): PerformanceMetrics | Map<string, PerformanceMetrics> {
    if (componentName) {
      return this.metrics.get(componentName) || {
        renderCount: 0,
        lastRenderTime: 0,
        averageRenderTime: 0,
        memoryUsage: 0,
        stateSize: 0
      }
    }
    return this.metrics
  }
  
  /**
   * Get render history
   */
  getRenderHistory(componentName?: string): RenderInfo[] {
    if (componentName) {
      return this.renderHistory.filter(render => render.component === componentName)
    }
    return this.renderHistory
  }
  
  /**
   * Clear metrics
   */
  clearMetrics() {
    this.metrics.clear()
    this.renderHistory = []
  }
  
  /**
   * Get optimization recommendations
   */
  getOptimizationRecommendations(): string[] {
    const recommendations: string[] = []
    
    // Check for slow renders
    const slowRenders = this.renderHistory.filter(render => 
      render.renderTime > this.config.maxRenderTime
    )
    
    if (slowRenders.length > 0) {
      recommendations.push(`Consider optimizing ${slowRenders.length} slow renders`)
    }
    
    // Check for frequent re-renders
    const componentRenderCounts = new Map<string, number>()
    this.renderHistory.forEach(render => {
      const count = componentRenderCounts.get(render.component) || 0
      componentRenderCounts.set(render.component, count + 1)
    })
    
    componentRenderCounts.forEach((count, component) => {
      if (count > 10) {
        recommendations.push(`Component ${component} is re-rendering frequently (${count} times)`)
      }
    })
    
    // Check memory usage
    const avgMemoryUsage = Array.from(this.metrics.values())
      .reduce((sum, metric) => sum + metric.memoryUsage, 0) / this.metrics.size
    
    if (avgMemoryUsage > 50 * 1024 * 1024) { // 50MB
      recommendations.push('High memory usage detected, consider optimizing state structure')
    }
    
    return recommendations
  }
}

// Export singleton instance
export const stateOptimizationService = StateOptimizationService.getInstance()

/**
 * Performance optimization hook
 */
export function useStateOptimization() {
  const trackRender = useCallback((componentName: string, renderTime: number, stateChanges: string[]) => {
    stateOptimizationService.trackRender(componentName, renderTime, stateChanges)
  }, [])
  
  const batchUpdates = useCallback((componentId: string, action: G8Action) => {
    return stateOptimizationService.batchUpdates(componentId, action)
  }, [])
  
  const debounceUpdate = useCallback((componentId: string, action: G8Action, delay?: number) => {
    return stateOptimizationService.debounceUpdate(componentId, action, delay)
  }, [])
  
  const createSelector = useCallback(<T>(selector: (state: G8AppState) => T, dependencies: string[]) => {
    return stateOptimizationService.createSelector(selector, dependencies)
  }, [])
  
  const createMemoizedCallback = useCallback(<T extends (...args: any[]) => any>(
    callback: T,
    dependencies: any[]
  ) => {
    return stateOptimizationService.createMemoizedCallback(callback, dependencies)
  }, [])
  
  const getMetrics = useCallback((componentName?: string) => {
    return stateOptimizationService.getMetrics(componentName)
  }, [])
  
  const getOptimizationRecommendations = useCallback(() => {
    return stateOptimizationService.getOptimizationRecommendations()
  }, [])
  
  return {
    trackRender,
    batchUpdates,
    debounceUpdate,
    createSelector,
    createMemoizedCallback,
    getMetrics,
    getOptimizationRecommendations
  }
}

/**
 * Optimized state selector hook
 */
export function useOptimizedSelector<T>(
  selector: (state: G8AppState) => T,
  dependencies: string[]
) {
  const { createSelector } = useStateOptimization()
  
  return useMemo(() => {
    return createSelector(selector, dependencies)
  }, [selector, dependencies, createSelector])
}

/**
 * Performance profiler utility
 */
export function createPerformanceProfiler(componentName: string) {
  const { trackRender } = useStateOptimization()
  
  return {
    startRender: () => performance.now(),
    endRender: (startTime: number) => {
      const renderTime = performance.now() - startTime
      trackRender(componentName, renderTime, [])
    }
  }
}

/**
 * Optimized state hook with automatic memoization
 */
export function useOptimizedState<T>(
  selector: (state: G8AppState) => T,
  dependencies: string[]
) {
  const { createSelector } = useStateOptimization()
  
  const optimizedSelector = useMemo(() => {
    return createSelector(selector, dependencies)
  }, [selector, dependencies, createSelector])
  
  return optimizedSelector
}
