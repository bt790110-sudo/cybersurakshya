import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import Panel from "../common/Panel";
import { useLiveFeed } from "../../hooks/useLiveFeed";
import { useApi } from "../../hooks/useApi";
import { getAlerts } from "../../api/alertsApi";

const severityColors = {
  CRITICAL: "bg-red-500/20 text-red-400",
  HIGH:     "bg-orange-500/20 text-orange-400",
  MEDIUM:   "bg-yellow-500/20 text-yellow-400",
  LOW:      "bg-green-500/20 text-green-400",
};

export default function RecentAlerts() {
  const { data } = useApi(getAlerts);
  const { alerts: liveAlerts, connected } = useLiveFeed(5);

  // Merge: live alerts at top, then existing ones from DB
  const base = (data ?? []).slice(0, 5);
  const liveIds = new Set(liveAlerts.map((a) => a.id));
  const merged = [
    ...liveAlerts,
    ...base.filter((a) => !liveIds.has(a.id)),
  ].slice(0, 5);

  return (
    <Panel title="🚨 Recent Alerts">
      <div className="flex items-center gap-2 mb-4">
        <span className={`w-2 h-2 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`} />
        <span className="text-xs text-slate-400">{connected ? "Live feed connected" : "Reconnecting..."}</span>
      </div>

      <div className="space-y-4">
        {merged.map((alert) => (
          <div
            key={alert.id}
            className="bg-slate-900 border border-slate-700 rounded-xl p-4 hover:border-blue-500 transition"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <ShieldAlert className="text-red-500 mt-1" size={22} />
                <div>
                  <h3 className="font-semibold text-lg">{alert.attack_type}</h3>
                  <p className="text-slate-400 text-sm mt-1">ID: #{alert.id}</p>
                  <p className="text-slate-400 text-sm">Source: {alert.source_ip}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${severityColors[alert.severity] ?? severityColors.LOW}`}>
                  {alert.severity}
                </span>
                <div className="mt-4">
                  <Link
                    to={`/alerts/${alert.id}`}
                    className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {merged.length === 0 && (
          <p className="text-slate-500 text-center py-8">No alerts yet. Run a simulation to generate one.</p>
        )}
      </div>
    </Panel>
  );
}
