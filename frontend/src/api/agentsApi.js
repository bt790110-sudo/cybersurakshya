import api from "./axios";

export async function getAgents() {
  const { data } = await api.get("/agents");
  return data;
}
