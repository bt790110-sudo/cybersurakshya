import Panel from "../common/Panel";
import { ShieldAlert } from "lucide-react";

export default function ThreatStatus() {
  return (
    <Panel title="Threat Status">

      <div className="flex flex-col justify-center items-center h-64">

        <ShieldAlert
          size={70}
          className="text-red-500 mb-4"
        />

        <h2 className="text-4xl font-bold">
          Critical
        </h2>

        <p className="text-slate-400 mt-3">
          Multiple threats detected
        </p>

      </div>

    </Panel>
  );
}