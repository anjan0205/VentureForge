import json
import uuid
import logging
import asyncio
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.db.database import get_db, StartupRunModel
from app.models.schemas import (
    GenerateRequest, RunStatusResponse, FullRunResponse, VersionCompareResponse,
    IdeaAnalystOutput, MarketResearcherOutput, CustomerValidatorOutput,
    BusinessMVPOutput, GTMStrategistOutput, StartupBlueprintV1, KillModeResult
)
from app.services.lyzr_orchestrator import orchestrator

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["startup"])

async def execute_pipeline_background(run_id: str, idea: str):
    """Background task to run the 6 normal pipeline agents and update SQLite"""
    from app.db.database import SessionLocal
    db = SessionLocal()
    try:
        run = db.query(StartupRunModel).filter(StartupRunModel.run_id == run_id).first()
        if not run:
            return
        
        run.status = "running"
        run.current_stage = "Stage 1: Idea Analyst"
        db.commit()

        # Stage 1
        s1 = await orchestrator.run_stage_1_idea_analyst(idea)
        run.current_stage = "Stage 2: Market Researcher"
        db.commit()

        # Stage 2
        s2 = await orchestrator.run_stage_2_market_researcher(s1)
        run.current_stage = "Stage 3: Customer Validator"
        db.commit()

        # Stage 3
        s3 = await orchestrator.run_stage_3_customer_validator(s1, s2)
        run.current_stage = "Stage 4: Business/MVP Strategist"
        db.commit()

        # Stage 4
        s4 = await orchestrator.run_stage_4_business_mvp(s1, s3)
        run.current_stage = "Stage 5: GTM Strategist"
        db.commit()

        # Stage 5
        s5 = await orchestrator.run_stage_5_gtm_strategist(s1, s4)
        run.current_stage = "Stage 6: Startup Synthesizer"
        db.commit()

        # Stage 6
        blueprint_v1, overall_score = await orchestrator.run_stage_6_synthesizer(s1, s2, s3, s4, s5)

        # Store all outputs into SQLite
        stage_outputs = {
            "idea_analyst": s1.model_dump(),
            "market_researcher": s2.model_dump(),
            "customer_validator": s3.model_dump(),
            "business_mvp": s4.model_dump(),
            "gtm_strategist": s5.model_dump()
        }

        run.stage_outputs_json = json.dumps(stage_outputs)
        run.final_blueprint_json = json.dumps(blueprint_v1.model_dump())
        run.score = overall_score
        run.status = "completed"
        run.current_stage = "Blueprint V1 Ready"
        db.commit()
        logger.info(f"Run {run_id} completed successfully.")

    except Exception as e:
        logger.error(f"Error executing pipeline for run {run_id}: {e}", exc_info=True)
        run.status = "failed"
        run.error = str(e)
        run.current_stage = "Failed"
        db.commit()
    finally:
        db.close()


