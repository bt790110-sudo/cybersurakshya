import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { attackTypeData } from "../../constants/dashboardData";

export default function AttackTypeChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={attackTypeData}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#334155"
        />

        <XAxis
          dataKey="attack"
          stroke="#94A3B8"
          angle={-20}
          textAnchor="end"
          interval={0}
          height={60}
        />

        <YAxis stroke="#94A3B8" />

        <Tooltip />

        <Bar
          dataKey="count"
          fill="#3B82F6"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}