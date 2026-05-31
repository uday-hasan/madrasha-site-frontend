import { fetcher } from "../fetcher";

export interface ApplicationFormData {
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  fatherName: string;
  fatherPhone: string;
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  departmentId: string;
  paymentMethod: "ONLINE" | "CASH";
  notes?: string;
}

export const applicationService = {
  // Submit a new application
  submitApplication: async (data: ApplicationFormData) => {
    return fetcher("/applications/create", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Get all applications (admin only)
  getApplications: async (
    page = 1,
    limit = 10,
    filters?: {
      status?: string;
      departmentId?: string;
      paymentMethod?: string;
      search?: string;
    },
  ) => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    if (filters?.status) params.append("status", filters.status);
    if (filters?.departmentId)
      params.append("departmentId", filters.departmentId);
    if (filters?.paymentMethod)
      params.append("paymentMethod", filters.paymentMethod);
    if (filters?.search) params.append("search", filters.search);

    return fetcher(`/applications?${params.toString()}`, {
      method: "GET",
    });
  },

  // Get single application
  getApplicationById: async (id: string) => {
    return fetcher(`/applications/${id}`, {
      method: "GET",
    });
  },

  // Update application status (admin only)
  updateApplicationStatus: async (
    id: string,
    status: "PENDING" | "APPROVED" | "REJECTED",
  ) => {
    return fetcher(`/applications/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  // Get application statistics (admin only)
  getApplicationStats: async () => {
    return fetcher("/applications/stats", {
      method: "GET",
    });
  },

  // Delete application (admin only)
  deleteApplication: async (id: string) => {
    return fetcher(`/applications/${id}`, {
      method: "DELETE",
    });
  },
};
