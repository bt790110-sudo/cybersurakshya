import BlockedIpRow from "./BlockedIpRow";

export default function BlockedIpTable({ blockedIps }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700">

      <table className="w-full">

        <thead className="bg-slate-800">

          <tr>

            <th className="p-4 text-left">IP Address</th>

            <th className="p-4 text-left">Country</th>

            <th className="p-4 text-left">Reason</th>

            <th className="p-4 text-left">Severity</th>

            <th className="p-4 text-left">Blocked Time</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-left">Action</th>

          </tr>

        </thead>

        <tbody>

          {blockedIps.length === 0 ? (

            <tr>

              <td
                colSpan="7"
                className="text-center py-10 text-slate-500"
              >
                No blocked IPs found.
              </td>

            </tr>

          ) : (

            blockedIps.map((ip) => (

              <BlockedIpRow
                key={ip.id}
                ip={ip}
              />

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}