import axios from "axios";

// Create default config for http request
const http = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Config client send request with access token
http.interceptors.request.use((config) => ({
  ...config,
  headers: { ...config.headers },
}));

// Config response
http.interceptors.response.use(
  (response) => response.data || response,
  (err) => Promise.reject(err)
);

export { http };
