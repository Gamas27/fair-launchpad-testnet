// Coin Profile Module Version Switcher
const coinProfileVersion = process.env.NEXT_PUBLIC_COIN_PROFILE_VERSION || 'world-app'

if (coinProfileVersion === 'v1') {
  module.exports = require('./v1')
} else {
  module.exports = require('./world-app')
}
