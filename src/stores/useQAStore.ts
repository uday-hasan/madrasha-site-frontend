import { create } from "zustand";
import { qaService } from "@/api/qa/qa.service";
import { QAConfig } from "@/types/qa";

const qaCategories = [
  "আকীদা ও বিশ্বাস",
  "নামায ও ইবাদত",
  "যাকাত ও সদকা",
  "বিবাহ ও পারিবারিক",
  "লেনদেন ও ব্যবসা",
  "সাধারণ মাসায়েল",
  "ভর্তি সংক্রান্ত",
  "অন্যান্য",
];

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
      const response = await qaService.getAllPublished();
      set({
        data: {
          pageTitle: "প্রশ্ন-উত্তর",
          pageDescription:
            "দ্বীনি বিষয়ে আপনার যেকোনো প্রশ্ন করুন। আমাদের অভিজ্ঞ ইসলামিক স্কলারগন (মুফতী) আপনার প্রশ্নের উত্তর দেবেন ইনশাআল্লাহ",
          categories: qaCategories,
          questions: response.data || [],
        },
        loading: false,
      });
    } catch (err) {
      set({
        error:
          err instanceof Error ? err.message : "তথ্য লোড করতে ব্যর্থ হয়েছে",
        loading: false,
      });
    }
  },
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
