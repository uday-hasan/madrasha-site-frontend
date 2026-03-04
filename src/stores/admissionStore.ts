"use client";
import { create } from "zustand";
import { AdmissionInfo } from "@/types/admission";
import { fakeAdmissionInfo } from "@/lib/fake-data/admission-data";
import { fakeDelay } from "@/lib/api/client";

interface AdmissionStore {
  admissionInfo: AdmissionInfo | null;
  isLoading: boolean;
  error: string | null;
  fetchAdmissionInfo: () => Promise<void>;
}

export const useAdmissionStore = create<AdmissionStore>((set) => ({
  admissionInfo: null,
  isLoading: false,
  error: null,
  fetchAdmissionInfo: async () => {
    set({ isLoading: true, error: null });
    try {
      await fakeDelay(300);
      set({ admissionInfo: fakeAdmissionInfo, isLoading: false });
    } catch {
      set({ error: "ডেটা লোড করতে সমস্যা হয়েছে।", isLoading: false });
    }
  },
}));
