import { BrainCircuit } from "lucide-react";

import { analysis } from "../../constants/alertDetailData";

export default function AnalysisPanel() {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

      <div className="flex items-center gap-3 mb-6">

        <BrainCircuit
          className="text-cyan-400"
          size={28}
        />

        <h2 className="text-xl font-bold">
          {analysis.title}
        </h2>

      </div>

      <div className="bg-slate-950 rounded-lg p-5 border border-slate-800">

        <p className="leading-8 text-slate-300">
          {analysis.summary}
        </p>

      </div>

      <div className="mt-8">

        <h3 className="font-semibold mb-4">
          Recommended Actions
        </h3>

        <ul className="space-y-3">

          {analysis.recommendations.map(
            (item, index) => (
              <li
                key={index}
                className="
                  flex
                  items-center
                  gap-3
                  bg-slate-800
                  rounded-lg
                  p-3
                "
              >
                <span className="text-green-400">
                  ✔
                </span>

                {item}
              </li>
            )
          )}

        </ul>

      </div>

    </div>
  );
}