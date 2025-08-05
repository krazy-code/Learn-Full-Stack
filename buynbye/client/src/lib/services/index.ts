import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_HOST}${import.meta.env.VITE_API_PREFIX}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_VERCEL_TOKEN}`,
  },
  withCredentials: true,
});

export default axiosInstance;
