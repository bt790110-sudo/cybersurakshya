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
          rounded-xl
          px-4
          py-3
        "
      >
        <option>All</option>
        <option>Critical</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="
          bg-slate-900
          border
          border-slate-700
          rounded-xl
          px-4
          py-3
        "
      >
        <option>All</option>
        <option>Active</option>
        <option>Released</option>
      </select>

    </div>
  );
}