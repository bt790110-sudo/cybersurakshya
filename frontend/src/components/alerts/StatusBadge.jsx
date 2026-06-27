const statusClasses = {
  Open: "bg-green-500/20 text-green-400",
  Investigating: "bg-yellow-500/20 text-yellow-400",
  Monitoring: "bg-blue-500/20 text-blue-400",
  Resolved: "bg-gray-500/20 text-gray-300",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        statusClasses[status] || "bg-gray-500/20 text-gray-300"
      }`}
    >
      {status}
    </span>
  );
}