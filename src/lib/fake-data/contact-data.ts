import { ContactInfo } from "@/types/contact";
import { siteConfig } from "../constants/site-config";

export const fakeContactInfo: ContactInfo = {
  address: siteConfig.address,
  city: siteConfig.city,
  district: siteConfig.district,
  phone: siteConfig.phone,
  email: siteConfig.email,
  officeHours: siteConfig.officeHours,
};
