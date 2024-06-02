// write intercepter: intercept any request that we're goinna send and it will automatically add the correct headers.
// So that we dont need to manually write it

import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, //import anything that specified inside an environment file
});
