#!/usr/bin/env python3
"""
Simple PropertyMatch Pro Demo
============================

This is a simplified demo that shows the concept without requiring
the full Parlant setup, perfect for showcasing the frontend.
"""

import asyncio
import json
from datetime import datetime
from typing import Dict, List, Any

class SimplePropertyDemo:
    """Simple property demo without Parlant dependency"""
    
    def __init__(self):
        self.properties = [
            {
                "id": "prop_001",
                "address": "123 Collins Street, Melbourne VIC 3000",
                "price": 1200000,
                "property_type": "apartment",
                "bedrooms": 2,
                "bathrooms": 2,
                "car_spaces": 1,
                "features": ["City views", "Balcony", "Gym", "Pool", "Concierge"],
                "images": ["img1.jpg", "img2.jpg"],
                "agent_contact": "Sarah Johnson - 0400 123 456",
                "suburb": "Melbourne",
                "state": "VIC",
                "postcode": "3000"
            },
            {
                "id": "prop_002", 
                "address": "45 Oak Avenue, Richmond VIC 3121",
                "price": 850000,
                "property_type": "townhouse",
                "bedrooms": 3,
                "bathrooms": 2,
                "car_spaces": 2,
                "features": ["Modern kitchen", "Garden", "Study nook", "Ducted heating"],
                "images": ["img3.jpg", "img4.jpg"],
                "agent_contact": "Mike Chen - 0400 789 012",
                "suburb": "Richmond",
                "state": "VIC",
                "postcode": "3121"
            },
            {
                "id": "prop_003",
                "address": "78 Beach Road, Bondi NSW 2026", 
                "price": 2100000,
                "property_type": "house",
                "bedrooms": 4,
                "bathrooms": 3,
                "car_spaces": 2,
                "features": ["Ocean views", "Pool", "Large backyard", "Renovated kitchen"],
                "images": ["img5.jpg", "img6.jpg"],
                "agent_contact": "Emma Wilson - 0400 345 678",
                "suburb": "Bondi",
                "state": "NSW",
                "postcode": "2026"
            }
        ]
        
        self.user_profiles = {}
        self.conversation_history = {}
    
    def create_user_profile(self, user_id: str) -> Dict[str, Any]:
        """Create a mock user profile"""
        profile = {
            "user_id": user_id,
            "name": "Property Seeker",
            "budget_min": 500000,
            "budget_max": 1000000,
            "preferred_suburbs": ["Melbourne", "Richmond", "Fitzroy"],
            "property_types": ["apartment", "townhouse"],
            "must_have_features": ["Parking", "Modern kitchen"],
            "nice_to_have_features": ["Balcony", "Gym", "Pool"],
            "deal_breakers": ["Main road", "No parking"],
            "search_history": [],
            "saved_properties": [],
            "last_interaction": datetime.now().isoformat()
        }
        self.user_profiles[user_id] = profile
        return profile
    
    def get_personalized_recommendations(self, user_id: str, search_criteria: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        """Get personalized property recommendations"""
        if user_id not in self.user_profiles:
            self.create_user_profile(user_id)
        
        user_profile = self.user_profiles[user_id]
        recommendations = []
        
        for prop in self.properties:
            score = self._calculate_property_score(prop, user_profile, search_criteria or {})
            if score > 0.6:  # Threshold for recommendations
                prop_with_score = prop.copy()
                prop_with_score["match_score"] = score
                recommendations.append(prop_with_score)
        
        # Sort by score
        recommendations.sort(key=lambda x: x["match_score"], reverse=True)
        return recommendations[:5]  # Top 5 recommendations
    
    def _calculate_property_score(self, property: Dict[str, Any], user_profile: Dict[str, Any], search_criteria: Dict[str, Any]) -> float:
        """Calculate a personalized score for a property"""
        score = 0.0
        max_score = 0.0
        
        # Budget match (40% weight)
        budget_weight = 0.4
        if user_profile["budget_min"] <= property["price"] <= user_profile["budget_max"]:
            score += budget_weight
        elif property["price"] < user_profile["budget_min"]:
            score += budget_weight * 0.8
        else:
            score += budget_weight * max(0, 1 - (property["price"] - user_profile["budget_max"]) / user_profile["budget_max"])
        max_score += budget_weight
        
        # Property type match (20% weight)
        type_weight = 0.2
        if property["property_type"] in user_profile["property_types"]:
            score += type_weight
        max_score += type_weight
        
        # Suburb preference (15% weight)
        suburb_weight = 0.15
        if property["suburb"] in user_profile["preferred_suburbs"]:
            score += suburb_weight
        max_score += suburb_weight
        
        # Feature matching (25% weight)
        feature_weight = 0.25
        must_have_matches = sum(1 for feature in user_profile["must_have_features"] 
                              if feature.lower() in [f.lower() for f in property["features"]])
        nice_to_have_matches = sum(1 for feature in user_profile["nice_to_have_features"] 
                                 if feature.lower() in [f.lower() for f in property["features"]])
        
        if user_profile["must_have_features"]:
            must_have_score = must_have_matches / len(user_profile["must_have_features"])
            score += feature_weight * 0.7 * must_have_score
        
        if user_profile["nice_to_have_features"]:
            nice_to_have_score = nice_to_have_matches / len(user_profile["nice_to_have_features"])
            score += feature_weight * 0.3 * nice_to_have_score
        
        max_score += feature_weight
        
        return score / max_score if max_score > 0 else 0
    
    def explain_recommendation(self, user_id: str, property_id: str) -> str:
        """Provide an explanation for why a property was recommended"""
        if user_id not in self.user_profiles:
            return "Please start a conversation first to get property recommendations."
        
        user_profile = self.user_profiles[user_id]
        property = next((p for p in self.properties if p["id"] == property_id), None)
        
        if not property:
            return "Property not found."
        
        score = self._calculate_property_score(property, user_profile, {})
        
        # Generate explanation
        explanations = []
        
        if user_profile["budget_min"] <= property["price"] <= user_profile["budget_max"]:
            explanations.append(f"✅ Perfect fit within your ${user_profile['budget_min']:,} - ${user_profile['budget_max']:,} budget")
        elif property["price"] < user_profile["budget_min"]:
            explanations.append(f"💰 Under your budget at ${property['price']:,} (saving you ${user_profile['budget_min'] - property['price']:,})")
        else:
            explanations.append(f"⚠️ Above your budget by ${property['price'] - user_profile['budget_max']:,}")
        
        if property["property_type"] in user_profile["property_types"]:
            explanations.append(f"🏠 Matches your preferred {property['property_type']} type")
        
        if property["suburb"] in user_profile["preferred_suburbs"]:
            explanations.append(f"📍 Located in your preferred suburb of {property['suburb']}")
        
        must_have_matches = [f for f in user_profile["must_have_features"] 
                           if f.lower() in [prop_f.lower() for prop_f in property["features"]]]
        if must_have_matches:
            explanations.append(f"⭐ Has your must-have features: {', '.join(must_have_matches)}")
        
        nice_to_have_matches = [f for f in user_profile["nice_to_have_features"] 
                              if f.lower() in [prop_f.lower() for prop_f in property["features"]]]
        if nice_to_have_matches:
            explanations.append(f"✨ Bonus features: {', '.join(nice_to_have_matches)}")
        
        explanation = f"""
🏠 **Why I recommended {property['address']}:**

{chr(10).join(explanations)}

**Overall Match Score: {score:.1%}**

This property particularly stands out because it {', '.join(explanations[:2]).lower()}.

Would you like me to arrange a viewing or provide more details about any specific aspect?
        """.strip()
        
        return explanation
    
    def update_user_preferences(self, user_id: str, preferences: Dict[str, Any]) -> str:
        """Update user preferences"""
        if user_id not in self.user_profiles:
            self.create_user_profile(user_id)
        
        user_profile = self.user_profiles[user_id]
        
        # Update preferences
        for key, value in preferences.items():
            if key in user_profile:
                user_profile[key] = value
        
        user_profile["last_interaction"] = datetime.now().isoformat()
        
        return "Preferences updated! I'll use these new criteria for future recommendations."

async def demo_property_search():
    """Run the simple property search demo"""
    
    print("🏠 PropertyMatch Pro - Simple Demo")
    print("=" * 50)
    print()
    
    demo = SimplePropertyDemo()
    
    # Demo user profile
    user_id = "demo_user_001"
    user_profile = demo.create_user_profile(user_id)
    user_profile["name"] = "Sarah Johnson"
    user_profile["budget_min"] = 600000
    user_profile["budget_max"] = 900000
    user_profile["preferred_suburbs"] = ["Richmond", "Fitzroy", "South Yarra"]
    user_profile["property_types"] = ["apartment", "townhouse"]
    user_profile["must_have_features"] = ["Parking", "Modern kitchen", "Balcony"]
    user_profile["nice_to_have_features"] = ["Gym", "Pool", "City views"]
    
    print(f"👤 User: {user_profile['name']}")
    print(f"   Budget: ${user_profile['budget_min']:,} - ${user_profile['budget_max']:,}")
    print(f"   Preferred suburbs: {', '.join(user_profile['preferred_suburbs'])}")
    print(f"   Property types: {', '.join(user_profile['property_types'])}")
    print()
    
    # Get recommendations
    print("🔍 Getting personalized recommendations...")
    recommendations = demo.get_personalized_recommendations(user_id)
    
    print(f"📋 Found {len(recommendations)} personalized recommendations:")
    print()
    
    for i, prop in enumerate(recommendations, 1):
        print(f"{i}. {prop['address']}")
        print(f"   💰 Price: ${prop['price']:,}")
        print(f"   🏠 Type: {prop['property_type']} | {prop['bedrooms']} bed | {prop['bathrooms']} bath")
        print(f"   ⭐ Match Score: {prop['match_score']:.1%}")
        print(f"   🏷️  Features: {', '.join(prop['features'][:3])}...")
        print(f"   📞 Agent: {prop['agent_contact']}")
        print()
    
    # Explain a recommendation
    if recommendations:
        print("🔍 Getting detailed explanation for top recommendation...")
        explanation = demo.explain_recommendation(user_id, recommendations[0]["id"])
        print("📝 Explanation:")
        print(explanation)
        print()
    
    # Update preferences
    print("🔄 Updating preferences...")
    new_preferences = {
        "budget_max": 1000000,
        "preferred_suburbs": ["Richmond", "Fitzroy", "South Yarra", "Carlton"],
        "must_have_features": ["Parking", "Modern kitchen", "Balcony", "Gym"]
    }
    
    update_response = demo.update_user_preferences(user_id, new_preferences)
    print(f"✅ {update_response}")
    print()
    
    # Get updated recommendations
    print("🔍 Getting updated recommendations...")
    updated_recommendations = demo.get_personalized_recommendations(user_id)
    
    print(f"📋 Updated recommendations ({len(updated_recommendations)} found):")
    print()
    
    for i, prop in enumerate(updated_recommendations, 1):
        print(f"{i}. {prop['address']}")
        print(f"   💰 Price: ${prop['price']:,}")
        print(f"   🏠 Type: {prop['property_type']} | {prop['bedrooms']} bed | {prop['bathrooms']} bath")
        print(f"   ⭐ Match Score: {prop['match_score']:.1%}")
        print()
    
    print("✅ Demo completed successfully!")
    print()
    print("🎯 Key Features Demonstrated:")
    print("   • Personalized property recommendations")
    print("   • Explainable AI decision making")
    print("   • Multi-criteria property scoring")
    print("   • Preference learning and adaptation")
    print("   • Beautiful frontend interface")
    print()
    print("🌐 Frontend is running at: http://localhost:3000")
    print("💬 Click the chat button to try the interactive demo!")

if __name__ == "__main__":
    asyncio.run(demo_property_search())
