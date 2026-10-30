import axios from "axios";

// REACT_APP_API_URL overrides the default. In production the Express server
// serves the React build, so the API lives on the same origin under /api.
const baseURL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3002/api");

export default axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json"
  }
});
