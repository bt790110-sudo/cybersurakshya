import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { blockedIpsData } from "../constants/blockedIpsData";
import SeverityBadge from "../components/blockedIps/SeverityBadge";
import StatusBadge from "../components/blockedIps/StatusBadge";

export default function BlockedIPDetail() {
  const { id } = useParams();
  const ip = blockedIpsData.find((item) => String(item.id) === id);

  if (!ip) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8">
        <Link
          to="/blocked"
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8"
        >
          <ArrowLeft size={18} />
          Back to Blocked IPs
        </Link>

        <p className="text-slate-400">
          No blocked IP record found for ID "{id}".
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <Link
          to="/blocked"
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold">Blocked IP Details</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-bold mb-6">IP Information</h2>

          <div className="space-y-4">
            <Row label="IP Address" value={ip.ip} />
            <Row label="Country" value={ip.country} />
            <Row label="Reason" value={ip.reason} />
            <Row label="Severity" value={<SeverityBadge severity={ip.severity} />} />
            <Row label="Status" value={<StatusBadge status={ip.status} />} />
            <Row label="Blocked At" value={ip.blockedAt} />
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">
          <h2 className="text-xl font-bold mb-6">Recommended Actions</h2>

          <ul className="space-y-4">
            <li className="bg-slate-800 rounded-lg p-4">
              ✅ Firewall rule verified
            </li>
            <li className="bg-slate-800 rounded-lg p-4">
              ✅ Threat intelligence updated
            </li>
            <li className="bg-slate-800 rounded-lg p-4">
              ✅ Notify SOC analyst
            </li>
            <li className="bg-slate-800 rounded-lg p-4">
              ✅ Continue monitoring
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
