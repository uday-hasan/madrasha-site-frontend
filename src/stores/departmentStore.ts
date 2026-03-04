"use client";
import { create } from "zustand";
import { Department } from "@/types/department";
import { fakeDepartments } from "@/lib/fake-data/departments-data";
import { fakeDelay } from "@/lib/api/client";

interface DepartmentStore {
  departments: Department[];
  selectedDepartment: Department | null;
  isLoading: boolean;
  error: string | null;
  fetchDepartments: () => Promise<void>;
  fetchDepartmentBySlug: (slug: string) => Promise<void>;
}

export const useDepartmentStore = create<DepartmentStore>((set) => ({
  departments: [],
  selectedDepartment: null,
  isLoading: false,
  error: null,
  fetchDepartments: async () => {
    set({ isLoading: true, error: null });
    try {
      await fakeDelay(300);
      set({ departments: fakeDepartments, isLoading: false });
    } catch {
      set({ error: "ডেটা লোড করতে সমস্যা হয়েছে।", isLoading: false });
    }
  },
  fetchDepartmentBySlug: async (slug: string) => {
    set({ isLoading: true, error: null });
    try {
      await fakeDelay(200);
      const dept = fakeDepartments.find((d) => d.slug === slug) || null;
      set({ selectedDepartment: dept, isLoading: false });
    } catch {
      set({ error: "ডেটা লোড করতে সমস্যা হয়েছে।", isLoading: false });
    }
  },
}));
