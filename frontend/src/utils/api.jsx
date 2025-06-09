import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-jvn8.onrender.com/api",  // Make sure this is correct
  headers: { "Content-Type": "application/json" }
});

export default API;
