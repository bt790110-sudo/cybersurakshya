import { useEffect, useState } from "react";
import { ShieldAlert, ShieldCheck, Server, Ban } from "lucide-react";

import ThreatTrendChart from "../components/charts/ThreatTrendChart";
import AttackTypeChart from "../components/charts/AttackTypeChart";
import SeverityChart from "../components/charts/SeverityChart";
import StatCard from "../components/cards/StatCard";
import Panel from "../components/common/Panel";
import ThreatStatus from "../components/panels/ThreatStatus";
import RecentAlerts from "../components/panels/RecentAlerts";
import AgentHealth from "../components/panels/AgentHealth";
import ActivityTimeline from "../components/panels/ActivityTimeline";

import { getStats } from "../api/dashboardApi";

function buildStatCards(stats) {
  return [
    {
      id: 1,
      title: "Total Alerts",
      value: String(stats.total_alerts ?? 0),
      change: `${stats.severity_breakdown?.CRITICAL ?? 0} critical`,
      icon: ShieldAlert,
      color: "text-red-400",
      bg: "from-red-500/20 to-red-900/10",
    },
    {
      id: 2,
      title: "Critical Threats",
      value: String(stats.severity_breakdown?.CRITICAL ?? 0),
      change: `${stats.severity_breakdown?.HIGH ?? 0} high`,
      icon: ShieldCheck,
      color: "text-yellow-400",
      bg: "from-yellow-500/20 to-yellow-900/10",
    },
    {
      id: 3,
      title: "Online Agents",
      value: `${stats.online_agents ?? 0}/${stats.total_agents ?? 0}`,
      change: "100% healthy",
      icon: Server,
      color: "text-green-400",
      bg: "from-green-500/20 to-green-900/10",
    },
    {
      id: 4,
      title: "Blocked IPs",
      value: String(stats.total_blocked_ips ?? 0),
      change: `avg ${stats.average_confidence ?? 0}% confidence`,
      icon: Ban,
      color: "text-blue-400",
      bg: "from-blue-500/20 to-blue-900/10",
    },
  ];
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));

    // Refresh stats every 10 seconds
    const interval = setInterval(() => {
      getStats().then(setStats).catch(console.error);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const statCards = stats ? buildStatCards(stats) : [];

  return (
    <div className="p-4 sm:p-8 bg-slate-950 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-slate-400 mt-2">Cyber Surakshya SOC Dashboard</p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-36 rounded-2xl bg-slate-800 animate-pulse border border-slate-700"
              />
            ))
          : statCards.map((card) => <StatCard key={card.id} {...card} />)}
      </div>

      {/* Charts + Threat Status */}
      <div className="grid xl:grid-cols-3 gap-6">
        <Panel title="Threat Analytics" className="xl:col-span-2">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="mb-3 font-semibold text-slate-300">Threat Trend</h3>
              <ThreatTrendChart stats={stats} />
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-slate-300">Severity Distribution</h3>
              <SeverityChart stats={stats} />
            </div>
          </div>
          <div className="mt-8">
            <h3 className="mb-3 font-semibold text-slate-300">Attack Types</h3>
            <AttackTypeChart stats={stats} />
          </div>
        </Panel>

        <ThreatStatus stats={stats} />
      </div>

      {/* Bottom panels */}
      <div className="grid xl:grid-cols-2 gap-6 mt-6">
        <RecentAlerts />
        <AgentHealth />
      </div>

      <div className="mt-6">
        <ActivityTimeline />
      </div>
    </div>
  );
}
