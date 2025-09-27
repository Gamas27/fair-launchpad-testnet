// Profile Module Version Switcher
const profileVersion = process.env.NEXT_PUBLIC_PROFILE_VERSION || 'world-app'

if (profileVersion === 'v1') {
  module.exports = require('./v1')
} else {
  module.exports = require('./world-app')
}
