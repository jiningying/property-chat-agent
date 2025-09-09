#!/bin/bash

# PropertyMatch Pro - Setup Script
# This script sets up the complete development environment

set -e

echo "🏠 PropertyMatch Pro - Setup Script"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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
if [ ! -f "package.json" ] || [ ! -f "requirements.txt" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_status "Setting up PropertyMatch Pro development environment..."
echo ""

# 1. Check system requirements
print_status "Checking system requirements..."

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_success "Node.js found: $NODE_VERSION"
else
    print_error "Node.js is required but not installed. Please install Node.js 16+ and try again."
    exit 1
fi

# Check Python
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    print_success "Python found: $PYTHON_VERSION"
else
    print_error "Python 3 is required but not installed. Please install Python 3.13+ and try again."
    exit 1
fi

echo ""

# 2. Set up Python environment
print_status "Setting up Python virtual environment..."

if [ ! -d "venv" ]; then
    python3 -m venv venv
    print_success "Virtual environment created"
else
    print_warning "Virtual environment already exists"
fi

# Activate virtual environment
source venv/bin/activate
print_success "Virtual environment activated"

# Install Python dependencies
print_status "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt
print_success "Python dependencies installed"

echo ""

# 3. Set up Node.js environment
print_status "Setting up Node.js environment..."

# Install Node.js dependencies
npm install
print_success "Node.js dependencies installed"

echo ""

# 4. Create environment file template
print_status "Creating environment configuration..."

if [ ! -f ".env.example" ]; then
    cat > .env.example << EOF
# OpenAI API Configuration
OPENAI_API_KEY=your-openai-api-key-here
OPENAI_BASE_URL=https://api.openai.com/v1

# Optional: Custom Parlant configuration
PARLANT_API_KEY=your-parlant-api-key-here
EOF
    print_success "Environment template created (.env.example)"
else
    print_warning "Environment template already exists"
fi

# 5. Create local environment file if it doesn't exist
if [ ! -f ".env" ]; then
    cp .env.example .env
    print_warning "Created .env file from template. Please update with your actual API keys."
else
    print_warning ".env file already exists. Please ensure it contains your API keys."
fi

echo ""

# 6. Make scripts executable
print_status "Making scripts executable..."
chmod +x run_automated.sh
chmod +x start.sh
chmod +x setup.sh
print_success "Scripts made executable"

echo ""

# 7. Verify installation
print_status "Verifying installation..."

# Test Python imports
if python3 -c "import parlant; print('Parlant SDK available')" 2>/dev/null; then
    print_success "Parlant SDK is working"
else
    print_warning "Parlant SDK may not be working properly"
fi

# Test Node.js setup
if npm run build --silent 2>/dev/null; then
    print_success "Next.js build successful"
else
    print_warning "Next.js build may have issues"
fi

echo ""

# 8. Final instructions
print_success "Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env file with your actual API keys:"
echo "   - OPENAI_API_KEY=your-actual-key"
echo "   - OPENAI_BASE_URL=https://api.openai.com/v1"
echo ""
echo "2. Start the development server:"
echo "   ./run_automated.sh"
echo ""
echo "3. Or start manually:"
echo "   npm run dev  # Frontend on http://localhost:3000"
echo "   python3 parlant_integration.py  # Test AI backend"
echo ""
echo "4. Test the application:"
echo "   - Open http://localhost:3000"
echo "   - Click the red chat button"
echo "   - Try: 'show me 2 bedroom apartments under $800k'"
echo "   - Try: 'what do you know about flink?'"
echo ""
echo "🔒 Security Note:"
echo "   - Never commit .env file to git"
echo "   - Keep your API keys secure"
echo "   - The .gitignore file is configured to protect sensitive data"
echo ""
echo "📚 Documentation:"
echo "   - README.md - General overview and usage"
echo "   - TECHNICAL_DOCS.md - Detailed technical documentation"
echo ""
print_success "Happy coding! 🚀"