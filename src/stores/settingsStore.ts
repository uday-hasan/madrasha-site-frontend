"use client";
import { create } from "zustand";
import { settingsService } from "@/api/settings/settings.service";

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  category: string;
  description?: string;
  isPublic: boolean;
}

interface SettingsStore {
  settings: SiteSetting[];
  isLoading: boolean;
  error: string | null;
  fetchSettings: () => Promise<void>;
  fetchSettingsByCategory: (category: string) => Promise<void>;
  getSettingByKey: (key: string) => string | undefined;
  getSettingsByCategory: (category: string) => Record<string, string>;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: [],
  isLoading: false,
  error: null,

  fetchSettings: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await settingsService.getPublic();
      set({ settings: response.data, isLoading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "সেটিংস লোড করতে সমস্যা হয়েছে।",
        isLoading: false,
      });
    }
  },

  fetchSettingsByCategory: async (category: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await settingsService.getByCategory(category);
      // Merge with existing settings, replacing ones from this category
      const existingSettings = get().settings.filter(s => s.category !== category);
      set({ settings: [...existingSettings, ...response.data], isLoading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "সেটিংস লোড করতে সমস্যা হয়েছে।",
        isLoading: false,
      });
    }
  },

  getSettingByKey: (key: string) => {
    const setting = get().settings.find(s => s.key === key);
    return setting?.value;
  },

  getSettingsByCategory: (category: string) => {
    const settings = get().settings.filter(s => s.category === category);
    return settings.reduce((acc, s) => {
      acc[s.key] = s.value;
      return acc;
    }, {} as Record<string, string>);
  },
}));
