# VentureForge 2.0 Firebase & Backend Deployment

VentureForge 2.0 frontend is **live** on **Firebase Hosting**!

---

## 🌐 Live URLs

- **Frontend App (Firebase Hosting)**: [https://ventureforge-ai-2026.web.app](https://ventureforge-ai-2026.web.app)
- **Firebase Project ID**: `ventureforge-ai-2026`

---

## 🛠️ Deployed Components

### 1. Frontend SPA (Firebase Hosting)
- **Status**: Live & Deployed
- **Configuration**:
  - `firebase.json`: Configured with Single-Page Application rewrites (`/*` -> `/index.html`).
  - `.firebaserc`: Set to project `ventureforge-ai-2026`.
  - Deployment Command: `firebase deploy --only hosting`

### 2. Backend FastAPI Web Service
To connect the live Firebase frontend to your Python FastAPI multi-agent backend:

#### Option 1: Render Free Web Service (No Payment Info Required)
1. Go to [Render New Web Service](https://dashboard.render.com/select-repo?type=web).
2. Connect `anjan0205/VentureForge`.
3. Configure the following:
   - **Name**: `ventureforge-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: **Free** ($0/month)
4. Add Environment Variables:
   - `LYZR_API_KEY`: `sk-default-QA7bqWp4tnOWtkQIFQcvHUABOpdeg4Xe`
   - `LYZR_USER_ID`: `anjan.panga@gmail.com`
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `GEMINI_API_KEY`: Your Gemini API key

---

## 🔄 Redeploying to Firebase Hosting

To deploy updated frontend builds to Firebase Hosting at any time:
```bash
cd frontend
npm run build
cd ..
firebase deploy --only hosting
```
Or via Firebase MCP Tool:
`call_mcp_tool(ServerName: "firebase-mcp-server", ToolName: "firebase_deploy", Arguments: { only: "hosting" })`
