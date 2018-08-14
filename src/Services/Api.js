import axios from "axios";

const api = axios.create({
  baseURL: process.env.BaseUrl || "http://localhost:5000"
});

export default api;
