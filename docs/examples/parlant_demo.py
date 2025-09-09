#!/usr/bin/env python3
"""
Parlant Integration Demo
========================

This demo shows how Parlant can be integrated with the property
personalization system using your internal API.
"""

import asyncio
import os
import parlant.sdk as p

async def test_parlant_integration():
    """Test Parlant integration with your internal API"""
    
    print("🤖 Testing Parlant Integration")
    print("=" * 40)
    print()
    
    # Set environment variables
    # Load from environment variables or set defaults for demo
    if not os.getenv("OPENAI_API_KEY"):
        print("⚠️  OPENAI_API_KEY not set. Please set it in your environment.")
        print("   Example: export OPENAI_API_KEY='your-api-key-here'")
        return
    if not os.getenv("OPENAI_BASE_URL"):
        print("⚠️  OPENAI_BASE_URL not set. Please set it in your environment.")
        print("   Example: export OPENAI_BASE_URL='https://api.openai.com/v1'")
        return
    
    print("🔧 Setting up Parlant server...")
    print(f"   API Key: {os.environ['OPENAI_API_KEY'][:10]}...")
    print(f"   Base URL: {os.environ['OPENAI_BASE_URL']}")
    print()
    
    try:
        # Initialize Parlant server
        server = p.Server()
        print("✅ Parlant server initialized")
        
        # Start the server
        async with server as s:
            print("✅ Parlant server started successfully")
            
            # Create a property agent
            agent = await s.create_agent(
                name="PropertyMatch Pro",
                description="A property personalization agent that helps users find their perfect home based on preferences, budget, and requirements."
            )
            print("✅ Property agent created")
            
            # Test a simple conversation
            print("\n💬 Testing conversation...")
            response = await agent.chat(
                "Hi! I'm looking for a 3-bedroom apartment in Melbourne under $800k. Can you help me?"
            )
            print(f"🤖 Agent: {response}")
            
            # Test property recommendation
            print("\n🏠 Testing property recommendation...")
            response = await agent.chat(
                "What properties would you recommend for a first-time buyer with a budget of $600k-$900k in Richmond or Fitzroy?"
            )
            print(f"🤖 Agent: {response}")
            
            print("\n✅ Parlant integration test completed successfully!")
            print("🎯 This demonstrates how Parlant can power property personalization")
            
    except Exception as e:
        print(f"❌ Error: {e}")
        print("\n🔧 This might be due to API configuration or network issues")
        print("   The frontend demo still works perfectly!")

async def main():
    """Main demo function"""
    print("🏠 PropertyMatch Pro - Parlant Integration Demo")
    print("=" * 60)
    print()
    
    # Test Parlant integration
    await test_parlant_integration()
    
    print("\n" + "=" * 60)
    print("🌐 Frontend Demo Available:")
    print("   • URL: http://localhost:3000")
    print("   • Click the blue chat button to try the interactive demo")
    print("   • Features: Property search, recommendations, explanations")
    print()
    print("🎯 Key Features Demonstrated:")
    print("   • AI-powered property personalization")
    print("   • Explainable recommendations")
    print("   • Adaptive conversation flows")
    print("   • Beautiful React frontend")
    print("   • Mock AI responses for demo purposes")

if __name__ == "__main__":
    asyncio.run(main())
