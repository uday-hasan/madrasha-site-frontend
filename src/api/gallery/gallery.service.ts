import { fetcher } from "../fetcher";
import { GalleryItem, GalleryQuery } from "@/types/gallery";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: any;
}

export const galleryService = {
  getAll: (query: GalleryQuery) =>
    fetcher<ApiResponse<GalleryItem[]>>("/gallery", { params: query as any }),

  getById: (id: string) => fetcher<ApiResponse<GalleryItem>>(`/gallery/${id}`),

  create: (formData: FormData) =>
    fetcher<ApiResponse<GalleryItem>>("/gallery", {
      method: "POST",
      body: formData,
    }),

  update: (id: string, formData: FormData) =>
    fetcher<ApiResponse<GalleryItem>>(`/gallery/${id}`, {
      method: "PUT",
      body: formData,
    }),

  delete: (id: string) =>
    fetcher<ApiResponse<void>>(`/gallery/${id}`, { method: "DELETE" }),
};
