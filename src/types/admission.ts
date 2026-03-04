export interface AdmissionRequirement {
  department: string;
  minimumAge: string;
  minimumQualification: string;
  documents: string[];
  fees: string;
  seats: number;
}

export interface AdmissionInfo {
  isOpen: boolean;
  session: string;
  startDate: string;
  endDate: string;
  requirements: AdmissionRequirement[];
  process: string[];
  importantDates: { event: string; date: string }[];
}
