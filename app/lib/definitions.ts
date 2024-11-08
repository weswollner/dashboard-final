export type Course = {
  id: string;
  title: string;
  code: string;
  status: 'active' | 'inactive';
};

export type CourseState = {
  errors?: {
    title?: string[];
    code?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type Tutor = {
  id: string;
  last_name: string;
  first_name: string;
  email: string;
};