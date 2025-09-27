// Create Coin Module Version Switcher
const createCoinVersion = process.env.NEXT_PUBLIC_CREATE_COIN_VERSION || 'world-app'

if (createCoinVersion === 'v1') {
  module.exports = require('./v1')
} else {
  module.exports = require('./world-app')
}
