import { fetcher } from "./fetcher";
import { LoginInput, RegisterInput, User } from "@/types/auth";

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateProfileInput {
  name: string;
}

export const authService = {
  login: (data: LoginInput) =>
    fetcher<User>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  register: (data: RegisterInput) =>
    fetcher<User>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () => fetcher("/auth/logout", { method: "POST" }),

  getMe: () =>
    fetcher<User>("/auth/me", {
      next: { revalidate: 0 }, // Disable cache for 'me' check
    }),

  changePassword: (data: ChangePasswordInput) =>
    fetcher<void>("/auth/change-password", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  updateProfile: (data: UpdateProfileInput) =>
    fetcher<User>("/auth/profile", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};
