# Lyzr Cognis Quickstart & MCP Server Setup

This repository contains the complete implementation following the steps from the [Lyzr Cognis Quickstart](https://docs.lyzr.ai/cognis/quickstart) guide and installs the official Lyzr MCP Server (`lyzr-mcp-tool-call`).

---

## 1. Quickstart Steps (Lyzr Cognis Memory)

### Prerequisites & Installation

The required Lyzr packages have been installed:
```bash
python -m pip install lyzr-cognis lyzr-adk lyzr-mcp-tool-call mcp
```

### Environment Setup

Copy `.env.example` to `.env` and fill in your API keys:
```bash
# For Lyzr Hosted (lyzr-adk) & Lyzr MCP Server:
LYZR_API_KEY=your_lyzr_api_key_here
LYZR_USER_ID=your_lyzr_user_id_here

# For Lyzr Open Source (lyzr-cognis):
GEMINI_API_KEY=your_gemini_api_key_here    # Used for embeddings
OPENAI_API_KEY=your_openai_api_key_here    # Used for fact extraction
```

---

## 2. Running Cognis Quickstart Examples

### Hosted Mode (`lyzr-adk`)
```bash
python cognis_quickstart_adk.py
```

Code breakdown:
1. **Initialize**: `cog = Cognis()`
2. **Add Memories**: `cog.add(messages=[...], owner_id="user_alice")`
3. **Search Memories**: `cog.search(query="What does Alice eat?", owner_id="user_alice")`
4. **Get LLM Context**: `cog.context(current_messages=[...], owner_id="user_alice")`

### Open Source Mode (`lyzr-cognis`)
```bash
python cognis_quickstart_oss.py
```

Code breakdown:
1. **Initialize**: `m = Cognis(owner_id="user_alice")`
2. **Add Memories**: `m.add([{"role": "user", "content": "..."}, ...])`
3. **Search Memories**: `m.search("What does Alice eat?", limit=5)`
4. **Get LLM Context**: `m.get_context(messages=[...])`
5. **Close Connection**: `m.close()`

---

## 3. Lyzr MCP Server Setup

The official Lyzr MCP Server package `lyzr-mcp-tool-call` is installed.

### Launching the MCP Server

Using Python:
```bash
python run_lyzr_mcp.py
```
Or directly via module:
```bash
python -m lyzr_tool_call.server
```

### Client Integration (`claude_desktop_config.json` or Cursor `mcp.json`)

Add the following to your MCP client config file:

```json
{
  "mcpServers": {
    "lyzr-mcp": {
      "command": "python",
      "args": [
        "-m",
        "lyzr_tool_call.server"
      ],
      "env": {
        "LYZR_API_KEY": "YOUR_LYZR_API_KEY",
        "LYZR_USER_ID": "YOUR_LYZR_USER_ID"
      }
    }
  }
}
```
