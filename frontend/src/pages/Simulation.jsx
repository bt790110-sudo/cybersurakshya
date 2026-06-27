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
      // Step through the workflow visually while the backend call resolves.
      // Once the API layer below resolves successfully, the response data
      // (attack/threat score/analysis/blocked IP) can be shown in `result`.
      for (let i = 0; i < STEPS.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 450));
        setCompletedSteps((prev) => prev + 1);
      }

      const data = await simulateAttack();
      setResult(data ?? { message: "Simulation completed." });
    } catch (err) {
      setError(
        err?.message ||
          "Could not reach the backend. Make sure the API is running and the base URL in your .env is correct."
      );
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Attack Simulation</h1>
        <p className="text-slate-400 mt-2">
          Trigger a complete simulated security incident end-to-end.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <ShieldAlert className="text-red-500" size={36} />
            <div>
              <h2 className="text-xl font-semibold">Simulate a Security Incident</h2>
              <p className="text-slate-400 mt-1 text-sm max-w-md">
                This generates a sample attack, scores it, runs AI analysis,
                creates a response, and blocks the source IP — exercising the
                full backend workflow.
              </p>
            </div>
          </div>

          <button
            onClick={handleGenerateAttack}
            disabled={running}
            className="
              flex items-center gap-2
              bg-blue-600 hover:bg-blue-700
              disabled:bg-slate-700 disabled:cursor-not-allowed
              transition px-6 py-3 rounded-xl font-semibold
              whitespace-nowrap
            "
          >
            {running ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <PlayCircle size={20} />
            )}
            {running ? "Running..." : "Generate Attack"}
          </button>
        </div>
      </div>

      {/* Workflow progress */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 sm:p-8">
        <h3 className="font-semibold mb-6">Workflow</h3>

        <div className="space-y-4">
          {STEPS.map((step, index) => {
            const isDone = index < completedSteps;
            const isActive = index === completedSteps && running;

            return (
              <div key={step} className="flex items-center gap-4">
                {isDone ? (
                  <CheckCircle2 className="text-green-400" size={22} />
                ) : isActive ? (
                  <Loader2 className="text-blue-400 animate-spin" size={22} />
                ) : (
                  <div className="w-[22px] h-[22px] rounded-full border-2 border-slate-700" />
                )}

                <span
                  className={
                    isDone
                      ? "text-slate-200"
                      : isActive
                      ? "text-blue-300"
                      : "text-slate-500"
                  }
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {error && (
          <div className="mt-6 bg-red-500/10 border border-red-700 text-red-300 rounded-lg p-4 text-sm">
            {error}
          </div>
        )}

        {result && !error && (
          <div className="mt-6 bg-green-500/10 border border-green-700 text-green-300 rounded-lg p-4 text-sm">
            Simulation complete. Check the Dashboard, Alerts, and Blocked IPs
            pages for the new records once your backend is connected.
          </div>
        )}
      </div>
    </div>
  );
}
