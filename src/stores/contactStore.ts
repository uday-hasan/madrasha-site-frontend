"use client";
import { create } from "zustand";
import {
  ContactInfo,
  ContactFormData,
  contactService,
} from "@/api/contact/contact.service";

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
      const response = await contactService.getContactData();
      set({ contactInfo: response.data, isLoading: false });
    } catch (err) {
      set({
        error:
          err instanceof Error ? err.message : "ডেটা লোড করতে সমস্যা হয়েছে।",
        isLoading: false,
      });
    }
  },
  submitContactForm: async (data: ContactFormData) => {
    set({ isSubmitting: true, error: null, submitSuccess: false });
    try {
      await contactService.submitContactForm(data);
      set({ isSubmitting: false, submitSuccess: true });
    } catch (err) {
      set({
        error:
          err instanceof Error ? err.message : "বার্তা পাঠাতে সমস্যা হয়েছে।",
        isSubmitting: false,
      });
    }
  },
}));
