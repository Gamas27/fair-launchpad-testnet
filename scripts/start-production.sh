#!/bin/bash

# Production startup script for FairLaunch
set -e

echo "🚀 Starting FairLaunch in production mode..."

# Check if required environment variables are set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Error: DATABASE_URL environment variable is required"
    exit 1
fi

if [ -z "$JWT_SECRET" ]; then
    echo "❌ Error: JWT_SECRET environment variable is required"
    exit 1
fi

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
until npx prisma db push --accept-data-loss; do
    echo "Database is unavailable - sleeping"
    sleep 2
done

echo "✅ Database is ready"

# Run database migrations
echo "🔄 Running database migrations..."
npx prisma db push

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Seed database if needed (only in development or if explicitly requested)
if [ "$NODE_ENV" = "development" ] || [ "$SEED_DATABASE" = "true" ]; then
    echo "🌱 Seeding database..."
    npm run db:seed
fi

# Start the application
echo "🎯 Starting FairLaunch application..."
exec npm start




