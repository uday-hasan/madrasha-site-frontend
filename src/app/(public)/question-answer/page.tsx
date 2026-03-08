import QAPageClient from "@/components/qa/QAPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "প্রশ্ন-উত্তর | এবিসি ইসলামিয়া মাদরাসা",
  description:
    "দ্বীনি বিষয়ে আপনার যেকোনো প্রশ্ন করুন। আমাদের অভিজ্ঞ ইসলামিক স্কলারগন (মুফতী) আপনার প্রশ্নের উত্তর দেবেন ইনশাআল্লাহ",
  openGraph: {
    title: "প্রশ্ন-উত্তর | এবিসি ইসলামিয়া মাদরাসা",
    description:
      "দ্বীনি বিষয়ে আপনার যেকোনো প্রশ্ন করুন। আমাদের অভিজ্ঞ ইসলামিক স্কলারগন (মুফতী) আপনার প্রশ্নের উত্তর দেবেন ইনশাআল্লাহ",
    type: "website",
  },
};

export default function QAPage() {
  return <QAPageClient />;
}
