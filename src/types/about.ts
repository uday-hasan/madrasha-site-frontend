export interface AboutContent {
  title: string;
  subtitle: string;
  history: string;
  mission: string;
  vision: string;
  values: string[];
  foundedYear: number;
  founderName: string;
  founderMessage: string;
}

export interface Achievement {
  id: number;
  year: string;
  title: string;
  description: string;
}
