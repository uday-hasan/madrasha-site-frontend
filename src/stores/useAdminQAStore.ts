"use client";
import { create } from "zustand";
import {
  qaService,
  CreateQuestionInput,
  AddAnswerInput,
  AddReplyInput,
} from "@/api/qa/qa.service";
import { QAQuestion } from "@/types/qa";

interface AdminQAStore {
  questions: QAQuestion[];
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  success: string | null;
  fetchAllQuestions: () => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
  publishQuestion: (id: string) => Promise<void>;
  unpublishQuestion: (id: string) => Promise<void>;
  addAnswer: (questionId: string, data: AddAnswerInput) => Promise<void>;
  updateAnswer: (
    answerId: string,
    data: Partial<AddAnswerInput>,
  ) => Promise<void>;
  deleteAnswer: (answerId: string) => Promise<void>;
  deleteReply: (replyId: string) => Promise<void>;
  clearError: () => void;
  clearSuccess: () => void;
}

function extractErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    const message = err.message;
    if (message.includes("Argument")) {
      const match = message.match(/Argument `(\w+)`:(.*?)(?=\n|$)/);
      if (match) {
        return `${match[1]}: ${match[2].trim()}`;
      }
    }
    if (message.includes("Invalid")) {
      return message.split("\n")[0];
    }
    return message;
  }
  return "একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।";
}

export const useAdminQAStore = create<AdminQAStore>((set) => ({
  questions: [],
  isLoading: false,
  isSubmitting: false,
  error: null,
  success: null,

  fetchAllQuestions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await qaService.getAll();
      set({ questions: response.data || [], isLoading: false });
    } catch (err) {
      const errorMessage = extractErrorMessage(err);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  deleteQuestion: async (id: string) => {
    set({ isSubmitting: true, error: null, success: null });
    try {
      await qaService.deleteQuestion(id);
      set((state) => ({
        questions: state.questions.filter((q) => q.id !== id),
        isSubmitting: false,
        success: "প্রশ্ন মুছে ফেলা হয়েছে।",
      }));
    } catch (err) {
      const errorMessage = extractErrorMessage(err);
      set({
        error: errorMessage,
        isSubmitting: false,
      });
    }
  },

  publishQuestion: async (id: string) => {
    set({ isSubmitting: true, error: null, success: null });
    try {
      const response = await qaService.publishQuestion(id);
      set((state) => ({
        questions: state.questions.map((q) =>
          q.id === id ? { ...q, status: "PUBLISHED" } : q,
        ),
        isSubmitting: false,
        success: "প্রশ্ন প্রকাশিত হয়েছে।",
      }));
    } catch (err) {
      const errorMessage = extractErrorMessage(err);
      set({
        error: errorMessage,
        isSubmitting: false,
      });
    }
  },

  unpublishQuestion: async (id: string) => {
    set({ isSubmitting: true, error: null, success: null });
    try {
      const response = await qaService.unpublishQuestion(id);
      set((state) => ({
        questions: state.questions.map((q) =>
          q.id === id ? { ...q, status: "DRAFT" } : q,
        ),
        isSubmitting: false,
        success: "প্রশ্ন খসড়ায় রূপান্তরিত হয়েছে।",
      }));
    } catch (err) {
      const errorMessage = extractErrorMessage(err);
      set({
        error: errorMessage,
        isSubmitting: false,
      });
    }
  },

  addAnswer: async (questionId: string, data: AddAnswerInput) => {
    set({ isSubmitting: true, error: null, success: null });
    try {
      const response = await qaService.addAnswer(questionId, data);
      set((state) => ({
        questions: state.questions.map((q) =>
          q.id === questionId
            ? { ...q, answers: [...q.answers, response.data] }
            : q,
        ),
        isSubmitting: false,
        success: "উত্তর যোগ করা হয়েছে।",
      }));
    } catch (err) {
      const errorMessage = extractErrorMessage(err);
      set({
        error: errorMessage,
        isSubmitting: false,
      });
    }
  },

  updateAnswer: async (answerId: string, data: Partial<AddAnswerInput>) => {
    set({ isSubmitting: true, error: null, success: null });
    try {
      const response = await qaService.updateAnswer(answerId, data);
      set((state) => ({
        questions: state.questions.map((q) => ({
          ...q,
          answers: q.answers.map((a) =>
            a.id === answerId ? response.data : a,
          ),
        })),
        isSubmitting: false,
        success: "উত্তর আপডেট হয়েছে।",
      }));
    } catch (err) {
      const errorMessage = extractErrorMessage(err);
      set({
        error: errorMessage,
        isSubmitting: false,
      });
    }
  },

  deleteAnswer: async (answerId: string) => {
    set({ isSubmitting: true, error: null, success: null });
    try {
      await qaService.deleteAnswer(answerId);
      set((state) => ({
        questions: state.questions.map((q) => ({
          ...q,
          answers: q.answers.filter((a) => a.id !== answerId),
        })),
        isSubmitting: false,
        success: "উত্তর মুছে ফেলা হয়েছে।",
      }));
    } catch (err) {
      const errorMessage = extractErrorMessage(err);
      set({
        error: errorMessage,
        isSubmitting: false,
      });
    }
  },

  deleteReply: async (replyId: string) => {
    set({ isSubmitting: true, error: null, success: null });
    try {
      await qaService.deleteReply(replyId);
      set((state) => ({
        questions: state.questions.map((q) => ({
          ...q,
          answers: q.answers.map((a) => ({
            ...a,
            replies: a.replies.filter((r) => r.id !== replyId),
          })),
        })),
        isSubmitting: false,
        success: "মন্তব্য মুছে ফেলা হয়েছে।",
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
