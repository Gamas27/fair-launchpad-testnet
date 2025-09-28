import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database with mock data...')

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
        worldIdHash: 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567890',
        verificationLevel: 'verified',
        reputationScore: 850,
        reputationLevel: 'expert',
        totalTrades: 45,
        totalVolume: 125000.50,
        isWorldIdVerified: true,
        walletCreationMethod: 'privy',
        walletCreatedAt: new Date('2024-01-15'),
        marketCap: 2500000.00,
      }
    }),
    prisma.user.create({
      data: {
        walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
        worldIdHash: 'b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567890a1',
        verificationLevel: 'verified',
        reputationScore: 650,
        reputationLevel: 'advanced',
        totalTrades: 28,
        totalVolume: 75000.25,
        isWorldIdVerified: true,
        walletCreationMethod: 'privy',
        walletCreatedAt: new Date('2024-02-10'),
        marketCap: 1800000.00,
      }
    }),
    prisma.user.create({
      data: {
        walletAddress: '0x9876543210fedcba9876543210fedcba98765432',
        worldIdHash: 'c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567890a1b2',
        verificationLevel: 'basic',
        reputationScore: 320,
        reputationLevel: 'intermediate',
        totalTrades: 12,
        totalVolume: 25000.75,
        isWorldIdVerified: true,
        walletCreationMethod: 'privy',
        walletCreatedAt: new Date('2024-03-05'),
        marketCap: 500000.00,
      }
    }),
  ])

  console.log(`✅ Created ${users.length} users`)

  // Create tokens
  const tokens = await Promise.all([
    prisma.token.create({
      data: {
        name: 'MemeCoin',
        ticker: 'MEME',
        logo: '🔥',
        description: 'The ultimate meme token for the decentralized future. Built by the community, for the community.',
        marketCap: 1200000.00,
        ath: 0.0035,
        volume: 800000.00,
        txCount: 1250,
        isLive: true,
        timeSinceLaunch: '3h',
        chartData: JSON.stringify([
          { time: '00:00', price: 0.0001 },
          { time: '01:00', price: 0.00012 },
          { time: '02:00', price: 0.00015 },
          { time: '03:00', price: 0.00018 },
          { time: '04:00', price: 0.00022 },
          { time: '05:00', price: 0.00025 },
        ]),
        socialLinks: JSON.stringify({
          twitter: 'https://twitter.com/memecoin',
          telegram: 'https://t.me/memecoin',
          discord: 'https://discord.gg/memecoin',
        }),
        teamInfo: JSON.stringify({
          founder: 'Satoshi Nakamoto',
          team: ['Alice', 'Bob', 'Charlie'],
          advisors: ['Vitalik Buterin', 'Elon Musk'],
        }),
        gradu8Story: 'MemeCoin started as a joke but quickly became a serious project with a passionate community.',
        repBreakdown: JSON.stringify({
          community: 40,
          trading: 30,
          holding: 20,
          social: 10,
        }),
        priceHistory: JSON.stringify([
          { timestamp: '2024-01-01T00:00:00Z', price: 0.0001 },
          { timestamp: '2024-01-01T01:00:00Z', price: 0.00012 },
          { timestamp: '2024-01-01T02:00:00Z', price: 0.00015 },
        ]),
        recentActivity: JSON.stringify([
          { type: 'trade', user: '0x1234...', amount: 1000, timestamp: '2024-01-01T03:00:00Z' },
          { type: 'listing', exchange: 'Uniswap', timestamp: '2024-01-01T02:30:00Z' },
        ]),
        creatorId: users[0].id,
      }
    }),
    prisma.token.create({
      data: {
        name: 'DoggyCoin',
        ticker: 'DOGE',
        logo: '🐶',
        description: 'The most loyal token in the crypto space. Much wow, very moon!',
        marketCap: 800000.00,
        ath: 0.0025,
        volume: 450000.00,
        txCount: 890,
        isLive: false,
        timeSinceLaunch: '8h',
        chartData: JSON.stringify([
          { time: '00:00', price: 0.0008 },
          { time: '02:00', price: 0.0012 },
          { time: '04:00', price: 0.0015 },
          { time: '06:00', price: 0.0018 },
          { time: '08:00', price: 0.0016 },
        ]),
        socialLinks: JSON.stringify({
          twitter: 'https://twitter.com/doggycoin',
          telegram: 'https://t.me/doggycoin',
        }),
        teamInfo: JSON.stringify({
          founder: 'Doge Master',
          team: ['Doge Dev', 'Doge Designer'],
        }),
        gradu8Story: 'DoggyCoin brings the fun back to crypto with its loyal community and meme-worthy moments.',
        repBreakdown: JSON.stringify({
          community: 50,
          trading: 25,
          holding: 15,
          social: 10,
        }),
        priceHistory: JSON.stringify([
          { timestamp: '2024-01-01T00:00:00Z', price: 0.0008 },
          { timestamp: '2024-01-01T02:00:00Z', price: 0.0012 },
        ]),
        recentActivity: JSON.stringify([
          { type: 'trade', user: '0x5678...', amount: 500, timestamp: '2024-01-01T07:00:00Z' },
        ]),
        creatorId: users[1].id,
      }
    }),
    prisma.token.create({
      data: {
        name: 'SpaceCoin',
        ticker: 'SPCE',
        logo: '🚀',
        description: 'To the moon and beyond! SpaceCoin is the future of interplanetary commerce.',
        marketCap: 2500000.00,
        ath: 0.0045,
        volume: 1200000.00,
        txCount: 2100,
        isLive: true,
        timeSinceLaunch: '1d',
        chartData: JSON.stringify([
          { time: '00:00', price: 0.002 },
          { time: '06:00', price: 0.0025 },
          { time: '12:00', price: 0.003 },
          { time: '18:00', price: 0.0035 },
          { time: '24:00', price: 0.0042 },
        ]),
        socialLinks: JSON.stringify({
          twitter: 'https://twitter.com/spacecoin',
          telegram: 'https://t.me/spacecoin',
          discord: 'https://discord.gg/spacecoin',
          website: 'https://spacecoin.io',
        }),
        teamInfo: JSON.stringify({
          founder: 'Elon Musk',
          team: ['Space Dev', 'Rocket Engineer', 'Moon Specialist'],
          advisors: ['Neil Armstrong', 'Buzz Aldrin'],
        }),
        gradu8Story: 'SpaceCoin represents the next frontier in cryptocurrency, aiming to become the standard for space-based transactions.',
        repBreakdown: JSON.stringify({
          community: 35,
          trading: 40,
          holding: 20,
          social: 5,
        }),
        priceHistory: JSON.stringify([
          { timestamp: '2024-01-01T00:00:00Z', price: 0.002 },
          { timestamp: '2024-01-01T12:00:00Z', price: 0.003 },
        ]),
        recentActivity: JSON.stringify([
          { type: 'trade', user: '0x9abc...', amount: 2000, timestamp: '2024-01-01T23:00:00Z' },
          { type: 'listing', exchange: 'Binance', timestamp: '2024-01-01T22:00:00Z' },
        ]),
        creatorId: users[2].id,
      }
    }),
    prisma.token.create({
      data: {
        name: 'AI Token',
        ticker: 'AI',
        logo: '🤖',
        description: 'The future of artificial intelligence on the blockchain. Powered by advanced AI algorithms.',
        marketCap: 5000000.00,
        ath: 0.008,
        volume: 2000000.00,
        txCount: 3500,
        isLive: true,
        timeSinceLaunch: '2d',
        chartData: JSON.stringify([
          { time: '00:00', price: 0.005 },
          { time: '12:00', price: 0.006 },
          { time: '24:00', price: 0.007 },
          { time: '36:00', price: 0.008 },
          { time: '48:00', price: 0.0075 },
        ]),
        socialLinks: JSON.stringify({
          twitter: 'https://twitter.com/aitoken',
          telegram: 'https://t.me/aitoken',
          discord: 'https://discord.gg/aitoken',
          github: 'https://github.com/aitoken',
        }),
        teamInfo: JSON.stringify({
          founder: 'AI Master',
          team: ['AI Engineer', 'ML Specialist', 'Data Scientist'],
          advisors: ['Andrew Ng', 'Geoffrey Hinton'],
        }),
        gradu8Story: 'AI Token is revolutionizing the way we think about artificial intelligence and blockchain technology.',
        repBreakdown: JSON.stringify({
          community: 30,
          trading: 45,
          holding: 20,
          social: 5,
        }),
        priceHistory: JSON.stringify([
          { timestamp: '2024-01-01T00:00:00Z', price: 0.005 },
          { timestamp: '2024-01-02T00:00:00Z', price: 0.007 },
        ]),
        recentActivity: JSON.stringify([
          { type: 'trade', user: '0xdef0...', amount: 5000, timestamp: '2024-01-02T12:00:00Z' },
          { type: 'partnership', partner: 'OpenAI', timestamp: '2024-01-02T10:00:00Z' },
        ]),
        creatorId: users[0].id,
      }
    }),
  ])

  console.log(`✅ Created ${tokens.length} tokens`)

  // Create trades
  const trades = await Promise.all([
    prisma.trade.create({
      data: {
        tokenId: tokens[0].id,
        userId: users[1].id,
        type: 'buy',
        amount: 1000.00,
        tokenAmount: 1000000,
        price: 0.001,
        timestamp: new Date('2024-01-01T10:00:00Z'),
      }
    }),
    prisma.trade.create({
      data: {
        tokenId: tokens[0].id,
        userId: users[2].id,
        type: 'sell',
        amount: 500.00,
        tokenAmount: 500000,
        price: 0.001,
        timestamp: new Date('2024-01-01T11:00:00Z'),
      }
    }),
    prisma.trade.create({
      data: {
        tokenId: tokens[1].id,
        userId: users[0].id,
        type: 'buy',
        amount: 2000.00,
        tokenAmount: 2000000,
        price: 0.001,
        timestamp: new Date('2024-01-01T12:00:00Z'),
      }
    }),
    prisma.trade.create({
      data: {
        tokenId: tokens[2].id,
        userId: users[1].id,
        type: 'buy',
        amount: 3000.00,
        tokenAmount: 1000000,
        price: 0.003,
        timestamp: new Date('2024-01-01T13:00:00Z'),
      }
    }),
    prisma.trade.create({
      data: {
        tokenId: tokens[3].id,
        userId: users[2].id,
        type: 'buy',
        amount: 5000.00,
        tokenAmount: 1000000,
        price: 0.005,
        timestamp: new Date('2024-01-01T14:00:00Z'),
      }
    }),
  ])

  console.log(`✅ Created ${trades.length} trades`)

  // Create chat rooms
  const chatRooms = await Promise.all([
    prisma.chatRoom.create({
      data: {
        name: 'General',
        type: 'public',
        description: 'General discussion about G8 and tokens',
        repRequirement: 0,
        membersCount: 150,
        onlineCount: 25,
        avatar: '💬',
        lastMessage: 'Welcome to G8!',
        lastMessageTime: new Date('2024-01-01T15:00:00Z'),
        creatorId: users[0].id,
      }
    }),
    prisma.chatRoom.create({
      data: {
        name: 'MemeCoin Chat',
        type: 'coin',
        description: 'Discussion about MemeCoin',
        repRequirement: 100,
        membersCount: 75,
        onlineCount: 12,
        avatar: '🔥',
        lastMessage: 'MemeCoin to the moon!',
        lastMessageTime: new Date('2024-01-01T14:30:00Z'),
        creatorId: users[0].id,
      }
    }),
    prisma.chatRoom.create({
      data: {
        name: 'SpaceCoin Community',
        type: 'coin',
        description: 'SpaceCoin community discussions',
        repRequirement: 200,
        membersCount: 120,
        onlineCount: 18,
        avatar: '🚀',
        lastMessage: 'Ready for launch!',
        lastMessageTime: new Date('2024-01-01T14:45:00Z'),
        creatorId: users[2].id,
      }
    }),
    prisma.chatRoom.create({
      data: {
        name: 'AI Token Discussion',
        type: 'coin',
        description: 'AI Token technical discussions',
        repRequirement: 300,
        membersCount: 90,
        onlineCount: 15,
        avatar: '🤖',
        lastMessage: 'AI is the future!',
        lastMessageTime: new Date('2024-01-01T15:15:00Z'),
        creatorId: users[0].id,
      }
    }),
  ])

  console.log(`✅ Created ${chatRooms.length} chat rooms`)

  // Create chat messages
  const chatMessages = await Promise.all([
    prisma.chatMessage.create({
      data: {
        roomId: chatRooms[0].id,
        senderId: users[0].id,
        message: 'Welcome to G8! This is the future of fair token launches.',
        type: 'text',
        timestamp: new Date('2024-01-01T15:00:00Z'),
      }
    }),
    prisma.chatMessage.create({
      data: {
        roomId: chatRooms[0].id,
        senderId: users[1].id,
        message: 'Excited to be here! 🚀',
        type: 'text',
        timestamp: new Date('2024-01-01T15:01:00Z'),
      }
    }),
    prisma.chatMessage.create({
      data: {
        roomId: chatRooms[1].id,
        senderId: users[0].id,
        message: 'MemeCoin is going to the moon! 🔥',
        type: 'text',
        timestamp: new Date('2024-01-01T14:30:00Z'),
      }
    }),
    prisma.chatMessage.create({
      data: {
        roomId: chatRooms[2].id,
        senderId: users[2].id,
        message: 'SpaceCoin launch successful! 🚀',
        type: 'text',
        timestamp: new Date('2024-01-01T14:45:00Z'),
      }
    }),
    prisma.chatMessage.create({
      data: {
        roomId: chatRooms[3].id,
        senderId: users[0].id,
        message: 'AI Token partnership with OpenAI announced! 🤖',
        type: 'text',
        timestamp: new Date('2024-01-01T15:15:00Z'),
      }
    }),
  ])

  console.log(`✅ Created ${chatMessages.length} chat messages`)

  // Create reputation history
  const reputationHistory = await Promise.all([
    prisma.reputationHistory.create({
      data: {
        userId: users[0].id,
        change: 50,
        reason: 'Successful token launch',
        timestamp: new Date('2024-01-01T10:00:00Z'),
      }
    }),
    prisma.reputationHistory.create({
      data: {
        userId: users[0].id,
        change: 25,
        reason: 'Active community participation',
        timestamp: new Date('2024-01-01T12:00:00Z'),
      }
    }),
    prisma.reputationHistory.create({
      data: {
        userId: users[1].id,
        change: 30,
        reason: 'Successful trade',
        timestamp: new Date('2024-01-01T11:00:00Z'),
      }
    }),
    prisma.reputationHistory.create({
      data: {
        userId: users[2].id,
        change: 40,
        reason: 'Token graduation',
        timestamp: new Date('2024-01-01T13:00:00Z'),
      }
    }),
  ])

  console.log(`✅ Created ${reputationHistory.length} reputation history entries`)

  console.log('🎉 Database seeding completed successfully!')
  console.log(`📊 Summary:`)
  console.log(`   - Users: ${users.length}`)
  console.log(`   - Tokens: ${tokens.length}`)
  console.log(`   - Trades: ${trades.length}`)
  console.log(`   - Chat Rooms: ${chatRooms.length}`)
  console.log(`   - Messages: ${chatMessages.length}`)
  console.log(`   - Reputation History: ${reputationHistory.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
