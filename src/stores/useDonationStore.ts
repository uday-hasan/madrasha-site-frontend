import { create } from "zustand";
import { donationConfig } from "@/lib/fake-data/donation";
import { DonationConfig } from "@/types/donation";
// import { apiClient } from '@/lib/api/client';
// import { endpoints } from '@/lib/api/endpoints';

interface DonationState {
  data: DonationConfig | null;
  loading: boolean;
  error: string | null;
  fetchDonationData: () => Promise<void>;
}

export const useDonationStore = create<DonationState>((set) => ({
  data: null,
  loading: false,
  error: null,
  fetchDonationData: async () => {
    set({ loading: true, error: null });
    try {
      // TODO: Replace with real API call when backend is ready
      // const response = await apiClient.get(endpoints.DONATION);
      // set({ data: response.data, loading: false });

      // Fake API call (simulating network delay)
      await new Promise((resolve) => setTimeout(resolve, 300));
      set({ data: donationConfig, loading: false });
    } catch {
      set({ error: "তথ্য লোড করতে ব্যর্থ হয়েছে", loading: false });
    }
  },
}));
