import api from "./axios";

export async function getBlockedIps() {
  const { data } = await api.get("/blocked-ips");
  return data;
}
