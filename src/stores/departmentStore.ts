"use client";
import { create } from "zustand";
import { Department, DepartmentQuery } from "@/types/department";
import { departmentService } from "@/api/department/department.service";

interface DepartmentStore {
  departments: Department[];
  activeDepartments: Department[];
  selectedDepartment: Department | null;
  isLoading: boolean;
  error: string | null;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
  fetchDepartments: (query?: DepartmentQuery) => Promise<void>;
  fetchActiveDepartments: () => Promise<void>;
  fetchDepartmentBySlug: (slug: string) => Promise<void>;
  createDepartment: (formData: FormData) => Promise<boolean>;
  updateDepartment: (id: string, formData: FormData) => Promise<boolean>;
  deleteDepartment: (id: string) => Promise<boolean>;
}

export const useDepartmentStore = create<DepartmentStore>((set, get) => ({
  departments: [],
  activeDepartments: [],
  selectedDepartment: null,
  isLoading: false,
  error: null,
  meta: null,

  fetchDepartments: async (query = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await departmentService.getAll(query);
      set({
        departments: response.data,
        meta: response.meta || null,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "বিভাগের তালিকা লোড করতে সমস্যা হয়েছে।",
        isLoading: false,
      });
    }
  },

  fetchActiveDepartments: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await departmentService.getActive();
      set({
        activeDepartments: response.data,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "সক্রিয় বিভাগ লোড করতে সমস্যা হয়েছে।",
        isLoading: false,
      });
    }
  },

  fetchDepartmentBySlug: async (slug: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await departmentService.getBySlug(slug);
      set({
        selectedDepartment: response.data,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "বিভাগ খুঁজে পাওয়া যায়নি।",
        isLoading: false,
      });
    }
  },

  createDepartment: async (formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      await departmentService.create(formData);
      await get().fetchDepartments();
      set({ isLoading: false });
      return true;
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "বিভাগ তৈরি করতে সমস্যা হয়েছে।",
        isLoading: false,
      });
      return false;
    }
  },

  updateDepartment: async (id: string, formData: FormData) => {
    set({ isLoading: true, error: null });
    try {
      await departmentService.update(id, formData);
      await get().fetchDepartments();
      set({ isLoading: false });
      return true;
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "বিভাগ আপডেট করতে সমস্যা হয়েছে।",
        isLoading: false,
      });
      return false;
    }
  },

  deleteDepartment: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await departmentService.delete(id);
      await get().fetchDepartments();
      set({ isLoading: false });
      return true;
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "বিভাগ মুছতে সমস্যা হয়েছে।",
        isLoading: false,
      });
      return false;
    }
  },
}));
