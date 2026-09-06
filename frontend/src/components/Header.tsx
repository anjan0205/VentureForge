import React from 'react';
import { RefreshCw, Terminal, Sparkles, Activity } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  runId?: string;
}

export const Header: React.FC<HeaderProps> = ({ onReset, runId }) => {
  return (
    <header className="sticky top-0 z-40 w-full obsidian-panel border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xl">
      {/* Brand & Identity */}
      <div className="flex items-center space-x-3.5 cursor-pointer group" onClick={onReset}>
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 via-cyanTeal-500/20 to-amethyst-500/20 flex items-center justify-center border border-emerald-500/40 shadow-inner group-hover:border-emerald-400 transition duration-300">
            <Sparkles className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition duration-300" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-obsidian-950 rounded-full flex items-center justify-center border border-emerald-500/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2.5">
            <span className="text-xl font-extrabold tracking-tight text-white font-heading">
              Venture<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyanTeal-400">Forge</span>
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
              Consensus 4.0 PRO
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium flex items-center space-x-1.5">
            <span>Institutional Venture Engine</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyanTeal-400 font-semibold">Lyzr ADK Multi-Agent Core</span>
          </p>
        </div>
      </div>

      {/* Right Controls & Telemetry */}
      <div className="flex items-center space-x-3">
        {runId && (
          <div className="hidden lg:flex items-center space-x-2 text-xs font-mono bg-obsidian-950 px-3 py-1.5 rounded-lg border border-white/10 text-slate-300">
            <Terminal className="w-3.5 h-3.5 text-cyanTeal-400" />
            <span className="text-slate-500">SESSION:</span>
            <span className="text-emerald-300 font-semibold">{runId.slice(0, 10).toUpperCase()}</span>
          </div>
        )}

        {/* Real-time Telemetry Status */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="hidden sm:inline">Lyzr ADK Connected</span>
          <span className="sm:hidden">ADK Live</span>
        </div>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-obsidian-850 hover:bg-obsidian-800 text-slate-200 border border-white/10 hover:border-emerald-500/40 transition flex items-center space-x-1.5 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">New Audit</span>
        </button>
      </div>
    </header>
  );
};
