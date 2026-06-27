import { Server, Cpu, MemoryStick, Clock } from "lucide-react";

import { agents } from "../constants/dashboardData";

const statusStyles = {
  Healthy: { dot: "bg-green-500", text: "text-green-400", label: "Healthy" },
  Warning: { dot: "bg-yellow-500", text: "text-yellow-400", label: "Warning" },
  Offline: { dot: "bg-red-500", text: "text-red-400", label: "Offline" },
};

export default function Agents() {
  const healthyCount = agents.filter((a) => a.status === "Healthy").length;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Agent Monitoring</h1>
        <p className="text-slate-400 mt-2">
          Live health and resource status for every backend agent.
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <p className="text-slate-400">Total Agents</p>
          <h2 className="text-4xl font-bold mt-3">{agents.length}</h2>
        </div>

        <div className="bg-slate-900 border border-green-700 rounded-xl p-6">
          <p className="text-green-400">Healthy</p>
          <h2 className="text-4xl font-bold mt-3">
            {healthyCount}/{agents.length}
          </h2>
        </div>

        <div className="bg-slate-900 border border-yellow-700 rounded-xl p-6">
          <p className="text-yellow-400">Needs Attention</p>
          <h2 className="text-4xl font-bold mt-3">
            {agents.length - healthyCount}
          </h2>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const style = statusStyles[agent.status] || statusStyles.Offline;

          return (
            <div
              key={agent.id}
              className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition"
            >
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-3">
                  <Server className="text-cyan-400" size={22} />
                  <h3 className="font-semibold text-lg">{agent.name}</h3>
                </div>

                <span className={`flex items-center gap-2 text-sm ${style.text}`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
                  {style.label}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1 text-slate-400">
                  <span>Heartbeat</span>
                  <span>{agent.heartbeat}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="bg-green-500 h-2"
                    style={{ width: `${agent.heartbeat}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <Cpu size={16} className="text-slate-500" />
                  <span className="text-slate-400">CPU</span>
                  <span className="ml-auto font-semibold">{agent.cpu}%</span>
                </div>

                <div className="flex items-center gap-2">
                  <MemoryStick size={16} className="text-slate-500" />
                  <span className="text-slate-400">Memory</span>
                  <span className="ml-auto font-semibold">{agent.memory}%</span>
                </div>
              </div>

              <p className="flex items-center gap-2 text-xs text-slate-500">
                <Clock size={14} />
                Last seen: {agent.lastSeen}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
