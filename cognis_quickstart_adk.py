"""
Lyzr Cognis Quickstart - Hosted Mode (lyzr-adk)
Follows steps from https://docs.lyzr.ai/cognis/quickstart
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env file if available
load_dotenv()

# Verify LYZR_API_KEY is present
api_key = os.getenv("LYZR_API_KEY")
if not api_key or api_key == "your_lyzr_api_key_here":
    print("Warning: LYZR_API_KEY is not configured in environment or .env file.")
    print("Please set LYZR_API_KEY to run live calls against the Lyzr hosted API.")

try:
    from lyzr import Cognis, CognisMessage

    print("Step 1 & 2: lyzr-adk package loaded & API keys verified.")

    # Initialize Cognis client
    cog = Cognis()

    # Step 3: Add Memories
    print("\nStep 3: Adding memories...")
    add_response = cog.add(
        messages=[
            CognisMessage(role="user", content="My name is Alice. I love hiking and I'm vegetarian."),
            CognisMessage(role="assistant", content="Nice to meet you, Alice!"),
        ],
        owner_id="user_alice",
    )
    print("Memories added successfully:", add_response)

    # Step 4: Search Memories
    print("\nStep 4: Searching memories for 'What does Alice eat?'...")
    results = cog.search(query="What does Alice eat?", owner_id="user_alice", limit=5)
    for r in results:
        print(f"  - {getattr(r, 'content', r)} (score: {getattr(r, 'score', 'N/A')})")

    # Step 5: Get Context for LLM
    print("\nStep 5: Generating context for LLM prompt...")
    context = cog.context(
        current_messages=[CognisMessage(role="user", content="Recommend a restaurant")],
        owner_id="user_alice",
    )
    print("Retrieved LLM Context:")
    print(context)

except ImportError as e:
    print(f"ImportError: {e}. Please ensure lyzr-adk is installed: pip install lyzr-adk")
except Exception as e:
    print(f"Execution output / error: {e}")
