import Panel from "../common/Panel";
import { useApi } from "../../hooks/useApi";
import { getAlerts } from "../../api/alertsApi";

const colors = { CRITICAL: "bg-red-500", HIGH: "bg-orange-500", MEDIUM: "bg-yellow-500", LOW: "bg-green-500" };

export default function ActivityTimeline() {
  const { data } = useApi(getAlerts);
  const alerts = (data ?? []).slice(0, 6);

  return (
    <Panel title="📜 Activity Timeline">
      <div className="relative border-l border-slate-700 ml-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="relative pl-8 pb-8">
            <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full ${colors[alert.severity] ?? "bg-slate-500"}`} />
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{alert.attack_type}</h3>
              <span className="text-sm text-slate-500">
                {new Date(alert.created_at).toLocaleTimeString()}
              </span>
            </div>
            <p className="text-slate-400 mt-2">
              {alert.severity} alert from {alert.source_ip}
            </p>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="pl-8 pb-4 text-slate-500 text-sm">No activity yet.</div>
        )}
      </div>
    </Panel>
  );
}
