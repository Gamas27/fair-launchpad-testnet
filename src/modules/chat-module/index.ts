// Chat Module Version Switcher
const chatVersion = process.env.NEXT_PUBLIC_CHAT_VERSION || 'world-app'

if (chatVersion === 'v1') {
  module.exports = require('./v1')
} else {
  module.exports = require('./world-app')
}
