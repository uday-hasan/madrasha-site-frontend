"use client";
import { create } from "zustand";
import { Notice } from "@/types/notice";
import { fakeNotices } from "@/lib/fake-data/notices-data";
import { fakeDelay } from "@/lib/api/client";

interface NoticeStore {
  notices: Notice[];
  selectedNotice: Notice | null;
  isLoading: boolean;
  error: string | null;
  fetchNotices: () => Promise<void>;
  fetchNoticeBySlug: (slug: string) => Promise<void>;
}

export const useNoticeStore = create<NoticeStore>((set) => ({
  notices: [],
  selectedNotice: null,
  isLoading: false,
  error: null,
  fetchNotices: async () => {
    set({ isLoading: true, error: null });
    try {
      await fakeDelay(300);
      set({ notices: fakeNotices, isLoading: false });
    } catch {
      set({ error: "ডেটা লোড করতে সমস্যা হয়েছে।", isLoading: false });
    }
  },
  fetchNoticeBySlug: async (slug: string) => {
    set({ isLoading: true, error: null });
    try {
      await fakeDelay(200);
      const notice = fakeNotices.find((n) => n.slug === slug) || null;
      set({ selectedNotice: notice, isLoading: false });
    } catch {
      set({ error: "ডেটা লোড করতে সমস্যা হয়েছে।", isLoading: false });
    }
  },
}));
