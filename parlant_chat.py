#!/usr/bin/env python3
"""
Parlant Chat Integration Script
This script provides a command-line interface to test Parlant integration
"""

import asyncio
import json
import sys
import argparse
from parlant_integration import chat_with_parlant

async def main():
    parser = argparse.ArgumentParser(description='Parlant Chat Integration')
    parser.add_argument('--message', required=True, help='Message to send to Parlant')
    parser.add_argument('--user-id', default='test', help='User ID for the chat')
    
    args = parser.parse_args()
    
    try:
        # Chat with Parlant
        response = await chat_with_parlant(args.message, args.user_id)
        
        # Output JSON response for the API
        print(json.dumps(response, indent=2))
        
    except Exception as e:
        error_response = {
            "response": f"I'm sorry, I'm having trouble processing your request: {str(e)}",
            "recommendations": [],
            "type": "error"
        }
        print(json.dumps(error_response, indent=2))

if __name__ == "__main__":
    asyncio.run(main())
