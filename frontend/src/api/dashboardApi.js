import { getAlerts } from "./alertsApi";
import { getBlockedIps } from "./blockedIpsApi";
import { getAgents } from "./agentsApi";

// Convenience aggregator for the Dashboard page. Combines the three
// underlying resources into one call so Dashboard.jsx stays a single
// useEffect rather than juggling three separate requests.
export async function getDashboardSummary() {
  const [alerts, blockedIps, agents] = await Promise.all([
    getAlerts(),
    getBlockedIps(),
    getAgents(),
  ]);

  return { alerts, blockedIps, agents };
}
