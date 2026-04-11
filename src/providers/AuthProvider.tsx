// src/providers/AuthProvider.tsx
"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { authService } from "@/api/auth.service";
import { toast } from "react-toastify";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await authService.getMe();
        setAuth(user);
      } catch (err) {
        toast.error(
          err instanceof Error
            ? err.message
            : "Failed to initialize authentication",
        );
        logout(); // Cookie expired or invalid
      }
    };
    initAuth();
  }, [setAuth, logout]);

  return <>{children}</>;
};
