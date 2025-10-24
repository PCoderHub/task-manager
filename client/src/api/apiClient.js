import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-i2a6.onrender.com/api",
  withCredentials: true,
});

export default api;
