import { fetcher } from "../fetcher";
import { QAQuestion } from "@/types/qa";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface QAData {
  pageTitle: string;
  pageDescription: string;
  categories: string[];
  questions: QAQuestion[];
}

export interface CreateQuestionInput {
  question: string;
  category: string;
  authorName: string;
}

export interface AddAnswerInput {
  content: string;
  authorName: string;
  authorRole: "ADMIN" | "TEACHER" | "USER";
}

export interface AddReplyInput {
  content: string;
  authorName: string;
  authorRole?: "ADMIN" | "TEACHER" | "USER";
}

export const qaService = {
  // Get all published questions (public)
  getAllPublished: () => fetcher<ApiResponse<QAQuestion[]>>("/qa/published"),

  // Get all questions (admin)
  getAll: () => fetcher<ApiResponse<QAQuestion[]>>("/qa"),

  // Get question by ID
  getById: (id: string) => fetcher<ApiResponse<QAQuestion>>(`/qa/${id}`),

  // Create new question (public)
  createQuestion: (data: CreateQuestionInput) =>
    fetcher<ApiResponse<QAQuestion>>("/qa/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Update question (admin)
  updateQuestion: (id: string, data: Partial<CreateQuestionInput>) =>
    fetcher<ApiResponse<QAQuestion>>(`/qa/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Publish question (admin)
  publishQuestion: (id: string) =>
    fetcher<ApiResponse<QAQuestion>>(`/qa/${id}/publish`, {
      method: "PUT",
    }),

  // Unpublish question (admin)
  unpublishQuestion: (id: string) =>
    fetcher<ApiResponse<QAQuestion>>(`/qa/${id}/unpublish`, {
      method: "PUT",
    }),

  // Delete question (admin)
  deleteQuestion: (id: string) =>
    fetcher<ApiResponse<void>>(`/qa/${id}`, {
      method: "DELETE",
    }),

  // Add answer (admin)
  addAnswer: (questionId: string, data: AddAnswerInput) =>
    fetcher<ApiResponse<any>>(`/qa/${questionId}/answers`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Update answer (admin)
  updateAnswer: (answerId: string, data: Partial<AddAnswerInput>) =>
    fetcher<ApiResponse<any>>(`/qa/${answerId}/answers`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Delete answer (admin)
  deleteAnswer: (answerId: string) =>
    fetcher<ApiResponse<void>>(`/qa/${answerId}/answers`, {
      method: "DELETE",
    }),

  // Add reply (public)
  addReply: (answerId: string, data: AddReplyInput) =>
    fetcher<ApiResponse<any>>(`/qa/${answerId}/replies`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Delete reply (admin)
  deleteReply: (replyId: string) =>
    fetcher<ApiResponse<void>>(`/qa/${replyId}/replies`, {
      method: "DELETE",
    }),
};
