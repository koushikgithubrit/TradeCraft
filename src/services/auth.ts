import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  isAdmin?: boolean;
  mobile?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

const TOKEN_KEY = 'auth_token';

// Admin credentials for development
const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'admin123'
};

export const authService = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),

  getCurrentUser: async (): Promise<User | null> => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;

    try {
      const response = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  register: async (
    name: string,
    email: string,
    password: string,
    mobile?: string,
    isAdmin?: boolean
  ): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        mobile,
        isAdmin
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  googleLogin: async (token: string): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`${API_URL}/google`, { token });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Google login failed');
    }
  },
}; 