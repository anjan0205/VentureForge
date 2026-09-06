import os
from pathlib import Path
from dotenv import load_dotenv

# Base Directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Load .env file from workspace root or backend dir
env_path = BASE_DIR.parent / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()

class Settings:
    PROJECT_NAME: str = "VentureForge 2.0"
    VERSION: str = "2.0"
    LYZR_API_KEY: str = os.getenv("LYZR_API_KEY", "")
    LYZR_USER_ID: str = os.getenv("LYZR_USER_ID", "anjan.panga@gmail.com")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    TAVILY_API_KEY: str = os.getenv("TAVILY_API_KEY", "")
    DATABASE_URL: str = f"sqlite:///{BASE_DIR}/ai_in_a_box.db"

settings = Settings()
