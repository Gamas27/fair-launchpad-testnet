#!/bin/bash

# G8 Platform Deployment Script
# This script deploys the G8 platform to Vercel

set -e

echo "🚀 Starting G8 Platform Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[G8]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[G8]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[G8]${NC} $1"
}

print_error() {
    echo -e "${RED}[G8]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI not found. Please install it with: npm i -g vercel"
    exit 1
fi

# Check if we're logged into Vercel
if ! vercel whoami &> /dev/null; then
    print_warning "Not logged into Vercel. Please run: vercel login"
    exit 1
fi

print_status "Building G8 platform..."

# Build the G8 platform
npm run build:g8

if [ $? -eq 0 ]; then
    print_success "G8 platform built successfully!"
else
    print_error "G8 platform build failed!"
    exit 1
fi

print_status "Deploying G8 platform to Vercel..."

# Deploy to Vercel with G8 configuration
vercel --prod --config vercel.g8.json

if [ $? -eq 0 ]; then
    print_success "G8 platform deployed successfully!"
    print_success "🌐 G8 Platform is now live!"
    print_status "You can access it at the URL provided above."
else
    print_error "G8 platform deployment failed!"
    exit 1
fi

print_success "🎉 G8 Platform deployment completed!"
print_status "Next steps:"
print_status "1. Configure environment variables in Vercel dashboard"
print_status "2. Set up World ID integration"
print_status "3. Configure database connection"
print_status "4. Test the platform functionality"

echo ""
print_success "G8 Platform is ready for the world! 🌍"

