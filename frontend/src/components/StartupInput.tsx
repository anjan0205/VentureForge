import React, { useState } from 'react';
import { 
  ArrowRight, ShieldCheck, Zap, Database, Crosshair, 
  Terminal, ChevronRight, Cpu, Sparkles
} from 'lucide-react';

interface StartupInputProps {
  onSubmit: (idea: string) => void;
  isLoading: boolean;
}

const BENCHMARK_CASES = [
  {
    title: "FinTech Compliance Copilot",
    sector: "Enterprise B2B",
    stage: "Seed Audit",
    idea: "An automated real-time SOC2 and AML compliance auditing agent for mid-market fintechs, parsing code commits and AWS infrastructure diffs automatically."
  },
  {
    title: "HackMate Engineering Network",
    sector: "Developer Platform",
    stage: "PMF Validation",
    idea: "A compatibility-based engineering teammate matching protocol for hackathons and builder communities, matching on verified GitHub commits, timezone availability, and role synergy."
  },
  {
    title: "Micro-SaaS Programmatic Foundry",
    sector: "Venture Engine",
    stage: "Unit Economics",
    idea: "A programmatic studio pairing solo technical builders with domain-specific sales operators to co-build, validate, and launch $2k MRR niche vertical SaaS tools in 30 days."
  }
];

export const StartupInput: React.FC<StartupInputProps> = ({ onSubmit, isLoading }) => {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onSubmit(idea);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-5 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold tracking-wide shadow-lg shadow-emerald-500/10">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Venture Verification • Adversarial Stress-Test • Version 2 Rebuild</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-heading">
          Stress-test your venture thesis <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyanTeal-400 to-amethyst-400">
            before the market kills it.
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Generic AI tools give polite summaries. <strong className="text-white">VentureForge</strong> is an institutional war-room decision engine: it conducts live competitor reconnaissance, benchmarks unit economics, deploys 3 ruthless adversarial critics, and reconstructs a hardened <strong className="text-emerald-400">Version 2 Architecture</strong>.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 font-mono">
          <div className="telemetry-chip text-emerald-400 border-emerald-500">
            6-Stage Lyzr Consensus Pipeline
          </div>
          <div className="telemetry-chip text-crimson-400 border-crimson-500">
            Adversarial Kill Protocol
          </div>
          <div className="telemetry-chip text-cyanTeal-400 border-cyanTeal-500">
            8D Weighted Matrix Radar
          </div>
        </div>
      </div>

      {/* Main Intake Terminal */}
      <form onSubmit={handleSubmit} className="obsidian-panel p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl space-y-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10 group-hover:bg-emerald-500/10 transition duration-500"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <label className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
              Venture Thesis & Execution Parameters
            </label>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {idea.length} characters typed • UTF-8
          </span>
        </div>

        <div className="space-y-2">
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Define the target customer segment, core problem hypothesis, proprietary value mechanism, pricing tier structure, and initial go-to-market vector..."
            rows={5}
            className="w-full bg-obsidian-950/90 text-slate-100 border border-white/10 focus:border-emerald-500 rounded-xl p-4 sm:p-5 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 placeholder-slate-500 text-sm sm:text-base leading-relaxed resize-none transition duration-150 font-sans shadow-inner"
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs font-mono text-slate-400 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Ground truth web research • 8-dimensional weighted scoring</span>
          </div>

          <button
            type="submit"
            disabled={isLoading || !idea.trim()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-cyanTeal-600 hover:from-emerald-400 hover:to-cyanTeal-500 text-obsidian-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center space-x-2.5 active:scale-[0.99]"
          >
            <span>{isLoading ? 'Executing ADK Consensus Pipeline...' : 'Initiate Venture Audit'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Preset Reference Case Studies */}
      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-400">
            Or Load Benchmark Case Study
          </span>
          <span className="text-slate-500">3 Presets Available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {BENCHMARK_CASES.map((preset, idx) => (
            <div
              key={idx}
              onClick={() => setIdea(preset.idea)}
              className="obsidian-card p-5 rounded-xl border border-white/10 hover:border-emerald-500/40 cursor-pointer transition duration-200 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {preset.sector}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {preset.stage}
                  </span>
                </div>
                <h4 className="font-bold text-slate-100 text-sm group-hover:text-emerald-300 transition">
                  {preset.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {preset.idea}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-medium group-hover:text-emerald-400">
                <span className="font-mono text-[11px]">Load Parameters</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
