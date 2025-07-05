import axios from 'axios';
import { LoginCredentials, RegisterData, AuthResponse, UserWithProgress } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class AuthService {
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add auth token to requests if available
    this.axiosInstance.interceptors.request.use((config) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async register(userData: RegisterData): Promise<{ message: string; user: any }> {
    const response = await this.axiosInstance.post('/auth/register', userData);
    return response.data;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.axiosInstance.post<AuthResponse>('/auth/login', credentials);
    const { user, token } = response.data;
    
    // Store token in localStorage
    this.setToken(token);
    
    return { user, token };
  }

  async logout(): Promise<void> {
    try {
      await this.axiosInstance.post('/auth/logout');
    } catch (error) {
      // Logout endpoint might fail, but we should still clear local storage
      console.warn('Logout request failed:', error);
    } finally {
      this.removeToken();
    }
  }

  async getCurrentUser(): Promise<UserWithProgress> {
    const response = await this.axiosInstance.get<UserWithProgress>('/auth/me');
    return response.data;
  }

  async updateProfile(updates: Partial<Pick<UserWithProgress, 'firstName' | 'lastName' | 'profilePicture'>>): Promise<UserWithProgress> {
    const response = await this.axiosInstance.put<UserWithProgress>('/auth/profile', updates);
    return response.data;
  }

  async verifyToken(): Promise<{ valid: boolean; user?: any }> {
    try {
      const response = await this.axiosInstance.get('/auth/verify');
      return response.data;
    } catch (error) {
      return { valid: false };
    }
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  removeToken(): void {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new AuthService();
