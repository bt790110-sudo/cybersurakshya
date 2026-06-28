import { RefreshCw, Server, Cpu, MemoryStick, Clock } from "lucide-react";
import { useApi } from "../hooks/useApi";
import { getAgents } from "../api/agentsApi";

const statusStyles = {
  ONLINE:  { dot: "bg-green-500",  text: "text-green-400",  label: "Online"  },
  OFFLINE: { dot: "bg-red-500",    text: "text-red-400",    label: "Offline" },
  BUSY:    { dot: "bg-yellow-500", text: "text-yellow-400", label: "Busy"    },
};

function timeAgo(isoStr) {
  const diff = Math.floor((Date.now() - new Date(isoStr)) / 1000);
  if (diff < 10) return "Just now";
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function Agents() {
  const { data, loading, error, refetch } = useApi(getAgents);
  const agents = data ?? [];
  const onlineCount = agents.filter((a) => a.status === "ONLINE").length;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">Agent Monitoring</h1>
          <p className="text-slate-400 mt-2">Live health and status for every backend agent.</p>
        </div>
        <button
          onClick={refetch}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-lg text-sm transition"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <p className="text-slate-400">Total Agents</p>
          <h2 className="text-4xl font-bold mt-3">{agents.length}</h2>
        </div>
        <div className="bg-slate-900 border border-green-700 rounded-xl p-6">
          <p className="text-green-400">Online</p>
          <h2 className="text-4xl font-bold mt-3">{onlineCount}/{agents.length}</h2>
        </div>
        <div className="bg-slate-900 border border-yellow-700 rounded-xl p-6">
          <p className="text-yellow-400">Offline / Busy</p>
          <h2 className="text-4xl font-bold mt-3">{agents.length - onlineCount}</h2>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-700 text-red-300 rounded-lg p-4 mb-6 text-sm">{error}</div>
      )}

      {loading ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-52 rounded-xl bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {agents.map((agent) => {
            const style = statusStyles[agent.status] ?? statusStyles.OFFLINE;
            return (
              <div
                key={agent.id}
                className="bg-slate-900 border border-slate-700 rounded-xl p-6 hover:border-blue-500 transition"
              >
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-3">
                    <Server className="text-cyan-400" size={22} />
                    <h3 className="font-semibold text-lg">{agent.agent_name}</h3>
                  </div>
                  <span className={`flex items-center gap-2 text-sm ${style.text}`}>
                    <span className={`w-2.5 h-2.5 rounded-full ${style.dot}`} />
                    {style.label}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1 text-slate-400">
                    <span>Heartbeat</span>
                    <span>{agent.status === "ONLINE" ? "100%" : "0%"}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-2 ${agent.status === "ONLINE" ? "bg-green-500" : "bg-red-500"}`}
                      style={{ width: agent.status === "ONLINE" ? "100%" : "0%" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Cpu size={16} className="text-slate-500" />
                    <span className="text-slate-400">Status</span>
                    <span className={`ml-auto font-semibold ${style.text}`}>{style.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MemoryStick size={16} className="text-slate-500" />
                    <span className="text-slate-400">ID</span>
                    <span className="ml-auto font-semibold">#{agent.id}</span>
                  </div>
                </div>

                <p className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock size={14} />
                  Last seen: {timeAgo(agent.heartbeat)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