@router.post("/generate", response_model=RunStatusResponse)
async def generate_startup(payload: GenerateRequest, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """Start or execute startup analysis"""
    run_id = f"run_{uuid.uuid4().hex[:10]}"
    
    new_run = StartupRunModel(
        run_id=run_id,
        startup_idea=payload.idea,
        status="pending",
        current_stage="Queued"
    )
    db.add(new_run)
    db.commit()

    # Launch background multi-agent execution
    background_tasks.add_task(execute_pipeline_background, run_id, payload.idea)

    return RunStatusResponse(
        run_id=run_id,
        status="pending",
        current_stage="Queued"
    )


@router.get("/runs/{run_id}/status", response_model=RunStatusResponse)
async def get_run_status(run_id: str, db: Session = Depends(get_db)):
    """Retrieve generation status"""
    run = db.query(StartupRunModel).filter(StartupRunModel.run_id == run_id).first()
    if not run:
        raise HTTPException(status_code=404, detail="Run ID not found")
    
    return RunStatusResponse(
        run_id=run.run_id,
        status=run.status,
        current_stage=run.current_stage,
        error=run.error
    )


@router.get("/runs/{run_id}", response_model=FullRunResponse)
async def get_full_run(run_id: str, db: Session = Depends(get_db)):
    """Retrieve full startup analysis data"""
    run = db.query(StartupRunModel).filter(StartupRunModel.run_id == run_id).first()
    if not run:
        raise HTTPException(status_code=404, detail="Run ID not found")

    stage_data = json.loads(run.stage_outputs_json or "{}")
    blueprint_data = json.loads(run.final_blueprint_json or "{}")
    kill_data = json.loads(run.kill_mode_json or "{}")

    return FullRunResponse(
        run_id=run.run_id,
        startup_idea=run.startup_idea,
        status=run.status,
        current_stage=run.current_stage,
        idea_analyst=IdeaAnalystOutput(**stage_data["idea_analyst"]) if "idea_analyst" in stage_data else None,
        market_researcher=MarketResearcherOutput(**stage_data["market_researcher"]) if "market_researcher" in stage_data else None,
        customer_validator=CustomerValidatorOutput(**stage_data["customer_validator"]) if "customer_validator" in stage_data else None,
        business_mvp=BusinessMVPOutput(**stage_data["business_mvp"]) if "business_mvp" in stage_data else None,
        gtm_strategist=GTMStrategistOutput(**stage_data["gtm_strategist"]) if "gtm_strategist" in stage_data else None,
        blueprint_v1=StartupBlueprintV1(**blueprint_data) if blueprint_data else None,
        kill_mode=KillModeResult(**kill_data) if kill_data else None,
        error=run.error
    )


@router.post("/runs/{run_id}/kill", response_model=KillModeResult)
async def run_kill_mode_endpoint(run_id: str, db: Session = Depends(get_db)):
    """Run Kill My Startup adversarial loop"""
    run = db.query(StartupRunModel).filter(StartupRunModel.run_id == run_id).first()
    if not run:
        raise HTTPException(status_code=404, detail="Run ID not found")
    
    if run.status != "completed" or not run.final_blueprint_json:
        raise HTTPException(status_code=400, detail="Blueprint V1 must be completed before running Kill Mode")

    blueprint_v1 = StartupBlueprintV1(**json.loads(run.final_blueprint_json))
    
    run.current_stage = "Kill Mode: Critics Operating"
    db.commit()

    kill_result = await orchestrator.run_kill_mode(blueprint_v1)

    run.kill_mode_json = json.dumps(kill_result.model_dump())
    run.version_2_json = json.dumps(kill_result.version_2.model_dump())
    run.current_stage = "Version 2 Rebuilt"
    db.commit()

    return kill_result


@router.get("/runs/{run_id}/version-compare", response_model=VersionCompareResponse)
async def get_version_compare(run_id: str, db: Session = Depends(get_db)):
    """Compare original and rebuilt startup"""
    run = db.query(StartupRunModel).filter(StartupRunModel.run_id == run_id).first()
    if not run:
        raise HTTPException(status_code=404, detail="Run ID not found")

    if not run.kill_mode_json:
        raise HTTPException(status_code=400, detail="Kill Mode has not been executed for this run yet")

    blueprint_v1 = StartupBlueprintV1(**json.loads(run.final_blueprint_json))
    kill_data = KillModeResult(**json.loads(run.kill_mode_json))

    return VersionCompareResponse(
        run_id=run.run_id,
        version_1_score=blueprint_v1.score.overall,
        version_2_score=kill_data.version_2.new_score.overall,
        score_delta=kill_data.score_improvement,
        version_1_overview=blueprint_v1.overview,
        version_2_positioning=kill_data.version_2.positioning,
        fixes_applied=kill_data.version_2.fixes_applied,
        changes_summary=kill_data.version_2.changes_summary,
        remaining_risks=kill_data.version_2.remaining_risks
    )


@router.get("/health")
async def health_check():
    return {"status": "ok", "app": "VentureForge 2.0", "lyzr_mcp_installed": True}
