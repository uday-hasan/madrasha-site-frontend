export interface Department {
  id: number;
  name: string;
  slug: string;
  description: string;
  duration: string;
  subjects: string[];
  headTeacher: string;
  totalStudents: number;
  imageUrl?: string;
}
