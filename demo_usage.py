#!/usr/bin/env python3
"""
PropertyMatch Pro Demo Script
============================

This script demonstrates the PropertyMatch Pro agent capabilities
in a realistic property search scenario.
"""

import asyncio
import json
from property_agent_example import PropertyPersonalizationAgent, UserType, PropertyType

async def demo_property_search():
    """Demonstrate a complete property search conversation"""
    
    print("🏠 PropertyMatch Pro - AI Property Personalization Demo")
    print("=" * 60)
    print()
    
    # Initialize the agent
    agent = PropertyPersonalizationAgent()
    await agent.initialize()
    
    try:
        # Demo user profile
        user_id = "demo_user_001"
        
        print("👤 Creating user profile...")
        user_profile = await agent._create_user_profile(user_id)
        user_profile.name = "Sarah Johnson"
        user_profile.user_type = UserType.FIRST_TIME_BUYER
        user_profile.budget_min = 600000
        user_profile.budget_max = 900000
        user_profile.preferred_suburbs = ["Richmond", "Fitzroy", "South Yarra"]
        user_profile.property_types = [PropertyType.APARTMENT, PropertyType.TOWNHOUSE]
        user_profile.must_have_features = ["Parking", "Modern kitchen", "Balcony"]
        user_profile.nice_to_have_features = ["Gym", "Pool", "City views"]
        user_profile.deal_breakers = ["Main road", "No parking", "Ground floor"]
        
        print(f"✅ User: {user_profile.name}")
        print(f"   Budget: ${user_profile.budget_min:,} - ${user_profile.budget_max:,}")
        print(f"   Preferred suburbs: {', '.join(user_profile.preferred_suburbs)}")
        print(f"   Property types: {', '.join([pt.value for pt in user_profile.property_types])}")
        print()
        
        # Start conversation
        print("💬 Starting conversation with PropertyMatch Pro...")
        response = await agent.start_conversation(
            user_id, 
            "Hi! I'm Sarah, a first-time home buyer looking for a modern apartment in Melbourne. I have a budget of $600k-$900k and really need parking and a nice kitchen."
        )
        print(f"🤖 Agent: {response}")
        print()
        
        # Get initial recommendations
        print("🔍 Getting personalized recommendations...")
        recommendations = await agent.get_personalized_recommendations(user_id)
        
        print(f"📋 Found {len(recommendations)} personalized recommendations:")
        print()
        
        for i, prop in enumerate(recommendations, 1):
            score = agent._calculate_property_score(prop, user_profile, {})
            print(f"{i}. {prop.address}")
            print(f"   💰 Price: ${prop.price:,}")
            print(f"   🏠 Type: {prop.property_type.value} | {prop.bedrooms} bed | {prop.bathrooms} bath")
            print(f"   ⭐ Match Score: {score:.1%}")
            print(f"   🏷️  Features: {', '.join(prop.features[:3])}...")
            print(f"   📞 Agent: {prop.agent_contact}")
            print()
        
        # Explain a specific recommendation
        if recommendations:
            print("🔍 Getting detailed explanation for top recommendation...")
            explanation = await agent.explain_recommendation(user_id, recommendations[0].id)
            print(f"📝 Explanation:")
            print(explanation)
            print()
        
        # Simulate user feedback and preference update
        print("🔄 Simulating user feedback and preference update...")
        new_preferences = {
            "budget_max": 1000000,  # Increased budget
            "preferred_suburbs": ["Richmond", "Fitzroy", "South Yarra", "Carlton"],
            "must_have_features": ["Parking", "Modern kitchen", "Balcony", "Gym"]
        }
        
        update_response = await agent.update_user_preferences(user_id, new_preferences)
        print(f"🤖 Agent: {update_response}")
        print()
        
        # Get updated recommendations
        print("🔍 Getting updated recommendations with new preferences...")
        updated_recommendations = await agent.get_personalized_recommendations(user_id)
        
        print(f"📋 Updated recommendations ({len(updated_recommendations)} found):")
        print()
        
        for i, prop in enumerate(updated_recommendations, 1):
            score = agent._calculate_property_score(prop, agent.user_profiles[user_id], {})
            print(f"{i}. {prop.address}")
            print(f"   💰 Price: ${prop.price:,}")
            print(f"   🏠 Type: {prop.property_type.value} | {prop.bedrooms} bed | {prop.bathrooms} bath")
            print(f"   ⭐ Match Score: {score:.1%}")
            print(f"   🏷️  Features: {', '.join(prop.features[:3])}...")
            print()
        
        # Demonstrate conversation flow
        print("💬 Simulating follow-up conversation...")
        follow_up_responses = [
            "Can you explain why the Richmond property scored so highly?",
            "What about properties with pools? I'd love to have a pool.",
            "Are there any properties near good schools?",
            "I'm also interested in investment properties. Can you help with that?"
        ]
        
        for question in follow_up_responses:
            print(f"👤 User: {question}")
            response = await agent.agent.chat(
                question,
                context={
                    "user_profile": agent.user_profiles[user_id].__dict__,
                    "available_properties": [p.__dict__ for p in agent.properties],
                    "conversation_context": agent.conversation_context[user_id]
                }
            )
            print(f"🤖 Agent: {response}")
            print()
        
        # Demonstrate different user types
        print("👥 Demonstrating different user types...")
        print()
        
        user_types = [
            (UserType.INVESTOR, "I'm looking for investment properties with good rental yields"),
            (UserType.UPGRADER, "We're upgrading from our current home and need more space for our growing family"),
            (UserType.DOWNSIZER, "We're downsizing for retirement and want something low-maintenance")
        ]
        
        for user_type, message in user_types:
            print(f"👤 {user_type.value.replace('_', ' ').title()}: {message}")
            
            # Create a new user profile for this type
            new_user_id = f"demo_user_{user_type.value}"
            new_profile = await agent._create_user_profile(new_user_id)
            new_profile.user_type = user_type
            new_profile.name = f"Demo {user_type.value.replace('_', ' ').title()}"
            
            # Adjust preferences based on user type
            if user_type == UserType.INVESTOR:
                new_profile.budget_min = 400000
                new_profile.budget_max = 800000
                new_profile.must_have_features = ["High rental yield", "Low maintenance", "Good transport"]
            elif user_type == UserType.UPGRADER:
                new_profile.budget_min = 800000
                new_profile.budget_max = 1500000
                new_profile.must_have_features = ["Large backyard", "Multiple bedrooms", "Family-friendly area"]
            elif user_type == UserType.DOWNSIZER:
                new_profile.budget_min = 500000
                new_profile.budget_max = 1000000
                new_profile.must_have_features = ["Single level", "Low maintenance", "Good security"]
            
            response = await agent.start_conversation(new_user_id, message)
            print(f"🤖 Agent: {response}")
            print()
        
        print("✅ Demo completed successfully!")
        print()
        print("🎯 Key Features Demonstrated:")
        print("   • Adaptive conversation based on user type")
        print("   • Personalized property recommendations")
        print("   • Explainable AI decision making")
        print("   • Iterative preference learning")
        print("   • Multi-criteria property scoring")
        print("   • Compliance and safety considerations")
        print()
        print("🚀 This demonstrates how Parlant can power sophisticated")
        print("   property personalization for real estate websites!")
        
    finally:
        await agent.cleanup()

