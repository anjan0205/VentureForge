import React, { useState } from 'react';
import { FullRunData } from '../types';
import { ScoreGauge } from './ScoreGauge';
import { 
  FileText, Search, Users, Briefcase, Rocket, Flame, 
  CheckCircle, AlertTriangle, ExternalLink, Crosshair, ArrowRight
} from 'lucide-react';

interface BlueprintDashboardProps {
  data: FullRunData;
  onTriggerKillMode: () => void;
  isKilling: boolean;
  onOpenEvidence: () => void;
}

export const BlueprintDashboard: React.FC<BlueprintDashboardProps> = ({
  data,
  onTriggerKillMode,
  isKilling,
  onOpenEvidence
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'market' | 'customer' | 'business' | 'gtm'>('summary');

  const {
    idea_analyst,
    market_researcher,
    customer_validator,
    business_mvp,
    gtm_strategist,
    blueprint_v1
  } = data;

  if (!blueprint_v1) return null;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-6">
      {/* Top Banner & Strategic Actions */}
      <div className="obsidian-panel p-6 sm:p-7 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-obsidian-900 via-obsidian-900 to-emerald-950/30">
        <div className="space-y-2">
          <div className="flex items-center space-x-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase">
              V1 Blueprint Synthesized
            </span>
            <button
              onClick={onOpenEvidence}
              className="px-2.5 py-0.5 rounded-full bg-obsidian-950 border border-white/10 text-slate-300 hover:text-white text-xs font-mono flex items-center space-x-1.5 transition"
            >
              <span>Evidence Ledger ({market_researcher?.evidence.length || 0})</span>
              <ExternalLink className="w-3 h-3 text-cyanTeal-400" />
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            {gtm_strategist?.recommended_name || "Venture Blueprint"}
          </h2>
          <p className="text-slate-400 text-sm italic font-sans max-w-2xl">
            "{gtm_strategist?.tagline || blueprint_v1.overview}"
          </p>
        </div>

        {/* Kill Mode Trigger Button */}
        <div className="flex flex-col items-start md:items-end space-y-1.5 shrink-0">
          <button
            onClick={onTriggerKillMode}
            disabled={isKilling}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-crimson-600 via-crimson-500 to-amethyst-600 hover:from-crimson-500 hover:to-amethyst-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-crimson-600/20 hover:shadow-crimson-600/35 transition flex items-center justify-center space-x-2 border border-crimson-500/30 disabled:opacity-50"
          >
            <Flame className="w-4 h-4 text-amber-200" />
            <span>{isKilling ? 'Critics Auditing Thesis...' : 'Deploy Adversarial Stress-Test'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-mono text-slate-400">
            Adversarial VC, Enterprise Buyer & Incumbent Audit
          </span>
        </div>
      </div>

      {/* Startup Viability Score Gauge */}
      <ScoreGauge score={blueprint_v1.score} />

      {/* Navigation Tabs */}
      <div className="flex border-b border-white/10 overflow-x-auto no-scrollbar space-x-1 font-mono text-xs">
        {[
          { id: 'summary', label: 'Executive Thesis', icon: FileText },
          { id: 'market', label: 'Market Recon', icon: Search },
          { id: 'customer', label: 'Customer Friction', icon: Users },
          { id: 'business', label: 'Unit Economics', icon: Briefcase },
          { id: 'gtm', label: 'GTM Playbook', icon: Rocket }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 font-bold flex items-center space-x-2 border-b-2 transition whitespace-nowrap ${
                isActive
                  ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10 rounded-t-lg'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      <div className="obsidian-panel p-6 sm:p-7 rounded-2xl border border-white/10 space-y-6">
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-2">
                <Crosshair className="w-4 h-4 text-emerald-400" />
                <span>Executive Thesis & Positioning</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed bg-obsidian-950/70 p-4 rounded-xl border border-white/[0.08]">
                {gtm_strategist?.elevator_pitch || blueprint_v1.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2.5">
                <h4 className="font-mono font-bold text-xs uppercase text-emerald-400 flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Key Value Drivers</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {blueprint_v1.why_it_could_work.map((item, idx) => (
                    <li key={idx} className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 leading-relaxed">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2.5">
                <h4 className="font-mono font-bold text-xs uppercase text-crimson-400 flex items-center space-x-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Strategic Vulnerabilities</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {blueprint_v1.risks.map((item, idx) => (
                    <li key={idx} className="p-3 rounded-xl bg-crimson-500/5 border border-crimson-500/20 leading-relaxed">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'market' && market_researcher && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">Competitive Intelligence Landscape</h3>
              <p className="text-xs text-slate-400">{market_researcher.market_description}</p>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {market_researcher.competitors.map((comp, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-obsidian-950/70 border border-white/[0.08] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-slate-100">{comp.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyanTeal-500/10 text-cyanTeal-300 border border-cyanTeal-500/30 uppercase">
                      {comp.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{comp.what_they_do}</p>
                  <div className="grid grid-cols-2 gap-3 text-xs pt-2.5 border-t border-white/[0.06] font-mono">
                    <div className="text-emerald-400"><span className="text-slate-500">MOAT:</span> {comp.strength}</div>
                    <div className="text-crimson-400"><span className="text-slate-500">VULNERABILITY:</span> {comp.weakness}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'customer' && customer_validator && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2.5">
                <h4 className="font-mono font-bold text-xs uppercase text-emerald-400">Customer Pain Mechanics</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {customer_validator.pain_points.map((pain, idx) => (
                    <li key={idx} className="p-3 rounded-xl bg-obsidian-950/70 border border-white/[0.08] leading-relaxed">
                      ⚠️ {pain}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2.5">
                <h4 className="font-mono font-bold text-xs uppercase text-emerald-400">Verification Experiments</h4>
                <div className="space-y-2">
                  {customer_validator.validation_experiments.map((exp, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-obsidian-950/70 border border-white/[0.08] space-y-1.5 text-xs">
                      <div className="font-bold text-slate-200">{exp.experiment}</div>
                      <div className="text-slate-400">Hypothesis: {exp.hypothesis}</div>
                      <div className="text-emerald-400 font-mono text-[11px]">Metric: {exp.success_metric} ({exp.duration})</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'business' && business_mvp && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-4.5 rounded-xl bg-obsidian-950/70 border border-white/[0.08] space-y-3 text-xs">
                <h4 className="font-mono font-bold text-xs uppercase text-emerald-400">Monetization Engine</h4>
                <div><span className="text-slate-400">Model:</span> <span className="text-slate-200 font-semibold">{business_mvp.recommended_business_model}</span></div>
                <div><span className="text-slate-400">Free Tier:</span> <span className="text-slate-300">{business_mvp.pricing_strategy_free}</span></div>
                <div><span className="text-slate-400">Paid/Pro Tier:</span> <span className="text-slate-300">{business_mvp.pricing_strategy_premium}</span></div>
              </div>

              <div className="p-4.5 rounded-xl bg-obsidian-950/70 border border-white/[0.08] space-y-2.5 text-xs">
                <h4 className="font-mono font-bold text-xs uppercase text-emerald-400">MVP Core Feature Scope</h4>
                <ul className="space-y-1.5 text-slate-300">
                  {business_mvp.mvp_features.must_have.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold">›</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gtm' && gtm_strategist && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-mono font-bold text-xs uppercase text-emerald-400">First 100 Customer Acquisition Playbook</h4>
              {gtm_strategist.first_100_users_strategy.map((strat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-obsidian-950/70 border border-white/[0.08] space-y-1.5 text-xs">
                  <div><span className="text-slate-400 font-mono">CHANNEL:</span> <strong className="text-slate-200">{strat.channel}</strong></div>
                  <div><span className="text-slate-400 font-mono">HOOK:</span> <span className="text-slate-300 italic">"{strat.message}"</span></div>
                  <div><span className="text-slate-400 font-mono">OFFER:</span> <span className="text-emerald-400">{strat.offer}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
