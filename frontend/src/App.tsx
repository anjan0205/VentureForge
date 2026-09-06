import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StartupInput } from './components/StartupInput';
import { PipelineVisualizer } from './components/PipelineVisualizer';
import { BlueprintDashboard } from './components/BlueprintDashboard';
import { KillModePanel } from './components/KillModePanel';
import { VersionCompare } from './components/VersionCompare';
import { EvidenceDrawer } from './components/EvidenceDrawer';
import { generateAnalysis, fetchRunStatus, fetchFullRun, triggerKillMode } from './api';
import { FullRunData } from './types';

export function App() {
  const [viewState, setViewState] = useState<'input' | 'pipeline' | 'blueprint' | 'kill' | 'compare'>('input');
  const [runId, setRunId] = useState<string | undefined>();
  const [runStatus, setRunStatus] = useState<string>('pending');
  const [currentStage, setCurrentStage] = useState<string>('Queued');
  const [runData, setRunData] = useState<FullRunData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isKilling, setIsKilling] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [isEvidenceOpen, setIsEvidenceOpen] = useState<boolean>(false);

  // Poll run status while pipeline is running
  useEffect(() => {
    let interval: any;
    if (runId && (runStatus === 'pending' || runStatus === 'running')) {
      interval = setInterval(async () => {
        try {
          const statusRes = await fetchRunStatus(runId);
          setRunStatus(statusRes.status);
          setCurrentStage(statusRes.current_stage);

          if (statusRes.error) {
            setError(statusRes.error);
          }

          if (statusRes.status === 'completed') {
            clearInterval(interval);
            const fullData = await fetchFullRun(runId);
            setRunData(fullData);
            setIsLoading(false);
            setViewState('blueprint');
          } else if (statusRes.status === 'failed') {
            clearInterval(interval);
            setIsLoading(false);
            setError(statusRes.error || 'Pipeline execution failed.');
          }
        } catch (err: any) {
          console.error('Polling error:', err);
        }
      }, 1500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [runId, runStatus]);

  const handleStartAnalysis = async (idea: string) => {
    setError(undefined);
    setIsLoading(true);
    setViewState('pipeline');
    try {
      const res = await generateAnalysis(idea);
      setRunId(res.run_id);
      setRunStatus(res.status);
      setCurrentStage('Initializing Lyzr Agents...');
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Failed to initialize analysis run.');
      setViewState('input');
    }
  };

  const handleTriggerKillMode = async () => {
    if (!runId) return;
    setIsKilling(true);
    setError(undefined);
    try {
      const killResult = await triggerKillMode(runId);
      const updatedRunData = await fetchFullRun(runId);
      setRunData(updatedRunData);
      setIsKilling(false);
      setViewState('kill');
    } catch (err: any) {
      setIsKilling(false);
      setError(err.message || 'Failed to execute Kill Mode.');
    }
  };

  const handleReset = () => {
    setViewState('input');
    setRunId(undefined);
    setRunStatus('pending');
    setCurrentStage('Queued');
    setRunData(null);
    setIsLoading(false);
    setIsKilling(false);
    setError(undefined);
  };

  return (
    <div className="min-h-screen bg-obsidian-mesh text-slate-100 flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-200 font-sans">
      <div>
        <Header onReset={handleReset} runId={runId} />

        <main className="pb-16">
          {viewState === 'input' && (
            <StartupInput onSubmit={handleStartAnalysis} isLoading={isLoading} />
          )}

          {viewState === 'pipeline' && (
            <PipelineVisualizer currentStage={currentStage} status={runStatus} error={error} />
          )}

          {viewState === 'blueprint' && runData && (
            <BlueprintDashboard
              data={runData}
              onTriggerKillMode={handleTriggerKillMode}
              isKilling={isKilling}
              onOpenEvidence={() => setIsEvidenceOpen(true)}
            />
          )}

          {viewState === 'kill' && runData?.kill_mode && (
            <KillModePanel
              killResult={runData.kill_mode}
              onViewComparison={() => setViewState('compare')}
            />
          )}

          {viewState === 'compare' && runData && (
            <VersionCompare data={runData} />
          )}
        </main>
      </div>

      {/* Midnight Obsidian Footer */}
      <footer className="border-t border-white/10 py-5 px-6 sm:px-8 obsidian-panel text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-white">Venture<span className="text-emerald-400">Forge</span></span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">Institutional Decision & Stress-Testing Architecture</span>
        </div>
        <div className="flex items-center space-x-4">
          {runData?.blueprint_v1 && (
            <button
              onClick={() => setViewState('blueprint')}
              className={`hover:text-emerald-400 transition ${viewState === 'blueprint' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
            >
              V1 Blueprint
            </button>
          )}
          {runData?.kill_mode && (
            <>
              <button
                onClick={() => setViewState('kill')}
                className={`hover:text-crimson-400 transition ${viewState === 'kill' ? 'text-crimson-400 font-bold' : 'text-slate-400'}`}
              >
                Kill Verdict
              </button>
              <button
                onClick={() => setViewState('compare')}
                className={`hover:text-cyanTeal-400 transition ${viewState === 'compare' ? 'text-cyanTeal-400 font-bold' : 'text-slate-400'}`}
              >
                V1 vs V2 Evolution
              </button>
            </>
          )}
        </div>
      </footer>

      {/* Evidence Drawer Modal */}
      {runData?.market_researcher && (
        <EvidenceDrawer
          evidence={runData.market_researcher.evidence}
          isOpen={isEvidenceOpen}
          onClose={() => setIsEvidenceOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
