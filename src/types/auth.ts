export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "superadmin";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
