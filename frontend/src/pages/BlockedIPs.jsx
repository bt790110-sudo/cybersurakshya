import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";

import SearchBar from "../components/blockedIps/SearchBar";
import FilterBar from "../components/blockedIps/FilterBar";
import BlockedIpTable from "../components/blockedIps/BlockedIpTable";

import { useApi } from "../hooks/useApi";
import { getBlockedIps } from "../api/blockedIpsApi";

function normalizeIp(ip) {
  return {
    id: ip.id,
    ip: ip.ip,
    country: "—",
    reason: ip.reason,
    severity: "High",
    status: "Active",
    blockedAt: new Date(ip.blocked_at).toLocaleString(),
  };
}

export default function BlockedIPs() {
  const { data, loading, error, refetch } = useApi(getBlockedIps);
  const [searchTerm, setSearchTerm] = useState("");
  const [severity, setSeverity] = useState("All");
  const [status, setStatus] = useState("All");

  const blockedIps = useMemo(() => (data ?? []).map(normalizeIp), [data]);

  const filtered = useMemo(() => {
    return blockedIps.filter((ip) => {
      const s = searchTerm.toLowerCase();
      const matchSearch =
        ip.ip.toLowerCase().includes(s) ||
        ip.country.toLowerCase().includes(s) ||
        ip.reason.toLowerCase().includes(s);
      const matchSev = severity === "All" || ip.severity === severity;
      const matchStat = status === "All" || ip.status === status;
      return matchSearch && matchSev && matchStat;
    });
  }, [blockedIps, searchTerm, severity, status]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">Blocked IP Management</h1>
          <p className="text-slate-400 mt-2">Review all IP addresses blocked by the SOC platform.</p>
        </div>
        <button
          onClick={refetch}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-lg text-sm transition"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <p className="text-slate-400">Total IPs</p>
          <h2 className="text-4xl font-bold mt-3">{blockedIps.length}</h2>
        </div>
        <div className="bg-slate-900 border border-red-700 rounded-xl p-6">
          <p className="text-red-400">Critical</p>
          <h2 className="text-4xl font-bold mt-3">
            {blockedIps.filter((ip) => ip.severity === "Critical").length}
          </h2>
        </div>
        <div className="bg-slate-900 border border-green-700 rounded-xl p-6">
          <p className="text-green-400">Active</p>
          <h2 className="text-4xl font-bold mt-3">
            {blockedIps.filter((ip) => ip.status === "Active").length}
          </h2>
        </div>
        <div className="bg-slate-900 border border-blue-700 rounded-xl p-6">
          <p className="text-blue-400">Unique IPs</p>
          <h2 className="text-4xl font-bold mt-3">
            {[...new Set(blockedIps.map((ip) => ip.ip))].length}
          </h2>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row justify-between gap-6 mb-8">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterBar severity={severity} setSeverity={setSeverity} status={status} setStatus={setStatus} />
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Blocked IP List</h2>
          <span className="text-slate-400">Showing {filtered.length} records</span>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-700 text-red-300 rounded-lg p-4 mb-4 text-sm">{error}</div>
        )}

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 rounded-lg bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <BlockedIpTable blockedIps={filtered} />
        )}
      </div>
    </div>
  );
}
