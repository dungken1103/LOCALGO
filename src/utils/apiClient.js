
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '';
// console.log('API Base URL:', baseURL);

const client = axios.create({
  baseURL,
  timeout: 30000,
  withCredentials: false, 
});
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});

export const apiClient = {
  get: (url, params = {}, timeout, contentType = 'application/json') =>
    client.get(url, { params, timeout, headers: { 'Content-Type': contentType } }),

  post: (url, data = {}, timeout, contentType = 'application/json') =>
    client.post(url, data, { timeout, headers: { 'Content-Type': contentType } }),

  put: (url, data = {}, timeout, contentType = 'application/json') =>
    client.put(url, data, { timeout, headers: { 'Content-Type': contentType } }),

  patch: (url, data = {}, timeout, contentType = 'application/json') =>
    client.patch(url, data, { timeout, headers: { 'Content-Type': contentType } }),

  delete: (url, params = {}, timeout, contentType = 'application/json') =>
    client.delete(url, { params, timeout, headers: { 'Content-Type': contentType } }),
};