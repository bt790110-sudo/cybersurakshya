export default function Timeline({ alert }) {
  const items = alert
    ? [
        { time: alert.time,  event: "Attack Detected" },
        { time: "—",         event: "Threat Score Calculated" },
        { time: "—",         event: "AI Analysis Generated" },
        { time: "—",         event: "Response Executed" },
      ]
    : [];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6">Attack Timeline</h2>

      {items.length === 0 ? (
        <p className="text-slate-500">No timeline data available.</p>
      ) : (
        <div className="relative border-l-2 border-blue-600 ml-3">
          {items.map((item, i) => (
            <div key={i} className="relative mb-8 ml-6">
              <div className="absolute -left-[34px] w-5 h-5 rounded-full bg-blue-500 border-4 border-slate-900" />
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{item.event}</h3>
                  <span className="text-sm text-slate-400">{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
