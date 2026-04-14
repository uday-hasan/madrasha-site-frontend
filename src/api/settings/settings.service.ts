import { fetcher } from "../fetcher";

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  category: string;
  description?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const settingsService = {
  // Get all public settings
  getPublic: () =>
    fetcher<ApiResponse<SiteSetting[]>>("/settings/public"),

  // Get settings by category
  getByCategory: (category: string) =>
    fetcher<ApiResponse<SiteSetting[]>>(`/settings/public/${category}`),

  // Get single setting by key
  getByKey: (key: string) =>
    fetcher<ApiResponse<SiteSetting>>(`/settings/public/key/${key}`),

  // Get all settings (Admin only)
  getAll: () =>
    fetcher<ApiResponse<SiteSetting[]>>('/settings'),

  // Create setting (Admin only)
  create: (data: { key: string; value: string; category: string; description?: string; isPublic?: boolean }) =>
    fetcher<ApiResponse<SiteSetting>>("/settings", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Update setting (Admin only)
  update: (id: string, data: { value: string; description?: string; isPublic?: boolean }) =>
    fetcher<ApiResponse<SiteSetting>>(`/settings/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Delete setting (Admin only)
  delete: (id: string) =>
    fetcher<ApiResponse<void>>(`/settings/${id}`, { method: "DELETE" }),
};
