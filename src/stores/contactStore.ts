"use client";
import { create } from "zustand";
import { ContactInfo, ContactFormData } from "@/types/contact";
import { fakeContactInfo } from "@/lib/fake-data/contact-data";
import { fakeDelay } from "@/lib/api/client";

interface ContactStore {
  contactInfo: ContactInfo | null;
  isLoading: boolean;
  isSubmitting: boolean;
  submitSuccess: boolean;
  error: string | null;
  fetchContactInfo: () => Promise<void>;
  submitContactForm: (data: ContactFormData) => Promise<void>;
}

export const useContactStore = create<ContactStore>((set) => ({
  contactInfo: null,
  isLoading: false,
  isSubmitting: false,
  submitSuccess: false,
  error: null,
  fetchContactInfo: async () => {
    set({ isLoading: true, error: null });
    try {
      await fakeDelay(300);
      set({ contactInfo: fakeContactInfo, isLoading: false });
    } catch {
      set({ error: "ডেটা লোড করতে সমস্যা হয়েছে।", isLoading: false });
    }
  },
  submitContactForm: async (_data: ContactFormData) => {
    set({ isSubmitting: true, error: null, submitSuccess: false });
    try {
      await fakeDelay(1000);
      set({ isSubmitting: false, submitSuccess: true });
    } catch {
      set({ error: "বার্তা পাঠাতে সমস্যা হয়েছে।", isSubmitting: false });
    }
  },
}));
