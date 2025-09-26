# FairLaunch Deployment Guide

## Production Deployment

### Prerequisites

- Docker and Docker Compose
- PostgreSQL database
- Redis (optional, for caching and rate limiting)
- Domain name and SSL certificate

### Environment Variables

Create a `.env.production` file with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@host:5432/fairlaunch"

# JWT Secret (generate a strong secret)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# World ID Configuration
WORLD_ID_APP_ID="your-world-id-app-id"
WORLD_ID_ACTION="verify-human"
WORLD_ID_SIGNAL="anti-bot-launchpad"

# Redis (for rate limiting and caching)
REDIS_URL="redis://host:6379"

# Application
NODE_ENV="production"
PORT=3000

# Security
CORS_ORIGIN="https://yourdomain.com"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100

# Trading Configuration
MAX_TRADE_AMOUNT=10000
MIN_TRADE_AMOUNT=1
TRADING_FEE_PERCENTAGE=0.5

# Anti-Manipulation
MAX_DAILY_TRADES=50
MAX_TRADES_PER_HOUR=10
SUSPICIOUS_ACTIVITY_THRESHOLD=70

# Reputation System
REPUTATION_BOOST_MULTIPLIER=1.5
QUEST_REWARD_BASE=100
```

### Docker Deployment

1. **Build and run with Docker Compose:**

```bash
# Copy environment file
cp .env.example .env.production

# Edit environment variables
nano .env.production

# Build and start services
docker-compose up -d

# Run database migrations
docker-compose exec app npx prisma db push

# Seed initial data (optional)
docker-compose exec app npm run db:seed
```

2. **Check logs:**

```bash
# View application logs
docker-compose logs -f app

# View database logs
docker-compose logs -f db
```

### Manual Deployment

1. **Install dependencies:**

```bash
npm ci
```

2. **Build the application:**

```bash
npm run build
```

3. **Set up the database:**

```bash
# Run migrations
npx prisma db push

# Seed initial data (optional)
npm run db:seed
```

4. **Start the application:**

```bash
npm start
```

### Database Setup

1. **Create PostgreSQL database:**

```sql
CREATE DATABASE fairlaunch;
CREATE USER fairlaunch WITH PASSWORD 'your-password';
GRANT ALL PRIVILEGES ON DATABASE fairlaunch TO fairlaunch;
```

2. **Run Prisma migrations:**

```bash
npx prisma db push
```

3. **Seed initial data:**

```bash
npm run db:seed
```

### SSL/HTTPS Setup

For production, set up SSL certificates:

1. **Using Let's Encrypt with Nginx:**

```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Monitoring and Logging

1. **Health Check Endpoint:**

The application provides a health check at `/api/health`

2. **Logging:**

- Application logs are written to stdout
- Use a log aggregation service like ELK stack or similar
- Monitor error rates and response times

3. **Database Monitoring:**

- Monitor database connections
- Set up alerts for slow queries
- Regular backups

### Security Considerations

1. **Environment Variables:**
   - Never commit `.env` files
   - Use strong, unique secrets
   - Rotate secrets regularly

2. **Database Security:**
   - Use strong passwords
   - Enable SSL connections
   - Restrict network access

3. **Application Security:**
   - Enable CORS for your domain only
   - Implement rate limiting
   - Use HTTPS in production
   - Regular security updates

### Scaling

1. **Horizontal Scaling:**
   - Use a load balancer (Nginx, HAProxy)
   - Deploy multiple application instances
   - Use a shared Redis instance for session storage

2. **Database Scaling:**
   - Use read replicas for read-heavy operations
   - Implement connection pooling
   - Consider database sharding for large datasets

### Backup Strategy

1. **Database Backups:**

```bash
# Create backup
pg_dump -h localhost -U fairlaunch fairlaunch > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore backup
psql -h localhost -U fairlaunch fairlaunch < backup_file.sql
```

2. **Automated Backups:**

Set up cron jobs for regular backups:

```bash
# Daily backup at 2 AM
0 2 * * * pg_dump -h localhost -U fairlaunch fairlaunch > /backups/daily_$(date +\%Y\%m\%d).sql
```

### Troubleshooting

1. **Common Issues:**

- **Database connection errors:** Check DATABASE_URL and database status
- **JWT errors:** Verify JWT_SECRET is set correctly
- **World ID errors:** Check World ID configuration
- **Rate limiting issues:** Verify Redis connection

2. **Debug Mode:**

Enable debug logging by setting:

```bash
DEBUG=*
```

3. **Health Checks:**

Monitor these endpoints:
- `/api/health` - Application health
- `/api/tokens` - API functionality
- Database connectivity

### Performance Optimization

1. **Database:**
   - Add indexes for frequently queried fields
   - Use connection pooling
   - Monitor slow queries

2. **Application:**
   - Enable gzip compression
   - Use CDN for static assets
   - Implement caching strategies

3. **Monitoring:**
   - Set up APM (Application Performance Monitoring)
   - Monitor memory usage
   - Track response times

### Updates and Maintenance

1. **Application Updates:**

```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm ci

# Run migrations
npx prisma db push

# Restart application
docker-compose restart app
```

2. **Database Maintenance:**

```bash
# Analyze database performance
npx prisma db execute --stdin < analyze.sql

# Clean up old logs
DELETE FROM "AntiManipulationLog" WHERE "createdAt" < NOW() - INTERVAL '30 days';
```

### Support

For deployment issues:
1. Check application logs
2. Verify environment variables
3. Test database connectivity
4. Review security configurations




