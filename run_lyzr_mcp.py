"""
Lyzr MCP Server Launcher
Launches the installed Lyzr MCP Tool Call server (lyzr-mcp-tool-call)
Requires environment variables: LYZR_API_KEY and LYZR_USER_ID
"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def check_env():
    api_key = os.getenv("LYZR_API_KEY")
    user_id = os.getenv("LYZR_USER_ID")
    
    if not api_key or api_key == "your_lyzr_api_key_here":
        print("Error: LYZR_API_KEY environment variable is required to start the Lyzr MCP Server.")
        print("Please configure it in .env or export it in your shell environment.")
        return False
        
    if not user_id or user_id == "your_lyzr_user_id_here":
        print("Error: LYZR_USER_ID environment variable is required to start the Lyzr MCP Server.")
        print("Please configure it in .env or export it in your shell environment.")
        return False
        
    return True

def main():
    if not check_env():
        sys.exit(1)
        
    print("Starting Lyzr MCP Tool Call Server...")
    try:
        from lyzr_tool_call.server import mcp
        mcp.run()
    except Exception as e:
        print(f"Error starting Lyzr MCP Server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
