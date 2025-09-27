// Discovery Module Version Switcher
const discoveryVersion = process.env.NEXT_PUBLIC_DISCOVERY_VERSION || 'world-app'

if (discoveryVersion === 'v1') {
  module.exports = require('./v1')
} else {
  module.exports = require('./world-app')
}
