import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

// Add token to requests
axios.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('auth_token');
      Cookies.remove('user_data');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'tenant' | 'owner' | 'admin' | 'vendor';
  unitNumber?: string;
  propertyId?: string;
  verified: boolean;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: 'tenant' | 'owner' | 'admin' | 'vendor';
  unitNumber?: string;
  propertyId?: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Mock login for demo purposes
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: 'Demo User',
        role: this.getRoleFromEmail(credentials.email),
        verified: true,
        createdAt: new Date().toISOString()
      };

      const mockToken = 'mock-jwt-token';
      const mockRefreshToken = 'mock-refresh-token';
      
      // Store tokens securely
      Cookies.set('auth_token', mockToken, { 
        expires: 7, 
        secure: false, // Set to true in production with HTTPS
        sameSite: 'strict' 
      });
      Cookies.set('refresh_token', mockRefreshToken, { 
        expires: 30, 
        secure: false, // Set to true in production with HTTPS
        sameSite: 'strict' 
      });
      Cookies.set('user_data', JSON.stringify(mockUser), { 
        expires: 7, 
        secure: false, // Set to true in production with HTTPS
        sameSite: 'strict' 
      });
      
      return { user: mockUser, token: mockToken, refreshToken: mockRefreshToken };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  async signup(data: SignupData): Promise<AuthResponse> {
    try {
      // Mock signup for demo purposes
      const mockUser: User = {
        id: '1',
        email: data.email,
        name: data.name,
        role: data.role,
        unitNumber: data.unitNumber,
        propertyId: data.propertyId,
        verified: true,
        createdAt: new Date().toISOString()
      };

      const mockToken = 'mock-jwt-token';
      const mockRefreshToken = 'mock-refresh-token';
      
      // Store tokens securely
      Cookies.set('auth_token', mockToken, { 
        expires: 7, 
        secure: false, // Set to true in production with HTTPS
        sameSite: 'strict' 
      });
      Cookies.set('refresh_token', mockRefreshToken, { 
        expires: 30, 
        secure: false, // Set to true in production with HTTPS
        sameSite: 'strict' 
      });
      Cookies.set('user_data', JSON.stringify(mockUser), { 
        expires: 7, 
        secure: false, // Set to true in production with HTTPS
        sameSite: 'strict' 
      });
      
      return { user: mockUser, token: mockToken, refreshToken: mockRefreshToken };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  }

  async logout(): Promise<void> {
    try {
      // In a real app, you'd call the logout endpoint
      // await axios.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      Cookies.remove('auth_token');
      Cookies.remove('refresh_token');
      Cookies.remove('user_data');
    }
  }

  async refreshToken(): Promise<string> {
    try {
      const refreshToken = Cookies.get('refresh_token');
      if (!refreshToken) throw new Error('No refresh token');
      
      // Mock refresh for demo
      const newToken = 'new-mock-jwt-token';
      
      Cookies.set('auth_token', newToken, { 
        expires: 7, 
        secure: false, // Set to true in production with HTTPS
        sameSite: 'strict' 
      });
      
      return newToken;
    } catch (error) {
      this.logout();
      throw error;
    }
  }

  getCurrentUser(): User | null {
    try {
      const userData = Cookies.get('user_data');
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    return Cookies.get('auth_token') || null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  async verifyToken(): Promise<boolean> {
    try {
      // Mock verification for demo
      return !!this.getToken();
    } catch {
      return false;
    }
  }

  private getRoleFromEmail(email: string): 'tenant' | 'owner' | 'admin' | 'vendor' {
    if (email.includes('admin')) return 'admin';
    if (email.includes('owner')) return 'owner';
    if (email.includes('vendor')) return 'vendor';
    return 'tenant';
  }
}

export const authService = new AuthService();