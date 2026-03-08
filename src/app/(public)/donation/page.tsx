import DonationPageClient from "@/components/donation/DonationPageClient";
import { siteConfig } from "@/lib/constants/site-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "দান-সদকা | এবিসি ইসলামিয়া মাদরাসা",
  description: `${siteConfig.name} এর উন্নয়নে দান করুন। মসজিদ নির্মাণ, এতিম স্পন্সরশিপ, লাইব্রেরি উন্নয়ন ও অন্যান্য খাতে দান করতে পারেন।`,
  openGraph: {
    title: `${siteConfig.name} এর দান-সদকা`,
    description:
      "দ্বীনি শিক্ষার প্রসারে আপনার সহযোগিতা প্রয়োজন। আল্লাহর সন্তুষ্টির জন্য দান করুন।",
    type: "website",
  },
};

export default function DonationPage() {
  return <DonationPageClient />;
}
