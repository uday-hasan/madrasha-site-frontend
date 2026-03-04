export interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  category: string;
  isImportant: boolean;
  attachmentUrl?: string;
  slug: string;
}
