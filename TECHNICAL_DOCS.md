# PropertyMatch Pro - Technical Documentation

## 🏗️ System Architecture

### High-Level Overview
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway    │    │   AI Backend    │
│   (Next.js)     │◄──►│   (parlant-chat) │◄──►│   (Parlant)     │
│                 │    │                  │    │                 │
│ • Chat Widget   │    │ • Request Router │    │ • AI Processing │
│ • Property UI   │    │ • Error Handling │    │ • Property DB   │
│ • State Mgmt    │    │ • Response Format│    │ • Filtering     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Component Architecture

#### Frontend Layer (Next.js + React)
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom theme
- **State Management**: React hooks and local state
- **API Integration**: Fetch API with error handling

#### API Layer (Next.js API Routes)
- **Endpoint**: `/api/parlant-chat`
- **Method**: POST
- **Authentication**: None (demo purposes)
- **Rate Limiting**: None (demo purposes)

#### AI Layer (Python + Parlant)
- **AI Engine**: Parlant SDK 3.0.2
- **Language Model**: OpenAI GPT (via custom endpoint)
- **Processing**: Async Python with asyncio
- **Data Storage**: In-memory property database

## 🔧 Technical Implementation

### 1. Frontend Implementation

#### PropertyChatWidget.tsx
```typescript
// Key features:
- Floating chat button with realestate.com.au theme
- Smooth animations using CSS transitions
- Real-time message handling
- Property card rendering within chat
- Responsive design for mobile/desktop
```

#### State Management
```typescript
// Chat state
const [messages, setMessages] = useState<Message[]>([]);
const [isOpen, setIsOpen] = useState(false);
const [isLoading, setIsLoading] = useState(false);

// Property state
const [recommendations, setRecommendations] = useState<Property[]>([]);
```

### 2. API Implementation

#### parlant-chat.ts
```typescript
// Core functionality:
- Message validation and sanitization
- Python process spawning for AI integration
- JSON response formatting
- Error handling and fallbacks
- CORS configuration
```

#### Request/Response Flow
```typescript
// Request format
{
  "userId": "string",
  "message": "string",
  "context": "object" // optional
}

// Response format
{
  "response": "string",
  "recommendations": "Property[]",
  "type": "string",
  "context": "object",
  "ai_powered": "boolean"
}
```

### 3. AI Backend Implementation

#### parlant_integration.py
```python
# Core classes:
- PropertyParlantAgent: Main AI agent class
- Property database with 8+ sample properties
- Smart filtering algorithms
- Context-aware response generation
```

#### AI Processing Pipeline
```python
1. Message Reception
2. Criteria Extraction (budget, bedrooms, type, location)
3. Property Filtering
4. AI Response Generation
5. Response Formatting
6. JSON Output
```

## 🗄️ Data Models

### Property Schema
```typescript
interface Property {
  id: string;
  address: string;
  price: number;
  property_type: 'apartment' | 'house' | 'townhouse';
  bedrooms: number;
  bathrooms: number;
  car_spaces: number;
  features: string[];
  images: string[];
  agent_contact: string;
  suburb: string;
  state: string;
  postcode: string;
  description: string;
  size: number; // m²
  year_built: number;
  listing_date: string;
  views: number;
  match_score: number; // 0-100
}
```

### Message Schema
```typescript
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type: 'text' | 'property' | 'error';
  recommendations?: Property[];
}
```

### AI Response Schema
```typescript
interface AIResponse {
  response: string;
  recommendations: Property[];
  type: 'greeting' | 'property' | 'joke' | 'general' | 'error';
  criteria?: {
    budget?: number;
    bedrooms?: number;
    property_type?: string;
    location?: string;
  };
}
```

## 🔍 AI Processing Logic

### 1. Message Classification
```python
# Message types detected:
- Greeting: "hello", "hi", "hey"
- Property search: Contains budget, bedrooms, property type
- General knowledge: "what is", "tell me about"
- Jokes: "joke", "funny", "laugh"
- Default: Fallback to property assistance
```

### 2. Criteria Extraction
```python
# Budget extraction
r'(\d+)(k|k\b|000)'  # Matches "800k", "$800k", "800000"

# Bedroom extraction  
r'(\d+)\s*(bed|bedroom|bedrooms)'  # Matches "3 bed", "2 bedrooms"

# Property type extraction
- "apartment" or "unit" → apartment
- "house" or "home" → house  
- "townhouse" → townhouse

# Location extraction
- Melbourne, Sydney, Brisbane, Perth, Adelaide
```

### 3. Property Filtering Algorithm
```python
def filter_properties(criteria):
    filtered = all_properties.copy()
    
    # Apply filters in sequence
    if criteria.budget:
        filtered = [p for p in filtered if p.price <= criteria.budget]
    
    if criteria.bedrooms:
        filtered = [p for p in filtered if p.bedrooms == criteria.bedrooms]
    
    if criteria.property_type:
        filtered = [p for p in filtered if p.property_type == criteria.property_type]
    
    if criteria.location:
        filtered = [p for p in filtered if location_match(p, criteria.location)]
    
    # Smart fallbacks if no matches
    if not filtered and criteria:
        return get_alternative_properties(criteria)
    
    return filtered[:5]  # Top 5 matches
```

## 🎨 UI/UX Implementation

