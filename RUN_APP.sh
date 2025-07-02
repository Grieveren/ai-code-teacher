#!/bin/bash

echo "🚀 Starting AI Code Teacher..."
echo ""
echo "Starting servers in separate terminals..."
echo ""

# Open new terminal for backend
osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'/server\" && npm run dev"'

# Open new terminal for frontend
osascript -e 'tell app "Terminal" to do script "cd \"'$(pwd)'/client\" && npm start"'

echo "✅ Servers starting in new terminal windows!"
echo ""
echo "📱 Frontend will be available at: http://localhost:3000"
echo "🔧 Backend API will be available at: http://localhost:3001"
echo ""
echo "Please wait a few seconds for the servers to fully start..."
echo ""
echo "If you see TypeScript errors in the backend terminal, the app will still work!"