import Panel from "../common/Panel";
import { activities } from "../../constants/dashboardData";

const colors = {
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
};

export default function ActivityTimeline() {
  return (
    <Panel title="📜 Activity Timeline">

      <div className="relative border-l border-slate-700 ml-3">

        {activities.map((activity) => (

          <div
            key={activity.id}
            className="relative pl-8 pb-8"
          >

            <div
              className={`
                absolute
                -left-[9px]
                top-1
                w-4
                h-4
                rounded-full
                ${colors[activity.color]}
              `}
            />

            <div className="flex justify-between items-center">

              <h3 className="font-semibold">

                {activity.title}

              </h3>

              <span className="text-sm text-slate-500">

                {activity.time}

              </span>

            </div>

            <p className="text-slate-400 mt-2">

              {activity.description}

            </p>

          </div>

        ))}

      </div>

    </Panel>
  );
}