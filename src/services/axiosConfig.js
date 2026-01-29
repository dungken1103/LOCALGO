// axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, // thay đổi nếu cần
  withCredentials: true, // BẮT BUỘC để gửi cookie
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
    // nếu BE yêu cầu Bearer:
    // config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;
