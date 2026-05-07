"use client";
import { create } from "zustand";
import {
  teacherService,
  Teacher,
  TeacherInput,
} from "@/api/teacher/teacher.service";

// Helper function to extract meaningful error messages
function extractErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    const message = err.message;

    // Extract Prisma validation errors
    if (message.includes("Argument")) {
      const match = message.match(/Argument `(\w+)`:(.*?)(?=\n|$)/);
      if (match) {
        return `${match[1]}: ${match[2].trim()}`;
      }
    }

    // Extract general error messages
    if (message.includes("Invalid")) {
      return message.split("\n")[0];
    }

    return message;
  }
  return "একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।";
}

interface TeacherStore {
  teachers: Teacher[];
  selectedTeacher: Teacher | null;
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  success: string | null;
  fetchTeachers: () => Promise<void>;
  fetchTeacherById: (id: string) => Promise<void>;
  getAllTeachers: () => Promise<void>;
  createTeacher: (data: TeacherInput) => Promise<void>;
  updateTeacher: (id: string, data: Partial<TeacherInput>) => Promise<void>;
  deleteTeacher: (id: string) => Promise<void>;
  clearError: () => void;
  clearSuccess: () => void;
}

export const useTeacherStore = create<TeacherStore>((set) => ({
  teachers: [],
  selectedTeacher: null,
  isLoading: false,
  isSubmitting: false,
  error: null,
  success: null,

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

  getAllTeachers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await teacherService.getAll();
      set({ teachers: response.data || [], isLoading: false });
    } catch (err) {
      set({
        error:
          err instanceof Error ? err.message : "ডেটা লোড করতে সমস্যা হয়েছে।",
        isLoading: false,
      });
    }
  },

  createTeacher: async (data: TeacherInput) => {
    set({ isSubmitting: true, error: null, success: null });
    try {
      const response = await teacherService.create(data);
      set((state) => ({
        teachers: [...state.teachers, response.data],
        isSubmitting: false,
        success: "শিক্ষক সফলভাবে যোগ করা হয়েছে।",
      }));
    } catch (err) {
      const errorMessage = extractErrorMessage(err);
      set({
        error: errorMessage,
        isSubmitting: false,
      });
    }
  },

  updateTeacher: async (id: string, data: Partial<TeacherInput>) => {
    set({ isSubmitting: true, error: null, success: null });
    try {
      const response = await teacherService.update(id, data);
      set((state) => ({
        teachers: state.teachers.map((t) => (t.id === id ? response.data : t)),
        selectedTeacher:
          state.selectedTeacher?.id === id
            ? response.data
            : state.selectedTeacher,
        isSubmitting: false,
        success: "শিক্ষকের তথ্য আপডেট হয়েছে।",
      }));
    } catch (err) {
      const errorMessage = extractErrorMessage(err);
      set({
        error: errorMessage,
        isSubmitting: false,
      });
    }
  },

  deleteTeacher: async (id: string) => {
    set({ isSubmitting: true, error: null, success: null });
    try {
      await teacherService.delete(id);
      set((state) => ({
        teachers: state.teachers.filter((t) => t.id !== id),
        selectedTeacher:
          state.selectedTeacher?.id === id ? null : state.selectedTeacher,
        isSubmitting: false,
        success: "শিক্ষক মুছে ফেলা হয়েছে।",
      }));
    } catch (err) {
      const errorMessage = extractErrorMessage(err);
      set({
        error: errorMessage,
        isSubmitting: false,
      });
    }
  },

  clearError: () => set({ error: null }),
  clearSuccess: () => set({ success: null }),
}));
