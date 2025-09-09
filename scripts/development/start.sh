#!/bin/bash

# PropertyMatch Pro - Master Start Script
# This is the main entry point for running PropertyMatch Pro

echo "🏠 PropertyMatch Pro - AI Property Personalization"
echo "=================================================="
echo ""
echo "Choose your preferred option:"
echo ""
echo "1. 🚀 Fully Automated (Recommended)"
echo "   - Complete setup and run in one command"
echo "   - Perfect for first-time users"
echo ""
echo "2. 🔧 Setup Only"
echo "   - Install dependencies and configure"
echo "   - Manual control over services"
echo ""
echo "3. 🎬 Demo Only"
echo "   - Run the Python demo script"
echo "   - No web interface"
echo ""
echo "4. 📚 Help & Documentation"
echo "   - View documentation and guides"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Starting fully automated setup and run..."
        echo ""
        ./run_automated.sh
        ;;
    2)
        echo ""
        echo "🔧 Running setup only..."
        echo ""
        ./setup.sh
        echo ""
        echo "✅ Setup completed! Now you can:"
        echo "   • Start backend: ./start_backend.sh"
        echo "   • Start frontend: ./start_frontend.sh"
        echo "   • Start everything: ./start_all.sh"
        echo "   • Run demo: ./run_demo.sh"
        ;;
    3)
        echo ""
        echo "🎬 Running demo only..."
        echo ""
        # Check if setup is done
        if [ ! -d "venv" ]; then
            echo "⚠️  Setup not detected. Running setup first..."
            ./setup.sh
        fi
        source venv/bin/activate
        python demo_usage.py
        ;;
    4)
        echo ""
        echo "📚 Documentation and Help"
        echo "========================"
        echo ""
        echo "📖 Available Documentation:"
        echo "   • README.md - Complete documentation"
        echo "   • quick_start.md - Quick start guide"
        echo "   • SETUP_AUTOMATED.md - Automated setup guide"
        echo ""
        echo "🔧 Available Scripts:"
        echo "   • ./setup.sh - Complete setup"
        echo "   • ./run_automated.sh - Fully automated run"
        echo "   • ./start_backend.sh - Backend only"
        echo "   • ./start_frontend.sh - Frontend only"
        echo "   • ./start_all.sh - Both services"
        echo "   • ./run_demo.sh - Demo script"
        echo "   • ./test_setup.py - Test setup"
        echo ""
        echo "🌐 Access Points:"
        echo "   • Frontend: http://localhost:3000"
        echo "   • Backend API: http://localhost:8000"
        echo ""
        echo "💡 Sample Questions for the AI:"
        echo "   • 'I'm looking for a 3-bedroom apartment under $800k'"
        echo "   • 'Show me properties with parking and a modern kitchen'"
        echo "   • 'What properties are near good schools?'"
        echo "   • 'Why did you recommend this property?'"
        echo ""
        echo "🐛 Troubleshooting:"
        echo "   • Check Python version: python3 --version (need 3.8+)"
        echo "   • Check Node.js version: node --version (need 16+)"
        echo "   • Re-run setup: ./setup.sh"
        echo "   • Test setup: python test_setup.py"
        echo ""
        ;;
    *)
        echo ""
        echo "❌ Invalid choice. Please run the script again and choose 1-4."
        echo ""
        exit 1
        ;;
esac

echo ""
echo "🎉 Thank you for using PropertyMatch Pro!"
echo "Built with ❤️ using Parlant AI"
