#!/bin/bash

# World App Mini App Deployment Script
# This script prepares and deploys the Fair Launchpad as a World App Mini App

set -e

echo "🚀 Starting World App Mini App deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if required environment variables are set
check_env() {
    echo -e "${BLUE}Checking environment variables...${NC}"
    
    if [ -z "$WORLD_ID_APP_ID" ]; then
        echo -e "${YELLOW}Warning: WORLD_ID_APP_ID not set. Using staging app ID.${NC}"
        export WORLD_ID_APP_ID="app_staging_1234567890abcdef"
    fi
    
    if [ -z "$WORLD_APP_DOMAIN" ]; then
        echo -e "${RED}Error: WORLD_APP_DOMAIN is required for deployment${NC}"
        echo "Please set WORLD_APP_DOMAIN to your deployed domain"
        exit 1
    fi
    
    echo -e "${GREEN}Environment check passed${NC}"
}

# Build the application
build_app() {
    echo -e "${BLUE}Building application for World App...${NC}"
    
    # Set environment for World App
    export NODE_ENV=production
    export NEXT_PUBLIC_WORLD_APP_MODE=true
    export NEXT_PUBLIC_WORLD_ID_APP_ID=$WORLD_ID_APP_ID
    
    # Build the application
    npm run build
    
    echo -e "${GREEN}Build completed successfully${NC}"
}

# Create World App specific files
create_world_app_files() {
    echo -e "${BLUE}Creating World App specific files...${NC}"
    
    # Create World App configuration
    cat > .world-app-config.json << EOF
{
  "name": "Fair Launchpad",
  "description": "Anti-bot meme coin launchpad with World ID verification",
  "version": "1.0.0",
  "domain": "$WORLD_APP_DOMAIN",
  "world_id": {
    "app_id": "$WORLD_ID_APP_ID",
    "action": "verify-human",
    "signal": "anti-bot-launchpad"
  },
  "features": [
    "token_launch",
    "trading",
    "reputation_system",
    "anti_manipulation",
    "world_id_verification"
  ],
  "permissions": [
    "world_id",
    "wallet",
    "storage"
  ]
}
EOF
    
    echo -e "${GREEN}World App configuration created${NC}"
}

# Deploy to your hosting platform
deploy() {
    echo -e "${BLUE}Deploying to $WORLD_APP_DOMAIN...${NC}"
    
    # This is a placeholder - replace with your actual deployment command
    # Examples:
    # - Vercel: vercel --prod
    # - Netlify: netlify deploy --prod
    # - AWS: aws s3 sync out/ s3://your-bucket
    # - Custom server: rsync -avz out/ user@server:/path/to/app
    
    echo -e "${YELLOW}Please implement your deployment method here${NC}"
    echo "Current domain: $WORLD_APP_DOMAIN"
    echo "Build output is in the 'out' directory"
    
    # Example for Vercel deployment
    if command -v vercel &> /dev/null; then
        echo -e "${BLUE}Deploying with Vercel...${NC}"
        vercel --prod --confirm
    else
        echo -e "${YELLOW}Vercel CLI not found. Please deploy manually.${NC}"
    fi
}

# Verify deployment
verify_deployment() {
    echo -e "${BLUE}Verifying deployment...${NC}"
    
    # Check if the app is accessible
    if curl -f -s "https://$WORLD_APP_DOMAIN" > /dev/null; then
        echo -e "${GREEN}✅ Deployment verified at https://$WORLD_APP_DOMAIN${NC}"
    else
        echo -e "${RED}❌ Deployment verification failed${NC}"
        echo "Please check your deployment manually"
    fi
}

# Main deployment flow
main() {
    echo -e "${GREEN}🎯 Fair Launchpad - World App Mini App Deployment${NC}"
    echo "=================================================="
    
    check_env
    build_app
    create_world_app_files
    deploy
    verify_deployment
    
    echo -e "${GREEN}🎉 World App Mini App deployment completed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Register your Mini App in the World App developer portal"
    echo "2. Submit your Mini App for review"
    echo "3. Test your Mini App in the World App environment"
    echo ""
    echo "Resources:"
    echo "- World App Developer Portal: https://developer.world.org"
    echo "- Documentation: https://docs.world.org"
    echo "- Your app: https://$WORLD_APP_DOMAIN"
}

# Run main function
main "$@"
