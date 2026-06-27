const colors = {
  Active: "bg-green-500/20 text-green-400",
  Released: "bg-gray-500/20 text-gray-300",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        colors[status] || "bg-gray-500/20 text-gray-300"
      }`}
    >
      {status}
    </span>
  );
}