import { Link } from "react-router-dom";

import SeverityBadge from "./SeverityBadge";
import StatusBadge from "./StatusBadge";

export default function BlockedIpRow({ ip }) {
  return (
    <tr className="border-b border-slate-700 hover:bg-slate-800 transition-all duration-300">

      <td className="p-4 font-mono">
        {ip.ip}
      </td>

      <td className="p-4">
        {ip.country}
      </td>

      <td className="p-4">
        {ip.reason}
      </td>

      <td className="p-4">
        <SeverityBadge severity={ip.severity} />
      </td>

      <td className="p-4">
        {ip.blockedAt}
      </td>

      <td className="p-4">
        <StatusBadge status={ip.status} />
      </td>

      <td className="p-4">
        <Link
          to={`/blocked/${ip.id}`}
          className="
          bg-blue-600
          hover:bg-blue-700
          transition
          px-4
          py-2
          rounded-lg
          text-sm
          inline-block
        "
        >
          View
        </Link>
      </td>

    </tr>
  );
}