import ThreatTrendChart from "../components/charts/ThreatTrendChart";

import AttackTypeChart from "../components/charts/AttackTypeChart";

import SeverityChart from "../components/charts/SeverityChart";

import StatCard from "../components/cards/StatCard";

import Panel from "../components/common/Panel";

import ThreatStatus from "../components/panels/ThreatStatus";

import RecentAlerts from "../components/panels/RecentAlerts";

import AgentHealth from "../components/panels/AgentHealth";

import ActivityTimeline from "../components/panels/ActivityTimeline";

import { stats } from "../constants/dashboardData";

export default function Dashboard() {

  return (

    <div className="p-4 sm:p-8 bg-slate-950 min-h-screen">

      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Dashboard

        </h1>

        <p className="text-slate-400 mt-2">

          Cyber Surakshya SOC Dashboard

        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">

        {stats.map((card) => (

          <StatCard
            key={card.id}
            {...card}
          />

        ))}

      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <Panel
  title="Threat Analytics"
  className="xl:col-span-2"
>
  <div className="grid lg:grid-cols-2 gap-8">

    <div>
      <h3 className="mb-3 font-semibold text-slate-300">
        Threat Trend
      </h3>

      <ThreatTrendChart />
    </div>

    <div>
      <h3 className="mb-3 font-semibold text-slate-300">
        Severity Distribution
      </h3>

      <SeverityChart />
    </div>

  </div>

  <div className="mt-8">

    <h3 className="mb-3 font-semibold text-slate-300">
      Attack Types
    </h3>

    <AttackTypeChart />

  </div>
</Panel>

  

        <ThreatStatus />

        </div>

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