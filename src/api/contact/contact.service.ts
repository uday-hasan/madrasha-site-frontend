import { fetcher } from "../fetcher";

export interface ContactInfo {
  address: string;
  city: string;
  district: string;
  phone: string[];
  email: string[];
  officeHours: string;
  googleMapsUrl?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const contactService = {
  // Get contact page data
  getContactData: () => fetcher<ApiResponse<ContactInfo>>("/contact"),

  // Update contact data (Admin only)
  updateContactData: (data: Partial<ContactInfo>) =>
    fetcher<ApiResponse<ContactInfo>>("/contact", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Submit contact form
  submitContactForm: (data: ContactFormData) =>
    fetcher<ApiResponse<{ name: string; email: string; subject: string }>>(
      "/contact/submit",
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    ),
};
