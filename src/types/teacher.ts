export interface Teacher {
  id: number;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  experience: string;
  subjects: string[];
  imageUrl?: string;
  email?: string;
  phone?: string;
  bio: string;
}
