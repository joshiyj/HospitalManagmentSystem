import axios from "axios";

const API = axios.create({
  baseURL: "https://hospital-backend-rl7j.onrender.com",
});

export default API;