import Panel from "../common/Panel";
import { recentAlerts } from "../../constants/dashboardData";
import { ShieldAlert } from "lucide-react";

const severityColors = {
  Critical: "bg-red-500/20 text-red-400",
  High: "bg-orange-500/20 text-orange-400",
  Medium: "bg-yellow-500/20 text-yellow-400",
  Low: "bg-green-500/20 text-green-400",
};

export default function RecentAlerts() {
  return (
    <Panel title="🚨 Recent Alerts">

      <div className="space-y-4">

        {recentAlerts.map((alert) => (

          <div
            key={alert.id}
            className="
              bg-slate-900
              border border-slate-700
              rounded-xl
              p-4
              hover:border-blue-500
              hover:shadow-lg
              transition
            "
          >

            <div className="flex justify-between items-start">

              <div className="flex gap-4">

                <ShieldAlert
                  className="text-red-500 mt-1"
                  size={22}
                />

                <div>

                  <h3 className="font-semibold text-lg">

                    {alert.attack}

                  </h3>

                  <p className="text-slate-400 text-sm mt-1">

                    ID : {alert.id}

                  </p>

                  <p className="text-slate-400 text-sm">

                    Source : {alert.source}

                  </p>

                  <p className="text-slate-500 text-xs mt-2">

                    {alert.time}

                  </p>

                </div>

              </div>

              <div className="text-right">

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    font-semibold
                    ${severityColors[alert.severity]}
                  `}
                >
                  {alert.severity}
                </span>

                <p className="text-slate-400 mt-3 text-sm">

                  {alert.status}

                </p>

                <button
                  className="
                    mt-4
                    px-3
                    py-2
                    rounded-lg
                    bg-blue-600
                    hover:bg-blue-700
                    text-sm
                    transition
                  "
                >
                  View Details
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </Panel>
  );
}