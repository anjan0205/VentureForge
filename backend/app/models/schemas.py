from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

# --- Evidence & Source Models ---
class EvidenceItem(BaseModel):
    claim: str
    status: str  # FACT, INFERENCE, ASSUMPTION, UNKNOWN
    source_title: Optional[str] = None
    source_url: Optional[str] = None

class ResearchResult(BaseModel):
    query: str
    evidence: List[EvidenceItem] = []
    limitations: List[str] = []

# --- Stage 1: Idea Analyst Output ---
class IdeaAnalystOutput(BaseModel):
    refined_idea: str
    problem_statement: str
    target_customer: str
    initial_segment: str
    proposed_solution: str
    value_proposition: str
    existing_alternatives: List[str] = []
    key_assumptions: List[str] = []
    major_risks: List[str] = []
    opportunity_score: int = 70

# --- Stage 2: Market Researcher Output ---
class CompetitorInfo(BaseModel):
    name: str
    type: str  # Direct, Indirect, Substitute
    what_they_do: str
    strength: str
    weakness: str
    evidence_status: str = "FACT"
    source: Optional[str] = None

class MarketResearcherOutput(BaseModel):
    market_description: str
    target_segment: str
    market_stage: str
    competitors: List[CompetitorInfo] = []
    alternatives: List[str] = []
    trends: List[str] = []
    market_gaps: List[str] = []
    evidence: List[EvidenceItem] = []
    research_limitations: List[str] = []

# --- Stage 3: Customer Validator Output ---
class ValidationExperiment(BaseModel):
    experiment: str
    hypothesis: str
    duration: str
    success_metric: str

class CustomerValidatorOutput(BaseModel):
    primary_customer: str
    secondary_customer: Optional[str] = None
    pain_points: List[str] = []
    pain_severity: int = 70  # 0-100
    existing_behavior: List[str] = []
    switching_barriers: List[str] = []
    willingness_to_pay_status: str  # FACT, INFERENCE, ASSUMPTION, UNKNOWN
    willingness_to_pay_reason: str
    unverified_assumptions: List[str] = []
    validation_experiments: List[ValidationExperiment] = []
    validation_score: int = 65

# --- Stage 4: Business/MVP Strategist Output ---
class FeatureList(BaseModel):
    must_have: List[str] = []
    should_have: List[str] = []
    future: List[str] = []

class TechStack(BaseModel):
    frontend: str = "React"
    backend: str = "FastAPI"
    database: str = "PostgreSQL"
    ai_model: str = "Lyzr ADK / Fast LLM API"

class BusinessMVPOutput(BaseModel):
    recommended_business_model: str
    monetization_reason: str
    pricing_strategy_free: str
    pricing_strategy_premium: str
    initial_price: str
    revenue_streams: List[str] = []
    mvp_features: FeatureList
    recommended_stack: TechStack
    build_difficulty: str  # Low, Moderate, High, Complex

# --- Stage 5: GTM Strategist Output ---
class First100UserStrategy(BaseModel):
    target: str
    channel: str
    message: str
    offer: str
    expected_action: str

class RoadmapTask(BaseModel):
    week: int
    task: str
    priority: str
    outcome: str

class GTMStrategistOutput(BaseModel):
    name_options: List[str] = []
    recommended_name: str
    tagline: str
    elevator_pitch: str
    first_100_users_strategy: List[First100UserStrategy] = []
    launch_channels: List[str] = []
    roadmap: List[RoadmapTask] = []

# --- Score Breakdown ---
class ViabilityScore(BaseModel):
    market_attractiveness: int = 70  # weight 15%
    problem_severity: int = 70       # weight 15%
    competition: int = 65            # weight 10%
    differentiation: int = 70        # weight 15%
    monetization: int = 60           # weight 10%
    feasibility: int = 75            # weight 15%
    go_to_market: int = 70           # weight 10%
    defensibility: int = 60          # weight 10%
    overall: int = 68
    reasoning: str

# --- Stage 6: Startup Synthesizer Output (Version 1 Blueprint) ---
class StartupBlueprintV1(BaseModel):
    overview: str
    why_it_could_work: List[str] = []
    competitive_landscape_differentiation: str
    business_model_summary: str
    mvp_core_features: List[str] = []
    go_to_market_primary_channel: str
    risks: List[str] = []
    score: ViabilityScore

# --- Kill Mode: Critic Outputs ---
class CriticalRisk(BaseModel):
    problem: str
    why_it_matters: str
    severity: int  # 1-10

class CriticOutput(BaseModel):
    perspective: str  # VC, Customer, Competitor
    overall_assessment: str
    strengths: List[str] = []
    weaknesses: List[str] = []
    critical_risks: List[CriticalRisk] = []
    recommendations: List[str] = []

# --- Kill Mode: Judge Output ---
class TopWeakness(BaseModel):
    problem: str
    severity: int
    reason: str

class PriorityFix(BaseModel):
    problem: str
    fix: str

class JudgeOutput(BaseModel):
    survival_score: int
    classification: str  # 🔴, 🟡, 🟢
    top_weaknesses: List[TopWeakness] = []
    accepted_critiques: List[str] = []
    rejected_critiques: List[str] = []
    priority_fixes: List[PriorityFix] = []

# --- Kill Mode: Rebuild Output (Version 2 Blueprint) ---
class Version2Blueprint(BaseModel):
    positioning: str
    business_model: str
    mvp_changes: List[str] = []
    gtm_changes: List[str] = []
    changes_summary: List[str] = []
    fixes_applied: List[str] = []
    remaining_risks: List[str] = []
    new_score: ViabilityScore

class KillModeResult(BaseModel):
    original_score: int
    vc_critic: CriticOutput
    customer_critic: CriticOutput
    competitor_critic: CriticOutput
    judge: JudgeOutput
    version_2: Version2Blueprint
    score_improvement: int
    remaining_risks: List[str] = []

# --- API Endpoints Payload Schemas ---
class GenerateRequest(BaseModel):
    idea: str = Field(..., min_length=5, description="Raw startup idea entered by the user")

class RunStatusResponse(BaseModel):
    run_id: str
    status: str  # pending, running, completed, failed
    current_stage: str
    error: Optional[str] = None

class FullRunResponse(BaseModel):
    run_id: str
    startup_idea: str
    status: str
    current_stage: str
    idea_analyst: Optional[IdeaAnalystOutput] = None
    market_researcher: Optional[MarketResearcherOutput] = None
    customer_validator: Optional[CustomerValidatorOutput] = None
    business_mvp: Optional[BusinessMVPOutput] = None
    gtm_strategist: Optional[GTMStrategistOutput] = None
    blueprint_v1: Optional[StartupBlueprintV1] = None
    kill_mode: Optional[KillModeResult] = None
    error: Optional[str] = None

class VersionCompareResponse(BaseModel):
    run_id: str
    version_1_score: int
    version_2_score: int
    score_delta: int
    version_1_overview: str
    version_2_positioning: str
    fixes_applied: List[str] = []
    changes_summary: List[str] = []
    remaining_risks: List[str] = []
