export interface ContactInfo {
  address: string;
  city: string;
  district: string;
  phone: string[];
  email: string[];
  mapEmbedUrl?: string;
  officeHours: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
