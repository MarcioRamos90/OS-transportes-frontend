import axios from "axios";
import dotenv from "dotenv";

dotenv.load();

const api = axios.create({
  baseURL: 'https://backend-os-goncalves-test.herokuapp.com'
});

export default api;
