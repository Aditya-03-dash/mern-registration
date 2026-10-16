import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const getRegistrations = () => api.get("/registrations");
export const createRegistration = (data) => api.post("/registrations", data);
export const deleteRegistration = (id) => api.delete(`/registrations/${id}`);

export default api;
