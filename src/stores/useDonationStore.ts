import { create } from "zustand";
import { settingsService } from "@/api/settings/settings.service";
import { DonationConfig } from "@/types/donation";

interface DonationState {
  data: DonationConfig | null;
  loading: boolean;
  error: string | null;
  fetchDonationData: () => Promise<void>;
}

const defaultCategories = [
  {
    id: "1",
    title: "জাকাত",
    description: "যাকাত ফান্ডে দান করুন",
    icon: "Zakat",
  },
  {
    id: "2",
    title: "ছাত্র বৃত্তি",
    description: "দরিদ্র ছাত্রদের পড়াশোনায় সহায়তা করুন",
    icon: "Scholarship",
  },
  {
    id: "3",
    title: "মাদরাসা উন্নয়ন",
    description: "মাদরাসার অবকাঠামো উন্নয়নে দান করুন",
    icon: "Building",
  },
];

const defaultMethods = [
  {
    id: "1",
    type: "bank" as const,
    name: "ব্যাংক ট্রান্সফার",
    details: { description: "সরাসরি ব্যাংকে টাকা জমা দিন" },
  },
  {
    id: "2",
    type: "mobile" as const,
    name: "মোবাইল ব্যাংকিং",
    details: { description: "বিকাশ/নগদে পাঠান" },
  },
];

export const useDonationStore = create<DonationState>((set) => ({
  data: null,
  loading: false,
  error: null,
  fetchDonationData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await settingsService.getByCategory("donation");
      const settings = response.data;

      // Transform settings to DonationConfig format
      const donationSettings: Record<string, string> = {};
      settings.forEach((s) => {
        donationSettings[s.key] = s.value;
      });

      const data: DonationConfig = {
        pageTitle: donationSettings.donation_title || "মাদরাসায় দান করুন",
        pageDescription:
          donationSettings.donation_description ||
          "আপনার দান মাদরাসার উন্নয়নে সহায়তা করবে",
        bannerText: donationSettings.donation_title || "মাদরাসায় দান করুন",
        quranicVerse: {
          arabic:
            "مَّن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا فَيُضَاعِفَهُ لَهُ وَلَهُ أَجْرٌ كَرِيمٌ",
          bangla: "তোমরা আল্লাহর পথে খরচ করো...",
          reference: "সূরা আল-বাকারা: ২৪৫",
        },
        categories: defaultCategories,
        methods: defaultMethods,
        contactForDonation: {
          phone: donationSettings.donation_bkash_number || "01723567282",
          email: "info@darularqam.edu.bd",
          note: "যোগাযোগের সময়: সকাল ৮টা - বিকেল ৫টা",
        },
      };

      set({ data, loading: false });
    } catch (err) {
      set({
        error:
          err instanceof Error ? err.message : "তথ্য লোড করতে ব্যর্থ হয়েছে",
        loading: false,
      });
    }
  },
}));
