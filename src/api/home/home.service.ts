import { fetcher } from "../fetcher";
import { HomePageData, UpdateHomeDataInput } from "@/types/home";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const homeService = {
  // Get home page data
  getHomeData: () => fetcher<ApiResponse<HomePageData>>("/home"),

  // Upload hero slide image (Admin only)
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    return fetcher<ApiResponse<{ imageUrl: string }>>("/home/upload", {
      method: "POST",
      body: formData,
    });
  },

  // Update home page data (Admin only)
  updateHomeData: (data: UpdateHomeDataInput) =>
    fetcher<ApiResponse<HomePageData>>("/home", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};
