import { alertDetail } from "../../constants/alertDetailData";

export default function ThreatAssessment({ alert = alertDetail }) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6">Threat Assessment</h2>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span>Threat Score</span>
            <span className="font-bold text-red-400">
              {alert.threatScore}/100
            </span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-3">
            <div
              className="bg-red-500 h-3 rounded-full"
              style={{ width: `${alert.threatScore}%` }}
            />
          </div>
        </div>

        <Item label="Confidence" value={`${alert.confidence}%`} />
        <Item label="Risk Level" value={alert.riskLevel} />
        <Item label="MITRE ATT&CK" value={alert.mitre} />
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
