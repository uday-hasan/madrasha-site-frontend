"use client";
import { create } from "zustand";
import { HeroSlide, Stat, NewsItem } from "@/types/home";
import { fakeHeroSlides, fakeStats, fakeLatestNews } from "@/lib/fake-data/home-data";
import { fakeDelay } from "@/lib/api/client";

interface HomeStore {
  heroSlides: HeroSlide[];
  stats: Stat[];
  latestNews: NewsItem[];
  isLoading: boolean;
  error: string | null;
  fetchHomeData: () => Promise<void>;
}

export const useHomeStore = create<HomeStore>((set) => ({
  heroSlides: [],
  stats: [],
  latestNews: [],
  isLoading: false,
  error: null,
  fetchHomeData: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with real API call
      // const response = await apiClient.get(API_ENDPOINTS.HOME_DATA);
      // set({ heroSlides: response.data.heroSlides, stats: response.data.stats, latestNews: response.data.latestNews });
      await fakeDelay(300);
      set({
        heroSlides: fakeHeroSlides,
        stats: fakeStats,
        latestNews: fakeLatestNews,
        isLoading: false,
      });
    } catch {
      set({ error: "ডেটা লোড করতে সমস্যা হয়েছে।", isLoading: false });
    }
  },
}));
