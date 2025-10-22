import axios from "axios";

export const apiPlaceholder = axios.create({
  baseURL: "http://localhost:3000/api/placeholder",
});
