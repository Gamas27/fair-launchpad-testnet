import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedDatabase() {
  console.log('🌱 Starting database seeding...')

  try {
    // Clear existing data
    await prisma.antiManipulationLog.deleteMany()
    await prisma.userAchievement.deleteMany()
    await prisma.userReputationQuest.deleteMany()
    await prisma.trade.deleteMany()
    await prisma.token.deleteMany()
    await prisma.achievement.deleteMany()
    await prisma.reputationQuest.deleteMany()
    await prisma.user.deleteMany()

    console.log('🧹 Cleared existing data')

    // Create test users
    const users = await Promise.all([
      prisma.user.create({
        data: {
          walletAddress: '0x1234567890123456789012345678901234567890',
          worldIdHash: 'world_id_hash_1',
          verificationLevel: 'orb',
          reputationScore: 2500,
          reputationLevel: 'Gold',
          totalTrades: 45,
          totalVolume: 125000,
          riskScore: 15,
          isBanned: false,
          allocationCap: 1000,
          usedAllocation: 250,
        }
      }),
      prisma.user.create({
        data: {
          walletAddress: '0x2345678901234567890123456789012345678901',
          worldIdHash: 'world_id_hash_2',
          verificationLevel: 'document',
          reputationScore: 800,
          reputationLevel: 'Silver',
          totalTrades: 12,
          totalVolume: 35000,
          riskScore: 25,
          isBanned: false,
          allocationCap: 500,
          usedAllocation: 100,
        }
      }),
      prisma.user.create({
        data: {
          walletAddress: '0x3456789012345678901234567890123456789012',
          worldIdHash: 'world_id_hash_3',
          verificationLevel: 'device',
          reputationScore: 150,
          reputationLevel: 'Bronze',
          totalTrades: 3,
          totalVolume: 5000,
          riskScore: 5,
          isBanned: false,
          allocationCap: 200,
          usedAllocation: 50,
        }
      }),
      prisma.user.create({
        data: {
          walletAddress: '0x4567890123456789012345678901234567890123',
          worldIdHash: 'world_id_hash_4',
          verificationLevel: 'orb',
          reputationScore: 100,
          reputationLevel: 'Bronze',
          totalTrades: 25,
          totalVolume: 15000,
          riskScore: 85,
          isBanned: false,
          allocationCap: 300,
          usedAllocation: 280,
        }
      }),
      prisma.user.create({
        data: {
          walletAddress: '0x5678901234567890123456789012345678901234',
          worldIdHash: null,
          verificationLevel: 'device',
          reputationScore: 0,
          reputationLevel: 'Bronze',
          totalTrades: 0,
          totalVolume: 0,
          riskScore: 0,
          isBanned: false,
          allocationCap: 100,
          usedAllocation: 0,
        }
      })
    ])

    console.log('👥 Created test users')

    // Create reputation quests
    const quests = await Promise.all([
      prisma.reputationQuest.create({
        data: {
          title: 'First Trade',
          description: 'Complete your first trade on the platform',
          type: 'trade',
          targetValue: 1,
          reward: 100,
          isActive: true,
        }
      }),
      prisma.reputationQuest.create({
        data: {
          title: 'Volume Trader',
          description: 'Accumulate $10,000 in trading volume',
          type: 'volume',
          targetValue: 10000,
          reward: 500,
          isActive: true,
        }
      }),
      prisma.reputationQuest.create({
        data: {
          title: 'Active Trader',
          description: 'Complete 10 trades',
          type: 'trade',
          targetValue: 10,
          reward: 300,
          isActive: true,
        }
      }),
      prisma.reputationQuest.create({
        data: {
          title: 'High Volume',
          description: 'Accumulate $50,000 in trading volume',
          type: 'volume',
          targetValue: 50000,
          reward: 1000,
          isActive: true,
        }
      }),
      prisma.reputationQuest.create({
        data: {
          title: 'Veteran Trader',
          description: 'Complete 50 trades',
          type: 'trade',
          targetValue: 50,
          reward: 2000,
          isActive: true,
        }
      })
    ])

    console.log('🎯 Created reputation quests')

    // Create achievements
    const achievements = await Promise.all([
      prisma.achievement.create({
        data: {
          title: 'First Steps',
          description: 'Complete your first trade',
          icon: '🚀',
          rarity: 'common',
          requirements: JSON.stringify({ trades: 1 }),
          reward: 50,
          isActive: true,
        }
      }),
      prisma.achievement.create({
        data: {
          title: 'Volume King',
          description: 'Accumulate $100,000 in trading volume',
          icon: '👑',
          rarity: 'legendary',
          requirements: JSON.stringify({ volume: 100000 }),
          reward: 5000,
          isActive: true,
        }
      }),
      prisma.achievement.create({
        data: {
          title: 'Trading Master',
          description: 'Complete 100 trades',
          icon: '🏆',
          rarity: 'epic',
          requirements: JSON.stringify({ trades: 100 }),
          reward: 3000,
          isActive: true,
        }
      }),
      prisma.achievement.create({
        data: {
          title: 'Risk Taker',
          description: 'Make a trade with high risk score',
          icon: '⚡',
          rarity: 'rare',
          requirements: JSON.stringify({ riskScore: 80 }),
          reward: 1000,
          isActive: true,
        }
      }),
      prisma.achievement.create({
        data: {
          title: 'Safe Trader',
          description: 'Maintain low risk score for 10 trades',
          icon: '🛡️',
          rarity: 'rare',
          requirements: JSON.stringify({ lowRiskTrades: 10 }),
          reward: 800,
          isActive: true,
        }
      })
    ])

    console.log('🏆 Created achievements')

    // Create tokens
    const tokens = await Promise.all([
      prisma.token.create({
        data: {
          address: '0x1111111111111111111111111111111111111111',
          name: 'FairLaunch Token',
          symbol: 'FLT',
          description: 'The first token launched on FairLaunch platform',
          imageUrl: 'https://via.placeholder.com/100x100/4F46E5/FFFFFF?text=FLT',
          creatorAddress: users[0].walletAddress,
          initialPrice: 0.01,
          currentPrice: 0.15,
          priceIncrement: 0.001,
          maxSupply: BigInt('1000000000'),
          currentSupply: BigInt('500000000'),
          totalVolume: 75000,
          totalTrades: 120,
          status: 'active',
          marketCap: 75000000,
        }
      }),
      prisma.token.create({
        data: {
          address: '0x2222222222222222222222222222222222222222',
          name: 'HumanCoin',
          symbol: 'HUMAN',
          description: 'A token for verified humans only',
          imageUrl: 'https://via.placeholder.com/100x100/10B981/FFFFFF?text=HUMAN',
          creatorAddress: users[1].walletAddress,
          initialPrice: 0.05,
          currentPrice: 0.25,
          priceIncrement: 0.002,
          maxSupply: BigInt('500000000'),
          currentSupply: BigInt('200000000'),
          totalVolume: 45000,
          totalTrades: 85,
          status: 'active',
          marketCap: 50000000,
        }
      }),
      prisma.token.create({
        data: {
          address: '0x3333333333333333333333333333333333333333',
          name: 'Reputation Token',
          symbol: 'REP',
          description: 'Token based on user reputation scores',
          imageUrl: 'https://via.placeholder.com/100x100/F59E0B/FFFFFF?text=REP',
          creatorAddress: users[2].walletAddress,
          initialPrice: 0.02,
          currentPrice: 0.08,
          priceIncrement: 0.001,
          maxSupply: BigInt('2000000000'),
          currentSupply: BigInt('800000000'),
          totalVolume: 25000,
          totalTrades: 60,
          status: 'active',
          marketCap: 64000000,
        }
      }),
      prisma.token.create({
        data: {
          address: '0x4444444444444444444444444444444444444444',
          name: 'LaunchPad Coin',
          symbol: 'LPC',
          description: 'Community-driven token launch',
          imageUrl: 'https://via.placeholder.com/100x100/EF4444/FFFFFF?text=LPC',
          creatorAddress: users[0].walletAddress,
          initialPrice: 0.1,
          currentPrice: 0.12,
          priceIncrement: 0.005,
          maxSupply: BigInt('100000000'),
          currentSupply: BigInt('30000000'),
          totalVolume: 15000,
          totalTrades: 25,
          status: 'launching',
          marketCap: 3600000,
        }
      })
    ])

    console.log('🪙 Created tokens')

    // Create user reputation quests
    await Promise.all([
      // User 1 (Gold) - completed some quests
      prisma.userReputationQuest.create({
        data: {
          userAddress: users[0].walletAddress,
          questId: quests[0].id,
          progress: 1,
          isCompleted: true,
          completedAt: new Date('2024-01-15'),
        }
      }),
      prisma.userReputationQuest.create({
        data: {
          userAddress: users[0].walletAddress,
          questId: quests[1].id,
          progress: 125000,
          isCompleted: true,
          completedAt: new Date('2024-01-20'),
        }
      }),
      prisma.userReputationQuest.create({
        data: {
          userAddress: users[0].walletAddress,
          questId: quests[2].id,
          progress: 45,
          isCompleted: true,
          completedAt: new Date('2024-01-25'),
        }
      }),
      prisma.userReputationQuest.create({
        data: {
          userAddress: users[0].walletAddress,
          questId: quests[3].id,
          progress: 125000,
          isCompleted: true,
          completedAt: new Date('2024-02-01'),
        }
      }),
      prisma.userReputationQuest.create({
        data: {
          userAddress: users[0].walletAddress,
          questId: quests[4].id,
          progress: 45,
          isCompleted: false,
        }
      }),

      // User 2 (Silver) - partially completed
      prisma.userReputationQuest.create({
        data: {
          userAddress: users[1].walletAddress,
          questId: quests[0].id,
          progress: 1,
          isCompleted: true,
          completedAt: new Date('2024-01-10'),
        }
      }),
      prisma.userReputationQuest.create({
        data: {
          userAddress: users[1].walletAddress,
          questId: quests[1].id,
          progress: 35000,
          isCompleted: true,
          completedAt: new Date('2024-01-18'),
        }
      }),
      prisma.userReputationQuest.create({
        data: {
          userAddress: users[1].walletAddress,
          questId: quests[2].id,
          progress: 12,
          isCompleted: true,
          completedAt: new Date('2024-01-22'),
        }
      }),
      prisma.userReputationQuest.create({
        data: {
          userAddress: users[1].walletAddress,
          questId: quests[3].id,
          progress: 35000,
          isCompleted: false,
        }
      }),

      // User 3 (Bronze) - just started
      prisma.userReputationQuest.create({
        data: {
          userAddress: users[2].walletAddress,
          questId: quests[0].id,
          progress: 1,
          isCompleted: true,
          completedAt: new Date('2024-01-28'),
        }
      }),
      prisma.userReputationQuest.create({
        data: {
          userAddress: users[2].walletAddress,
          questId: quests[1].id,
          progress: 5000,
          isCompleted: false,
        }
      }),
      prisma.userReputationQuest.create({
        data: {
          userAddress: users[2].walletAddress,
          questId: quests[2].id,
          progress: 3,
          isCompleted: false,
        }
      }),

      // User 4 (High risk) - some progress
      prisma.userReputationQuest.create({
        data: {
          userAddress: users[3].walletAddress,
          questId: quests[0].id,
          progress: 1,
          isCompleted: true,
          completedAt: new Date('2024-01-05'),
        }
      }),
      prisma.userReputationQuest.create({
        data: {
          userAddress: users[3].walletAddress,
          questId: quests[1].id,
          progress: 15000,
          isCompleted: false,
        }
      }),
      prisma.userReputationQuest.create({
        data: {
          userAddress: users[3].walletAddress,
          questId: quests[2].id,
          progress: 25,
          isCompleted: true,
          completedAt: new Date('2024-01-30'),
        }
      }),

      // User 5 (Unverified) - no progress
      prisma.userReputationQuest.create({
        data: {
          userAddress: users[4].walletAddress,
          questId: quests[0].id,
          progress: 0,
          isCompleted: false,
        }
      }),
      prisma.userReputationQuest.create({
        data: {
          userAddress: users[4].walletAddress,
          questId: quests[1].id,
          progress: 0,
          isCompleted: false,
        }
      }),
      prisma.userReputationQuest.create({
        data: {
          userAddress: users[4].walletAddress,
          questId: quests[2].id,
          progress: 0,
          isCompleted: false,
        }
      }),
    ])

    console.log('📋 Created user reputation quests')

    // Create user achievements
    await Promise.all([
      // User 1 achievements
      prisma.userAchievement.create({
        data: {
          userAddress: users[0].walletAddress,
          achievementId: achievements[0].id,
          unlockedAt: new Date('2024-01-15'),
        }
      }),
      prisma.userAchievement.create({
        data: {
          userAddress: users[0].walletAddress,
          achievementId: achievements[2].id,
          unlockedAt: new Date('2024-01-25'),
        }
      }),

      // User 2 achievements
      prisma.userAchievement.create({
        data: {
          userAddress: users[1].walletAddress,
          achievementId: achievements[0].id,
          unlockedAt: new Date('2024-01-10'),
        }
      }),

      // User 3 achievements
      prisma.userAchievement.create({
        data: {
          userAddress: users[2].walletAddress,
          achievementId: achievements[0].id,
          unlockedAt: new Date('2024-01-28'),
        }
      }),

      // User 4 achievements
      prisma.userAchievement.create({
        data: {
          userAddress: users[3].walletAddress,
          achievementId: achievements[0].id,
          unlockedAt: new Date('2024-01-05'),
        }
      }),
      prisma.userAchievement.create({
        data: {
          userAddress: users[3].walletAddress,
          achievementId: achievements[3].id,
          unlockedAt: new Date('2024-01-30'),
        }
      }),
    ])

    console.log('🏆 Created user achievements')

    // Create trades
    const trades = await Promise.all([
      // User 1 trades (Gold user)
      prisma.trade.create({
        data: {
          userAddress: users[0].walletAddress,
          tokenAddress: tokens[0].address,
          type: 'buy',
          amount: 1000,
          price: 0.12,
          totalValue: 120,
          blockNumber: BigInt('18500000'),
          transactionHash: '0xabc123def456789',
          riskScore: 10,
          isSuspicious: false,
        }
      }),
      prisma.trade.create({
        data: {
          userAddress: users[0].walletAddress,
          tokenAddress: tokens[1].address,
          type: 'sell',
          amount: 500,
          price: 0.22,
          totalValue: 110,
          blockNumber: BigInt('18500001'),
          transactionHash: '0xdef456abc789123',
          riskScore: 15,
          isSuspicious: false,
        }
      }),

      // User 2 trades (Silver user)
      prisma.trade.create({
        data: {
          userAddress: users[1].walletAddress,
          tokenAddress: tokens[0].address,
          type: 'buy',
          amount: 200,
          price: 0.11,
          totalValue: 22,
          blockNumber: BigInt('18500002'),
          transactionHash: '0x123abc456def789',
          riskScore: 20,
          isSuspicious: false,
        }
      }),

      // User 3 trades (Bronze user)
      prisma.trade.create({
        data: {
          userAddress: users[2].walletAddress,
          tokenAddress: tokens[2].address,
          type: 'buy',
          amount: 100,
          price: 0.06,
          totalValue: 6,
          blockNumber: BigInt('18500003'),
          transactionHash: '0x789def123abc456',
          riskScore: 5,
          isSuspicious: false,
        }
      }),

      // User 4 trades (High risk user)
      prisma.trade.create({
        data: {
          userAddress: users[3].walletAddress,
          tokenAddress: tokens[0].address,
          type: 'buy',
          amount: 5000,
          price: 0.13,
          totalValue: 650,
          blockNumber: BigInt('18500004'),
          transactionHash: '0x456789def123abc',
          riskScore: 90,
          isSuspicious: true,
        }
      }),
      prisma.trade.create({
        data: {
          userAddress: users[3].walletAddress,
          tokenAddress: tokens[1].address,
          type: 'sell',
          amount: 2000,
          price: 0.24,
          totalValue: 480,
          blockNumber: BigInt('18500005'),
          transactionHash: '0xdef123abc456789',
          riskScore: 85,
          isSuspicious: true,
        }
      }),
    ])

    console.log('💱 Created trades')

    // Create anti-manipulation logs
    await Promise.all([
      prisma.antiManipulationLog.create({
        data: {
          userAddress: users[3].walletAddress,
          activityType: 'trade_analysis',
          riskScore: 90,
          flags: JSON.stringify(['unusually_large_trade', 'high_frequency_trading']),
          details: 'Large trade detected with high risk score',
          isResolved: false,
        }
      }),
      prisma.antiManipulationLog.create({
        data: {
          userAddress: users[3].walletAddress,
          activityType: 'trade_analysis',
          riskScore: 85,
          flags: JSON.stringify(['price_deviation', 'recent_suspicious_activity']),
          details: 'Price deviation detected in recent trade',
          isResolved: false,
        }
      }),
      prisma.antiManipulationLog.create({
        data: {
          userAddress: users[0].walletAddress,
          activityType: 'trade_analysis',
          riskScore: 10,
          flags: JSON.stringify([]),
          details: 'Normal trading activity detected',
          isResolved: true,
        }
      }),
    ])

    console.log('🛡️ Created anti-manipulation logs')

    console.log('✅ Database seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`👥 Users: ${users.length}`)
    console.log(`🎯 Quests: ${quests.length}`)
    console.log(`🏆 Achievements: ${achievements.length}`)
    console.log(`🪙 Tokens: ${tokens.length}`)
    console.log(`💱 Trades: ${trades.length}`)
    console.log('\n🔑 Test User Addresses:')
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.walletAddress} (${user.reputationLevel})`)
    })

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seeding
seedDatabase()
  .then(() => {
    console.log('🎉 Seeding completed!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error)
    process.exit(1)
  })



