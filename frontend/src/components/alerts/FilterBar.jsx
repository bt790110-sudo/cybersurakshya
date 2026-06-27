export default function FilterBar({
  severity,
  setSeverity,
  status,
  setStatus,
}) {
  return (
    <div className="flex flex-wrap gap-4">

      <select
        value={severity}
        onChange={(e) => setSeverity(e.target.value)}
        className="
          bg-slate-900
          border
          border-slate-700
          rounded-lg
          px-4
          py-2
        "
      >
        <option value="All">All Severity</option>
        <option value="Critical">Critical</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="
          bg-slate-900
          border
          border-slate-700
          rounded-lg
          px-4
          py-2
        "
      >
        <option value="All">All Status</option>
        <option value="Open">Open</option>
        <option value="Investigating">Investigating</option>
        <option value="Monitoring">Monitoring</option>
        <option value="Resolved">Resolved</option>
      </select>

    </div>
  );
}