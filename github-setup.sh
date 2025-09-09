#!/bin/bash

# PropertyMatch Pro - GitHub Repository Setup Script
# This script helps you set up the project for GitHub

set -e

echo "🚀 PropertyMatch Pro - GitHub Setup"
echo "==================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "README.md" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# 1. Initialize Git repository
print_status "Initializing Git repository..."

if [ ! -d ".git" ]; then
    git init
    print_success "Git repository initialized"
else
    print_warning "Git repository already exists"
fi

# 2. Add all files to Git
print_status "Adding files to Git..."

# Ensure .gitignore is in place
if [ ! -f ".gitignore" ]; then
    print_error ".gitignore file not found. Please run setup.sh first."
    exit 1
fi

git add .
print_success "Files added to Git"

# 3. Create initial commit
print_status "Creating initial commit..."

if [ -z "$(git status --porcelain)" ]; then
    print_warning "No changes to commit"
else
    git commit -m "Initial commit: PropertyMatch Pro AI Chat Agent

Features:
- Real Parlant AI integration for intelligent conversations
- Smart property filtering by budget, bedrooms, type, location
- Modern UI with realestate.com.au theme
- Responsive design with interactive chat widget
- Comprehensive property database with 8+ sample properties
- Context-aware responses for both property and general questions
- Error handling and fallback systems
- Complete documentation and deployment guides

Tech Stack:
- Frontend: Next.js 14, React, TypeScript, Tailwind CSS
- Backend: Python, Parlant SDK, OpenAI API
- AI: Intelligent conversation and property matching
- UI/UX: Modern design with animations and responsive layout"
    
    print_success "Initial commit created"
fi

# 4. Check for existing remote
print_status "Checking for existing remote..."

if git remote get-url origin >/dev/null 2>&1; then
    REMOTE_URL=$(git remote get-url origin)
    print_warning "Remote 'origin' already exists: $REMOTE_URL"
    echo ""
    echo "To update the remote URL to your GitHub repository:"
    echo "git remote set-url origin https://github.com/jiningying/property-chat-agent.git"
else
    print_status "No remote repository configured"
    echo ""
    echo "To add your GitHub repository as remote:"
    echo "git remote add origin https://github.com/jiningying/property-chat-agent.git"
fi

# 5. Show next steps
echo ""
print_success "GitHub setup completed!"
echo ""
echo "📋 Next steps to push to GitHub:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   - Go to https://github.com/jiningying"
echo "   - Click 'New repository'"
echo "   - Name: 'property-chat-agent'"
echo "   - Description: 'AI-powered real estate chat agent using Parlant'"
echo "   - Make it public or private as desired"
echo "   - Don't initialize with README (we already have one)"
echo ""
echo "2. Add the remote and push:"
echo "   git remote add origin https://github.com/jiningying/property-chat-agent.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Or if you already have a remote:"
echo "   git push -u origin main"
echo ""
echo "🔒 Security Reminders:"
echo "   - Never commit .env files (they're in .gitignore)"
echo "   - Keep your API keys secure"
echo "   - The .gitignore file protects sensitive data"
echo ""
echo "📚 Documentation included:"
echo "   - README.md - General overview and usage"
echo "   - TECHNICAL_DOCS.md - Detailed technical documentation"
echo "   - DEPLOYMENT.md - Deployment and hosting guide"
echo "   - .gitignore - Protects sensitive files"
echo ""
echo "🎯 Repository features:"
echo "   - Complete source code"
echo "   - Comprehensive documentation"
echo "   - Setup and deployment scripts"
echo "   - Security best practices"
echo "   - Professional project structure"
echo ""
print_success "Ready to push to GitHub! 🚀"
