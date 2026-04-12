export interface Notice {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  date?: string;
  category: string;
  featured: boolean;
  isActive: boolean;
  isImportant: boolean;
  attachmentUrl?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoticeQuery {
  page?: number;
  limit?: number;
  featured?: boolean;
  isActive?: boolean;
  isImportant?: boolean;
  category?: string;
  search?: string;
}
