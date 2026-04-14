"use client";
import { create } from "zustand";
import { teacherService, Teacher } from "@/api/teacher/teacher.service";

interface TeacherStore {
  teachers: Teacher[];
  selectedTeacher: Teacher | null;
  isLoading: boolean;
  error: string | null;
  fetchTeachers: () => Promise<void>;
  fetchTeacherById: (id: string) => Promise<void>;
}

export const useTeacherStore = create<TeacherStore>((set) => ({
  teachers: [],
  selectedTeacher: null,
  isLoading: false,
  error: null,
  fetchTeachers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await teacherService.getAllActive();
      set({ teachers: response.data || [], isLoading: false });
    } catch (err) {
      set({
        error:
          err instanceof Error ? err.message : "ডেটা লোড করতে সমস্যা হয়েছে।",
        isLoading: false,
      });
    }
  },
  fetchTeacherById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await teacherService.getById(id);
      set({ selectedTeacher: response.data, isLoading: false });
    } catch (err) {
      set({
        error:
          err instanceof Error ? err.message : "ডেটা লোড করতে সমস্যা হয়েছে।",
        isLoading: false,
      });
    }
  },
}));
