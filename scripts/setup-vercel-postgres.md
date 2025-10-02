# Vercel Postgres Setup Guide

## Step 1: Create Vercel Postgres Database

1. Go to your Vercel dashboard: https://vercel.com/launchworld/fair-launchpad-testnet
2. Navigate to the "Storage" tab
3. Click "Create Database" → "Postgres"
4. Choose a name (e.g., "fair-launchpad-db")
5. Select a region close to your users
6. Click "Create"

## Step 2: Get Connection String

1. After creation, go to the database details
2. Copy the "Connection String" (starts with `postgresql://`)
3. This will be your `POSTGRES_URL`

## Step 3: Set Environment Variables

Run these commands to set up the environment variables:

```bash
# Set the production database URL
npx vercel env add POSTGRES_URL production

# When prompted, paste the connection string from Step 2
```

## Step 4: Update Local Environment

Add to your `.env` file:
```
DATABASE_URL="your_postgres_connection_string_here"
```

## Step 5: Generate Prisma Client

```bash
npx prisma generate
```

## Step 6: Push Schema to Database

```bash
npx prisma db push
```

## Step 7: Deploy to Production

```bash
npx vercel --prod
```

## Verification

After deployment, test the API:
```bash
curl -X POST https://fair-launchpad-testnet.vercel.app/api/auth/verify-world-id \
  -H "Content-Type: application/json" \
  -d '{"worldIdHash":"0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef","verificationLevel":"device","proof":{"proof":"test"}}'
```

You should get a successful response with real database operations!
