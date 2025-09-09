# 🚀 PropertyMatch Pro - Quick Start Guide

## One-Command Setup & Run

```bash
# Make scripts executable and run everything
chmod +x *.sh && ./run_automated.sh
```

That's it! This single command will:
- ✅ Check system requirements
- ✅ Set up Python virtual environment
- ✅ Install all dependencies
- ✅ Start backend server
- ✅ Start frontend server
- ✅ Run the demo
- ✅ Open the application

## 🌐 Access the Application

Once running, visit: **http://localhost:3000**

## 🎯 What You'll See

1. **Beautiful Landing Page** - Modern property search interface
2. **Chat Widget** - Click the chat button to start talking to the AI
3. **Property Recommendations** - AI-powered personalized suggestions
4. **Interactive Features** - Save, share, and explore properties

## 💬 Try These Sample Conversations

- *"I'm looking for a 3-bedroom apartment under $800k in Melbourne"*
- *"Show me properties with parking and a modern kitchen"*
- *"What properties are near good schools?"*
- *"Why did you recommend this property?"*
- *"I'm a first-time buyer, can you help me understand the process?"*

## 🔧 Manual Control (Optional)

If you want to control services individually:

```bash
# Setup only
./setup.sh

# Start backend only
./start_backend.sh

# Start frontend only  
./start_frontend.sh

# Run demo only
./run_demo.sh

# Start everything
./start_all.sh
```

## 🛑 Stop Everything

Press `Ctrl+C` in the terminal where you ran the script.

## 🐛 Troubleshooting

### If setup fails:
```bash
# Check Python version (need 3.8+)
python3 --version

# Check Node.js version (need 16+)
node --version

# Re-run setup
./setup.sh
```

### If services won't start:
```bash
# Check if ports are free
lsof -i :3000  # Frontend port
lsof -i :8000  # Backend port

# Kill processes using ports
kill -9 $(lsof -t -i:3000)
kill -9 $(lsof -t -i:8000)
```

### If you see import errors:
```bash
# Reinstall Python dependencies
source venv/bin/activate
pip install -r requirements.txt

# Reinstall Node.js dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📚 Full Documentation

- `README.md` - Complete documentation
- `SETUP_AUTOMATED.md` - Detailed setup guide
- `demo_usage.py` - Demo script with examples

## 🎉 Enjoy!

The PropertyMatch Pro demo showcases how Parlant's AI can transform property search into a personalized, conversational experience. The AI learns from your interactions and provides increasingly accurate recommendations!

**Built with ❤️ using Parlant AI**
