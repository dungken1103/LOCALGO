// axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`, // thay đổi nếu cần
  withCredentials: true, // BẮT BUỘC để gửi cookie
});

// Interceptor để tự động thêm token vào header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor để xử lý lỗi 401 (Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      console.error('Unauthorized - Token may be expired');
      // Có thể redirect về login page hoặc refresh token
      // localStorage.removeItem('token');
      // localStorage.removeItem('user');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
