"""
Parlant Property Personalization Agent Example
==============================================

This example demonstrates how Parlant can be used to create a sophisticated
property personalization agent for a real estate website like realestate.com.au.

The agent provides:
- Adaptive property recommendations based on user preferences
- Iterative conversation refinement
- Explainable decision-making for property suggestions
- Compliance with real estate regulations
- Multi-modal property search and filtering
"""

import parlant.sdk as p
import asyncio
import json
from typing import Dict, List, Optional, Any
from datetime import datetime, timedelta
from dataclasses import dataclass
from enum import Enum

class PropertyType(Enum):
    HOUSE = "house"
    APARTMENT = "apartment"
    TOWNHOUSE = "townhouse"
    LAND = "land"
    COMMERCIAL = "commercial"

class UserType(Enum):
    FIRST_TIME_BUYER = "first_time_buyer"
    INVESTOR = "investor"
    UPGRADER = "upgrader"
    DOWNSIZER = "downsizer"
    RENTER = "renter"

@dataclass
class Property:
    id: str
    address: str
    price: int
    property_type: PropertyType
    bedrooms: int
    bathrooms: int
    car_spaces: int
    land_size: Optional[float]
    features: List[str]
    images: List[str]
    agent_contact: str
    listing_date: datetime
    suburb: str
    state: str
    postcode: str

@dataclass
class UserProfile:
    user_id: str
    name: str
    user_type: UserType
    budget_min: int
    budget_max: int
    preferred_suburbs: List[str]
    property_types: List[PropertyType]
    must_have_features: List[str]
    nice_to_have_features: List[str]
    deal_breakers: List[str]
    search_history: List[str]
    saved_properties: List[str]
    last_interaction: datetime

