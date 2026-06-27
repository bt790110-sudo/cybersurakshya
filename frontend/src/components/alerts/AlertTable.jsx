import AlertRow from "./AlertRow";

export default function AlertTable({ alerts }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700">

      <table className="w-full">

        <thead className="bg-slate-900">

          <tr>

            <th className="p-4 text-left">ID</th>

            <th className="p-4 text-left">Attack Type</th>

            <th className="p-4 text-left">Severity</th>

            <th className="p-4 text-left">Source IP</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-left">Time</th>

            <th className="p-4 text-left">Action</th>

          </tr>

        </thead>

        <tbody>

          {alerts.map((alert) => (
            <AlertRow
              key={alert.id}
              alert={alert}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
}