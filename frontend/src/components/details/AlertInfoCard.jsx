export default function AlertInfoCard({ alert }) {
  if (!alert) return null;
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6">Alert Information</h2>
      <div className="space-y-4">
        <Info label="Alert ID"     value={`#${alert.id}`} />
        <Info label="Attack Type"  value={alert.attackType} />
        <Info label="Severity"     value={alert.severity} />
        <Info label="Status"       value={alert.status} />
        <Info label="Source IP"    value={alert.sourceIp} />
        <Info label="Destination"  value={alert.destination ?? "Internal Network"} />
        <Info label="Detected At"  value={alert.time} />
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex justify-between border-b border-slate-800 pb-2">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
