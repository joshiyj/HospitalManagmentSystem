import axios from "axios";

const API = axios.create({
  baseURL: "https://hospital-backend-mhks.onrender.com",
});

export default API;