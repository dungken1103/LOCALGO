import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../config/api';

export const authService = {
  async login(credentials) {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      const authData = response.data?.data || response.data || response;

      console.log(
        '🔐 Auth data structure:',
        authData.access_token
          ? 'Token found at root level'
          : response.data?.data?.access_token
          ? 'Token found in data.data'
          : 'Token not found'
      );

      if (authData.access_token) {
        apiClient.setAuthToken(authData.access_token);
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(authData.user));
        }
      }

      return authData;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Login failed'
      );
    }
  },

  async register(userData) {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.AUTH.REGISTER,
        userData
      );

      const authData = response.data?.data || response.data || response;

      console.log(
        '🔐 Register auth data structure:',
        authData.access_token
          ? 'Token found at root level'
          : response.data?.data?.access_token
          ? 'Token found in data.data'
          : 'Token not found'
      );

      if (authData.access_token) {
        apiClient.setAuthToken(authData.access_token);
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(authData.user));
        }
      }

      return authData;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Registration failed'
      );
    }
  },

  logout() {
    apiClient.clearAuthToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },

  getCurrentUser() {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  },

  isAuthenticated() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      const user = localStorage.getItem('user');
      return Boolean(token && user);
    }
    return false;
  },
};
