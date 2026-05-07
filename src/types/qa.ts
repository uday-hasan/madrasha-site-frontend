export interface QAAnswer {
  id: string;
  authorName: string;
  authorRole: "ADMIN" | "TEACHER" | "USER";
  content: string;
  createdAt: string;
  replies: QAReply[];
}

export interface QAReply {
  id: string;
  authorName: string;
  authorRole: "ADMIN" | "TEACHER" | "USER";
  content: string;
  createdAt: string;
}

export interface QAQuestion {
  id: string;
  authorName: string;
  question: string;
  category: string;
  createdAt: string;
  answers: QAAnswer[];
  isResolved: boolean;
  status?: "DRAFT" | "PUBLISHED";
}

export interface QAConfig {
  pageTitle: string;
  pageDescription: string;
  categories: string[];
  questions: QAQuestion[];
}
