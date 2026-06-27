import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import AlertInfoCard from "../components/details/AlertInfoCard";
import ThreatAssessment from "../components/details/ThreatAssessment";
import AnalysisPanel from "../components/details/AnalysisPanel";
import Timeline from "../components/details/Timeline";
import SourceInfo from "../components/details/SourceInfo";

import { alertsData } from "../constants/alertsData";
import { alertDetail } from "../constants/alertDetailData";

export default function AlertDetail() {
  const { id } = useParams();

  // Look up the alert that was clicked. Falls back to the demo alertDetail
  // record (matching alertDetail.id) so the page still renders sensibly
  // when only mock data is available; once the API layer is connected,
  // this lookup will be replaced by a real /alerts/{id} fetch.
  const baseAlert = alertsData.find((a) => a.id === id);
  const detail =
    id === alertDetail.id || !baseAlert
      ? alertDetail
      : { ...alertDetail, ...baseAlert, id: baseAlert.id };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <Link
          to="/alerts"
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft size={18} />
          Back to Alerts
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold">
          Alert Details {id ? `· ${id}` : ""}
        </h1>
      </div>

      {/* Top Section */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <AlertInfoCard alert={detail} />
        <ThreatAssessment alert={detail} />
      </div>

      {/* AI Analysis */}
      <div className="mb-6">
        <AnalysisPanel />
      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Timeline />
        <SourceInfo />
      </div>
    </div>
  );
}
