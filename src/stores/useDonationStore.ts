import { create } from "zustand";
import {
  donationService,
  DonationConfig,
} from "@/api/donation/donation.service";

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
      const response = await donationService.getDonationData();
      set({ data: response.data, loading: false });
    } catch (err) {
      set({
        error:
          err instanceof Error ? err.message : "তথ্য লোড করতে ব্যর্থ হয়েছে",
        loading: false,
      });
    }
  },
}));
