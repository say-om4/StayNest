import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost/PG-Life/backend/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;