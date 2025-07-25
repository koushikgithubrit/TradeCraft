import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Configure axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  isAdmin: boolean;
  mobile?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  googleLogin: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await api.get('/auth/check');
      if (response.data.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('Login attempt:', { email, url: `${API_URL}/auth/login` });
      
      const response = await api.post('/auth/login', { 
        email, 
        password 
      });

      console.log('Login response:', response.data);
      
      if (response.data.user) {
        setUser(response.data.user);
      } else {
        throw new Error('No user data in response');
      }
    } catch (error: any) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const googleLogin = async (token: string) => {
    try {
      const response = await api.post('/auth/google', { token });
      if (response.data.user) {
        setUser(response.data.user);
      } else {
        throw new Error('No user data in response');
      }
    } catch (error: any) {
      console.error('Google login error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Google login failed');
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      loading,
      login,
      logout,
      googleLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 