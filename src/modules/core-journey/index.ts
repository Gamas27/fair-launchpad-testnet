// ============================================================================
// CORE JOURNEY MODULE - VERSION SWITCHER
// ============================================================================

// Get current version from environment or default to v1
const CURRENT_VERSION = process.env.JOURNEY_VERSION || 'v1'

// Import the appropriate version
let CoreJourney: any

try {
  switch (CURRENT_VERSION) {
    case 'v1':
      CoreJourney = require('./v1').CoreJourneyV1
      break
    case 'v2':
      CoreJourney = require('./v2').CoreJourneyV2
      break
    default:
      console.warn(`Unknown journey version: ${CURRENT_VERSION}, falling back to v1`)
      CoreJourney = require('./v1').CoreJourneyV1
  }
} catch (error) {
  console.error(`Failed to load journey version ${CURRENT_VERSION}:`, error)
  console.log('Falling back to v1')
  CoreJourney = require('./v1').CoreJourneyV1
}

// Export the current version
export default CoreJourney

// Export individual components for convenience
export const {
  GuidedWalletCreation,
  JourneyTestPage,
  useJourneyState,
  validateWallet,
  getJourneyProgress
} = CoreJourney

// Export version info
export const JOURNEY_VERSION = CURRENT_VERSION
export const JOURNEY_INFO = {
  version: CoreJourney.version,
  name: CoreJourney.name,
  features: CoreJourney.features
}

// Export version switcher for runtime switching
export const switchJourneyVersion = (version: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('journey_version', version)
    window.location.reload()
  }
}

// Check for runtime version override
if (typeof window !== 'undefined') {
  const runtimeVersion = localStorage.getItem('journey_version')
  if (runtimeVersion && runtimeVersion !== CURRENT_VERSION) {
    console.log(`Runtime version override: ${runtimeVersion}`)
    // In a real app, you'd reload with the new version
  }
}
