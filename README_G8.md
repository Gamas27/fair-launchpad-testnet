# G8 Platform 🚀

**Next-generation token launchpad with World ID integration**

[![G8 Version](https://img.shields.io/badge/G8-v2.0.0-purple.svg)](https://github.com/Gamas27/g8-platform)
[![World ID](https://img.shields.io/badge/World%20ID-Integrated-green.svg)](https://worldcoin.org)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.3-black.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org)

## 🌟 What is G8?

G8 is a revolutionary token launchpad that combines the power of World ID verification with cutting-edge Web3 technology. Built for the next generation of decentralized applications, G8 provides a secure, fair, and transparent platform for token creation and community building.

## ✨ Key Features

### 🔐 **World ID Integration**
- **Human Verification**: Anti-bot protection with World ID
- **Multiple Verification Levels**: Device, Phone, and Orb verification
- **Secure Onboarding**: Privacy-preserving identity verification

### 🚀 **Token Creation**
- **Fair Launch Mechanism**: Transparent and equitable token distribution
- **Multi-step Wizard**: Intuitive token creation process
- **Social Integration**: Built-in community features

### 💬 **Real-time Chat**
- **Token-specific Rooms**: Dedicated chat for each token
- **World ID Gating**: Verified users only
- **Moderation Tools**: Advanced chat management

### 📊 **Analytics & Tracking**
- **Portfolio Management**: Track your token holdings
- **Trading History**: Complete transaction records
- **Reputation System**: Community-driven reputation scoring

### 🎯 **G8 Graduation Zone**
- **Campaign System**: Create and manage token campaigns
- **Quest Tracking**: Gamified user engagement
- **Reward Distribution**: Automated reward systems

## 🏗️ Architecture

### **Frontend**
- **Next.js 15.2.3** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations

### **Backend**
- **Prisma** - Database ORM
- **SQLite/PostgreSQL** - Database
- **World ID SDK** - Identity verification
- **Privy** - Wallet management

### **Deployment**
- **Vercel** - Hosting platform
- **Docker** - Containerization
- **Environment Variables** - Configuration management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+
- Vercel CLI (for deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/Gamas27/g8-platform.git
cd g8-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run database migrations
npm run db:push

# Seed the database
npm run db:seed

# Start development server
npm run dev:g8
```

### Environment Variables

```bash
# World ID Configuration
NEXT_PUBLIC_WORLD_ID_APP_ID=your_app_id
NEXT_PUBLIC_WORLD_ID_ACTION_ID=your_action_id
NEXT_PUBLIC_WORLD_ID_API_KEY=your_api_key

# Privy Configuration
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
NEXT_PUBLIC_PRIVY_APP_SECRET=your_privy_secret

# Database
DATABASE_URL=your_database_url

# Security
NEXTAUTH_SECRET=your_nextauth_secret
```

## 🎨 G8 Variants

G8 comes with three optimized variants:

### 🖥️ **Desktop Experience**
- Full-featured desktop interface
- Complete functionality
- Optimized for large screens

### 📱 **Mobile Experience**
- Touch-optimized interface
- Mobile-first design
- Gesture support

### ✨ **Animated Experience**
- Enhanced animations
- Smooth transitions
- Interactive elements

## 🚀 Deployment

### Local Development
```bash
npm run dev:g8
```

### Production Build
```bash
npm run build:g8
```

### Deploy to Vercel
```bash
# Using the deployment script
./scripts/deploy-g8.sh

# Or manually
vercel --prod --config vercel.g8.json
```

## 📱 G8 App Structure

```
src/
├── app/
│   └── g8/                 # G8 main app
├── components/
│   └── g8/                 # G8-specific components
│       ├── g8-app-v2.tsx           # Desktop variant
│       ├── g8-app-v2-mobile.tsx    # Mobile variant
│       └── g8-app-v2-animated.tsx  # Animated variant
├── lib/
│   ├── animations/         # Animation utilities
│   └── services/          # G8 services
└── modules/               # Feature modules
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev:g8              # Start G8 development server
npm run dev                  # Start standard development server

# Building
npm run build:g8            # Build G8 platform
npm run build               # Build standard platform

# Testing
npm run test:g8             # Test G8 components
npm run test                # Test all components

# Linting
npm run lint:g8            # Lint G8 components
npm run lint                # Lint all components

# Type Checking
npm run type-check:g8       # Type check G8 components
npm run type-check          # Type check all components
```

### G8 Configuration

The G8 platform uses specialized configuration files:

- `next.config.g8.ts` - G8-specific Next.js configuration
- `vercel.g8.json` - G8-specific Vercel deployment configuration
- `package.g8.json` - G8-specific package configuration

## 🌍 World ID Integration

G8 leverages World ID for human verification:

1. **User Onboarding**: World ID verification during signup
2. **Chat Access**: World ID gating for chat rooms
3. **Token Creation**: Verified users can create tokens
4. **Community Features**: World ID-based reputation system

## 🔒 Security Features

- **World ID Verification**: Anti-bot protection
- **Rate Limiting**: API protection
- **Input Sanitization**: XSS prevention
- **Secure Headers**: Security headers
- **Environment Protection**: Secure configuration

## 📊 Performance

- **Bundle Size**: <100kB optimized
- **First Paint**: <2s on 4G
- **Interactive**: <3s on 4G
- **Lighthouse Score**: 95+ across all metrics

## 🤝 Contributing

We welcome contributions to G8! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [G8 Docs](https://docs.g8-platform.com)
- **Issues**: [GitHub Issues](https://github.com/Gamas27/g8-platform/issues)
- **Discord**: [G8 Community](https://discord.gg/g8-platform)
- **Twitter**: [@G8Platform](https://twitter.com/g8platform)

## 🗺️ Roadmap

### Phase 1: Core Platform ✅
- [x] World ID integration
- [x] Token creation
- [x] Chat system
- [x] User profiles

### Phase 2: Advanced Features 🚧
- [ ] PUF Zone campaigns
- [ ] Notification system
- [ ] Real-time data feeds
- [ ] Advanced analytics

### Phase 3: Ecosystem 🌟
- [ ] Third-party integrations
- [ ] API marketplace
- [ ] Developer tools
- [ ] Community governance

## 🙏 Acknowledgments

- **World ID** - Human verification technology
- **Privy** - Wallet infrastructure
- **Vercel** - Deployment platform
- **Next.js** - React framework
- **Tailwind CSS** - Styling framework

---

**Built with ❤️ by the G8 Team**

*G8 Platform - Where tokens meet the world* 🌍

