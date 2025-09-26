// World ID Parameter Generator
// Run with: node generate-world-id-params.js

const crypto = require('crypto');

console.log('🌍 World ID Parameter Generator');
console.log('================================\n');

// Generate external nullifier
const externalNullifier = crypto.createHash('sha256')
  .update('fair-launchpad-verification-v1')
  .digest('hex');

console.log('📋 Generated Parameters:');
console.log('========================');
console.log(`worldIdRoot: 0x${crypto.randomBytes(32).toString('hex')}`);
console.log(`worldIdGroupId: 1`);
console.log(`worldIdExternalNullifier: 0x${externalNullifier}`);

console.log('\n🔧 For Testing (Safe to Use):');
console.log('=============================');
console.log('worldIdRoot: 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef');
console.log('worldIdGroupId: 1');
console.log('worldIdExternalNullifier: 0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba');

console.log('\n📝 Next Steps:');
console.log('==============');
console.log('1. Go to https://developer.worldcoin.org/');
console.log('2. Create a new app');
console.log('3. Get the real worldIdRoot from your app dashboard');
console.log('4. Use the generated external nullifier above');
console.log('5. Deploy your contracts with these parameters');

console.log('\n✅ Ready to deploy! 🚀');
