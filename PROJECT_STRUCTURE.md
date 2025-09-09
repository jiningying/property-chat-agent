# 📁 Project Structure

## 🏗️ Repository Organization

```
property-chat-agent/
├── 📁 src/                          # Frontend source code
│   ├── 📁 components/               # React components
│   │   └── PropertyChatWidget.tsx   # Main chat widget
│   ├── 📁 pages/                    # Next.js pages
│   │   ├── index.tsx               # Home page
│   │   ├── _app.tsx                # App wrapper
│   │   ├── _document.tsx           # Document wrapper
│   │   └── property/[id].tsx       # Property detail page
│   ├── 📁 api/                      # API routes
│   │   └── parlant-chat.ts         # Chat API endpoint
│   ├── 📁 lib/                      # Utility libraries
│   └── 📁 types/                    # TypeScript type definitions
├── 📁 backend/                      # Python backend
│   ├── 📁 agents/                   # AI agents
│   │   ├── parlant_integration.py  # Main Parlant integration
│   │   ├── parlant_chat.py         # Chat interface
│   │   └── property_agent_example.py # Example agent
│   ├── 📁 utils/                    # Backend utilities
│   ├── 📁 data/                     # Data files
│   └── requirements.txt             # Python dependencies
├── 📁 docs/                         # Documentation
│   ├── 📁 deployment/               # Deployment guides
│   │   └── DEPLOYMENT.md           # Deployment instructions
│   ├── 📁 api/                      # API documentation
│   ├── 📁 examples/                 # Example code
│   │   ├── demo_usage.py           # Usage examples
│   │   ├── simple_demo.py          # Simple demo
│   │   └── parlant_demo.py         # Parlant demo
│   ├── TECHNICAL_DOCS.md           # Technical documentation
│   ├── PROJECT_SUMMARY.md          # Project overview
│   └── quick_start.md              # Quick start guide
├── 📁 scripts/                      # Automation scripts
│   ├── 📁 setup/                    # Setup scripts
│   │   ├── setup.sh                # Main setup script
│   │   ├── setup-local.sh          # Local setup
│   │   └── github-setup.sh         # GitHub setup
│   ├── 📁 deployment/               # Deployment scripts
│   └── 📁 development/              # Development scripts
│       ├── run_automated.sh        # Automated demo
│       └── start.sh                # Start script
├── 📄 Configuration Files
│   ├── package.json                # Node.js dependencies
│   ├── next.config.js              # Next.js configuration
│   ├── tailwind.config.js          # Tailwind CSS config
│   ├── tsconfig.json               # TypeScript config
│   ├── .gitignore                  # Git ignore rules
│   ├── env.example                 # Environment template
│   └── README.md                   # Main documentation
└── 📄 Runtime Files
    ├── .env                        # Environment variables (local)
    ├── node_modules/               # Node.js dependencies
    ├── venv/                       # Python virtual environment
    └── .next/                      # Next.js build output
```

## 🎯 Key Directories

### `src/` - Frontend Source
- **components/**: Reusable React components
- **pages/**: Next.js page components
- **api/**: API route handlers
- **lib/**: Utility functions and helpers
- **types/**: TypeScript type definitions

### `backend/` - Python Backend
- **agents/**: AI agent implementations
- **utils/**: Backend utility functions
- **data/**: Data files and configurations

### `docs/` - Documentation
- **deployment/**: Deployment guides and instructions
- **api/**: API documentation and examples
- **examples/**: Code examples and demos

### `scripts/` - Automation
- **setup/**: Installation and setup scripts
- **deployment/**: Deployment automation
- **development/**: Development workflow scripts

## 🚀 Quick Start

```bash
# Setup
npm run setup

# Development
npm run dev

# Backend only
npm run backend

# Frontend only
npm run frontend
```

## 📝 File Naming Conventions

- **Components**: PascalCase (e.g., `PropertyChatWidget.tsx`)
- **Pages**: kebab-case (e.g., `property-detail.tsx`)
- **Scripts**: kebab-case (e.g., `setup-local.sh`)
- **Python**: snake_case (e.g., `parlant_integration.py`)
- **Config**: kebab-case (e.g., `tailwind.config.js`)
