# PropertyMatch Pro - Deployment Guide

## 🚀 Deployment Options

### 1. Local Development
```bash
# Quick start
./setup.sh
./run_automated.sh

# Manual start
npm run dev  # Frontend: http://localhost:3000
python3 parlant_integration.py  # Backend testing
```

### 2. Docker Deployment

#### Dockerfile
```dockerfile
# Multi-stage build
FROM node:18-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM python:3.13-alpine AS backend
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY parlant_integration.py parlant_chat.py ./

FROM node:18-alpine
WORKDIR /app
COPY --from=frontend /app/.next ./.next
COPY --from=frontend /app/public ./public
COPY --from=frontend /app/package*.json ./
COPY --from=backend /app/venv ./venv
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  property-chat:
    build: .
    ports:
      - "3000:3000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - OPENAI_BASE_URL=${OPENAI_BASE_URL}
    volumes:
      - ./data:/app/data
```

### 3. Cloud Deployment

#### Vercel (Frontend)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Environment variables in Vercel dashboard:
# OPENAI_API_KEY=your-key
# OPENAI_BASE_URL=your-endpoint
```

#### Railway (Full Stack)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up

# Set environment variables
railway variables set OPENAI_API_KEY=your-key
railway variables set OPENAI_BASE_URL=your-endpoint
```

#### Heroku
```bash
# Install Heroku CLI
# Create Procfile
echo "web: npm start" > Procfile

# Deploy
git add .
git commit -m "Deploy to Heroku"
heroku create property-chat-agent
git push heroku main

# Set environment variables
heroku config:set OPENAI_API_KEY=your-key
heroku config:set OPENAI_BASE_URL=your-endpoint
```

## 🔧 Environment Configuration

### Required Environment Variables
```bash
# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_BASE_URL=https://api.openai.com/v1

# Optional: Custom Parlant Configuration
PARLANT_API_KEY=your-parlant-api-key
```

### Production Environment
```bash
# .env.production
NODE_ENV=production
OPENAI_API_KEY=sk-prod-key
OPENAI_BASE_URL=https://api.openai.com/v1
PORT=3000
```

## 🛡️ Security Considerations

### API Key Management
```bash
# Never commit API keys to git
echo ".env" >> .gitignore
echo "*.key" >> .gitignore
echo "secrets.json" >> .gitignore

# Use environment variables
export OPENAI_API_KEY="your-key"
export OPENAI_BASE_URL="your-endpoint"
```

### Production Security
```typescript
// Add rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### HTTPS Configuration
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          }
        ]
      }
    ];
  }
};
```

## 📊 Monitoring & Logging

### Application Monitoring
```typescript
// Add logging middleware
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Health Check Endpoint
```typescript
// pages/api/health.ts
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  });
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🗄️ Database Setup (Future)

### PostgreSQL
```sql
-- Create database
CREATE DATABASE property_chat;

-- Create properties table
CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  address VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  property_type VARCHAR(50) NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  car_spaces INTEGER NOT NULL,
  features TEXT[],
  suburb VARCHAR(100),
  state VARCHAR(50),
  postcode VARCHAR(10),
  description TEXT,
  size INTEGER,
  year_built INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Database Connection
```typescript
// lib/database.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export default pool;
```

## 📈 Performance Optimization

### Caching Strategy
```typescript
// Add Redis caching
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function getCachedProperties(criteria: string) {
  const cached = await redis.get(`properties:${criteria}`);
  return cached ? JSON.parse(cached) : null;
}

export async function setCachedProperties(criteria: string, properties: any) {
  await redis.setex(`properties:${criteria}`, 3600, JSON.stringify(properties));
}
```

### CDN Configuration
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['images.unsplash.com'],
    loader: 'custom',
    loaderFile: './lib/imageLoader.js'
  }
};
```

## 🔍 Troubleshooting

### Common Issues

#### 1. API Key Not Working
```bash
# Check environment variables
echo $OPENAI_API_KEY
echo $OPENAI_BASE_URL

# Test API connection
curl -H "Authorization: Bearer $OPENAI_API_KEY" \
     -H "Content-Type: application/json" \
     "$OPENAI_BASE_URL/v1/models"
```

#### 2. Build Failures
```bash
# Clear cache and rebuild
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

#### 3. Python Import Errors
```bash
# Check virtual environment
source venv/bin/activate
pip list | grep parlant

# Reinstall if needed
pip uninstall parlant
pip install parlant>=3.0.0
```

### Log Analysis
```bash
# Check application logs
tail -f logs/combined.log

# Check error logs
tail -f logs/error.log

# Check system resources
htop
df -h
```

## 📋 Pre-deployment Checklist

- [ ] Environment variables configured
- [ ] API keys secured and working
- [ ] All tests passing
- [ ] Build successful
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Monitoring setup
- [ ] Backup strategy in place
- [ ] SSL certificate configured
- [ ] Domain configured
- [ ] Error handling tested
- [ ] Performance tested

## 🚀 Go Live

### Final Steps
1. **Test in staging environment**
2. **Run security scan**
3. **Performance test**
4. **Backup current state**
5. **Deploy to production**
6. **Monitor for issues**
7. **Update documentation**

### Post-deployment
1. **Verify all functionality**
2. **Check monitoring dashboards**
3. **Test error scenarios**
4. **Update DNS if needed**
5. **Announce to users**

---

**This deployment guide provides comprehensive instructions for deploying PropertyMatch Pro in various environments while maintaining security and performance.**
