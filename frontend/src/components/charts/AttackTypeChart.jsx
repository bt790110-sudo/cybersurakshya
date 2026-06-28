import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AttackTypeChart({ stats }) {
  const data = stats?.attack_type_breakdown
    ? Object.entries(stats.attack_type_breakdown).map(([attack, count]) => ({ attack, count }))
    : [];

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[260px] text-slate-500 text-sm">
        No data yet — run a simulation.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="attack" stroke="#94A3B8" angle={-20} textAnchor="end" interval={0} height={60} />
        <YAxis stroke="#94A3B8" />
        <Tooltip />
        <Bar dataKey="count" fill="#3B82F6" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
