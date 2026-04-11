export type UserRole = "ADMIN" | "USER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// Map these to your backend validation logic
export interface LoginInput {
  email: string;
  password?: string; // Optional if only using for specific logic, but usually required
}

export interface RegisterInput {
  name: string;
  email: string;
  password?: string;
}
