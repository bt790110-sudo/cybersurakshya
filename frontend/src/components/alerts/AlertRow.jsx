import { Link } from "react-router-dom";

import SeverityBadge from "./SeverityBadge";
import StatusBadge from "./StatusBadge";

export default function AlertRow({ alert }) {
  return (
    <tr className="border-b border-slate-700 hover:bg-slate-800 transition">

      <td className="p-4">{alert.id}</td>

      <td className="p-4">{alert.attackType}</td>

      <td className="p-4">
        <SeverityBadge severity={alert.severity} />
      </td>

      <td className="p-4">
        {alert.sourceIp}
      </td>

      <td className="p-4">
        <StatusBadge status={alert.status} />
      </td>

      <td className="p-4">
        {alert.time}
      </td>

      <td className="p-4">

        <Link
          to={`/alerts/${alert.id}`}
          className="
            bg-blue-600
            hover:bg-blue-700
            px-4
            py-2
            rounded-lg
            text-sm
            transition
          "
        >
          View Details
        </Link>

      </td>

    </tr>
  );
}