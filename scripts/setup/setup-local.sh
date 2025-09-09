#!/bin/bash

echo "🏠 PropertyMatch Pro - Local Setup"
echo "=================================="
echo ""

# Check if .env already exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists!"
    echo "   Current contents:"
    cat .env
    echo ""
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 0
    fi
fi

echo "🔧 Setting up local environment..."

# Copy template
cp env.example .env
echo "✅ Created .env from template"

echo ""
echo "📝 Please edit .env with your actual credentials:"
echo ""
echo "   OPENAI_API_KEY=your-actual-api-key-here"
echo "   OPENAI_BASE_URL=https://api.omnia.reainternal.net/v1"
echo ""

# Check if user wants to edit now
read -p "Do you want to edit .env now? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Try to open with default editor
    if command -v code &> /dev/null; then
        echo "Opening with VS Code..."
        code .env
    elif command -v nano &> /dev/null; then
        echo "Opening with nano..."
        nano .env
    elif command -v vim &> /dev/null; then
        echo "Opening with vim..."
        vim .env
    else
        echo "Please edit .env manually with your preferred editor."
    fi
fi

echo ""
echo "🚀 Next steps:"
echo "1. Make sure .env has your actual API credentials"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "✅ Local setup complete!"
