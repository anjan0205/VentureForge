import React from 'react';
import { ViabilityScore } from '../types';
import { BarChart3, Info } from 'lucide-react';

interface ScoreGaugeProps {
  score: ViabilityScore;
  title?: string;
}

const DIMENSIONS = [
  { key: 'market_attractiveness', label: 'Market Attractiveness', weight: '15%' },
  { key: 'problem_severity', label: 'Problem Severity', weight: '15%' },
  { key: 'competition', label: 'Competitive Defensibility', weight: '10%' },
  { key: 'differentiation', label: 'Value Differentiation', weight: '15%' },
  { key: 'monetization', label: 'Monetization Potential', weight: '10%' },
  { key: 'feasibility', label: 'Technical Feasibility', weight: '15%' },
  { key: 'go_to_market', label: 'Go-To-Market Velocity', weight: '10%' },
  { key: 'defensibility', label: 'Long-Term Moat', weight: '10%' },
];

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, title = "Venture Viability Matrix" }) => {
  const getScoreColor = (val: number) => {
    if (val >= 75) return 'text-emerald-400 bg-emerald-500';
    if (val >= 60) return 'text-cyanTeal-400 bg-cyanTeal-500';
    return 'text-crimson-400 bg-crimson-500';
  };

  return (
    <div className="obsidian-panel p-6 rounded-2xl border border-white/10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-5 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-lg font-bold text-white font-heading">{title}</h3>
          </div>
          <p className="text-xs font-mono text-slate-400">
            Deterministic weighted synthesis across 8 strategic dimensions (0-100 scale).
          </p>
        </div>

        {/* Circular Overall Score Card */}
        <div className="flex items-center space-x-3.5 bg-obsidian-950 p-3.5 px-4 rounded-xl border border-white/10 self-start md:self-auto font-mono">
          <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-obsidian-900 border border-white/10">
            <span className={`text-xl font-extrabold ${getScoreColor(score.overall).split(' ')[0]}`}>
              {score.overall}
            </span>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Composite Viability</div>
            <div className="text-xs font-bold text-slate-200">
              {score.overall >= 75 ? '🟢 High Conviction' : score.overall >= 60 ? '🟡 Moderate Risk' : '🔴 Critical Vulnerability'}
            </div>
          </div>
        </div>
      </div>

      {/* Reasoning Note */}
      {score.reasoning && (
        <div className="p-3.5 rounded-xl bg-obsidian-950/70 border border-white/[0.08] text-xs text-slate-300 flex items-start space-x-2.5 font-sans leading-relaxed">
          <Info className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
          <span>{score.reasoning}</span>
        </div>
      )}

      {/* Grid of Dimension Progress Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {DIMENSIONS.map((dim) => {
          const val = (score as any)[dim.key] || 0;
          const colorClass = getScoreColor(val);
          const barBg = colorClass.split(' ')[1];
          const textColor = colorClass.split(' ')[0];

          return (
            <div key={dim.key} className="space-y-1.5 p-3 rounded-xl bg-obsidian-950/70 border border-white/[0.06]">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-slate-300">{dim.label}</span>
                <div className="flex items-center space-x-1.5 font-mono">
                  <span className="text-[10px] text-slate-500">({dim.weight})</span>
                  <span className={`font-bold ${textColor}`}>{val}/100</span>
                </div>
              </div>

              <div className="w-full h-2 bg-obsidian-900 rounded-full overflow-hidden border border-white/5">
                <div
                  className={`h-full ${barBg} transition-all duration-300 rounded-full shadow-sm`}
                  style={{ width: `${val}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
