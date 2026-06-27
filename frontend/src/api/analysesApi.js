import api from "./axios";

export async function getAnalysisById(id) {
  const { data } = await api.get(`/analyses/${id}`);
  return data;
}
