import Panel from "../common/Panel";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export default function ThreatStatus({ stats }) {
  const critical = stats?.severity_breakdown?.CRITICAL ?? 0;
  const total = stats?.total_alerts ?? 0;

  const level = critical > 10 ? "Critical" : critical > 0 ? "High" : total > 0 ? "Medium" : "Normal";
  const color = { Critical: "text-red-500", High: "text-orange-500", Medium: "text-yellow-500", Normal: "text-green-500" }[level];
  const Icon = level === "Normal" ? ShieldCheck : ShieldAlert;

  return (
    <Panel title="Threat Status">
      <div className="flex flex-col justify-center items-center h-64">
        <Icon size={70} className={`${color} mb-4`} />
        <h2 className="text-4xl font-bold">{level}</h2>
        <p className="text-slate-400 mt-3">
          {total === 0
            ? "No threats detected"
            : `${critical} critical · ${total} total alerts`}
        </p>
      </div>
    </Panel>
  );
}
