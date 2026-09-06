export interface EvidenceItem {
  claim: string;
  status: 'FACT' | 'INFERENCE' | 'ASSUMPTION' | 'UNKNOWN';
  source_title?: string;
  source_url?: string;
}

export interface IdeaAnalystOutput {
  refined_idea: string;
  problem_statement: string;
  target_customer: string;
  initial_segment: string;
  proposed_solution: string;
  value_proposition: string;
  existing_alternatives: string[];
  key_assumptions: string[];
  major_risks: string[];
  opportunity_score: number;
}

export interface CompetitorInfo {
  name: string;
  type: string;
  what_they_do: string;
  strength: string;
  weakness: string;
  evidence_status: string;
  source?: string;
}

export interface MarketResearcherOutput {
  market_description: string;
  target_segment: string;
  market_stage: string;
  competitors: CompetitorInfo[];
  alternatives: string[];
  trends: string[];
  market_gaps: string[];
  evidence: EvidenceItem[];
  research_limitations: string[];
}

export interface ValidationExperiment {
  experiment: string;
  hypothesis: string;
  duration: string;
  success_metric: string;
}

export interface CustomerValidatorOutput {
  primary_customer: string;
  secondary_customer?: string;
  pain_points: string[];
  pain_severity: number;
  existing_behavior: string[];
  switching_barriers: string[];
  willingness_to_pay_status: string;
  willingness_to_pay_reason: string;
  unverified_assumptions: string[];
  validation_experiments: ValidationExperiment[];
  validation_score: number;
}

export interface FeatureList {
  must_have: string[];
  should_have: string[];
  future: string[];
}

export interface TechStack {
  frontend: string;
  backend: string;
  database: string;
  ai_model: string;
}

export interface BusinessMVPOutput {
  recommended_business_model: string;
  monetization_reason: string;
  pricing_strategy_free: string;
  pricing_strategy_premium: string;
  initial_price: string;
  revenue_streams: string[];
  mvp_features: FeatureList;
  recommended_stack: TechStack;
  build_difficulty: string;
}

export interface First100UserStrategy {
  target: string;
  channel: string;
  message: string;
  offer: string;
  expected_action: string;
}

export interface RoadmapTask {
  week: number;
  task: string;
  priority: string;
  outcome: string;
}

export interface GTMStrategistOutput {
  name_options: string[];
  recommended_name: string;
  tagline: string;
  elevator_pitch: string;
  first_100_users_strategy: First100UserStrategy[];
  launch_channels: string[];
  roadmap: RoadmapTask[];
}

export interface ViabilityScore {
  market_attractiveness: number;
  problem_severity: number;
  competition: number;
  differentiation: number;
  monetization: number;
  feasibility: number;
  go_to_market: number;
  defensibility: number;
  overall: number;
  reasoning: string;
}

export interface StartupBlueprintV1 {
  overview: string;
  why_it_could_work: string[];
  competitive_landscape_differentiation: string;
  business_model_summary: string;
  mvp_core_features: string[];
  go_to_market_primary_channel: string;
  risks: string[];
  score: ViabilityScore;
}

export interface CriticalRisk {
  problem: string;
  why_it_matters: string;
  severity: number;
}

export interface CriticOutput {
  perspective: 'VC' | 'Customer' | 'Competitor';
  overall_assessment: string;
  strengths: string[];
  weaknesses: string[];
  critical_risks: CriticalRisk[];
  recommendations: string[];
}

export interface TopWeakness {
  problem: string;
  severity: number;
  reason: string;
}

export interface PriorityFix {
  problem: string;
  fix: string;
}

export interface JudgeOutput {
  survival_score: number;
  classification: string;
  top_weaknesses: TopWeakness[];
  accepted_critiques: string[];
  rejected_critiques: string[];
  priority_fixes: PriorityFix[];
}

export interface Version2Blueprint {
  positioning: string;
  business_model: string;
  mvp_changes: string[];
  gtm_changes: string[];
  changes_summary: string[];
  fixes_applied: string[];
  remaining_risks: string[];
  new_score: ViabilityScore;
}

export interface KillModeResult {
  original_score: number;
  vc_critic: CriticOutput;
  customer_critic: CriticOutput;
  competitor_critic: CriticOutput;
  judge: JudgeOutput;
  version_2: Version2Blueprint;
  score_improvement: number;
  remaining_risks: string[];
}

export interface FullRunData {
  run_id: string;
  startup_idea: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  current_stage: string;
  idea_analyst?: IdeaAnalystOutput;
  market_researcher?: MarketResearcherOutput;
  customer_validator?: CustomerValidatorOutput;
  business_mvp?: BusinessMVPOutput;
  gtm_strategist?: GTMStrategistOutput;
  blueprint_v1?: StartupBlueprintV1;
  kill_mode?: KillModeResult;
  error?: string;
}
