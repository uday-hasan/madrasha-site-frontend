"use client";
import { create } from "zustand";
import { AdminUser, LoginCredentials } from "@/types/auth";
import { fakeDelay } from "@/lib/api/client";

interface AuthStore {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const FAKE_ADMIN: AdminUser = {
  id: "1",
  name: "অ্যাডমিন ব্যবহারকারী",
  email: "admin@darululoom.edu.bd",
  role: "admin",
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      await fakeDelay(800);
      if (
        credentials.email === "admin@darululoom.edu.bd" &&
        credentials.password === "admin123"
      ) {
        document.cookie = "auth_token=fake_token_12345; path=/; max-age=86400";
        set({ user: FAKE_ADMIN, isAuthenticated: true, isLoading: false });
        return true;
      } else {
        set({ error: "ইমেইল বা পাসওয়ার্ড সঠিক নয়।", isLoading: false });
        return false;
      }
    } catch {
      set({ error: "লগইন করতে সমস্যা হয়েছে।", isLoading: false });
      return false;
    }
  },
  logout: async () => {
    set({ isLoading: true });
    try {
      await fakeDelay(300);
      document.cookie = "auth_token=; path=/; max-age=0";
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const hasToken = document.cookie.includes("auth_token");
      if (hasToken) {
        set({ user: FAKE_ADMIN, isAuthenticated: true, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },
}));
