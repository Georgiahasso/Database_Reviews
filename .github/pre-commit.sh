#!/bin/bash

# Pre-commit security check
# This script prevents committing sensitive files

echo "🔍 Running security checks..."

# Check for .env files
if find . -name ".env*" -not -name ".env.example" | grep -q .; then
    echo "❌ ERROR: .env files found!"
    echo "Please remove .env files before committing:"
    find . -name ".env*" -not -name ".env.example"
    exit 1
fi

# Check for potential secrets in code (excluding safe references)
if grep -r "NEXT_PUBLIC_SUPABASE_URL\|NEXT_PUBLIC_SUPABASE_ANON_KEY\|SUPABASE_SERVICE_ROLE_KEY" \
    --exclude-dir=node_modules --exclude-dir=.github --exclude="*.md" --exclude=".gitignore" --exclude="*.sh" --exclude="*.yml" --exclude="env.example" . | \
    grep -v "example\|dummy\|placeholder\|your_supabase_\|process\.env\.\|console\.warn" | grep -q .; then
    echo "❌ ERROR: Potential secrets found in code!"
    echo "Please ensure all sensitive data is in environment variables only."
    echo "Found suspicious patterns:"
    grep -r "NEXT_PUBLIC_SUPABASE_URL\|NEXT_PUBLIC_SUPABASE_ANON_KEY\|SUPABASE_SERVICE_ROLE_KEY" \
        --exclude-dir=node_modules --exclude-dir=.github --exclude="*.md" --exclude=".gitignore" --exclude="*.sh" --exclude="*.yml" --exclude="env.example" . | \
        grep -v "example\|dummy\|placeholder\|your_supabase_\|process\.env\.\|console\.warn"
    exit 1
fi

# Check for common secret patterns
if grep -r "sk_\|pk_\|Bearer\|Authorization" \
    --exclude-dir=node_modules --exclude-dir=.next --exclude="*.md" --exclude=".gitignore" --exclude="*.sh" --exclude="*.yml" --exclude="env.example" . | \
    grep -v "example\|dummy\|placeholder" | grep -q .; then
    echo "❌ ERROR: Potential API keys found in code!"
    echo "Please move all API keys to environment variables."
    exit 1
fi

echo "✅ Security checks passed!"
echo "🚀 Ready to commit!"
