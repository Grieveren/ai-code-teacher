export interface User {
  id: number;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  lastLogin?: string;
}

export interface UserWithProgress extends User {
  totalExercises: number;
  completedExercises: number;
  currentStreak: number;
  totalTimeSpent: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthState {
  user: UserWithProgress | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
