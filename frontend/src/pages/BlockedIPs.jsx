import { useMemo, useState } from "react";

import SearchBar from "../components/blockedIps/SearchBar";
import FilterBar from "../components/blockedIps/FilterBar";
import BlockedIpTable from "../components/blockedIps/BlockedIpTable";

import { blockedIpsData } from "../constants/blockedIpsData";

export default function BlockedIPs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severity, setSeverity] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredIps = useMemo(() => {
    return blockedIpsData.filter((ip) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        ip.ip.toLowerCase().includes(search) ||
        ip.country.toLowerCase().includes(search) ||
        ip.reason.toLowerCase().includes(search);

      const matchesSeverity =
        severity === "All" || ip.severity === severity;

      const matchesStatus =
        status === "All" || ip.status === status;

      return matchesSearch && matchesSeverity && matchesStatus;
    });
  }, [searchTerm, severity, status]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Blocked IP Management</h1>
        <p className="text-slate-400 mt-2">
          Review all IP addresses blocked by the SOC platform.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
          <p className="text-slate-400">Total IPs</p>
          <h2 className="text-4xl font-bold mt-3">{blockedIpsData.length}</h2>
        </div>

        <div className="bg-slate-900 border border-red-700 rounded-xl p-6">
          <p className="text-red-400">Critical</p>
          <h2 className="text-4xl font-bold mt-3">
            {blockedIpsData.filter((ip) => ip.severity === "Critical").length}
          </h2>
        </div>

        <div className="bg-slate-900 border border-green-700 rounded-xl p-6">
          <p className="text-green-400">Active</p>
          <h2 className="text-4xl font-bold mt-3">
            {blockedIpsData.filter((ip) => ip.status === "Active").length}
          </h2>
        </div>

        <div className="bg-slate-900 border border-blue-700 rounded-xl p-6">
          <p className="text-blue-400">Countries</p>
          <h2 className="text-4xl font-bold mt-3">
            {[...new Set(blockedIpsData.map((ip) => ip.country))].length}
          </h2>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col xl:flex-row justify-between gap-6 mb-8">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterBar
          severity={severity}
          setSeverity={setSeverity}
          status={status}
          setStatus={setStatus}
        />
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Blocked IP List</h2>
          <span className="text-slate-400">
            Showing {filteredIps.length} records
          </span>
        </div>

        <BlockedIpTable blockedIps={filteredIps} />
      </div>
    </div>
  );
}
