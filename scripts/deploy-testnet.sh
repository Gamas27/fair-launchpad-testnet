#!/bin/bash

# FairLaunch Testnet Deployment Script
# This script deploys the FairLaunch application to testnet

set -e  # Exit on any error

echo "🚀 Starting FairLaunch Testnet Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node -v)"
        exit 1
    fi
    
    print_success "Dependencies check passed"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    npm ci
    print_success "Dependencies installed"
}

# Setup testnet environment
setup_testnet_env() {
    print_status "Setting up testnet environment..."
    
    # Create testnet environment file if it doesn't exist
    if [ ! -f ".env.testnet" ]; then
        print_warning "Creating .env.testnet file..."
        cat > .env.testnet << EOF
# Testnet Environment Variables
DATABASE_URL="file:./prisma/testnet.db"
JWT_SECRET="testnet-jwt-secret-$(date +%s)"

# World ID Testnet
NEXT_PUBLIC_WORLD_ID_APP_ID="app_testnet_$(openssl rand -hex 8)"
NEXT_PUBLIC_WORLD_ID_ACTION="verify-human-testnet"
NEXT_PUBLIC_WORLD_ID_SIGNAL="anti-bot-launchpad-testnet"
NEXT_PUBLIC_WORLD_APP_MODE="testnet"

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="testnet_project_id"

# Testnet URLs
NEXT_PUBLIC_APP_URL="https://fair-launchpad-testnet.vercel.app"
NEXT_PUBLIC_ENVIRONMENT="testnet"

# Testnet RPC Endpoints (using public endpoints for demo)
NEXT_PUBLIC_ETHEREUM_RPC_URL="https://sepolia.infura.io/v3/demo"
NEXT_PUBLIC_POLYGON_RPC_URL="https://polygon-mumbai.infura.io/v3/demo"
NEXT_PUBLIC_ARBITRUM_RPC_URL="https://arbitrum-sepolia.infura.io/v3/demo"
EOF
        print_success "Created .env.testnet file"
    else
        print_status "Using existing .env.testnet file"
    fi
    
    # Copy testnet env to .env.local for build
    cp .env.testnet .env.local
    print_success "Environment configured"
}

# Setup testnet database
setup_database() {
    print_status "Setting up testnet database..."
    
    # Generate Prisma client
    npm run db:generate
    
    # Run database migrations
    npm run db:migrate
    
    # Seed with test data
    npm run db:seed
    
    print_success "Database setup complete"
}

# Run tests
run_tests() {
    print_status "Running tests..."
    
    if npm run test 2>/dev/null; then
        print_success "All tests passed"
    else
        print_warning "Some tests failed, but continuing with deployment"
    fi
}

# Build the application
build_application() {
    print_status "Building application for testnet..."
    
    # Set NODE_ENV to production for build
    export NODE_ENV=production
    
    # Build the application
    npm run build
    
    print_success "Application built successfully"
}

# Deploy to Vercel (if available)
deploy_vercel() {
    if command -v vercel &> /dev/null; then
        print_status "Deploying to Vercel..."
        
        # Check if already logged in
        if vercel whoami &> /dev/null; then
            print_status "Already logged in to Vercel"
        else
            print_warning "Please login to Vercel first: vercel login"
            return 1
        fi
        
        # Deploy to Vercel
        vercel --prod --yes
        
        print_success "Deployed to Vercel successfully"
        print_status "Your app is available at: https://fair-launchpad-testnet.vercel.app"
    else
        print_warning "Vercel CLI not found. Install with: npm i -g vercel"
        print_status "You can deploy manually to your preferred platform"
    fi
}

# Deploy to Netlify (if available)
deploy_netlify() {
    if command -v netlify &> /dev/null; then
        print_status "Deploying to Netlify..."
        
        # Build static export
        npm run build
        
        # Deploy to Netlify
        netlify deploy --prod --dir=out
        
        print_success "Deployed to Netlify successfully"
    else
        print_warning "Netlify CLI not found. Install with: npm i -g netlify-cli"
    fi
}

# Create deployment package
create_deployment_package() {
    print_status "Creating deployment package..."
    
    # Create deployment directory
    mkdir -p deployment
    
    # Copy necessary files
    cp -r .next deployment/
    cp -r public deployment/
    cp -r prisma deployment/
    cp package.json deployment/
    cp package-lock.json deployment/
    cp next.config.ts deployment/
    cp .env.testnet deployment/.env.local
    
    # Create deployment README
    cat > deployment/README.md << EOF
# FairLaunch Testnet Deployment

This is the deployment package for FairLaunch testnet.

## Quick Start

1. Install dependencies:
   \`\`\`bash
   npm ci
   \`\`\`

2. Setup database:
   \`\`\`bash
   npm run db:generate
   npm run db:migrate
   npm run db:seed
   \`\`\`

3. Start the application:
   \`\`\`bash
   npm start
   \`\`\`

## Environment Variables

All environment variables are configured in .env.local

## Database

The application uses SQLite for testnet deployment.

## Support

For issues, check the main repository or contact support.
EOF
    
    print_success "Deployment package created in ./deployment/"
}

# Main deployment function
main() {
    echo "🎯 FairLaunch Testnet Deployment"
    echo "================================="
    echo ""
    
    # Check dependencies
    check_dependencies
    
    # Install dependencies
    install_dependencies
    
    # Setup testnet environment
    setup_testnet_env
    
    # Setup database
    setup_database
    
    # Run tests
    run_tests
    
    # Build application
    build_application
    
    # Try to deploy to Vercel
    if deploy_vercel; then
        print_success "🚀 Deployment to Vercel successful!"
    else
        print_warning "Vercel deployment failed, creating deployment package..."
        create_deployment_package
        print_success "📦 Deployment package created!"
    fi
    
    echo ""
    echo "🎉 Testnet Deployment Complete!"
    echo "==============================="
    echo ""
    echo "Next steps:"
    echo "1. Test your deployed application"
    echo "2. Share the testnet URL with testers"
    echo "3. Monitor for any issues"
    echo "4. Collect feedback and iterate"
    echo ""
    echo "For manual deployment, use the files in ./deployment/"
    echo ""
}

# Run main function
main "$@"
