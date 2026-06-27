import Panel from "../common/Panel";
import { agents } from "../../constants/dashboardData";
import { Server } from "lucide-react";

const statusColor = {
  Healthy: "text-green-400",
  Warning: "text-yellow-400",
  Offline: "text-red-400",
};

export default function AgentHealth() {
  return (
    <Panel title="🖥 Agent Health">
      <div className="space-y-5">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="rounded-xl border border-slate-700 bg-slate-900 p-4 hover:border-blue-500 transition"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Server className="text-cyan-400" size={20} />
                <h3 className="font-semibold">{agent.name}</h3>
              </div>

              <span className={statusColor[agent.status]}>
                ● {agent.status}
              </span>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Heartbeat</span>
                <span>{agent.heartbeat}%</span>
              </div>

              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="bg-green-500 h-2"
                  style={{ width: `${agent.heartbeat}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div>
                <p className="text-slate-400">CPU</p>
                <p>{agent.cpu}%</p>
              </div>

              <div>
                <p className="text-slate-400">Memory</p>
                <p>{agent.memory}%</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4">
              Last Seen: {agent.lastSeen}
            </p>
          </div>
        ))}
      </div>
    </Panel>
  );
}