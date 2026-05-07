import { fetcher } from "../fetcher";

export interface DonationCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface DonationMethod {
  id: string;
  type: "bank" | "mobile" | "cash";
  name: string;
  details: Record<string, string>;
}

export interface QuranicVerse {
  arabic: string;
  bangla: string;
  reference: string;
}

export interface DonationConfig {
  pageTitle: string;
  pageDescription: string;
  bannerText: string;
  quranicVerse: QuranicVerse;
  categories: DonationCategory[];
  methods: DonationMethod[];
  contactForDonation: {
    phone: string;
    email: string;
    note: string;
  };
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const donationService = {
  // Get donation page data
  getDonationData: () => fetcher<ApiResponse<DonationConfig>>("/donation"),

  // Update donation data (Admin only)
  updateDonationData: (data: Partial<DonationConfig>) =>
    fetcher<ApiResponse<DonationConfig>>("/donation", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};
