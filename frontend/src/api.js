// write intercepter: intercept any request that we're goinna send and it will automatically add the correct headers.
// So that we dont need to manually write it

import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiURL = "/choreo-apis/djangoreactwebapp/backend/v1";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiURL, //import anything that specified inside an environment file
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
