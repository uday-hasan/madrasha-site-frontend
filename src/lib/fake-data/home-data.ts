import { HeroSlide, Stat, NewsItem } from "@/types/home";

export const fakeHeroSlides: HeroSlide[] = [
  {
    id: 1,
    title: "দারুল উলুম মাদ্রাসায় স্বাগতম",
    subtitle: "ইলম ও আমলের পথে",
    description:
      "১৯৮৫ সাল থেকে ইসলামী শিক্ষার আলো ছড়িয়ে দিচ্ছে আমাদের প্রতিষ্ঠান। কুরআন, হাদিস ও আধুনিক শিক্ষার সমন্বয়ে গড়ে তুলছি আলোকিত প্রজন্ম।",
    imageUrl: "/images/hero-1.jpg",
    ctaText: "ভর্তি তথ্য জানুন",
    ctaLink: "/admission",
  },
  {
    id: 2,
    title: "হিফজুল কুরআন বিভাগ",
    subtitle: "কুরআনের হাফেজ তৈরির কারখানা",
    description:
      "অভিজ্ঞ উস্তাদের তত্ত্বাবধানে পবিত্র কুরআনুল কারীম হিফজ করুন। বিশেষ পদ্ধতিতে সহজে মুখস্থ করার সুযোগ।",
    imageUrl: "/images/hero-2.jpg",
    ctaText: "বিভাগ সম্পর্কে জানুন",
    ctaLink: "/departments/hifz",
  },
  {
    id: 3,
    title: "২০২৫ সালের ভর্তি চলছে",
    subtitle: "সীমিত আসন, এখনই আবেদন করুন",
    description:
      "নতুন শিক্ষাবর্ষে ভর্তির আবেদন গ্রহণ করা হচ্ছে। সকল বিভাগে আসন সীমিত। দ্রুত আবেদন করুন।",
    imageUrl: "/images/hero-3.jpg",
    ctaText: "আবেদন করুন",
    ctaLink: "/admission",
  },
];

export const fakeStats: Stat[] = [
  { id: 1, label: "মোট শিক্ষার্থী", value: 1200, suffix: "+", icon: "users" },
  {
    id: 2,
    label: "অভিজ্ঞ শিক্ষক",
    value: 45,
    suffix: "জন",
    icon: "graduation-cap",
  },
  { id: 3, label: "বিভাগ", value: 8, suffix: "টি", icon: "book" },
  {
    id: 4,
    label: "বছরের অভিজ্ঞতা",
    value: 40,
    suffix: "+",
    icon: "calendar",
  },
];

export const fakeLatestNews: NewsItem[] = [
  {
    id: 1,
    title: "২০২৫ সালের বার্ষিক পরীক্ষার ফলাফল প্রকাশ",
    excerpt:
      "এ বছর মাদ্রাসার সকল বিভাগে শতভাগ পাস এবং অনেক শিক্ষার্থী জিপিএ-৫ অর্জন করেছে।",
    date: "2025-01-15",
    category: "ফলাফল",
    slug: "2025-annual-exam-result",
  },
  {
    id: 2,
    title: "বার্ষিক মাহফিল ও পুরস্কার বিতরণী অনুষ্ঠান",
    excerpt:
      "আগামী ২৫ জানুয়ারি মাদ্রাসার বার্ষিক মাহফিল ও পুরস্কার বিতরণী অনুষ্ঠান অনুষ্ঠিত হবে।",
    date: "2025-01-10",
    category: "অনুষ্ঠান",
    slug: "annual-mahfil-2025",
  },
  {
    id: 3,
    title: "নতুন কম্পিউটার ল্যাব উদ্বোধন",
    excerpt:
      "শিক্ষার্থীদের আধুনিক প্রযুক্তির সাথে পরিচয় করিয়ে দিতে নতুন কম্পিউটার ল্যাব স্থাপন করা হয়েছে।",
    date: "2025-01-05",
    category: "অবকাঠামো",
    slug: "new-computer-lab",
  },
];
