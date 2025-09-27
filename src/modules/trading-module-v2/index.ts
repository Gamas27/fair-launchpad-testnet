// ============================================================================
// TRADING MODULE V2 - VERSION SWITCHER
// ============================================================================

// Simple version switching logic
const JOURNEY_VERSION = process.env.NEXT_PUBLIC_JOURNEY_VERSION || 'v1'

// Dynamic imports based on environment
let TradingModule: any

if (JOURNEY_VERSION === 'world-app') {
  // World App optimized version
  TradingModule = require('./world-app').TradingModuleWorldApp
} else if (JOURNEY_VERSION === 'v1') {
  // Standard v1 version
  TradingModule = require('./v1').TradingModuleV1
} else {
  // Default to v1
  TradingModule = require('./v1').TradingModuleV1
}

export default TradingModule

// Export individual components for direct access
export const { 
  TradingInterface, 
  TradingModulePage 
} = TradingModule
