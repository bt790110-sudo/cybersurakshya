import { ArrowLeft, RefreshCw } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import SeverityBadge from "../components/blockedIps/SeverityBadge";
import StatusBadge from "../components/blockedIps/StatusBadge";
import { useApi } from "../hooks/useApi";
import { getBlockedIps } from "../api/blockedIpsApi";

export default function BlockedIPDetail() {
  const { id } = useParams();
  const { data, loading, error, refetch } = useApi(getBlockedIps);

  const ip = (data ?? []).find((item) => String(item.id) === id);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <Link
          to="/blocked"
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft size={18} />
          Back to Blocked IPs
        </Link>

        <div className="flex items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Blocked IP Details</h1>
          <button
            onClick={refetch}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 px-3 py-2 rounded-lg text-sm transition"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-700 text-red-300 rounded-lg p-4 mb-6 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid lg:grid-cols-2 gap-6">
          {[0, 1].map((i) => (
            <div key={i} className="h-64 rounded-xl bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : !ip ? (
        <p className="text-slate-400">
          No blocked IP record found for ID "{id}".
        </p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* IP Info */}
          <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">
            <h2 className="text-xl font-bold mb-6">IP Information</h2>
            <div className="space-y-4">
              <Row label="IP Address"  value={ip.ip} />
              <Row label="Reason"      value={ip.reason} />
              <Row label="Blocked At"  value={new Date(ip.blocked_at).toLocaleString()} />
              <Row label="Status"      value={<StatusBadge status="Active" />} />
            </div>
          </div>

          {/* Actions */}
          <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">
            <h2 className="text-xl font-bold mb-6">Recommended Actions</h2>
            <ul className="space-y-4">
              <li className="bg-slate-800 rounded-lg p-4">✅ Firewall rule verified</li>
              <li className="bg-slate-800 rounded-lg p-4">✅ Threat intelligence updated</li>
              <li className="bg-slate-800 rounded-lg p-4">✅ Notify SOC analyst</li>
              <li className="bg-slate-800 rounded-lg p-4">✅ Continue monitoring</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
