import { fetcher } from "@/api/fetcher";

export interface AdmissionRequirement {
  id?: string;
  departmentId?: string;
  department?: { id: string; name: string };
  minimumAge: string;
  minimumQualification: string;
  documents: string[];
  fees: string;
  seats: number;
  displayOrder?: number;
  isActive?: boolean;
}

export interface AdmissionProcess {
  id?: string;
  step: string;
  displayOrder?: number;
  isActive?: boolean;
}

export interface AdmissionImportantDate {
  id?: string;
  event: string;
  date: string;
  displayOrder?: number;
  isActive?: boolean;
}

export interface AdmissionSettings {
  id?: string;
  isOpen: boolean;
  session: string;
  startDate: string;
  endDate: string;
  officeHoursStart?: string;
  officeHoursEnd?: string;
  officeHoursDays?: string;
}

export interface AdmissionInfo {
  settings: AdmissionSettings;
  processes: string[];
  requirements: AdmissionRequirement[];
  importantDates: AdmissionImportantDate[];
}

export const admissionService = {
  // ============ PUBLIC API ============
  getFullAdmissionInfo: async () => {
    return fetcher("/admission");
  },

  // ============ ADMIN API ============

  // Settings
  getSettings: async () => {
    return fetcher("/admission/admin/settings");
  },

  updateSettings: async (data: Partial<AdmissionSettings>) => {
    return fetcher("/admission/admin/settings", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // Processes
  getProcesses: async () => {
    return fetcher("/admission/admin/processes");
  },

  createProcess: async (data: AdmissionProcess) => {
    return fetcher("/admission/admin/processes", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateProcess: async (id: string, data: Partial<AdmissionProcess>) => {
    return fetcher(`/admission/admin/processes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  deleteProcess: async (id: string) => {
    return fetcher(`/admission/admin/processes/${id}`, { method: "DELETE" });
  },

  // Requirements
  getRequirements: async () => {
    return fetcher("/admission/admin/requirements");
  },

  getRequirementById: async (id: string) => {
    return fetcher(`/admission/admin/requirements/${id}`);
  },

  createRequirement: async (data: AdmissionRequirement) => {
    return fetcher("/admission/admin/requirements", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateRequirement: async (
    id: string,
    data: Partial<AdmissionRequirement>,
  ) => {
    return fetcher(`/admission/admin/requirements/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  deleteRequirement: async (id: string) => {
    return fetcher(`/admission/admin/requirements/${id}`, { method: "DELETE" });
  },

  // Important Dates
  getImportantDates: async () => {
    return fetcher("/admission/admin/important-dates");
  },

  getImportantDateById: async (id: string) => {
    return fetcher(`/admission/admin/important-dates/${id}`);
  },

  createImportantDate: async (data: AdmissionImportantDate) => {
    return fetcher("/admission/admin/important-dates", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateImportantDate: async (
    id: string,
    data: Partial<AdmissionImportantDate>,
  ) => {
    return fetcher(`/admission/admin/important-dates/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  deleteImportantDate: async (id: string) => {
    return fetcher(`/admission/admin/important-dates/${id}`, {
      method: "DELETE",
    });
  },
};
