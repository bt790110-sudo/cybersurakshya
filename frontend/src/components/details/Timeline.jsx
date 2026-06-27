import { timeline } from "../../constants/alertDetailData";

export default function Timeline() {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

      <h2 className="text-xl font-bold mb-6">
        Attack Timeline
      </h2>

      <div className="relative border-l-2 border-blue-600 ml-3">

        {timeline.map((item, index) => (

          <div
            key={index}
            className="relative mb-8 ml-6"
          >

            <div className="absolute -left-[34px] w-5 h-5 rounded-full bg-blue-500 border-4 border-slate-900"></div>

            <div className="bg-slate-800 rounded-lg p-4">

              <div className="flex justify-between">

                <h3 className="font-semibold">

                  {item.event}

                </h3>

                <span className="text-sm text-slate-400">

                  {item.time}

                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}