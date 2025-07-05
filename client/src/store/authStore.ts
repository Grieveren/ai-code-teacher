import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '../services/authService';
import { AuthState, LoginCredentials, RegisterData, UserWithProgress } from '../types/auth';

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  updateProfile: (updates: Partial<Pick<UserWithProgress, 'firstName' | 'lastName' | 'profilePicture'>>) => Promise<void>;
  clearAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        try {
          const { user, token } = await authService.login(credentials);
          
          // Get full user data with progress
          const userWithProgress = await authService.getCurrentUser();
          
          set({
            user: userWithProgress,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true });
        try {
          await authService.register(userData);
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await authService.logout();
        } catch (error) {
          console.warn('Logout error:', error);
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      loadUser: async () => {
        const token = authService.getToken();
        if (!token) {
          set({ isLoading: false });
          return;
        }

        set({ isLoading: true });
        try {
          const userWithProgress = await authService.getCurrentUser();
          set({
            user: userWithProgress,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          // Token might be invalid
          authService.removeToken();
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      updateProfile: async (updates) => {
        try {
          const updatedUser = await authService.updateProfile(updates);
          
          // Merge the updates with existing progress data
          const currentUser = get().user;
          if (currentUser) {
            set({
              user: {
                ...currentUser,
                ...updatedUser,
              },
            });
          }
        } catch (error) {
          throw error;
        }
      },

      clearAuth: () => {
        authService.removeToken();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
