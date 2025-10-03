#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Review Dashboard...\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  const envExample = fs.readFileSync(path.join(__dirname, '..', 'env.example'), 'utf8');
  fs.writeFileSync(envPath, envExample);
  console.log('✅ Created .env.local file');
  console.log('⚠️  Please update .env.local with your Supabase credentials\n');
} else {
  console.log('✅ .env.local already exists\n');
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...');
  console.log('Run: npm install\n');
} else {
  console.log('✅ Dependencies already installed\n');
}

console.log('🎉 Setup complete! Next steps:');
console.log('1. Update .env.local with your Supabase credentials');
console.log('2. Run: npm install (if not already done)');
console.log('3. Run: npm run dev');
console.log('4. Open http://localhost:3000\n');

console.log('📚 For detailed setup instructions, see README.md');
