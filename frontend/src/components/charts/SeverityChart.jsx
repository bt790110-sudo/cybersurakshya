import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e"];

export default function SeverityChart({ stats }) {
  const data = stats?.severity_breakdown
    ? Object.entries(stats.severity_breakdown).map(([name, value]) => ({ name, value }))
    : [];

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[250px] text-slate-500 text-sm">
        No data yet — run a simulation.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
