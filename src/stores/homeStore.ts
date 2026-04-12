"use client";
import { create } from "zustand";
import { HomePageData, UpdateHomeDataInput } from "@/types/home";
import { homeService } from "@/api/home/home.service";

interface HomeStore {
  homeData: HomePageData | null;
  isLoading: boolean;
  error: string | null;
  fetchHomeData: () => Promise<void>;
  updateHomeData: (data: UpdateHomeDataInput) => Promise<boolean>;
}

export const useHomeStore = create<HomeStore>((set, get) => ({
  homeData: null,
  isLoading: false,
  error: null,

  fetchHomeData: async () => {
    // Return cached data if available
    const cached = get().homeData;
    if (cached && !get().isLoading) {
      // Silently refresh in background
      set({ isLoading: false });
    } else {
      set({ isLoading: true, error: null });
    }

    try {
      const response = await homeService.getHomeData();
      set({
        homeData: response.data,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "হোম পেজ ডেটা লোড করতে সমস্যা হয়েছে।",
        isLoading: false,
      });
    }
  },

  updateHomeData: async (data: UpdateHomeDataInput) => {
    set({ isLoading: true, error: null });
    try {
      const response = await homeService.updateHomeData(data);
      set({
        homeData: response.data,
        isLoading: false,
      });
      return true;
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "হোম পেজ আপডেট করতে সমস্যা হয়েছে।",
        isLoading: false,
      });
      return false;
    }
  },
}));
