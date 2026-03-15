import { HeroSlide, Stat, NewsItem } from "@/types/home";
import { siteConfig } from "../constants/site-config";

export const fakeHeroSlides: HeroSlide[] = [
  {
    id: 1,
    title: `${siteConfig.name} এ আপনাকে স্বাগতম`,
    subtitle: "ইলম ও আমলের পথে আদর্শ প্রজন্ম গঠন",
    description:
      "২০২৪ সাল থেকে ইসলামী শিক্ষার আলো ছড়িয়ে দিচ্ছে আমাদের প্রতিষ্ঠান। কুরআন, হাদিস ও নৈতিক শিক্ষার সমন্বয়ে গড়ে তুলছি আলোকিত প্রজন্ম।",
    imageUrl: "/images/home/banner-1.jpeg",
    ctaText: "ভর্তি তথ্য জানুন",
    ctaLink: "/admission",
  },
  {
    id: 2,
    title: "হিফজুল কোরআন বিভাগ",
    subtitle: "কোরআনের হাফেজ তৈরির কারখানা",
    description:
      "অভিজ্ঞ উস্তাদের তত্ত্বাবধানে পবিত্র কুরআনুল কারীম হিফজ করুন। বিশেষ পদ্ধতিতে সহজে মুখস্থ করার সুযোগ।",
    imageUrl: "/images/home/banner-2.jpeg",
    ctaText: "বিভাগ সম্পর্কে জানুন",
    ctaLink: "/departments/hifz",
  },
  {
    id: 3,
    title: "২০২৫-২০২৬ সালের ভর্তি চলছে",
    subtitle: "সীমিত আসন, এখনই আবেদন করুন",
    description:
      "নতুন শিক্ষাবর্ষে ভর্তির আবেদন গ্রহণ করা হচ্ছে। নূরানী, নাজেরা, হিফজ, মক্তব ও ফরজে আইন বিভাগে আসন সীমিত। দ্রুত আবেদন করুন।",
    imageUrl: "/images/home/banner-3.jpeg",
    ctaText: "আবেদন করুন",
    ctaLink: "/admission",
  },
  {
    id: 4,
    title: "২০২৫-২০২৬ সালের ভর্তি চলছে",
    subtitle: "সীমিত আসন, এখনই আবেদন করুন",
    description:
      "নতুন শিক্ষাবর্ষে ভর্তির আবেদন গ্রহণ করা হচ্ছে। নূরানী, নাজেরা, হিফজ, মক্তব ও ফরজে আইন বিভাগে আসন সীমিত। দ্রুত আবেদন করুন।",
    imageUrl: "/images/home/banner-4.jpeg",
    ctaText: "আবেদন করুন",
    ctaLink: "/admission",
  },
  {
    id: 5,
    title: "২০২৫-২০২৬ সালের ভর্তি চলছে",
    subtitle: "সীমিত আসন, এখনই আবেদন করুন",
    description:
      "নতুন শিক্ষাবর্ষে ভর্তির আবেদন গ্রহণ করা হচ্ছে। নূরানী, নাজেরা, হিফজ, মক্তব ও ফরজে আইন বিভাগে আসন সীমিত। দ্রুত আবেদন করুন।",
    imageUrl: "/images/home/banner-5.jpeg",
    ctaText: "আবেদন করুন",
    ctaLink: "/admission",
  },
  {
    id: 6,
    title: "২০২৫-২০২৬ সালের ভর্তি চলছে",
    subtitle: "সীমিত আসন, এখনই আবেদন করুন",
    description:
      "নতুন শিক্ষাবর্ষে ভর্তির আবেদন গ্রহণ করা হচ্ছে। নূরানী, নাজেরা, হিফজ, মক্তব ও ফরজে আইন বিভাগে আসন সীমিত। দ্রুত আবেদন করুন।",
    imageUrl: "/images/home/banner-6.jpeg",
    ctaText: "আবেদন করুন",
    ctaLink: "/admission",
  },
];

export const fakeStats: Stat[] = [
  { id: 1, label: "মোট শিক্ষার্থী", value: 100, suffix: "+", icon: "users" },
  {
    id: 2,
    label: "অভিজ্ঞ শিক্ষক",
    value: 5,
    suffix: "জন",
    icon: "graduation-cap",
  },
  { id: 3, label: "বিভাগ", value: 5, suffix: "টি", icon: "book" },
  {
    id: 4,
    label: "বছরের অভিজ্ঞতা",
    value: 2,
    suffix: "বছর",
    icon: "calendar",
  },
];

export const fakeLatestNews: NewsItem[] = [
  {
    id: 1,
    title: "২০২৬-২০২৭ শিক্ষাবর্ষে ভর্তি চলছে",
    excerpt:
      "মাদরাসা দারুল আরকাম আল ইসলামিয়ায় নতুন শিক্ষাবর্ষে ভর্তি আবেদন গ্রহণ শুরু হয়েছে। সকল বিভাগে আসন সীমিত।",
    date: "2026-03-15",
    category: "ভর্তি",
    slug: "admission-notice-2026-2027",
  },
  {
    id: 2,
    title: "ঈদুল ফিতরের ছুটির নোটিশ",
    excerpt:
      "১৩ই মার্চ থেকে নূরানী বিভাগ  এবং ১৭ই মার্চ থেকে নাজেরা ও নূরণী বিভাগ  ২৭ শে মার্চ পর্যন্ত  সকল অফিসিয়াল কার্যক্রম বন্ধ থাকবে। নাজেরা এবং নূরানী বিভাগে বিভাগের শিক্ষার্থীরা অবশ্যই শুক্রবার বিকেলে মাদরাসায় উপস্থিত হবে। ইনশা আল্লহ।",
    date: "2026-03-15",
    category: "",
    slug: "eid-holiday-notice-2026",
  },
  // {
  //   id: 3,
  //   title: "বার্ষিক মাহফিল ও পুরস্কার বিতরণী অনুষ্ঠান",
  //   excerpt:
  //     "আগামী মাসে মাদরাসার বার্ষিক মাহফিল ও পুরস্কার বিতরণী অনুষ্ঠান অনুষ্ঠিত হবে। সকলকে আমন্ত্রণ জানানো হচ্ছে।",
  //   date: "2025-02-01",
  //   category: "অনুষ্ঠান",
  //   slug: "annual-mahfil-2025",
  // },
];
