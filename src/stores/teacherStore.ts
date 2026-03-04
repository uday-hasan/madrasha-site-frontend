"use client";
import { create } from "zustand";
import { Teacher } from "@/types/teacher";
import { fakeTeachers } from "@/lib/fake-data/teachers-data";
import { fakeDelay } from "@/lib/api/client";

interface TeacherStore {
  teachers: Teacher[];
  selectedTeacher: Teacher | null;
  isLoading: boolean;
  error: string | null;
  fetchTeachers: () => Promise<void>;
  fetchTeacherById: (id: number) => Promise<void>;
}

export const useTeacherStore = create<TeacherStore>((set) => ({
  teachers: [],
  selectedTeacher: null,
  isLoading: false,
  error: null,
  fetchTeachers: async () => {
    set({ isLoading: true, error: null });
    try {
      await fakeDelay(300);
      set({ teachers: fakeTeachers, isLoading: false });
    } catch {
      set({ error: "ডেটা লোড করতে সমস্যা হয়েছে।", isLoading: false });
    }
  },
  fetchTeacherById: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await fakeDelay(200);
      const teacher = fakeTeachers.find((t) => t.id === id) || null;
      set({ selectedTeacher: teacher, isLoading: false });
    } catch {
      set({ error: "ডেটা লোড করতে সমস্যা হয়েছে।", isLoading: false });
    }
  },
}));
