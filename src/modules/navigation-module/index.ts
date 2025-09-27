// ============================================================================
// NAVIGATION MODULE - VERSION SWITCHER
// ============================================================================

// Simple version switching logic
const JOURNEY_VERSION = process.env.NEXT_PUBLIC_JOURNEY_VERSION || 'v1'

// Dynamic imports based on environment
let NavigationModule: any

if (JOURNEY_VERSION === 'world-app') {
  // World App optimized version
  NavigationModule = require('./world-app').NavigationModuleWorldApp
} else if (JOURNEY_VERSION === 'v1') {
  // Standard v1 version
  NavigationModule = require('./v1').NavigationModuleV1
} else {
  // Default to v1
  NavigationModule = require('./v1').NavigationModuleV1
}

export default NavigationModule

// Export individual components for direct access
export const { 
  NavigationInterface, 
  NavigationModulePage 
} = NavigationModule
