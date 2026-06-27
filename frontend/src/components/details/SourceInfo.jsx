import { sourceInfo } from "../../constants/alertDetailData";

export default function SourceInfo() {

  return (

    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

      <h2 className="text-xl font-bold mb-6">

        Source Intelligence

      </h2>

      <div className="space-y-5">

        <Info
          label="Country"
          value={sourceInfo.country}
        />

        <Info
          label="City"
          value={sourceInfo.city}
        />

        <Info
          label="ISP"
          value={sourceInfo.isp}
        />

        <Info
          label="Reputation"
          value={sourceInfo.reputation}
        />

      </div>

    </div>

  );

}

function Info({ label, value }) {

  return (

    <div className="flex justify-between border-b border-slate-800 pb-3">

      <span className="text-slate-400">

        {label}

      </span>

      <span className="font-semibold">

        {value}

      </span>

    </div>

  );

}