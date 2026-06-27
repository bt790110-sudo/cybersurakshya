import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { threatTrendData } from "../../constants/dashboardData";

export default function ThreatTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={threatTrendData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

        <XAxis
          dataKey="day"
          stroke="#94A3B8"
        />

        <YAxis
          stroke="#94A3B8"
        />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="alerts"
          stroke="#3B82F6"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}