import { ArrowLeft, RefreshCw } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import AlertInfoCard from "../components/details/AlertInfoCard";
import ThreatAssessment from "../components/details/ThreatAssessment";
import AnalysisPanel from "../components/details/AnalysisPanel";
import Timeline from "../components/details/Timeline";
import SourceInfo from "../components/details/SourceInfo";

import { useApi } from "../hooks/useApi";
import { getAlertDetail } from "../api/alertsApi";

export default function AlertDetail() {
  const { id } = useParams();

  const { data, loading, error, refetch } = useApi(
    () => getAlertDetail(id),
    [id]
  );

  const alert = data?.alert;
  const analysis = data?.analysis;
  const responseAction = data?.response_action;

  // Shape data to match what the existing sub-components expect
  const alertShape = alert
    ? {
        id: String(alert.id),
        attackType: alert.attack_type,
        severity: alert.severity.charAt(0) + alert.severity.slice(1).toLowerCase(),
        status: alert.status.charAt(0) + alert.status.slice(1).toLowerCase(),
        sourceIp: alert.source_ip,
        destination: "Internal Network",
        time: new Date(alert.created_at).toLocaleString(),
        threatScore: analysis?.confidence ?? 0,
        confidence: analysis?.confidence ?? 0,
        riskLevel: alert.severity.charAt(0) + alert.severity.slice(1).toLowerCase(),
        mitre: "T1190",
      }
    : null;

  const analysisShape = analysis
    ? {
        title: "AI Threat Analysis",
        summary: analysis.summary,
        recommendations: [
          "Block the source IP immediately.",
          "Review web server access logs.",
          "Patch vulnerable application endpoints.",
          "Enable Web Application Firewall rules.",
          "Notify SOC analysts for further investigation.",
        ],
      }
    : null;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <Link to="/alerts" className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
          <ArrowLeft size={18} />
          Back to Alerts
        </Link>
        <div className="flex items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Alert Details · #{id}
          </h1>
          <button
            onClick={refetch}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 px-3 py-2 rounded-lg text-sm transition"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-700 text-red-300 rounded-lg p-4 mb-6 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 rounded-xl bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : alertShape ? (
        <>
          {responseAction && (
            <div className="mb-6 flex items-center gap-3 bg-blue-500/10 border border-blue-700 rounded-xl p-4">
              <span className="text-blue-300 font-semibold">Response Action:</span>
              <span className="text-white">{responseAction}</span>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <AlertInfoCard alert={alertShape} />
            <ThreatAssessment alert={alertShape} />
          </div>

          <div className="mb-6">
            <AnalysisPanel analysis={analysisShape} />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Timeline alert={alertShape} />
            <SourceInfo alert={alertShape} />
          </div>
        </>
      ) : (
        <div className="text-slate-400">Alert not found.</div>
      )}
    </div>
  );
}
