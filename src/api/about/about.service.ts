import { fetcher } from "../fetcher";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ============ ABOUT SECTIONS ============
export interface AboutSection {
  id: string;
  title: string;
  slug: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============ ABOUT VALUES ============
export interface AboutValue {
  id: string;
  title: string;
  description: string;
  icon?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============ ACHIEVEMENTS ============
export interface Achievement {
  id: string;
  year: string;
  title: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============ PROPOSED BUILDINGS ============
export interface ProposedBuilding {
  id: string;
  title: string;
  imageUrl?: string;
  status: string;
  estimatedCost?: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============ LEADERSHIP ============
export interface LeadershipMember {
  id: string;
  name: string;
  designation: string;
  photoUrl?: string;
  bio?: string;
  email?: string;
  phone?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============ ABOUT QUOTES ============
export interface AboutQuote {
  id: string;
  quote: string;
  author: string;
  authorRole: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const aboutService = {
  // ============ ABOUT SECTIONS ============
  getSections: () =>
    fetcher<ApiResponse<AboutSection[]>>("/about/sections/public"),

  getAllSections: () =>
    fetcher<ApiResponse<AboutSection[]>>("/about/sections/admin"),

  getSectionById: (id: string) =>
    fetcher<ApiResponse<AboutSection>>(`/about/sections/${id}`),

  createSection: (data: Partial<AboutSection>) =>
    fetcher<ApiResponse<AboutSection>>("/about/sections", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateSection: (id: string, data: Partial<AboutSection>) =>
    fetcher<ApiResponse<AboutSection>>(`/about/sections/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteSection: (id: string) =>
    fetcher<ApiResponse<void>>(`/about/sections/${id}`, {
      method: "DELETE",
    }),

  // ============ ABOUT VALUES ============
  getValues: () => fetcher<ApiResponse<AboutValue[]>>("/about/values/public"),

  getAllValues: () => fetcher<ApiResponse<AboutValue[]>>("/about/values/admin"),

  createValue: (data: Partial<AboutValue>) =>
    fetcher<ApiResponse<AboutValue>>("/about/values", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateValue: (id: string, data: Partial<AboutValue>) =>
    fetcher<ApiResponse<AboutValue>>(`/about/values/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteValue: (id: string) =>
    fetcher<ApiResponse<void>>(`/about/values/${id}`, {
      method: "DELETE",
    }),

  // ============ ACHIEVEMENTS ============
  getAchievements: () =>
    fetcher<ApiResponse<Achievement[]>>("/about/achievements/public"),

  getAllAchievements: () =>
    fetcher<ApiResponse<Achievement[]>>("/about/achievements/admin"),

  createAchievement: (data: Partial<Achievement>) =>
    fetcher<ApiResponse<Achievement>>("/about/achievements", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateAchievement: (id: string, data: Partial<Achievement>) =>
    fetcher<ApiResponse<Achievement>>(`/about/achievements/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteAchievement: (id: string) =>
    fetcher<ApiResponse<void>>(`/about/achievements/${id}`, {
      method: "DELETE",
    }),

  // ============ PROPOSED BUILDINGS ============
  getBuildings: () =>
    fetcher<ApiResponse<ProposedBuilding[]>>("/about/buildings/public"),

  getAllBuildings: () =>
    fetcher<ApiResponse<ProposedBuilding[]>>("/about/buildings/admin"),

  createBuilding: (formData: FormData) =>
    fetcher<ApiResponse<ProposedBuilding>>("/about/buildings", {
      method: "POST",
      body: formData,
    }),

  updateBuilding: (id: string, formData: FormData) =>
    fetcher<ApiResponse<ProposedBuilding>>(`/about/buildings/${id}`, {
      method: "PUT",
      body: formData,
    }),

  deleteBuilding: (id: string) =>
    fetcher<ApiResponse<void>>(`/about/buildings/${id}`, {
      method: "DELETE",
    }),

  // ============ LEADERSHIP ============
  getLeadership: () =>
    fetcher<ApiResponse<LeadershipMember[]>>("/about/leadership/public"),

  getAllLeadership: () =>
    fetcher<ApiResponse<LeadershipMember[]>>("/about/leadership/admin"),

  createLeadershipMember: (data: Partial<LeadershipMember>) =>
    fetcher<ApiResponse<LeadershipMember>>("/about/leadership", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateLeadershipMember: (id: string, data: Partial<LeadershipMember>) =>
    fetcher<ApiResponse<LeadershipMember>>(`/about/leadership/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteLeadershipMember: (id: string) =>
    fetcher<ApiResponse<void>>(`/about/leadership/${id}`, {
      method: "DELETE",
    }),

  // ============ ABOUT QUOTES ============
  getQuotes: () => fetcher<ApiResponse<AboutQuote[]>>("/about/quotes/public"),

  getAllQuotes: () => fetcher<ApiResponse<AboutQuote[]>>("/about/quotes/admin"),

  createQuote: (data: Partial<AboutQuote>) =>
    fetcher<ApiResponse<AboutQuote>>("/about/quotes", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateQuote: (id: string, data: Partial<AboutQuote>) =>
    fetcher<ApiResponse<AboutQuote>>(`/about/quotes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteQuote: (id: string) =>
    fetcher<ApiResponse<void>>(`/about/quotes/${id}`, {
      method: "DELETE",
    }),
};
