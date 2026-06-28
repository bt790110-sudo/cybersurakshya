export default function SourceInfo({ alert }) {
  const rows = alert
    ? [
        { label: "IP Address",  value: alert.sourceIp },
        { label: "Country",     value: "—" },
        { label: "City",        value: "—" },
        { label: "ISP",         value: "—" },
        { label: "Reputation",  value: "Malicious" },
      ]
    : [];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6">Source Intelligence</h2>

      {rows.length === 0 ? (
        <p className="text-slate-500">No source data available.</p>
      ) : (
        <div className="space-y-5">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex justify-between border-b border-slate-800 pb-3">
              <span className="text-slate-400">{label}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
