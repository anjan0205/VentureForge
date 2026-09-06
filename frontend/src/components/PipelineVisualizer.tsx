import React from 'react';
import { 
  FileText, Search, Users, Briefcase, Rocket, Sparkles, 
  CheckCircle2, Loader2, AlertCircle, Activity
} from 'lucide-react';

interface PipelineVisualizerProps {
  currentStage: string;
  status: string;
  error?: string;
}

const STAGES = [
  { id: 1, label: "Idea Analyst", role: "Hypothesis Decomposition", icon: FileText, description: "Extracts customer profile, problem severity, value proposition, and underlying assumptions." },
  { id: 2, label: "Market Researcher", role: "Competitive Reconnaissance", icon: Search, description: "Performs live web queries, indexes competitors, identifies feature parity & white spaces." },
  { id: 3, label: "Customer Validator", role: "Friction & Willingness-to-Pay", icon: Users, description: "Evaluates pain intensity, workflow inertia, pricing sensitivity, and validation experiments." },
  { id: 4, label: "Business MVP", role: "Unit Economics & Tech Scope", icon: Briefcase, description: "Defines monetization models, pricing tiers, core feature boundaries, and architecture." },
  { id: 5, label: "GTM Strategist", role: "Acquisition Architecture", icon: Rocket, description: "Engineers positioning narrative, elevator thesis, first 100-customer channel playbook." },
  { id: 6, label: "Venture Synthesizer", role: "Viability Scoring Synthesis", icon: Sparkles, description: "Synthesizes multi-agent findings and computes deterministic weighted viability score." }
];

export const PipelineVisualizer: React.FC<PipelineVisualizerProps> = ({ currentStage, status, error }) => {
  const getStageState = (stageLabel: string, index: number) => {
    if (status === 'completed') return 'completed';
    if (status === 'failed') return 'failed';
    
    if (currentStage.includes(stageLabel)) return 'active';
    
    const stageIndexMap: { [key: string]: number } = {
      'Idea Analyst': 0,
      'Market Researcher': 1,
      'Customer Validator': 2,
      'Business/MVP': 3,
      'GTM Strategist': 4,
      'Startup Synthesizer': 5,
      'Venture Synthesizer': 5,
      'Blueprint V1 Ready': 6
    };

    let activeIdx = 0;
    for (const [key, val] of Object.entries(stageIndexMap)) {
      if (currentStage.includes(key)) {
        activeIdx = val;
        break;
      }
    }

    if (index < activeIdx) return 'completed';
    return 'pending';
  };

  const calculateProgressPercent = () => {
    if (status === 'completed') return 100;
    if (currentStage.includes('Idea Analyst')) return 16;
    if (currentStage.includes('Market Researcher')) return 33;
    if (currentStage.includes('Customer Validator')) return 50;
    if (currentStage.includes('Business/MVP')) return 66;
    if (currentStage.includes('GTM Strategist')) return 83;
    if (currentStage.includes('Synthesizer') || currentStage.includes('Startup Synthesizer')) return 95;
    return 8;
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 space-y-8">
      {/* Header Telemetry Banner */}
      <div className="obsidian-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 text-center relative overflow-hidden shadow-2xl">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Lyzr ADK Consensus Pipeline Active</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Autonomous Venture Assembly
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Sequential orchestration of 6 specialized domain agents
          </p>
        </div>

        {/* Linear Progress Bar */}
        <div className="max-w-xl mx-auto space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">STAGE: <span className="text-emerald-400 font-bold">{currentStage}</span></span>
            <span className="text-cyanTeal-400 font-bold">{calculateProgressPercent()}%</span>
          </div>
          <div className="w-full h-2.5 bg-obsidian-950 rounded-full overflow-hidden border border-white/10 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-cyanTeal-500 to-amethyst-500 rounded-full transition-all duration-300 shadow-md shadow-emerald-500/30"
              style={{ width: `${calculateProgressPercent()}%` }}
            />
          </div>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-crimson-500/10 border border-crimson-500/30 text-crimson-400 flex items-center justify-center space-x-2 text-xs font-mono">
            <AlertCircle className="w-4 h-4 shrink-0 text-crimson-400" />
            <span>Execution Exception: {error}</span>
          </div>
        )}
      </div>

      {/* Grid of Stage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STAGES.map((stage, idx) => {
          const state = getStageState(stage.label, idx);
          const Icon = stage.icon;

          return (
            <div
              key={stage.id}
              className={`obsidian-panel p-4.5 rounded-xl border transition-all duration-200 flex items-start space-x-3.5 ${
                state === 'active'
                  ? 'border-emerald-500/80 bg-obsidian-850 glow-emerald ring-1 ring-emerald-500/30'
                  : state === 'completed'
                  ? 'border-cyanTeal-500/40 bg-obsidian-900/80'
                  : 'border-white/10 opacity-50 bg-obsidian-950/40'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                  state === 'active'
                    ? 'bg-emerald-500 text-obsidian-950 border-emerald-400 font-bold shadow-lg shadow-emerald-500/30 animate-pulse'
                    : state === 'completed'
                    ? 'bg-cyanTeal-500/20 text-cyanTeal-300 border-cyanTeal-500/40'
                    : 'bg-obsidian-950 text-slate-500 border-white/10'
                }`}
              >
                {state === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5 text-cyanTeal-400" />
                ) : state === 'active' ? (
                  <Loader2 className="w-5 h-5 text-obsidian-950 animate-spin" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono text-slate-500 font-bold">0{stage.id}</span>
                    <h4 className="font-bold text-sm text-slate-200">{stage.label}</h4>
                  </div>
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    state === 'active'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : state === 'completed'
                      ? 'bg-cyanTeal-500/10 text-cyanTeal-300 border border-cyanTeal-500/20'
                      : 'bg-white/5 text-slate-500'
                  }`}>
                    {state}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-cyanTeal-400">{stage.role}</div>
                <p className="text-xs text-slate-400 leading-relaxed pt-0.5">{stage.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
