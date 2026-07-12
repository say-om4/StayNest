import axios from "axios";

const API = axios.create({
  baseURL: "https://saypglife.free.nf/backend/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;