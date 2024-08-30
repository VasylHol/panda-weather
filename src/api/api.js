import axios from "axios";
// const ACCESS_TOKEN = 'd89e8b87e14b116039f57f2a38495bb0'
let base_url = `https://api.openweathermap.org`; //
// api caching
export default function (baseUrl = base_url) {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return axiosInstance;
}