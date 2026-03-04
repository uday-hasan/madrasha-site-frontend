// API Endpoints
// These are commented out until the Express backend is ready

export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: "/auth/login",
  AUTH_LOGOUT: "/auth/logout",
  AUTH_ME: "/auth/me",

  // Home
  HOME_DATA: "/home",
  HOME_STATS: "/home/stats",

  // About
  ABOUT: "/about",
  ACHIEVEMENTS: "/about/achievements",

  // Departments
  DEPARTMENTS: "/departments",
  DEPARTMENT_BY_SLUG: (slug: string) => `/departments/${encodeURIComponent(slug)}`,

  // Teachers
  TEACHERS: "/teachers",
  TEACHER_BY_ID: (id: number) => `/teachers/${id}`,

  // Admission
  ADMISSION_INFO: "/admission",

  // Results
  RESULTS_SEARCH: "/results/search",

  // Gallery
  GALLERY: "/gallery",
  GALLERY_CATEGORIES: "/gallery/categories",

  // Notices
  NOTICES: "/notices",
  NOTICE_BY_SLUG: (slug: string) => `/notices/${encodeURIComponent(slug)}`,

  // Contact
  CONTACT_INFO: "/contact",
  CONTACT_FORM: "/contact/submit",
} as const;
