// Enhanced State Management System
// Comprehensive state management with validation, persistence, and optimization

// Core state management
export * from './types'
export * from './reducer'
export * from './context'

// Enhanced state features
export * from './persistence'
export * from './validation'
export * from './optimization'

// Re-export commonly used items for convenience
export {
  useG8,
  useG8User,
  useG8Navigation,
  useG8Data,
  useG8UI,
  useG8Settings
} from './context'

export {
  statePersistenceService,
  useStatePersistence
} from './persistence'

export {
  stateValidationService,
  useStateValidation
} from './validation'

export {
  stateOptimizationService,
  useStateOptimization,
  useOptimizedSelector,
  useOptimizedState,
  createPerformanceProfiler
} from './optimization'

export { PerformanceProfiler } from './PerformanceProfiler'
