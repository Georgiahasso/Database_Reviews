# 🐙 GitHub Setup Guide

## 🚀 Quick Start - Push to GitHub

### Step 1: Initialize Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Review Dashboard with real-time features"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name it: `review-dashboard` (or your preferred name)
4. **DO NOT** check "Add a README file" (we already have one)
5. Click "Create repository"

### Step 3: Connect and Push

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/review-dashboard.git

# Push to GitHub
git push -u origin main
```

## 🔒 Security Checklist (CRITICAL)

### ✅ Before Pushing - Run Security Check:

```bash
# Check for .env files
find . -name ".env*" -not -name ".env.example"

# Check for secrets in code
grep -r "NEXT_PUBLIC_SUPABASE_URL\|NEXT_PUBLIC_SUPABASE_ANON_KEY" --exclude-dir=node_modules --exclude="*.md" .
```

### ✅ Verify .gitignore is Working:

```bash
# Check what files are being tracked
git status

# Ensure .env files are ignored
ls -la | grep .env
```

## 🛡️ Security Features Included

### 🔐 Protected Files:

- ✅ `.env*` files (all variants)
- ✅ Database credentials
- ✅ API keys
- ✅ Private keys
- ✅ Build artifacts
- ✅ IDE files

### 🔍 Security Checks:

- ✅ GitHub Actions security workflow
- ✅ Pre-commit hooks
- ✅ Automated secret detection
- ✅ Build validation

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. Connect your GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Automatic deployments on push to main

### Option 2: Netlify

1. Connect your GitHub repo to Netlify
2. Set environment variables in Netlify dashboard
3. Configure build settings

### Option 3: Manual Deployment

```bash
# Build locally
npm run build

# Deploy to your preferred platform
```

## 📋 Environment Variables Setup

### Required Variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Optional Variables:

```bash
NEXT_PUBLIC_REVIEWS_TABLE=review
NEXT_PUBLIC_REPLIES_TABLE=review_replies
```

## 🔄 Workflow Features

### GitHub Actions Included:

- **Security Checks**: Prevents secrets from being committed
- **Automated Testing**: Runs linting and build checks
- **Deployment**: Automatic deployment to production
- **Quality Gates**: Ensures code quality before deployment

### Branch Protection:

- Main branch requires pull requests
- Security checks must pass
- Code review required

## 🚨 If You Accidentally Commit Secrets

### Immediate Action:

1. **Rotate all exposed keys immediately**
2. **Remove secrets from git history**:
   ```bash
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch .env*' \
   --prune-empty --tag-name-filter cat -- --all
   ```
3. **Force push** (warning: this rewrites history):
   ```bash
   git push origin --force --all
   ```

### Prevention:

- Always run security checks before committing
- Use pre-commit hooks
- Never commit `.env` files
- Use environment variables only

## 📚 Documentation Included

- **SECURITY.md**: Comprehensive security guide
- **DEPLOYMENT.md**: Step-by-step deployment instructions
- **README.md**: Project overview and setup
- **.env.example**: Environment variables template

## 🎯 Next Steps

1. **Push to GitHub** (following steps above)
2. **Set up deployment** (Vercel recommended)
3. **Configure environment variables**
4. **Enable real-time in Supabase**
5. **Test the live deployment**

## 🔧 Troubleshooting

### Common Issues:

1. **Push Rejected**:

   - Check if repository exists
   - Verify remote URL
   - Ensure you have write access

2. **Build Fails**:

   - Check environment variables
   - Verify Supabase connection
   - Review build logs

3. **Security Check Fails**:
   - Remove any `.env` files
   - Check for hardcoded secrets
   - Run security check script

### Get Help:

- Check the troubleshooting sections in SECURITY.md and DEPLOYMENT.md
- Review GitHub Actions logs
- Check deployment platform logs

---

## ✅ Final Checklist

Before pushing to GitHub:

- [ ] No `.env` files in repository
- [ ] All secrets in environment variables
- [ ] Security check passes
- [ ] Build successful locally
- [ ] Documentation complete
- [ ] Ready for deployment

**Your dashboard is now ready for GitHub! 🎉**
