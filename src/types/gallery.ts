export interface GalleryImage {
  id: number;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  date: string;
}

export interface GalleryCategory {
  id: number;
  name: string;
  slug: string;
}
