export interface HeroSlide {
  id: string | number;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface Stat {
  id: string | number;
  label: string;
  value: string | number;
  suffix?: string;
  icon?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  date?: string;
  category: string;
  imageUrl?: string;
  slug: string;
  createdAt: string;
}

export interface AboutValue {
  icon: string;
  title: string;
  desc: string;
}

export interface AboutSummaryData {
  title: string;
  text1?: string;
  text2?: string;
  values: AboutValue[];
}

export interface HomePageData {
  heroSlides: HeroSlide[];
  stats: Stat[];
  featuredNotices: NewsItem[];
  latestGallery: GalleryPreviewItem[];
  activeDepartments: DepartmentPreview[];
  aboutSummary?: AboutSummaryData;
}

export interface GalleryPreviewItem {
  id: string;
  title: string;
  imageUrl?: string;
  videoUrl?: string;
  mediaType: "IMAGE" | "VIDEO";
  category: string;
  description?: string;
}

export interface DepartmentPreview {
  id: string;
  name: string;
  slug: string;
  description: string;
  duration: string;
  totalStudents: number;
  imageUrl?: string;
}

export interface UpdateHomeDataInput {
  heroSlides?: HeroSlide[];
  stats?: Stat[];
  aboutSummary?: AboutSummaryData;
}
