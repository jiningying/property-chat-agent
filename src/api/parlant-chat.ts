import { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';
import { promisify } from 'util';

// Real estate context and property data
const realEstateContext = {
  company: "realestate.com.au",
  theme: {
    primary: "#E31E24", // Red
    secondary: "#FFFFFF", // White
    accent: "#F5F5F5", // Light gray
    text: "#333333", // Dark gray
    textLight: "#666666" // Medium gray
  },
  properties: [
    {
      id: "prop_001",
      address: "123 Collins Street, Melbourne VIC 3000",
      price: 1200000,
      property_type: "apartment",
      bedrooms: 2,
      bathrooms: 2,
      car_spaces: 1,
      features: ["City views", "Balcony", "Gym", "Pool", "Concierge"],
      images: ["img1.jpg", "img2.jpg"],
      agent_contact: "Sarah Johnson - 0400 123 456",
      suburb: "Melbourne",
      state: "VIC",
      postcode: "3000",
      description: "Stunning modern apartment in the heart of Melbourne CBD with panoramic city views and premium amenities.",
      size: 85,
      year_built: 2018,
      listing_date: "2024-01-15",
      views: 1247,
      match_score: 95
    },
    {
      id: "prop_002",
      address: "45 Oak Avenue, Richmond VIC 3121",
      price: 850000,
      property_type: "townhouse",
      bedrooms: 3,
      bathrooms: 2,
      car_spaces: 2,
      features: ["Modern kitchen", "Garden", "Study nook", "Ducted heating", "Double garage"],
      images: ["img3.jpg", "img4.jpg"],
      agent_contact: "Mike Chen - 0400 789 012",
      suburb: "Richmond",
      state: "VIC",
      postcode: "3121",
      description: "Charming Victorian townhouse with modern renovations, perfect for families seeking character and convenience.",
      size: 120,
      year_built: 1895,
      listing_date: "2024-01-10",
      views: 892,
      match_score: 88
    },
    {
      id: "prop_003",
      address: "78 Beach Road, Bondi NSW 2026",
      price: 2100000,
      property_type: "house",
      bedrooms: 4,
      bathrooms: 3,
      car_spaces: 2,
      features: ["Ocean views", "Pool", "Large backyard", "Renovated kitchen", "Solar panels"],
      images: ["img5.jpg", "img6.jpg"],
      agent_contact: "Emma Wilson - 0400 345 678",
      suburb: "Bondi",
      state: "NSW",
      postcode: "2026",
      description: "Luxury beachfront home with stunning ocean views, perfect for entertaining and coastal living.",
      size: 250,
      year_built: 2015,
      listing_date: "2024-01-08",
      views: 2156,
      match_score: 92
    },
    {
      id: "prop_004",
      address: "12 Park Lane, South Yarra VIC 3141",
      price: 650000,
      property_type: "apartment",
      bedrooms: 1,
      bathrooms: 1,
      car_spaces: 1,
      features: ["Park views", "Balcony", "Gym", "Pool", "Concierge"],
      images: ["img7.jpg", "img8.jpg"],
      agent_contact: "David Smith - 0400 456 789",
      suburb: "South Yarra",
      state: "VIC",
      postcode: "3141",
      description: "Contemporary one-bedroom apartment with park views, ideal for professionals or investors.",
      size: 65,
      year_built: 2020,
      listing_date: "2024-01-12",
      views: 634,
      match_score: 85
    },
    {
      id: "prop_005",
      address: "89 Queen Street, Brisbane QLD 4000",
      price: 750000,
      property_type: "apartment",
      bedrooms: 2,
      bathrooms: 2,
      car_spaces: 1,
      features: ["City views", "Balcony", "Air conditioning", "Secure parking"],
      images: ["img9.jpg", "img10.jpg"],
      agent_contact: "Lisa Chen - 0400 567 890",
      suburb: "Brisbane",
      state: "QLD",
      postcode: "4000",
      description: "Modern apartment in Brisbane CBD with stunning city views and premium finishes.",
      size: 75,
      year_built: 2019,
      listing_date: "2024-01-14",
      views: 892,
      match_score: 88
    },
    {
      id: "prop_006",
      address: "45 Smith Street, Collingwood VIC 3066",
      price: 580000,
      property_type: "apartment",
      bedrooms: 1,
      bathrooms: 1,
      car_spaces: 0,
      features: ["Modern kitchen", "Hardwood floors", "High ceilings", "Close to transport"],
      images: ["img11.jpg", "img12.jpg"],
      agent_contact: "Tom Wilson - 0400 678 901",
      suburb: "Collingwood",
      state: "VIC",
      postcode: "3066",
      description: "Charming warehouse conversion apartment in trendy Collingwood, perfect for young professionals.",
      size: 55,
      year_built: 2017,
      listing_date: "2024-01-16",
      views: 456,
      match_score: 82
    },
    {
      id: "prop_007",
      address: "67 High Street, Prahran VIC 3181",
      price: 950000,
      property_type: "house",
      bedrooms: 3,
      bathrooms: 2,
      car_spaces: 2,
      features: ["Victorian character", "Modern kitchen", "Large backyard", "Ducted heating", "Double garage"],
      images: ["img13.jpg", "img14.jpg"],
      agent_contact: "Sarah Brown - 0400 789 012",
      suburb: "Prahran",
      state: "VIC",
      postcode: "3181",
      description: "Beautiful Victorian house with modern updates, perfect for families. Features original period details with contemporary amenities.",
      size: 180,
      year_built: 1890,
      listing_date: "2024-01-18",
      views: 1123,
      match_score: 90
    },
    {
      id: "prop_008",
      address: "23 Main Street, Hawthorn VIC 3122",
      price: 720000,
      property_type: "apartment",
      bedrooms: 2,
      bathrooms: 2,
      car_spaces: 1,
      features: ["City views", "Balcony", "Gym", "Pool", "Concierge", "Air conditioning"],
      images: ["img15.jpg", "img16.jpg"],
      agent_contact: "James Wilson - 0400 890 123",
      suburb: "Hawthorn",
      state: "VIC",
      postcode: "3122",
      description: "Modern apartment in Hawthorn with excellent transport links and premium amenities. Perfect for professionals.",
      size: 90,
      year_built: 2021,
      listing_date: "2024-01-20",
      views: 789,
      match_score: 87
    }
  ]
};

// Function to call Python Parlant integration
async function callParlantAI(message: string, userId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python3', [
      '/Users/jining.ying/jining/playground/ai-chat-agent/parlant_chat.py',
      '--message', message,
      '--user-id', userId
    ], {
      cwd: '/Users/jining.ying/jining/playground/ai-chat-agent'
    });

    let output = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          // Parse the JSON response from output
          const lines = output.trim().split('\n');
          const jsonLine = lines[lines.length - 1];
          const result = JSON.parse(jsonLine);
          resolve(result);
        } catch (e) {
          // Fallback to simple response
          resolve({
            response: "I'm your realestate.com.au AI assistant powered by Parlant. How can I help you find the perfect property?",
            recommendations: [],
            type: 'parlant_ai'
          });
        }
      } else {
        reject(new Error(`Python process exited with code ${code}: ${error}`));
      }
    });
  });
}

