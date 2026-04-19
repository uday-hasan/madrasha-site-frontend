"use client";
import { create } from "zustand";
import { HomePageData, UpdateHomeDataInput } from "@/types/home";
import { homeService } from "@/api/home/home.service";

interface HomeStore {
  // Public home page data
  homeData: HomePageData | null;
  isLoading: boolean;
  error: string | null;
  fetchHomeData: () => Promise<void>;

  // Admin: Hero slides
  heroSlides: any[];
  isSlidesLoading: boolean;
  fetchSlides: () => Promise<void>;
  updateSlides: (data: UpdateHomeDataInput) => Promise<boolean>;

  // Admin: Statistics
  stats: any[];
  isStatsLoading: boolean;
  fetchStats: () => Promise<void>;
  updateStats: (data: UpdateHomeDataInput) => Promise<boolean>;

  // Slide management
  upsertSlide: (formData: FormData) => Promise<boolean>;
  deleteSlide: (id: string) => Promise<boolean>;
}

export const useHomeStore = create<HomeStore>((set, get) => ({
  // Public data
  homeData: null,
  isLoading: false,
  error: null,

  fetchHomeData: async () => {
    const cached = get().homeData;
    if (cached && !get().isLoading) {
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
        error:
          err instanceof Error
            ? err.message
            : "হোম পেজ ডেটা লোড করতে সমস্যা হয়েছে।",
        isLoading: false,
      });
    }
  },

  // Admin: Hero slides
  heroSlides: [],
  isSlidesLoading: false,

  fetchSlides: async () => {
    set({ isSlidesLoading: true, error: null });
    try {
      const response = await homeService.getSlides();
      set({
        heroSlides: response.data.heroSlides,
        isSlidesLoading: false,
      });
    } catch (err) {
      set({
        error:
          err instanceof Error
            ? err.message
            : "হিরো স্লাইড লোড করতে সমস্যা হয়েছে।",
        isSlidesLoading: false,
      });
    }
  },

  updateSlides: async (data: UpdateHomeDataInput) => {
    set({ isSlidesLoading: true, error: null });
    try {
      const response = await homeService.updateSlides(data);
      set({
        heroSlides: response.data.heroSlides,
        isSlidesLoading: false,
      });
      return true;
    } catch (err) {
      set({
        error:
          err instanceof Error
            ? err.message
            : "হিরো স্লাইড আপডেট করতে সমস্যা হয়েছে।",
        isSlidesLoading: false,
      });
      return false;
    }
  },

  // Admin: Statistics
  stats: [],
  isStatsLoading: false,

  fetchStats: async () => {
    set({ isStatsLoading: true, error: null });
    try {
      const response = await homeService.getStats();
      set({
        stats: response.data.stats,
        isStatsLoading: false,
      });
    } catch (err) {
      set({
        error:
          err instanceof Error
            ? err.message
            : "পরিসংখ্যান লোড করতে সমস্যা হয়েছে।",
        isStatsLoading: false,
      });
    }
  },

  updateStats: async (data: UpdateHomeDataInput) => {
    set({ isStatsLoading: true, error: null });
    try {
      const response = await homeService.updateStats(data);
      set({
        stats: response.data.stats,
        isStatsLoading: false,
      });
      return true;
    } catch (err) {
      set({
        error:
          err instanceof Error
            ? err.message
            : "পরিসংখ্যান আপডেট করতে সমস্যা হয়েছে।",
        isStatsLoading: false,
      });
      return false;
    }
  },

  // Slide management
  upsertSlide: async (formData: FormData) => {
    set({ isSlidesLoading: true });
    try {
      const response = await homeService.upsertSlide(formData);
      // Update homeData if it exists
      if (get().homeData) {
        set({ homeData: response.data });
      }
      set({ isSlidesLoading: false });
      return true;
    } catch (err) {
      set({ isSlidesLoading: false });
      return false;
    }
  },

  deleteSlide: async (id: string) => {
    try {
      const response = await homeService.deleteSlide(id);
      // Update homeData if it exists
      if (get().homeData) {
        set({ homeData: response.data });
      }
      return true;
    } catch (err) {
      return false;
    }
  },
}));
