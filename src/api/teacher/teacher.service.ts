import { fetcher } from "../fetcher";

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

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  department?: string;
  education?: string;
  experience?: string;
  photoUrl?: string;
  bio?: string;
  phone?: string;
  email?: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeacherInput {
  name: string;
  designation: string;
  department?: string;
  education?: string;
  experience?: string;
  photoUrl?: string;
  bio?: string;
  phone?: string;
  email?: string;
  isActive?: boolean;
  displayOrder?: number;
}

export const teacherService = {
  // Get all active teachers (public)
  getAllActive: () => fetcher<ApiResponse<Teacher[]>>("/teachers/active"),

  // Get all teachers (admin)
  getAll: () => fetcher<ApiResponse<Teacher[]>>("/teachers"),

  // Get teacher by id
  getById: (id: string) => fetcher<ApiResponse<Teacher>>(`/teachers/${id}`),

  // Create teacher (admin)
  create: (data: TeacherInput) =>
    fetcher<ApiResponse<Teacher>>("/teachers", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Update teacher (admin)
  update: (id: string, data: Partial<TeacherInput>) =>
    fetcher<ApiResponse<Teacher>>(`/teachers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Delete teacher (admin)
  delete: (id: string) =>
    fetcher<ApiResponse<void>>(`/teachers/${id}`, {
      method: "DELETE",
    }),
};