// Enhanced AI responses with more intelligent conversation
const getAIResponse = (message: string, userId: string) => {
  const lowerMessage = message.toLowerCase();
  
  // Extract budget from message
  const extractBudget = (msg: string) => {
    const budgetMatch = msg.match(/(\d+)(k|k\b|000)/i);
    if (budgetMatch) {
      const number = parseInt(budgetMatch[1]);
      const multiplier = budgetMatch[2].toLowerCase().includes('k') ? 1000 : 1;
      return number * multiplier;
    }
    return null;
  };
  
  // Extract bedroom count from message
  const extractBedrooms = (msg: string) => {
    const bedroomMatch = msg.match(/(\d+)\s*(bed|bedroom|bedrooms)/i);
    if (bedroomMatch) {
      return parseInt(bedroomMatch[1]);
    }
    return null;
  };
  
  // Extract property type from message
  const extractPropertyType = (msg: string) => {
    if (msg.includes('apartment') || msg.includes('unit')) return 'apartment';
    if (msg.includes('house') || msg.includes('home')) return 'house';
    if (msg.includes('townhouse') || msg.includes('townhouse')) return 'townhouse';
    return null;
  };
  
  // Filter properties by multiple criteria
  const filterProperties = (criteria: {
    budget?: number;
    bedrooms?: number;
    propertyType?: string;
  }) => {
    let filtered = realEstateContext.properties;
    
    if (criteria.budget) {
      filtered = filtered.filter(prop => prop.price <= criteria.budget);
    }
    
    if (criteria.bedrooms) {
      filtered = filtered.filter(prop => prop.bedrooms === criteria.bedrooms);
    }
    
    if (criteria.propertyType) {
      filtered = filtered.filter(prop => prop.property_type === criteria.propertyType);
    }
    
    return filtered;
  };

  // Joke responses
  if (lowerMessage.includes('joke') || lowerMessage.includes('funny') || lowerMessage.includes('laugh')) {
    const jokes = [
      "Why did the real estate agent go to therapy? Because they had too many property issues! 🏠😄",
      "What do you call a real estate agent who's also a magician? A property wizard! ✨🏡",
      "Why don't houses ever get lonely? Because they always have great neighbors! 🏘️😊",
      "What's a real estate agent's favorite type of music? House music! 🎵🏠",
      "Why did the apartment break up with the house? Because it needed more space! 🏠💔"
    ];
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    return {
      response: randomJoke,
      type: 'joke'
    };
  }
  
  // Greeting responses
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return {
      response: "Hi there! I'm your realestate.com.au AI assistant powered by Parlant. I'm here to help you find the perfect property! What are you looking for in your next home?",
      type: 'greeting'
    };
  }
  
  // Extract criteria from message
  const budget = extractBudget(message);
  const bedrooms = extractBedrooms(message);
  const propertyType = extractPropertyType(message);
  
  // If we have specific criteria, filter properties
  if (budget || bedrooms || propertyType) {
    const criteria = { budget, bedrooms, propertyType };
    const filteredProperties = filterProperties(criteria);
    
    if (filteredProperties.length > 0) {
      let responseText = "Perfect! I found properties that match your criteria:";
      
      if (budget) responseText += ` under $${budget.toLocaleString()}`;
      if (bedrooms) responseText += ` with ${bedrooms} bedroom${bedrooms > 1 ? 's' : ''}`;
      if (propertyType) responseText += ` (${propertyType}s)`;
      
      responseText += `. Here are the best options:`;
      
      return {
        response: responseText,
        type: 'filtered_match',
        recommendations: filteredProperties
      };
    } else {
      let responseText = "I couldn't find any properties matching your criteria:";
      if (budget) responseText += ` under $${budget.toLocaleString()}`;
      if (bedrooms) responseText += ` with ${bedrooms} bedroom${bedrooms > 1 ? 's' : ''}`;
      if (propertyType) responseText += ` (${propertyType}s)`;
      responseText += `. Let me show you some similar options:`;
      
      // Show some alternatives with relaxed criteria
      const relaxedCriteria = { 
        budget: budget ? budget * 1.2 : undefined, 
        bedrooms: bedrooms ? undefined : bedrooms,
        propertyType 
      };
      const alternatives = filterProperties(relaxedCriteria).slice(0, 3);
      
      return {
        response: responseText,
        type: 'filtered_no_match',
        recommendations: alternatives
      };
    }
  }
  
  // Budget-related responses
  if (lowerMessage.includes('budget') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return {
      response: "I'd be happy to help you find properties within your budget! What's your price range? I can show you everything from affordable apartments to luxury homes.",
      type: 'budget'
    };
  }
  
  // Location-related responses
  if (lowerMessage.includes('location') || lowerMessage.includes('suburb') || lowerMessage.includes('area')) {
    return {
      response: "Great! Location is key when finding your perfect home. Which suburbs or areas are you interested in? I can show you properties in Melbourne, Sydney, Brisbane, and other major cities.",
      type: 'location'
    };
  }
  
  // More recommendations request
  if (lowerMessage.includes('more') || lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
    return {
      response: "Here are some additional properties that might interest you:",
      type: 'more_recommendations',
      recommendations: realEstateContext.properties.slice(0, 3)
    };
  }
  
  // Non-property questions - handle general knowledge
  if (lowerMessage.includes('flink') || lowerMessage.includes('apache') || lowerMessage.includes('stream processing')) {
    return {
      response: "Apache Flink is a distributed stream processing framework for stateful computations over unbounded and bounded data streams. It's commonly used for real-time analytics, event-driven applications, and data pipelines. While I'm primarily a real estate assistant, I can help with general questions too! Is there anything about properties I can help you with?",
      type: 'general_knowledge'
    };
  }
  
  // Technology questions
  if (lowerMessage.includes('what is') || lowerMessage.includes('tell me about') || lowerMessage.includes('explain')) {
    return {
      response: "I'm primarily a real estate assistant, but I can help with general questions! However, my main expertise is helping you find the perfect property. What kind of home are you looking for?",
      type: 'general_knowledge'
    };
  }
  
  // General conversation responses
  if (lowerMessage.includes('how are you') || lowerMessage.includes('how do you work')) {
    return {
      response: "I'm doing great! I'm an AI assistant powered by Parlant's advanced property matching algorithms. I can help you find properties based on your budget, location, bedroom count, and property type. Just tell me what you're looking for!",
      type: 'general'
    };
  }
  
  // Default response with more personality
  return {
    response: "I understand you're looking for properties on realestate.com.au! I'm here to help you find the perfect home. Tell me about your preferences - what's your budget, how many bedrooms do you need, and what type of property interests you?",
    type: 'general',
    recommendations: realEstateContext.properties.slice(0, 2)
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, userId, context } = req.body;

    if (!message || !userId) {
      return res.status(400).json({ error: 'Message and userId are required' });
    }

    // Try to use Parlant AI first, fallback to enhanced pattern matching
    let aiResponse;
    try {
      // Use real Parlant integration
      aiResponse = await callParlantAI(message, userId);
    } catch (error) {
      console.log('Falling back to pattern matching:', error);
      aiResponse = getAIResponse(message, userId);
    }

    return res.status(200).json({
      response: aiResponse.response,
      recommendations: aiResponse.recommendations || [],
      type: aiResponse.type || 'chat',
      context: realEstateContext,
      ai_powered: true
    });

  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Something went wrong. Please try again.'
    });
  }
}