class PropertyPersonalizationAgent:
    """
    A sophisticated property personalization agent built with Parlant
    that adapts to user preferences and provides explainable recommendations.
    """
    
    def __init__(self):
        self.server = None
        self.agent = None
        self.user_profiles: Dict[str, UserProfile] = {}
        self.properties: List[Property] = []
        self.conversation_context: Dict[str, Any] = {}
        
    async def initialize(self):
        """Initialize the Parlant server and create the property agent"""
        # Set environment variables for Parlant
        import os
        # Load from environment variables
        if not os.getenv("OPENAI_API_KEY"):
            raise ValueError("OPENAI_API_KEY environment variable is required")
        if not os.getenv("OPENAI_BASE_URL"):
            raise ValueError("OPENAI_BASE_URL environment variable is required")
        
        self.server = p.Server()
        await self.server.__aenter__()
        
        # Create the property agent with specific personality and guidelines
        self.agent = await self.server.create_agent(
            name="PropertyMatch Pro",
            description="""A sophisticated property personalization agent specializing in 
            Australian real estate. Professional, empathetic, and data-driven. 
            Understands the emotional and financial significance of property decisions.
            Provides clear explanations for recommendations and respects user privacy.""",
        )
        
        # Set up agent guidelines for property recommendations
        # await self._setup_agent_guidelines()  # Temporarily disabled for demo
        
        # Load sample property data
        await self._load_sample_data()
        
    async def _setup_agent_guidelines(self):
        """Configure the agent with property-specific guidelines and principles"""
        
        guidelines = [
            {
                "name": "property_recommendation_principles",
                "content": """
                When recommending properties:
                1. Always consider the user's budget constraints and financial situation
                2. Prioritize properties that match must-have features over nice-to-haves
                3. Explain why each property is recommended based on user preferences
                4. Consider commute times, school zones, and lifestyle factors
                5. Be transparent about property limitations or potential concerns
                6. Respect user privacy and never share personal information
                7. Provide clear next steps for viewing or making offers
                """
            },
            {
                "name": "conversation_flow_principles",
                "content": """
                Conversation guidelines:
                1. Start by understanding the user's property goals and constraints
                2. Ask clarifying questions to refine preferences iteratively
                3. Provide multiple property options with clear comparisons
                4. Explain market trends and pricing context when relevant
                5. Offer to save properties and set up alerts
                6. Be patient with first-time buyers and explain real estate terminology
                7. Adapt communication style to user type (investor vs first-time buyer)
                """
            },
            {
                "name": "compliance_and_safety",
                "content": """
                Compliance requirements:
                1. Always recommend professional inspections and legal advice
                2. Disclose any known issues with properties
                3. Provide accurate pricing information and market data
                4. Respect fair housing laws and anti-discrimination policies
                5. Encourage users to verify information independently
                6. Provide clear disclaimers about market volatility
                """
            }
        ]
        
        for guideline in guidelines:
            await self.agent.create_guideline(
                content=guideline["content"]
            )
    
    async def _load_sample_data(self):
        """Load sample property data for demonstration"""
        sample_properties = [
            Property(
                id="prop_001",
                address="123 Collins Street, Melbourne VIC 3000",
                price=1200000,
                property_type=PropertyType.APARTMENT,
                bedrooms=2,
                bathrooms=2,
                car_spaces=1,
                land_size=None,
                features=["City views", "Balcony", "Gym", "Pool", "Concierge"],
                images=["img1.jpg", "img2.jpg"],
                agent_contact="Sarah Johnson - 0400 123 456",
                listing_date=datetime.now() - timedelta(days=5),
                suburb="Melbourne",
                state="VIC",
                postcode="3000"
            ),
            Property(
                id="prop_002",
                address="45 Oak Avenue, Richmond VIC 3121",
                price=850000,
                property_type=PropertyType.TOWNHOUSE,
                bedrooms=3,
                bathrooms=2,
                car_spaces=2,
                land_size=300.0,
                features=["Modern kitchen", "Garden", "Study nook", "Ducted heating"],
                images=["img3.jpg", "img4.jpg"],
                agent_contact="Mike Chen - 0400 789 012",
                listing_date=datetime.now() - timedelta(days=12),
                suburb="Richmond",
                state="VIC",
                postcode="3121"
            ),
            Property(
                id="prop_003",
                address="78 Beach Road, Bondi NSW 2026",
                price=2100000,
                property_type=PropertyType.HOUSE,
                bedrooms=4,
                bathrooms=3,
                car_spaces=2,
                land_size=600.0,
                features=["Ocean views", "Pool", "Large backyard", "Renovated kitchen"],
                images=["img5.jpg", "img6.jpg"],
                agent_contact="Emma Wilson - 0400 345 678",
                listing_date=datetime.now() - timedelta(days=3),
                suburb="Bondi",
                state="NSW",
                postcode="2026"
            )
        ]
        
        self.properties = sample_properties
    
    async def start_conversation(self, user_id: str, initial_message: str = None) -> str:
        """Start a conversation with the property agent"""
        
        # Load or create user profile
        if user_id not in self.user_profiles:
            await self._create_user_profile(user_id)
        
        user_profile = self.user_profiles[user_id]
        
        # Set conversation context
        self.conversation_context[user_id] = {
            "user_profile": user_profile,
            "current_search_criteria": {},
            "recommended_properties": [],
            "conversation_history": []
        }
        
        # Generate initial greeting and property recommendations
        if initial_message:
            response = await self.agent.chat(
                message=initial_message,
                context={
                    "user_profile": user_profile.__dict__,
                    "available_properties": [p.__dict__ for p in self.properties],
                    "conversation_context": self.conversation_context[user_id]
                }
            )
        else:
            greeting = f"""
            Hi {user_profile.name}! I'm PropertyMatch Pro, your personal property assistant.
            
            I can help you find the perfect property based on your preferences. 
            I see you're looking for {', '.join([pt.value for pt in user_profile.property_types])} 
            properties in the {user_profile.budget_min:,} - {user_profile.budget_max:,} range.
            
            What specific features are most important to you in your next property?
            """
            
            response = await self.agent.chat(
                message=greeting,
                context={
                    "user_profile": user_profile.__dict__,
                    "available_properties": [p.__dict__ for p in self.properties],
                    "conversation_context": self.conversation_context[user_id]
                }
            )
        
        return response
    
    async def _create_user_profile(self, user_id: str) -> UserProfile:
        """Create a new user profile with default preferences"""
        profile = UserProfile(
            user_id=user_id,
            name="Property Seeker",
            user_type=UserType.FIRST_TIME_BUYER,
            budget_min=500000,
            budget_max=1000000,
            preferred_suburbs=["Melbourne", "Richmond", "Fitzroy"],
            property_types=[PropertyType.APARTMENT, PropertyType.TOWNHOUSE],
            must_have_features=["Parking", "Modern kitchen"],
            nice_to_have_features=["Balcony", "Gym", "Pool"],
            deal_breakers=["Main road", "No parking"],
            search_history=[],
            saved_properties=[],
            last_interaction=datetime.now()
        )
        
        self.user_profiles[user_id] = profile
        return profile
    
    async def get_personalized_recommendations(self, user_id: str, search_criteria: Dict[str, Any] = None) -> List[Property]:
        """Get personalized property recommendations based on user profile and search criteria"""
        
        if user_id not in self.conversation_context:
            await self.start_conversation(user_id)
        
        user_profile = self.user_profiles[user_id]
        context = self.conversation_context[user_id]
        
        # Update search criteria
        if search_criteria:
            context["current_search_criteria"].update(search_criteria)
        
        # Filter properties based on user preferences
        recommendations = []
        
        for property in self.properties:
            score = self._calculate_property_score(property, user_profile, context["current_search_criteria"])
            if score > 0.6:  # Threshold for recommendations
                recommendations.append((property, score))
        
        # Sort by score and return top recommendations
        recommendations.sort(key=lambda x: x[1], reverse=True)
        recommended_properties = [prop for prop, score in recommendations[:5]]
        
        # Update context
        context["recommended_properties"] = recommended_properties
        
        return recommended_properties
    
    def _calculate_property_score(self, property: Property, user_profile: UserProfile, search_criteria: Dict[str, Any]) -> float:
        """Calculate a personalized score for a property based on user preferences"""
        score = 0.0
        max_score = 0.0
        
        # Budget match (40% weight)
        budget_weight = 0.4
        if user_profile.budget_min <= property.price <= user_profile.budget_max:
            score += budget_weight
        elif property.price < user_profile.budget_min:
            score += budget_weight * 0.8  # Slightly lower for under-budget
        else:
            score += budget_weight * max(0, 1 - (property.price - user_profile.budget_max) / user_profile.budget_max)
        max_score += budget_weight
        
        # Property type match (20% weight)
        type_weight = 0.2
        if property.property_type in user_profile.property_types:
            score += type_weight
        max_score += type_weight
        
        # Suburb preference (15% weight)
        suburb_weight = 0.15
        if property.suburb in user_profile.preferred_suburbs:
            score += suburb_weight
        max_score += suburb_weight
        
        # Feature matching (25% weight)
        feature_weight = 0.25
        must_have_matches = sum(1 for feature in user_profile.must_have_features if feature.lower() in [f.lower() for f in property.features])
        nice_to_have_matches = sum(1 for feature in user_profile.nice_to_have_features if feature.lower() in [f.lower() for f in property.features])
        
        if user_profile.must_have_features:
            must_have_score = must_have_matches / len(user_profile.must_have_features)
            score += feature_weight * 0.7 * must_have_score
        
        if user_profile.nice_to_have_features:
            nice_to_have_score = nice_to_have_matches / len(user_profile.nice_to_have_features)
            score += feature_weight * 0.3 * nice_to_have_score
        
        max_score += feature_weight
        
        return score / max_score if max_score > 0 else 0
    
    async def explain_recommendation(self, user_id: str, property_id: str) -> str:
        """Provide an explainable explanation for why a property was recommended"""
        
        if user_id not in self.conversation_context:
            return "Please start a conversation first to get property recommendations."
        
        user_profile = self.user_profiles[user_id]
        context = self.conversation_context[user_id]
        
        # Find the property
        property = next((p for p in self.properties if p.id == property_id), None)
        if not property:
            return "Property not found."
        
        # Calculate detailed score breakdown
        score_breakdown = self._get_detailed_score_breakdown(property, user_profile, context["current_search_criteria"])
        
        explanation = f"""
        Here's why I recommended {property.address}:
        
        **Budget Match**: {score_breakdown['budget_explanation']}
        **Property Type**: {score_breakdown['type_explanation']}
        **Location**: {score_breakdown['location_explanation']}
        **Features**: {score_breakdown['features_explanation']}
        
        **Overall Score**: {score_breakdown['overall_score']:.1%}
        
        This property particularly stands out because:
        {score_breakdown['key_highlights']}
        
        Would you like me to arrange a viewing or provide more details about any specific aspect?
        """
        
        return explanation
    
    def _get_detailed_score_breakdown(self, property: Property, user_profile: UserProfile, search_criteria: Dict[str, Any]) -> Dict[str, str]:
        """Get detailed explanation of property scoring"""
        
        # Budget explanation
        if user_profile.budget_min <= property.price <= user_profile.budget_max:
            budget_explanation = f"Perfect fit within your ${user_profile.budget_min:,} - ${user_profile.budget_max:,} budget"
        elif property.price < user_profile.budget_min:
            budget_explanation = f"Under your budget at ${property.price:,} (saving you ${user_profile.budget_min - property.price:,})"
        else:
            budget_explanation = f"Above your budget by ${property.price - user_profile.budget_max:,}"
        
        # Type explanation
        if property.property_type in user_profile.property_types:
            type_explanation = f"Matches your preferred {property.property_type.value} type"
        else:
            type_explanation = f"Different from your preferred types ({', '.join([pt.value for pt in user_profile.property_types])})"
        
        # Location explanation
        if property.suburb in user_profile.preferred_suburbs:
            location_explanation = f"Located in your preferred suburb of {property.suburb}"
        else:
            location_explanation = f"Located in {property.suburb} (not in your preferred suburbs)"
        
        # Features explanation
        must_have_matches = [f for f in user_profile.must_have_features if f.lower() in [prop_f.lower() for prop_f in property.features]]
        nice_to_have_matches = [f for f in user_profile.nice_to_have_features if f.lower() in [prop_f.lower() for prop_f in property.features]]
        
        features_explanation = f"Has {len(must_have_matches)}/{len(user_profile.must_have_features)} must-have features"
        if must_have_matches:
            features_explanation += f" ({', '.join(must_have_matches)})"
        if nice_to_have_matches:
            features_explanation += f" and {len(nice_to_have_matches)} nice-to-have features ({', '.join(nice_to_have_matches)})"
        
        # Key highlights
        highlights = []
        if property.price <= user_profile.budget_max:
            highlights.append("fits your budget")
        if property.property_type in user_profile.property_types:
            highlights.append("matches your property type preference")
        if property.suburb in user_profile.preferred_suburbs:
            highlights.append("is in your preferred location")
        if must_have_matches:
            highlights.append(f"includes your must-have features: {', '.join(must_have_matches)}")
        
        key_highlights = ", ".join(highlights) if highlights else "meets several of your criteria"
        
        # Calculate overall score
        overall_score = self._calculate_property_score(property, user_profile, search_criteria)
        
        return {
            "budget_explanation": budget_explanation,
            "type_explanation": type_explanation,
            "location_explanation": location_explanation,
            "features_explanation": features_explanation,
            "key_highlights": key_highlights,
            "overall_score": overall_score
        }
    
    async def update_user_preferences(self, user_id: str, preferences: Dict[str, Any]) -> str:
        """Update user preferences based on conversation feedback"""
        
        if user_id not in self.user_profiles:
            await self._create_user_profile(user_id)
        
        user_profile = self.user_profiles[user_id]
        
        # Update preferences
        if "budget_min" in preferences:
            user_profile.budget_min = preferences["budget_min"]
        if "budget_max" in preferences:
            user_profile.budget_max = preferences["budget_max"]
        if "preferred_suburbs" in preferences:
            user_profile.preferred_suburbs = preferences["preferred_suburbs"]
        if "property_types" in preferences:
            user_profile.property_types = [PropertyType(pt) for pt in preferences["property_types"]]
        if "must_have_features" in preferences:
            user_profile.must_have_features = preferences["must_have_features"]
        if "nice_to_have_features" in preferences:
            user_profile.nice_to_have_features = preferences["nice_to_have_features"]
        if "deal_breakers" in preferences:
            user_profile.deal_breakers = preferences["deal_breakers"]
        
        user_profile.last_interaction = datetime.now()
        
        return f"Preferences updated! I'll use these new criteria for future recommendations."
    
    async def cleanup(self):
        """Clean up resources"""
        if self.server:
            await self.server.__aexit__(None, None, None)

