import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

import SearchBar from "../components/alerts/SearchBar";
import FilterBar from "../components/alerts/FilterBar";
import AlertTable from "../components/alerts/AlertTable";

import { useApi } from "../hooks/useApi";
import { getAlerts } from "../api/alertsApi";

function normalizeAlert(a) {
  return {
    id: String(a.id),
    attackType: a.attack_type,
    sourceIp: a.source_ip,
    severity: a.severity.charAt(0) + a.severity.slice(1).toLowerCase(), // "CRITICAL" → "Critical"
    status: a.status.charAt(0) + a.status.slice(1).toLowerCase(),
    time: new Date(a.created_at).toLocaleString(),
  };
}

export default function Alerts() {
  const { data, loading, error, refetch } = useApi(getAlerts);
  const [searchTerm, setSearchTerm] = useState("");
  const [severity, setSeverity] = useState("All");
  const [status, setStatus] = useState("All");

  const alerts = useMemo(() => (data ?? []).map(normalizeAlert), [data]);

  const filtered = useMemo(() => {
    return alerts.filter((alert) => {
      const s = searchTerm.toLowerCase();
      const matchSearch =
        alert.id.toLowerCase().includes(s) ||
        alert.attackType.toLowerCase().includes(s) ||
        alert.sourceIp.includes(s);
      const matchSev = severity === "All" || alert.severity === severity;
      const matchStat = status === "All" || alert.status === status;
      return matchSearch && matchSev && matchStat;
    });
  }, [alerts, searchTerm, severity, status]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Alerts Management</h1>
          <p className="text-slate-400 mt-2">View, search and investigate security alerts.</p>
        </div>
        <button
          onClick={refetch}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-lg text-sm transition"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">
          <p className="text-slate-400">Total Alerts</p>
          <h2 className="text-4xl font-bold mt-3">{alerts.length}</h2>
        </div>
        <div className="bg-slate-900 rounded-xl border border-red-700 p-6">
          <p className="text-red-400">Critical</p>
          <h2 className="text-4xl font-bold mt-3">
            {alerts.filter((a) => a.severity === "Critical").length}
          </h2>
        </div>
        <div className="bg-slate-900 rounded-xl border border-yellow-700 p-6">
          <p className="text-yellow-400">Investigating</p>
          <h2 className="text-4xl font-bold mt-3">
            {alerts.filter((a) => a.status === "Investigating").length}
          </h2>
        </div>
        <div className="bg-slate-900 rounded-xl border border-green-700 p-6">
          <p className="text-green-400">Resolved</p>
          <h2 className="text-4xl font-bold mt-3">
            {alerts.filter((a) => a.status === "Resolved").length}
          </h2>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row justify-between gap-6 mb-8">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterBar severity={severity} setSeverity={setSeverity} status={status} setStatus={setStatus} />
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Security Alerts</h2>
          <span className="text-slate-400">Showing {filtered.length} alerts</span>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-700 text-red-300 rounded-lg p-4 mb-4 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 rounded-lg bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <AlertTable alerts={filtered} />
        )}
      </div>
    </div>
  );
}
