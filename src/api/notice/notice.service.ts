import { fetcher } from "../fetcher";
import { Notice, NoticeQuery } from "@/types/notice";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const noticeService = {
  // Get all notices (with pagination and filters)
  getAll: (query: NoticeQuery) =>
    fetcher<ApiResponse<Notice[]>>("/notices", { params: query as Record<string, string> }),

  // Get featured notices
  getFeatured: () => fetcher<ApiResponse<Notice[]>>('/notices/featured'),

  // Get important notices (for marquee)
  getImportant: () => fetcher<ApiResponse<Notice[]>>('/notices/important'),

  // Get active notices (for public pages)
  getActive: (limit?: number) =>
    fetcher<ApiResponse<Notice[]>>("/notices/active", {
      params: limit ? { limit: String(limit) } : undefined,
    }),

  // Get notice by ID
  getById: (id: string) => fetcher<ApiResponse<Notice>>(`/notices/${id}`),

  // Get notice by slug
  getBySlug: (slug: string) => fetcher<ApiResponse<Notice>>(`/notices/slug/${slug}`),

  // Create notice (Admin only)
  create: (data: Partial<Notice>) =>
    fetcher<ApiResponse<Notice>>("/notices", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Update notice (Admin only)
  update: (id: string, data: Partial<Notice>) =>
    fetcher<ApiResponse<Notice>>(`/notices/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Delete notice (Admin only)
  delete: (id: string) =>
    fetcher<ApiResponse<void>>(`/notices/${id}`, { method: "DELETE" }),
};
