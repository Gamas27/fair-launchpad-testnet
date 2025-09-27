// Settings Module Version Switcher
const settingsVersion = process.env.NEXT_PUBLIC_SETTINGS_VERSION || 'world-app'

if (settingsVersion === 'v1') {
  module.exports = require('./v1')
} else {
  module.exports = require('./world-app')
}
