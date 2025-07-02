#!/bin/bash

echo "🚀 Setting up AI Code Teacher..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install all dependencies
echo "📦 Installing all project dependencies..."
npm run install:all

echo "✅ Installation complete!"
echo ""
echo "📝 Next steps:"
echo "1. Copy environment files:"
echo "   cp server/.env.example server/.env"
echo "   cp client/.env.example client/.env"
echo ""
echo "2. Edit server/.env and add:"
echo "   - Your Claude API key (ANTHROPIC_API_KEY)"
echo "   - Database connection string"
echo "   - JWT secret"
echo ""
echo "3. Start development servers:"
echo "   npm run dev"
echo ""
echo "The app will be available at:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend:  http://localhost:3001"