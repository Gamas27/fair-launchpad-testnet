// ============================================================================
// TOKEN MODULE - VERSION SWITCHER
// ============================================================================

// Simple version switching logic
const JOURNEY_VERSION = process.env.NEXT_PUBLIC_JOURNEY_VERSION || 'v1'

// Dynamic imports based on environment
let TokenModule: any

if (JOURNEY_VERSION === 'world-app') {
  // World App optimized version
  TokenModule = require('./world-app').TokenModuleWorldApp
} else if (JOURNEY_VERSION === 'v1') {
  // Standard v1 version
  TokenModule = require('./v1').TokenModuleV1
} else {
  // Default to v1
  TokenModule = require('./v1').TokenModuleV1
}

export default TokenModule

// Export individual components for direct access
export const { 
  TokenCreationForm, 
  TokenModulePage 
} = TokenModule
