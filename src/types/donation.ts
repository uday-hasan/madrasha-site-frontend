export interface DonationCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  targetAmount?: number;
  collectedAmount?: number;
}

export interface DonationMethod {
  id: string;
  type: "bank" | "mobile" | "online";
  name: string;
  details: Record<string, string>;
  logo?: string;
}

export interface DonationConfig {
  pageTitle: string;
  pageDescription: string;
  bannerText: string;
  quranicVerse: {
    arabic: string;
    bangla: string;
    reference: string;
  };
  categories: DonationCategory[];
  methods: DonationMethod[];
  contactForDonation: {
    phone: string;
    email: string;
    note: string;
  };
}
