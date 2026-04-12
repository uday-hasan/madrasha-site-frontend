"use client";
import { create } from "zustand";
import { Notice, NoticeQuery } from "@/types/notice";
import { noticeService } from "@/api/notice/notice.service";

interface NoticeStore {
  notices: Notice[];
  importantNotices: Notice[];
  selectedNotice: Notice | null;
  isLoading: boolean;
  error: string | null;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
  fetchNotices: (query?: NoticeQuery) => Promise<void>;
  fetchImportantNotices: () => Promise<void>;
  fetchNoticeBySlug: (slug: string) => Promise<void>;
  createNotice: (data: Partial<Notice>) => Promise<boolean>;
  updateNotice: (id: string, data: Partial<Notice>) => Promise<boolean>;
  deleteNotice: (id: string) => Promise<boolean>;
}

export const useNoticeStore = create<NoticeStore>((set, get) => ({
  notices: [],
  importantNotices: [],
  selectedNotice: null,
  isLoading: false,
  error: null,
  meta: null,

  fetchNotices: async (query = {}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await noticeService.getAll(query);
      set({
        notices: response.data,
        meta: response.meta || null,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "ডেটা লোড করতে সমস্যা হয়েছে।",
        isLoading: false,
      });
    }
  },

  fetchImportantNotices: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await noticeService.getImportant();
      set({
        importantNotices: response.data,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "ডেটা লোড করতে সমস্যা হয়েছে।",
        isLoading: false,
      });
    }
  },

  fetchNoticeBySlug: async (slug: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await noticeService.getBySlug(slug);
      set({
        selectedNotice: response.data,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "নোটিশ খুঁজে পাওয়া যায়নি।",
        isLoading: false,
      });
    }
  },

  createNotice: async (data: Partial<Notice>) => {
    set({ isLoading: true, error: null });
    try {
      await noticeService.create(data);
      await get().fetchNotices();
      set({ isLoading: false });
      return true;
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "নোটিশ তৈরি করতে সমস্যা হয়েছে।",
        isLoading: false,
      });
      return false;
    }
  },

  updateNotice: async (id: string, data: Partial<Notice>) => {
    set({ isLoading: true, error: null });
    try {
      await noticeService.update(id, data);
      await get().fetchNotices();
      set({ isLoading: false });
      return true;
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "নোটিশ আপডেট করতে সমস্যা হয়েছে।",
        isLoading: false,
      });
      return false;
    }
  },

  deleteNotice: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await noticeService.delete(id);
      await get().fetchNotices();
      set({ isLoading: false });
      return true;
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "নোটিশ মুছতে সমস্যা হয়েছে।",
        isLoading: false,
      });
      return false;
    }
  },
}));
