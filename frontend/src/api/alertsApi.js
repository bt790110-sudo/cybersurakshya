import api from "./axios";

export async function getAlerts() {
  const { data } = await api.get("/alerts");
  return data;
}

export async function getAlertById(id) {
  const { data } = await api.get(`/alerts/${id}`);
  return data;
}
