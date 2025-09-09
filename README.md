# PropertyMatch Pro - AI-Powered Real Estate Chat Agent

A sophisticated real estate property recommendation system powered by Parlant AI, featuring intelligent conversation capabilities and smart property filtering.

## 🏠 Overview

PropertyMatch Pro is a full-stack web application that demonstrates the power of AI-driven property personalization. Built with Next.js frontend and Python backend, it showcases how Parlant AI can be integrated into real-world applications for intelligent property recommendations.

## ✨ Features

### 🤖 AI-Powered Chat
- **Real Parlant AI Integration** - Uses actual Parlant SDK for intelligent conversations
- **Smart Property Filtering** - Filters properties by budget, bedrooms, property type, and location
- **Contextual Responses** - Handles both property and general knowledge questions
- **Personality & Jokes** - Engaging conversational experience with real estate humor

### 🎨 Modern UI/UX
- **Realestate.com.au Theme** - Professional red and white color scheme
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Interactive Chat Widget** - Floating chat button with smooth animations
- **Property Cards** - Beautiful property displays with detailed information

### 🔧 Technical Features
- **Hybrid AI System** - Combines Parlant AI with intelligent fallbacks
- **Real-time Filtering** - Instant property recommendations based on criteria
- **Error Handling** - Graceful fallbacks when AI services are unavailable
- **Environment Management** - Secure API key handling

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- Python 3.13+
- OpenAI API Key (for Parlant integration)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/jiningying/property-chat-agent.git
cd property-chat-agent
```

2. **Set up Python environment**
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. **Set up environment variables**
```bash
# Option 1: Use the interactive setup
./setup-local.sh

# Option 2: Manual setup
cp env.example .env
# Edit .env with your actual API credentials:
# OPENAI_API_KEY=your-actual-api-key
# OPENAI_BASE_URL=https://api.omnia.reainternal.net/v1
```

4. **Install Node.js dependencies**
```bash
npm install
```

5. **Start the application**
```bash
# Option 1: Automated start
./run_automated.sh

# Option 2: Manual start
npm run dev  # Frontend on http://localhost:3000
```

## 🏗️ Architecture

### Frontend (Next.js)
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom realestate.com.au theme
- **Components**: React-based chat widget and property cards
- **API Integration**: RESTful API calls to Python backend

### Backend (Python)
- **AI Engine**: Parlant SDK for intelligent conversations
- **Property Database**: Mock property data with realistic details
- **Filtering Logic**: Smart property matching based on user criteria
- **API**: FastAPI-style responses via Next.js API routes

### AI Integration
- **Parlant SDK**: Real AI conversation capabilities
- **OpenAI Integration**: Custom API endpoint support
- **Fallback System**: Pattern matching when AI is unavailable
- **Context Awareness**: Handles both property and general questions

## 📁 Project Structure

```
property-chat-agent/
├── components/
│   └── PropertyChatWidget.tsx    # Main chat interface
├── pages/
│   ├── api/
│   │   └── parlant-chat.ts       # API endpoint for chat
│   ├── index.tsx                 # Main landing page
│   ├── _app.tsx                  # Next.js app configuration
│   └── _document.tsx             # HTML document structure
├── styles/
│   └── globals.css               # Global styles and Tailwind
├── parlant_integration.py        # Python Parlant AI integration
├── parlant_chat.py              # Command-line chat interface
├── requirements.txt              # Python dependencies
├── package.json                  # Node.js dependencies
├── tailwind.config.js           # Tailwind CSS configuration
├── next.config.js               # Next.js configuration
└── README.md                    # This documentation
```

## 🎯 Key Components

### 1. PropertyChatWidget.tsx
The main chat interface featuring:
- Floating red chat button (realestate.com.au theme)
- Smooth animations and transitions
- Property card displays within chat
- Real-time message handling

### 2. parlant-chat.ts API
The core API endpoint that:
- Handles chat messages from frontend
- Integrates with Python Parlant backend
- Provides intelligent property filtering
- Manages error handling and fallbacks

### 3. parlant_integration.py
Python backend featuring:
- Real Parlant AI integration
- Property database with 8+ sample properties
- Smart filtering algorithms
- Context-aware responses

## 🧪 Testing

### Test the AI Integration
```bash
# Test Python integration directly
python3 parlant_chat.py --message "show me 3 bedroom houses under $1M" --user-id test

