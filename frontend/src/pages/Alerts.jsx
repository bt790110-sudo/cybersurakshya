import { useMemo, useState } from "react";

import SearchBar from "../components/alerts/SearchBar";
import FilterBar from "../components/alerts/FilterBar";
import AlertTable from "../components/alerts/AlertTable";

import { alertsData } from "../constants/alertsData";

export default function Alerts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severity, setSeverity] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredAlerts = useMemo(() => {
    return alertsData.filter((alert) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        alert.id.toLowerCase().includes(search) ||
        alert.attackType.toLowerCase().includes(search) ||
        alert.sourceIp.includes(search);

      const matchesSeverity =
        severity === "All" || alert.severity === severity;

      const matchesStatus =
        status === "All" || alert.status === status;

      return (
        matchesSearch &&
        matchesSeverity &&
        matchesStatus
      );
    });
  }, [searchTerm, severity, status]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">

      {/* Page Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Alerts Management
        </h1>

        <p className="text-slate-400 mt-2">
          View, search and investigate security alerts.
        </p>

      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div className="bg-slate-900 rounded-xl border border-slate-700 p-6">
          <p className="text-slate-400">Total Alerts</p>

          <h2 className="text-4xl font-bold mt-3">
            {alertsData.length}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl border border-red-700 p-6">
          <p className="text-red-400">Critical</p>

          <h2 className="text-4xl font-bold mt-3">
            {alertsData.filter(a => a.severity === "Critical").length}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl border border-yellow-700 p-6">
          <p className="text-yellow-400">Investigating</p>

          <h2 className="text-4xl font-bold mt-3">
            {alertsData.filter(a => a.status === "Investigating").length}
          </h2>
        </div>

        <div className="bg-slate-900 rounded-xl border border-green-700 p-6">
          <p className="text-green-400">Resolved</p>

          <h2 className="text-4xl font-bold mt-3">
            {alertsData.filter(a => a.status === "Resolved").length}
          </h2>
        </div>

      </div>

      {/* Search & Filters */}

      <div className="flex flex-col xl:flex-row justify-between gap-6 mb-8">

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <FilterBar
          severity={severity}
          setSeverity={setSeverity}
          status={status}
          setStatus={setStatus}
        />

      </div>

      {/* Alert Table */}

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-semibold">
            Security Alerts
          </h2>

          <span className="text-slate-400">

            Showing {filteredAlerts.length} Alerts

          </span>

        </div>

        <AlertTable alerts={filteredAlerts} />

      </div>

    </div>
  );
}