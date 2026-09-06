"""
Lyzr Cognis Quickstart - Open Source Mode (lyzr-cognis)
Follows steps from https://docs.lyzr.ai/cognis/quickstart
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env file if available
load_dotenv()

# Verify API Keys for OSS mode
gemini_key = os.getenv("GEMINI_API_KEY")
openai_key = os.getenv("OPENAI_API_KEY")

if not gemini_key or not openai_key:
    print("Warning: GEMINI_API_KEY and OPENAI_API_KEY must be set for Open Source lyzr-cognis mode.")

try:
    from cognis import Cognis

    print("Step 1 & 2: lyzr-cognis package loaded.")

    # Initialize Cognis instance
    m = Cognis(owner_id="user_alice")

    # Step 3: Add Memories
    print("\nStep 3: Adding memories...")
    result = m.add([
        {"role": "user", "content": "My name is Alice. I love hiking and I'm vegetarian."},
        {"role": "assistant", "content": "Nice to meet you, Alice!"},
    ])
    print("Result:", result.get("message", result))

    # Step 4: Search Memories
    print("\nStep 4: Searching memories...")
    resp = m.search("What does Alice eat?", limit=5)
    for r in resp.get("results", []):
        print(f"  - {r.get('content')} (score: {r.get('score')})")

    # Step 5: Get Context for LLM
    print("\nStep 5: Fetching LLM Context...")
    ctx = m.get_context(
        messages=[{"role": "user", "content": "Recommend a restaurant"}]
    )
    print("Context string:")
    print(ctx.get("context_string", ctx))

    # Close Cognis connection (required for OSS)
    m.close()
    print("\nCognis connection closed successfully.")

except ImportError as e:
    print(f"ImportError: {e}. Please ensure lyzr-cognis is installed: pip install lyzr-cognis")
except Exception as e:
    print(f"Execution output / error: {e}")
