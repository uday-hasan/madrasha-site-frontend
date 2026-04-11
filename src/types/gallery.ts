export type MediaType = "IMAGE" | "VIDEO";

export interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  mediaType: MediaType;
  category: string;
  featured: boolean;
  uploadedBy?: string;
  uploader?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface GalleryQuery {
  page?: number;
  limit?: number;
  featured?: boolean;
  category?: string;
  mediaType?: MediaType;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
