import axiosInstance, { setAccessToken } from './axios';
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
} from '../types/auth';

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', credentials);
    const { accessToken, refreshToken } = response.data;

    // Store tokens
    setAccessToken(accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', credentials);
    const { accessToken, refreshToken } = response.data;

    // Store tokens
    setAccessToken(accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return response.data;
  },

  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post('/auth/logout');
    } finally {
      // Clear tokens regardless of API response
      setAccessToken(null);
      localStorage.removeItem('refreshToken');
    }
  },

  getProfile: async (): Promise<User> => {
    const response = await axiosInstance.get<User>('/profile');
    return response.data;
  },

  checkAuth: async (): Promise<boolean> => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return false;
    }

    try {
      // Try to refresh to validate the refresh token
      const response = await axiosInstance.post('/auth/refresh', { refreshToken });
      const { accessToken, refreshToken: newRefreshToken } = response.data;

      setAccessToken(accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      return true;
    } catch {
      setAccessToken(null);
      localStorage.removeItem('refreshToken');
      return false;
    }
  },
};
