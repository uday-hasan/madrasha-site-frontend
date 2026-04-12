import { fetcher } from "../fetcher";
import { Department, DepartmentQuery } from "@/types/department";

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

export const departmentService = {
  // Get all departments (with pagination and filters)
  getAll: (query: DepartmentQuery) =>
    fetcher<ApiResponse<Department[]>>("/departments", {
      params: query as Record<string, string>,
    }),

  // Get active departments (for public pages)
  getActive: () => fetcher<ApiResponse<Department[]>>('/departments/active'),

  // Get department by ID
  getById: (id: string) => fetcher<ApiResponse<Department>>(`/departments/${id}`),

  // Get department by slug
  getBySlug: (slug: string) => fetcher<ApiResponse<Department>>(`/departments/slug/${slug}`),

  // Create department (Admin only)
  create: (formData: FormData) =>
    fetcher<ApiResponse<Department>>("/departments", {
      method: "POST",
      body: formData,
    }),

  // Update department (Admin only)
  update: (id: string, formData: FormData) =>
    fetcher<ApiResponse<Department>>(`/departments/${id}`, {
      method: "PUT",
      body: formData,
    }),

  // Delete department (Admin only)
  delete: (id: string) =>
    fetcher<ApiResponse<void>>(`/departments/${id}`, { method: "DELETE" }),
};
