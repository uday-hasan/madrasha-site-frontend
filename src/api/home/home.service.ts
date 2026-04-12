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

  // Update home page data (Admin only)
  updateHomeData: (data: UpdateHomeDataInput) =>
    fetcher<ApiResponse<HomePageData>>("/home", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};
