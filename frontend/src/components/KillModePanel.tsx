import React from 'react';
import { KillModeResult } from '../types';
import { Flame, ShieldAlert, Gavel, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { ScoreGauge } from './ScoreGauge';

interface KillModePanelProps {
  killResult: KillModeResult;
  onViewComparison: () => void;
}

export const KillModePanel: React.FC<KillModePanelProps> = ({ killResult, onViewComparison }) => {
  const { vc_critic, customer_critic, competitor_critic, judge, version_2 } = killResult;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      {/* Banner */}
      <div className="obsidian-panel p-6 sm:p-8 rounded-2xl border border-crimson-500/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-obsidian-900 via-obsidian-900 to-crimson-950/40">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-crimson-500/20 text-crimson-400 text-xs font-mono font-bold uppercase tracking-wider border border-crimson-500/30">
            <Flame className="w-3.5 h-3.5 text-crimson-400 animate-pulse" />
            <span>Adversarial Stress-Test Verdict</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Venture Kill Protocol Completed
          </h2>
          <p className="text-crimson-200/90 text-sm max-w-xl font-sans">
            Three independent adversarial agents attacked the original thesis. The Lead Partner Judge arbitrated valid criticisms to engineer a hardened <strong className="text-white">Version 2 Architecture</strong>.
          </p>
        </div>

        <button
          onClick={onViewComparison}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyanTeal-600 hover:from-emerald-400 hover:to-cyanTeal-500 text-obsidian-950 font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-500/20 transition flex items-center space-x-2 shrink-0 z-10 font-mono"
        >
          <span>Compare V1 vs V2 Evolution</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3 Critic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[vc_critic, customer_critic, competitor_critic].map((critic, idx) => (
          <div key={idx} className="obsidian-panel p-5 rounded-2xl border border-white/10 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="font-bold text-sm text-slate-100 flex items-center space-x-2 font-mono">
                  <ShieldAlert className="w-4 h-4 text-crimson-400" />
                  <span>{critic.perspective}</span>
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-crimson-500/10 text-crimson-400 border border-crimson-500/20 uppercase">
                  Adversary
                </span>
              </div>

              <p className="text-xs text-slate-300 italic leading-relaxed font-sans">
                "{critic.overall_assessment}"
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-crimson-400 block">
                  Critical Vulnerabilities
                </span>
                {critic.critical_risks.map((risk, rIdx) => (
                  <div key={rIdx} className="p-3 rounded-xl bg-crimson-500/10 border border-crimson-500/20 text-xs text-crimson-200 space-y-1">
                    <div className="font-bold flex items-center justify-between">
                      <span>• {risk.problem}</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-obsidian-950 text-crimson-300 rounded font-mono border border-crimson-500/30">
                        Sev {risk.severity}/10
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight pt-0.5 font-sans">{risk.why_it_matters}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Judge Decision Panel */}
      <div className="obsidian-panel p-6 sm:p-7 rounded-2xl border border-white/10 space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-amethyst-500/20 border border-amethyst-500/30 flex items-center justify-center text-amethyst-400">
            <Gavel className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-heading">Partner Review & Arbiter Verdict</h3>
            <p className="text-xs font-mono text-slate-400">Filters non-actionable noise to enforce structural pivots.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-mono font-bold text-xs uppercase text-emerald-400 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Prioritized Strategic Fixes</span>
            </h4>
            <div className="space-y-2">
              {judge.priority_fixes.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs space-y-1">
                  <div className="font-bold text-emerald-300">Vulnerability: {item.problem}</div>
                  <div className="text-slate-300 font-sans">Fix Applied: {item.fix}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-mono font-bold text-xs uppercase text-cyanTeal-400 flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Hardened Version 2 Architecture</span>
            </h4>
            <div className="p-4 rounded-xl bg-obsidian-950/70 border border-white/10 text-xs space-y-3">
              <div>
                <strong className="text-slate-200 block mb-1 font-mono text-[11px]">Hardened Positioning:</strong>
                <p className="text-slate-300 leading-relaxed font-sans">{version_2.positioning}</p>
              </div>
              <div>
                <strong className="text-slate-200 block mb-1 font-mono text-[11px]">Refined Business Mechanics:</strong>
                <p className="text-slate-300 leading-relaxed font-sans">{version_2.business_model}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recalculated Score Gauge */}
      <ScoreGauge score={version_2.new_score} title="Version 2 Rebuilt Viability Matrix" />
    </div>
  );
};