async def demo_api_integration():
    """Demonstrate API integration patterns"""
    
    print("\n" + "=" * 60)
    print("🔌 API Integration Demo")
    print("=" * 60)
    print()
    
    # Simulate API requests
    api_requests = [
        {
            "action": "start_conversation",
            "userId": "api_user_001",
            "message": "I need help finding a property"
        },
        {
            "action": "get_recommendations",
            "userId": "api_user_001",
            "context": {
                "searchCriteria": {
                    "budget_max": 750000,
                    "property_types": ["apartment"],
                    "suburbs": ["Melbourne", "Richmond"]
                }
            }
        },
        {
            "action": "update_preferences",
            "userId": "api_user_001",
            "preferences": {
                "budget_max": 900000,
                "must_have_features": ["Parking", "Balcony"]
            }
        },
        {
            "action": "explain_recommendation",
            "userId": "api_user_001",
            "propertyId": "prop_001"
        }
    ]
    
    for i, request in enumerate(api_requests, 1):
        print(f"📤 API Request {i}: {request['action']}")
        print(f"   User ID: {request['userId']}")
        if 'message' in request:
            print(f"   Message: {request['message']}")
        if 'context' in request:
            print(f"   Context: {json.dumps(request['context'], indent=2)}")
        if 'preferences' in request:
            print(f"   Preferences: {json.dumps(request['preferences'], indent=2)}")
        print()

if __name__ == "__main__":
    print("Starting PropertyMatch Pro Demo...")
    print()
    
    # Run the main demo
    asyncio.run(demo_property_search())
    
    # Run API integration demo
    asyncio.run(demo_api_integration())
    
    print("\n🎉 Demo completed! Check out the React frontend by running:")
    print("   npm run dev")
    print("\nThen visit http://localhost:3000 to see the chat widget in action!")