### Design System
```css
/* Color Palette */
:root {
  --primary: #E31E24;      /* realestate.com.au red */
  --secondary: #FFFFFF;    /* white */
  --accent: #F5F5F5;       /* light gray */
  --text: #333333;         /* dark gray */
  --text-light: #666666;   /* medium gray */
}

/* Typography */
font-family: 'Inter', system-ui, sans-serif;
```

### Component Styling
```css
/* Chat Widget */
.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  transition: all 0.3s ease;
}

/* Property Cards */
.property-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.property-card:hover {
  transform: translateY(-2px);
}
```

### Responsive Design
```css
/* Mobile-first approach */
@media (max-width: 768px) {
  .chat-widget {
    bottom: 10px;
    right: 10px;
  }
  
  .property-card {
    margin: 8px;
  }
}
```

## 🔒 Security Implementation

### API Security
```typescript
// Input validation
if (!message || !userId) {
  return res.status(400).json({ error: 'Message and userId are required' });
}

// Sanitization
const sanitizedMessage = message.trim().substring(0, 1000);

// Error handling
try {
  const response = await processMessage(sanitizedMessage, userId);
  return res.status(200).json(response);
} catch (error) {
  console.error('API error:', error);
  return res.status(500).json({ error: 'Internal server error' });
}
```

### Environment Security
```bash
# Environment variables (never commit to git)
OPENAI_API_KEY=sk-...
OPENAI_BASE_URL=https://api.openai.com/v1

# .gitignore
.env
.env.local
.env.production
```

## 🚀 Performance Optimization

### Frontend Optimizations
```typescript
// React optimizations
const PropertyCard = React.memo(({ property }) => {
  // Memoized component to prevent unnecessary re-renders
});

// Lazy loading
const PropertyChatWidget = React.lazy(() => import('./PropertyChatWidget'));

// Debounced search
const debouncedSearch = useDebounce(searchTerm, 300);
```

### Backend Optimizations
```python
# Async processing
async def process_message(message: str, user_id: str):
    # Non-blocking AI processing
    response = await ai_agent.chat(message, user_id)
    return response

# Caching (future enhancement)
@lru_cache(maxsize=100)
def get_property_recommendations(criteria_hash: str):
    # Cache property recommendations
    pass
```

## 🧪 Testing Strategy

### Unit Tests
```python
# Test criteria extraction
def test_extract_budget():
    assert extract_budget("800k") == 800000
    assert extract_budget("$800k") == 800000
    assert extract_budget("800000") == 800000

# Test property filtering
def test_filter_by_budget():
    properties = filter_properties({"budget": 1000000})
    assert all(p.price <= 1000000 for p in properties)
```

### Integration Tests
```typescript
// Test API endpoints
describe('/api/parlant-chat', () => {
  it('should handle property search requests', async () => {
    const response = await request(app)
      .post('/api/parlant-chat')
      .send({ userId: 'test', message: 'show me apartments' });
    
    expect(response.status).toBe(200);
    expect(response.body.recommendations).toBeDefined();
  });
});
```

### End-to-End Tests
```typescript
// Test complete user flow
describe('Property Search Flow', () => {
  it('should search and display properties', async () => {
    // 1. Open chat widget
    // 2. Send property search message
    // 3. Verify property cards are displayed
    // 4. Test property interaction
  });
});
```

## 📊 Monitoring & Analytics

### Error Tracking
```typescript
// API error logging
console.error('API error:', {
  error: error.message,
  userId,
  message: sanitizedMessage,
  timestamp: new Date().toISOString()
});
```

### Performance Metrics
```typescript
// Response time tracking
const startTime = Date.now();
const response = await processMessage(message, userId);
const responseTime = Date.now() - startTime;

console.log('Response time:', responseTime, 'ms');
```

## 🔄 Deployment Pipeline

### Development
```bash
# Local development
npm run dev
python3 parlant_integration.py
```

### Staging
```bash
# Build and test
npm run build
npm run test
python3 -m pytest tests/
```

### Production
```bash
# Deploy to production
npm run build
pm2 start ecosystem.config.js
```

## 🛠️ Development Workflow

### Git Workflow
```bash
# Feature development
git checkout -b feature/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
# Create pull request
```

### Code Quality
```bash
# Linting
npm run lint
python3 -m flake8 .

# Type checking
npm run type-check
python3 -m mypy .

# Testing
npm run test
python3 -m pytest
```

## 📈 Future Enhancements

### Planned Features
1. **User Authentication**: JWT-based auth system
2. **Property Database**: Real database integration
3. **Image Upload**: Property image management
4. **Advanced Filtering**: More sophisticated search criteria
5. **Analytics Dashboard**: Usage and performance metrics
6. **Mobile App**: React Native implementation
7. **Real-time Updates**: WebSocket integration
8. **Multi-language**: Internationalization support

### Technical Improvements
1. **Caching Layer**: Redis for performance
2. **Database**: PostgreSQL for property data
3. **CDN**: CloudFront for static assets
4. **Monitoring**: DataDog or New Relic integration
5. **CI/CD**: GitHub Actions pipeline
6. **Containerization**: Docker deployment
7. **Load Balancing**: Multiple instance support
8. **Security**: OAuth2 and rate limiting

---

**This technical documentation provides a comprehensive overview of the PropertyMatch Pro system architecture, implementation details, and future roadmap.**
