import { create } from "zustand";
import { qaConfig } from "@/lib/fake-data/qa";
import { QAConfig } from "@/types/qa";
// import { apiClient } from '@/lib/api/client';
// import { endpoints } from '@/lib/api/endpoints';

interface QAState {
  data: QAConfig | null;
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  searchQuery: string;
  fetchQAData: () => Promise<void>;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useQAStore = create<QAState>((set) => ({
  data: null,
  loading: false,
  error: null,
  selectedCategory: "সকল",
  searchQuery: "",
  fetchQAData: async () => {
    set({ loading: true, error: null });
    try {
      // TODO: Replace with real API call when backend is ready
      // const response = await apiClient.get(endpoints.QA);
      // set({ data: response.data, loading: false });

      // Fake API call (simulating network delay)
      await new Promise((resolve) => setTimeout(resolve, 300));
      set({ data: qaConfig, loading: false });
    } catch {
      set({ error: "তথ্য লোড করতে ব্যর্থ হয়েছে", loading: false });
    }
  },
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
