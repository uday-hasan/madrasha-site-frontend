import { fetcher } from "../fetcher";
import { HomePageData, UpdateHomeDataInput } from "@/types/home";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const homeService = {
  // Get home page data (public)
  getHomeData: () => fetcher<ApiResponse<HomePageData>>("/home"),

  // Get hero slides (admin only)
  getSlides: () => fetcher<ApiResponse<{ heroSlides: any[] }>>("/home/slides"),

  // Update hero slides (admin only)
  updateSlides: (data: UpdateHomeDataInput) =>
    fetcher<ApiResponse<{ heroSlides: any[] }>>("/home/slides", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Get statistics (admin only)
  getStats: () => fetcher<ApiResponse<{ stats: any[] }>>("/home/stats"),

  // Update statistics (admin only)
  updateStats: (data: UpdateHomeDataInput) =>
    fetcher<ApiResponse<{ stats: any[] }>>("/home/stats", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Upload hero slide image (Admin only)
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    return fetcher<ApiResponse<{ imageUrl: string }>>("/home/upload", {
      method: "POST",
      body: formData,
    });
  },

  // Delete uploaded image (Admin only)
  deleteImage: (imageUrl: string) =>
    fetcher<ApiResponse<void>>("/home/image", {
      method: "DELETE",
      body: JSON.stringify({ imageUrl }),
    }),

  // Upsert slide (create or update with FormData)
  upsertSlide: (formData: FormData) =>
    fetcher<ApiResponse<HomePageData>>("/home/slide", {
      method: "PUT",
      body: formData,
    }),

  // Delete slide
  deleteSlide: (slideId: string) =>
    fetcher<ApiResponse<HomePageData>>(`/home/slide/${slideId}`, {
      method: "DELETE",
    }),
};
