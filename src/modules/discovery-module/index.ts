// Discovery Module Version Switcher
const version = process.env.NEXT_PUBLIC_DISCOVERY_VERSION || 'world-app'

if (version === 'v1') {
  module.exports = require('./v1')
} else {
  module.exports = require('./world-app')
}
