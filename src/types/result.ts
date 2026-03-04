export interface ExamResult {
  id: number;
  studentName: string;
  rollNumber: string;
  registration: string;
  department: string;
  year: string;
  exam: string;
  result: string;
  gpa?: string;
}

export interface ResultSearchParams {
  rollNumber?: string;
  registration?: string;
  year?: string;
  exam?: string;
}
