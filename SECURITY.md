# 🔒 Security Guide for Review Dashboard

## ⚠️ CRITICAL SECURITY NOTICES

### 🚨 Never Commit These Files:

- `.env` files (any variant)
- `config/secrets.json`
- Database credentials
- API keys
- Private keys (`.key`, `.pem`, `.p12`, `.pfx`)

### ✅ Safe to Commit:

- `.env.example` (template only)
- Source code
- Documentation
- Configuration templates

## 🔐 Environment Variables Setup

### Required Environment Variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Service Role Key (for admin operations)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional: Table Names (if different from defaults)
NEXT_PUBLIC_REVIEWS_TABLE=review
NEXT_PUBLIC_REPLIES_TABLE=review_replies
```

### 🛡️ Security Best Practices:

1. **Environment Variables Only**

   - Never hardcode secrets in source code
   - Use environment variables for all sensitive data
   - Check `.env.example` for required variables

2. **Supabase Security**

   - Use Row Level Security (RLS) policies
   - Limit API key permissions
   - Regularly rotate keys
   - Monitor API usage

3. **Database Security**
   - Enable RLS on all tables
   - Use least-privilege access
   - Regular security audits
   - Backup encryption

## 🚀 Deployment Security

### GitHub Secrets Setup:

Add these secrets to your GitHub repository:

```
VERCEL_TOKEN=your_vercel_deployment_token
VERCEL_ORG_ID=your_vercel_organization_id
VERCEL_PROJECT_ID=your_vercel_project_id
```

### Production Environment Variables:

Set these in your deployment platform (Vercel/Netlify):

```
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
```

## 🔍 Pre-Commit Security Checklist

Before committing to GitHub:

- [ ] No `.env` files in the commit
- [ ] No hardcoded secrets in code
- [ ] All sensitive data in environment variables
- [ ] `.gitignore` properly configured
- [ ] Code review completed
- [ ] Security tests passed

## 🛠️ Security Commands

### Check for secrets before committing:

```bash
# Check for potential secrets in code
grep -r "NEXT_PUBLIC_SUPABASE_URL\|NEXT_PUBLIC_SUPABASE_ANON_KEY" --exclude-dir=node_modules --exclude="*.md" .

# Check for .env files
find . -name ".env*" -not -name ".env.example"
```

### Remove sensitive files:

```bash
# Remove any accidentally committed .env files
git rm --cached .env*
git commit -m "Remove accidentally committed .env files"
```

## 🚨 If Secrets Are Exposed

1. **Immediately rotate all exposed keys**
2. **Check Supabase logs for unauthorized access**
3. **Update all environment variables**
4. **Review and audit access logs**
5. **Consider the scope of exposure**

## 📞 Security Contact

If you discover a security vulnerability:

1. Do NOT create a public issue
2. Contact the maintainer privately
3. Provide detailed information about the vulnerability
4. Allow time for response before public disclosure

## 🔄 Regular Security Maintenance

- [ ] Monthly key rotation
- [ ] Quarterly security audits
- [ ] Regular dependency updates
- [ ] Monitor Supabase usage logs
- [ ] Review and update RLS policies

---

**Remember: Security is everyone's responsibility!**
