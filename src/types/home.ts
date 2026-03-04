export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}

export interface Stat {
  id: number;
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl?: string;
  slug: string;
}

export interface HomePageData {
  heroSlides: HeroSlide[];
  stats: Stat[];
  latestNews: NewsItem[];
}
