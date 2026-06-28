export default function ThreatAssessment({ alert }) {
  if (!alert) return null;

  const score = alert.threatScore ?? 0;
  const barColor =
    score >= 90 ? "bg-red-500" :
    score >= 70 ? "bg-orange-500" :
    score >= 50 ? "bg-yellow-500" : "bg-green-500";

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6">Threat Assessment</h2>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span>Threat Score</span>
            <span className="font-bold text-red-400">{score}/100</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3">
            <div
              className={`${barColor} h-3 rounded-full transition-all duration-700`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        <Item label="Confidence"    value={`${alert.confidence ?? 0}%`} />
        <Item label="Risk Level"    value={alert.riskLevel ?? alert.severity} />
        <Item label="MITRE ATT&CK" value={alert.mitre ?? "—"} />
      </div>
    </div>
  );
}

function Item({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
