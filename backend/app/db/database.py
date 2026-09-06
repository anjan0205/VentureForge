import json
from typing import Optional, Dict, Any
from sqlalchemy import create_engine, Column, String, Text, DateTime, Integer
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime
from app.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class StartupRunModel(Base):
    __tablename__ = "runs"

    run_id = Column(String, primary_key=True, index=True)
    startup_idea = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="pending")  # pending, running, completed, failed
    current_stage = Column(String, default="initialized")
    
    # Store JSON strings for structured outputs
    stage_outputs_json = Column(Text, default="{}")
    final_blueprint_json = Column(Text, default="{}")
    kill_mode_json = Column(Text, default="{}")
    version_2_json = Column(Text, default="{}")
    score = Column(Integer, default=0)
    error = Column(Text, nullable=True)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
