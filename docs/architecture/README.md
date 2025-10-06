# 🏗️ Architecture Documentation

## 📋 Overview

This directory contains comprehensive architecture documentation for the Fair Launchpad system, including system design, state management, and technical specifications.

## 📚 Documentation Files

### **Core Architecture**
- **[ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md)** - Complete system architecture and component design
- **[STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md)** - State management patterns and implementation

### **Legacy Architecture** (Deprecated)
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Legacy architecture documentation
- **[overview.md](./overview.md)** - Legacy overview
- **[FIGMA_SCREEN_DECOMPOSITION.md](./FIGMA_SCREEN_DECOMPOSITION.md)** - Legacy UI decomposition
- **[FRONTEND_BACKEND_INTEGRATION_SUMMARY.md](./FRONTEND_BACKEND_INTEGRATION_SUMMARY.md)** - Legacy integration
- **[SMART_CONTRACT_INTEGRATION_PLAN.md](./SMART_CONTRACT_INTEGRATION_PLAN.md)** - Legacy contract integration

## 🎯 Quick Reference

### **System Architecture**
```
Frontend (Next.js 14)     Smart Contracts (Solidity)
├─ React Components       ├─ BondingCurve.sol
├─ State Management       ├─ TokenFactory.sol
├─ API Routes            └─ GraduationHandler.sol
└─ Design System
```

### **State Management**
```
G8Provider (Context)
├─ G8Reducer (State Logic)
├─ G8Actions (Action Types)
└─ G8Selectors (Optimized Selectors)
```

### **Key Technologies**
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, G8 Design System
- **State**: Custom Reducer + Context
- **Blockchain**: Wagmi, Viem, World ID
- **Database**: Prisma + SQLite

## 🔄 Migration Status

### **New Documentation** ✅
- [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md) - Current system architecture
- [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md) - Current state patterns

### **Legacy Documentation** ⚠️
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Outdated, to be removed
- [overview.md](./overview.md) - Outdated, to be removed
- Other legacy files - To be cleaned up

## 📞 Support

For architecture questions:
- Review [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md) for system design
- Check [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md) for state patterns
- Refer to main [README.md](../README.md) for general guidance

---

**Last Updated**: December 2024  
**Status**: ✅ Current  
**Maintainer**: Development Team

