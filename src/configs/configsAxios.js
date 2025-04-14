import axios from "axios";

// Set your token here
const accessToken = "ACCESS_TOKEN";

// Create an instance with custom configuration
const instance = axios.create({
  baseURL: "https://api.example.com",
  timeout: 60000,
});

// Add an interceptor to include the token in the request headers
instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Now you can use the instance to make authenticated requests
