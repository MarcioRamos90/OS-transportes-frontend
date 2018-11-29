import axios from "axios";

// const apihost = "https://backend-os-goncalves-test.herokuapp.com";
const apihost = "http://localhost:5000";

const api = axios.create({
  baseURL: apihost
});

export default api;
