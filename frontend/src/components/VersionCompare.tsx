import React from 'react';
import { FullRunData } from '../types';
import { TrendingUp, ArrowRight, ShieldCheck, CheckCircle2, Layers } from 'lucide-react';

interface VersionCompareProps {
  data: FullRunData;
}

export const VersionCompare: React.FC<VersionCompareProps> = ({ data }) => {
  const { blueprint_v1, kill_mode } = data;

  if (!blueprint_v1 || !kill_mode) return null;

  const v1Score = blueprint_v1.score.overall;
  const v2Score = kill_mode.version_2.new_score.overall;
  const scoreDelta = kill_mode.score_improvement;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-6">
      {/* Header Banner */}
      <div className="obsidian-panel p-6 sm:p-8 rounded-2xl border border-white/10 text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyanTeal-500/10 border border-cyanTeal-500/30 text-cyanTeal-400 text-xs font-mono font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>V1 Strategy vs V2 Hardened Architecture</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
          Venture Evolution Delta
        </h2>

        {/* Score Delta Highlight */}
        <div className="inline-flex items-center space-x-4 bg-obsidian-950 px-6 py-3 rounded-xl border border-white/10">
          <div className="text-center font-mono">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Version 1</div>
            <div className="text-xl sm:text-2xl font-bold text-slate-300">{v1Score}/100</div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-500" />
          <div className="text-center font-mono">
            <div className="text-[10px] text-emerald-400 font-bold uppercase">Version 2 Rebuilt</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{v2Score}/100</div>
          </div>
          <div className="pl-4 border-l border-white/10 flex items-center space-x-1 text-emerald-400 font-mono font-bold text-base sm:text-lg">
            <TrendingUp className="w-4 h-4" />
            <span>+{scoreDelta} pts</span>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Version 1 Card */}
        <div className="obsidian-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-white/10">
            <h3 className="font-bold text-base text-slate-200 font-mono">Version 1: Raw Formulation</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10 uppercase">
              Baseline
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <strong className="text-slate-400 block mb-1 font-mono text-[11px]">Core Value Proposition:</strong>
              <p className="text-slate-300 p-3.5 rounded-xl bg-obsidian-950/80 border border-white/[0.06] leading-relaxed">
                {blueprint_v1.overview}
              </p>
            </div>

            <div>
              <strong className="text-slate-400 block mb-1 font-mono text-[11px]">Monetization Baseline:</strong>
              <p className="text-slate-300 p-3.5 rounded-xl bg-obsidian-950/80 border border-white/[0.06] leading-relaxed">
                {blueprint_v1.business_model_summary}
              </p>
            </div>

            <div>
              <strong className="text-slate-400 block mb-1 font-mono text-[11px]">Primary Distribution Channel:</strong>
              <p className="text-slate-300 p-3.5 rounded-xl bg-obsidian-950/80 border border-white/[0.06] leading-relaxed">
                {blueprint_v1.go_to_market_primary_channel}
              </p>
            </div>
          </div>
        </div>

        {/* Version 2 Card */}
        <div className="obsidian-panel p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-white/10">
            <h3 className="font-bold text-base text-white flex items-center space-x-2 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Version 2: Hardened System</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
              Stress-Tested
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <strong className="text-emerald-400 block mb-1 font-mono text-[11px]">Hardened Positioning:</strong>
              <p className="text-white p-3.5 rounded-xl bg-obsidian-950/80 border border-emerald-500/20 leading-relaxed">
                {kill_mode.version_2.positioning}
              </p>
            </div>

            <div>
              <strong className="text-emerald-400 block mb-1 font-mono text-[11px]">Engineered Business Mechanics:</strong>
              <p className="text-white p-3.5 rounded-xl bg-obsidian-950/80 border border-emerald-500/20 leading-relaxed">
                {kill_mode.version_2.business_model}
              </p>
            </div>

            <div>
              <strong className="text-emerald-400 block mb-1 font-mono text-[11px]">Structural Fixes Implemented:</strong>
              <ul className="space-y-1.5 text-slate-200 p-3.5 rounded-xl bg-obsidian-950/80 border border-emerald-500/20">
                {kill_mode.version_2.fixes_applied.map((fix, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{fix}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
