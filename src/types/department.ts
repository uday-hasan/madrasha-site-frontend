export interface Department {
  id: string;
  name: string;
  slug: string;
  description: string;
  duration: string;
  subjects: string[];
  headTeacher?: string;
  totalStudents: number;
  imageUrl?: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentQuery {
  page?: number;
  limit?: number;
  isActive?: boolean;
  search?: string;
}
