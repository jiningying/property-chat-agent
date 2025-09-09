#!/bin/bash

# PropertyMatch Pro - Fully Automated Run Script
# This script runs the complete PropertyMatch Pro demo automatically

set -e  # Exit on any error

echo "🚀 PropertyMatch Pro - Fully Automated Run"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
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

print_demo() {
    echo -e "${PURPLE}[DEMO]${NC} $1"
}

# Check if setup has been run
if [ ! -d "venv" ] || [ ! -d "node_modules" ]; then
    print_warning "Setup not detected. Running automated setup first..."
    chmod +x setup.sh
    ./setup.sh
    echo ""
fi

# Function to handle cleanup on exit
cleanup() {
    echo ""
    print_status "🛑 Shutting down services..."
    kill $BACKEND_PID $FRONTEND_PID $DEMO_PID 2>/dev/null || true
    print_success "Cleanup completed"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

print_status "Starting PropertyMatch Pro in fully automated mode..."
echo ""

# Step 1: Activate Python environment
print_status "🐍 Activating Python environment..."
source venv/bin/activate
print_success "Python environment activated"

# Step 2: Start backend server in background
print_status "🔧 Starting backend server..."
python property_agent_example.py &
BACKEND_PID=$!

# Wait for backend to start
print_status "⏳ Waiting for backend to initialize..."
sleep 5

# Check if backend is running
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    print_error "Backend failed to start"
    exit 1
fi
print_success "Backend server started (PID: $BACKEND_PID)"

# Step 3: Start frontend server in background
print_status "⚛️  Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

# Wait for frontend to start
print_status "⏳ Waiting for frontend to initialize..."
sleep 10

# Check if frontend is running
if ! kill -0 $FRONTEND_PID 2>/dev/null; then
    print_error "Frontend failed to start"
    kill $BACKEND_PID 2>/dev/null || true
    exit 1
fi
print_success "Frontend server started (PID: $FRONTEND_PID)"

# Step 4: Run the demo script
print_status "🎬 Starting automated demo..."
python demo_usage.py &
DEMO_PID=$!

# Wait for demo to complete
wait $DEMO_PID
print_success "Demo completed"

# Step 5: Display access information
echo ""
echo "🎉 PropertyMatch Pro is now running!"
echo "=================================="
echo ""
print_success "🌐 Frontend: http://localhost:3000"
print_success "🔧 Backend API: Running on port 8000"
print_success "💬 Chat Widget: Available on the frontend page"
echo ""
print_demo "🎯 Try these features:"
echo "   • Click the chat button to start a conversation"
echo "   • Ask about properties in your budget range"
echo "   • Request explanations for recommendations"
echo "   • Save properties to your favorites"
echo "   • Update your preferences in real-time"
echo ""
print_demo "💡 Sample questions to try:"
echo "   • 'I'm looking for a 3-bedroom apartment under $800k'"
echo "   • 'Show me properties with parking and a modern kitchen'"
echo "   • 'What properties are near good schools?'"
echo "   • 'Why did you recommend this property?'"
echo ""
print_demo "🔄 The AI learns from your interactions and improves recommendations!"
echo ""

# Step 6: Keep services running and show status
print_status "🔄 Services are running. Press Ctrl+C to stop all services."
echo ""

# Monitor services
while true; do
    # Check if backend is still running
    if ! kill -0 $BACKEND_PID 2>/dev/null; then
        print_error "Backend server stopped unexpectedly"
        kill $FRONTEND_PID 2>/dev/null || true
        exit 1
    fi
    
    # Check if frontend is still running
    if ! kill -0 $FRONTEND_PID 2>/dev/null; then
        print_error "Frontend server stopped unexpectedly"
        kill $BACKEND_PID 2>/dev/null || true
        exit 1
    fi
    
    # Show status every 30 seconds
    sleep 30
    print_status "🟢 All services running normally..."
done