# Test API endpoint
curl -X POST http://localhost:3000/api/parlant-chat \
  -H "Content-Type: application/json" \
  -d '{"userId":"test","message":"what do you know about flink?"}'
```

### Test Scenarios
- **Property Questions**: "show me 2 bedroom apartments under $800k"
- **General Questions**: "what do you know about flink?"
- **Jokes**: "tell me a joke"
- **Greetings**: "hello"

## 🔧 Configuration

### Environment Variables
1. Copy the environment template:
   ```bash
   cp env.example .env
   ```

2. Edit `.env` with your credentials:
   ```bash
   OPENAI_API_KEY=your-openai-api-key
   OPENAI_BASE_URL=https://api.openai.com/v1  # Optional, defaults to OpenAI
   ```

### Customization
- **Property Data**: Edit `realEstateContext.properties` in `parlant-chat.ts`
- **AI Responses**: Modify `getAIResponse()` function
- **Styling**: Update Tailwind classes and custom CSS
- **Theme**: Change colors in `realEstateContext.theme`

## 🚀 Deployment

### Local Development
```bash
npm run dev  # Frontend
python3 parlant_integration.py  # Backend testing
```

### Production Considerations
- Set up proper environment variable management
- Configure secure API key storage
- Set up database for property data
- Implement proper error monitoring
- Add authentication if needed

## 🎨 UI/UX Features

### Design System
- **Primary Color**: #E31E24 (realestate.com.au red)
- **Secondary Color**: #FFFFFF (white)
- **Typography**: Inter font family
- **Animations**: Smooth transitions and hover effects

### Responsive Design
- Mobile-first approach
- Adaptive chat widget
- Flexible property cards
- Touch-friendly interactions

## 🤖 AI Capabilities

### Conversation Types
1. **Property Search**: Intelligent filtering based on criteria
2. **General Knowledge**: Handles non-property questions appropriately
3. **Jokes & Personality**: Engaging conversational experience
4. **Context Switching**: Smooth transitions between topics

### Filtering Logic
- **Budget**: Extracts and filters by price range
- **Bedrooms**: Matches exact bedroom count
- **Property Type**: Filters apartments, houses, townhouses
- **Location**: Matches by suburb, state, or city
- **Smart Fallbacks**: Shows alternatives when no exact matches

## 📊 Sample Data

The system includes 8+ sample properties across:
- **Melbourne CBD**: Luxury apartments with city views
- **Richmond**: Victorian townhouses with character
- **Bondi**: Beachfront houses with ocean views
- **South Yarra**: Modern apartments with park views
- **Brisbane CBD**: Contemporary city apartments
- **Collingwood**: Trendy warehouse conversions
- **Prahran**: Victorian houses with modern updates
- **Hawthorn**: Professional apartments with amenities

## 🔒 Security

### API Key Management
- Environment variables for sensitive data
- No hardcoded credentials in code
- Secure API endpoint configuration
- Proper error handling for missing keys

### Data Privacy
- Local property data (no external database)
- User session management
- Secure API communication
- No data persistence beyond session

## 🐛 Troubleshooting

### Common Issues

1. **Parlant Import Error**
   ```bash
   # Ensure virtual environment is activated
   source venv/bin/activate
   pip install parlant>=3.0.0
   ```

2. **API Key Issues**
   ```bash
   # Set environment variables
   export OPENAI_API_KEY="your-key"
   export OPENAI_BASE_URL="your-endpoint"
   ```

3. **Port Conflicts**
   ```bash
   # Kill existing processes
   pkill -f "next dev"
   npm run dev
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Parlant AI** for the intelligent conversation framework
- **realestate.com.au** for design inspiration
- **Next.js** and **React** for the frontend framework
- **Tailwind CSS** for styling utilities

## 📞 Support

For questions or issues:
- Create an issue in the GitHub repository
- Check the troubleshooting section
- Review the API documentation

---

**Built with ❤️ using Parlant AI and modern web technologies**