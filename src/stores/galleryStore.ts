"use client";
import { create } from "zustand";
import { GalleryImage, GalleryCategory } from "@/types/gallery";
import {
  fakeGalleryImages,
  fakeGalleryCategories,
} from "@/lib/fake-data/gallery-data";
import { fakeDelay } from "@/lib/api/client";

interface GalleryStore {
  images: GalleryImage[];
  categories: GalleryCategory[];
  activeCategory: string;
  isLoading: boolean;
  error: string | null;
  fetchGallery: () => Promise<void>;
  setActiveCategory: (category: string) => void;
}

export const useGalleryStore = create<GalleryStore>((set) => ({
  images: [],
  categories: [],
  activeCategory: "all",
  isLoading: false,
  error: null,
  fetchGallery: async () => {
    set({ isLoading: true, error: null });
    try {
      await fakeDelay(300);
      set({
        images: fakeGalleryImages,
        categories: fakeGalleryCategories,
        isLoading: false,
      });
    } catch {
      set({ error: "ডেটা লোড করতে সমস্যা হয়েছে।", isLoading: false });
    }
  },
  setActiveCategory: (category: string) => set({ activeCategory: category }),
}));
