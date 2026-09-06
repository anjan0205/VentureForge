import React from 'react';
import { EvidenceItem } from '../types';
import { X, ExternalLink, Database } from 'lucide-react';

interface EvidenceDrawerProps {
  evidence: EvidenceItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({ evidence, isOpen, onClose }) => {
  if (!isOpen) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'FACT':
        return <span className="telemetry-chip text-emerald-400 border-emerald-500">FACT</span>;
      case 'INFERENCE':
        return <span className="telemetry-chip text-cyanTeal-400 border-cyanTeal-500">INFERENCE</span>;
      case 'ASSUMPTION':
        return <span className="telemetry-chip text-amethyst-400 border-amethyst-500">ASSUMPTION</span>;
      default:
        return <span className="telemetry-chip text-slate-400 border-slate-600">UNKNOWN</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-obsidian-950/80 backdrop-blur-md flex justify-end font-sans">
      <div className="w-full max-w-md bg-obsidian-900 border-l border-white/10 h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <h3 className="text-base font-bold text-white font-heading">Evidence Ledger & Ground Truth</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-obsidian-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Every analytical claim in <strong className="text-white">VentureForge</strong> is strictly categorized as FACT, INFERENCE, or ASSUMPTION to eliminate ungrounded hallucinations.
          </p>

          <div className="space-y-3 text-xs">
            {evidence.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-obsidian-950 border border-white/[0.08] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-200">{item.source_title || "Reconnaissance Claim"}</span>
                  {getStatusBadge(item.status)}
                </div>

                <p className="text-slate-300 leading-relaxed font-sans">
                  "{item.claim}"
                </p>

                {item.source_url && (
                  <a
                    href={item.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-emerald-400 hover:underline text-[11px] font-mono pt-1"
                  >
                    <span>Inspect Raw Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-obsidian-800 hover:bg-obsidian-700 text-slate-200 text-xs font-mono font-semibold transition"
          >
            Close Evidence Ledger
          </button>
        </div>
      </div>
    </div>
  );
};
