import { useState } from "react";
import { PlayCircle, CheckCircle2, Loader2, ShieldAlert } from "lucide-react";
import { simulateAttack } from "../api/simulationApi";

const STEPS = [
  "Attack Generated",
  "Threat Score Calculated",
  "AI Analysis Generated",
  "Response Generated",
  "Source IP Blocked",
  "Dashboard Refreshed",
];

export default function Simulation() {
  const [running, setRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleGenerateAttack() {
    setRunning(true);
    setError(null);
    setResult(null);
    setCompletedSteps(0);

    try {
      // Animate steps while API call runs in parallel
      const apiCall = simulateAttack();

      for (let i = 0; i < STEPS.length; i++) {
        await new Promise((r) => setTimeout(r, 400));
        setCompletedSteps(i + 1);
      }

      const data = await apiCall;
      setResult(data);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Could not reach the backend. Make sure the API is running."
      );
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Attack Simulation</h1>
        <p className="text-slate-400 mt-2">Trigger a complete simulated security incident end-to-end.</p>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <ShieldAlert className="text-red-500" size={36} />
            <div>
              <h2 className="text-xl font-semibold">Simulate a Security Incident</h2>
              <p className="text-slate-400 mt-1 text-sm max-w-md">
                Generates a random attack, scores it, runs AI analysis, creates a response,
                and blocks the source IP — the full backend workflow in one click.
              </p>
            </div>
          </div>

          <button
            onClick={handleGenerateAttack}
            disabled={running}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed transition px-6 py-3 rounded-xl font-semibold whitespace-nowrap"
          >
            {running ? <Loader2 className="animate-spin" size={20} /> : <PlayCircle size={20} />}
            {running ? "Running..." : "Generate Attack"}
          </button>
        </div>
      </div>

      {/* Workflow steps */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 sm:p-8 mb-6">
        <h3 className="font-semibold mb-6">Workflow</h3>
        <div className="space-y-4">
          {STEPS.map((step, i) => {
            const isDone = i < completedSteps;
            const isActive = i === completedSteps && running;
            return (
              <div key={step} className="flex items-center gap-4">
                {isDone ? (
                  <CheckCircle2 className="text-green-400" size={22} />
                ) : isActive ? (
                  <Loader2 className="text-blue-400 animate-spin" size={22} />
                ) : (
                  <div className="w-[22px] h-[22px] rounded-full border-2 border-slate-700" />
                )}
                <span className={isDone ? "text-slate-200" : isActive ? "text-blue-300" : "text-slate-500"}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {error && (
          <div className="mt-6 bg-red-500/10 border border-red-700 text-red-300 rounded-lg p-4 text-sm">{error}</div>
        )}
      </div>

      {/* Live result card */}
      {result && !error && (
        <div className="bg-slate-900 border border-green-700 rounded-xl p-6 sm:p-8">
          <h3 className="font-semibold text-green-400 mb-6">✅ Simulation Complete — Live Results</h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider">Attack</p>
              <p className="font-bold text-lg">{result.alert?.attack_type}</p>
              <p className="text-slate-400 text-sm">From {result.alert?.source_ip}</p>
              <span className="inline-block mt-2 px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-400">
                {result.alert?.severity}
              </span>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider">AI Analysis</p>
              <p className="font-bold text-lg">{result.analysis?.prediction}</p>
              <p className="text-slate-400 text-sm">Confidence: {result.analysis?.confidence?.toFixed(1)}%</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider">Threat Score</p>
              <p className="font-bold text-lg">{result.threat_score?.score} / 100</p>
              <p className="text-slate-400 text-sm">
                Risk: {result.threat_score?.risk} · Priority: {result.threat_score?.priority}
              </p>
            </div>

            <div className="bg-slate-800 rounded-xl p-4">
              <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider">Response</p>
              <p className="font-bold text-lg">{result.response?.action}</p>
              <p className="text-slate-400 text-sm">Status: {result.response?.status}</p>
              {result.blocked_ip && (
                <p className="text-red-400 text-sm mt-1">🚫 {result.blocked_ip.ip} blocked</p>
              )}
            </div>
          </div>

          <p className="text-slate-400 text-sm mt-6">
            Alert #{result.alert?.id} has been saved. Check the Alerts and Blocked IPs pages to see it.
          </p>
        </div>
      )}
    </div>
  );
}