# Example usage and demonstration
async def main():
    """Demonstrate the Property Personalization Agent"""
    
    agent = PropertyPersonalizationAgent()
    await agent.initialize()
    
    try:
        # Example conversation flow
        user_id = "user_123"
        
        print("=== Property Personalization Agent Demo ===\n")
        
        # Start conversation
        response = await agent.start_conversation(user_id)
        print(f"Agent: {response}\n")
        
        # Get personalized recommendations
        recommendations = await agent.get_personalized_recommendations(user_id)
        print(f"Found {len(recommendations)} personalized recommendations:\n")
        
        for i, prop in enumerate(recommendations, 1):
            print(f"{i}. {prop.address}")
            print(f"   Price: ${prop.price:,}")
            print(f"   Type: {prop.property_type.value}")
            print(f"   Features: {', '.join(prop.features[:3])}...")
            print()
        
        # Explain a specific recommendation
        if recommendations:
            explanation = await agent.explain_recommendation(user_id, recommendations[0].id)
            print(f"Explanation for {recommendations[0].address}:")
            print(explanation)
            print()
        
        # Update preferences based on user feedback
        new_preferences = {
            "budget_max": 1500000,
            "preferred_suburbs": ["Melbourne", "Richmond", "Fitzroy", "South Yarra"],
            "must_have_features": ["Parking", "Modern kitchen", "Balcony"]
        }
        
        update_response = await agent.update_user_preferences(user_id, new_preferences)
        print(f"Agent: {update_response}\n")
        
        # Get updated recommendations
        updated_recommendations = await agent.get_personalized_recommendations(user_id)
        print(f"Updated recommendations based on new preferences:\n")
        
        for i, prop in enumerate(updated_recommendations, 1):
            print(f"{i}. {prop.address}")
            print(f"   Price: ${prop.price:,}")
            print(f"   Score: {agent._calculate_property_score(prop, agent.user_profiles[user_id], {}):.1%}")
            print()
        
    finally:
        await agent.cleanup()

if __name__ == "__main__":
    asyncio.run(main())
