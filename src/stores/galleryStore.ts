import { create } from "zustand";
import { galleryService } from "@/api/gallery/gallery.service";
import { GalleryItem } from "@/types/gallery";

interface GalleryState {
  images: GalleryItem[];
  activeCategory: string;
  isLoading: boolean;
  fetchGallery: () => Promise<void>;
  setActiveCategory: (category: string) => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  images: [],
  activeCategory: "all",
  isLoading: false,
  setActiveCategory: (category) => set({ activeCategory: category }),
  fetchGallery: async () => {
    set({ isLoading: true });
    try {
      const res = await galleryService.getAll({ limit: 100 });
      // res.data is the array of GalleryItems
      set({ images: res.data || [] });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
