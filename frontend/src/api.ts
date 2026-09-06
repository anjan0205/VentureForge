import { FullRunData, KillModeResult } from './types';

const envApiUrl = import.meta.env.VITE_API_BASE_URL;
const API_BASE = envApiUrl
  ? (envApiUrl.startsWith('http') ? envApiUrl : `https://${envApiUrl}`).replace(/\/$/, '') + '/api'
  : '/api';

export async function generateAnalysis(idea: string): Promise<{ run_id: string; status: string }> {
  const res = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea }),
  });
  if (!res.ok) {
    throw new Error(`Failed to start analysis: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchRunStatus(runId: string): Promise<{ run_id: string; status: string; current_stage: string; error?: string }> {
  const res = await fetch(`${API_BASE}/runs/${runId}/status`);
  if (!res.ok) {
    throw new Error(`Failed to fetch run status: ${res.statusText}`);
  }
  return res.json();
}

export async function fetchFullRun(runId: string): Promise<FullRunData> {
  const res = await fetch(`${API_BASE}/runs/${runId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch full run data: ${res.statusText}`);
  }
  return res.json();
}

export async function triggerKillMode(runId: string): Promise<KillModeResult> {
  const res = await fetch(`${API_BASE}/runs/${runId}/kill`, {
    method: 'POST',
  });
  if (!res.ok) {
    throw new Error(`Failed to execute Kill Mode: ${res.statusText}`);
  }
  return res.json();
}
