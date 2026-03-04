"use client";
import { create } from "zustand";
import { ExamResult, ResultSearchParams } from "@/types/result";
import { fakeResults } from "@/lib/fake-data/results-data";
import { fakeDelay } from "@/lib/api/client";

interface ResultStore {
  results: ExamResult[];
  searchResults: ExamResult[];
  isLoading: boolean;
  isSearching: boolean;
  error: string | null;
  fetchResults: () => Promise<void>;
  searchResults_fn: (params: ResultSearchParams) => Promise<void>;
}

export const useResultStore = create<ResultStore>((set) => ({
  results: [],
  searchResults: [],
  isLoading: false,
  isSearching: false,
  error: null,
  fetchResults: async () => {
    set({ isLoading: true, error: null });
    try {
      await fakeDelay(300);
      set({ results: fakeResults, isLoading: false });
    } catch {
      set({ error: "ডেটা লোড করতে সমস্যা হয়েছে।", isLoading: false });
    }
  },
  searchResults_fn: async (params: ResultSearchParams) => {
    set({ isSearching: true, error: null });
    try {
      await fakeDelay(500);
      const filtered = fakeResults.filter((r) => {
        if (params.rollNumber && !r.rollNumber.includes(params.rollNumber)) return false;
        if (params.year && r.year !== params.year) return false;
        return true;
      });
      set({ searchResults: filtered, isSearching: false });
    } catch {
      set({ error: "অনুসন্ধানে সমস্যা হয়েছে।", isSearching: false });
    }
  },
}));
