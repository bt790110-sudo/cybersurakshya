import Panel from "../common/Panel";
import { Server } from "lucide-react";
import { useApi } from "../../hooks/useApi";
import { getAgents } from "../../api/agentsApi";

const statusColor = {
  ONLINE:  "text-green-400",
  OFFLINE: "text-red-400",
  BUSY:    "text-yellow-400",
};

export default function AgentHealth() {
  const { data, loading } = useApi(getAgents);
  const agents = data ?? [];

  return (
    <Panel title="🖥 Agent Health">
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-5">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="rounded-xl border border-slate-700 bg-slate-900 p-4 hover:border-blue-500 transition"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Server className="text-cyan-400" size={20} />
                  <h3 className="font-semibold">{agent.agent_name}</h3>
                </div>
                <span className={statusColor[agent.status] ?? "text-slate-400"}>
                  ● {agent.status}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Heartbeat</span>
                  <span>{agent.status === "ONLINE" ? "100%" : "0%"}</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-2 ${agent.status === "ONLINE" ? "bg-green-500" : "bg-red-500"}`}
                    style={{ width: agent.status === "ONLINE" ? "100%" : "0%" }}
                  />
                </div>
              </div>
            </div>
          ))}

          {agents.length === 0 && (
            <p className="text-slate-500 text-sm text-center py-4">No agents registered.</p>
          )}
        </div>
      )}
    </Panel>
  );
}
