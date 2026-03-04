import { GalleryImage, GalleryCategory } from "@/types/gallery";

export const fakeGalleryCategories: GalleryCategory[] = [
  { id: 1, name: "সকল", slug: "all" },
  { id: 2, name: "অনুষ্ঠান", slug: "events" },
  { id: 3, name: "শ্রেণিকক্ষ", slug: "classroom" },
  { id: 4, name: "খেলাধুলা", slug: "sports" },
  { id: 5, name: "অবকাঠামো", slug: "infrastructure" },
];

export const fakeGalleryImages: GalleryImage[] = [
  {
    id: 1,
    title: "বার্ষিক পুরস্কার বিতরণী অনুষ্ঠান ২০২৪",
    description: "মেধাবী শিক্ষার্থীদের পুরস্কার বিতরণ করা হচ্ছে",
    imageUrl: "/images/gallery/event-1.jpg",
    category: "events",
    date: "2024-12-15",
  },
  {
    id: 2,
    title: "হিফজ বিভাগের ক্লাস",
    description: "অভিজ্ঞ উস্তাদের তত্ত্বাবধানে হিফজ ক্লাস চলছে",
    imageUrl: "/images/gallery/class-1.jpg",
    category: "classroom",
    date: "2024-11-20",
  },
  {
    id: 3,
    title: "বার্ষিক ক্রীড়া প্রতিযোগিতা",
    description: "শিক্ষার্থীরা খেলাধুলায় অংশগ্রহণ করছে",
    imageUrl: "/images/gallery/sports-1.jpg",
    category: "sports",
    date: "2024-11-10",
  },
  {
    id: 4,
    title: "নতুন একাডেমিক ভবন",
    description: "মাদ্রাসার নতুন একাডেমিক ভবনের দৃশ্য",
    imageUrl: "/images/gallery/building-1.jpg",
    category: "infrastructure",
    date: "2024-10-05",
  },
  {
    id: 5,
    title: "সীরাত মাহফিল ২০২৪",
    description: "নবী করীম (সা.) এর জীবনী আলোচনায় সবাই মনোযোগী",
    imageUrl: "/images/gallery/event-2.jpg",
    category: "events",
    date: "2024-09-28",
  },
  {
    id: 6,
    title: "কম্পিউটার ল্যাব",
    description: "নতুন কম্পিউটার ল্যাবে শিক্ষার্থীরা",
    imageUrl: "/images/gallery/class-2.jpg",
    category: "classroom",
    date: "2024-09-15",
  },
];
