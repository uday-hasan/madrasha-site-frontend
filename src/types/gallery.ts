export interface GalleryImage {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  mediaType: "image" | "video";
  category: string;
  date: string;
}

export interface GalleryCategory {
  id: number;
  name: string;
  slug: string;
}
