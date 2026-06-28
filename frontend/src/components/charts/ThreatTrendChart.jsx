import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ThreatTrendChart({ stats }) {
  const today = new Date().getDay();

  // Show total_alerts on today's bar, 0 on others
  // As more data comes in from the API we can improve this to per-day counts
  const data = DAYS.map((day, i) => ({
    day,
    alerts: i === today ? (stats?.total_alerts ?? 0) : 0,
  }));

  const hasData = stats?.total_alerts > 0;

  if (!hasData) {
    return (
      <div className="flex items-center justify-center h-[250px] text-slate-500 text-sm">
        No data yet — run a simulation.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="day" stroke="#94A3B8" />
        <YAxis stroke="#94A3B8" />
        <Tooltip />
        <Line type="monotone" dataKey="alerts" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
