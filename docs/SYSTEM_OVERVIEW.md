# 🏗️ PropertyMatch Pro - System Overview

## Visual System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    PropertyMatch Pro System                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   👤 User       │    │  🌐 Frontend    │    │  🔌 Backend     │
│                 │    │                 │    │                 │
│ • Property      │◄──►│ • Next.js App   │◄──►│ • Python Agent  │
│   Seeker        │    │ • React UI      │    │ • Parlant SDK   │
│ • Chat Interface│    │ • Tailwind CSS  │    │ • AI Processing │
│ • Preferences   │    │ • TypeScript    │    │ • Property DB   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                        │
                                ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │  🧠 AI Engine   │    │  📊 Data Layer  │
                       │                 │    │                 │
                       │ • Parlant 3.0.2 │    │ • Mock Properties│
                       │ • OpenAI API    │    │ • Environment   │
                       │ • Custom Base   │    │ • Configuration │
                       │ • Multi-LLM     │    │ • API Keys      │
                       └─────────────────┘    └─────────────────┘
```

## Data Flow

```
User Input → Chat Widget → API Route → Python Agent → Parlant SDK → OpenAI API
     ↑                                                                      │
     │                                                                      ▼
Property Cards ← JSON Response ← Filtered Results ← AI Response ← LLM Output
```

## Component Hierarchy

```
PropertyMatch Pro
├── Frontend (Next.js)
│   ├── pages/
│   │   ├── index.tsx (Homepage)
│   │   ├── property/[id].tsx (Property Details)
│   │   └── api/parlant-chat.ts (Chat API)
│   ├── components/
│   │   └── PropertyChatWidget.tsx (Chat Interface)
│   └── styles/
│       └── globals.css (Tailwind + Custom)
├── Backend (Python)
│   └── agents/
│       ├── parlant_integration.py (Main Agent)
│       └── parlant_chat.py (CLI Interface)
└── Configuration
    ├── .env (API Keys)
    ├── package.json (Dependencies)
    └── requirements.txt (Python Deps)
```

## Technology Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                        Technology Stack                        │
├─────────────────────────────────────────────────────────────────┤
│ Frontend:     Next.js 14.2.32 + React 18 + TypeScript 5       │
│ Styling:      Tailwind CSS 3.4.1 + Custom Animations          │
│ Backend:      Python 3.13 + Parlant SDK 3.0.2                 │
│ AI Engine:    OpenAI API (GPT/Llama/Claude/Gemini/DeepSeek)    │
│ Development:  npm + Python venv + Git                          │
│ Deployment:   GitHub Repository + Local Development            │
└─────────────────────────────────────────────────────────────────┘
```

## Key Features

```
┌─────────────────────────────────────────────────────────────────┐
│                          Key Features                           │
├─────────────────────────────────────────────────────────────────┤
│ 🎯 AI-Powered Property Recommendations                         │
│ 💬 Natural Language Chat Interface                             │
│ 🔍 Advanced Property Filtering (Budget, Bedrooms, Type)       │
│ 🏠 Property Detail Pages with Galleries                        │
│ 🎨 Modern UI with Realestate.com.au Theming                   │
│ 🔐 Secure API Key Management                                   │
│ 📱 Responsive Design for All Devices                           │
└─────────────────────────────────────────────────────────────────┘
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Security Measures                          │
├─────────────────────────────────────────────────────────────────┤
│ 🔐 Environment Variables (.env file)                           │
│ 🚫 No Hardcoded API Keys in Source Code                        │
│ 📝 Git-ignored Sensitive Files                                 │
│ 🔒 Local Credential Management                                 │
│ 🛡️ Secure API Communication (HTTPS)                           │
└─────────────────────────────────────────────────────────────────┘
```

## Development Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Development Workflow                         │
├─────────────────────────────────────────────────────────────────┤
│ 1. Setup:     npm run setup-local (Configure API keys)         │
│ 2. Install:   npm run install-all (Install dependencies)       │
│ 3. Develop:   npm run dev (Start development server)           │
│ 4. Test:      Chat interface at http://localhost:3000          │
│ 5. Deploy:    git push origin main (Push to GitHub)            │
└─────────────────────────────────────────────────────────────────┘
```

---

*This system provides an intelligent, conversational property recommendation platform powered by advanced AI technology.*
