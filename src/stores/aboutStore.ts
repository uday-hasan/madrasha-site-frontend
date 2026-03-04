"use client";
import { create } from "zustand";
import { AboutContent, Achievement } from "@/types/about";
import { fakeAboutContent, fakeAchievements } from "@/lib/fake-data/about-data";
import { fakeDelay } from "@/lib/api/client";

interface AboutStore {
  content: AboutContent | null;
  achievements: Achievement[];
  isLoading: boolean;
  error: string | null;
  fetchAboutData: () => Promise<void>;
}

export const useAboutStore = create<AboutStore>((set) => ({
  content: null,
  achievements: [],
  isLoading: false,
  error: null,
  fetchAboutData: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with real API call
      await fakeDelay(300);
      set({ content: fakeAboutContent, achievements: fakeAchievements, isLoading: false });
    } catch {
      set({ error: "ডেটা লোড করতে সমস্যা হয়েছে।", isLoading: false });
    }
  },
}));
