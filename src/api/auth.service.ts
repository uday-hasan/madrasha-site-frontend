import { fetcher } from "./fetcher";
import { LoginInput, RegisterInput, User } from "@/types/auth";

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
};
