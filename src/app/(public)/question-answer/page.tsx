import QAPageClient from "@/components/qa/QAPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "প্রশ্ন-উত্তর | এবিসি ইসলামিয়া মাদরাসা",
  description:
    "দ্বীনি বিষয়ে আপনার যেকোনো প্রশ্ন করুন। আমাদের অভিজ্ঞ শিক্ষকমণ্ডলী আপনার প্রশ্নের উত্তর দেবেন।",
  openGraph: {
    title: "প্রশ্ন-উত্তর | এবিসি ইসলামিয়া মাদরাসা",
    description:
      "দ্বীনি বিষয়ে আপনার যেকোনো প্রশ্ন করুন। আমাদের অভিজ্ঞ শিক্ষকমণ্ডলী আপনার প্রশ্নের উত্তর দেবেন।",
    type: "website",
  },
};

export default function QAPage() {
  return <QAPageClient />;
}
