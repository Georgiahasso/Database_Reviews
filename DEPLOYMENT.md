# 🚀 Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Security Checklist

- [ ] No `.env` files in repository
- [ ] All secrets moved to environment variables
- [ ] `.gitignore` properly configured
- [ ] Security tests passing

### ✅ Code Quality

- [ ] All tests passing
- [ ] Linting clean
- [ ] Build successful
- [ ] No TypeScript errors

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

#### Setup Steps:

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**

   ```bash
   vercel login
   ```

3. **Deploy:**

   ```bash
   vercel
   ```

4. **Set Environment Variables:**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

#### GitHub Integration:

1. Connect your GitHub repository to Vercel
2. Enable automatic deployments on push to main
3. Set environment variables in Vercel dashboard

### Option 2: Netlify

#### Setup Steps:

1. **Install Netlify CLI:**

   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy:**

   ```bash
   npm run build
   netlify deploy --prod --dir=out
   ```

3. **Set Environment Variables:**
   - Go to Site Settings → Environment Variables
   - Add your Supabase credentials

### Option 3: Self-Hosted (VPS/Docker)

#### Docker Setup:

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Environment Configuration

### Development:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_dev_anon_key
```

### Production:

```bash
# Set in deployment platform
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_prod_anon_key
```

## 🛡️ Supabase Configuration

### Enable Real-time (Required):

```sql
-- Run in Supabase SQL Editor
ALTER PUBLICATION supabase_realtime ADD TABLE review;
```

### Row Level Security (Recommended):

```sql
-- Enable RLS on review table
ALTER TABLE review ENABLE ROW LEVEL SECURITY;

-- Create policy for reading reviews
CREATE POLICY "Allow public read access to reviews"
ON review FOR SELECT
USING (true);
```

## 📊 Monitoring & Analytics

### Vercel Analytics:

```bash
npm install @vercel/analytics
```

### Error Tracking:

```bash
npm install @sentry/nextjs
```

## 🔄 CI/CD Pipeline

### GitHub Actions:

The repository includes a GitHub Actions workflow that:

- Runs security checks
- Executes tests
- Builds the project
- Deploys to production

### Manual Deployment:

```bash
# Build locally
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod --dir=out
```

## 🚨 Troubleshooting

### Common Issues:

1. **Build Fails:**

   - Check environment variables are set
   - Verify Supabase connection
   - Check for TypeScript errors

2. **Real-time Not Working:**

   - Ensure real-time is enabled in Supabase
   - Check RLS policies
   - Verify network connectivity

3. **Data Not Loading:**
   - Check Supabase URL and keys
   - Verify table names match
   - Check browser console for errors

### Debug Mode:

```bash
# Enable debug logging
DEBUG=* npm run dev
```

## 📈 Performance Optimization

### Build Optimization:

- Enable compression
- Optimize images
- Use CDN for static assets
- Enable caching headers

### Database Optimization:

- Add database indexes
- Optimize queries
- Use connection pooling
- Monitor query performance

## 🔒 Security Hardening

### Production Checklist:

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] Error handling secure

### Security Headers (Vercel):

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section
2. Review deployment logs
3. Check Supabase dashboard
4. Contact support with error details

---

**Happy Deploying! 🎉**
