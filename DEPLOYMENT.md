# Deploying VentureForge 2.0 to Render

This repository is fully configured for automated deployment to [Render](https://render.com) using Render Blueprints (`render.yaml`).

---

## Quick Deploy (Recommended: Render Blueprint)

### Step 1: Push Code to GitHub
Ensure your latest changes are pushed to your GitHub repository:
```bash
git add .
git commit -m "Configure Render Blueprint deployment"
git push origin main
```

### Step 2: Create a Blueprint Instance on Render
1. Log in to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** at the top right and select **Blueprint**.
3. Connect your GitHub repository.
4. Render will automatically detect the `render.yaml` file in the root directory.
5. Click **Apply** to create both services:
   - **`ventureforge-backend`**: Python FastAPI Web Service
   - **`ventureforge-frontend`**: React/Vite Static Site

---

## Step 3: Configure Environment Variables

Navigate to the **`ventureforge-backend`** service settings in Render, go to **Environment**, and add the required environment variables:

| Variable Name | Description | Required |
|---|---|---|
| `LYZR_API_KEY` | Your Lyzr API Key | Yes |
| `LYZR_USER_ID` | Your Lyzr User ID or registered Email | Yes |
| `OPENAI_API_KEY` | OpenAI API Key (used for fact extraction) | Yes |
| `GEMINI_API_KEY` | Gemini API Key (used for embeddings) | Yes |

*Note: Save changes after adding these environment variables. Render will automatically trigger a redeploy of the backend service.*

---

## Architecture Overview

```
+------------------------------------+           +------------------------------------+
|  ventureforge-frontend             |           |  ventureforge-backend              |
|  (Render Static Site)              | --------> |  (Render Web Service - FastAPI)    |
|  https://<app>.onrender.com        |   /api    |  https://<backend>.onrender.com    |
+------------------------------------+           +------------------------------------+
```

- **Frontend**: Vite React SPA static assets served globally via CDN. Automatically configured to send `/api/*` requests to the `ventureforge-backend` service.
- **Backend**: FastAPI app managed by Uvicorn. Automatically manages SQLite database initialization and background execution for multi-agent pipeline stages.

---

## Manual Web Service Creation (Alternative Option)

If you prefer to set up services manually in Render Dashboard instead of using Blueprint:

### 1. Backend Web Service
- **Name**: `ventureforge-backend`
- **Root Directory**: `backend`
- **Runtime**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- **Environment Variables**: Add `LYZR_API_KEY`, `LYZR_USER_ID`, `OPENAI_API_KEY`, `GEMINI_API_KEY`.

### 2. Frontend Static Site
- **Name**: `ventureforge-frontend`
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Rewrite Rules**:
  - Source: `/*`
  - Destination: `/index.html`
- **Environment Variables**:
  - `VITE_API_BASE_URL`: `https://ventureforge-backend.onrender.com` (replace with your backend service URL).

---

## Verification & Health Check

After deployment completes:
- Backend Health Check: `https://<your-backend-name>.onrender.com/api/health`
- Frontend App: `https://<your-frontend-name>.onrender.com`
